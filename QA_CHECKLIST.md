# QA Checklist

Fecha: 2 de septiembre de 2026.

## Automatizado

- [ ] `npm run install:ci` — BLOCKED en este entorno: el preflight del tarball fijado de Vinext recibió HTTP 403; no llegó a ejecutar `npm ci`.
- [x] `npm ls --depth=0` — PASS; árbol instalado y Vinext disponibles.
- [x] `npm exec tsc -- --noEmit` — 0 errores.
- [x] `npm run lint` — 0 errores, 9 warnings documentados.
- [x] `npm test` — 51/51 pasan; incluye build, unitarias, integración, HTML renderizado, analytics, IDs y experimentos.
- [x] `npm run build` — pasa.
- [x] Rutas públicas, claims PRELAUNCH, noindex y legacy 404/redirect.
- [x] Leads: origen, schema estricto, consentimiento, idempotencia, persistencia y audiencias.
- [x] Booking/payments heredados: reglas críticas preservadas.
- [x] CSS: tokens, 270vh máximo desktop, reduced-motion/save-data, sin scrollbar global oculto.
- [x] Analytics: eventos/propiedades canónicas y rechazo de PII/campos clínicos.
- [x] IDs: RFC 4122 v4, Web Crypto, unicidad y fallo cerrado.

## Navegador cloud

- [x] Homepage inspeccionada en viewports internos reales 390, 768, 1024, 1280 y 1440 px; exactamente siete secciones y cero overflow horizontal.
- [x] Header/nav, hero, CTA, router, footer, wrapping y touch targets revisados en las cinco anchuras.
- [x] Sticky Story: 11 momentos en 1280/1440, 8 en 1024, 5 y layout estático sin pin en 390/768.
- [x] 10 rutas públicas y 3 experimentos cargan con un `main`, un H1 y cero overflow; experimentos noindex.
- [x] Formularios owner/professional/clinic/partner hidratan, seleccionan audiencia correcta y habilitan submit.
- [x] Homepage contiene exactamente 7 secciones directas.
- [x] Sin `Chomby`, `US$10` o “Seis servicios” en homepage visible.
- [x] Las 13 rutas pasan revisión semántica: orden de headings, IDs, labels, nombres de botones, alt, contenido oculto focusable y skip target.
- [x] Secuencia de teclado y foco visible verificados manualmente en Join; controles táctiles principales ≥44 px.
- [x] Sin errores de aplicación en consola; solo mensajes de la extensión del navegador.

## Pendiente / NOT RUN

- [ ] Reduced-motion/save-data visual emulado — NOT RUN: la API de browser disponible no expone emulación de media/red. CSS y retornos tempranos sí fueron inspeccionados y probados por contrato.
- [ ] Axe completo WCAG 2.2 AA — NOT RUN: axe no está instalado en el paquete.
- [ ] Lighthouse y CWV p75 — NOT RUN: Lighthouse no está instalado y los percentiles reales requieren una URL estable con RUM; objetivos LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.
- [ ] Slow 4G/offline visual — NOT RUN: no hay emulación de red disponible.
- [ ] Lectores de pantalla VoiceOver/NVDA — NOT RUN: requieren dispositivos/herramientas externos.
- [ ] Form submit del preview desplegado contra D1 real y retry CRM.
- [ ] Safari iOS, Chrome Android y navegadores soportados.
