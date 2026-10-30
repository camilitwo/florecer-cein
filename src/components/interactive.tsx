"use client";
import { Fragment, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotionPreference as useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowRight, Check, Copy, Play, X } from "lucide-react";
import { useBrowserStorage } from "@/lib/browser-storage";
import * as Dialog from "@radix-ui/react-dialog";
import {
  allEntries,
  hrefFor,
  formatDate,
  news,
  proposals as seed,
  notifications,
  polls,
  type Entry,
} from "@/data/content";
export function Arrow() {
  return <ArrowUpRight size={20} aria-hidden="true" />;
}
function Highlight({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;
  const start = text
    .toLocaleLowerCase("es")
    .indexOf(needle.toLocaleLowerCase("es"));
  return start < 0 ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, start)}
      <mark>{text.slice(start, start + needle.length)}</mark>
      {text.slice(start + needle.length)}
    </>
  );
}
export function EntryList({
  items,
  search = false,
  calendar = false,
}: {
  items: Entry[];
  search?: boolean;
  calendar?: boolean;
}) {
  const reduced = useReducedMotion();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("Todas");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("Lista");
  const [month, setMonth] = useState("Todos");
  const [modality, setModality] = useState("Todas");
  const filtered = items.filter(
    (e) =>
      (category === "Todas" || e.category === category) &&
      (!q ||
        `${e.title} ${e.summary} ${e.category} ${e.status}`
          .toLocaleLowerCase("es")
          .includes(q.toLocaleLowerCase("es"))) &&
      (month === "Todos" || e.date?.slice(0, 7) === month) &&
      (modality === "Todas" || e.modality === modality),
  );
  const pages = Math.ceil(filtered.length / 6);
  return (
    <>
      <div className="filter-bar">
        <label className="search-field">
          <span>
            {search ? "Buscar en la plataforma" : "Buscar en esta sección"}
          </span>
          <input
            type="search"
            value={q}
            placeholder={
              search ? "Noticias, eventos, proyectos…" : "Escribe una palabra…"
            }
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </label>
        <label>
          <span>Categoría</span>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          >
            <option>Todas</option>
            {Array.from(new Set(items.map((e) => e.category))).map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        {calendar && (
          <>
            <label>
              <span>Mes</span>
              <select
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value);
                  setPage(1);
                }}
              >
                <option value="Todos">Todos</option>
                <option value="2026-11">Noviembre 2026</option>
                <option value="2026-12">Diciembre 2026</option>
              </select>
            </label>
            <label>
              <span>Modalidad</span>
              <select
                value={modality}
                onChange={(e) => {
                  setModality(e.target.value);
                  setPage(1);
                }}
              >
                <option>Todas</option>
                <option>Presencial</option>
                <option>En línea</option>
              </select>
            </label>
            <div
              className="view-toggle"
              role="group"
              aria-label="Vista de agenda"
            >
              {["Lista", "Calendario"].map((t) => (
                <button
                  key={t}
                  aria-pressed={view === t}
                  onClick={() => setView(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <p className="result-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"} ·
        contenido de demostración
      </p>
      {filtered.length === 0 ? (
        <div className="empty">
          <h2>No encontramos coincidencias.</h2>
          <p>Prueba otra palabra o vuelve a ver todas las categorías.</p>
          <button
            className="button"
            onClick={() => {
              setQ("");
              setCategory("Todas");
              setMonth("Todos");
              setModality("Todas");
            }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : view === "Calendario" ? (
        <div className="calendar-list">
          {["2026-11", "2026-12"]
            .filter((m) => month === "Todos" || month === m)
            .map((m) => (
              <section key={m}>
                <h2>{m === "2026-11" ? "Noviembre" : "Diciembre"} 2026</h2>
                <div className="calendar-grid">
                  {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
                    <span className="weekday" key={i}>
                      {d}
                    </span>
                  ))}
                  {Array.from({ length: m === "2026-11" ? 6 : 1 }, (_, i) => (
                    <span className="calendar-spacer" key={"s" + i} />
                  ))}
                  {Array.from({ length: m === "2026-11" ? 30 : 31 }, (_, i) => (
                    <div className="calendar-day" key={i}>
                      <span>{i + 1}</span>
                      {filtered
                        .filter(
                          (e) =>
                            e.date === `${m}-${String(i + 1).padStart(2, "0")}`,
                        )
                        .map((e) => (
                          <Link key={e.id} href={hrefFor(e)}>
                            {e.title}
                          </Link>
                        ))}
                    </div>
                  ))}
                </div>
              </section>
            ))}
        </div>
      ) : (
        <div className="editorial-list">
          {filtered.slice((page - 1) * 6, page * 6).map((e, index) => (
            <Fragment key={e.id}>
              {search &&
                (index === 0 ||
                  filtered[(page - 1) * 6 + index - 1].kind !== e.kind) && (
                  <h2 className="search-group">
                    {
                      {
                        actualidad: "Actualidad",
                        agenda: "Agenda",
                        proyecto: "Proyectos",
                        organizacion: "Organizaciones",
                        multimedia: "Multimedia",
                        documento: "Documentos",
                      }[e.kind]
                    }
                  </h2>
                )}
              <motion.article
                layout
                initial={false}
                animate={{ opacity: reduced ? 1 : [0.7, 1] }}
                transition={{ duration: reduced ? 0 : 0.22 }}
              >
                <div className="entry-meta">
                  <span>
                    {search
                      ? {
                          actualidad: "Actualidad",
                          agenda: "Agenda",
                          proyecto: "Proyecto",
                          organizacion: "Organización",
                          multimedia: "Multimedia",
                          documento: "Documento",
                        }[e.kind]
                      : e.category}
                  </span>
                  <span>
                    {e.date ? formatDate(e.date) : formatDate(e.publishedAt)}
                  </span>
                </div>
                <div>
                  <h2>
                    <Link href={hrefFor(e)}>
                      <Highlight text={e.title} query={q} />
                    </Link>
                  </h2>
                  <p>
                    <Highlight text={e.summary} query={q} />
                  </p>
                  {e.place && (
                    <small>
                      {e.time} h · {e.place}
                    </small>
                  )}
                  {e.progress !== undefined && (
                    <p className="project-status">
                      {e.status} · avance simulado {e.progress}%
                    </p>
                  )}
                </div>
                <Link
                  href={hrefFor(e)}
                  className="round-link"
                  aria-label={`Ver ${e.title}`}
                >
                  <Arrow />
                </Link>
              </motion.article>
            </Fragment>
          ))}
        </div>
      )}
      {view === "Lista" && pages > 1 && (
        <nav className="pagination" aria-label="Paginación">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Anterior
          </button>
          <span>
            Página {page} de {pages}
          </span>
          <button disabled={page === pages} onClick={() => setPage(page + 1)}>
            Siguiente
          </button>
        </nav>
      )}
    </>
  );
}
export function DemoForm({
  title = "Comparte tu idea",
  compact = false,
}: {
  title?: string;
  compact?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const [type, setType] = useState("Sugerencia");
  return (
    <section className="form-panel">
      <h2>{title}</h2>
      <p>
        Usa información ficticia. Esta demostración no envía ni guarda datos
        personales.
      </p>
      <div
        className="step-track"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={3}
        aria-valuenow={Math.min(step + 1, 3)}
        aria-label={`Paso ${Math.min(step + 1, 3)} de 3`}
      >
        <span style={{ transform: `scaleX(${(step + 1) / 3})` }} />
      </div>
      {step === 0 ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(1);
          }}
        >
          <label>
            Tipo de solicitud
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {[
                "Sugerencia",
                "Consulta general",
                "Inscripción a actividad",
                "Solicitud",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            {compact ? "¿Qué te gustaría recibir?" : "Tu mensaje de ejemplo"}
            <textarea
              required
              minLength={10}
              maxLength={1000}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribe al menos 10 caracteres, sin nombres ni datos personales."
            />
          </label>
          <label className="checkbox">
            <input required type="checkbox" /> Entiendo que es una demostración
            y no se enviarán datos.
          </label>
          <button className="button" type="submit">
            Revisar resumen <ArrowRight size={18} />
          </button>
        </form>
      ) : step === 1 ? (
        <div>
          <h3>Revisa antes de confirmar</h3>
          <p>
            <strong>{type}</strong>
          </p>
          <p className="summary-text">{text}</p>
          <div className="button-row">
            <button className="button secondary" onClick={() => setStep(0)}>
              Editar
            </button>
            <button
              className="button"
              onClick={() => {
                setText("");
                setStep(2);
              }}
            >
              Confirmar demo
            </button>
          </div>
        </div>
      ) : (
        <div role="status">
          <Check />
          <h3>Demostración completada.</h3>
          <p>No se enviaron ni almacenaron datos en un servidor.</p>
          <button className="text-link" onClick={() => setStep(0)}>
            Comenzar otra vez
          </button>
        </div>
      )}
    </section>
  );
}
export function Proposals() {
  const [items, setItems] = useState(seed);
  const [filter, setFilter] = useState("Todas");
  return (
    <>
      <label className="standalone-filter">
        Estado
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Todas</option>
          <option>Propuesto</option>
          <option>En evaluación</option>
        </select>
      </label>
      <div className="proposal-list">
        {items
          .filter((x) => filter === "Todas" || x.status === filter)
          .map((p) => (
            <article key={p.id}>
              <span className="demo-note">{p.status} · ejemplo</span>
              <h2>{p.title}</h2>
              <p>{p.summary}</p>
              <details>
                <summary>Leer propuesta</summary>
                <p>
                  Se propone conversar esta idea en un encuentro abierto y
                  preparar una síntesis de los próximos pasos. Estado simulado.
                </p>
              </details>
            </article>
          ))}
      </div>
      <section className="form-panel">
        <h2>Una idea puede empezar aquí.</h2>
        <p>
          Se agregará a esta página mientras permanezcas aquí. No incluyas datos
          personales.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            setItems([
              ...items,
              {
                id: crypto.randomUUID(),
                title: String(data.get("title")),
                summary: String(data.get("summary")),
                status: "Propuesto",
              },
            ]);
            e.currentTarget.reset();
            setFilter("Todas");
          }}
        >
          <label>
            Título de ejemplo
            <input name="title" required minLength={5} maxLength={100} />
          </label>
          <label>
            ¿Qué propones?
            <textarea name="summary" required minLength={10} maxLength={500} />
          </label>
          <button className="button">
            Agregar propuesta demo <Arrow />
          </button>
        </form>
      </section>
    </>
  );
}
export function Poll({ vote = false }: { vote?: boolean }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([[], []]);
  const [done, setDone] = useState(false);
  const poll = polls[0];
  return (
    <section className="form-panel">
      <p className="demo-banner">
        {vote
          ? "Esta es una demostración visual. Tu selección no constituye un voto oficial."
          : "Encuesta de demostración. No se guardan respuestas ni se muestran resultados reales."}
      </p>
      <h2>{vote ? "Explora una selección simulada" : poll.title}</h2>
      {done ? (
        <div role="status">
          <Check />
          <h3>Simulación completada</h3>
          <p>
            Elegiste: {answers.flat().join(", ")}. No se registró un voto ni se
            calcularon resultados colectivos.
          </p>
          <button
            className="button secondary"
            onClick={() => {
              setDone(false);
              setStep(0);
              setAnswers([[], []]);
            }}
          >
            Reiniciar
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 1 || vote) setDone(true);
            else setStep(step + 1);
          }}
        >
          <p>
            Paso {step + 1} de {vote ? 1 : 2}
          </p>
          <fieldset>
            <legend>{poll.questions[step].title}</legend>
            {poll.questions[step].options.map((o) => (
              <label className="choice" key={o}>
                <input
                  type={poll.questions[step].multiple ? "checkbox" : "radio"}
                  name="answer"
                  checked={answers[step].includes(o)}
                  onChange={(e) =>
                    setAnswers((prev) =>
                      prev.map((a, i) =>
                        i === step
                          ? poll.questions[step].multiple
                            ? e.target.checked
                              ? [...a, o]
                              : a.filter((v) => v !== o)
                            : [o]
                          : a,
                      ),
                    )
                  }
                />
                {o}
              </label>
            ))}
          </fieldset>
          <div className="button-row">
            {step > 0 && (
              <button
                type="button"
                className="button secondary"
                onClick={() => setStep(step - 1)}
              >
                Volver
              </button>
            )}
            <button className="button" disabled={!answers[step].length}>
              {step === 0 && !vote ? "Continuar" : "Terminar simulación"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
export function Share() {
  const [status, setStatus] = useState("");
  return (
    <div>
      <button
        className="button secondary"
        onClick={async () => {
          try {
            if (navigator.share)
              await navigator.share({
                title: document.title,
                url: location.href,
              });
            else {
              await navigator.clipboard.writeText(location.href);
              setStatus("Enlace copiado");
            }
          } catch {
            setStatus("Puedes copiar el enlace desde la barra de direcciones.");
          }
        }}
      >
        <Copy size={17} /> Compartir
      </button>
      <span role="status"> {status}</span>
    </div>
  );
}
export function CalendarDownload({ event }: { event: Entry }) {
  function download() {
    const day = event.date!.replaceAll("-", "");
    const time = event.time!.replace(":", "") + "00";
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Florecer//Demo//ES\r\nBEGIN:VEVENT\r\nUID:${event.id}@florecer.demo\r\nDTSTAMP:20261030T120000Z\r\nDTSTART;TZID=America/Santiago:${day}T${time}\r\nDURATION:PT1H\r\nSUMMARY:DEMO - ${event.title}\r\nDESCRIPTION:Evento ficticio de demostracion. No es una convocatoria oficial.\r\nLOCATION:${event.place}\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`;
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = event.slug + ".ics";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button className="button secondary" onClick={download}>
      Guardar en calendario (.ics)
    </button>
  );
}
export function Media({ gallery = false }: { gallery?: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="media-trigger">
        <Image
          src="/images/florecer.jpg"
          alt="Ilustración botánica de Florecer"
          width={548}
          height={743}
        />
        <span>
          {gallery ? "Abrir galería" : "Explorar pieza de muestra"}{" "}
          <Play size={20} />
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="media-dialog">
          <Dialog.Title>
            {gallery ? "Herbario Florecer" : "Voces en movimiento"}
          </Dialog.Title>
          <Dialog.Description>
            {gallery
              ? "Imagen de marca aportada para el proyecto."
              : "No hay un video autorizado disponible. Esta vista muestra el espacio reservado para su futura reproducción."}
          </Dialog.Description>
          <Dialog.Close
            className="icon-button menu-close"
            aria-label="Cerrar multimedia"
          >
            <X />
          </Dialog.Close>
          {gallery ? (
            <Gallery />
          ) : (
            <div className="video-placeholder">
              <Play size={44} />
              <p>Video pendiente de material autorizado</p>
              <details>
                <summary>Leer transcripción de ejemplo</summary>
                <p>
                  ¿Qué idea te gustaría compartir con tu comunidad? Este es un
                  guion de demostración, sin testimonios reales.
                </p>
              </details>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
function Gallery() {
  const [i, setI] = useState(0);
  const captions = [
    "Flores, hojas y abeja: la identidad completa.",
    "Detalle botánico de la ilustración de marca.",
  ];
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") setI(1 - i);
      }}
    >
      <div className={"gallery-image crop-" + i}>
        <Image
          src="/images/florecer.jpg"
          width={548}
          height={743}
          alt={captions[i]}
        />
      </div>
      <p aria-live="polite">
        {i + 1} / 2 · {captions[i]}
      </p>
      <div className="button-row">
        <button onClick={() => setI(1 - i)} className="button secondary">
          Anterior
        </button>
        <button onClick={() => setI(1 - i)} className="button">
          Siguiente
        </button>
      </div>
    </div>
  );
}
export function Notices() {
  const [stored, setStored] = useBrowserStorage("florecer-read", "[]");
  let read: string[] = [];
  try {
    const parsed: unknown = JSON.parse(stored);
    if (Array.isArray(parsed))
      read = parsed.filter((v): v is string => typeof v === "string");
  } catch {}
  return (
    <div className="notice-list">
      {notifications.map((n) => (
        <article key={n.id}>
          <span className="demo-note">
            {read.includes(n.id) ? "Leído" : "Sin leer"} · aviso simulado
          </span>
          <h2>
            <Link href={n.href}>{n.title}</Link>
          </h2>
          <p>{n.summary}</p>
          <button
            className="text-link"
            onClick={() => {
              const next = read.includes(n.id)
                ? read.filter((x) => x !== n.id)
                : [...read, n.id];
              setStored(JSON.stringify(next));
            }}
          >
            {read.includes(n.id) ? "Marcar sin leer" : "Marcar como leído"}
          </button>
        </article>
      ))}
    </div>
  );
}
export function Editor() {
  const [selected, setSelected] = useState(news[0].id);
  const [title, setTitle] = useState(news[0].title);
  const [summary, setSummary] = useState(news[0].summary);
  return (
    <>
      <p className="demo-banner">
        Vista de demostración — cambios no publicados. Sin login ni
        persistencia.
      </p>
      <div className="editor-grid">
        <form onSubmit={(e) => e.preventDefault()}>
          <label>
            Entrada
            <select
              value={selected}
              onChange={(e) => {
                const n = news.find((n) => n.id === e.target.value)!;
                setSelected(n.id);
                setTitle(n.title);
                setSummary(n.summary);
              }}
            >
              {news.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.title}
                </option>
              ))}
            </select>
          </label>
          <label>
            Título
            <input
              value={title}
              maxLength={150}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Resumen
            <textarea
              value={summary}
              maxLength={600}
              onChange={(e) => setSummary(e.target.value)}
            />
          </label>
        </form>
        <article className="editor-preview">
          <span className="demo-note">Previsualización en memoria</span>
          <h2>{title || "Sin título"}</h2>
          <p>{summary || "Agrega un resumen para verlo aquí."}</p>
        </article>
      </div>
    </>
  );
}
export function Quotes() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const quotes = [
    "Que cada idea encuentre un lugar para crecer.",
    "Escucharnos también es una forma de participar.",
    "La comunidad se construye en los encuentros.",
  ];
  return (
    <div className="quote-block">
      <span>Voces del Instituto · frases de demostración</span>
      <div aria-live="polite">
        <motion.blockquote
          key={i}
          initial={false}
          animate={{ opacity: reduced ? 1 : [0.5, 1], y: reduced ? 0 : [6, 0] }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          “{quotes[i]}”
        </motion.blockquote>
      </div>
      <div className="button-row">
        <button
          className="icon-button"
          aria-label="Frase anterior"
          onClick={() => setI((i + 2) % 3)}
        >
          ←
        </button>
        <span>{i + 1} / 3</span>
        <button
          className="icon-button"
          aria-label="Frase siguiente"
          onClick={() => setI((i + 1) % 3)}
        >
          →
        </button>
      </div>
    </div>
  );
}
export function GlobalSearch() {
  return <EntryList items={allEntries} search />;
}

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="form-panel">
      <h2>Avisos de la comunidad</h2>
      <p>
        Prueba una suscripción con una dirección ficticia. No se envían correos
        ni se guardan datos.
      </p>
      {done ? (
        <div role="status">
          <Check />
          <h3>Suscripción simulada.</h3>
          <p>No se enviaron ni almacenaron datos en un servidor.</p>
          <button className="text-link" onClick={() => setDone(false)}>
            Volver a explorar
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <label>
            Correo ficticio de ejemplo
            <input type="email" readOnly value="comunidad@example.test" />
          </label>
          <label>
            Frecuencia
            <select>
              <option>Resumen semanal</option>
              <option>Resumen mensual</option>
            </select>
          </label>
          <label className="checkbox">
            <input type="checkbox" required />
            Entiendo que esta suscripción es una demostración.
          </label>
          <button className="button">
            Probar suscripción <ArrowRight size={18} />
          </button>
        </form>
      )}
    </section>
  );
}
