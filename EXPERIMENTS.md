# Experiments

Las landings viven en `config/experiments.ts` y `/es-co/e/[experiment]`. Todas son noindex y usan una cookie first-party anónima para asignación estable 50/50.

| Prioridad | ID | Thesis ID | Audiencia | CTA | Señal calificada | Downstream |
|---|---|---|---|---|---|---|
| A | `continuity` | `thesis.a.continuity` | owner | Compartir mi perspectiva | consentimiento + momento | entrevista continuidad |
| B | `care-navigator` | `thesis.b.care-navigator` | owner | Participar en una prueba | consentimiento + detonante | prueba guiada |
| C | `pet-passport` | `thesis.c.pet-passport` | owner | Compartir mi perspectiva | consentimiento + uso | entrevista documentos |

B es la prioridad de trabajo, no una ganadora ni evidencia de PMF. La asignación se hace en el edge antes del render mediante cookie first-party con ID Web Crypto; un ID válido produce siempre la misma variante, evitando cambio visual tras hidratación. Cada exposición y CTA conserva `experiment_id`, `thesis_id` y `variant_id`; cada lead añade además `source`, route y UTMs. La variante modifica headline/body, no la realidad del producto ni los criterios de consentimiento.

Antes de declarar una tesis ganadora definir: tamaño mínimo, ventana, umbral de señal calificada, tasa de participación downstream y guardrails cualitativos.

Las rutas experimentales permanecen fuera del sitemap y declaran `noindex`. Cambiar pesos o IDs exige una nueva versión de experimento para no mezclar cohortes históricas.
