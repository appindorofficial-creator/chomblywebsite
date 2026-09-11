import {bookingConfigs} from './booking';
export type Lang='es'|'en';
export const route=(path:string,lang:Lang)=>lang==='en'?'/en'+(path==='/'?'':path):path;
export const districts=['Usaquén','Chapinero','Santa Fe','San Cristóbal','Usme','Tunjuelito','Bosa','Kennedy','Fontibón','Engativá','Suba','Barrios Unidos','Teusaquillo','Los Mártires','Antonio Nariño','Puente Aranda','La Candelaria','Rafael Uribe Uribe','Ciudad Bolívar','Sumapaz'];
const english=[
 ['Online veterinarian','Veterinary guidance from home. Choose the animal and tell us what you need.',['Online veterinary consultation'],'What would you like to ask?'],
 ['Bath & grooming','Baths, coat care and nail trims for dogs and cats.',['Bath and brushing','Bath and haircut','Nail trim'],'Coat and handling needs'],
 ['Dog walking','Individual or group walks, with pickup in your neighbourhood.',['Individual walk · 30 minutes','Individual walk · 60 minutes','Group walk · 60 minutes'],'Walking routine and behaviour'],
 ['Pet hotels','Overnight care, with arrival and departure dates in one booking.',['Overnight boarding'],'Food and care during the stay'],
 ['Daycare & pet sitters','Daytime company or a visit to your home.',['Half-day daycare · 4 hours','Full-day daycare · 8 hours','Home visit · 30 minutes'],'Daily routine and care instructions'],
 ['Dog training','Individual sessions to build everyday habits together.',['Initial assessment · 60 minutes','Home session · 60 minutes'],'What would you like to work on?'],
] as const;
const spanishDescriptions=['Orientación veterinaria desde casa. Elige tu animal y cuéntanos qué necesitas.','Baño, cuidado del pelo y corte de uñas para perros y gatos.','Paseos individuales o grupales con recogida en tu barrio.','Alojamiento por noches, con ingreso y salida en una sola reserva.','Compañía durante el día o una visita a tu domicilio.','Sesiones individuales para construir hábitos en familia.'];
export const images=['/service-vet.png','/service-grooming.png','/service-walking.png','/chomby-home.png','/chomby-home.png','/service-walking.png'];
export function catalog(lang:Lang){return bookingConfigs.map((c,i)=>({...c,title:lang==='en'?english[i][0]:c.title,description:lang==='en'?english[i][1]:spanishDescriptions[i],question:lang==='en'?english[i][3]:c.question,options:c.options.map((o,j)=>({...o,label:lang==='en'?english[i][2][j]:o.label})),image:images[i]}))}
export const animalName=(v:string,l:Lang)=>l==='en'?({'Perro':'Dog','Gato':'Cat','Ave':'Bird','Pequeño mamífero':'Small mammal','Otro animal':'Other animal'}[v]||v):v;
export const optionMode=(v:string,l:Lang)=>l==='en'?({'Videollamada':'Video call','En establecimiento':'At the establishment','Recogida en domicilio':'Home pickup','En tu domicilio':'At your home'}[v]||v):v;
export const statuses:Record<string,[string,string]>={requested:['Solicitud recibida','Request received'],quoted:['Propuesta disponible','Offer available'],payment_pending:['Pago en proceso','Payment processing'],confirmed:['Reserva confirmada','Booking confirmed'],cancelled:['Cancelada','Cancelled'],cancel_requested:['Cancelación solicitada','Cancellation requested'],refund_requested:['Revisión de reembolso','Refund review'],paid_attention:['Pago recibido · requiere revisión','Payment received · review needed'],completed:['Servicio completado','Service completed']};
export const statusName=(s:string,l:Lang)=>statuses[s]?.[l==='en'?1:0]||s;
export function faq(lang:Lang):[string,string][]{return lang==='en'?[
 ['How do I book?','Choose a service, enter your pet and preferred dates, then send a request. A verified professional must offer a time and final price before payment. Track everything in My bookings.'],
 ['Where does Chomby operate?','The initial launch focuses on Bogotá, Colombia. In-person services depend on a professional accepting your neighbourhood and animal.'],
 ['How much is a veterinary consultation?','US$10 is a provisional reference, not a charge. The final total in Colombian pesos must appear in your offer before payment. Other services are quoted individually.'],
 ['When is my appointment confirmed?','Only after a professional accepts and the payment provider confirms your payment. Sending a request alone does not book an appointment.'],
 ['Can I cancel or change dates?','You can cancel an unpaid request from My bookings. For a paid booking, request a cancellation for review; a refund is never marked complete automatically. To change dates, cancel the unpaid request and submit new dates.'],
 ['Does the chat diagnose my pet?','No. This assistant answers platform and booking questions using Chomby’s help information. For medical questions, request a veterinarian; emergencies require an in-person veterinary clinic.']
 ]:[
 ['¿Cómo agendo un servicio?','Elige el servicio, completa los datos de tu animal y tus fechas preferidas, y envía la solicitud. Un profesional revisado debe ofrecerte horario y precio final antes del pago. Sigue el proceso en Mis reservas.'],
 ['¿Dónde funciona Chomby?','El lanzamiento inicial se concentra en Bogotá, Colombia. Los servicios presenciales dependen de que un profesional acepte tu barrio y tu animal.'],
 ['¿Cuánto cuesta la consulta veterinaria?','US$10 es una referencia provisional, no un cobro. La propuesta debe mostrar el total final en pesos colombianos antes de pagar. Los demás servicios se cotizan de forma individual.'],
 ['¿Cuándo queda confirmada mi cita?','Cuando el profesional acepta y la pasarela confirma el pago. Enviar una solicitud por sí solo no confirma una cita.'],
 ['¿Puedo cancelar o cambiar las fechas?','Puedes cancelar una solicitud sin pagar desde Mis reservas. Para una reserva pagada, solicita la cancelación para revisión; el reembolso nunca se marca como realizado automáticamente. Para cambiar fechas, cancela la solicitud sin pagar y envía las nuevas fechas.'],
 ['¿El chat diagnostica a mi mascota?','No. Este asistente responde preguntas sobre la plataforma y las reservas con la información de ayuda de Chomby. Para preguntas médicas, solicita un veterinario; las urgencias requieren una clínica veterinaria presencial.']
 ]}
