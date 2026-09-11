# Legacy Code Reuse Report

Fuente inspeccionada: `Copia de Chomby-Entrega-Christian.zip`, commit declarado `5ead9eea01b94ec82096dfe8ac7a5d2386b4fe1e`. Inventario original: 143 archivos, todos verificados contra `INVENTARIO-SHA256.txt`.

| Fuente | Destino/estado | Modificación y razón | Pruebas | Riesgo pendiente |
|---|---|---|---|---|
| Next/Vinext/Worker/Vite | raíz, `worker/index.ts` | conservado; backend compatible con Sites | build + routes | seguir versiones upstream |
| D1/Drizzle | `db/*`, `drizzle/0000*` | conservado; se añade tabla leads en `0001*` | 51 tests totales, DB in-memory | migraciones staging/prod |
| Booking lifecycle | `/api/bookings`, componentes legacy | conservado y gated | idempotencia, validación, privacidad, cancelación | refactor tipado antes de activar |
| Solicitud/aprobación profesional | `/api/professionals`, `/api/admin` | conservado y gated; web prelaunch usa lead separado | aprobación/allowlist/PII | auth y estándar de verificación |
| Cotizaciones + holds | D1 + APIs | conservado; trigger anti-overlap intacto | conflictos/rollback | zona horaria y soporte operativo |
| Cuenta/estados/admin | componentes + API | conservado sin ruta pública usable | pruebas de dominio | nueva IA y auth final |
| Wompi | `/api/checkout`, `/api/wompi`, `lib/payment.ts` | gate LIVE explícito; callback configurable | firma, importe, moneda, duplicados, late/cancel | contrato, secretos, runbook refund |
| SIWC auth | `app/chatgpt-auth.ts` | adapter legado, no auth final | tests con mock | sustituir/abstraer |
| SEO patterns | rehecho en `lib/seo.ts` | canonical/config/noindex/rutas nuevas | rendered HTML | dominio y Search Console |
| Homepage/seis servicios/FAQ chat | componentes legacy aislados | retirado de la experiencia pública | ausencia de tokens en HTML | eliminar al cerrar refactor |
| Precio US$10 | solo residual legacy gated | eliminado de toda ruta pública | assertion HTML | borrar del componente legado |
| Fotografías legacy | webp temporal | optimizadas y etiquetadas | browser render | producción final |

## Exclusiones de lint

Los módulos legacy de una línea y sus APIs transaccionales están excluidos explícitamente en `eslint.config.mjs`; no se oculta esta deuda. Se mantienen cubiertos por pruebas funcionales y deben reformatearse/tiparse antes de activar producto.

En PRELAUNCH, las rutas/API de booking, cuenta, profesionales, administración y pagos requieren gates server-side y no se enlazan desde la experiencia pública. Preservar código no equivale a declarar disponibilidad.
