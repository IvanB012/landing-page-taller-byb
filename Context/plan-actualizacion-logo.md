# Plan de Actualización — Logo del Header
### Pendiente separado del plan principal

> Este punto se trabaja aparte porque, a diferencia de las demás tareas,
> todavía no hay una solución definida — primero hay que diagnosticar el
> archivo de logo actual antes de decidir qué hacer.

---

## Contexto

Un compañero señaló en la retroalimentación que el logo se ve muy pequeño
en el header, y que "no está hecho para web" en su forma actual. El
usuario no tiene claro todavía cuál es el problema técnico exacto del
archivo (puede ser resolución baja, proporciones no aptas para el espacio
del header, formato no óptimo, o una combinación), así que este punto
requiere diagnóstico antes de definir la solución.

## Qué se debe hacer ANTES de tocar cualquier CSS/HTML

1. Revisar el archivo de logo actual (`img/logo-byb.webp` u otro, confirmar
   ruta exacta) y reportar:
   - Dimensiones reales del archivo (ancho x alto en píxeles).
   - Formato y peso del archivo.
   - Si tiene espacio en blanco/transparente de más alrededor del logo
     que reduce su tamaño visual aparente dentro del contenedor del header.
   - Si la proporción del logo (ej. muy ancho y poco alto, o cuadrado) es
     compatible con el espacio disponible en el header sin distorsionarse.
2. Reportar cómo se está aplicando hoy en CSS (`width`, `height`,
   `max-width`, `object-fit` si tiene, contenedor padre).
3. Con ese diagnóstico, proponer la solución más simple primero:
   - Si el problema es solo de tamaño en CSS (el archivo está bien pero se
     muestra chico), ajustar `width`/`height`/`max-height` del logo en
     `_header.css`, sin tocar el archivo de imagen.
   - Si el problema es del archivo en sí (mal recortado, con márgenes
     innecesarios, proporción rara), evaluar si conviene recortar/exportar
     una nueva versión del logo (esto requiere que el usuario provea un
     archivo nuevo o decida cómo generarlo) antes de tocar CSS.

## Restricciones

- No agrandar el logo de forma que rompa el layout del header en mobile.
- No distorsionar la proporción original del logo (nunca forzar
  `width`/`height` fijos que estiren la imagen — usar `max-width` +
  `height: auto` o equivalente).
- Coordinar con el ajuste de tamaño general del header/nav (ver punto 3
  del plan principal, `plan-actualizacion-landing.md`) para que ambos
  cambios sean visualmente coherentes entre sí, no contradictorios.

## Resultado esperado de la primera sesión sobre este punto

Un diagnóstico claro (no una solución aplicada todavía) que el usuario
pueda leer y decidir: ¿el problema se arregla solo con CSS, o se necesita
un archivo de logo nuevo/reexportado?
