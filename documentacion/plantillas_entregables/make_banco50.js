const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, Footer, PageNumber,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, HeadingLevel,
} = require("docx");

const VF = ["Verdadero", "Falso"];
// [enunciado, opciones, índice(s) correcto, explicación, nota (opcional)]
const Q = [
  ["Los signos abióticos o inmediatos sirven para afirmar o certificar la muerte real.", VF, 0,
   "Basile (p. 361) lo dice casi textual al hablar del cronotanatodiagnóstico: los signos abióticos o inmediatos sirven para afirmar o certificar la muerte real. Los signos mediatos sirven para calcular el tiempo de muerte."],
  ["Complete el enunciado: Se observa un cambio de color, especialmente en la piel del ____ más notorio en la fosa ilíaca derecha, que se denomina ____.",
   ["Tórax anterior - Saponificación.", "Ninguna es correcta.", "Cuerpo - Corificación.", "Tórax - Putrefacción."], 1,
   "Basile (p. 384): piel del abdomen, mancha verde abdominal (período cromático). Ninguna opción trae esas dos palabras."],
  ["Complete el enunciado: Cada cadáver se enfría de manera ____ dependiendo de los vestidos que llevan puestos; los niños, los ancianos y los enfermos de afecciones consuntivas se enfrían más ____ que los obesos y bien nutridos.",
   ["Tardía - a menudo.", "Similar - lentamente.", "Distinta - rápidamente.", "Ninguna es correcta."], 2,
   "Basile (p. 365): cada cadáver se enfría de manera distinta; niños, ancianos y enfermos consuntivos se enfrían más rápidamente que los obesos y bien nutridos."],
  ["Entre las variables que inciden en la instauración de la rigidez tenemos:",
   ["El frío o el calor.", "La masa muscular.", "La robustez del individuo.", "Todas son correctas."], 3,
   "Basile (p. 368): la rigidez varía según la robustez y las masas musculares (infantes y viejos la presentan precoz), y el frío la prolonga mientras el calor la acorta."],
  ["Es una variedad impuesta por la ciencia para investigar determinadas patologías de interés sanitario:",
   ["Ninguna es correcta.", "Autopsia epidemiológica.", "Autopsia medicolegal.", "Autopsia clínica."], 1,
   "Basile, variedades de autopsia (Cap. X): la epidemiológica investiga patologías de interés sanitario (epidemias, intoxicaciones, etc.). La clínica coteja la historia clínica con el cadáver."],
  ["Es la calidad dañosa que toman las cosas o la alteración orgánica generada por bacterias:",
   ["Deshidratación.", "Putrefacción.", "Rigidez.", "Ninguna es correcta."], 1,
   "Basile (procesos reductivos, Cap. X): putrefacción, del latín putrefactio, es la calidad dañosa que toman las cosas o la alteración orgánica generada por bacterias."],
  ["Tiene por objeto estudiar una determinada enfermedad o lesión en el organismo, los sistemas y aparatos alterados por la acción patógena:",
   ["Autopsia clínica.", "Autopsia medicolegal.", "Autopsia epidemiológica.", "Autopsia científica."], 3,
   "Basile, variedades de autopsia (Cap. X): la autopsia científica estudia una enfermedad o lesión y los sistemas alterados por la acción patógena."],
  ["El estudio de las livideces cadavéricas aporta significativamente a la investigación forense ya que:",
   ["Permite determinar la posición inicial del cadáver en el momento de examen pericial.", "Permite determinar el elemento empleado por el agresor.", "Permite determinar la data de la muerte.", "Permite determinar la manera de muerte."], 0,
   "Basile (p. 371): las manchas de difusión permiten determinar cuál era la posición primitiva del cadáver en el momento del examen pericial."],
  ["Corresponde al primer período en la marcha del proceso putrefactivo:",
   ["Período colicuativo.", "Período cromático.", "Período enfisematoso.", "Ninguna es correcta."], 1,
   "Basile (pp. 383-384): los tres períodos, por orden de aparición, son cromático, gaseoso o enfisematoso y colicuativo o autolítico."],
  ["Respecto al enfriamiento cadavérico, cuando el cuerpo se encuentra caliente, flexible y sin livideces, se aproxima una muerte:",
   ["Mayor a 36 horas.", "Menor a 12 horas.", "Menor de 6 a 8 horas.", "Ninguna es correcta."], 2,
   "Tabla de Vibert (Basile, p. 363): caliente, flexible, sin livideces, menos de 6 a 8 horas."],
  ["En el caso de un presunto suicidio, las livideces deben buscarse en:",
   ["Tórax anterior.", "Manos, piernas y pies.", "Cabeza y cuello.", "Zona lumbar."], 1,
   "Basile (p. 371): en el cadáver suspendido por el cuello, como en la ahorcadura, las livideces se buscan en manos, piernas y pies."],
  ["Se produce luego de las 24 horas posteriores al deceso; comienza a visualizarse en el cadáver una red venoso-linfática de color verdoso o rojo negruzco:",
   ["Período enfisematoso.", "Período cromático.", "Ninguna es correcta.", "Período colicuativo."], 0,
   "Basile (p. 385): período enfisematoso, con la circulación póstuma de Brouardel."],
  ["En los ahogados o en los cuerpos sumergidos en el agua, a la inversa que en la deshidratación, el cadáver de un hombre adulto:",
   ["Disminuye de peso y volumen.", "Aumenta de peso y volumen.", "Mantiene su peso y volumen."], 1,
   "Basile (p. 372): aumenta de peso y volumen. Simonin calcula un 14 % más de peso entre el día 90 y el 140 de sumersión."],
  ["Si se moviliza un cadáver de su posición inicial antes de las 12 horas del óbito, las nuevas livideces:",
   ["Se desplazan en ciertos casos.", "Se desplazan de acuerdo a la ley de gravedad.", "No se desplazan.", "Ninguna es correcta."], 1,
   "Basile (p. 371): antes de las 12 horas las nuevas livideces se desplazan según la ley de gravedad. Después de ese lapso se fijan donde estaban."],
  ["Los tejidos comienzan a licuarse, dando por resultado la reducción completa o incompleta del cadáver:",
   ["Período colicuativo.", "Período cromático.", "Período enfisematoso.", "Ninguna es correcta."], 0,
   "Basile (pp. 387-388): período colicuativo o autolítico, dura de 8 a 10 meses."],
  ["¿Cuál de las siguientes corresponde a una forma de muerte violenta?",
   ["Todas son correctas.", "Suicidio.", "Homicidio.", "Accidente."], 0,
   "Las formas de muerte violenta son homicidio, suicidio y accidente.",
   "Respondida por concepto, sin cita textual de Basile. Confirmar con la guía de la clase."],
  ["Complete el enunciado: Las livideces cadavéricas son de color ____ y las manchas de putrefacción abdominal son de color ____.",
   ["Rojo - Azul.", "Verde - Rojizo.", "Ninguna es correcta.", "Violáceo - Verde."], 3,
   "Basile (pp. 370 y 384-385): livideces violáceas, mancha verde abdominal. Las manchas verdes son independientes de la posición del cadáver."],
  ["Incisión que va desde la región submentoniana, siguiendo la línea media del cuerpo hacia el pubis, sorteando hacia la izquierda (del cadáver) el ombligo:",
   ["Técnica de Lecha Marzo.", "Técnica de Virchow.", "Ninguna es correcta.", "Técnica de Rokitansky."], 1,
   "Basile (p. 409): técnica de Virchow, incisión mento-pubiana. Evita seccionar el ligamento suspensorio del hígado. Lecha Marzo hace primero una incisión biclavicular. Rokitansky es una técnica de extracción de vísceras."],
  ["Indica la acción suicida con el arma empuñada y presionando la cola del disparador:",
   ["Signo de Simonin.", "Signo de Nerio Rojas.", "Signo de boca de mina de Hoffman.", "Signo de Puppe."], 3,
   "Basile (p. 369): signo de Puppe, por el espasmo cadavérico. No se confunda con el Puppe-Werkgartner de balística (p. 260)."],
  ["Se instala inmediatamente en la víctima en el instante de la muerte:",
   ["Rigidez cadavérica.", "Lividez cadavérica.", "Espasmo cadavérico.", "Enfriamiento."], 2,
   "Basile (p. 369): el espasmo cadavérico se instala en el instante de la muerte. En la rigidez hay primero una relajación completa."],
  ["La desaparición de la rigidez cadavérica ocurre:",
   ["Ninguna es correcta.", "Al segundo o tercer día cuando inicia la putrefacción.", "Luego de 6 horas de la muerte.", "Una vez instauradas las livideces."], 1,
   "Basile (p. 367): al segundo o tercer día, con el inicio de la putrefacción (24 a 36 horas después del fallecimiento)."],
  ["Inicia la etapa cromática de la putrefacción que dura de una semana a 10 días:",
   ["Rigidez cadavérica.", "Licuefacción de órganos internos.", "Mancha verde abdominal.", "Maceración."], 2,
   "Basile (p. 384, Fig. 46): la mancha verde abdominal. Suele comenzar en la fosa ilíaca derecha (región del ciego)."],
  ["El espasmo cadavérico se debe a la producción de una lesión o impacto agudo en áreas del:",
   ["Espasmo cadavérico.", "Hemisferios cerebrales.", "Tronco encefálico.", "Diencéfalo.", "Se instala inmediatamente en la víctima en el instante de la muerte.", "Ninguna es correcta."], 3,
   "Basile (p. 369): lesión o impacto agudo en áreas del diencéfalo, donde están los núcleos de la base cerebral, en especial el núcleo rojo."],
  ["La rigidez cadavérica comienza generalmente:",
   ["En los músculos de la mandíbula.", "En el tórax.", "Todas son correctas.", "En las extremidades superiores."], 0,
   "Basile (p. 367): comienza en los músculos de la mandíbula (maseteros), sigue con la nuca, los miembros superiores, el tórax, el abdomen y por último los miembros inferiores."],
  ["Las livideces alcanzan su máximo color y fijación entre:",
   ["Las 18 y 20 horas posteriores al deceso.", "Las 5 y 7 horas posteriores al deceso.", "Las 3 y 5 horas posteriores al deceso.", "Las 12 y 15 horas posteriores al deceso."], 3,
   "Basile (p. 371): máximo color y fijación entre las 12 y 15 horas. Se hacen evidentes entre las 3 y 5 horas."],
  ["Ocurre como consecuencia de la evaporación del agua de los tejidos cadavéricos; se produce una pérdida de agua corporal. Este fenómeno se conoce como:",
   ["Deshidratación.", "Rigidez.", "Ninguna es correcta.", "Espasmo."], 0,
   "Basile (p. 372) trata la deshidratación cadavérica: el adulto pierde entre 10 y 18 gramos por kilo y por día.",
   "Respondida por concepto, sin la frase exacta del enunciado. Confirmar con la guía."],
  ["Se presentan como manchas negruzcas localizadas en los ángulos externos de los globos oculares:",
   ["Signo de Legrand.", "Signo de Sommer-Larcher.", "Ninguna es correcta.", "Signo de Yan-Kie."], 1,
   "Basile (p. 373): signo de Sommer-Larcher, entre 3 y 5 horas después de la muerte. Legrand es la pérdida de transparencia de los medios del ojo. Yan-Kie es la desecación de la mucosa bucal."],
  ["La adipocira corresponde a:",
   ["Un proceso conservador del cadáver.", "Un signo inmediato de la muerte.", "Ninguna es correcta.", "Un signo mediato de la muerte."], 0,
   "Basile (pp. 378-379): la adipocira es un proceso conservador, de los menos frecuentes. Adipocira completa: 9 meses a 1 año."],
  ["Capítulo de la tanatología que efectúa el estudio de los signos indicativos del tiempo transcurrido desde el momento de la muerte real:",
   ["Agonoquimia.", "Agonía.", "Cronotanatodiagnóstico.", "Agonología."], 2,
   "Basile (p. 361): cronotanatodiagnóstico."],
  ["La autopsia medicolegal es el procedimiento médico quirúrgico, técnico y científico destinado a determinar únicamente la manera de muerte, mediante la apertura sistemática, prolija y completa del cadáver.", VF, 1,
   "Basile (pp. 399-400): determina las causas y la manera de muerte, o las condiciones en que esta se produjo. La palabra únicamente lo vuelve falso."],
  ["El espasmo cadavérico se produce porque ciertos grupos musculares, en el momento de la muerte, permanecen en la posición que tenían en el último instante de su vida.", VF, 0,
   "Basile (p. 369), cita textual."],
  ["Las livideces cadavéricas se tornan más evidentes entre las:",
   ["15 a 17 horas posteriores a la muerte.", "1 y 2 horas posteriores a la muerte.", "8 a 10 horas posteriores a la muerte.", "3 y 5 horas posteriores a la muerte."], 3,
   "Basile (p. 371): evidentes entre las 3 y 5 horas. Máximo y fijación entre las 12 y 15 horas."],
  ["La cabeza generalmente adquiere aspecto hinchado, tornándose irreconocibles las facciones, con párpados agrandados que impiden observar espontáneamente los globos oculares. Esta descripción corresponde a un signo típico del período:",
   ["Cromático.", "Ninguna es correcta.", "Enfisematoso.", "Colicuativo."], 2,
   "Basile (pp. 386-387): período enfisematoso, por la distensión que producen los gases de putrefacción."],
  ["Es un proceso que suele observarse en cadáveres depositados en nichos o bóvedas:",
   ["Adipocira.", "Corificación.", "Deshidratación.", "Saponificación."], 1,
   "Basile (p. 380): corificación, del latín corium, cuero. La piel queda coriácea y suena a la percusión como el parche de un tambor."],
  ["Es el proceso reductivo caracterizado por la destrucción o desaparición completa de las partes blandas del cadáver:",
   ["Esqueletización.", "Ninguna es correcta.", "Maceración.", "Licuefacción."], 0,
   "Basile (p. 381): esqueletización, el proceso reductivo por antonomasia. La maceración la considera una forma de conservación."],
  ["Referente a las radiografías en el procedimiento de autopsia:",
   ["Solo son necesarias en hechos de muertes por arma de fuego.", "Sirven para localizar cuerpos extraños.", "Ninguna es correcta.", "No son necesarias ya que no forman parte del procedimiento."], 1,
   "Basile (p. 402): sirven para localizar cuerpos extraños y para visualizar otros elementos que pasaron inadvertidos en el examen post-mortem."],
  ["Según Simonin, la rigidez cadavérica se inicia:",
   ["10 a 12 horas.", "6 a 8 horas.", "3 o 4 horas después de la muerte.", "15 a 17 horas."], 2,
   "Basile (pp. 366-367): a las 3 o 4 horas, y se consolida a las 12 o 13 horas."],
  ["¿En qué tipo de hechos es obligatoria la autopsia medicolegal?",
   ["En muertes por accidentes de tránsito.", "En todas las anteriores.", "En muertes por presunto suicidio.", "En muertes con etiología homicida."], 1,
   "Procede en muertes violentas o de sospecha de criminalidad, y las tres opciones entran: homicidio, presunto suicidio y accidente de tránsito.",
   "Respondida por concepto, sin cita textual de Basile. Confirmar con la guía."],
  ["El espasmo cadavérico y la rigidez constituyen el mismo fenómeno cadavérico.", VF, 1,
   "Basile (p. 369): no deben confundirse, son fenómenos diferentes. El espasmo es inmediato. La rigidez viene después de una relajación y empieza a las 3 o 4 horas."],
  ["Dura de 8 a 10 meses y también se denomina autolisis:",
   ["Todas las anteriores.", "Período enfisematoso.", "Período cromático.", "Período colicuativo."], 3,
   "Basile (p. 387): período colicuativo (autolítico)."],
  ["Una vez producida la muerte, el cuerpo se enfría hasta alcanzar la temperatura ambiente. Este proceso se lleva a cabo en un tiempo aproximado de:",
   ["5 o 7 horas.", "15 a 17 horas.", "10 o 12 horas.", "1 o 2 horas."], 2,
   "Basile (p. 361): al cabo de diez o doce horas. El cuerpo pasa de homeotermo a poiquilotermo."],
  ["Son los más frecuentes en la evolución de los procesos cadavéricos:",
   ["Procesos reductores del cadáver.", "Todas son correctas.", "Procesos conservadores del cadáver.", "Corificación."], 0,
   "Basile (p. 379): los procesos conservadores son los menos frecuentes en la observación médico-legal. Los más frecuentes son los reductivos."],
  ["Es la que se realiza por disposición de la autoridad competente, por médicos oficialmente designados, con el fin de establecer la causa, el mecanismo y la manera de muerte en un adulto, en un niño, en un recién nacido, en un feto o en restos humanos:",
   ["Ninguna es correcta.", "Autopsia medicolegal.", "Autopsia clínica.", "Autopsia científica."], 1,
   "Es la autopsia ordenada por autoridad competente. La científica y la clínica no requieren orden judicial.",
   "Respondida por concepto, sin la frase exacta en Basile. Confirmar con la guía."],
  ["La falta de oxígeno y de intercambios metabólicos en los tejidos musculares cadavéricos, junto a la acumulación de ácido láctico provocados por la muerte, desencadenan un proceso de endurecimiento, fijación y retracción muscular llamado espasmo cadavérico.", VF, 1,
   "Eso describe la rigidez cadavérica (Basile, p. 367). El espasmo (p. 369) nace de una lesión en el diencéfalo y es inmediato."],
  ["La deshidratación cadavérica depende, en gran medida:",
   ["Ninguna es correcta.", "De las condiciones climáticas.", "Del mecanismo de la muerte.", "De la causa de la muerte."], 1,
   "Basile (p. 372): depende de las condiciones climáticas: humedad, calor, exposición a la intemperie o al sol, y presión barométrica."],
  ["No representa mayor interés médico-legal el lugar de hallazgo del cadáver, es decir, si este ha sido encontrado en un lugar cerrado.", VF, 1,
   "Basile (p. 365): se tendrá presente la estación del año y si el cadáver fue hallado en un lugar cerrado, abrigado o desamparado. Los cadáveres arropados conservan más tiempo el calor."],
  ["¿Cuál de los siguientes no constituye un signo mediato de la muerte?",
   ["Enfriamiento.", "Ninguna de las anteriores.", "Livideces.", "Rigidez cadavérica."], 1,
   "Basile (p. 361): los signos mediatos son enfriamiento, rigidez, livideces y deshidratación. Las tres opciones lo son, así que ninguna es la respuesta."],
  ["Existen normas estrictamente establecidas para la ejecución de la autopsia médico-legal, es decir, dicho procedimiento no puede variar en ningún caso.", VF, 1,
   "Basile (pp. 405-406): no se pueden establecer normas estrictas, porque cada hallazgo puede alterar la secuencia. Propone solo un orden estimativo."],
  ["Una vez examinadas las prendas de vestir del cadáver, estas deben ser:",
   ["Desechadas para evitar contaminación.", "Remitidas al laboratorio de criminalística.", "Entregadas a los familiares junto a las demás pertenencias del occiso.", "Todas son correctas."], 1,
   "Basile (p. 406): examinadas las ropas, se envían al laboratorio para los estudios químicos o criminalísticos."],
  ["La piel adquiere en las partes declives del cadáver un color violáceo, como resultado del desplazamiento de la sangre, que responde a la ley de gravedad. Este fenómeno cadavérico se conoce como:",
   ["Signo de Stenon-Louis.", "Ninguna es correcta.", "Rigidez cadavérica.", "Livideces e hipostasias cadavéricas."], 3,
   "Basile (p. 370): livideces e hipostasias, también llamadas manchas cadavéricas. Stenon-Louis es la atonía del globo ocular, un signo de deshidratación."],
];

const FONT = "Arial";
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: 22, ...o });
const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { after: 80, line: 276 }, ...o });
const L = "abcdef";

const children = [];
children.push(new Paragraph({
  heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, spacing: { after: 120 },
  children: [new TextRun({ text: "Medicina Legal: banco de 50 preguntas de la AA", font: FONT, size: 36, bold: true })],
}));
children.push(para(run("Unidad 1, Tanatología forense. Material de estudio con las 50 preguntas del test, la respuesta correcta y el pasaje de Basile que la respalda.", { italics: true }), { alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
children.push(para([run("Fuente: ", { bold: true }), run("Basile, A. (2023). Tratado de Medicina Legal para médicos y abogados. Cathedra Jurídica. Cap. X, Tanatología forense. Las páginas citadas son las impresas en el libro; vienen de una lectura por OCR, así que conviene verificar la cifra en el libro si va a entrar en un trabajo.")]));
children.push(para([run("Estas preguntas se contestaron por concepto, sin cita textual de Basile: ", { bold: true }), run("16, 26, 38 y 43. Quedan marcadas en su lugar. Si el docente dio otra respuesta en clase, vale la de la guía.")], { spacing: { after: 240 } }));

// Cuadro de repaso
const bd = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
const borders = { top: bd, bottom: bd, left: bd, right: bd };
const W = [3600, 5760];
const cell = (t, w, hdr) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders,
  shading: hdr ? { fill: "E7E6E6", type: ShadingType.CLEAR, color: "auto" } : undefined,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: [para(run(t, { bold: !!hdr, size: 20 }), { spacing: { after: 0 } })],
});
const rows = [
  ["Dato para repasar", "Cifra (Basile)"],
  ["Cuerpo iguala la temperatura ambiente", "10 a 12 horas (p. 361)"],
  ["Tabla de Vibert", "< 6-8 h caliente, flexible, sin livideces; < 12 h tibio, rígido, livideces borrables; < 24 h frío, rígido, livideces fijas; > 36 h sin rigidez, mancha verde (p. 363)"],
  ["Rigidez: inicio y consolidación", "3 o 4 h, consolida a 12 o 13 h (Simonin, pp. 366-367)"],
  ["Rigidez: orden", "Mandíbula, nuca, miembros superiores, tórax, abdomen, miembros inferiores (p. 367)"],
  ["Rigidez: desaparición", "2.º o 3.er día, con la putrefacción (p. 367)"],
  ["Livideces: evidentes", "3 a 5 horas (p. 371)"],
  ["Livideces: máximo y fijación", "12 a 15 horas (p. 371)"],
  ["Sommer-Larcher", "Manchas negruzcas en ángulos externos del ojo, 3 a 5 h (p. 373)"],
  ["Períodos de putrefacción", "Cromático (mancha verde, 1 semana a 10 días), enfisematoso (desde las 24 h), colicuativo (8 a 10 meses) (pp. 383-388)"],
  ["Procesos conservadores", "Adipocira, saponificación, corificación (nichos, bóvedas), momificación. Poco frecuentes (pp. 378-380)"],
  ["Proceso reductivo final", "Esqueletización (p. 381)"],
  ["Espasmo cadavérico", "Instantáneo, lesión en el diencéfalo; signo de Puppe: suicidio con arma empuñada (p. 369)"],
];
children.push(para(run("Cuadro de repaso rápido", { bold: true, size: 26 }), { spacing: { before: 120, after: 100 } }));
children.push(new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: W,
  rows: rows.map((r, i) => new TableRow({ children: [cell(r[0], W[0], i === 0), cell(r[1], W[1], i === 0)] })),
}));
children.push(para(run(""), { spacing: { after: 160 } }));
children.push(para(run("Preguntas y respuestas", { bold: true, size: 26 }), { spacing: { before: 200, after: 120 } }));

Q.forEach((q, i) => {
  const [stem, opts, ans, exp, note] = q;
  children.push(new Paragraph({
    keepNext: true, spacing: { before: 200, after: 60, line: 276 },
    children: [run(`${i + 1}. `, { bold: true }), run(stem)],
  }));
  opts.forEach((o, k) => {
    const ok = k === ans;
    children.push(new Paragraph({
      keepNext: true, indent: { left: 540, hanging: 300 }, spacing: { after: 20, line: 264 },
      children: [run(`${opts === VF ? "" : L[k] + ". "}${o}`, ok ? { bold: true } : {})],
      ...(ok ? { shading: { type: ShadingType.CLEAR, fill: "E2EFDA", color: "auto" } } : {}),
    }));
  });
  children.push(para([run("Respuesta: ", { bold: true }), run(`${opts === VF ? "" : L[ans] + ". "}${opts[ans]}`, { bold: true }), run(`. ${exp}`)], { indent: { left: 240 }, spacing: { before: 60, after: 40 } }));
  if (note) children.push(para(run(note, { italics: true, color: "7F6000" }), { indent: { left: 240 }, spacing: { after: 40 } }));
});

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1300, bottom: 1300, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ["Medicina Legal, AA unidad 1. Página ", PageNumber.CURRENT], font: FONT, size: 18 })] })] }) },
    children,
  }],
});

const out = process.argv[2];
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(out, b); console.log("ok", Q.length); });
