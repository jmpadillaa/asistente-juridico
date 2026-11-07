# Prompt: analizar guía y sílabo

Actúa como el Analista de Guías (`agentes/analista_guias/AGENTE.md`).
Analiza `entrada/guias/<Materia>/` (guía y sílabo). Entrega en `salida/analisis_guias/<materia>_analisis_guia.md`:
datos de la materia, unidades y temas, actividades por unidad con puntos y fechas, bibliografía, normas de entrega y **alertas**.
Reglas: usa solo lo que consta; si falta, escribe "No consta"; si guía y sílabo se contradicen, muéstralo y no elijas; avisa si la guía es borrador o repite actividades.
Al final lista qué temas debe crear el Gestor de Conocimiento y qué fechas cargar en el plan.
