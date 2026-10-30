# Verificación · Florecer

Fecha: 30 de octubre de 2026.

- Exportación de producción: completada. 39 rutas de contenido más la página 404; todas resueltas desde archivos estáticos.
- TypeScript y ESLint: sin errores.
- Pruebas de navegador: recorridos de navegación, enlaces, formularios, encuestas, propuestas, multimedia, calendario, búsqueda, avisos y menú.
- Responsive: sin desbordamientos en páginas representativas a 320, 390, 768, 1024 y 1440 px; paisaje y reflujo equivalente a zoom de navegador al 200%.
- Axe: sin infracciones detectadas en las páginas representativas revisadas a 390 y 1440 px, con reglas WCAG A/AA hasta 2.2 disponibles en el motor.
- Movimiento reducido: titular visible y sin recorte animado.
- Impeccable: detector sin hallazgos; revisión visual conjunta de escritorio y móvil, con una ronda de correcciones y confirmación.
- Dependencias de producción: auditoría npm sin vulnerabilidades reportadas al verificar.

Correcciones de la revisión: encabezado compacto a 320 px, semántica del progreso de formulario y bloques de avisos. Contenido de demostración rotulado; no hay peticiones de escritura desde los formularios.

Límites: pruebas realizadas con Chromium automatizado y viewports emulados; sin pruebas físicas en iOS/Android ni sesión manual de lector de pantalla. El video está pendiente de material autorizado. No se ha publicado en Vercel ni GitHub.

## Pulido de motion y portada

GSAP + ScrollTrigger incorporados en Inicio con carga diferida y limpieza al navegar. Parallax verificado en la ilustración, dentro del límite del 8%, sin errores de navegador. Motion se aplica a CTA, filtros y frases. Banda editorial con pausa y suspensión por visibilidad. Texturas vectoriales locales de papel, afiches en capas y una actividad demo integrada en el hero. Texto de participación siempre completo; su animación actúa sobre una línea decorativa. Pruebas adicionales verifican pausa, cambios de movimiento reducido y desplazamiento acotado.
