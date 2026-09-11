# Chomby — agendamiento por rubro

Versión preparada el 1 de septiembre de 2026. Cada servicio tiene su ruta `/agendar/<slug>`, accesible desde su página de información y desde la tarjeta del inicio.

## Recorrido completo

1. Animal: especie compatible, nombre, edad, tamaño, ciudad y zona.
2. Servicio: modalidad, instrucciones y campos propios del rubro.
3. Profesional: perfiles ficticios filtrados por especie y ciudad.
4. Agenda: calendario, horarios compatibles, recurrencia o fechas de estancia.
5. Contacto: datos de ejemplo; dirección cuando se requiere domicilio o recogida.
6. Resumen: información completa, precio provisional o cotización pendiente, aviso de demostración y aceptación explícita.
7. Resultado: referencia temporal, solicitud pendiente de aceptación simulada, edición de fecha/hora y cancelación con confirmación.

## Diferencias entre rubros

| Rubro | Datos y reglas propias |
|---|---|
| Veterinaria online | Especie, motivo, profesional compatible, videollamada, sesión de ejemplo de 30 minutos y US$10 provisional. |
| Peluquería | Baño/cepillado, baño/corte o uñas; tamaño, tipo de pelo, instrucciones y bloque de tiempo según servicio. |
| Paseadores | Paseo individual de 30 o 60 minutos, o grupal; convivencia, recogida en domicilio; una vez o cuatro sesiones semanales. |
| Hotel | Ingreso y salida, horario de ambos, cálculo de noches, cuidados/alimentación y comprobación de todas las noches del rango de ejemplo. |
| Guardería | Media jornada de 4 horas, jornada de 8 horas o visita a domicilio de 30 minutos; instrucciones, dirección si aplica y recurrencia opcional. |
| Entrenamiento | Valoración o sesión a domicilio de 60 minutos; objetivos, dirección si aplica y recurrencia opcional. |

Todos los tiempos y modalidades son ilustrativos. No constituyen disponibilidad real. No se anuncian tarifas numéricas nuevas: salvo veterinaria, el precio aparece como cotización pendiente en COP.

## Validaciones

- Fechas desde mañana hasta 90 días, calculadas con fecha de Colombia.
- El horario completo debe caber en la disponibilidad de ejemplo y no solaparse con bloques ocupados.
- Las cuatro sesiones recurrentes deben tener un horario común y quedar dentro del rango permitido.
- Hotel exige al menos una noche, salida válida y ninguna noche ocupada en el rango (salida excluida).
- Se impiden perfiles incompatibles con especie o ciudad.
- Paseos grupales requieren confirmación de convivencia; domicilio requiere dirección.
- La revisión final vuelve a validar todas las etapas. Cualquier edición desmarca la aceptación final.
- Formularios no indexables y excluidos del sitemap, incluso tras una eventual activación de indexación comercial.

## Límites operativos

Este cambio completa los recorridos interactivos del prototipo. No hay base de datos de reservas, cuentas reales, sincronización de calendarios, bloqueo transaccional de cupos, cotizaciones del proveedor, pagos, videollamadas ni notificaciones. La información queda en memoria de la vista y desaparece al salir o recargar; no se envían datos personales. Cancelar o reprogramar solo cambia la simulación actual.

Para operación real, se requiere conectar el directorio aprobado, disponibilidad y capacidad, reservas con bloqueo de conflictos, cotizaciones y aceptación, pagos, cancelaciones, notificaciones y permisos de acceso. El flujo debe conservar el estado pendiente hasta que proveedor/cliente completen los pasos correspondientes; no debe presentar una solicitud sin precio como una reserva confirmada.

## Publicación

Al iniciar esta modificación, Sites informó que el acceso pasó a público (revisión de acceso 2). La versión anterior conserva noindex. Esta nueva versión se preparará y guardará antes de pedir la aprobación de publicación pública exigida por sites-hosting.
