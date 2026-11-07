const fs = require("fs");
const path = require("path");
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

// ---------- Mapa (A3 horizontal) ----------
const nodes = [];
const lines = [];
const labels = [];
const box = (x, y, w, h, cls, html) =>
  nodes.push(`<div class="n ${cls}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><div>${html}</div></div>`);
const line = (pts, arrow = true) =>
  lines.push(`<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#4a4a4a" stroke-width="1.6" ${arrow ? 'marker-end="url(#ar)"' : ""}/>`);
const label = (x, y, t) =>
  labels.push(`<div class="lb" style="left:${x}px;top:${y}px">${t}</div>`);
const T = (t) => `<b>${t}</b>`;

// raíz y notas
box(640, 18, 320, 66, "root", `${T("LOS BIENES")}<br><span class="s">Código Civil, Libro II, art. 583</span>`);
box(20, 12, 575, 100, "note", `${T("Bien y cosa.")} González Pesantes los distingue: todos los bienes son cosas, pero no todas las cosas son bienes (p. 14). Parraguez observa que el Código Civil ecuatoriano usa ambas palabras como sinónimos (pp. 49-51).`);
box(1005, 12, 575, 100, "note", `${T("Punto discutido.")} Que los derechos sean "cosas incorporales" se critica: no se perciben por los sentidos, y solo los que tienen valor económico se tratan como bienes (González Pesantes, pp. 16-17).`);

line([[800, 84], [800, 124], [400, 124], [400, 156]]);
line([[800, 124], [1200, 124], [1200, 156]]);
label(800, 104, "consisten en");

// corporales
box(250, 156, 300, 86, "c1", `${T("COSAS CORPORALES")}<br>Tienen un ser real y se perciben por los sentidos: una casa, un libro (art. 583)`);
line([[400, 242], [400, 270], [205, 270], [205, 298]]);
line([[400, 270], [600, 270], [600, 298]]);
label(400, 256, "se dividen en (art. 584)");

box(30, 298, 350, 86, "c2", `${T("BIENES MUEBLES")}<br>Pueden transportarse de un lugar a otro, por sí mismos o por una fuerza externa (art. 585)`);
box(420, 298, 360, 86, "c2", `${T("BIENES INMUEBLES")}<br>Fincas o bienes raíces: no pueden transportarse, o están unidos a ellas de forma permanente (art. 586)`);

// hijos de muebles
const mh = 88;
const mchild = [
  `${T("Por naturaleza:")} semovientes, que se mueven por sí mismos (caballo), e inanimadas, que requieren fuerza externa (celular, silla). Art. 585`,
  `${T("Fungibles y no fungibles:")} fungibles son las que se destruyen con el uso propio de su naturaleza, como el dinero. Art. 593`,
  `${T("Por anticipación:")} frutos y madera aún unidos al suelo, que la ley trata como muebles para constituir derechos a favor de otra persona. Art. 589`,
  `${T("Muebles de una casa:")} comprende solo el ajuar; no el dinero, las joyas, la ropa ni los libros. Art. 592`,
];
const ys = [420, 520, 620, 720];
mchild.forEach((t, i) => box(70, ys[i], 310, mh, "c3", t));
line([[50, 384], [50, ys[3] + mh / 2]], false);
ys.forEach((y) => line([[50, y + mh / 2], [70, y + mh / 2]]));
label(50, 402, "se clasifican en");

const ichild = [
  `${T("Por naturaleza:")} tierras y minas, que no pueden transportarse. Art. 586`,
  `${T("Por adherencia:")} edificios y árboles unidos de forma permanente; el espejo embutido en la pared. Arts. 586, 587 y 590`,
  `${T("Por destinación:")} cosas puestas por el dueño, de forma permanente, al uso, cultivo y beneficio del inmueble (tractor, alambiques). Art. 588`,
  `${T("Separación momentánea:")} reparar o desmontar para volver a colocar no quita la calidad de inmueble; separar para darle otro destino sí. Art. 591`,
];
ichild.forEach((t, i) => box(460, ys[i], 320, mh, "c3", t));
line([[440, 384], [440, ys[3] + mh / 2]], false);
ys.forEach((y) => line([[440, y + mh / 2], [460, y + mh / 2]]));
label(440, 402, "se clasifican en");

box(30, 830, 750, 136, "ap", `${T("Por qué importa la distinción.")} Los muebles se transfieren con la simple entrega; los inmuebles exigen escritura pública e inscripción en el Registro de la Propiedad. La garantía es la prenda en los muebles y la hipoteca en los inmuebles, y la prescripción adquisitiva es más corta en los muebles. Por eso clasificar mal un bien invalida el contrato o la garantía que se haga sobre él (González Pesantes, p. 19; diapositivas de la docente, semana 5).`);

// incorporales
box(1050, 156, 300, 86, "i1", `${T("COSAS INCORPORALES")}<br>Consisten en meros derechos: los créditos y las servidumbres activas (art. 583)`);
line([[1200, 242], [1200, 270], [1010, 270], [1010, 298]]);
line([[1200, 270], [1390, 270], [1390, 298]]);
label(1200, 256, "son derechos reales o personales (art. 594)");

box(830, 298, 360, 100, "i2", `${T("DERECHOS REALES")}<br>El que tenemos sobre una cosa, sin respecto a determinada persona (art. 595)`);
box(1210, 298, 360, 100, "i2", `${T("DERECHOS PERSONALES O CRÉDITOS")}<br>Solo pueden reclamarse de ciertas personas que contrajeron la obligación por un hecho suyo o por la ley (art. 596)`);

const iy = [430, 530, 630];
const re = [
  `Se ejercen directamente sobre la cosa y se tienen frente a todos (erga omnes). Parraguez, p. 41`,
  `${T("Son derechos reales:")} dominio, herencia, usufructo, uso, habitación, servidumbres activas, prenda e hipoteca (art. 595)`,
  `De ellos nacen las ${T("acciones reales")}, que no dependen de una persona determinada (art. 595; González Pesantes, p. 17)`,
];
const pe = [
  `Hay un ${T("acreedor")} y un ${T("deudor")} ligados por una obligación correlativa (art. 596)`,
  `${T("Ejemplos del Código:")} el prestamista contra su deudor por el dinero prestado; el hijo contra el padre por alimentos (art. 596)`,
  `De ellos nacen las ${T("acciones personales")}, que solo se dirigen contra quien contrajo la obligación (art. 596; González Pesantes, p. 18)`,
];
re.forEach((t, i) => box(870, iy[i], 320, 88, "c3i", t));
pe.forEach((t, i) => box(1250, iy[i], 320, 88, "c3i", t));
line([[850, 398], [850, iy[2] + 44]], false);
iy.forEach((y) => line([[850, y + 44], [870, y + 44]]));
line([[1230, 398], [1230, iy[2] + 44]], false);
iy.forEach((y) => line([[1230, y + 44], [1250, y + 44]]));
label(850, 414, "características");
label(1230, 414, "características");

box(830, 740, 740, 86, "ap2", `${T("Derechos y acciones también son muebles o inmuebles (art. 597).")} Se reputan según la cosa en que se ejercen: el usufructo sobre un inmueble es inmueble; la acción para que se pague un préstamo en dinero es mueble. Los hechos que se deben se reputan muebles (art. 598).`);
line([[850, iy[2] + 88], [850, 740]]);
line([[1230, iy[2] + 88], [1230, 740]]);

box(830, 840, 740, 126, "ap", `${T("Aplicación a los casos de clase.")} <i>Hacienda El Paraíso:</i> el tractor es inmueble por destinación (art. 588); las orquídeas en macetas son muebles (art. 587); el espejo embutido es inmueble por adherencia (art. 590); las tejas desmontadas siguen siendo inmuebles (art. 591); las naranjas pendientes son muebles por anticipación (art. 589). <i>La casa de María:</i> el usufructo de Rosa es un derecho real y, al recaer en un inmueble, inmueble; el crédito contra Juan es un derecho personal y mueble (arts. 595 a 597).`);

const mapa = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Mapa conceptual - Clasificación de los bienes</title>
<style>
@page { size: 420mm 297mm; margin: 0 }
* { box-sizing: border-box }
body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; color: #1c1c1c; background: #fff }
.pg { width: 420mm; height: 297mm; padding: 9mm 11mm 0; position: relative }
h1 { font-size: 25px; margin: 0 0 2px; font-weight: 700; letter-spacing: .1px }
.sub { font-size: 13.5px; color: #444; margin-bottom: 8px }
.wrap { position: relative; width: 1600px; height: 1000px; transform: scale(.975); transform-origin: 0 0 }
svg { position: absolute; left: 0; top: 0 }
.n { position: absolute; border-radius: 9px; border: 1.6px solid; display: flex; align-items: center; padding: 7px 11px; font-size: 15px; line-height: 1.28 }
.n b { font-weight: 700 }
.n .s { font-size: 13px; font-weight: 400 }
.root { background: #26323f; color: #fff; border-color: #26323f; justify-content: center; text-align: center; font-size: 20px }
.root .s { color: #d5dbe2 }
.note { background: #f6f3ea; border-color: #c9bf9e; font-size: 14px }
.c1 { background: #cfe0f1; border-color: #1f4e79; text-align: center; justify-content: center }
.c2 { background: #e3edf8; border-color: #1f4e79 }
.c3 { background: #f4f8fc; border-color: #6f93b8 }
.i1 { background: #d3ead9; border-color: #2e6b4a; text-align: center; justify-content: center }
.i2 { background: #e5f3e9; border-color: #2e6b4a }
.c3i { background: #f5fbf7; border-color: #7fae92 }
.ap, .ap2 { background: #f3f3f3; border-color: #8a8a8a }
.ap2 { background: #fbf6e6; border-color: #c4a94a }
.lb { position: absolute; transform: translate(-50%, -50%); background: #fff; font-size: 13px; font-style: italic; color: #333; padding: 0 5px; white-space: nowrap }
.foot { position: absolute; left: 11mm; bottom: 6mm; font-size: 12px; color: #444 }
</style></head><body><div class="pg">
<h1>Clasificación de los bienes: de las cosas corporales a los derechos reales y personales</h1>
<div class="sub">Derecho Civil II · Unidad I · Aprendizaje autónomo: mapa conceptual · Jhonny Mauricio Padilla Alvear · Universidad Nacional de Loja, IV ciclo, paralelo D</div>
<div class="wrap">
<svg width="1600" height="1000" viewBox="0 0 1600 1000"><defs><marker id="ar" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#4a4a4a"/></marker></defs>${lines.join("")}</svg>
${nodes.join("")}${labels.join("")}
</div>
<div class="foot">Fuentes: Código Civil (Libro II, arts. 583 a 598); González Pesantes (2012, pp. 13-21); Parraguez (2020, pp. 41-51); diapositivas de la docente, semana 5. Referencias completas en la página 2.</div>
</div></body></html>`;
fs.writeFileSync(path.join(out, "mapa.html"), mapa);

// ---------- Página 2 (A4) ----------
const notas = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Fundamentación del mapa conceptual</title>
<style>
@page { size: A4; margin: 15mm 20mm }
body { font-family: "Times New Roman", serif; font-size: 11pt; line-height: 1.32; color: #111 }
h2 { font-size: 13pt; margin: 14px 0 4px }
p { margin: 0 0 8px; text-align: justify }
table { border-collapse: collapse; width: 100%; font-size: 10pt; margin: 6px 0 10px }
th, td { border: 1px solid #777; padding: 4px 6px; vertical-align: top; text-align: left }
th { background: #e9edf1 }
.ref { padding-left: 1.2cm; text-indent: -1.2cm; margin-bottom: 6px; text-align: left }
.nota { font-size: 10.5pt; color: #333 }
</style></head><body>
<h2 style="margin-top:0">Fundamentación y aporte propio</h2>
<p>El mapa parte del artículo 583 del Código Civil, que divide los bienes en cosas corporales e incorporales, y llega hasta los derechos reales y personales, que es el alcance que la docente fijó para esta actividad. Las ramas de la izquierda desarrollan las cosas corporales (muebles e inmuebles, arts. 584 a 593) y las de la derecha las incorporales (arts. 594 a 598). Los textos en cursiva sobre las líneas son las palabras de enlace.</p>

<h2>Cuadro comparativo de los dos derechos</h2>
<table>
<tr><th></th><th>Derecho real</th><th>Derecho personal o crédito</th></tr>
<tr><td>Concepto</td><td>El que se tiene sobre una cosa, sin respecto a determinada persona (art. 595)</td><td>El que solo puede reclamarse de ciertas personas que contrajeron la obligación (art. 596)</td></tr>
<tr><td>Relación</td><td>Directa entre el titular y la cosa; se opone a todos (Parraguez, 2020, p. 41)</td><td>Entre un acreedor y un deudor determinados</td></tr>
<tr><td>Ejemplos</td><td>Dominio, herencia, usufructo, uso, habitación, servidumbres activas, prenda, hipoteca</td><td>Préstamo de dinero; alimentos del hijo contra el padre</td></tr>
<tr><td>Acción que nace</td><td>Acción real</td><td>Acción personal</td></tr>
<tr><td>Calidad de mueble o inmueble (art. 597)</td><td>Según la cosa en que se ejerce: el usufructo de un inmueble es inmueble</td><td>Según lo que se debe: el crédito en dinero es mueble</td></tr>
</table>

<h2>Lo que añado a lo que dicen los textos</h2>
<p>Primero, la relación entre bien y cosa. González Pesantes (2012) sostiene que todos los bienes son cosas pero no todas las cosas son bienes (p. 14), mientras que Parraguez (2020) muestra con los artículos 583, 594, 595, 599, 686 y 2392 que el Código Civil ecuatoriano emplea las dos palabras indistintamente (pp. 49-51). En el mapa recojo las dos posturas y no escojo una, porque para resolver los casos de clase basta con aplicar los artículos.</p>
<p>Segundo, la clasificación depende del destino económico y no solo de la forma física del bien, idea con la que la docente cerró la matriz de la semana 5. Los casos lo muestran: el tractor y las orquídeas son ambos objetos que se mueven, pero el primero es inmueble por destinación (art. 588) y las segundas son muebles porque están en macetas (art. 587).</p>
<p>Tercero, la clasificación tiene efectos en las unidades siguientes. El usufructo, que en el caso de María es un derecho real, es también una limitación del dominio (González Pesantes, 2012, p. 17). Y las acciones posesorias del artículo 960 protegen solo los bienes raíces y los derechos reales constituidos en ellos, de modo que distinguir inmuebles de muebles y reales de personales decide si procede el amparo posesorio.</p>

<h2>Referencias</h2>
<p class="ref">Código Civil. (2005). Registro Oficial Suplemento 46, 24 de junio de 2005. Última reforma: 5 de enero de 2024 [versión Lexis].</p>
<p class="ref">González Pesantes, E. (2012). De los bienes. En <i>Derecho patrimonial</i> (pp. 13-21). AJSA-UNL.</p>
<p class="ref">Parraguez Ruiz, L. (2020). Conceptos generales. En <i>Régimen jurídico de los bienes</i> (1.ª reimp., pp. 39-66). Cevallos Editora Jurídica.</p>
<p class="ref">Universidad Nacional de Loja. (2026). <i>Derecho Civil II, semana 5: La arquitectura de los bienes</i> [Diapositivas de clase]. Unidad de Educación a Distancia.</p>
<p class="nota">Nota de verificación. Los capítulos de González Pesantes y de Parraguez estaban escaneados y los leí con reconocimiento de texto; las páginas citadas son las impresas en cada capítulo. La guía fecha a Parraguez en 2021 y el sílabo en 2020 (primera reimpresión); aquí uso 2020. Los artículos del Código Civil corresponden a la versión actualizada a enero de 2024.</p>
</body></html>`;
fs.writeFileSync(path.join(out, "notas.html"), notas);
console.log("html ok");
