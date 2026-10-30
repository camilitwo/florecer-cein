export type Kind =
  | "actualidad"
  | "agenda"
  | "proyecto"
  | "organizacion"
  | "multimedia"
  | "documento";
export interface Entry {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  status: string;
  image: string;
  alt: string;
  kind: Kind;
  body: string;
  date?: string;
  time?: string;
  place?: string;
  progress?: number;
  modality?: "Presencial" | "En línea";
}
const make = (
  kind: Kind,
  slug: string,
  title: string,
  summary: string,
  category: string,
  n: number,
  extra: Partial<Entry> = {},
): Entry => ({
  id: `${kind}-${n}`,
  slug,
  title,
  summary,
  category,
  publishedAt: "2026-10-30",
  updatedAt: "2026-10-30",
  status: "Demostración",
  image: "/images/florecer.jpg",
  alt: "Ilustración de flores y una abeja de la identidad Florecer",
  kind,
  modality: kind === "agenda" ? "Presencial" : undefined,
  body: `${summary}\n\nEste contenido de muestra permite explorar cómo se presentaría la información a la comunidad. No corresponde a un anuncio ni a un acuerdo oficial del Instituto.\n\nLa propuesta contempla un espacio de encuentro, una instancia de conversación y una síntesis pública de los próximos pasos. Los horarios, responsables y documentos deberán reemplazarse por información autorizada antes de una publicación real.`,
  ...extra,
});
export const news = [
  make(
    "actualidad",
    "una-escuela-que-escucha",
    "Una escuela que escucha se construye entre todos",
    "Un espacio de conversación sobre los lugares que habitamos y los cambios que imaginamos.",
    "Comunicados",
    1,
  ),
  make(
    "actualidad",
    "patio-abierto",
    "El patio también es un escenario",
    "Música, lecturas y creación colectiva para volver a encontrarnos.",
    "Cultura",
    2,
  ),
  make(
    "actualidad",
    "talleres-desde-adentro",
    "Talleres que nacen desde adentro",
    "Una invitación a compartir lo que sabemos y aprender algo nuevo.",
    "Actividades",
    3,
  ),
  make(
    "actualidad",
    "deporte-en-comunidad",
    "Jugar en equipo, dentro y fuera de la cancha",
    "Una jornada deportiva pensada para participar a tu ritmo.",
    "Deporte",
    4,
  ),
  make(
    "actualidad",
    "derecho-a-preguntar",
    "El derecho a preguntar",
    "Una reflexión de muestra sobre conversación y representación estudiantil.",
    "Opinión",
    5,
  ),
  make(
    "actualidad",
    "archivo-abierto",
    "Un archivo que podamos leer",
    "Cómo ordenar actas y acuerdos para hacerlos más accesibles.",
    "Comunicados",
    6,
  ),
  make(
    "actualidad",
    "intercambio-libros",
    "Los libros siguen circulando",
    "Una propuesta de intercambio para descubrir otras lecturas.",
    "Cultura",
    7,
  ),
  make(
    "actualidad",
    "encuentro-talleres",
    "Aprender haciendo",
    "Encuentro de muestra para conocer talleres y organizaciones.",
    "Actividades",
    8,
  ),
];
export const events = [
  make(
    "agenda",
    "encuentro-de-voces",
    "Encuentro de voces",
    "Una conversación abierta para imaginar la vida en comunidad.",
    "Asamblea",
    1,
    {
      date: "2026-11-12",
      time: "13:30",
      place: "Patio central · ubicación de muestra",
      status: "Próximo",
    },
  ),
  make(
    "agenda",
    "patio-cultural",
    "Patio cultural",
    "Lecturas, música y un espacio para compartir procesos creativos.",
    "Cultura",
    2,
    {
      date: "2026-11-18",
      time: "15:00",
      place: "Patio · ubicación de muestra",
      status: "Próximo",
    },
  ),
  make(
    "agenda",
    "jornada-deportiva",
    "La cancha es de todos",
    "Encuentro deportivo recreativo y abierto a distintos niveles.",
    "Deporte",
    3,
    {
      date: "2026-12-03",
      time: "14:00",
      place: "Cancha · ubicación de muestra",
      status: "Próximo",
    },
  ),
];
export const projects = [
  make(
    "proyecto",
    "biblioteca-viva",
    "Biblioteca viva",
    "Un lugar para leer, intercambiar y recomendar libros.",
    "Comunidad",
    1,
    { status: "En ejecución", progress: 60 },
  ),
  make(
    "proyecto",
    "patios-para-encontrarnos",
    "Patios para encontrarnos",
    "Repensar espacios comunes a partir de las ideas de quienes los usan.",
    "Espacios",
    2,
    { status: "En evaluación", progress: 25 },
  ),
  make(
    "proyecto",
    "archivo-estudiantil",
    "Archivo estudiantil",
    "Ordenar la memoria de las actividades en un archivo accesible.",
    "Transparencia",
    3,
    { status: "Propuesto", progress: 0 },
  ),
];
export const organizations = [
  "Lectura compartida",
  "Taller de música",
  "Deporte abierto",
  "Medio ambiente",
].map((t, i) =>
  make(
    "organizacion",
    `organizacion-${i}`,
    t,
    "Un grupo de muestra para encontrarse, aprender y compartir intereses.",
    i === 2 ? "Deporte" : i === 3 ? "Comunidad" : "Cultura",
    i,
  ),
);
export const videos = [
  make(
    "multimedia",
    "voces-en-movimiento",
    "Voces en movimiento",
    "Una pieza editorial de muestra sobre las ideas que nos reúnen.",
    "Videos",
    1,
  ),
  make(
    "multimedia",
    "conversaciones-de-patio",
    "Conversaciones de patio",
    "Preguntas para conocer los espacios que compartimos.",
    "Entrevistas",
    2,
  ),
  make(
    "multimedia",
    "herbario-florecer",
    "Herbario Florecer",
    "Una galería de la ilustración de marca aportada al proyecto.",
    "Galerías",
    3,
  ),
];
export const documents = [
  "Acta de encuentro",
  "Resumen de proyecto",
  "Guía de participación",
].map((t, i) =>
  make(
    "documento",
    `documento-${i}`,
    t,
    "Archivo de ejemplo; no corresponde a un documento oficial.",
    i === 0 ? "Actas" : i === 1 ? "Proyectos" : "Guías",
    i,
  ),
);
export const team = [
  {
    role: "Representación",
    responsibility:
      "Escuchar inquietudes y coordinar espacios de conversación.",
  },
  {
    role: "Comunicaciones",
    responsibility: "Preparar información clara y accesible para la comunidad.",
  },
  {
    role: "Cultura y comunidad",
    responsibility: "Acompañar iniciativas y encuentros estudiantiles.",
  },
];
export const proposals = [
  {
    id: "p1",
    title: "Un espacio de intercambio de libros",
    summary: "Compartir lecturas sin costo en un punto de encuentro común.",
    status: "En evaluación",
  },
  {
    id: "p2",
    title: "Más encuentros entre talleres",
    summary:
      "Conocer lo que hacen otras organizaciones durante una jornada abierta.",
    status: "Propuesto",
  },
];
export const polls = [
  {
    id: "e1",
    title: "¿Qué encuentro te gustaría explorar?",
    questions: [
      {
        title: "Elige una actividad",
        multiple: false,
        options: [
          "Intercambio de libros",
          "Taller de música",
          "Encuentro deportivo",
        ],
      },
      {
        title: "¿Qué momentos te acomodan?",
        multiple: true,
        options: ["Recreo", "Después de clases", "Una jornada especial"],
      },
    ],
  },
];
export const notifications = [
  {
    id: "n1",
    title: "La agenda está abierta",
    summary: "Explora las próximas actividades de demostración.",
    href: "/agenda/",
  },
  {
    id: "n2",
    title: "Una idea puede empezar aquí",
    summary: "Conoce el espacio de propuestas locales.",
    href: "/participa/propuestas/",
  },
];
export const allEntries = [
  ...news,
  ...events,
  ...projects,
  ...organizations,
  ...videos,
  ...documents,
];
export const hrefFor = (e: Entry) =>
  e.kind === "proyecto"
    ? `/transparencia/proyectos/${e.slug}/`
    : e.kind === "organizacion"
      ? `/comunidad/organizaciones/${e.slug}/`
      : e.kind === "documento"
        ? "/documentos/"
        : `/${e.kind}/${e.slug}/`;
export const routes = [
  "",
  "actualidad",
  "agenda",
  "participa",
  "participa/propuestas",
  "participa/encuestas",
  "participa/votaciones",
  "participa/formularios",
  "comunidad",
  "comunidad/organizaciones",
  "comunidad/equipo",
  "transparencia",
  "multimedia",
  "documentos",
  "buscar",
  "contacto",
  "notificaciones",
  "admin-demo",
  ...news.map((e) => `actualidad/${e.slug}`),
  ...events.map((e) => `agenda/${e.slug}`),
  ...projects.map((e) => `transparencia/proyectos/${e.slug}`),
  ...videos.map((e) => `multimedia/${e.slug}`),
  ...organizations.map((e) => `comunidad/organizaciones/${e.slug}`),
];
export const formatDate = (s: string) =>
  new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Santiago",
  }).format(new Date(s + "T12:00:00-03:00"));
