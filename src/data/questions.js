/* The questionnaire: sections and questions in both languages.
   type: text | textarea | number (whole number, min–max) | date (today or later) | radio | check | pics | contact
   "pics" options show a photo from public/img. */
export const SECTIONS = [
  {title:{es:"Información de Contacto",en:"Contact Information"}, qs:[
    {id:"contact", type:"contact", label:{es:"Nombre, Teléfono y Correo Electrónico",en:"Name, Phone & Email"}}
  ]},
  {title:{es:"Preferencias Generales",en:"General Preferences"}, qs:[
    {id:"theme", type:"text", label:{es:"¿Qué temática o color en específico tienes en mente para este año?",en:"What specific theme or color scheme do you have in mind for this year?"}},
    {id:"areas", type:"text", label:{es:"¿Qué áreas de tu hogar te gustaría decorar (p. ej., sala, entrada, comedor)?",en:"What areas of your home would you like decorated (e.g., living room, entryway, dining room)?"}}
  ]},
  {title:{es:"Elementos de Diseño",en:"Design Elements"}, qs:[
    {id:"treeStyle", type:"pics", label:{es:"¿Qué estilo de árbol prefieres?",en:"What style of tree do you prefer?"}, options:[
      {v:"sectioned", img:"tree-sectioned", es:"Sectorizado", en:"Themed – Sectioned"},
      {v:"traditional", img:"tree-traditional", es:"Tradicional", en:"Traditional"}]},
    {id:"treeType", type:"pics", label:{es:"¿Qué tipo de árbol prefieres?",en:"What type of tree do you prefer?"}, options:[
      {v:"snowy", img:"tree-snowy", es:"Árbol Nevado", en:"Snowy Tree"},
      {v:"pine", img:"tree-pine", es:"Pino Artificial", en:"Artificial Pine Tree"}]}
  ]},
  {title:{es:"Toques Personales",en:"Personal Touches"}, qs:[
    {id:"heirlooms", type:"text", label:{es:"¿Hay algún objeto personal o herencia familiar que te gustaría que incorporáramos en la decoración?",en:"Are there any personal items or family heirlooms you’d like us to incorporate into the decor?"}},
    {id:"motifs", type:"text", label:{es:"¿Tienes símbolos navideños favoritos (por ejemplo, copos de nieve, estrellas, Santa)?",en:"Do you have any favorite holiday motifs or symbols (e.g., snowflakes, stars, Santa)?"}}
  ]},
  {title:{es:"Árboles de Navidad",en:"Christmas Trees"}, qs:[
    {id:"treeCount", type:"number", min:1, max:20, label:{es:"¿Cuántos árboles de Navidad te gustaría tener?",en:"How many Christmas trees would you like to have?"}},
    {id:"treeSize", type:"text", chart:true, label:{es:"¿Qué tamaño de árbol prefieres (por ejemplo, de mesa, 6 pies, 9 pies)?",en:"What size of tree do you prefer (e.g., tabletop, 6 ft, 9 ft)?"}},
    {id:"ornaments", type:"text", label:{es:"¿Tienes decoraciones u ornamentos específicos que quieras incluir?",en:"Do you have any specific decorations or ornaments you want to include?"}}
  ]},
  {title:{es:"Guirnaldas y Coronas",en:"Garlands and Wreaths"}, qs:[
    {id:"garlands", type:"check", label:{es:"¿Dónde te gustaría que se colocaran las guirnaldas y las coronas?",en:"Where would you like the garlands and wreaths placed?"}, options:[
      {v:"entryway", es:"Entrada", en:"Entryway"},
      {v:"railing", es:"Escaleras", en:"Staircase railing"},
      {v:"fireplace", es:"Chimenea", en:"Fireplace"}]}
  ]},
  {title:{es:"Montaje de Mesa",en:"Table Escapes"}, qs:[
    {id:"tableStyle", type:"pics", label:{es:"¿Qué estilo de montaje de mesa prefieres?",en:"What style of table escape do you prefer?"}, options:[
      {v:"modern", img:"table-modern", es:"Moderno", en:"Modern"},
      {v:"traditional", img:"table-traditional", es:"Tradicional", en:"Traditional"},
      {v:"elegant", img:"table-elegant", es:"Elegante", en:"Elegant"}]},
    {id:"tableMaterials", type:"text", label:{es:"¿Hay colores o materiales específicos que quieras incorporar?",en:"Are there any specific colors or materials you want incorporated?"}}
  ]},
  {title:{es:"Logística",en:"Logistics"}, qs:[
    {id:"budget", type:"radio", label:{es:"¿Cuál es tu presupuesto aproximado para las decoraciones navideñas?",en:"What is your approximate budget for holiday decorations?"}, options:[
      {v:"700-1000", es:"$700 – $1,000", en:"$700 – $1,000"},
      {v:"1500-3000", es:"$1,500 – $3,000", en:"$1,500 – $3,000"},
      {v:"3000+", es:"$3,000+ (Propuesta personalizada)", en:"$3,000+ (Custom proposal)"}]},
    {id:"installDate", type:"date", label:{es:"¿Cuándo te gustaría que se instalaran las decoraciones?",en:"When would you like the decorations to be installed?"}}
  ]},
  {title:{es:"Consideraciones Adicionales",en:"Additional Considerations"}, qs:[
    {id:"traditions", type:"text", label:{es:"¿Tienes alguna tradición familiar o decoraciones sentimentales que te gustaría incluir?",en:"Are there any family traditions or sentimental decorations that you would like to include?"}},
    {id:"avoid", type:"text", label:{es:"¿Hay elementos específicos que quieras evitar en tu decoración?",en:"Are there any specific items you want to avoid in your decor?"}}
  ]},
  {title:{es:"Toques Finales",en:"Final Touches"}, qs:[
    {id:"takedown", type:"text", label:{es:"¿Cuándo te gustaría que se quitaran las decoraciones?",en:"When would you like your decorations taken down?"}},
    {id:"other", type:"textarea", label:{es:"¿Hay algo más que te gustaría compartir sobre tus preferencias o expectativas?",en:"Is there anything else you would like to share about your preferences or expectations?"}}
  ]}
];