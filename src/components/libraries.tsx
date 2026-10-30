"use client";
import { useState } from "react";
import { documents, projects, formatDate } from "@/data/content";
import { EntryList } from "./interactive";
export function ProjectFilters() {
  const [status, setStatus] = useState("Todos");
  const [year, setYear] = useState("2026");
  return (
    <>
      <div className="button-row">
        <label>
          Estado
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {[
              "Todos",
              "Propuesto",
              "En evaluación",
              "En ejecución",
              "Completado",
              "Pausado",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Año
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2026</option>
            <option>2025</option>
          </select>
        </label>
      </div>
      <EntryList
        items={projects.filter(
          (p) =>
            (status === "Todos" || status === p.status) &&
            p.updatedAt.startsWith(year),
        )}
      />
    </>
  );
}
export function DocumentLibrary() {
  const [type, setType] = useState("Todos");
  const [year, setYear] = useState("2026");
  const items = documents.filter(
    (d) =>
      (type === "Todos" || d.category === type) &&
      d.publishedAt.startsWith(year),
  );
  return (
    <>
      <div className="button-row">
        <label>
          Tipo
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {["Todos", "Actas", "Proyectos", "Guías"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Año
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option>2026</option>
            <option>2025</option>
          </select>
        </label>
      </div>
      <div className="document-list">
        {items.map((d) => (
          <article key={d.id}>
            <div>
              <span className="demo-note">
                {d.category} · {formatDate(d.publishedAt)} · TXT · menos de 1 KB
              </span>
              <h2>{d.title}</h2>
              <p>{d.summary}</p>
            </div>
            <a
              className="button secondary"
              href={"/documents/" + d.slug + ".txt"}
              download
            >
              Descargar ejemplo ↓
            </a>
          </article>
        ))}
        {!items.length && (
          <p className="empty">
            No hay documentos para estos filtros. Prueba otro año o tipo.
          </p>
        )}
      </div>
    </>
  );
}
