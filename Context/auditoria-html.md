# Auditoría de Código — `index.html`
### Lab #1 ByB | ISW-521 — Solo lectura, sin modificaciones

> Rúbrica aplicada: **Laboratorio_01_Landing_Page_Responsiva.md**
> Criterios auditados: HTML5 Semántico (12 pts) y Accesibilidad Web WCAG 2.1 (10 pts).
> Archivo auditado: `laboratorio-01/index.html` (710 líneas).

---

## 1. Estructura global del documento

| Elemento | Línea | Estado |
|---|---|---|
| `<!DOCTYPE html>` | 1 | ✅ Correcto |
| `<html lang="es">` | 2 | ✅ Correcto (JS actualiza dinámicamente al cambiar idioma) |
| `<meta charset="UTF-8">` | 5 | ✅ |
| `<meta name="viewport">` | 6 | ✅ Correctamente definido |
| `<meta name="description">` | 7–8 | ✅ |
| `<title>` | 16 | ✅ |
| `<link rel="icon">` | 18 | ✅ |
| `<link rel="stylesheet">` | 21 | ✅ CSS externo, no inline |
| `<script src="js/main.js" defer>` | 707 | ✅ `defer` garantiza que el DOM esté listo |

---

## 2. Criterio 1 — HTML5 Semántico (12 pts)

### 2.1 Etiquetas estructurales — todas presentes y en uso correcto

| Etiqueta | Dónde aparece | Uso correcto |
|---|---|---|
| `<header>` | L. 35 (site-header), L. 142/293/349/442 (section headers), L. 366/386/406 (review-card headers) | ✅ |
| `<nav>` | L. 61 (`#main-nav`, `aria-label="Menú principal"`) | ✅ |
| `<main>` | L. 107 (`id="main-content"`) | ✅ |
| `<section>` | L. 112/140/262/291/347/437 — 6 secciones, todas con `id` y `aria-labelledby` | ✅ |
| `<article>` | L. 162/184/209/228 (servicios), L. 365/385/405 (reseñas), L. 564/619/651 (info-cards) | ✅ |
| `<figure>` | L. 304/310/316/322/328/334 (galería) | ✅ |
| `<blockquote>` | L. 378/398/418 (citas de clientes) | ✅ uso semántico impecable para testimonios |
| `<address>` | L. 568 (datos de contacto) | ✅ asociado a la organización, uso correcto |
| `<dl>` / `<dt>` / `<dd>` | L. 629–642 (horarios) | ✅ evita tablas, perfectamente semántico |
| `<footer>` | L. 696 | ✅ |

No se usan tablas HTML para layout en ninguna parte del documento. ✅
No hay `<aside>` — no existe contenido suplementario que lo requiera; su ausencia es correcta según "según corresponda". ✅

### 2.2 Jerarquía de encabezados

```
<h1>  → "Tu vehículo en manos expertas"  (L. 117 — un único h1, héroe)
  <h2> → "Nuestros Servicios"             (L. 143)
    <h3> × 4 → títulos de tarjetas       (L. 173/198/217/246)
  <h2> → "Quiénes Somos"                 (L. 269)
  <h2> → "Nuestra Galería"               (L. 294)
  <h2> → "Lo que dicen nuestros clientes"(L. 350)
    <h3> × 3 → nombres de clientes       (L. 370/390/410)
  <h2> → "Contáctenos"                   (L. 443)
    <h3> → "Envíenos un mensaje"          (L. 455)
    <h3> × 3 → títulos de info-cards     (L. 565/620/652)
```

La jerarquía es limpia y sin saltos. Un solo `<h1>` por página. ✅

### 2.3 Hallazgo — Inconsistencia de índice en la 4ª tarjeta de servicios

**Líneas 246 y 249:**
```html
<h3 class="service-card__title" data-i18n="service_5_title">
  Sistema Eléctrico
</h3>
<p class="service-card__desc" data-i18n="service_5_desc">
```

La página presenta físicamente 4 tarjetas de servicio (posiciones 1, 2, 3, 4 en el DOM), pero la cuarta tarjeta usa las claves `service_5_title` / `service_5_desc`. Esto ocurre porque "Aire Acondicionado" (que tenía las claves `service_4_*`) fue retirado del HTML, pero las claves del diccionario no se renumeraron.

Resultado actual en el diccionario:
- Claves que SÍ existen en HTML: `service_1`, `service_2`, `service_3`, `service_5`
- Claves huérfanas en diccionario: `service_4` (AC) y `service_6` (Alineación)

**No es un error de validación W3C** — el validador de HTML no verifica valores de `data-*`. No rompe nada en el navegador. Pero la inconsistencia hace el código confuso para leer y dificulta agregar servicios futuros.

**Mejora propuesta:** renombrar la 4ª tarjeta de `service_5_*` → `service_4_*` en el HTML (solo líneas 246 y 249), y renombrar las entradas correspondientes en el diccionario JS. Simultáneamente eliminar las claves huérfanas del diccionario (coordinado con cambio #1 de `auditoria-js.md`).

**Impacto en otros archivos si se aplica:**
- `js/main.js`: renombrar `service_5_title` → `service_4_title` y `service_5_desc` → `service_4_desc` en ES (líneas 179–180) y EN (líneas 318–319), más eliminar las 8 claves huérfanas.
- CSS: ningún impacto (el CSS apunta a clases `.service-card__title`, no a `data-*`).

---

## 3. Criterio 2 — Accesibilidad Web WCAG 2.1 (10 pts)

### 3.1 Skip link

**Línea 28–30:**
```html
<a class="skip-link" href="#main-content" data-i18n="skip_link">
  Saltar al contenido principal
</a>
```
`href="#main-content"` coincide con `id="main-content"` en `<main>` (L. 107). ✅
Texto traducido mediante el sistema i18n. ✅

### 3.2 Imágenes — atributo `alt`

| Imagen | Línea | Alt | Estado |
|---|---|---|---|
| Logo ByB | 39 | `"Logotipo oficial de Taller Mecánico ByB"` + `data-i18n-alt` | ✅ |
| galeria-01.webp | 306 | Descripción funcional de la acción en la imagen | ✅ |
| galeria-02.webp | 312 | Descripción funcional | ✅ |
| galeria-03.webp | 318 | Descripción funcional | ✅ |
| galeria-04.webp | 323 | Descripción funcional | ✅ |
| galeria-05.webp | 329 | Descripción funcional | ✅ |
| galeria-06.webp | 335 | Descripción funcional | ✅ |
| cliente-1.webp | 367 | `"Foto de perfil de Yohel Barrantes, cliente del Taller ByB"` | ✅ |
| cliente-2.webp | 387 | `"Foto de perfil de Erick Rojas, cliente del Taller ByB"` | ✅ |
| cliente-3.webp | 407 | `"Foto de perfil de Adriel Córtes, cliente del Taller ByB"` | ✅ |

Todos los SVGs decorativos llevan `aria-hidden="true"` y `focusable="false"`. ✅
No hay imágenes sin `alt`. ✅

### 3.3 ARIA — atributos y roles

Elementos con ARIA correctamente implementados:

| Elemento | Atributo ARIA | Línea | Estado |
|---|---|---|---|
| `<nav>` | `aria-label="Menú principal"` | 61 | ✅ |
| `<button>` hamburguesa | `aria-controls`, `aria-expanded`, `aria-label` | 48–49 | ✅ |
| Secciones | `aria-labelledby` → `<h2 id>` | 112/140/262/291/347/437 | ✅ |
| Estrellas de reseña | `role="img"`, `aria-label="5 de 5 estrellas"` | 373/393/413 | ✅ |
| Links externos | `aria-label` explicita "abre en nueva pestaña" | 658/671 | ✅ |
| Botones de idioma | `aria-pressed="true/false"`, `role="group"` en contenedor | 89–99 | ✅ |
| Links tel/mailto | `aria-label` descriptivo | 594/609 | ✅ |
| Formulario | `aria-label="Formulario de contacto"`, `novalidate` | 459 | ✅ |
| Inputs | `aria-describedby` → spans de error/hint | 466/483/496/508/526 | ✅ |
| Overlays decorativos | `aria-hidden="true"` | 134/267/438 | ✅ |
| Barras hamburguesa | `aria-hidden="true"` (×3) | 50/51/52 | ✅ |

### 3.4 Hallazgo — `role="list"` sin children `role="listitem"` (violación ARIA 1.2)

**Líneas 158 y 363:**
```html
<div class="services-grid" role="list">
  <article class="service-card"> ...  <!-- role implícito: "article", NO "listitem" -->

<div class="reviews-grid" role="list">
  <article class="review-card"> ...   <!-- mismo caso -->
```

La especificación ARIA 1.2 establece que los elementos con `role="list"` deben tener hijos con `role="listitem"`. El elemento `<article>` tiene un rol implícito de `article`, NO de `listitem`. Esto es una **violación de la regla de propiedad ARIA** (_required owned elements_).

**Aclaración importante:** el validador de HTML de W3C (validator.w3.org) NO verifica restricciones de propiedad ARIA — el HTML pasaría la validación HTML. Sin embargo, herramientas de accesibilidad como axe-core sí la reportan, y algunos lectores de pantalla podrían exponer la estructura de forma inconsistente.

**Opciones de corrección:**
- **Opción A (recomendada):** Eliminar `role="list"` de ambos `<div>`. El `<section aria-labelledby>` padre ya provee el contexto de agrupación, y `<article>` ya provee semántica de ítem.
- **Opción B:** Agregar `role="listitem"` a cada `<article>` dentro de esos divs (pero esto sobreescribe el rol implícito `article`).

**Impacto de la Opción A en otros archivos:**
- CSS: ninguno — el CSS apunta a `.services-grid` y `.reviews-grid` como clases, no al atributo `role`.
- JS: ninguno — `main.js` no referencia estos atributos `role`.
- Solo se toca el HTML (dos atributos eliminados).

### 3.5 Spans de error pre-poblados con `role="alert"`

**Líneas 473–474, 485–486, 516–517, 528–529:**
```html
<span class="form-error" id="name-error" role="alert" aria-live="polite"
  data-i18n="form_error_name">Por favor, ingrese su nombre completo.</span>
```

Los spans de error llevan texto inicial en el HTML. Esto es resultado de un `CORRECCIÓN W3C` intencionada (comentario en L. 468–472).

Dos observaciones:
1. `role="alert"` tiene `aria-live="assertive"` implícito. Añadir `aria-live="polite"` explícitamente lo sobreescribe a polite (comportamiento intencional para no interrumpir al lector de pantalla). Válido y correcto.
2. Los `aria-live` regions solo anuncian cambios **posteriores** a la carga de página — el texto inicial no se anuncia automáticamente. Sin embargo, si el CSS no oculta estos spans visualmente en el estado por defecto, los mensajes de error serían visibles antes de que el usuario interactúe con el formulario.

**Esto requiere verificación en la auditoría CSS:** confirmar que `.form-error` tiene `visibility: hidden` o equivalente en su estado base. Si está oculto correctamente, no hay problema. Si no, los mensajes serían visibles al cargar la página (no rompe la rúbrica, pero es un defecto visual).

**No se propone cambio en el HTML** hasta confirmar el comportamiento en CSS.

### 3.6 Navegación por teclado — análisis

- `<a class="skip-link">` permite saltar al contenido. ✅
- Botón hamburguesa: `type="button"` (evita submit por defecto), `aria-expanded`. ✅
- Cierre con `Escape` implementado en JS (verificado en `auditoria-js.md`). ✅
- Todos los elementos interactivos son nativamente focusables (`<a>`, `<button>`, `<input>`, `<select>`, `<textarea>`). ✅
- Los `:focus` deben ser visibles — esto depende del CSS y debe verificarse en la auditoría CSS.
- Links externos con `target="_blank"` advierten al usuario mediante `aria-label`. ✅

---

## 4. Elementos bien resueltos — no requieren cambio

Los siguientes patrones están correctamente implementados y no deben modificarse:

- **`<header>` anidados:** Los `<header>` dentro de `<section>` y dentro de `<article>` son válidos HTML5. Cada elemento seccionante puede tener su propio `<header>`.
- **`<figure>` sin `<figcaption>`:** Permitido por el estándar; el `alt` de cada imagen es la descripción funcional.
- **`<dl>` para horarios:** Correcto semánticamente (pares término-descripción). No usa `<table>`.
- **`<blockquote>` para testimonios:** Uso semántico apropiado para citas de clientes.
- **`<address>` para datos de contacto:** Correctamente asociado a la organización.
- **OG meta tags:** Presentes los esenciales (`og:title`, `og:description`, `og:type`). La ausencia de `og:image` no afecta la rúbrica.
- **`rel="noopener noreferrer"`** en todos los links con `target="_blank"`. ✅
- **`loading="lazy"` + `width` + `height`** en imágenes bajo el fold (previene layout shift). ✅
- **`autocomplete`** en todos los campos del formulario. ✅

---

## 5. Evaluación global de la rúbrica

### Criterio HTML5 Semántico (12 pts)

| Indicador | Estado |
|---|---|
| `<!DOCTYPE html>` correcto | ✅ |
| Etiquetas semánticas usadas con coherencia | ✅ |
| Válido W3C (validación HTML de sintaxis) | ✅ Pasa |
| No se usan tablas para layout | ✅ |

**Riesgo detectado para la rúbrica:** ninguno activo. El punto 2.3 (inconsistencia de índice `service_5`) es de naming, no de validación.

### Criterio Accesibilidad WCAG 2.1 (10 pts)

| Indicador | Estado |
|---|---|
| Atributos ARIA donde corresponde | ✅ Implementación muy completa |
| Imágenes con `alt` descriptivo | ✅ |
| Contraste texto/fondo | Requiere verificación CSS — no auditable desde HTML solo |
| Navegación completa con teclado | ✅ estructuralmente garantizado |

**Riesgo detectado:** el punto 3.4 (`role="list"` sin `role="listitem"`) es una violación ARIA que herramientas de accesibilidad reportarían, aunque no afecta el validador HTML de W3C.

---

## 6. Resumen de cambios propuestos — ordenados por prioridad

| # | Tipo | Descripción | Líneas afectadas | Archivos impactados | Prioridad |
|---|---|---|---|---|---|
| 1 | ARIA (corrección) | Eliminar `role="list"` de `.services-grid` y `.reviews-grid` — `<article>` no es `listitem` | 158, 363 | Solo `index.html` | 🟡 Media |
| 2 | Naming (consistencia) | Renombrar `data-i18n="service_5_title"` → `"service_4_title"` y `"service_5_desc"` → `"service_4_desc"` en la 4ª tarjeta | 246, 249 | `index.html` + `main.js` (coordinado con cambio #1 de `auditoria-js.md`) | 🟡 Media |
| 3 | Verificación pendiente | Confirmar que `.form-error` está oculto por CSS en estado base (antes de interacción) | 473/485/516/528 | Requiere auditoría CSS | 🟢 Baja |

> **Ningún cambio altera funcionalidad ni diseño visual.** El cambio #1 es una corrección ARIA pura. El cambio #2 es un rename de atributos `data-*` que no afecta CSS ni comportamiento. El punto #3 es una verificación, no una acción todavía.
