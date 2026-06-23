# Plan de Actualización — Landing Page Taller ByB
### Post-defensa: retroalimentación de profesor y compañeros

> Este documento lista TODAS las tareas pendientes de la nueva iteración.
> NO se debe ejecutar todo de una sola vez. Cada tarea se trabaja en su
> propia sesión/turno con Claude Code, en el orden numerado abajo, y solo
> después de que la anterior quede confirmada y probada.
>
> Excluido de este documento: ajuste del logo (ver
> `plan-actualizacion-logo.md`, aparte) y modo claro/oscuro del widget de
> accesibilidad (ver `plan-widget-accesibilidad-v2.md`, aparte).

---

## Orden de ejecución sugerido

1. Quinta tarjeta de servicios ("Consúltanos")
2. Círculos de fondo en íconos de servicios
3. Header/nav más grande + comportamiento al hacer scroll
4. Google Maps en sección contacto
5. Títulos y descripción para Maps y formulario
6. Carrusel infinito de galería (el más complejo — al final)

Este orden va de menor a mayor complejidad/riesgo, para que los ajustes
simples no se vean retrasados por el componente más delicado (el carrusel).

---

## 1. Quinta tarjeta de servicios — "Consúltanos"

**Qué se agrega:** una quinta tarjeta en la sección de servicios, con el
mismo estilo visual que las cuatro existentes, para cuando el cliente no
encuentre el servicio que busca.

**Contenido sugerido:**
- Ícono: signo de pregunta o ícono de "más" (a definir con Claude Code
  según los íconos SVG ya usados en el proyecto, para mantener
  consistencia de estilo).
- Título: algo como "¿No encuentra su servicio?"
- Descripción breve: invitando a consultar directamente.
- Botón: "Contáctenos" que haga scroll/ancla directo a la sección de
  contacto (reutilizando el mismo mecanismo de anclas que ya usa el nav
  principal).

**Consideraciones:**
- El grid de servicios actual tiene 4 tarjetas — agregar una quinta puede
  romper la simetría del `CSS Grid` (ej. si es 2x2, pasar a 5 deja una
  tarjeta sola en una fila). Evaluar con Claude Code cómo se ve mejor:
  2-2-1, o ajustar a otra distribución que no se vea descompensada.
- No tocar las 4 tarjetas existentes, solo agregar la quinta.

---

## 2. Círculos de fondo en íconos de servicios

**Qué se agrega:** un contenedor circular de fondo detrás de cada ícono
SVG existente en las tarjetas de servicio (lupa, gota, llave, batería, y
el nuevo ícono de la tarjeta 5).

**Contexto:** actualmente los íconos flotan solos sobre el fondo oscuro de
la tarjeta, sin ningún marco visual. Se busca un círculo de color (tono a
definir, probablemente derivado del acento naranja/rojo de marca, en
versión semitransparente o sólida) que envuelva cada ícono.

**Consideraciones:**
- Debe verse consistente en las 5 tarjetas (incluyendo la nueva del punto 1).
- No cambiar el tamaño ni el color de los íconos SVG en sí, solo agregar
  el contenedor circular detrás.

---

## 3. Header / Navbar — Tamaño y comportamiento en scroll

**Qué se ajusta:**
- El logo se ve más grande (sin distorsión — ver nota abajo).
- El nav (enlaces del menú) se ve más grande/visible.
- Los botones del header (CTA, lang switcher, etc.) se agrandan.
- Al hacer scroll hacia abajo, el header se reduce a su tamaño actual
  (comportamiento ya existente, solo ajustar el tamaño "expandido" inicial
  vs el tamaño "reducido" en scroll).

**Consideraciones:**
- El ajuste del LOGO en sí (su archivo, proporciones, calidad) se trabaja
  por separado en `plan-actualizacion-logo.md`. Aquí solo se ajusta el
  tamaño del contenedor/espacio que ocupa en el header, no el archivo de
  imagen.
- Verificar que el header siga siendo `position: fixed/sticky` sin romper
  el cálculo de `--header-height` que ya usan otros componentes (recordar
  el ajuste que se hizo para el indicador de sección activa del nav, que
  depende de esta variable).
- Confirmar que el comportamiento responsive (mobile) no se ve afectado:
  el menú hamburguesa debe seguir funcionando igual.

---

## 4. Google Maps en sección de contacto

**Qué se agrega:** un mapa de Google Maps embebido, de tamaño reducido,
ubicado a la par del formulario de contacto (layout en dos columnas:
mapa + formulario).

**Consideraciones técnicas importantes:**
- Google Maps se embebe típicamente con un `<iframe>` (usando el código de
  "Insertar mapa" que da Google Maps, sin necesidad de API key para el
  embed básico). Esto NO viola la regla de "sin librerías externas" del
  enunciado, porque es un iframe nativo de HTML, no un script de terceros
  ni un framework — pero hay que confirmarlo explícitamente con Claude
  Code antes de implementar, dado lo estricto de la rúbrica.
- Definir la dirección/ubicación real del taller para centrar el mapa
  correctamente (dato que el usuario debe proporcionar).
- El mapa debe ser responsive (ajustarse en mobile, no desbordar el
  layout).
- Revisar si el iframe de Google Maps afecta el atributo `loading="lazy"`
  ya usado en otras imágenes del sitio, por consistencia de rendimiento.

---

## 5. Títulos y descripciones — Maps y Formulario

**Qué se agrega:**
- Un título corto para el bloque del mapa (ej. "Encuéntranos").
- Un título corto para el formulario (ej. "Escríbenos") + una descripción
  breve explicando para qué sirve el formulario y qué tipo de consultas
  pueden hacer ahí.

**Consideraciones:**
- Debe integrarse con el sistema i18n existente (ES/EN) — agregar las
  claves nuevas al diccionario de `main.js`, no texto hardcodeado.
- Mantener consistencia de estilo con los demás encabezados de sección del
  sitio (mismo patrón visual que "Quiénes Somos" o "Contáctenos").

---

## 6. Carrusel infinito de galería (el más complejo)

**Corrección de contexto (verificado contra el código real):** la galería
NO tiene actualmente ningún carrusel/slider — es un CSS Grid estático
(`gallery__grid`), sin JS asociado. El carrusel con `IntersectionObserver`,
dots y flechas que se mencionaba en versiones anteriores de este plan ya
no existe; en una iteración previa del proyecto se simplificó a este grid
estático. Esta tarea, por lo tanto, es **construir el carrusel infinito
desde cero**, no migrar o corregir uno existente — lo cual reduce el
riesgo de regresión (no hay nada que desmontar), pero no reduce la
complejidad de construcción en sí.

**Qué se construye:** un carrusel de **scroll infinito en bucle**, con las
siguientes reglas:

- **Control dual:** el usuario puede mover el carrusel manualmente
  (swipe/scroll/flechas) — esto es prioritario — y además se mueve
  automáticamente cuando no hay interacción del usuario.
- **Sin salto brusco:** al llegar a la última imagen, el carrusel continúa
  fluido hacia la primera imagen de nuevo, sin un corte/salto visual
  perceptible (técnica conocida como "infinite loop carousel", típicamente
  lograda duplicando/clonando slides en los extremos o recalculando la
  posición de scroll sin animación cuando se cruza el límite).
- **Orientación:** las imágenes se mantienen verticales, como están
  actualmente.
- **Escalabilidad:** la estructura debe permitir agregar más imágenes
  fácilmente (el usuario subirá fotos adicionales propias, no de stock) —
  evitar cualquier número de slides "hardcodeado" en el JS.

**Consideraciones técnicas importantes:**
- Como se construye desde cero, el grid estático actual (`gallery__grid`,
  CSS Grid) debe transformarse en un contenedor de scroll horizontal
  (típicamente `display: flex` + `overflow-x: auto/hidden` + scroll-snap o
  cálculo manual de posición). El requisito de CSS Grid de la rúbrica
  queda igualmente cubierto porque la sección de Servicios ya lo usa —
  confirmado, no hay riesgo de incumplimiento ahí.
- Debe seguir siendo JavaScript nativo, sin librerías externas (no usar
  Swiper.js, Slick, ni ninguna librería de carruseles, aunque sean muy
  comunes para este caso — el enunciado lo prohíbe).
- Debe seguir cumpliendo accesibilidad: navegación por teclado, y pausa de
  autoplay si el usuario tiene `prefers-reduced-motion` activado (ya existe
  ese patrón en otras partes del CSS, debe respetarse aquí también).
- Verificar que los `alt` descriptivos de cada imagen se sigan aplicando
  correctamente si se duplican/clonan slides para lograr el efecto infinito
  (un slide clonado no debe duplicar el mismo `alt` de forma que confunda
  a un lector de pantalla — revisar uso de `aria-hidden` en clones).

---

## Notas generales para todas las tareas

- Ningún cambio debe introducir frameworks, librerías JS externas, ni
  CSS de terceros — esto es no negociable según el enunciado.
- Cada tarea se verifica visualmente y en consola (sin errores) antes de
  pasar a la siguiente.
- Cualquier tarea nueva que surja después de este documento se agrega al
  final de esta lista, no se inserta a mitad del orden ya establecido.
