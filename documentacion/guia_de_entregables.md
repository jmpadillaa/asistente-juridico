# Guía de elaboración de entregables

**Para qué sirve:** dejar por escrito cómo se hicieron los entregables de la unidad 1 de las cuatro materias, para repetir el método en las unidades 2 y 3 sin empezar de cero. Está escrita a partir de lo que se hizo y se corrigió entre el 28 y el 31 de octubre de 2026.

## 1. Reglas que ya están acordadas

- Todo en español. Los trabajos de actividad en Word solo si se piden en Word; los APE y AA en **PDF** (la guía lo exige con citación APA 7 y carga al EVA); los foros se **pegan como texto** en el EVA.
- El estudiante revisa y aprueba antes de pasar a lo siguiente. Un entregable no se da por cerrado hasta que lo dice.
- Estilo: sin "crucial", "fundamental", "clave", sin "en conclusión", pocos guiones largos y pocas negritas, sin emojis decorativos. Escribir como escribiría el estudiante: directo, sin cadencia uniforme.
- **Cuando la norma y la diapositiva difieren, gana el texto de la norma.** Pasó en Procesal (arts. 166 y 168 del COGEP): se responde con la norma, se avisa y se anota la contradicción en `conocimiento/`.
- No inventar nada verificable: artículos, páginas, jurisprudencia, datos de personas. Lo que se supone se **marca**; lo que no se pudo verificar se **dice**.
- Si no se conoce el género de una persona, se usan formulaciones neutras y no se deduce de su nombre.

## 2. Antes de escribir (lista de verificación)

1. Leer la actividad en la **guía y el sílabo** de la materia: tipo, extensión, fuentes mínimas, rúbrica y fechas. Si se contradicen, mostrar la contradicción.
2. Buscar **cambios de la docente** (anuncios, tutoría de la semana 5, correos): en Civil II se eliminó el video y el mapa pasó al 8 de noviembre.
3. Pedir o buscar el **texto de las normas** en `entrada/bibliografia/Normas/` y leer los artículos en el texto, no de memoria. Anotar la versión y su fecha (Código Civil, enero de 2024; COGEP, febrero de 2021; COIP, febrero de 2021; Código de Comercio, 2019).
4. Revisar la **bibliografía de la carpeta**. Si el PDF está escaneado, leerlo con OCR (`ocr.ps1`) y citar la página impresa del libro.
5. Decidir qué hechos hay que **suponer** (casos sin datos, como la letra de cambio y el amparo posesorio) y ponerlos en una tabla al inicio, con los datos personales entre corchetes.
6. Revisar el material del estudiante en `entrada/` (por ejemplo, el PDF del video foro que él mismo prepara).

## 3. Flujo de cada entregable

1. Esquema contra la rúbrica (cada criterio con su puntaje).
2. Verificación de normas y citas.
3. Redacción.
4. Montaje en el formato (HTML a PDF, o texto para el EVA).
5. **Revisión visual** del PDF página por página (hoja de contactos); revisar desbordes de tablas y cortes de página.
6. Entrega al estudiante con: dónde está el archivo, qué se supuso, qué no se verificó y qué debe completar.
7. Correcciones que pida y nueva versión (`_v2`, sin pisar el original si está abierto en Word).
8. Cuando el estudiante aprueba, registrar el aprendizaje en `conocimiento/` y en esta guía.

## 4. Cómo se hizo cada tipo de entregable

| Tipo | Cómo | Ejemplo en `salida/` |
|---|---|---|
| Foro académico / video foro (ACD) | Respuestas numeradas con **el texto literal de cada pregunta**, fundadas en los artículos que pide el enunciado, con palabras propias donde lo pide. Texto plano para pegar en el EVA (y PDF si el estudiante lo prefiere) | Civil II: `ACD - Video foro Casa de Maria` |
| Video foro con caso (Procesal, Penal, Medicina Legal) | Un documento con el caso, las preguntas y respuestas con normas; en Procesal el estudiante lo pasó después a LaTeX con su plantilla | Procesal: `VideoForo - Los actos de proposición` |
| Infografía (AA) | Página **A3 horizontal** en HTML con jerarquía visual y una hoja A4 de **nota explicativa y referencias APA 7**; se unen con `pdfunite` | Procesal: `Infografia - Los actos de proposición` |
| Mapa conceptual (AA) | HTML con cuadros posicionados y conectores SVG, **palabras de enlace** sobre las líneas, colores por rama, y una hoja A4 con fundamentación, cuadro comparativo, aporte propio y referencias | Civil II: `AA - Mapa conceptual Clasificacion de los bienes` |
| APE informe jurídico | PDF A4 con: introducción y tabla de supuestos; análisis; matriz probatoria (página horizontal); piezas (demanda y contestación con los 13 numerales del art. 142); valoración; referencias y control de vigencia | Procesal: `APE - Informe juridico letra de cambio`; Civil II: `APE - Informe demanda de amparo posesorio` |
| Ensayo y estudio de caso | PDF con la estructura que pide la rúbrica, extensión del sílabo y mínimo de referencias APA 7 | Penal: ensayo; Medicina Legal: estudio de caso y ficha |
| Banco de preguntas / test | Word con las preguntas y respuestas fundadas en la lectura asignada | Medicina Legal: banco de 50 preguntas |

## 5. Herramientas y trampas

- **PDF desde HTML:** Node con `playwright` (Chromium), `format: A4` o `width: 420mm; height: 297mm`, `printBackground: true`, `preferCSSPageSize: true`. Se ejecuta con `NODE_PATH="$(npm root -g)"`. Scripts de ejemplo en `documentacion/plantillas_entregables/`.
- **Unir páginas de distinto tamaño:** hacer cada PDF por separado y unir con `pdfunite` (A3 horizontal con A4 vertical).
- **Word:** paquete `docx` de Node; un archivo abierto en Word da EBUSY: guardar como `_v2`.
- **LaTeX:** el estudiante lo usa para el video foro con su plantilla (`Documentos\Universidad\Derecho\latex`). Para lo demás pidió HTML a PDF; no mezclar sin que lo pida.
- **OCR:** el motor de Windows (`ocr.ps1`) lee los PDF escaneados y las diapositivas que son imágenes; tarda varios minutos por documento y conviene dejarlo en segundo plano.
- **pdftotext:** usar `-enc UTF-8`. En Git Bash, `sed` y los heredocs de Python pueden comerse las barras invertidas: para LaTeX o JavaScript con `\`, editar con la herramienta de edición.
- **Hojas de contactos:** generar miniaturas con `pdftoppm` y revisar en imagen antes de entregar.

## 6. Lecciones de la unidad 1

1. **Procesal:** las diapositivas tenían frases que no están en el COGEP ("hechos sobrevenidos", "solemne juramento", "prohibición expresa de suplencia", congruencia en el art. 252). Respuesta: usar la norma. Además, en el procedimiento ejecutivo la competencia es concurrente (arts. 9 y 10); en las **acciones posesorias** es **excluyente** del juez del lugar de la cosa (art. 11.2).
2. **Procesal:** el sumario no permite reformar la demanda (art. 333.1); eso obliga a definir bien la pretensión antes de presentar.
3. **Civil II:** el mapa conceptual quedó mejor con una página de fundamentación y con la aplicación a los casos de clase. La docente dijo que el examen sale de `Semana_05.pdf`.
4. **Civil II:** el archivo de la semana 4 en `entrada` no era de la materia; hay que revisar los archivos al subirlos.
5. **Penal:** el docente evalúa aplicación a casos; la hoja de repaso trae un esquema de resolución.
6. **Medicina Legal:** el docente anunció qué cae (espasmo frente a rigidez); se registró como "dicho del docente".
7. **En general:** guía y sílabo traen errores (fechas de bibliografía, docente responsable distinto, actividades duplicadas). Anotarlos en `salida/analisis_guias/` y avisar.
8. **Datos supuestos:** los casos sin hechos (letra de cambio, amparo) se inventaron con una tabla de supuestos; se avisó que son del ejercicio y se dejaron corchetes para datos personales.

## 7. Entregables de la unidad 1 y su estado

| Materia | Entregable | Puntos | Ruta |
|---|---|---|---|
| Procesal II | Video foro (ACD 2) | 1,00 | `salida/material_estudio/DerechoProcesalIINoPenal/Entregables/VideoForo - Los actos de proposición - UnidadI.pdf` |
| Procesal II | Infografía (AA) | 1,00 | `.../Infografia - Los actos de proposición - UnidadI.pdf` |
| Procesal II | Informe jurídico de la letra de cambio (APE) | 2,50 | `.../APE - Informe juridico letra de cambio - UnidadI.pdf` |
| Civil II | Video foro, casa de María (ACD 2) | 1,00 | `salida/material_estudio/DerechoCivilII/Entregables/ACD - Video foro Casa de Maria...` |
| Civil II | Mapa conceptual (AA) | 1,00 | `.../AA - Mapa conceptual Clasificacion de los bienes - UnidadI.pdf` |
| Civil II | Demanda de amparo posesorio (APE) | 2,50 | `.../APE - Informe demanda de amparo posesorio - UnidadI.pdf` |
| Penal | Video foro, infografía y ensayo | 1,00 / 2,00 / 2,50 | `salida/material_estudio/DerechoPenal/entregables/` |
| Medicina Legal | Video foro, estudio de caso y banco de preguntas | 1,00 / 2,50 / 2,00 | `salida/material_estudio/MedicinaLegal/Entregables/` |

## 8. Unidades 2 y 3: qué viene y cómo prepararlo

Las fechas son las de cada guía (unidad 2: 9 de noviembre al 13 de diciembre, evaluación 15 y 16; unidad 3: enero a febrero de 2027, evaluación 20 y 21 de febrero). Para empezar temprano: leer la actividad el primer día y pedir los textos de las normas.

| Materia | Entregables de la unidad 2 | Cómo prepararlos |
|---|---|---|
| Procesal II | Foro (400 a 500 palabras, al menos tres disposiciones del COGEP, una fuente doctrinaria, comentar a un compañero; ordinario frente a sumario); video foro; APE: dos demandas (una por procedimiento) con diligencia preparatoria, providencia preventiva, litisconsorcio o procuración, más matriz comparativa; AA: storyboard jurídico | Usar los arts. 289 a 298 y 332 y 333; reutilizar el método de supuestos y la tabla de trámite del informe de la letra de cambio |
| Civil II | Foro (concepto de modos de adquirir, tipos de posesión, prescripción ordinaria y extraordinaria); video foro con conexión obligatoria; mapa conceptual de las limitaciones al dominio; video; demanda de prescripción extraordinaria adquisitiva de dominio | La demanda se arma como la de amparo (art. 142); la posesión ya está en `conocimiento/` |
| Penal | Foro, video foro, estudio de caso con informe jurídico, infografía u organizador gráfico (600 a 800 palabras y 5 fuentes) | Ver `salida/analisis_guias/derecho_penal_analisis_guia.md` |
| Medicina Legal | Ver `salida/analisis_guias/medicina_legal_analisis_guia.md` (medicina forense materno infantil y sexológica) | Idem |

Orden recomendado por unidad: primero lo que vale más y vence antes (APE 2,50), luego los foros, luego AA; reservar tiempo para consultar normas y para la citación APA 7.
