# UNIVERSIDAD TÉCNICA NACIONAL
## PROGRAMACIÓN EN AMBIENTE WEB I | ISW-521
### Laboratorio #1 — Landing Page Responsiva

| Campo | Detalle |
|---|---|
| **Universidad** | Universidad Técnica Nacional (UTN) |
| **Curso** | Programación en Ambiente Web I |
| **Código del Curso** | ISW-521 |
| **Docente** | Bryan Miguel Chaves Salas |
| **Laboratorio** | Laboratorio #1 — Landing Page Responsiva |
| **Porcentaje** | 15% de la nota final del curso |
| **Modalidad** | Individual |
| **Entrega** | Repositorio GitHub del portafolio del curso |
| **Defensa** | Presencial, en clase (fecha comunicada por el docente) |

---

## 1. Introducción y Propósito del Laboratorio

Este laboratorio marca el primer hito práctico del curso. A lo largo de estas semanas hemos establecido los fundamentos teóricos del desarrollo web: la estructura semántica del lenguaje HTML5, los mecanismos de presentación visual del CSS3 y los principios que rigen la experiencia del usuario en la web moderna. Ahora ha llegado el momento de integrar ese conocimiento en un producto concreto, funcional y defendible.

El objetivo central es que usted construya una Landing Page responsiva, accesible y funcional, aplicando de manera deliberada y justificada las tecnologías estudiadas. No se trata de producir una página visualmente agradable por accidente, sino de demostrar que cada decisión de diseño y cada línea de código responden a un criterio técnico que usted comprende y puede explicar.

Este laboratorio representa el 15% de su nota final del curso y se evaluará en dos fases de igual peso: la entrega del código en su repositorio GitHub y una defensa técnica oral ante el docente. Ambas fases son igualmente obligatorias e irremplazables.

---

## 2. Objetivo de Aprendizaje

Al finalizar este laboratorio, el estudiante será capaz de:

- Estructurar una página web utilizando HTML5 semántico de manera coherente y válida.
- Implementar layouts responsivos utilizando exclusivamente CSS3 nativo, con dominio de Flexbox y CSS Grid Layout.
- Aplicar principios básicos de Accesibilidad Web (WCAG 2.1) en un proyecto real.
- Gestionar el estado o preferencias de usuario mediante la API de Web Storage del navegador.
- Articular y defender sus decisiones técnicas con propiedad y claridad ante una audiencia especializada.

---

## 3. Elección del Tema

El tema de la Landing Page es de libre elección del estudiante; sin embargo, esta libertad está sujeta a un criterio de seriedad y pertinencia académica que se describe a continuación.

### 3.1 Criterio de Nivel Universitario

El tema elegido debe reflejar un contexto profesional, organizacional o social genuino. Se aceptan, entre otros, los siguientes enfoques:

- **Organización sin fines de lucro (ONG):** sitio de presentación de una causa social, campaña de concienciación, recolección de fondos.
- **Startup tecnológica o producto digital:** Landing Page de lanzamiento de una aplicación, servicio SaaS o producto tecnológico.
- **PYME o emprendimiento formal:** sitio de presentación de un negocio real o ficticio con estructura empresarial coherente.
- **Portafolio profesional personal:** presentación de habilidades, proyectos y experiencia profesional propia.
- **Institución educativa o cultural:** universidad, escuela de idiomas, asociación cultural, etc.

### 3.2 Temas No Aceptados

Se rechazarán automáticamente los proyectos cuyo tema sea claramente frívolo, sin estructura profesional, o que no permita un tratamiento serio del contenido. Ejemplos de temas no aceptados:

- Páginas de humor, memes o contenido de entretenimiento sin estructura de negocio.
- Temas de broma o con nombres genéricos sin propósito definido (ej.: "Mi página de prueba").
- Contenido que infrinja derechos de autor o réplicas de sitios existentes sin valor añadido propio.

Ante la duda, el estudiante puede consultar con el docente antes de comenzar el desarrollo. La validación anticipada del tema no es obligatoria, pero sí recomendable.

---

## 4. Requerimientos Técnicos Obligatorios

Todos los requerimientos listados a continuación son de cumplimiento obligatorio. La ausencia de cualquiera de ellos impactará directamente en la calificación de la Fase de Entrega Técnica, independientemente de la calidad estética o visual del proyecto.

### 4.1 HTML5 Semántico

- El documento HTML debe estar correctamente declarado con la directiva `<!DOCTYPE html>`.
- Se deben utilizar las etiquetas semánticas propias de HTML5: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` y `<footer>`, según corresponda a la estructura real del contenido.
- El código debe ser válido según el estándar W3C (verificable en validator.w3.org).
- No se acepta el uso de tablas HTML para definir el layout de la página.

### 4.2 CSS3 Nativo — Flexbox y Grid Layout

- Todo el estilo visual debe implementarse con CSS3 nativo, en hojas de estilo externas (archivos .css separados).
- **Flexbox:** debe utilizarse en al menos un componente de layout (por ejemplo: barra de navegación, grupo de tarjetas, sección de características).
- **CSS Grid Layout:** debe utilizarse en al menos un componente de layout (por ejemplo: cuadrícula de servicios, galería de imágenes, sección de testimonios).
- La responsividad debe lograrse mediante media queries (`@media`). Se deben definir al menos dos breakpoints funcionales.
- Queda estrictamente prohibido el uso de frameworks CSS externos (Bootstrap, Foundation, Tailwind CSS, Bulma, etc.) en esta entrega.

### 4.3 Accesibilidad Web — WCAG 2.1 (Nivel A)

- Todas las imágenes deben contar con un atributo `alt` con descripción funcional (no vacío, salvo en imágenes puramente decorativas).
- Los elementos interactivos que no sean nativamente semánticos deben llevar atributos ARIA pertinentes (`role`, `aria-label`, `aria-describedby`, según corresponda).
- El contraste entre el color del texto y el color de fondo debe cumplir con la relación mínima de 4.5:1 para texto normal (verificable en tools.w3.org/~fmbod/color-contrast).
- La página debe ser navegable en su totalidad mediante el teclado (tecla Tab para desplazarse entre elementos, Enter para activar enlaces y botones). El indicador de foco (`:focus`) debe ser visible.

### 4.4 Web Storage (localStorage / sessionStorage)

- Se debe implementar al menos una funcionalidad que haga uso de la API de Web Storage del navegador.
- Ejemplos válidos: guardar el modo oscuro/claro seleccionado por el usuario, recordar el idioma de preferencia, conservar el nombre ingresado en un formulario de contacto, registrar si el usuario ya vio un banner de bienvenida.
- El dato almacenado debe recuperarse y aplicarse correctamente al recargar la página, demostrando persistencia real.
- La implementación debe realizarse en JavaScript nativo (sin librerías externas).

---

## 5. Política de Uso de Inteligencia Artificial

El uso de herramientas de Inteligencia Artificial (ChatGPT, GitHub Copilot, Gemini, Claude u otras equivalentes) está explícitamente permitido como recurso de apoyo en el desarrollo de este laboratorio. La razón es simple: en el mundo profesional, estas herramientas son parte del ecosistema de trabajo del desarrollador moderno, y saber utilizarlas de manera crítica y responsable es en sí misma una competencia valiosa.

Sin embargo, esta permisividad viene acompañada de una responsabilidad absoluta e intransferible:

> **El estudiante es el único responsable de todo el código que entrega, sin excepción alguna.** Si una herramienta de IA generó una porción del código, el estudiante tiene la obligación académica de haberlo leído, comprendido, validado y apropiado como propio. No se acepta como justificación durante la defensa la frase "eso lo generó la IA" ni ninguna variante equivalente.

El criterio de evaluación para esta política se ejerce de manera directa durante la Fase de Defensa Técnica Oral, en la que el docente tiene plena potestad para señalar cualquier línea de código y solicitar su explicación. Las consecuencias de no poder hacerlo están descritas con precisión en la Sección 7.

---

## 6. Modalidad y Condiciones de Entrega

### 6.1 Repositorio GitHub

La entrega se realiza exclusivamente a través del repositorio GitHub configurado como portafolio del curso durante las primeras semanas. No se aceptan entregas por correo electrónico, plataformas de transferencia de archivos, Google Drive ni ningún otro medio alternativo.

- El proyecto debe encontrarse en una carpeta claramente identificada dentro del repositorio (por ejemplo: `/laboratorio-01/` o `/lab01/`).
- El archivo principal debe denominarse `index.html`.
- Los archivos CSS deben estar en una carpeta separada (por ejemplo: `/css/` o `/styles/`).
- Los archivos JavaScript deben estar en una carpeta separada (por ejemplo: `/js/` o `/scripts/`).
- Las imágenes deben estar en una carpeta separada (por ejemplo: `/img/` o `/assets/images/`).
- El repositorio debe tener visibilidad pública o el docente debe estar agregado como colaborador, según las instrucciones del curso.

### 6.2 Fecha Límite

La fecha y hora exacta de cierre de entrega serán comunicadas por el docente a través del canal oficial del curso. El sistema de control de versiones de GitHub registra el timestamp de cada commit, por lo que no se considerarán modificaciones realizadas después del plazo establecido. Se evaluará el estado del repositorio en el momento exacto del cierre, no versiones posteriores.

### 6.3 Defensa Técnica Oral

La defensa se realizará de manera presencial en el horario de clase, en la fecha comunicada con anticipación por el docente. El estudiante debe presentarse puntualmente. No se garantizan turnos alternativos salvo en casos de fuerza mayor debidamente documentados y justificados ante el docente con antelación.

Durante la defensa, el docente podrá solicitar al estudiante: navegar el código fuente en tiempo real, modificar una propiedad CSS en directo, explicar el funcionamiento de un bloque JavaScript, o demostrar la responsividad del sitio redimensionando el navegador.

---

## 7. Rúbrica Oficial de Evaluación

El laboratorio se evalúa sobre un total de 100 puntos, divididos de manera exactamente igual entre las dos fases descritas a continuación. Estos 100 puntos equivalen al 15% de la nota final del curso.

> ### ⚠ CLÁUSULA CONDICIONAL INFLEXIBLE — LECTURA OBLIGATORIA
>
> La aprobación de la Fase de Defensa Técnica Oral es una condición indispensable para que la nota de este laboratorio refleje el esfuerzo real del estudiante. Si el estudiante no puede explicar, justificar o sostener una conversación técnica sobre su propio código —independientemente de si fue escrito por él o generado con apoyo de Inteligencia Artificial—, perderá automáticamente la totalidad de los 50 puntos de la Fase de Defensa.
>
> En consecuencia, **la nota máxima posible que podrá obtener en este laboratorio será de 50 puntos sobre 100**, sin importar la calidad técnica del código entregado, ni la perfección visual o funcional de la Landing Page.
>
> Esta cláusula no admite excepciones, apelaciones por situaciones imprevistas ni reconsideraciones posteriores a la defensa. La política de uso de IA está diseñada para promover el aprendizaje auténtico, no para sustituirlo.

### 7.1 Fase 1 — Entrega Técnica: Código y Funcionalidad (50 puntos)

Esta fase evalúa el producto entregado en el repositorio GitHub. La revisión se realiza sobre el código fuente y el comportamiento del sitio en el navegador, sin intervención del estudiante.

| Criterio de Evaluación | Indicadores Observables | Pts. Máx. | Pts. Obtenidos |
|---|---|---|---|
| **1. HTML5 Semántico** | • Uso correcto de etiquetas estructurales: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.<br>• El código es válido y no presenta errores en el validador del W3C.<br>• Las etiquetas se utilizan con coherencia semántica (no solo decorativa). | 12 | ____ |
| **2. Diseño Responsivo con Flexbox y Grid** | • Se implementa Flexbox en al menos una sección de layout (ej.: barra de navegación, tarjetas).<br>• Se implementa CSS Grid en al menos una sección de layout (ej.: galería, cuadrícula de características).<br>• La página se adapta correctamente a pantallas móviles, tablet y escritorio (breakpoints definidos).<br>• No se utiliza ningún framework CSS externo (Bootstrap, Tailwind, etc.). | 18 | ____ |
| **3. Accesibilidad Web (WCAG 2.1)** | • Se utilizan atributos ARIA esenciales donde corresponde (`role`, `aria-label`, `aria-describedby`).<br>• Las imágenes poseen atributo `alt` descriptivo.<br>• El contraste de texto sobre fondo cumple la relación mínima de 4.5:1.<br>• La página es navegable completamente con teclado (Tab, Enter, foco visible). | 10 | ____ |
| **4. Implementación de Web Storage** | • Se implementa `localStorage` o `sessionStorage` para persistir al menos una preferencia o estado del usuario.<br>• El dato almacenado es recuperado y aplicado correctamente al recargar la página.<br>• La lógica JavaScript correspondiente es funcional y no genera errores en consola. | 10 | ____ |
| **TOTAL — Fase de Entrega Técnica** | | **50** | |

### 7.2 Fase 2 — Defensa Técnica Oral (50 puntos)

Esta fase evalúa el dominio técnico real del estudiante sobre el proyecto entregado. Se realiza mediante una conversación técnica dirigida por el docente, en la que se evaluará la capacidad del estudiante para articular, justificar y demostrar sus decisiones de desarrollo:

| Criterio de Evaluación | Indicadores Observables | Pts. Máx. | Pts. Obtenidos |
|---|---|---|---|
| **1. Dominio del Código Propio** | • El estudiante identifica y explica sin dudar cualquier bloque de código señalado por el docente.<br>• Sabe qué hace cada función, selector CSS o etiqueta HTML cuando se le pregunta en tiempo real.<br>• Demuestra haber leído, comprendido y apropiado el código (independientemente de su origen). | 15 | ____ |
| **2. Justificación de Propiedades CSS** | • Explica correctamente por qué usó Flexbox en lugar de otra técnica en los lugares correspondientes.<br>• Explica correctamente por qué usó Grid en los lugares correspondientes.<br>• Justifica el uso de media queries y los valores de breakpoints elegidos.<br>• Sabe explicar unidades CSS utilizadas (px, %, rem, em, vw, vh). | 15 | ____ |
| **3. Manejo del Viewport y Responsividad** | • Explica qué es el viewport y cómo funciona la etiqueta `<meta name='viewport'>`.<br>• Describe cómo se comporta su diseño en los distintos tamaños de pantalla.<br>• Demuestra la responsividad directamente en el navegador durante la defensa. | 10 | ____ |
| **4. Comprensión de Accesibilidad y Web Storage** | • Explica qué son los atributos ARIA que implementó y cuál es su propósito.<br>• Describe cómo probó o verificó el contraste de color de su sitio.<br>• Explica la diferencia conceptual entre `localStorage` y `sessionStorage`, y justifica su elección.<br>• Demuestra que el dato almacenado persiste correctamente. | 10 | ____ |
| **TOTAL — Fase de Defensa Técnica** | | **50** | |

### 7.3 Tabla Resumen de Calificación

| Fase | Puntaje Máximo | Puntaje Obtenido |
|---|---|---|
| Fase 1: Entrega Técnica (Código y Funcionalidad) | 50 | ____ / 50 |
| Fase 2: Defensa Técnica Oral | 50 | ____ / 50 |
| **NOTA FINAL DEL LABORATORIO #1** | **100** | **____ / 100** |

---

## 8. Disposiciones Finales

La lectura completa de este documento es responsabilidad exclusiva del estudiante. La ignorancia de cualquiera de las políticas, requerimientos o cláusulas aquí descritas no constituye justificación válida para solicitar condiciones de evaluación distintas a las establecidas.

Cualquier situación no contemplada en este enunciado será resuelta por el docente con base en los principios del curso y la normativa académica vigente. Se invita a los estudiantes a plantear sus dudas con anticipación, de manera que el proceso de evaluación sea transparente y equitativo para todos.

Este laboratorio es una oportunidad real de crecimiento técnico. El código que escriba hoy, las decisiones que justifique mañana y la capacidad de articular su conocimiento ante otro profesional son exactamente las habilidades que el mercado laboral valorará en usted. Construya con rigor, aprenda con genuina curiosidad y defienda su trabajo con la convicción de quien realmente lo comprende.

---

*UTN | ISW-521 — Programación en Ambiente Web I | Laboratorio #1 | Prof. Bryan Chaves Salas*
*Documento oficial del curso — Uso exclusivo académico*
