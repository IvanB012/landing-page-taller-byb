# Taller Mecánico ByB — Landing Page

Landing page responsiva para un taller mecánico automotriz ubicado en San Carlos, Costa Rica. El sitio presenta los servicios del negocio, galería de instalaciones y testimonios de clientes, con soporte bilingüe (español/inglés) y accesibilidad WCAG 2.1 AA.

---

## Demo en vivo

El sitio está desplegado en Vercel y puede visitarse directamente desde el siguiente enlace:

**[https://landing-page-taller-byb.vercel.app](https://landing-page-taller-byb.vercel.app)**

---

## Información académica

| Campo | Detalle |
|---|---|
| **Universidad** | Universidad Técnica Nacional (UTN) |
| **Curso** | Programación en Ambiente Web I — ISW-521 |
| **Laboratorio** | Laboratorio #1 — Landing Page Responsiva |
| **Estudiante** | Iván Barboza Blanco |

---

## Tecnologías utilizadas

- **HTML5 semántico** — estructura con `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<address>`, `<dl>`, `<figure>`
- **CSS3 nativo** — archivo único centralizado (`styles.css`), Flexbox y CSS Grid Layout
- **JavaScript nativo ES6+** — patrón IIFE, sin librerías ni frameworks externos
- **Web Storage API** — `localStorage` para persistencia de preferencia de idioma entre sesiones

> Sin frameworks CSS (Bootstrap, Tailwind, etc.) ni librerías JavaScript externas.

---

## Estructura del proyecto

```
laboratorio-01/
├── index.html
├── css/
│   └── styles.css                # Estilos centralizados: variables, reset, layout, componentes y responsive
├── js/
│   └── main.js                   # Módulos: StorageService, i18n, Header, FormValidator, Init
└── img/                          # Imágenes en formato WebP optimizado
```

---

## Características principales

- **Diseño responsivo Mobile-First** — 6 breakpoints (480 px, 600 px, 640 px, 768 px, 960 px, 1024 px); el layout se adapta desde móvil hasta escritorio amplio sin ningún framework
- **Soporte bilingüe ES / EN** — sistema de internacionalización con diccionario plano; detecta automáticamente el idioma del navegador y persiste la elección en `localStorage`
- **Accesibilidad WCAG 2.1 AA** — contraste verificado en todas las secciones, navegación completa por teclado, atributos ARIA, skip link y región aria-live para notificaciones dinámicas
- **Galería fotográfica con CSS Grid** — cuadrícula adaptativa (1 → 2 → 3 columnas) con transición hover y relación de aspecto fija (3:2)
- **Navegación con IntersectionObserver** — el enlace activo del menú se actualiza automáticamente según la sección visible en pantalla
- **Menú hamburguesa accesible** — apertura/cierre con teclado (tecla Escape), gestión de `aria-expanded` y cierre al hacer clic fuera del menú
- **Imágenes optimizadas** — todas las imágenes en formato WebP; `aspect-ratio` y `object-fit: cover` garantizan proporciones consistentes

---

## Accesibilidad

El sitio implementa las siguientes prácticas de accesibilidad:

- **Contraste de color**: todos los pares texto/fondo cumplen la relación mínima de 4.5:1 (WCAG 2.1 AA); las secciones oscuras han sido verificadas individualmente con ratios documentados en el código
- **Navegación por teclado**: todos los elementos interactivos son alcanzables con Tab; el foco visible está garantizado mediante `:focus-visible` en todos los componentes
- **ARIA**: `aria-label` en elementos de navegación, `aria-expanded` en el botón hamburguesa, regiones `aria-live` para notificaciones dinámicas
- **Texto alternativo**: todas las imágenes incluyen atributo `alt` descriptivo; las imágenes decorativas tienen `alt=""` o se implementan como fondos CSS
- **Skip link**: enlace "Saltar al contenido principal" visible al recibir foco, conforme a WCAG 2.4.1

---

*Proyecto desarrollado con fines académicos para el curso ISW-521, Programación en Ambiente Web I — UTN.*
