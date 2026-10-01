# Reglas de workflow de los agentes — PortfolioVox

Este documento es la **fuente única de verdad** de las reglas de proceso que deben
respetar todos los agentes, sin importar la integración desde la que se ejecuten
(CodeBuddy, Claude Code, Cline, Gemini, GitHub Copilot, Codex u otra).

Reparto de fuentes de verdad del proyecto:

- `openspec/project-context.md` — producto y negocio.
- `openspec/config.yaml` — restricciones técnicas y metodológicas permanentes.
- `openspec/roadmap-mvp1.md` — orden y seguimiento de los changes del MVP 1.
- **este archivo** — proceso de trabajo con Git y OpenSpec, compartido por todos los agentes.

Estas reglas no son opcionales ni dependen de la integración: si una regla nueva se
añade aquí, debe quedar aplicada en **todas** las integraciones en el mismo cambio.

---

## Regla 1 — Cada proposal se crea en su propia rama

Ningún artefacto de planificación (proposal, specs, design, tasks) se crea sobre
`master` ni sobre una rama ajena al change. Antes de ejecutar `openspec new change`,
el agente comprueba la rama activa y el estado del árbol de trabajo, y cambia a
`feat/<change-name>` cuando corresponde.

Razón: los changes se integran por pull request y la Action
`.github/workflows/openspec-archive-on-merge.yml` identifica el change por las rutas
modificadas del PR. Un change creado en `master` contamina la rama por defecto y
rompe ese flujo.

### Bloque canónico

El bloque siguiente debe aparecer **literalmente** en todos los puntos de entrada del
workflow de proposal de cada integración. Es la redacción normativa: no se parafrasea
ni se resume por integración. `scripts/verificar-reglas-agentes.mjs` compara cada
superficie contra este bloque y falla si alguna diverge.

<!-- BLOQUE-CANONICO-INICIO -->
```text
**Branch policy (required before creating the change)**

Every proposal must live in a dedicated Git branch. Before running
`openspec new change`:

1. Derive the kebab-case change name from the user's input.
2. Run `git status --short` and `git branch --show-current`.
3. If the current branch is `main`, `master`, or another branch unrelated to
   this change, switch to `feat/<change-name>`. Create it from the current
   branch when it does not exist; reuse it when it already exists.
4. If the working tree is dirty with changes unrelated to this change, stop and
   ask the user whether to commit or stash them before switching. Do not create
   planning artifacts on the default branch or mix unrelated work silently.
5. Verify the resulting branch with `git branch --show-current`, then run
   `openspec new change`.

This workflow is planning-only, but the branch switch is part of preparing the
change and must happen before any proposal, spec, design, or task file is
created.
```
<!-- BLOQUE-CANONICO-FIN -->

El bloque se mantiene en inglés porque el resto de cada archivo de integración es
texto generado en inglés y la regla se lee en ese contexto. La prosa del proyecto
—este documento, `proposal.md`, specs, design, tasks y commits— sigue en español de
México.

## Regla 2 — Las integraciones se generan y se pueden sobrescribir

Los archivos de `.agents/`, `.claude/`, `.cline/`, `.clinerules/`, `.codebuddy/`,
`.gemini/` y `.github/` se generan con `openspec update` (ver el campo
`generatedBy` en el frontmatter de cada SKILL.md). Una regla escrita **solo** en esos
archivos se pierde en la siguiente regeneración.

Por eso la regla vive primero en este documento y en `openspec/config.yaml`, que son
archivos del proyecto que `openspec update` no toca, y después se refleja en cada
punto de entrada. Si `openspec update` borra el bloque de alguna superficie,
`npm run verificar:reglas` lo detecta y el bloque se vuelve a aplicar.

## Regla 3 — Una regla nueva se aplica a todas las integraciones a la vez

Al añadir o cambiar una regla de workflow hay que aplicarla a **las siete
integraciones**, no solo a la que se está usando en ese momento. Si la regla vive en
una sola, el agente que corre desde otra no la ve: eso fue exactamente lo que ocurrió
el 30 de septiembre de 2026, cuando la política de rama se agregó únicamente a
`.github` y el change `mvp1-04-sedes` se creó en `master` desde CodeBuddy.

Los directorios de integración son ocultos, así que una búsqueda con `grep` o `rg`
sin `--hidden` los ignora y produce falsos negativos al auditar.

## Regla 4 — La rama del change se elimina al archivarlo

Cuando el pull request de un change se integra a la rama por defecto, la Action
`.github/workflows/openspec-archive-on-merge.yml` archiva el change y, como **último
paso**, elimina la rama de origen del pull request. La eliminación va al final del job
para que una ejecución fallida deje la rama disponible y se pueda reintentar sin tener
que volver a crearla.

Guardas del paso:

- solo actúa cuando el pull request proviene del propio repositorio; una rama de fork
  no se toca, porque no pertenece a este repositorio y el token no puede eliminarla;
- no elimina nada si la rama de origen es la misma que la rama base;
- si la rama ya no existe, termina sin error, así que es seguro ejecutarlo dos veces.

GitHub también puede eliminar automáticamente la rama de origen al integrar un pull
request (ajuste `delete_branch_on_merge` del repositorio). Ese ajuste actúa sobre
cualquier pull request, incluso los que no archivan un change; este proyecto lo deja
en la Action para que la eliminación quede ligada al archivado del change.

`npm run verificar:reglas` comprueba que el paso `Delete the merged feature branch`
siga presente en la Action.

## Superficies obligatorias

Puntos de entrada del workflow de proposal que deben contener el bloque canónico:

| Integración | Superficies |
|---|---|
| `.agents` | `skills/openspec-propose/SKILL.md`, `workflows/opsx-propose.md` |
| `.claude` | `skills/openspec-propose/SKILL.md`, `commands/opsx/propose.md` |
| `.cline` | `skills/openspec-propose/SKILL.md` |
| `.clinerules` | `workflows/opsx-propose.md` |
| `.codebuddy` | `skills/openspec-propose/SKILL.md`, `commands/opsx/propose.md` |
| `.gemini` | `skills/openspec-propose/SKILL.md`, `commands/opsx/propose.toml` |
| `.github` | `skills/openspec-propose/SKILL.md`, `prompts/opsx-propose.prompt.md` |

Además, `.github/agents/openspec.agent.md` resume la regla en su sección
`## Branch Policy`; el verificador comprueba que esa sección siga existiendo y
mencione `feat/<change-name>`.

## Verificación

```bash
npm run verificar:reglas
```

El comando recorre las superficies obligatorias, compara cada una contra el bloque
canónico de este documento y falla con la lista de archivos divergentes. Debe
ejecutarse antes de cerrar cualquier cambio que toque las integraciones de agentes.

## Repos hermanos

`CoralReef` y `SiteVoxV2` comparten la misma matriz de integraciones y las mismas
reglas de workflow. Al cambiar una regla aquí, se replica en los otros dos.
