# Plan de Modularización CSS — Taller ByB

> Documento de arquitectura acordado. Sirve como referencia única de verdad para la refactorización de `styles.css` en archivos modulares.

## 1. Estructura de carpetas

```
css/
├── main.css                 ← único archivo enlazado en index.html
├── base/
│   ├── _reset.css
│   ├── _variables.css
│   └── _utilities.css
├── layout/
│   ├── _header.css
│   ├── _footer.css
│   └── _container.css
├── components/
│   ├── _buttons.css
│   ├── _nav.css
│   ├── _hero.css
│   ├── _services.css
│   ├── _about.css
│   ├── _gallery.css
│   ├── _reviews.css
│   ├── _contact-form.css
│   └── _contact-info.css
└── responsive/
    └── _breakpoints-summary.css
```

El prefijo `_` es convención para señalar "archivo parcial, no se usa solo". No afecta la ruta de importación.

---

## 2. Contenido exacto de cada archivo

### `main.css` (raíz)
Solo `@import`, sin reglas propias. Orden estricto: **base → layout → components → responsive**.

```css
/* === BASE === */
@import url('base/_variables.css');
@import url('base/_reset.css');
@import url('base/_utilities.css');

/* === LAYOUT === */
@import url('layout/_container.css');
@import url('layout/_header.css');
@import url('layout/_footer.css');

/* === COMPONENTS === */
@import url('components/_buttons.css');
@import url('components/_nav.css');
@import url('components/_hero.css');
@import url('components/_services.css');
@import url('components/_about.css');
@import url('components/_gallery.css');
@import url('components/_reviews.css');
@import url('components/_contact-form.css');
@import url('components/_contact-info.css');

/* === RESPONSIVE (documentación) === */
@import url('responsive/_breakpoints-summary.css');
```

`index.html` debe quedar con un único `<link>`:
```html
<link rel="stylesheet" href="css/main.css">
```

### `base/_variables.css`
`:root` completo: colores, tipografía (`--font-*`, `--fs-*`, `--fw-*`, `--lh-*`), espaciado (`--sp-*`), geometría, sombras, transiciones, layout (`--container-max`, `--header-height`, `--section-py`).

### `base/_reset.css`
`box-sizing` universal, `html`/`body` base, `@media (prefers-reduced-motion)`, reset de `img`/`svg`/`a`/listas, `overflow-wrap`.

### `base/_utilities.css`
`.visually-hidden`, `.visually-hidden--focusable`, bloque `:focus-visible` / `:focus:not(:focus-visible)` y sus variantes sobre fondo oscuro.

### `layout/_container.css`
`.container` y su variante de `@media (max-width: 480px)`.

### `layout/_header.css`
`.site-header`, `.header-inner`, `.brand*`, `.nav-toggle*` — shell del header **sin** la navegación interna.

### `layout/_footer.css`
`.site-footer`, `.footer__inner`, `.footer__brand*`, `.footer__nav*`, `.footer__copy`, incluyendo `@media (min-width: 768px)`.

### `components/_buttons.css`
`.btn` y variantes: `--primary`, `--secondary`, `--outline`, `--full`.

### `components/_nav.css`
`.main-nav*`, `.lang-switcher`, `.lang-btn*`, `.lang-divider`.

### `components/_hero.css`
`.section--hero`, `.hero__*` completo, incluyendo `@media (min-width: 480px)`.

### `components/_services.css`
`.section--services`, `.services-grid` + media queries (600px, 960px), `.service-card*`.

### `components/_about.css`
`.section--about`, `.about__*`, su `@media (prefers-reduced-motion)` específico.

### `components/_gallery.css`
`.section--gallery`, `.slider*` completo (pista, controles, dots, captions).

### `components/_reviews.css`
`.section--reviews`, `.reviews-grid` + media queries, `.review-card*`.

### `components/_contact-form.css`
`.contact__form-block`, `.contact-form`, `.form-*` (label, input, select, textarea, error, hint, status).

### `components/_contact-info.css`
`.section--contact`, `.contact__overlay`, `.contact__wrapper`, `.contact__info-block` + media query 768px, `.contact__col*`, `.hours-list*`, `.social-*`, `.contact-address*`.

### `responsive/_breakpoints-summary.css`
Solo el comentario-resumen de breakpoints. Documentación pura, sin reglas ejecutables.

---

## 3. Regla de organización interna por archivo

Dentro de cada parcial de `components/`:
1. Bloque base (mobile-first, sin media query)
2. Estados (`:hover`, `:focus-visible`, `:active`)
3. Media queries propias del componente, en orden ascendente de `min-width`

---

## 4. Justificación técnica (para defensa oral)

Separación por responsabilidad: `base/` define el sistema de diseño, `layout/` el esqueleto estructural reutilizable, `components/` aísla cada sección como unidad independiente, `responsive/` documenta la estrategia sin mezclarla con la implementación.

## 5. Advertencia sobre `@import`

`@import` genera peticiones HTTP en cascada (descarga secuencial, no paralela), lo cual añade latencia frente a un solo archivo. Es una decisión aceptable en este contexto académico (sin build tool permitido), pero en producción real se usaría un bundler (Vite, PostCSS) para concatenar estos parciales en un único archivo final.

---

## 6. Criterios de aceptación de la refactorización

- [ ] `index.html` enlaza únicamente `css/main.css`.
- [ ] Cero pérdida de reglas: el resultado visual y funcional del sitio es idéntico al `styles.css` original.
- [ ] Cero duplicación de reglas entre archivos.
- [ ] Cada selector vive en el archivo que le corresponde según la tabla de la sección 2.
- [ ] Las variables de `base/_variables.css` cargan antes que cualquier archivo que las consuma.
- [ ] Los comentarios explicativos originales (contraste WCAG, justificaciones de diseño) se conservan en su archivo correspondiente, no se pierden en la división.
- [ ] El archivo `styles.css` original puede eliminarse sin romper nada porque toda su lógica fue migrada.
