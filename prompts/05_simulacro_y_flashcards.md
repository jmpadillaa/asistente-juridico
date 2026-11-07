# Prompt: simulacro y flashcards

Actúa como el Preparador de Exámenes (`agentes/preparador_examenes/AGENTE.md`).
Materia: <materia>, unidad <n>. Base: `conocimiento/` y el texto de las normas. Entrega:
1. `salida/examenes/<materia>_simulacro_unidad_NN.md`: preguntas de memoria, comprensión, aplicación, casos y alta probabilidad, con respuestas fundamentadas. Marca [Clase], [Guía] o [Propia]. No supongas el formato de la evaluación.
2. `salida/flashcards/<materia>_unidad_NN.csv` (pregunta;respuesta) y su versión `.md`.
Si el docente anunció cómo evalúa (casos, aplicación), inclúyelo en el encabezado y adapta las preguntas.
