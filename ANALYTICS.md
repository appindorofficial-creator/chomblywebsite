# Analytics

## Adapter

`lib/analytics/client.ts` guarda una cola efímera en `window.__CHOMBLY_ANALYTICS__` y, si existe `window.posthog.capture`, envía el mismo evento sanitizado. El producto no depende de PostHog.

## Diccionario canónico

| Evento | Cuándo | Propiedades permitidas |
|---|---|---|
| `page_viewed` | cambio de ruta | route, locale, market, source, UTMs, device_class |
| `audience_selected` | selección explícita | audience, route, experiment_id, thesis_id, variant_id |
| `cta_clicked` | CTA instrumentado | cta_id, placement, audience, experiment_id, source |
| `experiment_exposed` | landing renderizada | experiment_id, thesis_id, variant_id, source, route |
| `sticky_story_entered` | entrada desktop | route |
| `sticky_story_completed` | salida por final | route |
| `sticky_story_skipped` | móvil/reduced/save data | route, reason |
| `form_started` | primer focus | route, audience, form_id, consentimiento, atribución |
| `form_submitted` | API aceptó | route, audience, form_id, consentimiento, atribución |
| `form_submission_failed` | fallo API/red | route, audience, form_id, reason |
| `app_store_clicked` | futuro | placement, source |

## Prohibido

No enviar nombre, email, teléfono, dirección, texto de formulario, síntomas, datos clínicos, credenciales, IDs de pago o tokens. `sanitizeProperties` descarta cualquier clave no listada y limita valores a 160 caracteres.

El adapter añade automáticamente `locale`, `market`, `route`, `device_class`,
`reduced_motion`, `consent_state` y UTMs disponibles. Los formularios añaden
`form_id`, audiencia y atribución de tesis/experimento/variante. Las UTMs también
se conservan como atributos estructurados del lead para reconciliar CRM sin
enviar PII a analytics.

## North star

Progresión de evidencia calificada:

1. visita atribuida;
2. selección de audiencia/tesis;
3. formulario iniciado;
4. señal calificada enviada con consentimiento;
5. participación en entrevista/prueba;
6. comportamiento repetido o compromiso downstream.

No optimizar por volumen de leads sin calidad, consentimiento y paso posterior. La cola de desarrollo facilita inspección, pero no sustituye retención, dashboards ni alertas de un adapter de producción.
