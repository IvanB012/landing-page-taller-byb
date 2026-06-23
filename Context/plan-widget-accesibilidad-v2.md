# Plan de Implementación — Widget de Accesibilidad (v2)
### Adición: control de Modo Claro / Oscuro

> Este documento EXTIENDE el plan original (`PLAN_WIDGET_ACCESIBILIDAD.md`,
> ya implementado y funcionando: tamaño de texto + brillo). No reemplaza
> nada de lo ya construido. Esta es la tarea siguiente sobre ese mismo
> widget, a trabajarse en su propia sesión.

---

## 1. Qué se va a agregar

Una tercera sección de control dentro del MISMO panel del widget de
accesibilidad ya existente (junto a "Tamaño de texto" y "Brillo de
pantalla"), que permita alternar entre el tema oscuro actual del sitio y
un tema claro alternativo.

**Importante — distinción conceptual que Claude Code debe tener clara
antes de empezar:** el control de "Brillo" ya existente aplica un filtro
CSS (`brightness()`) que oscurece visualmente la pantalla completa, pero
NO cambia los colores de fondo/texto del sitio. El "Modo Claro" es un
cambio distinto: invierte la paleta de colores del sitio (fondos oscuros
→ fondos claros, textos claros → textos oscuros). Son mecanismos
diferentes y NO deben mezclarse ni reemplazarse entre sí — deben coexistir
como controles independientes dentro del mismo panel.

---

## 2. Por qué este punto requiere más cuidado que los anteriores

Todo el sitio fue diseñado y maquetado pensando en un único tema oscuro
desde el inicio: las variables CSS en `_variables.css` (`--clr-bg-body`,
`--clr-text`, etc.), los overlays de las secciones con imagen de fondo
(hero, about, contact — los mismos que se ajustaron por contraste WCAG
anteriormente), y los ratios de contraste ya verificados y documentados en
comentarios, todos asumen fondo oscuro + texto claro.

Implementar un modo claro real implica que TODOS esos puntos necesitan su
contraparte de color, no solo invertir una variable. Si se hace de forma
incompleta, el resultado puede verse "raro" (texto claro sobre fondo claro
en algún componente que se olvidó, overlays que pierden sentido, contraste
roto en zonas no contempladas) — que es exactamente el riesgo que el
usuario ya anticipó y quiere evitar.

---

## 3. Qué se debe hacer ANTES de escribir una sola línea de CSS

1. Auditar TODOS los archivos de `css/` (siguiendo la arquitectura modular
   ya existente: base/, layout/, components/, responsive/) y listar cada
   uso de color que dependa del tema oscuro actual — no solo `:root`, sino
   cualquier color hardcodeado fuera de variables que se haya escapado.
2. Definir un set paralelo de variables para modo claro (ej. usando un
   atributo `data-theme="light"` en `<html>` o una clase `.theme-light`
   en `<body>`, y redefiniendo las variables de `:root` dentro de ese
   selector) — NO duplicar reglas completas, reutilizar el sistema de
   variables ya existente para que el cambio de tema sea solo una
   redefinición de variables, no una reescritura de selectores.
3. Reportar específicamente qué secciones tienen mayor riesgo de verse mal
   en modo claro (overlays sobre imágenes de fondo, el propio widget de
   accesibilidad, el header) ANTES de implementar, para decidir juntos si
   alguna sección necesita un tratamiento especial o si se puede simplificar
   el alcance del modo claro a ciertas secciones primero.

## 4. Implementación (después de la auditoría y aprobación)

- Agregar el tercer bloque de control en el HTML del panel ya existente
  (mismo patrón visual que las secciones de tamaño de texto y brillo:
  `<div class="a11y-section">` con sus botones).
- Sugerencia de control: dos botones tipo toggle, "Oscuro" / "Claro"
  (similar al patrón de 3 botones ya usado, pero aquí solo son 2 estados).
- Persistir la preferencia en `localStorage` usando `StorageService`, ya
  existente — mismo patrón que `STORAGE_KEY_FONT` y
  `STORAGE_KEY_BRIGHTNESS`, agregar `STORAGE_KEY_THEME`.
- Aplicar el tema guardado en la inicialización (`init()` del módulo
  `AccessibilityWidget`), antes de que el contenido se pinte, para evitar
  parpadeo de tema incorrecto al cargar.
- Mantener accesibilidad: `aria-pressed` o `aria-label` que indique
  claramente cuál tema está activo.

## 5. Qué NO se debe tocar

- No modificar el HTML/CSS del resto del widget (tamaño de texto, brillo)
  — solo se agrega la tercera sección.
- No introducir ninguna librería de "dark mode" externa — son solo
  variables CSS nativas y JS nativo, igual que el resto del proyecto.
- No cambiar el tema oscuro por defecto del sitio — el modo claro es
  opcional/activable, el oscuro sigue siendo el estado inicial.

## 6. Checklist de verificación

- [ ] El toggle Oscuro/Claro aparece dentro del mismo panel del widget.
- [ ] Cambiar a modo claro no rompe el contraste en ninguna sección
      (verificar especialmente hero, about, contact por los overlays).
- [ ] El header, footer, y el propio widget de accesibilidad se ven
      correctos en ambos modos.
- [ ] La preferencia persiste al recargar la página.
- [ ] No hay parpadeo visible del tema incorrecto al cargar la página.
- [ ] Sin errores en consola.
- [ ] Navegable por teclado igual que los demás controles del widget.
