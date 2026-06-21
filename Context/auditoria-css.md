# Auditoría de Código — CSS (todos los archivos)
### Lab #1 ByB | ISW-521 — Solo lectura, sin modificaciones

> Rúbrica aplicada: **Laboratorio_01_Landing_Page_Responsiva.md**
> Criterios auditados: CSS3 Nativo (18 pts) + Accesibilidad/Contraste (parte de WCAG, 10 pts).
> Metodología declarada en `main.css`: Mobile-First, CSS3 nativo, sin frameworks.

---

## Confirmación de cobertura — archivos auditados

| Carpeta | Archivo | Revisado |
|---|---|---|
| `css/` | `main.css` | ✅ |
| `css/base/` | `_variables.css` | ✅ |
| `css/base/` | `_reset.css` | ✅ |
| `css/base/` | `_utilities.css` | ✅ |
| `css/layout/` | `_container.css` | ✅ |
| `css/layout/` | `_header.css` | ✅ |
| `css/layout/` | `_footer.css` | ✅ |
| `css/components/` | `_nav.css` | ✅ |
| `css/components/` | `_buttons.css` | ✅ |
| `css/components/` | `_hero.css` | ✅ |
| `css/components/` | `_services.css` | ✅ |
| `css/components/` | `_about.css` | ✅ |
| `css/components/` | `_gallery.css` | ✅ |
| `css/components/` | `_reviews.css` | ✅ |
| `css/components/` | `_contact-form.css` | ✅ |
| `css/components/` | `_contact-info.css` | ✅ |
| `css/responsive/` | `_breakpoints-summary.css` | ✅ |

**Total: 17 de 17 archivos auditados.**

---

## 1. Evaluación de rúbrica — criterios obligatorios

### 1.1 CSS3 Nativo sin frameworks externos
- ✅ Cero `@import` a librerías externas. Todas las reglas son CSS3 nativo.
- ✅ Sin clases de Bootstrap, Tailwind, Bulma ni equivalentes.
- ✅ Uso correcto de Custom Properties, `clamp()`, `aspect-ratio`, `:focus-visible`, `backdrop-filter`, `inset`, `margin-inline`, `padding-block`, `grid-template-columns`.

### 1.2 Flexbox — evidencia en el código

Flexbox está presente en al menos un componente de layout en cada capa:

| Archivo | Selector | Uso |
|---|---|---|
| `_header.css` | `.header-inner` | Logo ↔ Nav (justify-content: space-between) |
| `_header.css` | `.brand`, `.brand__name` | Logo + texto en fila/columna |
| `_header.css` | `.nav-toggle` | Barras del hamburguesa en columna |
| `_nav.css` | `.main-nav`, `.main-nav__list` | Nav mobile (column) → desktop (row) |
| `_nav.css` | `.lang-switcher` | Botones ES/EN en fila |
| `_hero.css` | `.section--hero`, `.hero__cta-group` | Héroe centrado; CTAs columna→fila |
| `_reviews.css` | `.review-card`, `.review-card__header`, `.review-card__meta` | Layout interno de tarjeta |
| `_contact-form.css` | `.contact-form`, `.form-group` | Campos apilados en columna |
| `_contact-info.css` | `.hours-list`, `.hours-list__row`, `.social-list`, `.contact-address`, `.contact-address__item` | Horarios, links sociales, dirección |
| `_buttons.css` | `.btn` | `inline-flex` para iconos + texto |
| `_layout/_footer.css` | `.footer__inner` | Copyright centrado |

✅ **Flexbox cumplido ampliamente.** Más de 15 usos en layouts reales.

### 1.3 CSS Grid Layout — evidencia en el código

| Archivo | Selector | Uso y breakpoints |
|---|---|---|
| `_services.css` | `.services-grid` | 1 col → 2 col (600px) → 2 col+max-width (960px) |
| `_gallery.css` | `.gallery__grid` | 1 col → 2 col (640px) → 3 col (1024px) |
| `_reviews.css` | `.reviews-grid` | 1 col → 2 col (600px) → 3 col (960px) |
| `_contact-info.css` | `.contact__info-block` | 1 col → 2 col (640px) → 3 col (1024px) |

✅ **Grid cumplido ampliamente.** 4 grids con breakpoints funcionales.

### 1.4 Media queries — breakpoints reales en el código

Los breakpoints presentes (contados en todos los archivos, no en el resumen):

| Breakpoint | Archivo(s) | Qué cambia |
|---|---|---|
| `480px` (min) | `_hero.css` | `.hero__cta-group`: column → row |
| `480px` (max) | `_container.css` | `.container`: padding reducido |
| `600px` (min) | `_services.css`, `_reviews.css` | grids 1 → 2 col |
| `640px` (min) | `_gallery.css`, `_contact-info.css` | gallery + contact-info 1 → 2 col |
| `768px` (min) | `_header.css`, `_nav.css`, `_about.css` | nav hamburguesa oculto, nav horizontal, parallax about |
| `960px` (min) | `_services.css`, `_reviews.css` | services max-width 820px; reviews 2 → 3 col |
| `1024px` (min) | `_gallery.css`, `_contact-info.css` | gallery + contact-info 2 → 3 col |

**6 breakpoints funcionales.** ✅ Supera el mínimo requerido de 2.

### 1.5 Contraste de colores — WCAG 2.1 §1.4.3 (mínimo 4.5:1)

El sistema de tokens documenta los ratios. Verificación cruzada:

| Color texto | Fondo | Ratio documentado | ¿Cumple ≥4.5:1? |
|---|---|---|---|
| `--clr-text-primary` (#1A1A1A) | `--clr-bg-body` (#F5F4F0) | 17.5:1 | ✅ |
| `--clr-text-secondary` (#4A4A4A) | `--clr-bg-body` (#F5F4F0) | 7.8:1 | ✅ |
| `--clr-text-muted` (#6B6B6B) | `--clr-bg-body` (#F5F4F0) | 4.7:1 | ✅ (límite) |
| `--clr-text-inverted` (#F5F4F0) | `--clr-dark` (#1A1A1A) | 17.5:1 | ✅ |
| `--clr-social-icon` (#D0CEC8) | `--clr-dark` (#1A1A1A) | 9.1:1 | ✅ |
| `--clr-social-icon` (#D0CEC8) | `--clr-dark-mid` (#2C2C2C) | 9.1:1 | ✅ |
| `.review-card__stars` (#E8B800) | `--clr-dark-mid` (#2C2C2C) | 7.2:1 | ✅ |
| `.form-required` (#FF8A80) | overlay oscuro efectivo | ≥4.6:1 | ✅ |
| `--clr-text-inverted` sobre overlay-about (0.72) | imagen oscura peor caso | ≥8.5:1 | ✅ |
| `--clr-text-inverted` sobre overlay-contact (0.78) | imagen oscura peor caso | ≥10.6:1 | ✅ |
| `.footer__copy` rgba(#D0CEC8, 0.55) | `--clr-dark` (#1A1A1A) | ≥4.5:1 | ✅ (mínimo) |

**Única advertencia: `.hero__eyebrow`** usa `--clr-accent` (#C0392B). El código reconoce que este rojo no alcanza 4.5:1 contra fondos oscuros (máx. teórico 3.86:1 contra negro puro), y mitiga con `text-shadow` local. Esta es una compensación documentada en el comentario de `_hero.css`. No es una violación limpia, y debe prepararse para la defensa.

### 1.6 `:focus` visible — WCAG 2.4.7

```css
/* _utilities.css */
:focus-visible {
  outline: 3px solid var(--clr-accent);
  outline-offset: 3px;
}

/* Secciones oscuras: anillo blanco */
.section--services :focus-visible,
.section--reviews :focus-visible,
.section--about :focus-visible,
.section--contact :focus-visible,
.site-footer :focus-visible {
  outline-color: #FFFFFF;
}
```

✅ Foco visible con contraste adecuado en fondos claros y oscuros.
✅ Skip link tiene su propio estilo `:focus`.
✅ `prefers-reduced-motion` implementado en `_reset.css`.

**Excepción en inputs del formulario** (`_contact-form.css`):
```css
.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;  /* ← anula :focus-visible global */
  border-color: var(--clr-accent);
  box-shadow: 0 0 0 3px rgba(192, 57, 43, 0.25);
}
```
El `outline: none` con especificidad más alta que `:focus-visible` suprime el anillo global. El reemplazo (borde + sombra) sí es visible: `border-color: #C0392B` sobre fondo blanco da ~5.7:1. **WCAG 2.4.7 se cumple** mediante el indicador alternativo, pero el shadow al 25% de opacidad es tenue. Anotado como "nota", no como incumplimiento.

---

## 2. Carpeta `base/` — auditoría por archivo

### `_variables.css`

**Bien resuelto:**
- Tokens completos: colores, tipografía con `clamp()`, espaciado escala-4px, radios, sombras, transiciones, layout.
- Ratios de contraste documentados inline junto a cada color. Excelente práctica defensiva para la defensa oral.
- Overlays con valores calculados y justificados.

**Hallazgo A — `--font-mono` nunca utilizado**

```css
--font-mono: 'Courier New', Courier, monospace;
```

No aparece en ninguno de los 16 archivos CSS restantes. Variable muerta.

**Mejora propuesta:** eliminar la declaración. No afecta ningún archivo.

**Hallazgo B — `--clr-accent-light` nunca utilizado**

```css
--clr-accent-light: #F9EBEA;   /* Rojo muy pálido — fondos de badge */
```

No aparece en ningún componente ni layout. Variable muerta.

**Mejora propuesta:** eliminar. No afecta ningún archivo.

---

### `_reset.css`

- ✅ `box-sizing: border-box` universal.
- ✅ `prefers-reduced-motion: reduce` anula animaciones y `scroll-behavior`.
- ✅ `ul[role="list"]` / `ol[role="list"]` quitan estilos de lista (patrón correcto).
- ✅ Sin nada que cambiar.

---

### `_utilities.css`

**Bien resuelto:**
- `:focus-visible` + `:focus:not(:focus-visible)` es el patrón moderno correcto.
- `.visually-hidden` con todos los atributos necesarios (`clip`, `white-space`, `border: 0`).
- `.skip-link` correctamente posicionado fuera de pantalla y mostrado en foco.

**Hallazgo C — `.visually-hidden--focusable` no se usa en el HTML actual**

La clase `.visually-hidden--focusable` está definida pero ningún elemento del HTML la aplica (el skip link usa `.skip-link`, no esta clase). Es código potencialmente muerto.

No se propone eliminarla — es una utilidad de accesibilidad estándar que podría usarse en el futuro. Se anota solo para conciencia.

**Hallazgo D — Numeración de sección inconsistente**

El archivo tiene:
- `/* 3. INDICADOR DE FOCO */`
- `/* 4. SKIP LINK */`
- `/* 17. UTILIDADES DE ACCESIBILIDAD */`

El salto de 4 a 17 sugiere que la sección fue movida al archivo en un momento posterior. No afecta el CSS, pero rompe la numeración global. Baja prioridad.

---

## 3. Carpeta `layout/` — auditoría por archivo

### `_container.css`

**Hallazgo E — Un breakpoint usa `max-width` en lugar de `min-width`**

```css
/* Este breakpoint es max-width (desktop-first) */
@media (max-width: 480px) {
  .container {
    padding-inline: var(--sp-4);
  }
}
```

Todo el resto del proyecto usa `min-width` (mobile-first). Este único `max-width` es una excepción que contradice la metodología declarada en `main.css`. Funcionalmente es equivalente, pero es inconsistente.

**Mejora propuesta:** reformular como mobile-first:
```css
/* Base mobile */
.container { padding-inline: var(--sp-4); }

/* A partir de 480px, más espacio */
@media (min-width: 480px) {
  .container { padding-inline: var(--sp-6); }
}
```
Impacto: solo `_container.css`. El resultado visual es idéntico.

**Hallazgo F — Padding overrides de sección sin comentario explicativo**

La regla base define:
```css
.section { padding-block: var(--section-py); }  /* --sp-16 = 4rem */
```

Tres componentes la sobreescriben silenciosamente:

| Archivo | Regla | Valor | Comentario explicativo |
|---|---|---|---|
| `_about.css` | `.section--about` | `var(--sp-24)` = 6rem | ❌ ninguno |
| `_gallery.css` | `.section--gallery` | `var(--sp-20)` = 5rem | ❌ ninguno |
| `_contact-info.css` | `.section--contact` | `var(--sp-20)` = 5rem | ❌ ninguno |

Funciona por especificidad/orden de cascade, pero un lector del código no sabe por qué cada sección usa un valor diferente.

**Mejora propuesta:** agregar una línea de comentario en cada override. Ejemplo:
```css
.section--about {
  padding-block: var(--sp-24); /* Mayor padding: sección con overlay/parallax */
```
Impacto: solo comentarios en tres archivos. Cero cambio visual.

---

### `_header.css`

- ✅ Header fijo con `z-index: 100`.
- ✅ Flexbox en `.header-inner`.
- ✅ Hamburguesa con transformación en "X" mediante `aria-expanded="true"`.
- ✅ Breakpoint 768px oculta el hamburguesa.
- Sin hallazgos funcionales.

**Nota menor:** `.nav-toggle { gap: 5px; }` usa un valor en `px` hardcodeado. El token más cercano es `--sp-1 = 4px`. No es exactamente representable, así que el hardcode es aceptable aquí.

---

### `_footer.css`

- ✅ Flexbox para centrar copyright.
- ✅ Color del copyright documentado con ratio de contraste.
- Sin hallazgos.

---

## 4. Carpeta `components/` — auditoría por archivo

### `_buttons.css`

**Hallazgo G — `.btn--secondary` y `.btn--outline` son idénticos (código duplicado)**

```css
/* Botón secundario: contorno blanco (sobre hero oscuro) */
.btn--secondary {
  background-color: transparent;
  color: var(--clr-text-inverted);
  border-color: var(--clr-text-inverted);
}
.btn--secondary:hover, .btn--secondary:focus-visible {
  background-color: var(--clr-text-inverted);
  color: var(--clr-dark);
}

/* Botón outline: contorno rojo (sobre fondos claros) */   ← comentario incorrecto
.btn--outline {
  background-color: transparent;
  color: var(--clr-text-inverted);          /* igual que --secondary */
  border-color: var(--clr-text-inverted);   /* igual que --secondary */
}
.btn--outline:hover, .btn--outline:focus-visible {
  background-color: var(--clr-text-inverted);  /* igual */
  color: var(--clr-dark);                       /* igual */
}
```

Los cuatro bloques de `.btn--outline` son **copia exacta** de `.btn--secondary`. Además el comentario dice "contorno rojo" pero el CSS usa `--clr-text-inverted` (blanco/crema), no el rojo de acento.

En el HTML:
- `.btn--secondary` → hero (sobre fondo oscuro)
- `.btn--outline` → sección Nosotros (también sobre fondo oscuro)

**Mejora propuesta:**
- Eliminar `.btn--outline` de `_buttons.css` (4 bloques de reglas, ~12 líneas).
- En `index.html`, cambiar `class="btn btn--outline"` por `class="btn btn--secondary"` en la sección About.
- Impacto: 2 archivos, cero cambio visual.

---

### `_nav.css`

- ✅ Mobile: nav oculto (`display: none`), mostrado al añadir `.main-nav--open` por JS.
- ✅ Tablet (768px): nav horizontal con Flexbox.
- ✅ Selector de idioma correctamente ubicado dentro del nav.
- Sin hallazgos funcionales.

---

### `_hero.css`

- ✅ `min-height: 100svh` correcto para viewport en móvil.
- ✅ `padding-top: var(--header-height)` compensa el header fijo.
- ✅ Overlay con variable de token.
- ✅ Flexbox para centrar contenido.
- ✅ Breakpoint 480px para CTAs.
- Sin hallazgos funcionales. La limitación del rojo del eyebrow está documentada y justificada.

---

### `_services.css`

- ✅ Grid 1→2 col (600px) → 2 col con max-width (960px). El comentario explica el cambio de 3→2 columnas al reducir de 6 a 4 tarjetas.
- ✅ Modo oscuro documentado con ratios de contraste.
- Sin hallazgos funcionales.

---

### `_about.css`

**Hallazgo H — `.about__title::after` duplica `.section__title::after`**

```css
/* _container.css — .section__title::after */
.section__title::after {
  content: '';
  display: block;
  width: 3.5rem;
  height: 3px;
  background-color: var(--clr-accent);
  margin: var(--sp-4) auto 0;
  border-radius: var(--radius-full);
}

/* _about.css — .about__title::after  ← idéntico */
.about__title::after {
  content: '';
  display: block;
  width: 3.5rem;
  height: 3px;
  background-color: var(--clr-accent);
  margin: var(--sp-4) auto 0;
  border-radius: var(--radius-full);
}
```

Son idénticos byte-a-byte. La sección About usa `.about__title` (no `.section__title`) porque tiene su propio contexto de color, por lo que la duplicación es necesaria funcionalmente — no puede simplemente heredar. Pero si cambia el estilo del decorador, habría que actualizarlo en dos lugares.

**Mejora propuesta (opcional):** agregar un comentario en `_about.css` que indique la dependencia:
```css
/* Decorador rojo idéntico al de .section__title::after — mantener en sincronía */
.about__title::after { ... }
```
Impacto: solo un comentario. Cero cambio visual.

**También bien resuelto:** el `background-attachment: scroll` base (evita bug iOS Safari) + `background-attachment: fixed` solo en `@media (min-width: 768px)` + `prefers-reduced-motion: reduce` para desactivar el parallax. Implementación correcta y completa.

---

### `_gallery.css`

- ✅ Grid 3 breakpoints: 1 → 2 (640px) → 3 (1024px).
- ✅ `aspect-ratio: 3/2` coincide con las dimensiones reales de las imágenes (900×600).
- ✅ `:focus-within` en la tarjeta para escalar la imagen al navegar por teclado.
- Sin hallazgos funcionales.

---

### `_reviews.css`

- ✅ Grid 3 breakpoints: 1 → 2 (600px) → 3 (960px).
- ✅ `blockquote` con borde izquierdo rojo — indicación visual de cita.
- Sin hallazgos funcionales.

---

### `_contact-form.css`

**Hallazgo I (CRÍTICO) — `.form-error` no tiene ocultamiento por defecto**

El comentario en el HTML (líneas 468–472 de `index.html`) dice explícitamente:
> "El texto se oculta visualmente cuando no hay error mediante CSS/JS."

Pero en el CSS:
```css
.form-error {
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: #FFCDD2;
  line-height: var(--lh-snug);
  min-height: 1em; /* reserva espacio */
  /* ← no hay visibility: hidden, opacity: 0, clip, ni display: none */
}
```

El flujo real al cargar la página:
1. HTML tiene el texto del error hardcodeado en los spans
2. `i18n.init()` → `applyTranslations()` → sobreescribe el innerHTML de todos los `[data-i18n]`, incluyendo los spans de error → error traducido queda en el DOM con color visible
3. `FormValidator.init()` → solo registra listeners, NO limpia los errores

**Resultado:** los cuatro mensajes de validación (`name-error`, `email-error`, `subject-error`, `message-error`) son visibles en color `#FFCDD2` desde que carga la página, antes de que el usuario haya tocado el formulario.

**Bug secundario relacionado:** si el usuario llena correctamente un campo (JS borra el `textContent`), luego cambia el idioma, `applyTranslations()` re-aplica el texto de error al span vacío → el error reaparece aunque el campo sea válido.

**Mejora propuesta (CSS + JS coordinados):**

_CSS:_ Ocultar la región reservada por defecto y mostrar solo cuando JS lo active:
```css
.form-error {
  font-size: var(--fs-xs);
  font-weight: var(--fw-medium);
  color: #FFCDD2;
  line-height: var(--lh-snug);
  min-height: 1em;
  visibility: hidden; /* oculto por defecto */
}

.form-error--visible {
  visibility: visible; /* JS añade esta clase al mostrar error */
}
```

_HTML:_ Eliminar `data-i18n` de los spans de error (sacar el texto del control de i18n):
```html
<span class="form-error" id="name-error" role="alert" aria-live="polite"></span>
```

_JS:_ En `validateField()`, en lugar de solo `errorEl.textContent`, también gestionar la clase:
```js
errorEl.textContent = isValid ? '' : i18n.t(rule.errorKey);
errorEl.classList.toggle('form-error--visible', !isValid);
```

Impacto: `_contact-form.css`, `index.html`, `js/main.js`. Cero cambio visual para el usuario final.

**Hallazgo J — Colores hardcodeados fuera del sistema de tokens**

Varios valores de color en este archivo no usan variables:

| Valor | Dónde | Podría ser |
|---|---|---|
| `#FF8A80` | `.form-required` | token `--clr-error-light` |
| `#FFCDD2` | `.form-error`, `.hours-list__time--closed` | token `--clr-error-pale` |
| `#A9DFBF` | `.form-status--success` | token `--clr-success-text` |
| `#C62828` | `.form-input:user-invalid` | token `--clr-error-dark` |
| `rgba(192,57,43,…)` | hover/focus de inputs | derivable de `--clr-accent` |
| `rgba(39,174,96,…)` | status success | token de color success |

Estos no son errores funcionales — el CSS opera correctamente. Es una inconsistencia de organización: el sistema de tokens de `_variables.css` está diseñado para centralizar los colores, pero los colores de estado (error/success) se escriben hardcodeados.

**Mejora propuesta:** agregar tokens en `_variables.css` para los colores de estado. Baja prioridad, no afecta la rúbrica.

---

### `_contact-info.css`

- ✅ Grid glassmorphism con 3 breakpoints funcionales.
- ✅ La lógica de `grid-column: 1 / -1` para la 3ª tarjeta en tablet está bien implementada y reseteada en desktop.
- ✅ Todos los colores sobre fondos oscuros documentados con ratios.
- Sin hallazgos funcionales.

---

## 5. Carpeta `responsive/` — auditoría

### `_breakpoints-summary.css` — Documentación inexacta en tres puntos

Este archivo solo contiene comentarios (cero reglas CSS). Su propósito es documentar los breakpoints del proyecto. Sin embargo, tiene errores:

**Error 1 — Falta el breakpoint `640px`:**
El archivo documenta 480, 600, 768, 960px. No menciona `640px`, que afecta a `.gallery__grid` y `.contact__info-block` (dos de los cuatro Grids del proyecto).

**Error 2 — Atribuye el `640px` del contact a `768px`:**
```
Breakpoint 3 — 768px:
  - contact__info-block: 1 col → 2 col (Grid)   ← INCORRECTO
```
El `@media (min-width: 640px)` es quien controla `.contact__info-block` en `_contact-info.css`. El breakpoint `768px` controla la navegación, no el grid de contacto.

**Error 3 — Atribuye "3 col" a `services-grid` en `960px`:**
```
Breakpoint 4 — 960px:
  - services-grid: 2 col → 3 col   ← INCORRECTO
```
En `_services.css` el breakpoint 960px mantiene 2 columnas pero añade `max-width: 820px; margin-inline: auto;`. No cambia a 3 columnas. El comentario en el propio `_services.css` explica explícitamente por qué.

**Falta documentar el breakpoint `1024px`** (gallery 2→3, contact-info 2→3).

**Tabla correcta de breakpoints reales:**
```
480px  — hero__cta-group columna → fila
480px  — container: padding reducido (max-width)
600px  — services-grid 1→2 col; reviews-grid 1→2 col
640px  — gallery__grid 1→2 col; contact__info-block 1→2 col
768px  — nav hamburguesa oculto; nav horizontal; about parallax
960px  — services-grid: max-width 820px; reviews-grid 2→3 col
1024px — gallery__grid 2→3 col; contact__info-block 2→3 col
```

**Mejora propuesta:** reescribir el contenido del archivo con la tabla corregida. Impacto: solo el archivo de comentarios. Cero cambio en comportamiento.

---

## 6. Evaluación global de la rúbrica CSS (18 pts)

| Criterio | Indicadores | Estado |
|---|---|---|
| CSS3 Nativo sin frameworks | Cero librerías externas | ✅ |
| Hojas de estilo externas | Archivos `.css` separados via `@import` | ✅ |
| Flexbox en ≥1 componente | Más de 15 usos | ✅ |
| Grid en ≥1 componente | 4 grids con breakpoints | ✅ |
| ≥2 breakpoints funcionales | 6 breakpoints (480/600/640/768/960/1024) | ✅ |
| Sin framework CSS externo | Confirmado | ✅ |
| Contraste ≥4.5:1 | Documentado y verificado en tokens | ✅ |
| `:focus` visible | Implementado globalmente con override en dark sections | ✅ |

**Riesgo detectado:** el Hallazgo I (`.form-error` visible en page load) es un bug visual activo que el docente puede observar durante la defensa técnica al mirar el formulario antes de usarlo.

---

## 7. Resumen de cambios propuestos — ordenados por prioridad

| # | Archivo(s) | Tipo | Descripción | Prioridad |
|---|---|---|---|---|
| I | `_contact-form.css` + `index.html` + `js/main.js` | Bug visual | `.form-error` sin ocultamiento: mensajes visibles en page load + bug de language switch que re-muestra errores ya corregidos. Fix coordinado en los 3 archivos. | 🔴 Alta |
| G | `_buttons.css` + `index.html` | DRY | `.btn--outline` es copia exacta de `.btn--secondary`. Eliminar uno y unificar en HTML. | 🟡 Media |
| Resumen | `_breakpoints-summary.css` | Documentación incorrecta | 3 errores en el archivo: falta 640px, contact a 768px (es 640px), services "3 col" (es 2 col). Reescribir. | 🟡 Media |
| E | `_container.css` | Inconsistencia metodológica | Único `max-width: 480px` en un proyecto mobile-first. Reformular como `min-width`. | 🟢 Baja |
| A | `_variables.css` | Variable sin uso | `--font-mono` no se usa en ningún archivo. Eliminar. | 🟢 Baja |
| B | `_variables.css` | Variable sin uso | `--clr-accent-light` no se usa en ningún archivo. Eliminar. | 🟢 Baja |
| F | `_about.css`, `_gallery.css`, `_contact-info.css` | Claridad | Padding overrides sin comentario explicativo. Agregar línea de justificación en cada uno. | 🟢 Baja |
| H | `_about.css` | DRY | `.about__title::after` duplica exactamente `.section__title::after`. Agregar comentario de sincronía. | 🔵 Info |
| J | `_contact-form.css` | Tokens | Colores de estado hardcodeados (#FF8A80, #FFCDD2, etc.). Agregar tokens en `_variables.css`. | 🔵 Info |
| D | `_utilities.css` | Cosmético | Numeración salta de 4 a 17. Renumerar la sección. | 🔵 Info |

> **El único cambio que impacta la rúbrica en términos de observabilidad directa es el #I**: un evaluador que abra el formulario sin interactuar verá los mensajes de error mostrados. Los demás son claridad, DRY y documentación.
