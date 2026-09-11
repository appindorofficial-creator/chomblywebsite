# Chomby: SEO y respuestas para buscadores con IA

Revisión: 1 de septiembre de 2026. Sitio: https://chomby-colombia.jrricardo29.chatgpt.site

## Estado real

Prototipo privado y no indexable. No hay reservas, precios definitivos, proveedores ni atención reales. No se puede afirmar posicionamiento, indexación, volumen de búsquedas ni visibilidad en respuestas de IA. No se dispone de Search Console ni de Keyword Planner. Las familias de consultas se basan en los servicios previstos y en vocabulario observado en resultados y proveedores de Colombia; no constituyen una lista exhaustiva o un ranking medido.

## Mapa de intención y URL

| Página | Familia de consultas | Respuesta que aporta |
|---|---|---|
| / | veterinario online Colombia, servicios para mascotas Colombia, app para mascotas | Qué es Chomby, categorías, país, estado y acceso a cada servicio |
| /servicios/veterinario-online-colombia | consulta veterinaria virtual, veterinario en línea, teleorientación veterinaria, cita veterinaria por videollamada, cuánto cuesta un veterinario online, fórmula veterinaria online, veterinario perros gatos y otras especies | Recorrido, precio provisional US$10, límites, especies, disponibilidad y fórmulas condicionadas al criterio profesional |
| /servicios/peluqueria-canina-y-felina | peluquería canina, peluquería felina, grooming mascotas, baño para perros, deslanado, corte de uñas, peluquería canina cerca de mí, grooming a domicilio | Tareas, comparación, factores de precio, especies y modalidades por confirmar |
| /servicios/paseadores-de-perros | paseadores de perros, paseador cerca de mí, paseos individuales, paseos grupales, cuánto cobra un paseador, paseo por horas | Duración, entrega, modalidad, cobertura y costos pendientes |
| /servicios/hotel-para-mascotas | hotel para perros, hotel para gatos, alojamiento mascotas, hospedaje canino, precio por noche, requisitos hotel mascotas | Pernoctación, especies, requisitos, comida, transporte y diferencia con guardería |
| /servicios/guarderia-y-cuidadores | guardería canina, guardería por día, cuidador mascotas, cuidado de gatos a domicilio, cuidado por horas, pet sitter | Modalidades, visitas, acceso al hogar, duración y acuerdos |
| /servicios/entrenamiento-canino | entrenamiento canino, educación canina, adiestramiento de perros, entrenador perros, educación cachorros, entrenamiento a domicilio | Objetivos, método, experiencia, duración y ausencia de garantías de resultado |
| /sobre-chomby | qué es Chomby, Chomby Colombia | Identidad del proyecto, misión, estado y relación con profesionales |
| /profesionales | registro veterinarios Chomby, plataforma veterinarios, profesionales mascotas Colombia | Solicitud, credenciales, activación y condiciones pendientes |

Las consultas relacionadas con síntomas se mencionan como motivos para contactar con un profesional, sin generar páginas automáticas de diagnósticos. No se afirman visitas a domicilio, seguimiento GPS, consultas gratuitas ni atención 24 horas. Las preguntas sobre esas funciones aclaran su estado real. No se crean páginas de ciudad hasta contar con proveedores, cobertura y contenido propios verificables.

## Cambios implementados

- Un H1 descriptivo y único por página. Subtítulos H2 con temas y preguntas reales.
- Seis páginas de servicio con contenido en HTML servido inicialmente, no solo en modales.
- Enlaces HTML entre inicio, servicios, información del proyecto y profesionales.
- Títulos y descripciones únicos, canonical absoluto, idioma es-CO y metadatos sociales de texto.
- Organization y WebSite con identidad compartida, WebPage por URL, BreadcrumbList y FAQPage que coincide con preguntas visibles. No se marca Chomby como clínica, proveedor presencial, negocio local, oferta disponible o reseñas verificadas.
- Robots permite rastrear HTML y OAI-SearchBot. La privacidad depende del control de acceso del sitio; noindex se mantiene explícito en el prototipo.
- Sitemap generado a partir de las rutas reales. Mientras INDEXING_ENABLED=false, no publica URLs noindex ni se anuncia en robots.
- Enlaces a fuentes veterinarias oficiales sobre teleorientación y registro profesional.
- Dimensiones de imágenes y enlace para saltar al contenido. No se generaron imágenes nuevas ni archivos especiales de IA.

## Antes del lanzamiento público

1. Confirmar grafía de marca (el logo aportado dice CHOMBLY; la instrucción actual usa Chomby), identidad legal, dominio definitivo, contacto y canales de soporte.
2. Conectar la operación real y sustituir los perfiles y recorridos ficticios. Confirmar precio en COP, cobertura, especies, horarios y condiciones. Publicar privacidad, términos y cancelaciones revisados para la operación real.
3. Verificar credenciales y perfiles de profesionales. Cualquier contenido clínico debe tener autoría y revisión veterinaria real. No inventar revisores, certificaciones, reseñas ni cifras.
4. Actualizar SITE_URL en lib/seo.ts al dominio definitivo. Preparar redirecciones si cambia el dominio.
5. Sustituir avisos de prototipo y hechos provisionales por información real. Solo entonces establecer INDEXING_ENABLED=true y autorizar publicación pública. La constante no cambia el control de acceso de Sites.
6. Confirmar acceso anónimo con HTTP 200 y que el hosting no añada bloqueos/noindex. Revisar robots, sitemap, canonicals y metadatos en el dominio público.
7. Verificar dominio en Google Search Console y Bing Webmaster Tools. Enviar sitemap e inspeccionar URLs. Revisar que OAI-SearchBot no esté bloqueado en el borde de red. Permitir búsqueda es distinto de habilitar uso para entrenamiento.
8. Validar datos estructurados y medir experiencia móvil real. No se midieron Core Web Vitals ni se ejecutó una auditoría Lighthouse en esta revisión.
9. Medir impresiones, consultas, clics, reservas y conversiones por servicio. Ajustar con datos reales; no se garantiza ranking ni citas de IA.

## Fuentes

- Google, AI features: https://developers.google.com/search/docs/appearance/ai-features — los fundamentos de SEO aplican a AI Overviews y AI Mode; no se requiere un schema especial ni archivos de IA.
- Google, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide — títulos, enlaces, estructura, contenido útil y variaciones de búsqueda; no es necesario enumerar toda combinación.
- OpenAI, crawlers: https://developers.openai.com/api/docs/bots — OAI-SearchBot es para búsqueda y se configura de forma independiente de GPTBot.
- Vocabulario de servicios: https://mywak.com.co/ ; https://www.petbacker.com/es-es/d/colombia ; https://www.puppis.com.co/ ; https://vetas.com.co/hotel-y-guarderia/ ; https://callmyvet.co/collections/medicina-y-bienestar
- Teleorientación: https://www.animalesbog.gov.co/atencion-y-servicios-a-la-ciudadania/te-ayudamos/teleorientacion-medica-veterinaria
- Registro profesional: https://consejoprofesionalmvz.gov.co/

No se usa meta keywords ni repetición de palabras como sustituto de contenido útil. FAQPage no garantiza resultados enriquecidos. No se presentan empresas consultadas como aliados de Chomby.
