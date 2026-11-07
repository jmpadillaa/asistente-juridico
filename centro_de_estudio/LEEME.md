# Centro de estudio

Página única que reúne el material de las cuatro materias: mapas y cuadros, temas, resúmenes de clase, tarjetas, hoja de repaso, simulacro, tareas con casillas y apuntes propios.

- **Página publicada:** https://claude.ai/artifact/5xCDYE1srzkErGGXyH1cqc (privada; se abre con tu cuenta en el PC y en el celular).
- **Copia local:** `dist/index.html` (se abre con doble clic; las marcas y notas quedan solo en ese navegador).

## Cada semana

1. Deja los archivos nuevos en `entrada/` y pide que se procesen como siempre (resúmenes, base de conocimiento, tarjetas).
2. Si hay tareas nuevas, agrégalas en `salida/planes_estudio/checklist_unidad1_microsoft_lists.csv` o desde la página (pestaña Tareas).
3. Regenera la página: `python centro_de_estudio/construir.py`
4. Pide que se vuelva a publicar. La dirección no cambia y las marcas y apuntes se conservan, porque viven aparte del contenido.

## Qué tocar para cambiar algo

| Quiero cambiar | Archivo |
|---|---|
| Horarios de evaluación, docentes, colores, qué archivos entran | `config.json` |
| Mapas, líneas de tiempo y cuadros comparativos | `mapas.json` |
| Diseño y funciones de la página | `plantilla.html` |
| Cómo se leen los archivos del proyecto | `construir.py` |

Las unidades 2 y 3 aparecen como "llegan más adelante" y se llenan solas cuando exista su carpeta de temas en `conocimiento/`.
