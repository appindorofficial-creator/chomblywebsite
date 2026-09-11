# Content and Claims

## Fuente de verdad

`config/claims.ts` es el registro central. Los componentes no deben escribir claims de cobertura, verificación, disponibilidad o resultados fuera de ese archivo.

| Estado | Uso público |
|---|---|
| LIVE | capacidad comprobada y aprobada |
| PRELAUNCH | actividad actual de construcción/validación |
| PILOT | capacidad en piloto acotado |
| VISION | intención o hipótesis etiquetada |
| PENDING_PRODUCT | nunca renderizar como disponible |
| PENDING_LEGAL | nunca renderizar como hecho legal |

## Claims aprobados actuales

- Hero: “Cada momento de su vida. Un siguiente paso más claro.”
- Visión conectada: VISION.
- Etapa de construcción y validación: PRELAUNCH.
- Chombly no diagnostica ni reemplaza criterio veterinario: PRELAUNCH.
- Care Navigator, Continuity y Pet Passport: VISION/hipótesis.

## Bloqueados

- “Red verificada”: PENDING_PRODUCT.
- Entidad independiente “Chombly S.A.S.”: PENDING_LEGAL.
- Cobertura geográfica, disponibilidad, integraciones, apps, precios, SLA, métricas, testimonios y prueba social: no aprobados.

## Regla editorial

Construir la visión y etiquetar la etapa. Evitar “próximamente” sin contexto, dashboards ficticios, diagnósticos, módulos inventados, estadísticas no demostradas o lenguaje que convierta investigación en servicio. La homepage mantiene siete secciones canónicas; cualquier ampliación requiere una necesidad editorial demostrable.
