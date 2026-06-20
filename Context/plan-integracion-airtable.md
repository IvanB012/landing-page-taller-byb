# Plan de Integración: Formulario de Contacto → Airtable

> Estado actual: NO existe ninguna integración todavía. No hay base de Airtable
> creada, no hay token generado, no hay código que llame a ninguna API externa
> desde el formulario. Este documento es el punto de partida para que
> Claude Code confirme contra el código real del proyecto qué existe, qué falta,
> y qué es viable, antes de escribir una sola línea.

---

## 1. Contexto y origen de la decisión

El plan original de este laboratorio era usar Formspree para que el formulario
de contacto enviara los datos al correo del taller. El profesor del curso
indicó que, en su lugar, se puede usar Airtable para que la información
ingresada por el usuario se almacene en una tabla tipo Excel, sin necesidad de
vincular un correo electrónico ni mantener un backend propio.

Este cambio es **temporal y consciente**: el proyecto no va a producción real,
solo se publicará en GitHub Pages para evaluación del profesor en la defensa
de este laboratorio. Después de la defensa, el plan es reemplazar esta
integración por una opción más segura (Formspree u otra que cifre el envío
hacia el correo del taller). Esto debe quedar documentado en el propio código
como nota explícita, no asumido tácitamente.

---

## 2. Restricción técnica que el enunciado del laboratorio exige (no negociable)

Toda la lógica debe implementarse en **JavaScript nativo, sin librerías ni
frameworks externos** (requisito explícito de la Sección 4.4 del enunciado
del Laboratorio #1: "La implementación debe realizarse en JavaScript nativo,
sin librerías externas"). La API de Airtable se puede consumir con `fetch()`
nativo del navegador — no requiere ningún SDK de Airtable. Cualquier
implementación que dependa de un paquete npm de Airtable o de un script de
terceros está descartada de entrada.

---

## 3. Cómo funciona la API de Airtable (resumen técnico)

- Cada base de Airtable tiene un ID que empieza con `app...`.
- Cada tabla dentro de la base tiene un nombre (visible en la URL o en la UI).
- Para crear un registro nuevo, se hace una petición:

```
POST https://api.airtable.com/v0/{BASE_ID}/{NOMBRE_TABLA}
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "fields": {
    "Nombre": "...",
    "Email": "...",
    "Mensaje": "..."
  }
}
```

- El token requerido es un **Personal Access Token (PAT)** generado desde la
  cuenta de Airtable, con scope restringido a:
  - Permiso: solo `data.records:write` (crear registros), nunca lectura ni
    borrado.
  - Alcance: solo la base específica de este proyecto, no acceso global a la
    cuenta.

---

## 4. Riesgo de seguridad aceptado (debe quedar explícito en el código)

Cualquier token usado directamente en JavaScript del lado del cliente es
**visible para cualquier persona que inspeccione el código fuente o las
herramientas de desarrollador del navegador**. Esto no es un descuido de
implementación: es una limitación estructural de hacer llamadas autenticadas
sin un backend o proxy intermedio.

Esta limitación se acepta deliberadamente en este entregable porque:
1. El profesor autorizó expresamente esta solución sin backend.
2. El proyecto no maneja datos sensibles reales ni va a producción.
3. El token se restringe a scope mínimo (solo crear registros, solo esta base).
4. Existe un plan posterior de migrar a una solución más segura.

El código final debe incluir un comentario visible explicando este trade-off,
para poder defenderlo con seguridad ante el profesor si se pregunta al
respecto — no como excusa, sino como decisión técnica consciente y
documentada.

---

## 5. Lo que Claude Code debe verificar ANTES de proponer cualquier cambio

Esto es una auditoría previa, no una ejecución. Ningún archivo debe
modificarse en esta fase. Se debe responder, con evidencia del código real:

1. **¿Dónde vive el formulario de contacto en `index.html`?**
   - ¿Qué atributos `name` o `id` tiene cada campo (nombre, email, teléfono,
     servicio, mensaje, lo que exista)?
   - ¿El formulario tiene `<form>` con su propio `id` o clase identificable?
   - ¿Hay validación HTML5 nativa ya implementada (`required`, `type="email"`,
     patrones)?

2. **¿Dónde vive la lógica de envío actual en `js/main.js`?**
   - ¿Existe ya una función `submitForm()` o equivalente?
   - ¿Qué hace exactamente hoy (simulación con `setTimeout`, validación,
     manejo de estados de éxito/error)?
   - ¿Cómo se muestra el feedback visual al usuario tras enviar (mensaje de
     éxito, mensaje de error)? Esa lógica de UI debe conservarse intacta;
     solo cambia qué pasa "por debajo" al confirmar el envío.

3. **¿Hay algún archivo de configuración o variables de entorno en el
   proyecto?**
   - Dado que esto es un sitio estático sin build tool ni backend, confirmar
     que no existe ningún mecanismo de variables de entorno real (`.env` no
     funciona en HTML/JS estático servido directo). Si no existe, el token
     necesariamente irá como constante en el código fuente — confirmar que
     se entiende esta implicación antes de seguir.

4. **¿El proyecto ya tiene `.gitignore`?**
   - Si en algún punto se decide separar el token en un archivo aparte (por
     ejemplo `js/config.js`) para al menos no mezclarlo con la lógica
     principal, verificar si tiene sentido añadir ese archivo a
     `.gitignore` — aunque el repositorio es público para el profesor, así
     que evaluar si esto aporta algo real o es una falsa sensación de
     seguridad en este caso específico (probablemente lo segundo, dado que
     el repo debe ser visible/colaborativo según el enunciado).

5. **¿Existen ya estilos o estados de CSS para mensajes de éxito/error del
   formulario?**
   - Confirmar en `css/components/_contact-form.css` (o donde corresponda
     según la arquitectura modular ya implementada) si ya hay clases como
     `.form-status--success` / `.form-status--error`, para no duplicar ni
     reinventar estilos que ya existen.

---

## 6. Qué falta crear, fuera del código (responsabilidad del usuario, no de Claude Code)

Antes de que el código funcione en la realidad, el usuario debe:
1. Crear una cuenta de Airtable (si no la tiene).
2. Crear una base nueva con una tabla cuyas columnas coincidan exactamente
   con los campos del formulario (esto se decide después de que Claude Code
   confirme el punto 5.1).
3. Generar un Personal Access Token con scope `data.records:write` limitado
   a esa base.
4. Entregar al proyecto: el Base ID, el nombre exacto de la tabla, y el
   token — estos tres valores son los únicos datos externos que el código
   necesitará.

Claude Code no debe inventar nombres de columnas ni asumir una estructura de
tabla; debe esperar a que estos datos existan y se confirmen.

---

## 7. Alcance del cambio en el código (una vez exista la base de Airtable)

Limitado estrictamente a:
- `js/main.js`: reemplazar el cuerpo de `submitForm()` (o la función
  equivalente que se confirme en la auditoría) para que, en lugar de simular
  con `setTimeout`, ejecute un `fetch()` real hacia el endpoint de Airtable,
  con el token y Base ID como constantes declaradas al inicio del archivo o
  módulo, claramente comentadas.
- Mapeo de los campos del formulario a los nombres de columna de Airtable.
- Conservar intacta toda la lógica de validación HTML5/JS existente, los
  estados visuales de éxito/error, y los textos i18n ya implementados — el
  cambio es únicamente "qué pasa cuando los datos ya son válidos y se
  confirma el envío", no cómo se valida ni cómo se muestra el feedback.
- Ningún cambio en `index.html` salvo que la auditoría del punto 5.1 revele
  que falta algún atributo `name` necesario para construir el payload.
- Ningún cambio en CSS.

---

## 8. Lo que NO se debe hacer bajo ninguna circunstancia

- No instalar ningún paquete npm, SDK de Airtable, ni librería de formularios.
- No introducir un backend, servidor Node, ni función serverless — eso queda
  fuera del alcance acordado para este entregable temporal.
- No reescribir la lógica de validación existente; solo conectar el resultado
  final a Airtable.
- No asumir nombres de columnas de Airtable que no hayan sido confirmados
  explícitamente por el usuario.
- No eliminar ni renombrar las claves i18n de los mensajes de estado del
  formulario.

---

## 9. Resultado esperado de esta fase

Claude Code debe responder primero con un informe de auditoría (puntos del
apartado 5) basado en el código real del repositorio, y solo después de esa
confirmación se procederá a pedir la implementación final, una vez el usuario
haya entregado Base ID, nombre de tabla y token.
