# Chombly — Phase B Web Build

Implementación funcional de la nueva experiencia pública de Chombly para Colombia. El modo por defecto es `PRELAUNCH`: comunica visión, etapa y oportunidades de validación; no expone reservas, pagos, cuentas ni una red profesional como capacidades disponibles.

## Estado de entrega

- Homepage nueva de siete secciones bajo `/es-co`.
- Signature Sticky Story con 11 momentos en desktop, 8 en tablet, 5 en móvil y fallback estático para reduced motion/save data.
- Rutas dedicadas para familias, profesionales, clínicas, aliados, about, join, contacto, privacidad y términos.
- Landings A/B/C noindex con asignación estable y atribución completa.
- Formularios por audiencia, validación Zod server-side, D1, idempotencia, honeypot y rate limiting.
- Analytics y CRM mediante contratos vendor-agnostic.
- Booking, aprobación profesional, cotizaciones, holds, cuenta, administración y Wompi preservados detrás de gates.
- Estrategia portátil de IDs Web Crypto para navegador, edge y servidor; no depende de `crypto.randomUUID`.
- Build, typecheck y 51 pruebas automáticas aprobadas; QA visual real en 390, 768, 1024, 1280 y 1440 px. Consulta `TEST_BUILD_REPORT.md` y `QA_CHECKLIST.md`.

## Inicio rápido

```bash
npm run install:ci
npm exec tsc -- --noEmit
npm run lint
npm test
sites-preview start "$PWD"
```

El preview queda disponible en `http://terminal.local:4173/es-co` dentro del entorno compatible con Sites. Para desarrollo convencional usa `npm run dev`.

## Rutas públicas

| Ruta | Propósito |
|---|---|
| `/es-co` | Homepage y narrativa principal |
| `/es-co/pet-owners` | Familias con mascotas |
| `/es-co/professionals` | Profesionales veterinarios |
| `/es-co/clinics` | Clínicas y equipos |
| `/es-co/partners` | Aliados y fundaciones |
| `/es-co/about` | Visión, etapa y tesis |
| `/es-co/join` | Captura separada por audiencia |
| `/es-co/contact` | Contacto operativo |
| `/es-co/privacy` | Aviso para validación |
| `/es-co/terms` | Términos de participación |

Experimentos noindex: `/es-co/e/continuity`, `/es-co/e/care-navigator`, `/es-co/e/pet-passport`.

## Límites importantes

- La arquitectura `en-us` está preparada en configuración, pero no está publicada.
- Las fotografías actuales son activos temporales de desarrollo; no son producción final.
- Sora e Inter se declaran con fallbacks de sistema; los WOFF2 oficiales/licenciados siguen pendientes.
- El dominio canónico por defecto es el sentinel no-publicable `https://chombly.invalid`.
- El texto legal y la figura jurídica requieren aprobación antes de lanzamiento.
- No activar `LIVE`, pagos, indexing o producto legado sin completar `RELEASE_CHECKLIST.md`.

## Documentación

`ARCHITECTURE.md`, `RUN_LOCAL.md`, `DEPLOYMENT.md`, `ENVIRONMENT.md`, `IDENTIFIER_STRATEGY.md`, `CRM_INTEGRATION.md`, `ANALYTICS.md`, `EXPERIMENTS.md`, `CONTENT_AND_CLAIMS.md`, `ASSET_MANIFEST.md`, `PHOTO_SHOT_LIST.md`, `LEGAL_PENDING.md`, `LEGACY_CODE_REUSE.md`, `QA_CHECKLIST.md`, `RELEASE_CHECKLIST.md`, `DECISIONS_PENDING.md` y `TEST_BUILD_REPORT.md`.
