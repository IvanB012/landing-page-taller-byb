# Auditoría de Código — `js/main.js`
### Lab #1 ByB | ISW-521 — Solo lectura, sin modificaciones

> Referencia de rúbrica utilizada: **Laboratorio_01_Landing_Page_Responsiva.md**, criterio 4 (Web Storage, 10 pts) y criterio general de JS nativo sin librerías.
> El archivo auditado es `laboratorio-01/js/main.js` (1 000 líneas, 5 módulos).

---

## Módulo 1 — `StorageService` (líneas 41–107)

### Qué hace
Encapsula todas las operaciones sobre `localStorage` en un IIFE con cuatro métodos:

| Función | Líneas | Propósito |
|---|---|---|
| `isAvailable()` | 48–57 | Detecta si `localStorage` es accesible (write+delete de prueba) |
| `get(key, defaultValue)` | 65–73 | Lee un valor; retorna `defaultValue` si la clave no existe |
| `set(key, value)` | 80–88 | Escribe un valor; retorna `boolean` de éxito |
| `remove(key)` | 94–102 | Elimina una clave; retorna `boolean` de éxito |

### Cumplimiento de rúbrica — Web Storage (10 pts)
- ✅ Usa `localStorage` nativo del navegador, sin librerías.
- ✅ El dato almacenado (idioma) se recupera y aplica al recargar — la persistencia es real y demostrable.
- ✅ Manejo defensivo completo: los tres escenarios de fallo real (incógnito/Safari, cuota superada, políticas de seguridad) están cubiertos con `try/catch`. No se generan errores en consola bajo uso normal — solo `console.warn` en degradación elegante.
- ✅ El módulo cumple al 100% con el requisito de este criterio.

### Hallazgos de calidad

**A. `_error` — prefijo inconsistente con el uso real** ← único problema vigente en este módulo

La convención `_nombre` señala que una variable es intencionalmente no utilizada. Aquí el comportamiento varía por función:

| Función | Línea del `catch` | ¿Se usa `_error`? | ¿Prefijo correcto? |
|---|---|---|---|
| `isAvailable()` | 54 | ❌ No — solo `return false` | ✅ Sí, `_` es correcto |
| `get()` | 69 | ✅ Sí — `console.warn(..., _error)` en línea 70 | ❌ No, el `_` es engañoso |
| `set()` | 84 | ✅ Sí — `console.warn(..., _error)` en línea 85 | ❌ No |
| `remove()` | 98 | ✅ Sí — `console.warn(..., _error)` en línea 99 | ❌ No |

**Mejora propuesta:** renombrar `_error` → `error` en los tres `catch` de `get()`, `set()` y `remove()` (líneas 69, 84, 98). En `isAvailable()` dejarlo como `_error` porque allí sí es correcto. No cambia ningún comportamiento.

---

## Módulo 2 — `i18n` (líneas 127–561)

### Qué hace
Sistema de internacionalización ES/EN. Flujo completo:

1. Lee `'byb_lang'` de `localStorage` → si no existe, detecta idioma del navegador → fallback a `'es'`.
2. Aplica el diccionario al DOM mediante cuatro selectores de atributo (`data-i18n`, `data-i18n-placeholder`, `data-i18n-alt`, `data-i18n-aria`).
3. Actualiza `<html lang="">` para lectores de pantalla.
4. Mantiene el estado `aria-pressed` en los botones de idioma.

| Función | Líneas | Propósito |
|---|---|---|
| `detectBrowserLang()` | 428–433 | Idioma del navegador como fallback |
| `applyTranslations(lang)` | 441–486 | Escribe traducciones en el DOM |
| `updateLangButtons(lang)` | 493–499 | Sincroniza `aria-pressed` y clase activa |
| `init()` | 506–523 | Carga idioma guardado, aplica, registra listeners |
| `setLang(lang)` | 528–541 | Cambia idioma, persiste en `localStorage`, anuncia cambio |
| `getLang()` | 546–548 | Getter del idioma activo |
| `t(key)` | 555–557 | Traduce una clave para uso interno en JS |

### Cumplimiento de rúbrica — Web Storage
- ✅ `StorageService.set(STORAGE_KEY, lang)` (línea 533) persiste la preferencia de idioma.
- ✅ `StorageService.get(STORAGE_KEY)` (línea 508) la recupera al arranque.
- ✅ El dato sobrevive recargas y cierres del navegador (usa `localStorage`, no `sessionStorage` — elección correcta y justificada en el comentario del módulo 1).
- ✅ JS nativo puro.

### Hallazgos de calidad

**A. Claves de traducción huérfanas (código muerto)** ← hallazgo más importante del módulo

Los diccionarios contienen 8 entradas que no tienen `data-i18n` correspondiente en el HTML (confirmado por el reporte previo, validado como punto vigente):

```
ES — líneas 177–178:  service_4_title, service_4_desc  ('Aire Acondicionado')
ES — líneas 181–182:  service_6_title, service_6_desc  ('Alineación y Balanceo')

EN — líneas 316–317:  service_4_title, service_4_desc  ('Air Conditioning')
EN — líneas 320–321:  service_6_title, service_6_desc  ('Wheel Alignment & Balancing')
```

El HTML actualmente referencia `service_1`, `service_2`, `service_3` y `service_5`; los índices 4 y 6 del diccionario no se usan.

**Mejora propuesta:** eliminar esas 8 entradas (4 en `es`, 4 en `en`). Si en el futuro se restauran esos servicios en el HTML, las claves se agregan de nuevo. No cambia nada visual ni funcional.

**B. `innerHTML` en `applyTranslations()` (línea 452) — aceptable, bien documentado**

El código usa `el.innerHTML = dict[key]` en lugar de `el.textContent`. La razón está comentada inline: permite etiquetas `<br>` en la dirección de contacto, y el contenido proviene exclusivamente del diccionario interno (no de input del usuario), por lo que no hay riesgo XSS. **No se propone ningún cambio aquí.**

**C. `navigator.userLanguage` (línea 431) — residuo de compatibilidad IE, sin impacto**

```js
const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2)
```

`navigator.userLanguage` es una propiedad de Internet Explorer que no existe en ningún navegador moderno — resolverá a `undefined` y el `||` lo descarta limpiamente. No genera errores. **No es necesario cambiarlo**, pero si se quiere limpiar, se puede eliminar sin consecuencias.

---

## Utilidad global — `announceToScreenReader` (líneas 572–601)

### Qué hace
Crea un nodo `aria-live="polite"` temporal para anunciar mensajes que no están asociados a ningún elemento visible (en particular, cambios de idioma). El nodo se elimina del DOM tras 3 segundos.

### Cumplimiento de rúbrica — Accesibilidad
- ✅ Implementa correctamente el patrón "visually-hidden" para lectores de pantalla.
- ✅ Usa `requestAnimationFrame` para garantizar que el navegador registre el nodo antes de asignarle texto.
- ✅ Está bien como está. No hay cambio propuesto.

---

## Módulo 3 — `Header` (líneas 617–752)

### Qué hace
Gestiona todo el comportamiento del encabezado:

| Función | Líneas | Propósito |
|---|---|---|
| `setMenuOpen(open)` | 625–635 | Toggle menú móvil + aria-expanded + aria-label bilingüe |
| `onScroll()` | 638–641 | Clase visual `site-header--scrolled` al desplazar |
| `initActiveNavLink()` | 644–708 | IntersectionObserver para enlace activo en nav |
| `init()` | 710–748 | Registra todos los event listeners del header |

### Cumplimiento de rúbrica — Accesibilidad y navegación por teclado
- ✅ `aria-expanded` actualizado en el toggle del menú (línea 629).
- ✅ `aria-label` del botón hamburguesa se actualiza con el idioma activo (líneas 632–635), usando `i18n.t()`.
- ✅ Tecla Escape cierra el menú y devuelve el foco al botón (líneas 736–739).
- ✅ Clic fuera del header cierra el menú (líneas 728–730).
- ✅ Está bien como está. No hay cambio propuesto.

### Nota de calidad
El `IntersectionObserver` usa un `Map` para búsqueda O(1) de enlaces (líneas 654–658) y compensa la altura real del header fijo en `rootMargin` (línea 702). Implementación sólida y correcta.

---

## Módulo 4 — `FormValidator` (líneas 775–961)

### Qué hace

| Función / constante | Líneas | Propósito |
|---|---|---|
| `rules` (objeto) | 781–800 | Reglas de validación por `id` de campo |
| `validateField(field)` | 808–824 | Valida un campo, actualiza `aria-invalid` y span de error |
| `validateAll()` | 829–848 | Valida todos los campos, focaliza el primero inválido |
| `showFormStatus(type)` | 853–859 | Muestra mensaje de éxito o error post-envío |
| `resetForm()` | 862–878 | Resetea campos, `aria-invalid` y mensajes de estado |
| `AIRTABLE_ENDPOINT / TOKEN` | 888–891 | Credenciales de integración Airtable |
| `submitForm()` | 896–917 | Envío asíncrono a Airtable con `fetch` nativo |
| `init()` | 919–957 | Registra listeners blur por campo y submit del formulario |

### Cumplimiento de rúbrica
- ✅ JS nativo. `fetch` es API nativa del navegador — no es librería externa.
- ✅ Validación accesible: `aria-invalid`, `role="alert"` en spans de error, foco al primer campo inválido.
- ✅ No genera errores en consola bajo operación normal.

### Hallazgos de calidad

**A. `_error` en el `catch` del submit (línea 949) — correcto**

```js
} catch (_error) {
  showFormStatus('error');
}
```

Aquí `_error` **no se usa** — el objeto de error se descarta intencionalmente (solo importa que falló). El prefijo `_` es **correcto en este caso**. No se propone cambio.

**B. Strings de carga hardcodeados en el submit handler (línea 938)**

```js
submitBtn.textContent = i18n.getLang() === 'es' ? 'Enviando…' : 'Sending…';
```

El resto del texto del formulario pasa por `i18n.t()`. Estas dos cadenas son la única excepción: están escritas literalmente con una condicional manual. No es un error de rúbrica, pero rompe la consistencia del sistema de traducción.

**Mejora propuesta:** agregar las claves `form_submitting` a ambos diccionarios y reemplazar la línea por `i18n.t('form_submitting')`. Cambio mínimo, sin impacto funcional.

**C. Credencial Airtable expuesta (líneas 888–891) — aceptado con documentación**

```js
const AIRTABLE_TOKEN = 'patGPwEkXX2A2NA0F.61214b...';
```

El PAT queda visible en el código fuente del cliente. El código ya incluye un comentario explícito (líneas 880–887) que reconoce esta limitación y la justifica: es un sitio estático sin backend, alcance mínimo del token, y contexto académico. **No se propone cambio para el laboratorio.** Sí es importante poder explicar esto en la defensa técnica.

**D. Derivación de ID del span de error (línea 818)**

```js
const errorEl = document.getElementById(`${field.id.replace('field-', '')}-error`);
```

Funciona, pero crea un acoplamiento implícito: si algún `id` de campo cambiara en el HTML, la derivación fallaría silenciosamente. Es una convención que debe mantenerse. **No se propone cambio** — solo tenerlo claro para la defensa.

---

## Módulo 5 — `Init` (líneas 977–1000)

### Qué hace
Único punto de entrada. Espera `DOMContentLoaded` y ejecuta los módulos en orden:
1. Verifica disponibilidad de `StorageService` (degradación elegante si no está disponible).
2. `i18n.init()` — primero, porque los demás módulos usan `i18n.t()`.
3. `Header.init()`.
4. `FormValidator.init()`.

### Cumplimiento de rúbrica
- ✅ `DOMContentLoaded` garantiza que los elementos del DOM existen antes de que cualquier módulo intente accederlos.
- ✅ El `console.warn` de localStorage no disponible (líneas 983–987) es degradación elegante, no un error en consola.
- ✅ Está bien como está. No hay cambio propuesto.

---

## Evaluación global de la rúbrica — criterio Web Storage (10 pts)

| Indicador de la rúbrica | Estado |
|---|---|
| Se implementa `localStorage` o `sessionStorage` | ✅ `localStorage`, clave `byb_lang` |
| El dato almacenado es recuperado y aplicado al recargar | ✅ `i18n.init()` lo lee en cada carga de página |
| La lógica JS correspondiente es funcional | ✅ Sí, con manejo de excepciones |
| No genera errores en consola | ✅ Solo `console.warn` en modo degradación (nunca bajo uso normal) |
| JS nativo sin librerías externas | ✅ ES6+ puro, IIFE modules, `fetch` nativo |

**Conclusión:** el criterio Web Storage está cubierto al 100%. No hay ningún riesgo de descuento en este criterio.

---

## Resumen de cambios propuestos — ordenados por prioridad

| # | Módulo | Tipo | Descripción | Prioridad |
|---|---|---|---|---|
| 1 | `i18n` | Código muerto | Eliminar 8 claves huérfanas `service_4_*` y `service_6_*` (4 en ES, 4 en EN) — no tienen `data-i18n` en HTML | 🟡 Media |
| 2 | `StorageService` | Convención | Renombrar `_error` → `error` en los `catch` de `get()` (línea 69), `set()` (línea 84) y `remove()` (línea 98). En `isAvailable()` (línea 54) dejarlo con `_` — allí sí es correcto | 🟢 Baja |
| 3 | `FormValidator` | Consistencia | Reemplazar literal `'Enviando…' / 'Sending…'` (línea 938) por claves `i18n.t('form_submitting')` con entradas nuevas en ambos diccionarios | 🟢 Baja |
| 4 | `i18n` | Cosmético | Eliminar `navigator.userLanguage` (línea 431) — propiedad IE obsoleta que nunca se activa en navegadores modernos | 🔵 Info |
| 5 | `FormValidator` | Info / defensa | Token Airtable expuesto (líneas 888–891) — ya documentado en código; no cambiar para el lab, pero preparar explicación técnica para la defensa | 🔵 Info |

> **Ningún cambio en esta lista altera funcionalidad ni diseño.** Los ítems 1–3 son los únicos que tocan código ejecutable; los ítems 4–5 son informativos o de preparación para la defensa oral.
