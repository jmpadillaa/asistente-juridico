const fs = require("fs");
const out = process.argv[2];

const C = ["#2a78d6", "#1baf7a", "#eb6834", "#6250d6", "#e34948", "#eda100"];

const cols = [
  { t: "Concepto y finalidad", link: "es", c: C[0], items: [
    ["Actuaciones con las que las partes inician el juicio, piden y se defienden.", "COGEP, arts. 141-157"],
    ["Son la demanda, la contestación, la reconvención y la contestación a esta.", "COGEP, arts. 142, 151, 154 y 155"],
    ["Fijan pretensiones, excepciones y prueba, y con ello el objeto del debate.", "Aguirrezabal, 2017, p. 428"],
    ["Todo proceso comienza con la demanda; pueden precederla diligencias preparatorias.", "COGEP, arts. 120 y 141"],
    ["Después solo caben vías excepcionales: reforma de la demanda o prueba nueva.", "COGEP, arts. 148 y 166"],
  ]},
  { t: "Demanda", link: "se abre con la", c: C[1], items: [
    ["Juez competente, datos de las partes y lugar de citación.", "COGEP, art. 142, núm. 1-4"],
    ["Hechos detallados y numerados, y fundamentos de derecho.", "COGEP, art. 142, núm. 5-6"],
    ["Anuncio de la prueba y, si hace falta, acceso judicial a ella.", "COGEP, art. 142, núm. 7-8"],
    ["Pretensión clara y precisa, cuantía y procedimiento.", "COGEP, art. 142, núm. 9-11"],
    ["Firmas y los documentos de que se disponga: poder, cédula y pruebas.", "COGEP, arts. 142, núm. 12, y 143"],
  ]},
  { t: "Contestación", link: "se responde con la", c: C[2], items: [
    ["Por escrito y con los requisitos formales de la demanda, en lo aplicable.", "COGEP, art. 151"],
    ["Se pronuncia sobre cada pretensión, los hechos y los documentos: admite o niega.", "COGEP, art. 151"],
    ["Deduce todas las excepciones, con su fundamento fáctico.", "COGEP, arts. 151 y 153"],
    ["Anuncia y adjunta toda su prueba.", "COGEP, arts. 152 y 159"],
    ["Término: 30 días en el ordinario, 15 en el sumario y 10 en niñez.", "COGEP, arts. 291 y 333, núm. 3"],
  ]},
  { t: "Reconvención", link: "puede sumar la", c: C[3], items: [
    ["Pretensión del demandado contra el actor, dentro del mismo proceso.", "COGEP, art. 154"],
    ["Se rige por las reglas de la demanda, en lo pertinente.", "COGEP, art. 154"],
    ["Se tramita y se resuelve junto con la demanda y las excepciones.", "COGEP, art. 154"],
    ["El actor la contesta en el mismo tiempo y con la misma forma.", "COGEP, art. 155"],
    ["No procede en alimentos; en el sumario solo cabe la conexa.", "COGEP, arts. 154 y 333, núm. 2"],
  ]},
  { t: "Principio dispositivo y objeto del proceso", link: "se apoya en el", c: C[4], items: [
    ["Corresponde a las partes el impulso del proceso.", "COGEP, art. 5; CRE, art. 168, núm. 6; COFJ, art. 19"],
    ["Las partes fijan el objeto: lo que piden y los hechos que lo sustentan.", "Aguirrezabal, 2017, p. 428"],
    ["El juez resuelve dentro de ese límite (congruencia).", "Aguirrezabal, 2017, p. 424"],
    ["Cambiar la demanda después afecta la defensa (<i>mutatio libelli</i>).", "Aguirrezabal, 2017, pp. 428 y 434"],
    ["Por eso la demanda se reforma solo hasta la contestación, y no en el sumario.", "COGEP, arts. 148 y 333, núm. 1"],
  ]},
  { t: "Anuncio oportuno de la prueba", link: "exige el", c: C[5], items: [
    ["La prueba busca convencer al juez de los hechos controvertidos.", "COGEP, art. 158"],
    ["Se adjuntan los documentos disponibles; lo inaccesible se anuncia y se pide por acceso judicial.", "COGEP, arts. 142, núm. 8, y 159"],
    ["La prueba no anunciada no puede introducirse en la audiencia.", "COGEP, art. 159"],
    ["Así la contraparte la conoce a tiempo y puede contradecirla.", "COGEP, art. 165; Ramírez Romero, 2015, p. 90"],
    ["Excepciones: nueva prueba sobre hechos de la contestación y prueba nueva.", "COGEP, arts. 151 y 166"],
  ]},
];

const W = 1587, H = 1123, CW = 246, GAP = 19, LEFT = 18;
const colX = (i) => LEFT + i * (CW + GAP);
const hx = (i) => colX(i) + CW / 2;
const CX = W / 2;

const paths = cols.map((c, i) => {
  const x = hx(i);
  return `<path d="M${CX} 196 C${CX} 262, ${x} 240, ${x} 312" />`;
}).join("");
const pills = cols.map((c, i) => `<div class="pill" style="left:${hx(i)}px">${c.link}</div>`).join("");

const colsHtml = cols.map((c, i) => `
  <section class="col" style="left:${colX(i)}px;--c:${c.c}">
    <header><h2>${c.t}</h2></header>
    ${c.items.map(([txt, src]) => `<div class="it"><p>${txt}</p><small>${src}</small></div>`).join("")}
  </section>`).join("");

const steps = [
  ["Demanda incompleta", "El juez da 5 días para completarla; si no se hace, ordena el archivo y devuelve los anexos. (Art. 146)"],
  ["Contestación o reconvención incompleta", "Se dan 3 días para completarla; si no, se tiene por no presentada. (Art. 156)"],
  ["Falta de contestación", "La falta de pronunciamiento expreso se aprecia como negativa de los hechos. (Art. 157)"],
  ["Prueba no anunciada ni adjuntada", "No entra en la audiencia (art. 159). Solo queda la prueba nueva (art. 166). La practicada contra el art. 143 no vale."],
  ["Prueba fuera de término", "El juez no la aprecia: debe solicitarse, practicarse e incorporarse dentro de los términos. (Art. 164)"],
];
const stepsHtml = steps.map(([h, t], i) => `<div class="st"><b>${h}</b><p>${t}</p></div>${i < steps.length - 1 ? '<div class="ar">→</div>' : ""}`).join("");

const info = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Los actos de proposición</title>
<style>
@page { size: 420mm 297mm; margin: 0; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { width: ${W}px; height: ${H}px; position: relative; font-family: "Segoe UI", Arial, sans-serif; color: #15150f; background: #fbfaf7; overflow: hidden; }
.top { position: absolute; left: 0; top: 0; width: ${W}px; height: 84px; background: #15150f; color: #fbfaf7; padding: 14px ${LEFT + 6}px; display: flex; justify-content: space-between; align-items: center; }
.top h1 { margin: 0; font-size: 32px; letter-spacing: -0.01em; font-weight: 650; }
.top .meta { text-align: right; font-size: 13.5px; line-height: 1.45; color: #d9d7cf; }
.top .meta b { color: #fff; font-weight: 600; }
.center { position: absolute; left: ${CX - 235}px; top: 106px; width: 470px; height: 90px; background: #15150f; color: #fff; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 16px; }
.center b { font-size: 24px; letter-spacing: .06em; }
.center span { font-size: 13.5px; color: #e4e2da; margin-top: 3px; line-height: 1.35; }
svg { position: absolute; left: 0; top: 0; width: ${W}px; height: 330px; }
svg path { fill: none; stroke: #8a8880; stroke-width: 2.2; }
.pill { position: absolute; top: 262px; transform: translateX(-50%); background: #fbfaf7; border: 1.5px solid #8a8880; border-radius: 999px; padding: 3px 11px; font-size: 13.5px; font-style: italic; color: #33332d; width: max-content; max-width: 236px; text-align: center; line-height: 1.25; }
.col { position: absolute; top: 312px; width: ${CW}px; display: flex; flex-direction: column; gap: 8px; }
.col header { background: color-mix(in srgb, var(--c) 20%, #fbfaf7); border-top: 6px solid var(--c); border-radius: 6px; padding: 8px 10px 7px; text-align: center; height: 62px; display: flex; align-items: center; justify-content: center; }
.col h2 { margin: 0; font-size: 19px; font-weight: 650; line-height: 1.15; }
.it { background: #fff; border: 1px solid #d9d7cf; border-left: 6px solid var(--c); border-radius: 6px; padding: 7px 9px 6px; }
.it p { margin: 0; font-size: 14.6px; line-height: 1.34; }
.it small { display: block; margin-top: 4px; font-size: 12px; color: #6b6a62; line-height: 1.25; }
.app { position: absolute; left: ${LEFT}px; top: 892px; width: ${W - 2 * LEFT}px; }
.app h3 { margin: 0 0 8px; font-size: 16.5px; letter-spacing: .06em; text-transform: uppercase; color: #33332d; }
.flow { display: flex; align-items: stretch; gap: 8px; }
.st { flex: 1; background: #fff; border: 1.5px solid #15150f; border-radius: 8px; padding: 8px 11px; }
.st b { font-size: 15.5px; }
.st p { margin: 3px 0 0; font-size: 14px; line-height: 1.33; }
.ar { align-self: center; font-size: 26px; color: #15150f; }
.foot { position: absolute; left: ${LEFT}px; bottom: 14px; width: ${W - 2 * LEFT}px; font-size: 12px; color: #55544c; line-height: 1.4; border-top: 1px solid #d9d7cf; padding-top: 7px; }
</style></head><body>
<div class="top"><h1>Los actos de proposición y el anuncio de la prueba</h1>
<div class="meta"><b>Derecho Procesal No Penal II · Unidad 1 · Aprendizaje autónomo (AA)</b><br>Jhonny Mauricio Padilla Alvear · Universidad Nacional de Loja · IV ciclo, paralelo D</div></div>
<div class="center"><b>ACTOS DE PROPOSICIÓN</b><span>Actuaciones de las partes que inician el juicio y fijan pretensiones, excepciones y prueba (COGEP, arts. 141 y ss.)</span></div>
<svg viewBox="0 0 ${W} 330">${paths}</svg>
${pills}
${colsHtml}
<div class="app"><h3>Consecuencias de incumplir los requisitos legales</h3><div class="flow">${stepsHtml}</div></div>
<div class="foot">Fuentes: Aguirrezabal Grünstein (2017); Asamblea Constituyente (2008); Asamblea Nacional (2009, 2015); Ramírez Romero (2015). La nota explicativa y las referencias completas en APA 7 están en las páginas siguientes. Normas consultadas en Lexis Finder: COGEP, texto actualizado a febrero de 2021; Constitución, enero de 2021. COGEP: Código Orgánico General de Procesos; CRE: Constitución de la República del Ecuador; COFJ: Código Orgánico de la Función Judicial.</div>
</body></html>`;

const nota = [
  "Puse los actos de proposición en el centro del mapa porque son el punto de partida del proceso: todo proceso comienza con la demanda, que puede ir precedida de diligencias preparatorias (Código Orgánico General de Procesos [COGEP], arts. 120 y 141). En la primera columna reuní el concepto que se trabajó en clase, las actuaciones de las partes que inician el juicio, formulan pretensiones y excepciones y delimitan el objeto del litigio, y lo apoyé en los artículos que regulan cada acto. Las demás columnas salen de ese centro con una frase que explica la relación: la demanda abre el proceso, la contestación la responde y la reconvención puede sumarse a ella.",
  "Para la demanda tomé los trece numerales del artículo 142 y los agrupé en cinco cajas, de modo que se vea qué pide la ley sin copiar el artículo entero: identificación del juzgador y de las partes, hechos y fundamentos de derecho, anuncio de la prueba, pretensión y firmas. El numeral 7 exige anunciar los medios de prueba y el 8 prevé la solicitud de acceso judicial cuando la prueba no está al alcance de la parte. El artículo 143 añade los documentos que deben acompañarse, entre ellos los medios probatorios de que se disponga, y advierte que la prueba practicada en contravención de esa norma carece de valor. La calificación de la demanda tiene un término de cinco días (art. 146).",
  "La contestación se rige por el artículo 151. Debe presentarse por escrito, pronunciarse de forma expresa sobre cada pretensión, sobre la veracidad de los hechos y sobre la autenticidad de los documentos, con indicación categórica de lo que se admite y lo que se niega, y deducir todas las excepciones con su fundamento fáctico. El demandado debe además anunciar todos sus medios de prueba (art. 152). Incluí el término para contestar según el procedimiento, porque cambia: treinta días en el ordinario (art. 291), quince en el sumario y diez en materia de niñez y adolescencia (art. 333, numeral 3). La reconvención aparece como una columna aparte porque tiene reglas propias: se rige por las de la demanda en lo pertinente, se resuelve junto con ella (art. 154), el actor la contesta en la misma forma y tiempo (art. 155), no procede en alimentos y, en el sumario, solo se admite la conexa (art. 333, numeral 2).",
  "La relación entre el principio dispositivo y el objeto procesal ocupa la quinta columna. El impulso del proceso corresponde a las partes (COGEP, art. 5), y la Constitución establece que los procesos se sustancian por el sistema oral, de acuerdo con los principios de concentración, contradicción y dispositivo (art. 168, numeral 6). Aguirrezabal Grünstein (2017) explica que el objeto del proceso lo fijan las partes: lo determina la pretensión, que se integra por lo que se pide y por los hechos que la sustentan (p. 428), y el juez debe resolver dentro de esos límites (p. 424). Por eso se prohíbe modificar la demanda de forma sustancial después de planteada (<i>mutatio libelli</i>), ya que eso afectaría el derecho de defensa de la otra parte (pp. 428 y 434). Aguirrezabal escribe sobre el proceso chileno, así que usé su artículo para el fundamento teórico y no para citar reglas del COGEP. El COGEP recoge esa lógica cuando permite reformar la demanda solo hasta antes de la contestación, o hasta la audiencia si sobreviene un hecho nuevo (art. 148), y cuando la excluye del sumario (art. 333, numeral 1).",
  "La última columna trata del anuncio oportuno de la prueba. La prueba tiene por finalidad llevar al juez al convencimiento de los hechos controvertidos (art. 158). El artículo 159 ordena adjuntar a la demanda y a la contestación la prueba documental con que se cuente o cuya obtención fue posible, y dispone que la prueba a la que sea imposible tener acceso debe anunciarse, porque la que no se anuncie no podrá introducirse en la audiencia, salvo las excepciones del Código. Ramírez Romero (2015, p. 90) lo describe como la constancia, en la demanda o la contestación, de los medios de prueba que se ofrecen para acreditar los hechos. La importancia práctica es la contradicción: las partes tienen derecho a conocer a tiempo las pruebas y oponerse a ellas (art. 165). Las excepciones son dos y conviene no confundirlas: la nueva prueba, que la parte actora anuncia después de notificada la contestación y solo sobre hechos expuestos en ella (art. 151), y la prueba nueva, que se solicita hasta antes de la convocatoria a la audiencia si se acredita que no fue de conocimiento de la parte o que, habiéndola conocido, no pudo disponer de ella (art. 166).",
  "La franja inferior responde a las consecuencias del incumplimiento y sigue el orden en que ocurren. Si la demanda no cumple los requisitos formales, el juez ordena completarla o aclararla en cinco días y, si no se hace, dispone el archivo y la devolución de los anexos (art. 146). Con la contestación y la reconvención pasa algo parecido, con tres días y la advertencia de tenerlas por no presentadas (art. 156). Si el demandado no se pronuncia de forma expresa y concreta, el juez lo aprecia como negativa de los hechos (art. 157). Si la prueba no se adjuntó ni se anunció, no puede introducirse en la audiencia (art. 159) y solo queda la vía excepcional de la prueba nueva. Finalmente, la prueba solicitada, practicada o incorporada fuera de los términos no es apreciada por el juez (art. 164).",
  "Control de vigencia: consulté el COGEP en el texto actualizado de Lexis Finder a febrero de 2021 y la Constitución en el texto de enero de 2021. El artículo 166 y los demás citados coinciden con la edición de 2015 de Ramírez Romero en lo que se usó. No encontré el texto del Código Orgánico de la Función Judicial en la carpeta del curso: el artículo 19 se cita como aparece en las concordancias del artículo 5 del COGEP y debe confirmarse en la edición vigente. Fecha de consulta: 31 de octubre de 2026.",
];
const wc = nota.join(" ").split(/\s+/).filter(Boolean).length;
console.log("palabras de la nota:", wc);

const refs = [
  "Aguirrezabal Grünstein, M. (2017). El principio dispositivo y su influencia en la determinación del objeto del proceso en el proceso civil chileno. <i>Revista de Derecho Privado</i>, (32), 423-441. https://doi.org/10.18601/01234366.n32.14",
  "Asamblea Constituyente. (2008). <i>Constitución de la República del Ecuador</i>. Registro Oficial 449.",
  "Asamblea Nacional. (2009). <i>Código Orgánico de la Función Judicial</i>. Registro Oficial Suplemento 544.",
  "Asamblea Nacional. (2015). <i>Código Orgánico General de Procesos</i>. Registro Oficial Suplemento 506.",
  "Ramírez Romero, C. (Ed.). (2015). <i>Principales cuestiones acerca del Código Orgánico General de Procesos en preguntas y respuestas</i>. Corte Nacional de Justicia.",
];

const notaHtml = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Nota explicativa</title>
<style>
@page { size: A4; margin: 25mm 25mm 25mm 25mm; }
body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.45; color: #000; }
h1 { font-size: 13pt; text-align: center; margin: 0 0 4pt; }
.sub { text-align: center; margin: 0 0 14pt; font-size: 11.5pt; }
h2 { font-size: 12pt; text-align: center; margin: 18pt 0 10pt; }
p { text-align: justify; margin: 0 0 9pt; }
.ref { padding-left: 1.27cm; text-indent: -1.27cm; text-align: left; margin: 0 0 8pt; }
.dec { margin-top: 16pt; font-size: 11pt; border-top: 1px solid #999; padding-top: 8pt; }
</style></head><body>
<h1>Nota explicativa: los actos de proposición y el anuncio de la prueba</h1>
<div class="sub">Jhonny Mauricio Padilla Alvear · Derecho Procesal No Penal II, unidad 1 · Aprendizaje autónomo<br>Universidad Nacional de Loja, IV ciclo, paralelo D</div>
${nota.map((t) => `<p>${t}</p>`).join("\n")}
<h2>Referencias</h2>
${refs.map((r) => `<p class="ref">${r}</p>`).join("\n")}
<p class="dec"><b>Uso de herramientas digitales.</b> Para organizar el mapa y redactar el borrador usé un asistente de inteligencia artificial (Claude, de Anthropic). Las citas de normas y las páginas de las obras se comprobaron contra los textos originales, y revisé el contenido antes de entregarlo.</p>
</body></html>`;

fs.writeFileSync(out + "/infografia.html", info);
fs.writeFileSync(out + "/nota.html", notaHtml);
console.log("ok");
