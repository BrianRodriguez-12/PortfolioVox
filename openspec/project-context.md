# VoxMex - Contexto del Proyecto

## 0. Propósito y vigencia

Este documento es el contexto canónico de VoxMex para trabajar con OpenSpec.
PortfolioVox es el repositorio del sitio principal. Su objetivo es conservar
las decisiones del producto y evitar que los artefactos o la implementación
rellenen vacíos con suposiciones.

Las decisiones nuevas o modificadas deben incorporarse aquí cuando queden
confirmadas. Mientras una decisión no esté confirmada, debe permanecer como
pendiente y no convertirse en un requisito de producto.

## 1. Identidad y propósito

VoxMex es una marca paraguas que presenta servicios, experiencia y productos
digitales propios. El sitio principal será `voxmex.com` y busca atraer
clientes potenciales.

El tono público será profesional y casual, con foco en México y alcance
internacional. La persona responsable se presentará como fundador y director.

## 2. Oferta y arquitectura de marca

Servicios aprobados:

- Desarrollo de sitios web para empresas de cualquier tamaño.
- Mantenimiento y soporte de sitios web.
- Consultoría.
- Desarrollo de videojuegos.

Líneas del ecosistema:

- **VoxMex Viajes**, cuyo sitio recibe soporte del equipo.
- **VoxMex Games**, línea de videojuegos.
- **VoxMex Store**, línea de comercio electrónico.

Cada línea tendrá su propia página o experiencia. El sitio principal resume
su oferta y enlaza a ellas, sin implementar sus aplicaciones dentro de este
repositorio.

Subdominios previstos: `viajes.voxmex.com`, `games.voxmex.com` y
`market.voxmex.com`. Todavía no están publicados.

## 3. Experiencia y casos de estudio

Está autorizada la publicación de experiencia real con Walmart, Elsevier,
Gobierno de México y CoralReef, incluyendo sus logos. El contenido debe
describir el trabajo realizado por VoxMex sin insinuar patrocinio, respaldo o
afiliación actual de esas organizaciones.

Métricas, testimonios, resultados cuantitativos o información confidencial
requieren confirmación específica antes de publicarse.

## 4. Estado técnico actual

- React 18.
- TypeScript.
- Vite.
- ESLint.
- CSS propio.
- Scripts disponibles: `npm run dev`, `npm run build`, `npm run lint` y
  `npm run preview`.
- El código actual procede de la plantilla mínima de Vite + React.
- No hay backend, base de datos, autenticación ni CMS confirmados.
- Dominio: GoDaddy.
- Hosting: Netlify.
- Google Analytics debe recuperarse o configurarse bajo control de VoxMex.

## 5. Estructura pública aprobada

La primera versión de `voxmex.com` incluye:

- Inicio.
- Servicios.
- Proyectos / casos de estudio.
- VoxMex Viajes.
- VoxMex Games.
- VoxMex Store.
- Sobre VoxMex.
- Contacto.

## 6. Idiomas e internacionalización

El español es el idioma predeterminado y prioritario. Habrá traducciones
sencillas al inglés. Los textos traducibles vivirán en archivos locales y se
consumirán mediante la función `t` de la solución de internacionalización.
La librería concreta, formato de archivos y estrategia de rutas o selector se
definirán en el `design.md` correspondiente.

## 7. Contacto y conversión

- Email: `contacto@voxmex.com`.
- WhatsApp: `+52 565 660 5207`.
- Facebook: `https://www.facebook.com/VoxMexOficial`.

El sitio debe facilitar solicitudes sobre desarrollo web, soporte, consultoría
y videojuegos.

## 8. Decisiones de producto pendientes

Antes de convertir estas áreas en requisitos, confirmar:

- identidad visual, tipografía, paleta e imágenes;
- detalles de los servicios, casos de estudio y resultados publicables;
- cobertura exacta y navegación de la versión inglesa;
- ID o propiedad activa de Google Analytics;
- aviso de privacidad, cookies y consentimiento aplicables en México.

No inventar nombres, clientes, cargos, métricas, testimonios, enlaces,
precios, imágenes o datos personales para completar la interfaz.

## 9. Principios de implementación

1. **Contenido confirmado:** el contenido público debe proceder de una
   decisión aprobada o estar marcado explícitamente como pendiente.
2. **Claridad:** una persona visitante debe entender el propósito del sitio y
   el siguiente paso sin depender de jerga técnica.
3. **Responsive y accesible:** diseñar mobile-first, usar HTML semántico,
   estados de foco visibles, contraste suficiente y alternativas textuales.
4. **Sin sobreconstrucción:** no añadir backend, CMS, autenticación,
   internacionalización o integraciones futuras sin un change aprobado.
5. **Cambios trazables:** todo comportamiento observable debe estar respaldado
   por una spec vigente.
6. **Validación:** ejecutar lint y build relevantes antes de marcar una tarea
   como completa.

## 10. Alcance del MVP 1

El MVP 1 aprobado como dirección inicial debe validar en este orden:

- identidad y navegación de VoxMex;
- servicios para clientes;
- experiencia y casos autorizados;
- líneas VoxMex y enlaces a subdominios;
- contacto, español e inglés;
- responsive, accesibilidad, SEO, analítica y publicación.

Cada change debe confirmar su propio alcance y respetar los pendientes.

## 11. Fuera de alcance inicial

Hasta contar con una decisión explícita, quedan fuera de alcance:

- autenticación o cuentas de usuario;
- CMS o panel de administración;
- comercio electrónico, pagos o carrito en `voxmex.com`;
- reservas, CRM o automatizaciones de ventas;
- construir las aplicaciones completas de Viajes, Games o Store aquí;
- funcionalidades futuras preparadas de forma anticipada.

## 12. Terminología

Usar `PortfolioVox` como nombre del proyecto. No crear nombres de marca,
secciones o servicios públicos adicionales hasta que estén confirmados.