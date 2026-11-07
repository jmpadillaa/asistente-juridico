const fs = require("fs");
const path = require("path");
const out = process.argv[2];
fs.mkdirSync(out, { recursive: true });

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe jurídico - Demanda de amparo posesorio</title>
<style>
@page { size: A4; margin: 25mm 25mm 25mm 25mm }
body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.4; color: #111 }
h2, h3, h4, .cap { break-after: avoid; page-break-after: avoid }
h1 { font-size: 16pt; text-align: center; margin: 0 0 6px }
h2 { font-size: 13pt; margin: 18px 0 6px }
h3 { font-size: 12pt; margin: 12px 0 4px; font-style: italic }
p { margin: 0 0 8px; text-align: justify }
.c { text-align: center }
.portada { text-align: center; padding-top: 40mm; page-break-after: always }
.portada p { text-align: center; margin: 4px 0 }
table { border-collapse: collapse; width: 100%; font-size: 10.5pt; margin: 8px 0 12px; page-break-inside: auto }
tr { page-break-inside: avoid }
th, td { border: 1px solid #666; padding: 4px 6px; vertical-align: top; text-align: left }
th { background: #e9edf1 }
.cap { font-size: 10.5pt; margin: 8px 0 2px; text-align: left }
.demanda { border: 1px solid #444; padding: 10mm 11mm; margin-top: 8px }
.demanda p { text-align: justify }
.demanda h4 { margin: 12px 0 4px; font-size: 12pt }
.hecho { margin-left: 0 }
.ref { padding-left: 1.2cm; text-indent: -1.2cm; margin-bottom: 6px; text-align: left }
.pb { page-break-before: always }
.firma { margin-top: 28px }
.firma td { border: none; text-align: center; padding-top: 24px; width: 50% }
</style></head><body>

<div class="portada">
<p><b>UNIVERSIDAD NACIONAL DE LOJA</b></p>
<p>Unidad de Educación a Distancia · Carrera de Derecho</p>
<p>&nbsp;</p>
<h1 style="margin:30px 0 10px">Informe jurídico:<br>demanda de amparo posesorio</h1>
<p>Trabajo práctico experimental · Unidad I</p>
<p>&nbsp;</p>
<p>Asignatura: Derecho Civil II · IV ciclo, paralelo D</p>
<p>Estudiante: Jhonny Mauricio Padilla Alvear</p>
<p>Docente: [completar]</p>
<p>Loja, 1 de noviembre de 2026</p>
</div>

<h2 style="margin-top:0">1. Introducción y datos del caso</h2>
<p>La guía pide redactar una demanda de amparo posesorio, con la lectura previa de los artículos 960 y siguientes del Código Civil y del artículo 142 del Código Orgánico General de Procesos (COGEP). El enunciado no entrega hechos, así que construí un caso supuesto que permite aplicar cada requisito de la acción. Los nombres, las medidas, los linderos y las fechas son inventados y están reunidos en la Tabla 1, para que se reemplacen si la docente da otros datos. Lo que va entre corchetes son datos personales que solo el estudiante puede completar.</p>
<p>El informe tiene tres partes. Primero se analiza la acción: qué protege, qué requisitos exige y cómo se tramita. Después viene la demanda, redactada siguiendo los trece numerales del artículo 142 del COGEP. Al final se valoran las defensas que podría oponer el demandado y los puntos que conviene cuidar antes de presentarla.</p>

<p class="cap"><b>Tabla 1.</b> Hechos supuestos del caso</p>
<table>
<tr><th style="width:28%">Dato</th><th>Contenido supuesto</th></tr>
<tr><td>Actor</td><td>Segundo Edison Vélez Armijos, poseedor del lote "El Mirador"</td></tr>
<tr><td>Demandado</td><td>Víctor Hugo Camacho Loaiza, dueño del lote colindante por el este</td></tr>
<tr><td>Bien</td><td>Lote rural de 3.200 m², parroquia Taquil, cantón Loja. Avalúo catastral: USD 18.500</td></tr>
<tr><td>Linderos</td><td>Norte: quebrada El Carmen. Sur: camino público. Este: lote del demandado. Oeste: lote de María Elena Ordóñez Pardo</td></tr>
<tr><td>Origen de la posesión</td><td>Compraventa por escritura pública del 15 de marzo de 2022, inscrita el 30 de marzo de 2022 en el Registro de la Propiedad de Loja</td></tr>
<tr><td>Actos de posesión</td><td>Cerramiento de postes y alambre de púas, cultivo de maíz y pastos, una bodega de bloque, pago del predial de 2022 a 2026</td></tr>
<tr><td>Primera turbación</td><td>14 de septiembre de 2026: el demandado y dos peones arrancan 40 metros del cerramiento oriental y fijan mojones ocho metros dentro del lote del actor</td></tr>
<tr><td>Segunda turbación</td><td>2 de octubre de 2026: siembra pasto en esa franja y anuncia que levantará un cerramiento propio</td></tr>
<tr><td>Daño</td><td>Reposición de 40 metros de cerramiento y sembríos arrancados: USD 1.350, a confirmar con peritaje</td></tr>
<tr><td>Presentación</td><td>31 de octubre de 2026, a un mes y medio de la primera turbación</td></tr>
</table>

<h2>2. Análisis jurídico</h2>
<h3>2.1 La acción</h3>
<p>Las acciones posesorias tienen por objeto conservar o recuperar la posesión de bienes raíces o de derechos reales constituidos en ellos (Código Civil, art. 960). El amparo posesorio es la que sirve para conservarla: el artículo 965 reconoce al poseedor el derecho de pedir que no se le turbe ni embarace su posesión, que se le indemnice el daño recibido y que se le dé seguridad contra quien fundadamente teme. Parraguez (2020) la ubica como protección complementaria del dominio y precisa que quien la ejerce no invoca su calidad de propietario sino la de poseedor de la cosa (p. 727). La doctrina chilena, cuyo Código Civil es el modelo del ecuatoriano, describe la querella de amparo con el mismo fin: que cese la turbación o el embarazo para que la posesión se conserve (Alcalde Silva, 2021, p. 263).</p>
<p>Esa lógica explica un punto que atraviesa todo el caso: en los juicios posesorios no se toma en cuenta el dominio que alegue una u otra parte (art. 967). Se pueden exhibir títulos de dominio, pero solo para comprobar la posesión. Por eso, aunque el demandado sea dueño del lote vecino y sostenga que la franja es suya, la discusión de fondo sobre los linderos no se resuelve en este juicio.</p>

<h3>2.2 Requisitos y su verificación en el caso</h3>
<p class="cap"><b>Tabla 2.</b> Requisitos del amparo posesorio frente a los hechos supuestos</p>
<table>
<tr><th style="width:27%">Requisito</th><th style="width:20%">Norma</th><th>Cómo se cumple en el caso</th></tr>
<tr><td>Bien raíz o derecho real sobre un inmueble</td><td>CC, art. 960</td><td>Es un lote rural</td></tr>
<tr><td>Cosa que pueda ganarse por prescripción</td><td>CC, art. 961</td><td>Es un predio de dominio privado, no un bien nacional de uso público ni un bien del Estado (arts. 604 y 605)</td></tr>
<tr><td>Posesión tranquila y no interrumpida durante un año completo</td><td>CC, art. 962</td><td>Posee desde marzo de 2022, más de cuatro años sin que nadie lo hubiera perturbado antes de septiembre de 2026</td></tr>
<tr><td>Posesión material, que basta para la acción</td><td>CC, art. 962; art. 715</td><td>Tiene el lote con ánimo de señor y dueño: lo cerca, lo siembra y paga el predial</td></tr>
<tr><td>Prueba de la posesión del suelo por hechos positivos</td><td>CC, art. 969</td><td>Cerramiento, sembríos y construcción de la bodega</td></tr>
<tr><td>Prueba por la inscripción</td><td>CC, art. 968</td><td>La escritura está inscrita desde marzo de 2022; mientras subsista y haya durado un año completo, no se admite prueba en contra de la posesión que ella acredita</td></tr>
<tr><td>Acto de turbación o embarazo</td><td>CC, art. 965</td><td>Retiro del cerramiento, colocación de mojones y siembra en la franja</td></tr>
<tr><td>Presentar la demanda antes de un año desde el acto de molestia</td><td>CC, art. 964</td><td>Primera turbación el 14 de septiembre de 2026; demanda el 31 de octubre de 2026</td></tr>
</table>

<h3>2.3 Competencia y procedimiento</h3>
<p>La competencia territorial es excluyente: para las acciones posesorias solo es competente el juzgador del lugar donde está la cosa, porque el asunto exige conocimientos locales o inspección judicial (COGEP, art. 11, num. 2). No opera aquí la regla general del domicilio del demandado (art. 9) ni la elección concurrente del actor (art. 10). Como el lote está en la parroquia Taquil, del cantón Loja, la demanda se dirige a la unidad judicial civil con sede en ese cantón. Por la materia, el asunto es patrimonial y corresponde a las juezas y jueces de lo civil y mercantil, a quienes el Código Orgánico de la Función Judicial asigna los asuntos de materia patrimonial y mercantil (arts. 239 y 240, num. 2).</p>
<p>Las acciones posesorias se tramitan por el procedimiento sumario (COGEP, art. 332, num. 2). Las reglas del artículo 333 pesan en la redacción: no procede la reforma de la demanda, de modo que los linderos, la franja y las pretensiones deben quedar bien definidos antes de presentarla. El demandado tiene quince días para contestar y la audiencia única, de saneamiento y prueba, se realiza dentro de treinta días desde la contestación. La resolución es apelable.</p>
<p>La cuantía se fija por el precio de la cosa cuando el derecho es de valor indeterminado pero apreciable (COGEP, art. 144, num. 2), es decir, por el avalúo catastral. No decide el procedimiento, porque este lo determina la materia (art. 142, num. 10).</p>

<h3>2.4 Qué se puede pedir</h3>
<p>El artículo 965 permite tres pretensiones, y la demanda las usa: que cese la turbación, que se indemnicen los daños (cerramiento y sembríos) y que se dé seguridad contra el temor fundado de nuevos actos. Si el demandado hubiera despojado al actor de la posesión, en lugar de solo turbarlo, la acción correcta sería la de restitución (art. 970) o, tratándose de despojo violento, la del artículo 972, que prescribe en seis meses. En el caso supuesto el actor conserva el lote y lo ocupa casi todo, por lo que corresponde el amparo.</p>

<h2 class="pb">3. Demanda</h2>
<div class="demanda">
<p class="c"><b>SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN LOJA</b></p>
<p class="c"><b>Procedimiento sumario · Amparo posesorio</b></p>

<h4>1. Juzgador ante quien se propone</h4>
<p>Dirijo esta demanda al señor Juez de la Unidad Judicial Civil con sede en el cantón Loja, competente por estar en este cantón el inmueble objeto de la acción (COGEP, art. 11, num. 2) y por tratarse de un asunto civil de materia patrimonial (Código Orgánico de la Función Judicial, art. 240, num. 2).</p>

<h4>2. Datos del actor</h4>
<p>Segundo Edison Vélez Armijos, ecuatoriano, cédula de ciudadanía [número], estado civil [completar], [edad] años, agricultor, domiciliado en [dirección], parroquia Taquil, cantón Loja, correo electrónico [correo]. Casillero judicial [número] y casillero electrónico [correo del defensor]. Actúo con el patrocinio del abogado [nombre], matrícula [número] del Foro de Loja.</p>

<h4>3. Registro Único de Contribuyentes</h4>
<p>No se requiere, por no actuar el actor en calidad que lo exija.</p>

<h4>4. Demandado y lugar de citación</h4>
<p>Víctor Hugo Camacho Loaiza, cédula [número, si se conoce], quien debe ser citado en el lote de su propiedad, colindante por el este con el predio del actor, en el sector El Mirador, parroquia Taquil, cantón Loja, y en [dirección domiciliaria, si es distinta]. Correo electrónico: [si se conoce].</p>

<h4>5. Hechos</h4>
<p class="hecho"><b>Primero.</b> El 15 de marzo de 2022 adquirí, por escritura pública de compraventa otorgada ante la Notaría [número] del cantón Loja, el lote rural "El Mirador", de 3.200 metros cuadrados, ubicado en la parroquia Taquil, cantón Loja. La escritura se inscribió el 30 de marzo de 2022 en el Registro de la Propiedad del cantón Loja. Sus linderos son: por el norte, la quebrada El Carmen; por el sur, camino público; por el este, el lote del demandado; y por el oeste, el lote de la señora María Elena Ordóñez Pardo.</p>
<p class="hecho"><b>Segundo.</b> Desde el día de la entrega, el 30 de marzo de 2022, poseo el lote de manera pública y pacífica, con ánimo de señor y dueño, sin que nadie me haya disputado la posesión durante más de cuatro años.</p>
<p class="hecho"><b>Tercero.</b> En ejercicio de esa posesión levanté un cerramiento de postes y alambre de púas en todo el perímetro, incluido el costado oriental que colinda con el demandado; cultivo maíz y pastos; construí una bodega de bloque en la parte sur; y pago cada año el impuesto predial, de 2022 a 2026.</p>
<p class="hecho"><b>Cuarto.</b> El 14 de septiembre de 2026, el demandado ingresó a mi lote acompañado de dos peones, arrancó cuarenta metros del cerramiento del costado oriental y colocó mojones de madera y un hilo delimitador ocho metros hacia el interior de mi predio, con lo que marcó una franja de trescientos veinte metros cuadrados. Afirmó que esa franja le pertenece.</p>
<p class="hecho"><b>Quinto.</b> El 2 de octubre de 2026 el demandado volvió, sembró pasto en esa franja y manifestó que levantará allí un cerramiento propio. Mis vecinos presenciaron ambos hechos.</p>
<p class="hecho"><b>Sexto.</b> Estos actos perturban mi posesión: me impiden usar la franja, destruyeron el cerramiento y los sembríos y crean el riesgo cierto de que el demandado la ocupe de forma definitiva. El costo de reponer el cerramiento y los sembríos arrancados asciende, en una primera estimación, a USD 1.350.</p>
<p class="hecho"><b>Séptimo.</b> Presento esta demanda dentro del año que fija el artículo 964 del Código Civil, contado desde el primer acto de molestia.</p>

<h4>6. Fundamentos de derecho</h4>
<p>Constitución de la República, art. 75: toda persona tiene derecho a la tutela efectiva, imparcial y expedita de sus derechos e intereses.</p>
<p>Código Civil, art. 960, que establece que las acciones posesorias tienen por objeto conservar o recuperar la posesión de bienes raíces; art. 962, que exige posesión tranquila y no interrumpida de un año completo y declara suficiente la posesión material; art. 965, que da al poseedor derecho a pedir que no se le turbe, que se le indemnice el daño y que se le dé seguridad contra quien fundadamente teme; art. 967, según el cual en los juicios posesorios no se toma en cuenta el dominio alegado; art. 968, sobre la prueba de la posesión por la inscripción; y art. 969, sobre la prueba de la posesión del suelo por hechos positivos como cerramientos, plantaciones y construcciones.</p>
<p>Código Orgánico General de Procesos, art. 11, num. 2, sobre la competencia del juzgador del lugar de la cosa; art. 142, sobre el contenido de la demanda; art. 143, sobre los documentos que la acompañan; y arts. 332, num. 2, y 333, que ordenan tramitar las acciones posesorias por el procedimiento sumario.</p>
<p>Código Orgánico de la Función Judicial, art. 240, num. 2, sobre la competencia de las juezas y jueces de lo civil en asuntos de materia patrimonial.</p>

<h4>7. Anuncio de los medios de prueba</h4>
<p><b>Documentos</b> que acompaño a la demanda (COGEP, art. 143, num. 5): copia certificada de la escritura de compraventa del 15 de marzo de 2022 con su razón de inscripción; certificado del Registro de la Propiedad del cantón Loja; comprobantes de pago del impuesto predial de 2022 a 2026; facturas de los postes y el alambre del cerramiento; fotografías del lote antes y después del 14 de septiembre de 2026; y copia de mi cédula.</p>
<p><b>Testigos</b> (COGEP, art. 174 y ss.), vecinos del sector, quienes declararán sobre mi posesión pacífica desde 2022, la existencia del cerramiento y los cultivos, y los actos del demandado del 14 de septiembre y del 2 de octubre de 2026: [nombre y cédula del testigo 1], [nombre y cédula del testigo 2] y [nombre y cédula del testigo 3].</p>
<p><b>Prueba pericial</b> (COGEP, arts. 221 y 227): informe de un perito topógrafo acreditado por el Consejo de la Judicatura, [nombre], sobre la ubicación de los linderos, la franja ocupada y el valor del cerramiento y los sembríos dañados.</p>
<p><b>Inspección judicial</b> (COGEP, arts. 228 y 229): solicito que el señor Juez examine directamente el lote, para verificar el cerramiento, los mojones, los sembríos y el estado del costado oriental.</p>
<p><b>Declaración de parte:</b> solicito que el demandado declare, bajo juramento, sobre los hechos cuarto y quinto.</p>

<h4>8. Acceso judicial a la prueba</h4>
<p>No lo requiero: dispongo de los documentos y de los medios anunciados.</p>

<h4>9. Pretensión</h4>
<p>Con estos fundamentos, y al amparo del artículo 965 del Código Civil, demando a Víctor Hugo Camacho Loaiza para que en sentencia se disponga:</p>
<p>a) Que se me ampare en la posesión del lote "El Mirador", de 3.200 metros cuadrados, incluida la franja de ocho metros por cuarenta metros de su costado oriental.</p>
<p>b) Que el demandado se abstenga de turbar o embarazar mi posesión y retire los mojones y el hilo delimitador colocados en mi predio.</p>
<p>c) Que pague la indemnización de los daños causados, por la reposición del cerramiento y de los sembríos, que estimo en USD 1.350 y que se fijará según el informe pericial.</p>
<p>d) Que rinda caución suficiente, que el Juez fije, como seguridad contra el temor fundado de nuevos actos de turbación.</p>
<p>e) Que se le condene al pago de las costas procesales y de los honorarios de mi defensor.</p>

<h4>10. Cuantía</h4>
<p>USD 18.500, que corresponde al avalúo catastral del lote (COGEP, art. 144, num. 2). La cuantía no determina el procedimiento.</p>

<h4>11. Procedimiento</h4>
<p>Sumario, conforme al artículo 332, numeral 2, del COGEP.</p>

<h4>12. Firmas</h4>
<table class="firma"><tr><td>______________________<br>Segundo Edison Vélez Armijos<br>Actor</td><td>______________________<br>Abg. [nombre]<br>Matrícula [número]</td></tr></table>

<h4>13. Demás requisitos</h4>
<p>La ley no exige para esta acción requisitos adicionales a los señalados. Designo como lugar de notificaciones el casillero judicial y los correos indicados en el numeral 2. Loja, 31 de octubre de 2026.</p>
</div>

<h2>4. Valoración del caso</h2>
<p>Con los hechos supuestos la demanda es sólida en lo que más se discute en estos juicios: la posesión. El actor tiene prueba de dos tipos, la inscripción y los hechos positivos, y la acción está dentro del año del artículo 964. El riesgo está en la prueba de la turbación, que descansa en testigos vecinos y en fotografías; conviene que el perito y la inspección judicial fijen la franja con precisión.</p>
<p>El demandado probablemente alegará que la franja es suya y que por eso no turba nada. Esa defensa choca con el artículo 967, que impide discutir el dominio en el juicio posesorio, aunque puede presentar su título para probar su posesión. Si en cambio sostiene que el actor nunca poseyó la franja, tendrá que desvirtuar el cerramiento y los sembríos. También podría invocar la mera tolerancia (art. 2399), pero el cerramiento levantado por el actor en el límite no es un acto de tolerancia del vecino.</p>
<p>Hay dos precauciones para la presentación. La primera es que, como el procedimiento sumario no permite reformar la demanda (COGEP, art. 333, num. 1), los linderos y la medida de la franja deben quedar definidos antes, con ayuda de un topógrafo. La segunda es la elección de la acción: si al revisar los hechos resultara que el demandado ya ocupa la franja y sacó al actor de ella, la vía sería la restitución del artículo 970 y no el amparo.</p>

<h2>5. Referencias</h2>
<p class="ref">Alcalde Silva, J. (2021). Las acciones posesorias ordinarias y el concepto de posesión en el Código Civil. <i>Revista Chilena de Derecho Privado</i>, (36), 247-268.</p>
<p class="ref">Código Civil. (2005). Registro Oficial Suplemento 46, 24 de junio de 2005. Última reforma: 5 de enero de 2024 [versión Lexis].</p>
<p class="ref">Código Orgánico de la Función Judicial. (2009). Registro Oficial Suplemento 544, 9 de marzo de 2009. Última modificación: 5 de febrero de 2018 [versión Lexis].</p>
<p class="ref">Código Orgánico General de Procesos. (2015). Registro Oficial Suplemento 506, 22 de mayo de 2015. Texto actualizado a febrero de 2021 [versión Lexis].</p>
<p class="ref">Constitución de la República del Ecuador. (2008). Registro Oficial 449, 20 de octubre de 2008.</p>
<p class="ref">Parraguez Ruiz, L. (2020). Protección jurídica del dominio y los demás derechos reales. En <i>Régimen jurídico de los bienes</i> (1.ª reimp., pp. 721-729). Cevallos Editora Jurídica.</p>

<h2>6. Control de vigencia y pendientes</h2>
<p>El Código Civil corresponde a la versión actualizada a enero de 2024 y el COGEP a la de febrero de 2021; no verifiqué reformas posteriores. El capítulo de Parraguez estaba escaneado y lo leí con reconocimiento de texto, por lo que cito la página impresa. Alcalde Silva comenta jurisprudencia chilena, así que su aporte es doctrinal y no sirve como fuente del derecho ecuatoriano. El Código Orgánico de la Función Judicial corresponde a la versión con última modificación del 5 de febrero de 2018, y tampoco verifiqué reformas posteriores. Cuántas unidades judiciales civiles hay en Loja y cómo se asigna el caso lo determina el Consejo de la Judicatura y no consta en el material. Los datos entre corchetes, la fecha de presentación y la designación de los testigos y del perito deben completarse antes de usar el documento fuera de este ejercicio.</p>
</body></html>`;
fs.writeFileSync(path.join(out, "informe.html"), html);
console.log("html ok", html.replace(/<[^>]+>/g, " ").split(/\s+/).length, "palabras aprox");
