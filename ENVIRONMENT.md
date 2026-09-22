# Environment

| Variable | Cliente | Secreta | Default | Uso |
|---|---:|---:|---|---|
| `NEXT_PUBLIC_CHOMBLY_SITE_MODE` | Sí | No | `PRELAUNCH` | PRELAUNCH/PILOT/LIVE |
| `NEXT_PUBLIC_CHOMBLY_BASE_URL` | Sí | No | `https://chombly.invalid` | Canonical absoluto; obligatorio antes de indexar |
| `NEXT_PUBLIC_CHOMBLY_CONTACT_EMAIL` | Sí | No | `Chomblypet@gmail.com` | Contacto operativo |
| `NEXT_PUBLIC_CHOMBLY_ASSOCIATED_ORG` | Sí | No | `Home Indor Tech` | Asociación operativa actual |
| `NEXT_PUBLIC_CHOMBLY_INDEXING_ENABLED` | Sí | No | `false` | Solo efectivo en LIVE |
| `NEXT_PUBLIC_POSTHOG_KEY` | Sí | No | vacío | Adapter opcional analytics |
| `NEXT_PUBLIC_POSTHOG_HOST` | Sí | No | vacío | Host PostHog aprobado |
| `CHOMBLY_CRM_ADAPTER` | No | No | `local` | `local` o `webhook` |
| `CHOMBLY_CRM_WEBHOOK_URL` | No | Sí | vacío | Endpoint HTTPS del CRM adapter |
| `CHOMBLY_CRM_WEBHOOK_TOKEN` | No | Sí | vacío | Bearer token CRM |
| `CHOMBLY_EMAIL_ADAPTER` | No | No | `local` | `local` o `resend` |
| `CHOMBLY_RESEND_API_KEY` | No | Sí | vacío | API key Resend |
| `CHOMBLY_EMAIL_FROM` | No | No | vacío | Remitente verificado |
| `CHOMBLY_LEADS_ALERT_EMAIL` | No | No | `Chomblypet@gmail.com` | Alerta interna de leads |
| `CHOMBLY_LEADS_ADMIN_TOKEN` | No | Sí | vacío | Inbox `/leads` y export CSV |
| `CHOMBLY_LEGACY_PRODUCT_ENABLED` | No | No | `false` | Booking/cuenta/profesionales; requiere PILOT/LIVE |
| `CHOMBLY_PAYMENTS_ENABLED` | No | No | `false` | Checkout/webhook; requiere LIVE |
| `CHOMBY_ADMIN_EMAILS` | No | Sí | vacío | Allowlist heredada temporal |
| `WOMPI_PUBLIC_KEY` | No | Sí | vacío | Solo `pub_prod_` en LIVE |
| `WOMPI_INTEGRITY_SECRET` | No | Sí | vacío | Firma checkout |
| `WOMPI_EVENTS_SECRET` | No | Sí | vacío | Firma webhook |

Las variables `CHOMBLY_TEST_ONLY_ENABLE_*` son exclusivas de tests automatizados y además exigen el base URL `.invalid`. Nunca configurarlas en Sites.

Para PRELAUNCH privado conservar explícitamente: modo `PRELAUNCH`, indexing `false`, producto legado `false`, pagos `false` y CRM `local`. Los secretos CRM/Wompi se cargan únicamente en el entorno server-side del proveedor; no usar prefijo `NEXT_PUBLIC_`.
