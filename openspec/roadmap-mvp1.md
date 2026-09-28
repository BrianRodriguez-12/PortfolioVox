# Roadmap OpenSpec - VoxMex MVP 1

Este roadmap organiza la primera versión pública de `voxmex.com`. El objetivo
es presentar VoxMex a clientes potenciales y dirigirlos a un canal de contacto
o a la línea de producto correspondiente.

## Reglas de trabajo

- Trabajar un solo change a la vez.
- Crear proposal, specs, design y tasks para cada change.
- No convertir pendientes del `project-context.md` en requisitos sin aprobarlos.
- No publicar claims, logos, métricas o contenido sin autorización.
- Mantener las aplicaciones de Viajes, Games y Store separadas de este
	repositorio.
- Mantener los artefactos en español.
- Ejecutar `npm run lint` y `npm run build` antes de archivar un change.
- Actualizar este documento solo cuando cambie el estado real de un change.

## Seguimiento

| # | Change | Estado |
|---|---|---|
| 1 | `mvp1-01-identidad-y-navegacion` - identidad, navegación y portada | [ ] |
| 2 | `mvp1-02-servicios` - servicios para clientes | [ ] |
| 3 | `mvp1-03-experiencia-y-casos` - clientes, logos y casos autorizados | [ ] |
| 4 | `mvp1-04-lineas-voxmex` - Viajes, Games y Store | [ ] |
| 5 | `mvp1-05-contacto-e-idiomas` - conversión, español e inglés | [ ] |
| 6 | `mvp1-06-calidad-y-publicacion` - legal, analítica, SEO y Netlify | [ ] |

Una casilla marcada significa que el change fue implementado, validado y
archivado. El detalle del avance intermedio vive en el change activo.

## 1. Identidad y navegación

**Propósito:** convertir la plantilla de Vite en la estructura pública base de
VoxMex.

**Alcance:** Inicio, Servicios, Proyectos / casos de estudio, Sobre VoxMex,
Contacto y accesos a VoxMex Viajes, VoxMex Games y VoxMex Store.

**Criterios:** el visitante entiende qué es VoxMex, quién dirige el proyecto,
qué puede contratar y cuál es el siguiente paso.

## 2. Servicios

**Propósito:** explicar la oferta comercial con lenguaje profesional y casual.

**Alcance:** desarrollo web, mantenimiento y soporte, consultoría y desarrollo
de videojuegos. Cada servicio debe indicar su propuesta y llamada a la acción
sin inventar precios, plazos o garantías.

## 3. Experiencia y casos autorizados

**Propósito:** demostrar experiencia real sin crear una impresión falsa de
respaldo o afiliación.

**Alcance:** Walmart, Elsevier, Gobierno de México y CoralReef, con sus logos
cuando el material esté disponible. La información debe describir el trabajo
realizado por VoxMex y separar claramente los datos pendientes de aprobación.

**Fuera de alcance:** métricas, testimonios o resultados no confirmados.

## 4. Líneas de VoxMex

**Propósito:** presentar y conectar las líneas del ecosistema.

**Alcance:** resumen y enlace a VoxMex Viajes, VoxMex Games y VoxMex Store.
Usar `viajes.voxmex.com`, `games.voxmex.com` y `market.voxmex.com` como
destinos previstos, con estado pendiente mientras no estén publicados.

**Fuera de alcance:** construir esas aplicaciones dentro de PortfolioVox.

## 5. Contacto e idiomas

**Propósito:** permitir que clientes de México y del exterior contacten a
VoxMex.

**Alcance:** email, WhatsApp, Facebook, español predeterminado e inglés con
traducciones sencillas. Los textos deben cargarse desde archivos locales y
resolverse mediante `t`.

**Pendiente de design:** librería concreta, formato de traducciones, selector o
rutas de idioma y cobertura exacta de la versión inglesa.

## 6. Calidad y publicación

**Propósito:** dejar el sitio listo para revisión y publicación en Netlify.

**Alcance:** responsive, accesibilidad, SEO básico, aviso de privacidad,
consentimiento de cookies si aplica, recuperación/configuración de GA4,
dominio en GoDaddy y validación de build.

**Criterios:** no exponer secretos, mantener las cuentas bajo control de
VoxMex y revisar el sitio en staging antes de producción.