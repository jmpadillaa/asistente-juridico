# Documentación del proyecto

- `guia_de_entregables.md`: cómo se hacen los entregables (método, formatos, herramientas, lecciones) y qué viene en las unidades 2 y 3.
- `estado_del_sistema_2026-10-31.md`: qué tiene cada materia y qué alertas hay abiertas.
- `plantillas_entregables/`: scripts que generaron los PDF de la unidad 1 (informe jurídico, mapa conceptual, demanda, infografía) y el lector OCR.
- `../prompts/`: indicaciones reutilizables para cada agente.
- `../agentes/`: definición de cada agente.
- `../salida/planes_estudio/plan_refuerzo_31oct_8nov_2026.md`: plan de la semana de refuerzo.

Para usar una plantilla: copiar el script a una carpeta de trabajo, cambiar el contenido (están escritos como plantillas de texto dentro del propio script), ejecutar con `NODE_PATH="$(npm root -g)" node make_xxx.js <carpeta_salida>` y luego `node pdf_xxx.js <carpeta_salida>`. Necesitan Node, `playwright` con Chromium y `poppler` (`pdfunite`, `pdftoppm`).
