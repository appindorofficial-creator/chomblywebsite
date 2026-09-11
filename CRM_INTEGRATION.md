# CRM Integration

## Contrato

`lib/crm/index.ts` recibe un `CrmLeadEnvelope` ya validado. El sitio no importa SDKs ni modelos de un proveedor específico.

Adapters:

- `local` — default; D1 es el system of record de la captación.
- `webhook` — POST HTTPS con bearer token, `Idempotency-Key`, timeout de 5 segundos y estado `synced`/`pending_retry`.

GoHighLevel puede conectarse detrás del adapter webhook o mediante una implementación futura del mismo contrato; no está hardcodeado en componentes ni schemas.

## Mapeo mínimo

| Campo Chombly | Tipo | Destino sugerido |
|---|---|---|
| `leadId` | UUID | External ID / idempotency |
| `audience` | enum | Segment/tag |
| `name`, `email`, `phone` | PII | Contacto |
| `city`, `market` | ubicación general | Campos de contacto |
| `organization` | texto | Company/account |
| `structuredAttributes` | enums | Campos custom |
| `source`, `route` | atribución | Source |
| `experimentId`, `thesisId`, `variantId` | atribución | Custom fields |
| consentimientos | booleanos | Consent record |

## Reglas

- No enviar síntomas, historia clínica, credenciales, contraseñas o campos libres clínicos.
- No activar webhook sin contrato, DPA/revisión de privacidad, URL HTTPS y rotación del token.
- El fallo remoto no borra la señal local; queda `pending_retry`.
- Implementar un job de retry antes de depender operativamente del CRM. Actualmente no existe cola automática.
- Mantener listas/campañas separadas por consentimiento de updates.

## Conexión futura de GoHighLevel

1. Crear en GoHighLevel los campos custom equivalentes al mapeo anterior y separar tags por audiencia/experimento.
2. Implementar un endpoint middleware HTTPS que acepte `CrmLeadEnvelope`; no exponer credenciales de GoHighLevel al navegador.
3. Configurar en staging `CHOMBLY_CRM_ADAPTER=webhook`, URL y token. Mantener D1 como system of record.
4. Probar un lead por audiencia, idempotencia, consentimiento, UTMs y ausencia de campos clínicos/PII en logs.
5. Añadir retry con backoff, dead-letter/alerta y reconciliación de `pending_retry` antes del uso operativo.
6. Aprobar DPA, retención, borrado, acceso y rotación de token; solo entonces promover la configuración a producción.
