# DESIGN.md — Instituto en Movimiento

**Proyecto:** Plataforma digital del Centro de Estudiantes del Instituto Nacional José Miguel Carrera  
**Versión:** 1.0 · 30 de octubre de 2026  
**Estado:** Especificación de diseño y frontend estático, lista para implementación  
**Concepto:** _Instituto en Movimiento_  
**Idioma:** Español de Chile (`es-CL`)

> Este documento define una experiencia visual completa y un frontend navegable, responsivo y estático. **No implementar backend, base de datos, autenticación real, almacenamiento de formularios ni votaciones vinculantes en esta etapa.** Todas las interacciones que impliquen persistencia deben identificarse explícitamente como demostraciones.

## 1. Visión y objetivos

Crear una plataforma que combine información, identidad, participación y comunidad. Debe sentirse como una publicación cultural digital contemporánea: editorial, juvenil, sofisticada y dinámica, sin parecer un portal administrativo ni una plantilla escolar.

**Objetivos de experiencia:**

- Acceder a noticias, eventos y acciones prioritarias en un máximo de dos interacciones desde Inicio.
- Identificar de inmediato qué está pasando, qué viene y cómo participar.
- Consumir información en tarjetas breves y profundizar mediante páginas de detalle.
- Permitir descubrir videos, documentos, proyectos, propuestas y actividades desde móvil.
- Transmitir identidad histórica con un lenguaje gráfico actual.
- Preparar la UI para integrar CMS, autenticación, formularios, encuestas y votaciones en fases futuras.

**Audiencias:** estudiantes, representantes del centro de estudiantes, comunidades y organizaciones escolares, apoderados y visitantes. Priorizar el uso móvil y conexiones variables.

**Principios:** claridad antes que espectáculo; movimiento con intención; pertenencia sin rigidez; transparencia verificable; accesibilidad por defecto; contenido real sobre decoración.

## 2. Dirección artística

### 2.1 Concepto visual

**Youth Editorial × Digital Motion × Heritage Remix.** Componer con titulares tipográficos de gran escala, grillas editoriales, fotografías auténticas, bandas horizontales, etiquetas tipo póster, recortes geométricos, detalles de trama y un uso controlado del color eléctrico. Alternar secciones claras y oscuras para establecer ritmo.

**No hacer:** interfaces con aspecto corporativo, exceso de glassmorphism, gradientes genéricos, neón permanente, emojis como iconografía principal, animaciones idénticas en todas las tarjetas, fotografías de stock que simulen ser estudiantes del instituto.

### 2.2 Identidad institucional

Conservar el escudo, nombre completo y referencias históricas cuando se disponga de material oficial autorizado. **No inventar ni redibujar el escudo como si fuese oficial.** Si no se cuenta con el archivo, usar un placeholder textual claramente marcado. La paleta propuesta es una interpretación creativa **no oficial**, sujeta a validación del centro de estudiantes.

### 2.3 Paleta cromática (tokens)

| Token             | HEX       | Uso                                  |
| ----------------- | --------- | ------------------------------------ |
| `--color-ink`     | `#102B38` | Texto principal, superficies oscuras |
| `--color-deep`    | `#071B26` | Hero oscuro, footer                  |
| `--color-paper`   | `#F6F4ED` | Fondo editorial principal            |
| `--color-white`   | `#FFFFFF` | Superficies y texto invertido        |
| `--color-lime`    | `#D7F34A` | CTA primario, acento activo          |
| `--color-coral`   | `#F07A68` | Acento secundario, etiquetas         |
| `--color-blue`    | `#397A99` | Enlaces secundarios, datos           |
| `--color-muted`   | `#6D7A7D` | Metadatos y texto secundario         |
| `--color-line`    | `#D8DDD8` | Bordes y separadores                 |
| `--color-error`   | `#B42318` | Estados de error                     |
| `--color-success` | `#216E4E` | Confirmaciones locales               |

**Distribución orientativa:** 65% papel/blanco, 25% azul oscuro, 10% acentos. Lima para acciones relevantes; coral para destacar contenido, no para competir con todos los botones. Verificar contraste WCAG para cada combinación; nunca usar lima sobre blanco para texto pequeño.

### 2.4 Tipografía

- **Display:** `Space Grotesk` (700) o alternativa local de geometría similar.
- **Texto/UI:** `Inter` (400–600).
- **Editorial opcional:** `DM Serif Display` en citas o hitos, máximo un uso por página.
- Cargar con `next/font` o archivos con licencia adecuada; evitar bloqueos por fuentes externas.
- Titular principal: `clamp(3.4rem, 9vw, 9rem)`, line-height 0.92–1.02, tracking negativo moderado.
- H1 interiores: `clamp(2.8rem, 6vw, 6rem)`.
- H2: `clamp(2rem, 4vw, 4rem)`.
- H3: `clamp(1.3rem, 2vw, 2rem)`.
- Texto base: `1rem–1.125rem`, line-height 1.5–1.7.
- Etiquetas: `0.75–0.875rem`, mayúsculas opcionales, tracking 0.06em.
- Evitar texto corrido completamente en mayúsculas.

### 2.5 Texturas y composición

- Grain SVG/CSS de opacidad 2–4% solo en superficies decorativas; no sobre párrafos.
- Trama de puntos, líneas finas y patrones diagonales en separadores y bloques destacados.
- Elementos tipo afiche, números gigantes de fondo, subrayados asimétricos y etiquetas rotadas ±3°.
- Recortes fotográficos con esquinas alternadas, máscaras geométricas y bordes finos.
- Usar espacio negativo generoso y evitar que la textura reduzca legibilidad.

## 3. Sistema de layout y responsive

- Mobile-first. Breakpoints sugeridos: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536` px.
- Contenedor principal: `max-width: 1440px`; padding horizontal `20px` móvil, `32px` tablet, `64px` desktop.
- Grilla: 4 columnas móvil, 8 tablet, 12 desktop; gutter `16/24/32px`.
- Espaciado base 4px; escala `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
- Radios: `8px` campos, `16px` tarjetas, `24px` paneles; botones tipo píldora opcionales.
- Touch targets mínimo 44×44px; navegación sticky sin ocupar demasiado alto.
- Cards de noticias: 1 columna móvil, 2 tablet, 3 desktop. Priorizar orden editorial antes que mosaicos arbitrarios.
- Mantener ancho de lectura de artículos entre 65–75 caracteres por línea.

## 4. Arquitectura de información y rutas

| Ruta                              | Página             | Propósito                                              |
| --------------------------------- | ------------------ | ------------------------------------------------------ |
| `/`                               | Inicio             | Panorama y accesos prioritarios                        |
| `/actualidad`                     | Actualidad         | Noticias y comunicados filtrables                      |
| `/actualidad/[slug]`              | Detalle de noticia | Lectura editorial y multimedia                         |
| `/agenda`                         | Agenda             | Eventos próximos y calendario                          |
| `/agenda/[slug]`                  | Evento             | Programa, lugar e inscripción demo                     |
| `/participa`                      | Participa          | Hub de propuestas, encuestas, votaciones y formularios |
| `/participa/propuestas`           | Propuestas         | Explorar y enviar propuestas demo                      |
| `/participa/encuestas`            | Encuestas          | Responder encuestas demo                               |
| `/participa/votaciones`           | Votaciones         | Explorar procesos y simulación no vinculante           |
| `/participa/formularios`          | Formularios        | Inscripciones, consultas y solicitudes demo            |
| `/comunidad`                      | Comunidad          | Identidad, organizaciones y vida estudiantil           |
| `/comunidad/organizaciones`       | Organizaciones     | Clubes y grupos                                        |
| `/comunidad/equipo`               | Representantes     | Equipo y responsabilidades                             |
| `/transparencia`                  | Transparencia      | Proyectos, compromisos y avances                       |
| `/transparencia/proyectos/[slug]` | Proyecto           | Hitos, estado y documentos                             |
| `/multimedia`                     | Multimedia         | Videos, entrevistas y galerías                         |
| `/multimedia/[slug]`              | Pieza multimedia   | Video o galería con contexto                           |
| `/documentos`                     | Documentos         | Actas y comunicados descargables demo                  |
| `/buscar`                         | Búsqueda           | Búsqueda local transversal                             |
| `/contacto`                       | Contacto           | Canales y formulario demo                              |
| `/notificaciones`                 | Notificaciones     | Centro de avisos simulados                             |
| `/admin-demo`                     | Editor visual demo | Vista editorial sin persistencia ni seguridad real     |
| `/404`                            | No encontrado      | Recuperación de navegación                             |

**Navegación primaria:** Inicio · Actualidad · Agenda · Participa · Comunidad · Transparencia · Multimedia. En escritorio, `Documentos` y `Contacto` pueden ir bajo “Más”. CTA visible: **Participa**. En móvil, menú de pantalla completa con grupos claros y cierre accesible. Incluir búsqueda global accesible.

## 5. Especificaciones de páginas

### 5.1 Inicio

1. **Announcement bar:** aviso urgente o evento destacado; cerrar solo durante sesión local.
2. **Hero editorial:** eyebrow “Centro de Estudiantes · Instituto Nacional”, titular animado “EL INSTITUTO / ESTÁ EN / MOVIMIENTO”, subtítulo breve, CTA “Descubre qué pasa” y secundario “Hazte escuchar”. Foto/video editorial auténtico o composición gráfica de reemplazo. Evitar video pesado autoplay en móvil.
3. **Ahora mismo:** tres accesos rápidos a noticia, actividad y participación.
4. **Últimas noticias:** grid con una noticia principal y tres secundarias.
5. **Próximos eventos:** timeline horizontal adaptable a lista móvil.
6. **Participa:** bloque contrastado con tres acciones: proponer, responder, inscribirse.
7. **Voces del Instituto:** carrusel accesible de testimonios o frases ficticias marcadas como demo.
8. **Video destacado:** thumbnail con botón reproducir; cargar reproductor bajo demanda.
9. **Proyectos en marcha:** estado y avance con enlaces a transparencia.
10. **Newsletter/avisos:** UI de suscripción demo, sin capturar datos reales.
11. **Footer:** navegación, identidad, redes verificadas y nota de carácter demostrativo cuando corresponda.

### 5.2 Actualidad y noticia

- Cabecera editorial, filtros por categorías (`Comunicados`, `Actividades`, `Cultura`, `Deporte`, `Opinión`) y búsqueda local.
- Featured story, grilla paginada localmente y chips de categoría.
- Detalle: título, bajada, fecha, autor/área, imagen, cuerpo, citas, galería o video y contenido relacionado.
- Botón compartir con Web Share API y fallback copiar enlace.
- No inventar noticias oficiales; usar contenido de muestra visiblemente etiquetado.

### 5.3 Agenda y evento

- Selector de vista lista/calendario; filtros por mes, categoría y modalidad.
- Evento con fecha prominente, horario, ubicación, descripción, organizador, programa y CTA inscripción demo.
- Estado: próximo, en curso, finalizado; fechas y horarios en zona `America/Santiago`.
- Posibilidad de descargar `.ics` generado localmente para eventos de muestra.

### 5.4 Participa

- Hero con CTA “Tu voz mueve al Instituto”.
- Cuatro módulos: propuestas, encuestas, votaciones y formularios.
- Propuestas: listado filtrable, ficha de propuesta, estado simulado y formulario de creación local.
- Encuestas: preguntas de opción única/múltiple, progreso, validación y pantalla de resultado **simulado**.
- Votaciones: fichas informativas, fechas y reglas; **no simular una votación oficial ni mostrar resultados ficticios como reales**. El botón conduce a una demostración explícita sin efectos jurídicos ni electorales.
- Formularios: consulta general, inscripción a actividad, sugerencia y solicitud. Validación local, resumen antes de confirmar, éxito “Demostración completada; no se enviaron datos”.
- Evitar solicitar RUT, contraseñas, información sensible o datos personales reales en el frontend estático.

### 5.5 Comunidad

- Introducción a la identidad y trayectoria del Instituto Nacional sin atribuir declaraciones no verificadas.
- Organizaciones y clubes por categorías, tarjetas con responsables de muestra y enlaces.
- Equipo del Centro de Estudiantes: cargos, responsabilidades, retratos solo con permiso y vías de contacto verificadas.
- Galería de vida estudiantil y testimonios autorizados.

### 5.6 Transparencia

- Panel de proyectos con estados (`Propuesto`, `En evaluación`, `En ejecución`, `Completado`, `Pausado`).
- Tarjetas con objetivos, hitos, fecha de actualización y responsables.
- Ficha de proyecto con línea de tiempo, hitos, documentos relacionados y próximos pasos.
- Indicadores solo cuando provengan de datos comprobables; los ejemplos deben estar rotulados “Datos de demostración”.
- Filtros por estado y año; documentos organizados por tipo.

### 5.7 Multimedia

- Hero con pieza destacada, tabs `Videos`, `Entrevistas`, `Galerías`.
- Video cards con thumbnail, duración, fecha, categoría y subtítulos cuando existan.
- Reproductores embebidos solo tras interacción, con `title` y aviso de plataforma externa.
- Galería en lightbox accesible con teclado, navegación y descripciones alternativas.
- No descargar ni reutilizar videos/fotos sin permisos.

### 5.8 Documentos, búsqueda, contacto y avisos

- **Documentos:** filtros por tipo y fecha, tamaño de archivo, fecha de publicación y enlace de descarga válido o placeholder demo.
- **Buscar:** indexar localmente títulos, extractos, categorías y etiquetas de todos los datasets; resultados agrupados por tipo, estado vacío y resaltado seguro de coincidencias.
- **Contacto:** canales verificados y formulario local con aviso de no envío.
- **Notificaciones:** lista simulada de avisos, leído/no leído guardado opcionalmente en `localStorage` solo para demo.
- **Admin demo:** catálogo de entradas y previsualización de edición en memoria; sin login ficticio que sugiera protección real. Mostrar banda “Vista de demostración — cambios no publicados”.

## 6. Sistema de componentes

**Navegación:** `SiteHeader`, `DesktopNav`, `MobileMenu`, `Breadcrumbs`, `SearchTrigger`, `SiteFooter`, `AnnouncementBar`.

**Contenido:** `EditorialHero`, `SectionHeading`, `NewsCard`, `FeaturedStory`, `EventCard`, `EventTimeline`, `VideoCard`, `GalleryGrid`, `DocumentRow`, `ProjectCard`, `StatusBadge`, `QuoteBlock`, `RelatedContent`, `FilterChips`, `EmptyState`, `Skeleton`.

**Participación:** `ParticipationCard`, `ProposalCard`, `PollQuestion`, `VoteInfoCard`, `FormStepper`, `Field`, `Checkbox`, `RadioGroup`, `Select`, `Textarea`, `FormSummary`, `DemoSuccessNotice`.

**Interacción:** `Button` (primary/secondary/ghost), `IconButton`, `Tabs`, `Accordion`, `Modal`, `Toast`, `Tooltip`, `Pagination`, `SearchInput`, `BackToTop`.

Para cada componente implementar estados `default`, `hover`, `focus-visible`, `active`, `disabled`, `loading`, `error` y `empty` cuando apliquen. Usar componentes semánticos, no `div` clicables.

## 7. Motion system

**Librerías sugeridas:** Motion for React para entradas, layouts y microinteracciones; GSAP + ScrollTrigger únicamente para escenas editoriales complejas. Evitar duplicar la animación del mismo elemento en ambas librerías.

| Efecto              | Activación        | Parámetros                                | Fallback reducido         |
| ------------------- | ----------------- | ----------------------------------------- | ------------------------- |
| Hero stagger        | carga inicial     | 80–120 ms entre líneas; 600–900 ms total  | aparición inmediata       |
| Reveal de sección   | entra al viewport | 350–550 ms; translateY 16–24px; una vez   | sin desplazamiento        |
| Hover card          | puntero           | scale 1.015 máximo; 180–240 ms            | sin escala                |
| Magnetic CTA        | mouse fino        | desplazamiento máximo 6px                 | estático                  |
| Marquee editorial   | visible           | 20–35 s/ciclo; contenido no esencial      | texto estático            |
| Parallax de foto    | scroll            | desplazamiento máximo 6–10%               | imagen fija               |
| Cambio de página    | navegación        | fade 150–250 ms; sin bloquear interacción | cambio instantáneo        |
| Progreso formulario | paso completado   | 200–300 ms                                | actualización instantánea |
| Menú móvil          | abrir/cerrar      | 220–320 ms; foco gestionado               | aparición inmediata       |
| Contadores          | viewport          | 500–800 ms, solo cifras verificadas       | valor final inmediato     |

**Curvas:** `ease-out` para entradas; `cubic-bezier(0.22,1,0.36,1)` para movimientos editoriales; `ease-in-out` para cambios de estado. No animar propiedades costosas (`top`, `left`, `width`) en loops; priorizar `transform` y `opacity`.

**Reglas obligatorias:**

- Respetar `prefers-reduced-motion: reduce` y ofrecer contenido visible sin animación.
- No crear scroll hijacking ni bloquear el scroll natural.
- No usar flashes, parpadeos ni movimientos intensos continuos.
- Animaciones decorativas no deben interceptar clics ni selección de texto.
- No ocultar información esencial hasta que JavaScript ejecute una animación.
- Animar como máximo 1–2 elementos protagonistas por sección; el resto con transiciones discretas.

## 8. Contenido y datos de demostración

Crear datasets TypeScript locales en `/src/data/`: `news.ts`, `events.ts`, `projects.ts`, `organizations.ts`, `videos.ts`, `documents.ts`, `polls.ts`, `proposals.ts`, `notifications.ts`, `team.ts`.

Cada entidad debe tener `id`, `slug` cuando corresponda, `title`, `summary`, `category`, `publishedAt/updatedAt`, `status` si aplica, `image`, `alt` y metadatos específicos. Los contenidos deben ser plausibles, pero **claramente marcados como ejemplos**; evitar atribuir a personas reales cargos, opiniones, fotografías o declaraciones sin verificación.

**Persistencia demo:** filtros y búsquedas en estado de cliente; opcional `localStorage` para favoritos, respuestas simuladas y avisos leídos, con botón “Restablecer demo”. No guardar PII. Formularios no transmiten información. Incluir datos suficientes para demostrar paginación, filtros, vacíos y estados.

**Imágenes:** preferir recursos aportados/autorizados del Instituto; si faltan, usar composiciones abstractas y placeholders explícitos. Todos los assets deben tener texto alternativo adecuado y dimensiones conocidas.

## 9. Arquitectura frontend

**Stack recomendado:** Next.js App Router + TypeScript strict + Tailwind CSS + shadcn/ui (adaptado al sistema visual) + Motion for React + GSAP para escenas puntuales + Lucide Icons. No integrar CMS ni servicios de backend por ahora.

```text
src/
  app/
    (site)/
      page.tsx
      actualidad/page.tsx
      actualidad/[slug]/page.tsx
      agenda/page.tsx
      agenda/[slug]/page.tsx
      participa/page.tsx
      participa/propuestas/page.tsx
      participa/encuestas/page.tsx
      participa/votaciones/page.tsx
      participa/formularios/page.tsx
      comunidad/page.tsx
      comunidad/organizaciones/page.tsx
      comunidad/equipo/page.tsx
      transparencia/page.tsx
      transparencia/proyectos/[slug]/page.tsx
      multimedia/page.tsx
      multimedia/[slug]/page.tsx
      documentos/page.tsx
      buscar/page.tsx
      contacto/page.tsx
      notificaciones/page.tsx
      admin-demo/page.tsx
    layout.tsx
    not-found.tsx
    globals.css
  components/
    layout/
    ui/
    editorial/
    participation/
    motion/
  data/
  lib/
  hooks/
  types/
public/
  images/
  textures/
  icons/
```

- Componentes de servidor por defecto; `use client` solo para interacciones reales.
- Contenido de demostración separado de la presentación; repositorios de datos locales intercambiables por API en el futuro.
- Enlaces internos con `next/link`, imágenes con `next/image`, metadatos por página.
- No introducir secretos, tokens ni variables privadas en el cliente.
- Preparar interfaces `ContentRepository`, `ParticipationRepository` y `NotificationRepository` sin implementar adaptadores remotos todavía.
- Para exportación estática futura, asegurar generación de rutas dinámicas con `generateStaticParams` y evitar funcionalidades dependientes de servidor.

## 10. Accesibilidad, privacidad y rendimiento

**Accesibilidad:** objetivo WCAG 2.2 AA; contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande y controles relevantes; navegación completa con teclado; foco visible; encabezados jerárquicos; labels reales; errores anunciados; modales con gestión de foco; subtítulos/transcripciones para videos cuando existan. Probar lectores de pantalla y movimiento reducido.

**Privacidad y menores de edad:** no publicar fotografías identificables, nombres, testimonios o datos de contacto personales sin autorización pertinente; no recopilar datos de estudiantes en una demo estática. En votaciones reales, una futura fase necesitará autenticación, elegibilidad, auditoría, antifraude y protección de datos; ninguna de esas garantías existe en esta versión.

**Rendimiento:** metas orientativas en móvil realista: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 (percentil 75); JavaScript inicial contenido; lazy-load para video, galerías y módulos pesados; no cargar GSAP en todas las rutas si no se usa; imágenes responsive AVIF/WebP; dimensiones reservadas; prefetch prudente; evitar videos autoplay como LCP.

**SEO:** títulos y descripciones únicos, Open Graph, canonical, sitemap, robots, schema.org apropiado (`Article`, `Event`, `Organization` solo con información verificada). No publicar contenido demo como noticias reales indexables.

## 11. Estados de UI y mensajes

- **Loading:** skeleton sobrio, sin loaders permanentes.
- **Empty:** explicar ausencia y sugerir próxima acción.
- **Error:** mensaje comprensible y acción de recuperación.
- **Success demo:** “Simulación completada. No se enviaron ni almacenaron datos en un servidor”.
- **Votación demo:** “Esta es una demostración visual. Tu selección no constituye un voto oficial”.
- **Documento demo:** “Archivo de ejemplo; no corresponde a un documento oficial”.
- **Contenido demo:** badge discreto pero visible “Contenido de demostración”.

## 12. Entregables de implementación

**Fase 1 — Fundaciones:** tokens, tipografía, layout, navegación, footer, componentes básicos, datos de muestra.

**Fase 2 — Experiencia editorial:** Inicio, Actualidad, detalle, Agenda, Comunidad, Multimedia.

**Fase 3 — Participación estática:** hub, propuestas, encuestas, votaciones informativas, formularios y confirmaciones demo.

**Fase 4 — Gestión y descubrimiento:** Transparencia, Documentos, búsqueda, notificaciones y admin-demo.

**Fase 5 — Pulido:** motion, responsive, accesibilidad, SEO, optimización y pruebas.

## 13. Criterios de aceptación

- Todas las rutas de la sección 4 existen y tienen contenido útil, navegación y estados vacíos.
- El sitio funciona desde 320px hasta pantallas anchas sin scroll horizontal accidental.
- Header, menú móvil, búsqueda, filtros, calendario, tabs, modales y formularios demo funcionan sin backend.
- Noticias, eventos, proyectos y videos enlazan a vistas de detalle coherentes.
- Formularios validan entradas localmente y nunca afirman haber enviado datos.
- Votaciones y encuestas indican claramente su carácter no oficial y simulado.
- Existe al menos una escena motion protagonista en Inicio y microinteracciones consistentes en el resto.
- El sitio respeta movimiento reducido, teclado y contraste.
- No hay enlaces rotos, imágenes sin `alt`, errores de consola ni contenido oficial inventado.
- Se documenta cómo reemplazar datos demo y cómo incorporar un backend sin rediseñar la UI.
- Se ejecutan pruebas de navegación, responsive y accesibilidad en páginas representativas.

## 14. Fuera de alcance actual y evolución

**Fuera de alcance:** login real, roles de administración efectivos, publicación en CMS, envío de correos, subida de archivos, votación válida, resultados reales, notificaciones push, analytics con identificación personal y cualquier procesamiento de datos de estudiantes.

**Evolución sugerida:** integrar CMS editorial y workflow de aprobación; APIs de participación; autenticación y roles; almacenamiento seguro de formularios; sistema electoral auditable separado; gestión de consentimiento de imagen; notificaciones y métricas agregadas. Mantener frontend desacoplado mediante repositorios y tipos definidos desde la fase estática.

## 15. Instrucciones para el agente implementador

Construir **el sitio completo**, no solo una landing. Priorizar fidelidad visual, navegación funcional y calidad editorial. Usar componentes reutilizables y datasets locales tipados. No improvisar colores, animaciones ni patrones fuera de este documento. No usar lorem ipsum: redactar ejemplos breves en español de Chile y etiquetarlos como demo. Evitar mockups no funcionales; los botones deben navegar, filtrar, abrir una interacción local o estar explícitamente deshabilitados con explicación. Implementar progresivamente y verificar cada ruta. El resultado debe sentirse como una plataforma estudiantil viva, pero sin presentar funcionalidades simuladas como operativas.

## Decisiones confirmadas para esta implementación

La identidad Florecer del HTML prevalece en color: verde #355328, salvia #5D7A4B, marfil #FAF8F2 y miel #E8B244; tinta #102B38. El logo no es un escudo institucional. Construcción directa en código. Todas las rutas se exportan estáticamente. Sin fotografía remota no autorizada ni afirmaciones oficiales. Composición editorial con listas, afiches tipográficos y jerarquías variadas, sin grillas repetitivas de tarjetas decorativas. Motion for React para controles y estados; GSAP + ScrollTrigger para la escena editorial de Inicio.

## Actualización del lema

El lema principal confirmado es «Sembrar voces, florecer cambios.», mostrado en dos líneas en el hero. Reemplaza el titular y la denominación «Instituto en movimiento» de la especificación original; no duplicarlo como subtítulo.

## Pulido editorial y motion solicitado

Hero como afiche botánico en capas: lema en dos líneas de gran escala, ilustración original sin recortar, papel marfil con fibras y moteado vectorial, contraafiche miel y sello «Crecer en comunidad». La próxima actividad demo integra el área inferior del titular. GSAP coordina las máscaras de texto y la entrada del afiche; ScrollTrigger desplaza sus capas hasta un 8% sin fijar ni secuestrar el scroll. Motion for React controla el CTA magnético y las transiciones de filtros; ningún elemento comparte propietario de animación. Banda editorial en loop con pausa, suspendida fuera del viewport y al ocultar la pestaña. Movimiento reducido: composición estática, sin parallax ni loop.
