# Reporte de Auditoría de Código — Lab #1 ByB
### HTML / CSS / JavaScript — Pendientes antes de entrega final

> Nota de contexto: como confirmas que la galería, las reseñas y algunos fondos aún no tienen su contenido/imágenes definitivas, los puntos marcados como **[CONTENIDO PENDIENTE]** no son errores de código — son huecos de datos que ya tenías planeados. Los dejo listados igual para que no se te escapen al hacer el llenado final.

---

## 1. HTML (`index.html`)

### 1.1 Contenido placeholder sin reemplazar — [CONTENIDO PENDIENTE]
Tres tarjetas de reseña usan texto literal de marcador:
```html
<h3 class="review-card__name" data-i18n="review_1_name">[Nombre del cliente]</h3>
...
<p data-i18n="review_1_text">[Reseña del cliente — por agregar en Etapa 4]</p>
```
Se repite para `review_2` y `review_3`. **Acción:** reemplazar por contenido real (o ficticio creíble) antes de la entrega — no debe quedar texto entre corchetes en el HTML final.

### 1.2 Avatares de reseña con placeholder genérico — [CONTENIDO PENDIENTE]
```html
<img class="review-card__avatar" src="img/review-placeholder.jpg" alt="Foto de cliente — por agregar" ...>
```
Mismo caso: el `alt="...por agregar"` delata que es un marcador temporal. Reemplazar imagen y `alt` cuando haya foto definitiva.

### 1.3 Numeración inconsistente en claves de traducción de servicios
El HTML referencia `service_1`, `service_2`, `service_3`, `service_5` (salta el 4):
```html
<h3 class="service-card__title" data-i18n="service_3_title">Mecánica General</h3>
...
<h3 class="service-card__title" data-i18n="service_5_title">Sistema Eléctrico</h3>
```
**Acción:** renombrar `service_5` → `service_4` en el HTML (y su correspondiente en el JS) para que la secuencia sea consecutiva, o documentar por qué se conserva el salto.

### 1.4 Imágenes de fondo y galería aún no cargadas — [CONTENIDO PENDIENTE]
Las rutas ya están declaradas correctamente (`img/hero-bg.jpg`, `img/about-bg.jpg`, `img/contact-bg.jpg`, `img/gallery-01.jpg` a `gallery-05.jpg`, `img/logo-byb.webp`), pero confirmas que los archivos finales aún no están. **Acción:** verificar que cada `alt` siga siendo descriptivo y preciso una vez que la imagen real esté puesta — un `alt` genérico escrito para un placeholder puede no describir la imagen definitiva.

### 1.5 Bloques de comentario "CORRECCIÓN W3C" excesivamente dispersos
Hay al menos 7 bloques de comentario explicando, cada uno, por qué se quitó un `aria-label` de un `role="list"`. Aunque cada uno es correcto individualmente, la repetición fragmenta la lectura del archivo.
**Acción:** consolidar en un único comentario de criterio general al inicio del `<body>` (o en el README del repo) y dejar solo comentarios puntuales donde haya una excepción genuina al patrón.

---

## 2. CSS (`styles.css`)

### 2.1 Padding de sección inconsistente sin justificación inline
```css
.section { padding-block: var(--section-py); }
...
.section--about { padding-block: var(--sp-24); }
.section--contact { padding-block: var(--sp-20); }
```
Funciona por especificidad/orden, pero es un override silencioso de la regla base sin comentario que explique el porqué.
**Acción:** agregar una línea de comentario en cada override explicando la razón (ej. "mayor padding por efecto de overlay/parallax").

### 2.2 Comentarios con espaciado fijo para "alinear" texto
```css
--clr-bg-body: #F5F4F0;
/* Crema industrial — fondo general          */
```
Los espacios en blanco fijos se rompen en cuanto se edita cualquier nombre de variable cercano. Es cosmético de editor, no aporta funcionalidad.
**Acción:** quitar el padding manual de espacios; un solo espacio antes del comentario es suficiente.

### 2.3 `background-attachment: fixed` con soporte limitado en iOS
```css
.section--about {
  background-attachment: fixed;
  /* Efecto parallax suave */
}
```
Correcto y con fallback de `prefers-reduced-motion` ya implementado — solo falta una nota explícita de que el efecto puede no renderizar en Safari iOS (limitación conocida de WebKit, no un bug).
**Acción:** añadir esa aclaración como comentario para que quede documentada y no se interprete como fallo en la defensa.

### 2.4 Imágenes de fondo aún no presentes — [CONTENIDO PENDIENTE]
`hero-bg.jpg`, `about-bg.jpg`, `contact-bg.jpg` están referenciadas con fallback de color (`background-color: var(--clr-dark)`), lo cual es correcto. Solo falta confirmar el contraste real una vez la imagen esté puesta — los ratios documentados en comentarios (`9.3:1`, `10.8:1`, `8.2:1`) asumen una imagen oscura bajo el overlay; si la imagen final es muy clara en zonas, hay que re-verificar.

---

## 3. JavaScript (`main.js`)

### 3.1 Claves de traducción huérfanas (código muerto)
El diccionario conserva traducciones de servicios que ya no existen en el HTML:
```javascript
service_4_title: 'Aire Acondicionado',
service_4_desc:  '...',
service_6_title: 'Alineación y Balanceo',
service_6_desc:  '...',
```
**Acción:** eliminar ambas entradas (`service_4` y `service_6`) en los dos idiomas (`es`/`en`), o renombrar como se indicó en 1.3 si decides reutilizar el índice 4.

### 3.2 Duplicación de lógica de sincronización de dots
La misma lógica aparece dos veces casi idéntica dentro del módulo `Slider`: una vez en `goTo()` y otra dentro del callback del `IntersectionObserver`.
```javascript
dots.forEach((dot, i) => {
  const isActive = i === currentIndex;
  dot.classList.toggle('slider__dot--active', isActive);
  dot.setAttribute('aria-pressed', String(isActive));
});
```
**Acción:** extraer a una función privada `syncDots()` dentro del módulo y llamarla desde ambos puntos.

### 3.3 Nomenclatura confusa en variables de `catch`
```javascript
catch (_error) {
  console.warn(`...`, _error);
}
```
El prefijo `_` por convención indica "variable no usada", pero aquí sí se usa (`console.warn`).
**Acción:** renombrar `_error` → `error` en todos los bloques `try/catch` de `StorageService`.

### 3.4 `submitForm()` es una simulación que siempre resuelve en éxito
```javascript
function submitForm() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(true); }, 1200);
  });
}
```
No es un error — el enunciado no exige backend real — pero la rama de manejo de error (`catch` / `showFormStatus('error')`) nunca se ejecuta en la práctica actual porque `submitForm` jamás falla.
**Acción:** no es obligatorio cambiarlo, pero si quieres demostrar la rama de error en vivo durante la defensa, considera agregar una forma de forzar el fallo (ej. una constante `SIMULATE_FAILURE` temporal) o simplemente ten clara la explicación de que es código defensivo no probado en este momento.

---

## 4. Resumen por prioridad

| # | Archivo | Tipo | Prioridad |
|---|---------|------|-----------|
| 1.1 | HTML | Contenido pendiente | 🔴 Alta — bloquea entrega final |
| 1.2 | HTML | Contenido pendiente | 🔴 Alta — bloquea entrega final |
| 1.4 | HTML | Contenido pendiente | 🔴 Alta — bloquea entrega final |
| 2.4 | CSS | Contenido pendiente | 🔴 Alta — bloquea entrega final |
| 1.3 | HTML | Inconsistencia de nombres | 🟡 Media |
| 3.1 | JS | Código muerto | 🟡 Media |
| 3.2 | JS | Duplicación (DRY) | 🟡 Media |
| 1.5 | HTML | Ruido de comentarios | 🟢 Baja |
| 2.1 | CSS | Falta de justificación inline | 🟢 Baja |
| 2.2 | CSS | Cosmético de editor | 🟢 Baja |
| 2.3 | CSS | Falta de documentación | 🟢 Baja |
| 3.3 | JS | Nomenclatura | 🟢 Baja |
| 3.4 | JS | Cobertura de prueba/defensa | 🟢 Baja |

