# Chombly Phase B — Build Plan

## Arquitectura elegida

- Conservar el repositorio entregado como base técnica: Next.js App Router sobre Vinext, React, TypeScript, Cloudflare Workers, D1/SQLite y Drizzle.
- Construir una experiencia pública nueva bajo `/es-co`, separada del producto legado y de sus endpoints transaccionales.
- Mantener tres límites explícitos: `public website`, `product/domain services` y `integrations`.
- Conservar D1 y Workers: el backend existente ya funciona, tiene pruebas y no existe una razón técnica para migrarlo durante pre-PMF.
- Mantener PRELAUNCH como modo actual. Booking, cuentas y Wompi quedan detrás de feature flags y no aparecen como capacidades públicas.

## Reutilización del legado

| Activo | Decisión |
|---|---|
| Booking lifecycle, idempotencia y validación de intervalos | Conservar y aislar como dominio de producto futuro. |
| Solicitud y aprobación profesional | Conservar; la captación prelaunch usa un formulario separado y no otorga verificación. |
| Cotizaciones y scheduling holds | Conservar con sus pruebas; no exponer desde la web pública. |
| Cuenta, estados y administración | Conservar como activo de producto; auth queda abstraída. |
| Wompi y verificación de webhook | Conservar, añadir gate explícito y mantener desactivado. |
| D1, Drizzle, Worker y build de Sites | Reutilizar directamente. |
| SEO utilities | Rehacer para la nueva IA, conservando patrones de metadata/robots/sitemap. |
| Homepage, seis categorías, FAQ chat y US$10 | Retirar de la experiencia pública. |
| Sign in with ChatGPT | Mantener solo como adapter legado; no declararlo auth final de Chombly. |

## Nueva estructura

- `config/`: modo, mercado, URLs, claims, audiences, routes, experiments y feature flags.
- `components/marketing/`: shell, homepage, Sticky Story, páginas de audiencia, confianza y CTAs.
- `components/forms/`: formularios separados por audiencia y estados accesibles.
- `lib/analytics/`: event dictionary y adapter opcional.
- `lib/crm/`: contrato vendor-agnostic, mock/D1 y contrato futuro GoHighLevel.
- `lib/experiments/`: registro A/B/C y asignación estable.
- `app/[locale]/`: rutas públicas y landings experimentales noindex.
- `app/api/leads`: validación server-side, spam guard y persistencia segura.
- `lib/legacy-product/` y rutas legadas: activos transaccionales preservados y gated.

## Dependencias principales

- Dependencias existentes fijadas por lockfile.
- GSAP + ScrollTrigger únicamente para el Chombly Signature Sticky Story.
- React Hook Form + Zod para formularios.
- Drizzle/D1 para lead capture local y activos de producto.
- Lucide para iconografía funcional; assets oficiales de Chombly para identidad.

## Orden de implementación

1. Config, claims y límites de producto.
2. Brand tokens, shell y homepage sin depender de animación.
3. Rutas por audiencia y trust/legal surfaces.
4. Formularios, D1 y adapters CRM/analytics.
5. Experimentos A/B/C y atribución.
6. Sticky Story con desktop/tablet/mobile/reduced-motion.
7. SEO, sitemap, robots, metadata y localización preparada.
8. Gates sobre producto legado y pagos.
9. Build, lint, typecheck, tests y documentación de handoff.

## Bloqueadores

No hay bloqueador que impida programar. Dominio, CRM final, títulos corporativos, fotografía final, Product Truth y textos legales quedan configurables y documentados. Ninguna de esas decisiones se presentará públicamente como resuelta.

## Estado al cierre de Phase B

Los nueve pasos de implementación están completos para PRELAUNCH privado. La habilitación de PILOT/LIVE, integraciones reales y materiales finales permanece separada mediante configuración, gates y checklists de release; no forma parte de este build.
