#!/usr/bin/env python3
"""Genera centro_de_estudio/dist/index.html a partir de conocimiento/ y salida/.

Uso (desde la raíz del proyecto):
    python centro_de_estudio/construir.py

Lee config.json (materias, horarios de evaluación, archivos del plan), mapas.json
(diagramas hechos a mano) y todos los .md/.csv del proyecto. No modifica nada fuera
de centro_de_estudio/dist/.
"""
import csv
import hashlib
import io
import json
import re
import sys
from datetime import datetime
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent

ORDEN_DOCS = [
    ("conceptos", "Conceptos"),
    ("definiciones", "Definiciones"),
    ("ejemplos", "Ejemplos"),
    ("preguntas_frecuentes", "Preguntas"),
    ("bibliografia", "Bibliografía"),
    ("jurisprudencia", "Jurisprudencia"),
    ("_ficha", "Ficha"),
]


def leer(rel):
    p = RAIZ / rel
    if not p.exists():
        print("  aviso: no existe", rel)
        return ""
    return p.read_text(encoding="utf-8-sig")


def bonito(slug):
    slug = re.sub(r"^unidad_\d+_", "", slug)
    s = slug.replace("_", " ").strip()
    return s[:1].upper() + s[1:]


def titulo_md(md, defecto):
    for linea in md.splitlines():
        if linea.startswith("# "):
            return linea[2:].strip()
    return defecto


def campo_ficha(md, nombre):
    m = re.search(r"\*\*" + nombre + r":\*\*\s*(.+)", md)
    return m.group(1).strip() if m else None


def construir_conocimiento(rel):
    base = RAIZ / rel
    unidades = []
    normas = ""
    if not base.exists():
        return unidades, normas
    nv = base / "_normas_verificadas.md"
    if nv.exists():
        normas = nv.read_text(encoding="utf-8")
    for ud in sorted(p for p in base.iterdir() if p.is_dir() and p.name.startswith("unidad_")):
        num = int(re.match(r"unidad_(\d+)", ud.name).group(1))
        temas = []
        estructura = ""
        titulo_u = None
        for td in sorted(p for p in ud.iterdir() if p.is_dir()):
            docs = []
            ficha = ""
            for clave, etiqueta in ORDEN_DOCS:
                f = td / (clave + ".md")
                if f.exists():
                    md = f.read_text(encoding="utf-8")
                    docs.append({"k": clave, "n": etiqueta, "md": md})
                    if clave == "_ficha":
                        ficha = md
            if not docs:
                continue
            if ficha and not titulo_u:
                titulo_u = campo_ficha(ficha, "Unidad")
            titulo_t = (campo_ficha(ficha, "Tema") if ficha else None) or bonito(td.name)
            temas.append({"id": td.name, "titulo": titulo_t, "docs": docs})
        est = ud / "_estructura.md"
        if est.exists():
            estructura = est.read_text(encoding="utf-8")
        if not titulo_u:
            titulo_u = "Unidad %d · %s" % (num, bonito(ud.name))
        else:
            titulo_u = re.sub(r"^\s*(\d+)\s*[·\-:]\s*", r"Unidad \1 · ", titulo_u)
            if not titulo_u.lower().startswith("unidad"):
                titulo_u = "Unidad %d · %s" % (num, titulo_u)
        unidades.append({
            "id": ud.name, "num": num, "titulo": titulo_u,
            "pendiente": len(temas) == 0, "estructura": estructura, "temas": temas,
        })
    return unidades, normas


def construir_resumenes(rel):
    out = []
    base = RAIZ / rel
    if not base.exists():
        return out
    for f in sorted(base.glob("*.md")):
        md = f.read_text(encoding="utf-8")
        out.append({"id": f.stem, "titulo": titulo_md(md, bonito(f.stem)), "md": md})
    return out


def construir_tarjetas(rel):
    texto = leer(rel)
    out = []
    if not texto:
        return out
    for i, fila in enumerate(csv.reader(io.StringIO(texto), delimiter=";")):
        if len(fila) < 2:
            continue
        if i == 0 and fila[0].strip().lower() in ("pregunta", "anverso", "frente"):
            continue
        out.append({"q": fila[0].strip(), "a": fila[1].strip()})
    return out


def construir_tareas(rel, materias):
    texto = leer(rel)
    por_csv = {m["csv"]: m["id"] for m in materias}
    out = []
    if not texto:
        return out
    for fila in csv.DictReader(io.StringIO(texto)):
        tarea = (fila.get("Tarea") or "").strip()
        if not tarea:
            continue
        materia = (fila.get("Materia") or "").strip()
        mid = por_csv.get(materia, "general")
        tid = "t" + hashlib.md5((mid + "|" + tarea).encode("utf-8")).hexdigest()[:8]
        estado = (fila.get("Estado") or "").strip()
        out.append({
            "id": tid, "mat": mid, "t": tarea, "tipo": (fila.get("Tipo") or "").strip(),
            "fecha": (fila.get("Fecha") or "").strip(), "estado": estado,
            "hecho": estado.lower() == "hecho", "nota": (fila.get("Notas") or "").strip(),
        })
    return out


def main():
    cfg = json.loads((AQUI / "config.json").read_text(encoding="utf-8"))
    mapas = json.loads((AQUI / "mapas.json").read_text(encoding="utf-8"))
    materias = []
    for m in cfg["materias"]:
        print("Materia:", m["nombre"])
        unidades, normas = construir_conocimiento(m["conocimiento"])
        item = {k: m[k] for k in ("id", "nombre", "corto", "docente", "color", "colorOscuro", "evaluacion")}
        item.update({
            "unidades": unidades,
            "normas": normas,
            "resumenes": construir_resumenes(m["resumenes"]),
            "tarjetas": construir_tarjetas(m["flashcards"]),
            "simulacro": leer(m["simulacro"]),
            "repaso": leer(m["repaso"]),
            "guia": leer(m["guia"]),
            "mapas": mapas.get(m["mapas"], []),
        })
        print("  temas:", sum(len(u["temas"]) for u in unidades),
              "| clases:", len(item["resumenes"]), "| tarjetas:", len(item["tarjetas"]),
              "| mapas:", len(item["mapas"]))
        materias.append(item)
    plan = []
    for p in cfg["plan"]:
        md = leer(p["archivo"])
        if md:
            plan.append({"titulo": p["titulo"], "md": md})
    glosario = json.loads((AQUI / "glosario.json").read_text(encoding="utf-8"))
    explicaciones = json.loads((AQUI / "explicaciones.json").read_text(encoding="utf-8"))
    ids = {g["id"] for g in glosario}
    if len(ids) != len(glosario):
        print("  AVISO: hay ids repetidos en glosario.json")
    temas_reales = {m["id"] + ":" + t["id"] for m in materias for u in m["unidades"] for t in u["temas"]}
    for clave, ex in explicaciones.items():
        if clave not in temas_reales:
            print("  AVISO: explicación sin tema:", clave)
        for tid in ex.get("terminos", []):
            if tid not in ids:
                print("  AVISO: término no existe en el glosario:", tid, "(en", clave + ")")
    for m in materias:
        for u in m["unidades"]:
            for t in u["temas"]:
                if m["id"] + ":" + t["id"] not in explicaciones:
                    print("  falta explicación simple:", m["id"], t["id"])
    print("Glosario:", len(glosario), "términos | explicaciones:", len(explicaciones))
    datos = {
        "generado": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "zona": cfg["zona"],
        "glosario": glosario,
        "explicaciones": explicaciones,
        "materias": materias,
        "plan": plan,
        "tareas": construir_tareas(cfg["tareas_csv"], cfg["materias"]),
    }
    plantilla = (AQUI / "plantilla.html").read_text(encoding="utf-8")
    js = json.dumps(datos, ensure_ascii=False, separators=(",", ":"))
    js = js.replace("</", "<\\/").replace("\u2028", "\\u2028").replace("\u2029", "\\u2029")
    html = plantilla.replace("__DATOS__", js)
    dist = AQUI / "dist"
    dist.mkdir(exist_ok=True)
    (dist / "index.html").write_text(html, encoding="utf-8")
    print("Listo: dist/index.html (%.0f KB)" % (len(html.encode("utf-8")) / 1024))


if __name__ == "__main__":
    sys.exit(main())
