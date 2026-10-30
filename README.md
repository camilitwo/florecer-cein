# Florecer · Sembrar voces, florecer cambios.

Plataforma editorial estudiantil completamente frontend, construida con Next.js App Router, TypeScript, Tailwind CSS, Radix Dialog, GSAP + ScrollTrigger, Motion for React y Lucide. Exportación estática: no requiere servidor de aplicación, API, base de datos, cuentas ni variables privadas.

## Empezar

Usar Node.js 22 LTS y npm. La versión está fijada a `22.x` en package.json y a `22` en .nvmrc.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. Para probar exactamente los archivos de producción:

```sh
npm run build
npm start
```

`npm start` es un visor local de archivos, incluido en `scripts/serve.mjs`; no es un backend del producto. El resultado desplegable está en `out/`.

## Desplegar en Vercel

1. Subir este repositorio a tu propia cuenta Git y crear un proyecto en Vercel con ese repositorio.
2. Mantener el directorio raíz del proyecto y seleccionar Next.js. La configuración incluida fija `npm run build`. Dejar Output Directory sin override: el adaptador de Next.js utiliza `.next` y detecta automáticamente la exportación estática. No forzar `out` en Vercel.
3. Usar Node.js 22 LTS (`22.x`). No se necesitan variables de entorno ni servicios adicionales.
4. Desplegar y comprobar Inicio, una noticia, un evento y una ruta inexistente.

No se ha creado un remoto ni un despliegue público. La configuración usa `output: 'export'`, `trailingSlash` y `generateStaticParams`; no hay Server Actions, middleware, cookies de servidor ni optimización remota de imágenes.

## Contenido y arquitectura

- `src/data/content.ts`: datasets tipados de noticias, eventos, proyectos, organizaciones, documentos, multimedia, propuestas, encuestas, avisos y responsabilidades. Las rutas de detalle se generan a partir de estos datasets.
- `src/lib/repositories.ts`: interfaces `ContentRepository`, `ParticipationRepository` y `NotificationRepository`, con implementaciones locales preparadas para una integración futura.
- `src/components`: composición editorial, navegación, módulos interactivos y bibliotecas filtrables.
- `src/app/[[...path]]/page.tsx`: resolución estática de las páginas y sus metadatos. `not-found.tsx` ofrece recuperación 404.
- `public/images/florecer.jpg`: logo original aportado. No se presenta como escudo institucional.
- `public/documents`: archivos TXT descargables, marcados como ejemplos.
- `PRODUCT.md` y `DESIGN.md`: contexto del producto y diseño. Las decisiones confirmadas de Florecer al final de DESIGN.md prevalecen sobre la paleta original.

Las fechas se muestran en español de Chile, zona America/Santiago. Fuentes Inter y Space Grotesk alojadas localmente a través de Fontsource. Los paquetes conservan las licencias de sus fuentes.

## Funcionalidades demo

Búsqueda transversal con coincidencias resaltadas como texto seguro, agrupación por tipo y paginación; filtros editoriales; agenda en lista/calendario con mes, categoría y modalidad; archivos `.ics`; compartir/copiar enlaces; galería accesible; propuestas temporales; encuesta de varias etapas; simulación de selección no electoral; formularios con validación nativa, resumen y confirmación; suscripción ficticia; editor con previsualización en memoria.

Propuestas, respuestas y ediciones desaparecen al salir de su página. El cierre del aviso se guarda solo en la sesión. Los únicos datos persistentes son los identificadores de avisos leídos bajo `florecer-read`. El footer permite restablecer la demo. No se transmiten formularios ni se solicitan nombres, RUT, credenciales o correos reales. La suscripción usa una dirección ficticia de solo lectura.

## Reemplazar los ejemplos

Editar los datasets y sus metadatos, reemplazar textos demo por contenido verificado y agregar archivos autorizados en `public/`. Mantener `id` y `slug` únicos, actualizar textos alternativos y reconstruir el sitio para publicar cambios. No usar personas, fotos ni canales de contacto sin autorización.

No se aportaron fotografías institucionales, videos, testimonios o canales oficiales verificados: se utilizan afiches tipográficos y la ilustración Florecer. El módulo de video explica que falta material autorizado y no simula un streaming real.

Antes de una publicación oficial, establecer el dominio real para canonical, Open Graph y sitemap, verificar información y permisos, y retirar `noindex` y el bloqueo de `public/robots.txt` cuando corresponda. No se inventó un dominio para esta demo.

## Futuras integraciones

Implementar adaptadores remotos detrás de las interfaces de repositorio. Para conservar hosting estático, consumir APIs externas desde las islas cliente o traer contenido durante la construcción y reconstruir mediante CI. Formularios y administración real requieren servicios separados con validación, autorización y tratamiento de datos apropiados; las votaciones reales necesitan su propio sistema verificable. Mantener los avisos demo hasta que esos servicios existan.

## Diseño y accesibilidad

Identidad verde, marfil y miel; jerarquías editoriales, listas y afiches en lugar de tarjetas decorativas repetidas. Layout adaptable desde 320 px. Menú y multimedia con gestión de foco, Escape y retorno al disparador. Foco visible, etiquetas de formulario, avisos de estado y navegación semántica. Hero de afiches botánicos superpuestos, texturas de papel locales, entrada tipográfica coordinada con GSAP y profundidad de scroll con ScrollTrigger. Motion for React controla CTA magnético, filtros y cambio de frases. Banda editorial con pausa, suspendida fuera del viewport y al ocultar la pestaña; `prefers-reduced-motion` elimina movimiento espacial y conserva contenido visible. Sin scroll secuestrado ni autoplay.

## Validación

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Las pruebas usan los archivos ya construidos y levantan el visor local automáticamente si no está abierto. Cubren rutas y enlaces, ausencia de errores de página, anchos 320/390/768/1024/1440 px, orientación horizontal, reflujo equivalente a zoom de navegador al 200%, búsqueda, vacíos, paginación, formularios sin peticiones de escritura, propuestas en memoria, encuestas, descarga de calendario, galería, menú, persistencia y restablecimiento, 404, movimiento reducido y lectura sin JavaScript. Axe revisa páginas representativas en móvil y escritorio.

La revisión automática no equivale a una certificación WCAG ni reemplaza pruebas con lectores de pantalla y dispositivos físicos. `VERIFICATION.md` resume la evidencia de esta entrega.

## Motion editorial

GSAP y ScrollTrigger se importan dinámicamente al montar Inicio. `gsap.matchMedia()` revierte escenas al cambiar movimiento reducido o abandonar la página. La ilustración se desplaza como máximo un 8% de su altura; no hay pin, scroll hijacking ni animación de layout. GSAP y Motion tienen elementos distintos para evitar conflictos de propiedades. La textura es un SVG local con fibras y moteado deterministas; no usa filtros de ruido costosos. La banda repetida es decorativa, tiene pausa accesible y solo corre cuando está visible.

Referencias técnicas: [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/) y [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
