import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Flower2 } from "lucide-react";
import {
  news,
  events,
  projects,
  organizations,
  videos,
  documents,
  team,
  allEntries,
  hrefFor,
  formatDate,
  type Entry,
} from "@/data/content";
import {
  Newsletter,
  EntryList,
  DemoForm,
  Proposals,
  Poll,
  Share,
  CalendarDownload,
  Media,
  Notices,
  Editor,
  Quotes,
  GlobalSearch,
} from "./interactive";
import { HomeExperience, HomeHero, EditorialMarquee } from "./home-experience";
const Arrow = () => <ArrowUpRight size={21} aria-hidden="true" />;
export const titles: Record<string, string> = {
  actualidad: "Lo que nos mueve.",
  agenda: "Hagamos espacio para encontrarnos.",
  participa: "Tu voz mueve al Instituto.",
  "participa/propuestas": "Las ideas empiezan contigo.",
  "participa/encuestas": "Queremos escucharte.",
  "participa/votaciones": "Participar también es informarse.",
  "participa/formularios": "Un espacio para tu mensaje.",
  comunidad: "Una comunidad, muchas maneras de ser.",
  "comunidad/organizaciones": "Encuentra tu espacio.",
  "comunidad/equipo": "Representar es acompañar.",
  transparencia: "Los procesos, a la vista.",
  multimedia: "Otras formas de mirar.",
  documentos: "Una memoria compartida.",
  buscar: "¿Qué estás buscando?",
  contacto: "Conversemos.",
  notificaciones: "Lo que viene, a mano.",
  "admin-demo": "Detrás de la publicación.",
};
function SectionHeading({
  title,
  href,
  label = "Ver todo",
}: {
  title: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {href && (
        <Link className="text-link" href={href}>
          {label}
          <Arrow />
        </Link>
      )}
    </div>
  );
}
function Poster({ entry, index = 0 }: { entry: Entry; index?: number }) {
  return (
    <Link
      href={hrefFor(entry)}
      className={`poster poster-${index % 3}`}
      aria-label={entry.title}
    >
      <span>{entry.category} · Demo</span>
      <strong>{entry.title}</strong>
      <div>
        <Flower2 size={index === 0 ? 100 : 70} strokeWidth={0.8} />
        <Arrow />
      </div>
    </Link>
  );
}
export function Home() {
  return (
    <HomeExperience>
      <HomeHero />
      <EditorialMarquee />
      <section className="wrap section" id="ahora">
        <SectionHeading title="Ahora mismo" />
        <div className="quick-links">
          {[
            ["Infórmate", "Lo que está pasando", "/actualidad/"],
            ["Encuéntrate", "La próxima actividad", "/agenda/"],
            ["Exprésate", "Una idea por compartir", "/participa/"],
          ].map(([a, b, c]) => (
            <Link key={c} href={c}>
              <span>{a}</span>
              <strong>{b}</strong>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap section news-section">
        <SectionHeading
          title="La comunidad se cuenta."
          href="/actualidad/"
          label="Toda la actualidad"
        />
        <div className="news-layout">
          <article className="lead-story">
            <Poster entry={news[0]} />
            <p className="entry-meta">
              Comunicados · {formatDate(news[0].publishedAt)} · Demo
            </p>
            <h3>
              <Link href={hrefFor(news[0])}>{news[0].title}</Link>
            </h3>
            <p>{news[0].summary}</p>
          </article>
          <div className="news-briefs">
            {news.slice(1, 4).map((n, i) => (
              <article key={n.id}>
                <div>
                  <span className="demo-note">{n.category} · Demo</span>
                  <h3>
                    <Link href={hrefFor(n)}>{n.title}</Link>
                  </h3>
                  <p>{n.summary}</p>
                </div>
                <Link
                  className={"brief-art brief-" + i}
                  href={hrefFor(n)}
                  aria-label={n.title}
                >
                  <span>{["Cul-\ntura", "Ta-\nlleres", "En\nequipo"][i]}</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="agenda-section">
        <div className="wrap section">
          <SectionHeading
            title="Nos vemos aquí."
            href="/agenda/"
            label="Explora la agenda"
          />
          <div className="event-rows">
            {events.map((e) => (
              <Link href={hrefFor(e)} key={e.id}>
                <div className="event-date">
                  <strong>{e.date!.slice(-2)}</strong>
                  <span>{e.date!.slice(5, 7) === "11" ? "NOV" : "DIC"}</span>
                </div>
                <div>
                  <span className="demo-note">
                    {e.category} · Evento de muestra
                  </span>
                  <h3>{e.title}</h3>
                  <p>
                    {e.time} h · {e.place}
                  </p>
                </div>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="participation-section">
        <div className="wrap participation-layout">
          <div>
            <Flower2 size={48} strokeWidth={1} />
            <h2>
              Una idea tuya.
              <br />
              <em>Un cambio de todos.</em>
            </h2>
            <span className="participation-rule" aria-hidden="true" />
            <p>
              Lo que imaginas merece una conversación.
              <br />
              Este es un lugar para empezar.
            </p>
            <Link href="/participa/" className="button light">
              Encuentra cómo participar <Arrow />
            </Link>
          </div>
          <div className="participation-links">
            {[
              [
                "Quiero proponer",
                "Comparte una idea con la comunidad.",
                "propuestas",
              ],
              [
                "Quiero responder",
                "Explora las encuestas de muestra.",
                "encuestas",
              ],
              [
                "Quiero sumarme",
                "Conoce los formularios de participación.",
                "formularios",
              ],
            ].map(([a, b, c]) => (
              <Link key={c} href={"/participa/" + c + "/"}>
                <h3>
                  {a}
                  <Arrow />
                </h3>
                <p>{b}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Quotes />
      </section>
      <section className="wrap section multimedia-home">
        <div>
          <h2>
            Las historias también
            <br />
            se ven y se escuchan.
          </h2>
          <p>
            Voces en movimiento: un espacio para futuras entrevistas, registros
            y relatos de la comunidad.
          </p>
          <p className="demo-note">
            Pieza de demostración · video pendiente de material autorizado
          </p>
          <Link href="/multimedia/" className="text-link">
            Explora multimedia <Arrow />
          </Link>
        </div>
        <Media />
      </section>
      <section className="wrap section">
        <SectionHeading
          title="Del papel a los próximos pasos."
          href="/transparencia/"
          label="Ver los proyectos"
        />
        <div className="project-home">
          {projects.map((p) => (
            <Link key={p.id} href={hrefFor(p)}>
              <span className="demo-note">{p.status} · Datos demo</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <div className="progress-track">
                <span style={{ transform: `scaleX(${p.progress! / 100})` }} />
              </div>
              <span className="project-progress">
                {p.progress}% de avance simulado <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="newsletter wrap section">
        <div>
          <h2>
            Que no se pierda
            <br />
            la conversación.
          </h2>
          <p>
            Explora cómo sería un boletín de encuentros, ideas y próximos pasos.
          </p>
        </div>
        <Newsletter />
      </section>
    </HomeExperience>
  );
}
const intros: Record<string, string> = {
  actualidad:
    "Noticias, conversaciones y pequeños acontecimientos que hacen comunidad. Todos los contenidos son ejemplos.",
  agenda:
    "Un calendario de muestra para conocer encuentros, actividades y espacios de participación.",
  participa:
    "Propón, conversa y explora distintas formas de participar. Todas las interacciones son locales y demostrativas.",
  comunidad:
    "Lo que compartimos crece cuando hay espacio para distintas voces e intereses.",
  transparencia:
    "Explora objetivos, hitos y avances de proyectos de muestra. Los datos no representan una gestión real.",
  multimedia:
    "Un archivo en construcción para imágenes, relatos y conversaciones. Sin material audiovisual oficial disponible.",
  documentos:
    "Archivos de ejemplo para explorar una biblioteca pública y accesible.",
  contacto:
    "No hay canales oficiales verificados cargados. Puedes explorar el formulario local sin enviar información.",
};
export function PageHeading({ path }: { path: string }) {
  const parts = path.split("/");
  return (
    <div className="page-heading wrap">
      <nav className="breadcrumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        {parts.length > 1 && (
          <>
            <span>/</span>
            <Link href={"/" + parts[0] + "/"}>{parts[0]}</Link>
          </>
        )}
        <span>/</span>
        <span>{parts.at(-1)?.replaceAll("-", " ")}</span>
      </nav>
      <h1>{titles[path]}</h1>
      <p>
        {intros[path] ||
          "Una experiencia de demostración para explorar la plataforma. Sin envío de datos ni efectos oficiales."}
      </p>
      <span className="demo-label">Contenido de demostración</span>
    </div>
  );
}
export function StandardPage({ path }: { path: string }) {
  let content;
  switch (path) {
    case "actualidad":
      content = <EntryList items={news} />;
      break;
    case "agenda":
      content = <EntryList items={events} calendar />;
      break;
    case "participa":
      content = (
        <div className="participate-index">
          {[
            ["Propuestas", "Una idea, un primer paso.", "propuestas"],
            ["Encuestas", "Ayúdanos a imaginar posibilidades.", "encuestas"],
            [
              "Votaciones",
              "Infórmate y explora una simulación no vinculante.",
              "votaciones",
            ],
            [
              "Formularios",
              "Consultas, inscripciones y sugerencias de ejemplo.",
              "formularios",
            ],
          ].map(([a, b, c]) => (
            <Link key={c} href={"/participa/" + c + "/"}>
              <h2>{a}</h2>
              <p>{b}</p>
              <Arrow />
            </Link>
          ))}
        </div>
      );
      break;
    case "participa/propuestas":
      content = <Proposals />;
      break;
    case "participa/encuestas":
      content = <Poll />;
      break;
    case "participa/votaciones":
      content = (
        <>
          <div className="reading">
            <h2>Antes de elegir</h2>
            <p>
              Una votación real necesita reglas públicas, elegibilidad
              verificada y un sistema auditable. Esta plataforma no incluye esas
              garantías.
            </p>
            <p>
              Proceso de muestra · abierto del 1 al 30 de noviembre de 2026. Las
              fechas no corresponden a un proceso electoral real. Una selección
              por recorrido, sin registro ni resultados.
            </p>
          </div>
          <Poll vote />
        </>
      );
      break;
    case "participa/formularios":
      content = <DemoForm title="¿En qué quieres participar?" />;
      break;
    case "comunidad":
      content = (
        <>
          <div className="community-feature">
            <Image
              src="/images/florecer.jpg"
              alt="Identidad botánica de Florecer"
              width={548}
              height={743}
            />
            <div>
              <h2>
                Distintas raíces.
                <br />
                Un espacio compartido.
              </h2>
              <p>
                Esta plataforma propone un lugar para conocer organizaciones,
                compartir intereses y acercarse a las responsabilidades de
                representación.
              </p>
              <Link href="/comunidad/organizaciones/" className="button">
                Conoce las organizaciones <Arrow />
              </Link>
              <Link href="/comunidad/equipo/" className="text-link">
                Equipo y responsabilidades <Arrow />
              </Link>
            </div>
          </div>
          <Quotes />
        </>
      );
      break;
    case "comunidad/organizaciones":
      content = <EntryList items={organizations} />;
      break;
    case "comunidad/equipo":
      content = (
        <div className="team-list">
          {team.map((t) => (
            <article key={t.role}>
              <span className="demo-note">
                Cargo de muestra · sin persona asignada
              </span>
              <h2>{t.role}</h2>
              <p>{t.responsibility}</p>
            </article>
          ))}
        </div>
      );
      break;
    case "transparencia":
      content = (
        <>
          <ProjectFilters />
        </>
      );
      break;
    case "multimedia":
      content = <EntryList items={videos} />;
      break;
    case "documentos":
      content = (
        <>
          <DocumentLibrary />
        </>
      );
      break;
    case "buscar":
      content = <GlobalSearch />;
      break;
    case "contacto":
      content = <DemoForm title="Tu mensaje de ejemplo" />;
      break;
    case "notificaciones":
      content = <Notices />;
      break;
    case "admin-demo":
      content = <Editor />;
      break;
    default:
      content = <p>Página no encontrada.</p>;
  }
  return (
    <>
      <PageHeading path={path} />
      <section className="wrap page-content">{content}</section>
    </>
  );
}
import { ProjectFilters, DocumentLibrary } from "./libraries";
export function Detail({ entry: e }: { entry: Entry }) {
  return (
    <>
      <div className="wrap page-heading detail-heading">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link>
          <span>/</span>
          <Link
            href={
              e.kind === "proyecto"
                ? "/transparencia/"
                : e.kind === "organizacion"
                  ? "/comunidad/organizaciones/"
                  : `/${e.kind}/`
            }
          >
            {e.kind === "proyecto" ? "Transparencia" : e.kind}
          </Link>
        </nav>
        <span className="demo-label">
          {e.category} · Contenido de demostración
        </span>
        <h1>{e.title}</h1>
        <p>{e.summary}</p>
        <p className="detail-meta">
          {formatDate(e.publishedAt)} · Equipo editorial de muestra
        </p>
      </div>
      <section className="wrap detail-content">
        {e.kind === "multimedia" ? (
          <Media gallery={e.category === "Galerías"} />
        ) : (
          <div className="detail-poster">
            <Poster entry={e} index={e.kind === "agenda" ? 1 : 0} />
          </div>
        )}
        <div className="reading">
          {e.date && (
            <div className="event-info">
              <h2>{formatDate(e.date)}</h2>
              <p>
                {e.time} h · America/Santiago
                <br />
                {e.place}
              </p>
              <CalendarDownload event={e} />
            </div>
          )}
          {e.body.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {e.kind === "agenda" && (
            <>
              <h2>Programa de muestra</h2>
              <ol>
                <li>Bienvenida y presentación · {e.time} h</li>
                <li>Conversación y actividades compartidas</li>
                <li>Síntesis y próximos pasos</li>
              </ol>
              <p>
                Organiza: equipo de muestra, sin responsables oficiales
                asignados.
              </p>
              <DemoForm title="Explora una inscripción demo" />
            </>
          )}
          {e.kind === "proyecto" && (
            <>
              <h2>Un proceso a la vista</h2>
              <p>
                {e.status} · {e.progress}% de avance simulado.
                <br />
                Actualización: {formatDate(e.updatedAt)}.
              </p>
              <ol className="milestones">
                <li>Escuchar ideas · hito de muestra</li>
                <li>Preparar una propuesta · hito de muestra</li>
                <li>Compartir los próximos pasos · pendiente</li>
              </ol>
              <p>Responsable: equipo de proyecto de muestra.</p>
              <Link className="text-link" href="/documentos/">
                Documentos relacionados <Arrow />
              </Link>
            </>
          )}
          <Share />
        </div>
        <section className="related">
          <SectionHeading title="Sigue explorando." />
          {allEntries
            .filter((x) => x.kind === e.kind && x.id !== e.id)
            .slice(0, 2)
            .map((x) => (
              <Link key={x.id} href={hrefFor(x)}>
                {x.title}
                <Arrow />
              </Link>
            ))}
        </section>
      </section>
    </>
  );
}
