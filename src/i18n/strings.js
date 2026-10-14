/* Every piece of interface text, in both languages.
   Add a key to both "en" and "es" when you add new text. */
export const T = {
  en:{
    intro:["Thank you for your interest in our holiday decorating services! We’re excited to help you create a festive atmosphere that reflects your unique style. Please take a moment to fill out this survey, which will help us understand your preferences and vision for the upcoming holiday season.","Once you submit your responses, we’ll review them and get back to you within 48 hours to discuss your ideas and provide pricing information tailored to your needs. We look forward to collaborating with you to make your holidays truly special!"],
    back:"Back", next:"Next", submit:"Submit", clear:"Clear form", step:(i,n)=>`Page ${i} of ${n}`,
    answer:"Your answer", required:"This is a required question", contactErr:"Please add a phone number or email so we can reach you.", nameErr:"Please add your name.", phoneErr:"Please enter a full phone number with area code, for example (555) 555-0100.", emailErr:"Please check your email address, for example name@example.com.", numberErr:"Please enter a number from 1 to 20.", dateErr:"Please choose today or a future date.",
    name:"Name", phone:"Phone", email:"Email", date:"Date",
    doneHead:"Thank you", doneTitle:"Your responses have been received.", doneBody:"We’ll review your answers and get back to you within 48 hours to discuss your ideas and pricing.",
    previewNote:"Preview: this page isn’t connected to an inbox yet, so these answers were not sent anywhere. Use Copy answers to send them by text or email.",
    sendErr:"We couldn’t send your answers. Check your connection and press Submit again.",
    copy:"Copy answers", copied:"Copied", again:"Submit another response", confirmClear:"Press again to clear all answers", foot:"Glamouratti · Holiday decorating",
    noAnswer:"—", yes:"Yes",
    navWork:"Our Work", navReviews:"Reviews", navForm:"Get a Quote",
    heroLine:"Holiday decorating for your home: custom trees, garlands, wreaths and table escapes, installed and taken down for you.",
    heroCta:"Start your holiday questionnaire",
    workTitle:"Our Work", workLede:"A few homes we’ve dressed for the season. Tap a photo to see it larger.",
    reviewsTitle:"Client Reviews", reviewsEmpty:"Client reviews will appear here. Worked with us? We’d love to hear from you below.",
    leaveReview:"Leave a review", ratingLabel:"Rating", reviewName:"Your name", reviewCity:"City (optional)", reviewText:"Tell us about your experience",
    reviewSend:"Send review", reviewThanks:"Thank you! Your review will appear once it’s approved.", reviewNeed:"Please choose a rating and write a few words.",
    reviewPreview:"Preview: reviews aren’t being sent anywhere yet.", formTitle:"Holiday Questionnaire", inLang:"Written in Spanish", close:"Close",
    seeWork:"See our work", workCtaTitle:"Love what you see?", workCtaBody:"Tell us about your home and your vision, and we’ll get back to you within 48 hours.", docHome:"Glamouratti · Holiday Decorating", docWork:"Our Work · Glamouratti", docForm:"Holiday Questionnaire · Glamouratti"
  },
  es:{
    intro:["¡Gracias por su interés en nuestros servicios de decoración navideña! Estamos emocionados en ayudarle a crear un ambiente festivo que refleje su estilo único. Por favor, tómese un momento para completar esta encuesta, que nos ayudará a entender sus preferencias y visión para la temporada navideña.","Una vez que envíe sus respuestas, las revisaremos y nos pondremos en contacto con usted dentro de 48 horas para discutir sus ideas y proporcionar información sobre precios adaptándonos a sus necesidades. ¡Esperamos colaborar con usted para hacer que su visión sea realmente especial!"],
    back:"Atrás", next:"Siguiente", submit:"Enviar", clear:"Borrar formulario", step:(i,n)=>`Página ${i} de ${n}`,
    answer:"Tu respuesta", required:"Esta pregunta es obligatoria", contactErr:"Por favor agrega un teléfono o correo electrónico para poder contactarte.", nameErr:"Por favor agrega tu nombre.", phoneErr:"Por favor escribe un número de teléfono completo con código de área, por ejemplo (555) 555-0100.", emailErr:"Por favor revisa tu correo electrónico, por ejemplo nombre@ejemplo.com.", numberErr:"Por favor escribe un número del 1 al 20.", dateErr:"Por favor elige hoy o una fecha futura.",
    name:"Nombre", phone:"Teléfono", email:"Correo electrónico", date:"Fecha",
    doneHead:"Gracias", doneTitle:"Hemos recibido tus respuestas.", doneBody:"Revisaremos tus respuestas y te contactaremos dentro de 48 horas para hablar de tus ideas y precios.",
    previewNote:"Vista previa: esta página aún no está conectada a un correo, así que estas respuestas no se enviaron. Usa Copiar respuestas para enviarlas por mensaje o correo.",
    sendErr:"No pudimos enviar tus respuestas. Revisa tu conexión y presiona Enviar de nuevo.",
    copy:"Copiar respuestas", copied:"Copiado", again:"Enviar otra respuesta", confirmClear:"Presiona otra vez para borrar todo", foot:"Glamouratti · Decoración navideña",
    noAnswer:"—", yes:"Sí",
    navWork:"Nuestro Trabajo", navReviews:"Reseñas", navForm:"Cotización",
    heroLine:"Decoración navideña para tu hogar: árboles personalizados, guirnaldas, coronas y montajes de mesa, instalados y retirados por nosotros.",
    heroCta:"Comienza tu cuestionario navideño",
    workTitle:"Nuestro Trabajo", workLede:"Algunos hogares que hemos decorado para la temporada. Toca una foto para verla más grande.",
    reviewsTitle:"Reseñas de Clientes", reviewsEmpty:"Aquí aparecerán las reseñas de nuestros clientes. ¿Trabajaste con nosotros? Nos encantaría saber de ti abajo.",
    leaveReview:"Deja una reseña", ratingLabel:"Calificación", reviewName:"Tu nombre", reviewCity:"Ciudad (opcional)", reviewText:"Cuéntanos sobre tu experiencia",
    reviewSend:"Enviar reseña", reviewThanks:"¡Gracias! Tu reseña aparecerá una vez aprobada.", reviewNeed:"Por favor elige una calificación y escribe unas palabras.",
    reviewPreview:"Vista previa: las reseñas aún no se envían a ningún lugar.", formTitle:"Cuestionario Navideño", inLang:"Escrita en inglés", close:"Cerrar",
    seeWork:"Ver nuestro trabajo", workCtaTitle:"¿Te gusta lo que ves?", workCtaBody:"Cuéntanos sobre tu hogar y tu visión, y te contactaremos dentro de 48 horas.", docHome:"Glamouratti · Decoración Navideña", docWork:"Nuestro Trabajo · Glamouratti", docForm:"Cuestionario Navideño · Glamouratti"
  }
};