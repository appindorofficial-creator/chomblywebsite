# Asset Manifest

| Archivo | Procedencia | Estado | Uso | Acción antes de LIVE |
|---|---|---|---|---|
| `public/brand/chombly-logo.png` | Brand Book ZIP, `LOGO CHOMBLY.png` | Oficial positivo, optimizado (~12 KB) | Header/footer/not found | Aprobar export final |
| `public/brand/chombly-mark.png` | Brand Book ZIP, `Isotipo.png` | Oficial positivo, optimizado (~56 KB) | Hero/final CTA/favicon | Aprobar export final |
| `public/brand/v2/chombly-wordmark-dark.png` | Brand Book ZIP, `verde oscuro png.png` | Oficial, optimizado | Header claro | Ninguna |
| `public/brand/v2/chombly-wordmark-light.png` | Brand Book ZIP, `Blanco png.png` | Oficial, optimizado | Header oscuro/footer | Ninguna |
| `public/brand/v2/chombly-wordmark-lime.png` | Brand Book ZIP, `Lima png.png` | Oficial, optimizado | Reserva cromática | Ninguna |
| `public/brand/v2/chombly-mark.png` y variantes | Brand Book ZIP, isotipos oficiales | Oficial, optimizado | Transición/Easter Egg | Ninguna |
| `public/images/dev-owner.webp` | paquete Ricardo, `chomby-home.png` | Temporal optimizado (~104 KB) | Hero/story/familias | Reemplazar con fotografía original |
| `public/images/dev-vet.webp` | paquete Ricardo, `service-vet.png` | Temporal optimizado (~60 KB) | owner moment/story/profesionales | Reemplazar |
| `public/images/dev-walk.webp` | paquete Ricardo, `service-walking.png` | Temporal optimizado (~132 KB) | story/aliados | Reemplazar |
| `public/images/dev-grooming.webp` | paquete Ricardo, `service-grooming.png` | Temporal optimizado (~76 KB) | story | Reemplazar |
| `public/favicon.svg` | legado Ricardo | No usado por metadata | residual | eliminar o rediseñar al cierre |
| `public/mascot.png` y PNGs legacy grandes | paquete Ricardo | Gated/residual | componentes legacy únicamente | retirar al refactor del producto |

No se usaron assets denominados “Negativo”. Los webp temporales fueron redimensionados, limpiados de metadata y comprimidos. El paquete original permanece como fuente recuperable.

Tipografía V2: Bricolage Grotesque/Manrope son canon visual, pero no se recibieron WOFF2 web aprobados. El CSS deja sus tokens configurados y usa fallbacks locales; no se descargaron fuentes de terceros.

Pendientes creativos explícitos de V2: fotografía nocturna original y la ilustración final del Easter Egg de Chombly en el baño. Los estados actuales se identifican como placeholders de desarrollo.

La hero carga su imagen con prioridad; las demás imágenes se difieren. Los PNG legacy grandes no son dependencias de la homepage y permanecen solo en superficies gated/residuales.
