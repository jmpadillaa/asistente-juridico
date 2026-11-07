const fs = require("fs");
const out = process.argv[2];

const esc = (s) => s;
const P = (t, cls = "") => `<p class="${cls}">${t}</p>`;
const H1 = (t) => `<h1>${t}</h1>`;
const H2 = (t) => `<h2>${t}</h2>`;
const H3 = (t) => `<h3>${t}</h3>`;
const UL = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
const TBL = (head, rows, widths, cap) => `
<table class="t">${cap ? `<caption>${cap}</caption>` : ""}
<colgroup>${widths.map((w) => `<col style="width:${w}">`).join("")}</colgroup>
<thead><tr>${head.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;

const body = [];

// ---------------- PORTADA
body.push(`<div class="portada">
<p class="t">Informe jurídico: actos de proposición y medios probatorios en el procedimiento ejecutivo por letra de cambio</p>
<p>Jhonny Mauricio Padilla Alvear</p>
<p>Carrera de Derecho, Unidad de Educación a Distancia, Universidad Nacional de Loja</p>
<p>Derecho Procesal II No Penal, IV ciclo, paralelo D</p>
<p>Unidad I, Aprendizaje práctico experimental (APE)</p>
<p>Abg. Ximena Alexandra Orosco Aguilar, Mgtr.</p>
<p>1 de noviembre de 2026</p>
</div>`);

// ---------------- 1. INTRODUCCIÓN
body.push(H1("Introducción"));
body.push(P("Este informe resuelve el caso de una letra de cambio vencida y no pagada, en la que el deudor alega un abono parcial y discute el valor reclamado. Siguiendo la consigna, asumo de forma alternada la defensa de la parte actora y de la parte demandada. El documento reúne el análisis del caso, la validez y exigibilidad de la letra como título ejecutivo, la matriz probatoria, la demanda ejecutiva, la contestación y las referencias."));
body.push(P("El enunciado no trae cifras, fechas ni nombres. Para poder redactar las piezas con contenido concreto, completé los hechos con datos supuestos, que aparecen en la tabla 1 y que deberían reemplazarse si el docente entrega un caso con datos propios. Todo lo demás, las normas y los plazos, proviene de los textos legales citados."));
body.push(TBL(["Dato", "Hecho supuesto para el ejercicio"], [
  ["Letra de cambio", "USD 8.000,00, girada en Loja el 10 de marzo de 2026, a la orden del propio girador, pagadera en Loja el 10 de septiembre de 2026, sin cláusula de intereses"],
  ["Girador y beneficiario (actor)", "Marcos Andrade Cueva"],
  ["Girado y aceptante (demandado)", "Luis Paredes Ortiz, domiciliado en Loja; aceptó la letra con su firma en el anverso"],
  ["Falta de pago", "Presentada la letra al vencimiento, el aceptante no pagó"],
  ["Abono alegado por el deudor", "USD 2.500,00 transferidos el 15 de agosto de 2026 a la cuenta del actor, con comprobante bancario"],
  ["Posición del actor sobre el abono", "La transferencia pagó otro pedido de mercadería (factura del 5 de agosto de 2026); no se anotó en la letra y no se extendió recibo"],
  ["Demanda y contestación", "Demanda presentada el 28 de septiembre de 2026; contestación presentada dentro del término de quince días"],
], ["30%", "70%"], "Tabla 1. Datos supuestos del caso"));

// ---------------- 2. ANÁLISIS DEL CASO
body.push(H1("Análisis del caso"));
body.push(H2("Partes, obligación y pretensión"));
body.push(P("La parte actora es Marcos Andrade Cueva, quien gira la letra a su propia orden y, por eso, es a la vez girador y beneficiario. El Código de Comercio permite girar la letra a la orden del propio librador (Asamblea Nacional, 2019, art. 116). La parte demandada es Luis Paredes Ortiz, el girado, que al firmar en el anverso aceptó la letra. La simple firma del girado en la cara anterior equivale a la aceptación (art. 138), y por la aceptación el girado se obliga a pagar a su vencimiento (art. 141)."));
body.push(P("La obligación es de dar una suma de dinero: USD 8.000,00 con vencimiento el 10 de septiembre de 2026. La pretensión del actor es que se condene al aceptante a pagar ese capital, con los intereses de mora que correspondan y las costas. El conflicto no está en la existencia de la deuda, que el demandado reconoce en parte, sino en su monto, porque el demandado afirma que pagó USD 2.500,00 y el actor niega que esa transferencia corresponda a la letra."));
body.push(P("Como el demandado es el aceptante, el actor ejerce la acción cambiaria directa, que procede contra el aceptante y sus avalistas (art. 160) y que el portador tiene aun cuando sea el mismo girador (art. 141). Esto tiene una consecuencia práctica: la omisión del protesto solo produce la caducidad de las acciones de regreso (art. 149), de modo que el actor no necesitaba protestar la letra para demandar al aceptante."));

body.push(H2("Competencia"));
body.push(P("En razón del territorio, la regla general es la competencia del juzgador del domicilio de la persona demandada (Asamblea Nacional, 2021, art. 9). El actor puede elegir, además, al juzgador del lugar donde deba hacerse el pago (art. 10, numeral 1). En el caso ambos puntos coinciden en Loja, por lo que la demanda se presenta ante la Unidad Judicial Civil con sede en ese cantón. En razón de la materia, el cobro de una letra de cambio es una controversia civil y mercantil; la norma orgánica que asigna esa competencia es del Código Orgánico de la Función Judicial, que no está en la carpeta del curso y que conviene citar con su texto vigente antes de presentar el trabajo."));
body.push(P("La cuantía es de USD 8.000,00. Para fijarla se toman en cuenta los intereses líquidos del capital y los pactados en el documento (art. 144, numeral 1); como la letra no estipula intereses, la cuantía coincide con el capital."));

body.push(H2("Procedimiento aplicable"));
body.push(P("El COGEP incluye las letras de cambio entre los títulos ejecutivos (art. 347, numeral 4), de modo que el cobro sigue el procedimiento ejecutivo (arts. 347 a 355). Ramírez Romero (2015, p. 175) lo describe como el proceso que, partiendo de una obligación clara, líquida y de plazo vencido, sirve para garantizar su cumplimiento. En lo que ese capítulo no prevé se aplican las normas del procedimiento sumario (art. 355), lo que explica que el término para contestar sea de quince días (arts. 333, numeral 3, y 351; Ramírez Romero, 2015, pp. 78-79) y que no proceda la reforma de la demanda (art. 333, numeral 1). La tabla 2 resume el trámite."));
body.push(TBL(["Etapa", "Plazo", "Norma"], [
  ["Demanda con el título ejecutivo; sin título, se inadmite y no es subsanable", "—", "COGEP, art. 349"],
  ["Calificación de la demanda", "3 días", "COGEP, art. 351"],
  ["Providencias preventivas sobre bienes, si se acompañan certificados de propiedad", "Con el auto de calificación", "COGEP, art. 351"],
  ["Contestación: pagar, oponerse con prueba, rendir caución o reconvenir con otro título", "15 días", "COGEP, arts. 351 y 333, numeral 3"],
  ["Si no cumple ni propone excepciones permitidas: sentencia inmediata, sin recurso", "—", "COGEP, art. 352"],
  ["Oposición fundamentada: traslado a la contraparte y audiencia única", "3 días para notificar; audiencia en máximo 20 días", "COGEP, art. 354"],
  ["Audiencia única en dos fases: saneamiento, fijación de los puntos en debate y conciliación; prueba y alegatos", "—", "COGEP, art. 354"],
  ["Sentencia; apelación solo con efecto no suspensivo; no hay casación", "—", "COGEP, art. 354"],
], ["52%", "24%", "24%"], "Tabla 2. Trámite del procedimiento ejecutivo"));
body.push(P("Los actos de proposición cumplen aquí la misma función que en cualquier proceso. La demanda y la contestación fijan lo que se discute, y Aguirrezabal Grünstein (2017) explica que el debate se define a partir de los hechos alegados por el actor en la demanda y por el demandado en la contestación (p. 428). Esto pesa especialmente en este caso, por dos razones. Primero, el actor no puede corregir después el monto reclamado, porque la reforma de la demanda no existe en el procedimiento sumario (art. 333, numeral 1), y por eso debe decidir antes de demandar si reclama el total o el saldo. Segundo, el demandado debe presentar su oposición con la prueba que la respalda (art. 351, numeral 2) y limitarla a las excepciones del art. 353; si propone otras, el juez dicta sentencia de inmediato (art. 352)."));

// ---------------- 3. VALIDEZ Y EXIGIBILIDAD
body.push(H1("Validez y exigibilidad de la letra como título ejecutivo"));
body.push(P("Para que proceda el procedimiento ejecutivo, la obligación debe ser clara, pura, determinada y actualmente exigible y, si es de dinero, líquida o liquidable mediante operación aritmética (Asamblea Nacional, 2021, art. 348). El título debe acompañar la demanda; si falta, la demanda se inadmite y la omisión no es subsanable (art. 349), y si el título no presta mérito ejecutivo el juez deniega de plano la acción (art. 350). La tabla 3 revisa la letra del caso contra esos requisitos y contra los de forma del Código de Comercio."));
body.push(TBL(["Requisito", "Norma", "En el caso"], [
  ["Denominación “letra de cambio” en el texto, o indicación expresa de ser a la orden", "Código de Comercio, art. 114, lit. a", "Cumple: el documento dice “letra de cambio”"],
  ["Orden incondicional de pagar una cantidad determinada", "Art. 114, lit. b", "Cumple: USD 8.000,00. Si el monto en letras y en cifras difiere, vale el escrito en letras (art. 120)"],
  ["Nombre del girado", "Art. 114, lit. c", "Cumple: Luis Paredes Ortiz"],
  ["Vencimiento", "Art. 114, lit. d", "Cumple: 10 de septiembre de 2026. Sin indicación, se tendría por pagadera a la vista (art. 115)"],
  ["Lugar de pago", "Art. 114, lit. e", "Cumple: Loja"],
  ["Beneficiario", "Art. 114, lit. f", "Cumple: el propio girador (art. 116)"],
  ["Fecha y lugar de emisión", "Art. 114, lit. g", "Cumple: Loja, 10 de marzo de 2026"],
  ["Firma del girador", "Art. 114, lit. h", "Cumple"],
  ["Aceptación firmada por el girado", "Arts. 138 y 141", "Cumple: firma en el anverso; acción directa contra el aceptante"],
  ["Obligación clara, pura, determinada y actualmente exigible", "COGEP, art. 348", "Cumple: sin condición ni plazo pendiente; venció el 10 de septiembre de 2026"],
  ["Obligación líquida", "COGEP, art. 348", "Cumple en el capital. El abono alegado no la hace ilíquida, pero puede reducir la suma exigible"],
  ["Título acompañado a la demanda", "COGEP, art. 349", "El actor debe presentar la letra original (Código de Comercio, art. 84)"],
  ["Acción no prescrita", "Código de Comercio, art. 179", "Las acciones contra el aceptante prescriben en cinco años desde el vencimiento; la demanda se presenta a los 18 días"],
], ["38%", "22%", "40%"], "Tabla 3. Revisión de la letra como título ejecutivo"));
body.push(P("Con esa revisión, la letra es un título ejecutivo válido y exigible. Una falla de forma en alguno de los literales del art. 114 la privaría de valor como letra, con las salvedades del art. 115, y habría permitido al demandado alegar la excepción de título no ejecutivo (COGEP, art. 353, numeral 1)."));
body.push(H2("Efecto del abono alegado"));
body.push(P("El abono no cuestiona la validez de la letra sino la cuantía exigible, y por eso se ubica en la excepción de extinción total o parcial de la obligación (COGEP, art. 353, numeral 3). El Código de Comercio regula el pago parcial en dos normas. Cuando el tenedor acepta pagos parciales, debe anotarlos en el título o en una hoja adherida y extender por separado el recibo, y el título conserva su eficacia por la parte no pagada (Asamblea Nacional, 2019, art. 84). En la letra de cambio, además, el portador puede admitir o rehusar a su voluntad un pago parcial, y el girado puede exigir que se anote en la letra y que se le dé recibo (art. 156)."));
body.push(P("Estas reglas favorecen a cada parte en un punto distinto. Al demandado le sirve que la ley ponga en el tenedor la carga de anotar el pago, de modo que la falta de anotación no sea una omisión suya. Al actor le sirve que el art. 156 deje al girado la facultad de exigir la anotación y el recibo, y que el demandado no los haya reclamado. Tampoco hay una regla que convierta la falta de anotación en prueba de que el pago no existió: ese punto lo decide el juez con la prueba de la audiencia, valorada según la sana crítica (COGEP, art. 164)."));
body.push(P("Por último, la letra del caso es pagadera a día fijo. En ese tipo de letra, la cláusula de intereses se considera no escrita (Asamblea Nacional, 2019, art. 119), de modo que el actor no puede reclamar intereses pactados. Por eso la pretensión pide solo los intereses de mora que correspondan por ley, cuya tasa debe confirmarse antes de presentar la demanda."));

// ---------------- 4. MATRIZ PROBATORIA (horizontal)
body.push(`<div class="matriz">`);
body.push(H1("Matriz probatoria"));
body.push(P("La matriz relaciona cada hecho controvertido con la parte que debe probarlo, el medio de prueba y el momento en que debe anunciarse. Aplica las reglas de la carga de la prueba (Asamblea Nacional, 2021, art. 169), el anuncio con la demanda y la contestación (arts. 142, numeral 7, y 152) y la admisibilidad, que exige pertinencia, utilidad y conducencia (art. 160)."));
body.push(TBL(["Hecho", "Carga", "Medio de prueba", "Anuncio y norma", "Observación"], [
  ["1. Existencia, forma y validez de la letra como título ejecutivo", "Actor", "Letra de cambio original (prueba documental)", "Con la demanda: arts. 142 num. 7, 143 num. 5 y 349; Código de Comercio, arts. 84 y 114", "Es requisito de procedibilidad. Debe presentarse el original (arts. 193 y 194)"],
  ["2. Aceptación del girado y vencimiento", "Actor", "La propia letra; declaración de parte del demandado (art. 174)", "Con la demanda y contestación (arts. 142 y 151)", "Si el demandado admite su firma y la aceptación, el hecho no requiere prueba (art. 163, num. 1). Una impugnación de firma exige acompañar prueba (art. 203)"],
  ["3. Falta de pago al vencimiento", "Actor", "Letra sin anotaciones de pago; estado de cuenta del actor", "Con la demanda (art. 143, num. 5)", "Es un hecho negativo; se acredita con el documento y con la falta de prueba del pago por parte del demandado"],
  ["4. Pago de USD 2.500,00 el 15 de agosto de 2026", "Demandado (art. 169, inc. 2)", "Comprobante de la transferencia; estado de cuenta del deudor; certificación de la entidad financiera; declaración de parte del actor", "Con la contestación (arts. 151, 152 y 351 num. 2). La certificación se pide como acceso judicial (arts. 142 num. 8, 152 inc. 3 y 159)", "Es la prueba central del proceso. El demandado debe acompañar el comprobante que tenga y solicitar la certificación de lo que no pueda obtener"],
  ["5. La transferencia pagó otra obligación", "Actor", "Factura o pedido del 5 de agosto de 2026; estado de cuenta con la referencia del depósito; testigo (contador o encargado de ventas); declaración de parte del demandado", "Con la demanda (arts. 142 num. 7 y 143 num. 5)", "Si el actor no la anuncia con la demanda, no podrá introducirla en la audiencia (art. 159). La prueba nueva del art. 166 exige acreditar que no la conocía o no pudo disponer de ella"],
  ["6. Falta de anotación del pago en la letra y de recibo", "Ambos", "La letra original; ausencia de recibo", "Con la demanda y la contestación", "Es un indicio que el juez valora en conjunto (art. 164); no es prueba de que el pago no existió"],
  ["7. Monto líquido reclamado", "Actor", "Liquidación pormenorizada; la letra (monto en letras y cifras, art. 120)", "Con la demanda (arts. 143 y 348)", "Si el abono se acredita, el saldo se calcula por operación aritmética: USD 8.000,00 menos USD 2.500,00, igual a USD 5.500,00"],
], ["19%", "9%", "24%", "24%", "24%"], "Tabla 4. Matriz que relaciona hechos controvertidos y medios probatorios"));
body.push(P("Los medios previstos para este caso son el documental (arts. 193 a 196), la declaración de parte, que el COGEP regula como prueba testimonial (arts. 174 a 178), y, solo si el demandado impugna la firma, la pericial grafológica, que se solicita con la demanda o la contestación cuando la parte no tiene acceso al objeto de la pericia (arts. 221 y 225). Quedan descartadas la inspección judicial y la pericia contable, porque no hay hechos que ellas aclaren y serían inconducentes (art. 160)."));
body.push(`</div>`);

// ---------------- 5. DEMANDA
body.push(H1("Demanda ejecutiva"));
body.push(P("Sigo el orden de los trece numerales del art. 142 del COGEP. Los datos entre corchetes los completa quien firma, porque el caso no los trae."));
body.push(`<div class="pieza">
<p class="enc"><b>SEÑORA O SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN LOJA</b></p>
<p class="enc">Procedimiento ejecutivo · Cuantía: USD 8.000,00</p>
<p><b>1. Juzgador ante quien se propone la demanda.</b> Unidad Judicial Civil con sede en el cantón Loja, competente por el domicilio del demandado y por ser el lugar donde debe hacerse el pago (COGEP, arts. 9 y 10, numeral 1).</p>
<p><b>2. Datos del actor.</b> Marcos Andrade Cueva, ecuatoriano, mayor de edad, [estado civil], comerciante, cédula de ciudadanía n.º [número], domiciliado en [dirección], Loja, correo electrónico [correo]. Defensor: Abg. [nombre y matrícula], casillero judicial [número] y correo [correo].</p>
<p><b>3. Registro Único de Contribuyentes.</b> [Número de RUC del actor, si la letra se originó en su actividad comercial.]</p>
<p><b>4. Datos del demandado y lugar de citación.</b> Luis Paredes Ortiz, mayor de edad, [datos que se conozcan]. Se lo citará en [dirección], Loja, y en el correo [correo], si se conoce.</p>
<p><b>5. Hechos.</b></p>
<p class="n">Primero. El 10 de marzo de 2026, en la ciudad de Loja, giré a mi propia orden una letra de cambio por USD 8.000,00 contra Luis Paredes Ortiz, pagadera en Loja el 10 de septiembre de 2026.</p>
<p class="n">Segundo. El girado aceptó la letra con su firma en el anverso, por lo que se obligó a pagarla a su vencimiento (Código de Comercio, arts. 138 y 141).</p>
<p class="n">Tercero. Llegado el vencimiento, presenté la letra al pago y el aceptante no la pagó, sin que hasta hoy haya cumplido la obligación.</p>
<p class="n">Cuarto. El demandado sostiene que realizó un abono de USD 2.500,00. Ese valor corresponde a una transferencia hecha el 15 de agosto de 2026 a mi cuenta, con la cual el demandado pagó un pedido distinto de mercadería, facturado el 5 de agosto de 2026.</p>
<p class="n">Quinto. La letra no contiene anotación de pago alguno y no extendí recibo de pago parcial a su favor, por lo que reclamo el valor total del título.</p>
<p><b>6. Fundamentos de derecho.</b> Constitución, art. 75 (tutela judicial efectiva). COGEP, arts. 347 numeral 4, 348, 349 y 351, que regulan la procedencia del procedimiento ejecutivo y el título que lo sustenta. Código de Comercio, arts. 113 a 115, sobre la creación y los requisitos de la letra; arts. 138 y 141, sobre la aceptación y la acción directa; art. 160, que concede la acción cambiaria directa contra el aceptante; y art. 179, que fija en cinco años la prescripción de las acciones contra el aceptante, plazo que no ha corrido.</p>
<p><b>7. Anuncio de los medios de prueba.</b> Con esta demanda acompaño y anuncio: a) la letra de cambio original, como título ejecutivo; b) la liquidación pormenorizada del valor reclamado; c) la factura del 5 de agosto de 2026 por USD 2.500,00 y el estado de cuenta de mi cuenta bancaria, donde consta el depósito del 15 de agosto de 2026 con su referencia. Anuncio además la declaración de parte del demandado, que será interrogado sobre el origen de la transferencia, y el testimonio de [nombre], encargado de ventas, sobre los hechos cuarto y quinto.</p>
<p><b>8. Acceso judicial a la prueba.</b> No lo solicito: toda la prueba documental que anuncio está en mi poder y se acompaña a esta demanda.</p>
<p><b>9. Pretensión.</b> Solicito que, aceptada la demanda, se ordene al demandado pagar el capital de USD 8.000,00, los intereses de mora que correspondan conforme a la ley, las costas procesales y los honorarios de mi defensor.</p>
<p><b>10. Cuantía.</b> USD 8.000,00 (ocho mil dólares de los Estados Unidos de América), que corresponde al capital de la letra, sin intereses pactados (COGEP, art. 144, numeral 1).</p>
<p><b>11. Procedimiento.</b> Ejecutivo (COGEP, arts. 347 a 355).</p>
<p><b>12. Firmas.</b> Marcos Andrade Cueva, actor · Abg. [nombre y matrícula], defensor.</p>
<p><b>13. Otros requisitos.</b> Notificaciones en el casillero judicial y el correo electrónico indicados en el numeral 2.</p>
<p><b>Anexos (COGEP, art. 143).</b> Copia de la cédula de ciudadanía; letra de cambio original; liquidación pormenorizada; factura del 5 de agosto de 2026; estado de cuenta; autorización del defensor.</p>
<p class="enc">Loja, 28 de septiembre de 2026</p>
</div>`);

// ---------------- 6. CONTESTACIÓN
body.push(H1("Contestación a la demanda"));
body.push(P("La contestación sigue el art. 151 del COGEP: se pronuncia de forma expresa sobre las pretensiones, los hechos y la autenticidad de los documentos, deduce las excepciones con su fundamento fáctico y anuncia la prueba (art. 152). Como el procedimiento es ejecutivo, la oposición se limita a las excepciones del art. 353 y se presenta con la prueba que la respalda (art. 351, numeral 2)."));
body.push(`<div class="pieza">
<p class="enc"><b>SEÑORA O SEÑOR JUEZ DE LA UNIDAD JUDICIAL CIVIL CON SEDE EN EL CANTÓN LOJA</b></p>
<p class="enc">Proceso n.º [número] · Procedimiento ejecutivo · Actor: Marcos Andrade Cueva · Demandado: Luis Paredes Ortiz</p>
<p><b>1. Datos del demandado.</b> Luis Paredes Ortiz, mayor de edad, [datos], domiciliado en [dirección], Loja. Defensor: Abg. [nombre y matrícula], casillero judicial [número] y correo [correo]. Contesto dentro del término de quince días que prevén los arts. 333, numeral 3, y 351 del COGEP.</p>
<p><b>2. Pronunciamiento sobre las pretensiones.</b> Me opongo a la pretensión de que se me ordene pagar USD 8.000,00, en lo que excede de USD 5.500,00. No discuto la exigibilidad de este saldo. Me opongo también al pago de costas y honorarios por el valor que ya fue pagado.</p>
<p><b>3. Pronunciamiento sobre los hechos y la autenticidad de los documentos.</b></p>
<p class="n">Primero y segundo. Admito que el 10 de marzo de 2026 se giró la letra de cambio por USD 8.000,00, que su vencimiento fue el 10 de septiembre de 2026 y que la acepté con mi firma. Reconozco la autenticidad de la letra y de mi firma.</p>
<p class="n">Tercero. Admito que a la fecha de vencimiento no había cubierto el valor completo de la letra; niego que no se hubiera realizado ningún pago, porque el 15 de agosto de 2026 pagué USD 2.500,00.</p>
<p class="n">Cuarto. Niego que la transferencia del 15 de agosto de 2026 haya pagado un pedido distinto de mercadería. No he recibido la mercadería que el actor afirma haberme vendido, y la factura del 5 de agosto de 2026 no tiene mi firma ni constancia de entrega.</p>
<p class="n">Quinto. Admito que la letra no tiene anotación del pago y que no recibí recibo. Niego que de ello se siga que el pago no existió. Anotar el pago y extender el recibo es un deber del tenedor que acepta un pago parcial (Código de Comercio, art. 84), y esa omisión no puede perjudicar a quien pagó.</p>
<p><b>4. Excepciones.</b> Formulo la excepción de extinción parcial de la obligación (COGEP, art. 353, numeral 3). El 15 de agosto de 2026, mediante transferencia a la cuenta del actor, pagué USD 2.500,00 a cuenta de la letra, antes de su vencimiento. Ese valor extingue parcialmente la obligación, de modo que lo exigible es el saldo de USD 5.500,00. Cuando el tenedor acepta un pago parcial el título conserva su eficacia solo por la parte no pagada (Código de Comercio, art. 84), y el actor reclama, en cambio, el valor total. No formulo otras excepciones.</p>
<p><b>5. Fundamentos de derecho.</b> COGEP, arts. 151 y 152 (contestación y anuncio de prueba), 351 numeral 2 (oposición con prueba), 353 numeral 3 (extinción parcial de la obligación) y 169 (carga de la prueba). Código de Comercio, arts. 84 y 156 (pago parcial).</p>
<p><b>6. Anuncio de los medios de prueba.</b> Acompaño y anuncio: a) el comprobante de la transferencia del 15 de agosto de 2026 por USD 2.500,00; b) el estado de cuenta de mi cuenta bancaria, donde consta el débito. Anuncio la declaración de parte del actor, que será interrogado sobre la recepción de esa transferencia y sobre la supuesta venta de mercadería.</p>
<p><b>7. Acceso judicial a la prueba.</b> Solicito que se oficie a [entidad financiera del actor] para que certifique si el 15 de agosto de 2026 se acreditó en la cuenta del actor una transferencia de USD 2.500,00 ordenada por mí, y con qué referencia. No tengo acceso a esa información porque pertenece a la cuenta del actor (COGEP, arts. 152, inciso 3, y 159).</p>
<p><b>8. Petición.</b> Que se acepte la excepción de extinción parcial de la obligación; que se declare que el valor exigible es de USD 5.500,00; y que se condene en costas a la parte actora por el exceso reclamado.</p>
<p><b>9. Notificaciones y firmas.</b> En el casillero judicial y el correo indicados en el numeral 1. Luis Paredes Ortiz, demandado · Abg. [nombre y matrícula], defensor.</p>
<p><b>Anexos.</b> Copia de la cédula de ciudadanía; comprobante de la transferencia; estado de cuenta; autorización del defensor.</p>
<p class="enc">Loja, 20 de octubre de 2026</p>
</div>`);

// ---------------- 7. VALORACIÓN
body.push(H1("Valoración del caso"));
body.push(P("El caso se decide por un solo hecho: si la transferencia de USD 2.500,00 fue un pago de la letra. Todo lo demás está de acuerdo entre las partes o es ajeno a la discusión, porque la letra es un título válido, el demandado la aceptó y no discute su firma. Por eso la audiencia única se centrará en la segunda fase, de prueba y alegatos, y el resultado depende de quién logre acreditar mejor su versión."));
body.push(P("La posición del demandado tiene la ventaja de que su prueba es sencilla, un comprobante bancario, y de que el actor no anotó el pago ni extendió recibo, aunque el art. 84 se lo imponía si lo aceptaba como pago parcial. Su punto débil es que no exigió la anotación ni el recibo cuando pagó (art. 156) y que debe probar el pago, porque la contestación contiene afirmaciones explícitas sobre el hecho (COGEP, art. 169, inciso 2). La posición del actor tiene la dificultad de probar que la transferencia correspondió a otra deuda: si la factura no está firmada ni se acredita la entrega de la mercadería, el juez puede inclinarse por el abono. Además, no puede reformar la demanda para reclamar solo el saldo si cambia de criterio (art. 333, numeral 1), y por eso la decisión de reclamar el total debía tomarse con la prueba del otro pedido ya reunida."));
body.push(P("La principal lección procesal es la de los actos de proposición: lo que no se anuncia ni se adjunta con la demanda o la contestación no entra después, salvo las vías excepcionales de la nueva prueba (art. 151) y la prueba nueva (art. 166), que no alcanzan a documentos que la parte conocía y podía obtener. En este caso, quien omita en su primer escrito la factura, el comprobante o la solicitud de certificación bancaria perderá esa prueba."));

// ---------------- Referencias
body.push(`<div class="refs"><h1>Referencias</h1>
<p class="ref">Aguirrezabal Grünstein, M. (2017). El principio dispositivo y su influencia en la determinación del objeto del proceso en el proceso civil chileno. <i>Revista de Derecho Privado</i>, (32), 423-441. https://doi.org/10.18601/01234366.n32.14</p>
<p class="ref">Asamblea Nacional. (2019). <i>Código de Comercio</i>. Registro Oficial Suplemento 497.</p>
<p class="ref">Asamblea Nacional. (2021). <i>Código Orgánico General de Procesos</i>. Registro Oficial Suplemento 506. Texto actualizado a febrero de 2021.</p>
<p class="ref">Asamblea Nacional Constituyente. (2008). <i>Constitución de la República del Ecuador</i>. Registro Oficial 449.</p>
<p class="ref">Ramírez Romero, C. (Ed.). (2015). <i>Principales cuestiones acerca del Código Orgánico General de Procesos en preguntas y respuestas</i>. Corte Nacional de Justicia.</p>
<p class="dec"><b>Control de vigencia.</b> Consulté el COGEP en el texto actualizado de Lexis Finder a febrero de 2021 y el Código de Comercio en el texto publicado en el Registro Oficial Suplemento 497 del 29 de mayo de 2019 (versión de Lexis difundida por la Superintendencia de Compañías). No verifiqué reformas posteriores a esas fechas, por lo que los artículos citados deben confirmarse en JURLEX. Fecha de consulta: 31 de octubre de 2026.</p>
<p class="dec"><b>Uso de herramientas digitales.</b> Para organizar el informe y redactar el borrador usé un asistente de inteligencia artificial (Claude, de Anthropic). Las citas de normas y las páginas de las obras se comprobaron contra los textos originales, y revisé el contenido antes de entregarlo.</p>
</div>`);

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe jurídico: letra de cambio</title>
<style>
@page { size: A4; margin: 25mm; }
@page matriz { size: A4 landscape; margin: 14mm 18mm; }
body { font-family: "Times New Roman", serif; font-size: 12pt; line-height: 1.5; color: #000; }
.portada { text-align: center; padding-top: 65mm; page-break-after: always; line-height: 2; }
.portada .t { font-weight: bold; margin-bottom: 26pt; line-height: 1.5; }
.portada p { text-align: center; text-indent: 0; margin: 0; }
h1 { font-size: 12pt; font-weight: bold; text-align: center; margin: 14pt 0 4pt; page-break-after: avoid; }
h2 { font-size: 12pt; font-weight: bold; text-align: left; margin: 10pt 0 2pt; page-break-after: avoid; }
p { text-align: justify; text-indent: 1.27cm; margin: 0; }
.t { width: 100%; border-collapse: collapse; margin: 8pt 0 10pt; font-size: 10pt; line-height: 1.25; }
.t caption { caption-side: top; text-align: left; font-weight: bold; font-style: italic; font-size: 10.5pt; padding-bottom: 4pt; }
.t th { background: #e9e9e9; border: 1px solid #555; padding: 4pt 5pt; text-align: left; }
.t td { border: 1px solid #555; padding: 4pt 5pt; vertical-align: top; text-align: left; }
.t tr { page-break-inside: avoid; }
.matriz { page: matriz; break-before: page; break-after: page; }
.matriz .t { font-size: 9pt; line-height: 1.2; margin: 4pt 0 6pt; } .matriz p { font-size: 11pt; line-height: 1.35; }
.pieza { border: 1px solid #777; padding: 10pt 12pt; margin: 8pt 0 10pt; font-size: 11pt; line-height: 1.4; }
.pieza p { text-indent: 0; margin: 0 0 5pt; }
.pieza .n { margin-left: 0.8cm; }
.pieza .enc { text-align: center; }
.refs { page-break-before: always; }
.ref { padding-left: 1.27cm; text-indent: -1.27cm; text-align: left; margin: 0 0 8pt; }
.dec { font-size: 11pt; line-height: 1.4; text-indent: 0; margin-top: 14pt; border-top: 1px solid #999; padding-top: 8pt; }
</style></head><body>
${body.join("\n")}
</body></html>`;

fs.writeFileSync(out + "/informe.html", html);
const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
console.log("palabras aprox:", words);
