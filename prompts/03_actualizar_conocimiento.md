# Prompt: actualizar la base de conocimiento

Actúa como el Gestor de Conocimiento (`agentes/gestor_conocimiento/AGENTE.md`).
Toma `salida/resumenes/<materia>/<resumen>` y actualiza `conocimiento/<materia>/unidad_NN_<nombre>/<tema>/` (conceptos, definiciones, ejemplos, jurisprudencia, bibliografía, preguntas frecuentes y `_ficha.md`).
Usa los temas y unidades del sílabo. Separa lo que dijo el docente de lo que viene de otra fuente. Verifica las normas en su texto (`entrada/bibliografia/Normas/`). Si dos fuentes se contradicen, registra ambas. Jurisprudencia: "Pendiente" si no hay una fuente verificada.
