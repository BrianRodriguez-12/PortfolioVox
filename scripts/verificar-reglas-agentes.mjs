#!/usr/bin/env node
/**
 * Verifica que las reglas de workflow de `openspec/workflow-rules.md` estén
 * presentes y sin divergencias en todos los puntos de entrada de proposal de las
 * integraciones de agentes.
 *
 * Existe porque los archivos de integración son generados: `openspec update` los
 * regenera y puede borrar el bloque de la regla, y porque una regla añadida solo a
 * una integración deja ciegos a los agentes de las demás.
 *
 * Uso:
 *   node scripts/verificar-reglas-agentes.mjs
 *   npm run verificar:reglas
 *
 * Sale con código 1 si alguna superficie falta o diverge.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const DOCUMENTO = "openspec/workflow-rules.md";
const MARCA_INICIO = "<!-- BLOQUE-CANONICO-INICIO -->";
const MARCA_FIN = "<!-- BLOQUE-CANONICO-FIN -->";

/** Puntos de entrada del workflow de proposal que deben llevar el bloque canónico. */
const SUPERFICIES = [
  ".agents/skills/openspec-propose/SKILL.md",
  ".agents/workflows/opsx-propose.md",
  ".claude/skills/openspec-propose/SKILL.md",
  ".claude/commands/opsx/propose.md",
  ".cline/skills/openspec-propose/SKILL.md",
  ".clinerules/workflows/opsx-propose.md",
  ".codebuddy/skills/openspec-propose/SKILL.md",
  ".codebuddy/commands/opsx/propose.md",
  ".gemini/skills/openspec-propose/SKILL.md",
  ".gemini/commands/opsx/propose.toml",
  ".github/skills/openspec-propose/SKILL.md",
  ".github/prompts/opsx-propose.prompt.md",
];

/** Superficie que resume la regla en su propio formato, en vez de incrustarla. */
const RESUMENES = [
  {
    archivo: ".github/agents/openspec.agent.md",
    marcadores: ["## Branch Policy", "feat/<change-name>"],
  },
];

/**
 * Regla que vive en la Action de archivado en lugar de en las integraciones:
 * la rama del change se elimina después de archivar. Debe existir en los tres
 * repos con los mismos marcadores.
 */
const ACCIONES = [
  {
    archivo: ".github/workflows/openspec-archive-on-merge.yml",
    marcadores: ["Delete the merged feature branch", "git/refs/heads/"],
  },
];

/** Normaliza el texto para comparar sin depender de saltos de línea ni sangría. */
const normalizar = (texto) => texto.replace(/\s+/g, " ").trim();

function leer(rutaRelativa) {
  const ruta = resolve(RAIZ, rutaRelativa);
  if (!existsSync(ruta)) return null;
  return readFileSync(ruta, "utf8");
}

/** Extrae el bloque canónico delimitado por los marcadores, sin las vallas de código. */
function extraerBloqueCanonico() {
  const documento = leer(DOCUMENTO);
  if (documento === null) {
    throw new Error(`No se encontró ${DOCUMENTO}.`);
  }

  const inicio = documento.indexOf(MARCA_INICIO);
  const fin = documento.indexOf(MARCA_FIN);
  if (inicio === -1 || fin === -1 || fin < inicio) {
    throw new Error(
      `No se encontraron los marcadores del bloque canónico en ${DOCUMENTO}.`,
    );
  }

  const contenido = documento
    .slice(inicio + MARCA_INICIO.length, fin)
    .split("\n")
    .filter((linea) => !linea.trimStart().startsWith("```"))
    .join("\n");

  const bloque = normalizar(contenido);
  if (bloque.length === 0) {
    throw new Error(`El bloque canónico de ${DOCUMENTO} está vacío.`);
  }
  return bloque;
}

function main() {
  const canonico = extraerBloqueCanonico();

  const faltantes = [];
  const divergentes = [];
  const correctos = [];

  for (const superficie of SUPERFICIES) {
    const contenido = leer(superficie);
    if (contenido === null) {
      faltantes.push({ superficie, motivo: "archivo inexistente" });
      continue;
    }
    if (!contenido.includes("**Branch policy")) {
      faltantes.push({ superficie, motivo: "sin bloque de política de rama" });
      continue;
    }
    if (!normalizar(contenido).includes(canonico)) {
      divergentes.push(superficie);
      continue;
    }
    correctos.push(superficie);
  }

  const resumenesIncompletos = [];
  for (const { archivo, marcadores } of RESUMENES) {
    const contenido = leer(archivo);
    if (contenido === null) {
      resumenesIncompletos.push({ archivo, motivo: "archivo inexistente" });
      continue;
    }
    const ausentes = marcadores.filter((marca) => !contenido.includes(marca));
    if (ausentes.length > 0) {
      resumenesIncompletos.push({
        archivo,
        motivo: `sin ${ausentes.join(", ")}`,
      });
    } else {
      correctos.push(archivo);
    }
  }

  const accionesIncompletas = [];
  for (const { archivo, marcadores } of ACCIONES) {
    const contenido = leer(archivo);
    if (contenido === null) {
      accionesIncompletas.push({ archivo, motivo: "archivo inexistente" });
      continue;
    }
    const ausentes = marcadores.filter((marca) => !contenido.includes(marca));
    if (ausentes.length > 0) {
      accionesIncompletas.push({
        archivo,
        motivo: `sin ${ausentes.join(", ")}`,
      });
    } else {
      correctos.push(archivo);
    }
  }

  const problemas = [
    ...faltantes.map(({ superficie, motivo }) => `${superficie} — ${motivo}`),
    ...divergentes.map(
      (superficie) => `${superficie} — diverge del bloque canónico`,
    ),
    ...resumenesIncompletos.map(({ archivo, motivo }) => `${archivo} — ${motivo}`),
    ...accionesIncompletas.map(({ archivo, motivo }) => `${archivo} — ${motivo}`),
  ];

  if (problemas.length === 0) {
    console.log(
      `Reglas de agentes alineadas: ${correctos.length} superficies verificadas contra ${DOCUMENTO}.`,
    );
    return 0;
  }

  console.error("Las reglas de agentes están desalineadas:\n");
  for (const problema of problemas) {
    console.error(`  - ${problema}`);
  }
  console.error(
    `\nCorrige cada superficie copiando el bloque canónico de ${DOCUMENTO} ` +
      "sin parafrasearlo.",
  );
  return 1;
}

process.exit(main());
