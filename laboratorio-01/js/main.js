/**
 * ================================================================
 * TALLER MECÁNICO ByB — Script principal
 * Archivo : js/main.js
 * Módulos :
 *   1. StorageService    — Abstracción segura de localStorage
 *   2. i18n              — Sistema de internacionalización
 *   3. Header            — Comportamiento del encabezado / nav
 *   4. FormValidator     — Validación accesible del formulario
 *   5. Init              — Orquestador de arranque
 *
 * Estándar : Vanilla JS ES6+ (sin librerías externas)
 * Autor    : Iván Barboza Blanco — ISW-521, UTN
 * ================================================================
 */

'use strict';

/* ================================================================
   MÓDULO 1 — StorageService
   ----------------------------------------------------------------
   Encapsula todas las operaciones sobre localStorage en un único
   objeto. El motivo de esta abstracción es doble:

   1. DEFENSA TÉCNICA DE ELECCIÓN: localStorage persiste entre
      sesiones (incluso después de cerrar el navegador), a diferencia
      de sessionStorage que se borra al cerrar la pestaña. La
      preferencia de idioma debe sobrevivir recargas y reaperturas,
      por lo que localStorage es la elección correcta.

   2. CONTROL DE EXCEPCIONES: localStorage puede lanzar excepciones
      en tres escenarios reales:
        a) Modo incógnito en Safari (bloqueo completo de acceso).
        b) Cuota de almacenamiento superada (setItem lanza
           DOMException: QuotaExceededError).
        c) Políticas de seguridad restrictivas (iframes, extensiones).
      Todos los métodos atrapan esos errores y degradan con gracia:
      el sitio funciona normalmente pero sin persistencia.
   ================================================================ */

const StorageService = (() => {

  /** Verifica si localStorage está disponible en este entorno.
   *  La verificación no puede hacerse solo con typeof, porque en
   *  algunos navegadores el objeto existe pero lanza al accederse.
   *  @returns {boolean}
   */
  function isAvailable() {
    try {
      const testKey = '__byb_storage_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch (_error) {
      return false;
    }
  }

  /** Lee un valor del almacenamiento.
   *  @param {string} key
   *  @param {*} defaultValue — Valor de retorno si la clave no existe
   *                            o si el almacenamiento no está disponible.
   *  @returns {string|*}
   */
  function get(key, defaultValue = null) {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (_error) {
      console.warn(`[StorageService] No se pudo leer la clave "${key}".`, _error);
      return defaultValue;
    }
  }

  /** Escribe un valor en el almacenamiento.
   *  @param {string} key
   *  @param {string} value
   *  @returns {boolean} — true si la escritura fue exitosa.
   */
  function set(key, value) {
    try {
      localStorage.setItem(key, String(value));
      return true;
    } catch (_error) {
      console.warn(`[StorageService] No se pudo escribir la clave "${key}".`, _error);
      return false;
    }
  }

  /** Elimina una clave del almacenamiento.
   *  @param {string} key
   *  @returns {boolean}
   */
  function remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (_error) {
      console.warn(`[StorageService] No se pudo eliminar la clave "${key}".`, _error);
      return false;
    }
  }

  // API pública del módulo
  return { isAvailable, get, set, remove };

})();


/* ================================================================
   MÓDULO 2 — i18n (Internacionalización)
   ----------------------------------------------------------------
   Sistema de traducción basado en objetos de diccionario planos.
   Cada clave de traducción (token) coincide exactamente con el
   atributo data-i18n del HTML correspondiente.

   Flujo de aplicación:
     1. Se lee el idioma guardado en localStorage (clave: 'byb_lang').
     2. Si no hay valor, se detecta el idioma del navegador.
     3. Se aplica el diccionario al DOM: textContent para nodos de
        texto, placeholder y aria-label para atributos.
     4. Se actualiza el atributo lang del elemento <html> para que
        los lectores de pantalla anuncien el idioma correcto.
     5. Los botones ES/EN actualizan su estado aria-pressed.
   ================================================================ */

const i18n = (() => {

  /* ── Clave de almacenamiento ─────────────────────────────────── */
  const STORAGE_KEY = 'byb_lang';
  const SUPPORTED_LANGS = ['es', 'en'];
  const DEFAULT_LANG = 'es';

  /* ── Diccionarios de traducción ──────────────────────────────── */

  const translations = {

    /* ----------------------------------------------------------
       ESPAÑOL
       ---------------------------------------------------------- */
    es: {
      // Logo
      logo_alt: 'Logotipo oficial de Taller Mecánico ByB',

      // Skip link
      skip_link: 'Saltar al contenido principal',

      // Navegación
      nav_home:     'Inicio',
      nav_services: 'Servicios',
      nav_about:    'Nosotros',
      nav_gallery:  'Galería',
      nav_reviews:  'Reseñas',
      nav_contact:  'Contacto',

      // Botón hamburguesa (aria)
      nav_toggle_open:  'Abrir menú de navegación',
      nav_toggle_close: 'Cerrar menú de navegación',

      // Hero
      hero_eyebrow:       'Taller Mecánico en Costa Rica',
      hero_title:         'Tu vehículo en manos expertas',
      hero_subtitle:      'Diagnóstico preciso, reparación garantizada y atención personalizada para toda clase de vehículos.',
      hero_cta_primary:   'Agendar cita',
      hero_cta_secondary: 'Ver servicios',

      // Servicios
      services_title:    'Nuestros Servicios',
      services_subtitle: 'Soluciones completas para el mantenimiento y reparación de su vehículo.',

      service_1_title: 'Diagnóstico Computarizado',
      service_1_desc:  'Escáner OBD avanzado para detectar fallas electrónicas con precisión en cualquier sistema del vehículo.',
      service_2_title: 'Cambio de Aceite y Filtros',
      service_2_desc:  'Mantenimiento preventivo con aceites de la más alta calidad y reemplazo completo de filtros.',
      service_3_title: 'Mecánica General',
      service_3_desc:  'Reparación de motor, frenos, suspensión, transmisión y todos los sistemas mecánicos del vehículo.',
      service_4_title: 'Aire Acondicionado',
      service_4_desc:  'Revisión, recarga y reparación del sistema de climatización para viajes siempre confortables.',
      service_5_title: 'Sistema Eléctrico',
      service_5_desc:  'Diagnóstico y corrección de fallas eléctricas: batería, alternador, arranque y cableado general.',
      service_6_title: 'Alineación y Balanceo',
      service_6_desc:  'Alineación computarizada de dirección y balanceo de ruedas para mayor seguridad y durabilidad de sus llantas.',

      // Nosotros
      about_title:  'Quiénes Somos',
      about_text_1: 'Somos un taller mecánico familiar con más de 15 años de experiencia atendiendo vehículos en la zona norte de Costa Rica. Nuestra prioridad es la honestidad, la calidad del trabajo y la satisfacción total de cada cliente que nos confía su vehículo.',
      about_text_2: 'Contamos con técnicos certificados, equipos de diagnóstico de última generación y un compromiso firme con los tiempos de entrega acordados.',
      about_cta:    'Contáctenos',

      // Galería
      gallery_title:    'Nuestra Galería',
      gallery_subtitle: 'Un vistazo a nuestras instalaciones y trabajos realizados.',

      // Reseñas
      reviews_title:    'Lo que dicen nuestros clientes',
      reviews_subtitle: 'La confianza de quienes ya nos conocen.',

      review_1_name: 'Yohel Barrantes',
      review_1_text: 'Llevé mi Tacoma en 2 ocasiones y la verdad nunca he recibido una atención tan buena, se preocupan mucho por los detalles y buscan solucionar cada problema hasta que el carro quede en perfectas condiciones, super recomendado.',
      review_2_name: 'Erick Rojas',
      review_2_text: 'Sé perfectamente lo difícil que es encontrar un taller con buen ojo para los detalles del motor y la suspensión. Suelo traer mis vehículos frecuentemente porque solo se lo confío a ellos; el diagnóstico siempre es preciso y el servicio es de primera calidad.',
      review_3_name: 'Adriel Córtes',
      review_3_text: 'Les llevé mi Can-Am Outlander porque andaba con un fallo en la transmisión y me lo dejaron como nuevo. En un par de días ya lo tenía listo para volver a usarlo sin problemas. Se nota que le entran de verdad a cualquier motor, 10 de 10.',

      // Contacto — títulos de sección
      contact_title:    'Contáctenos',
      contact_subtitle: 'Estamos listos para atenderle. Escríbanos o visítenos.',

      // Contacto — formulario
      contact_form_title: 'Envíenos un mensaje',

      form_label_name:    'Nombre completo',
      form_label_email:   'Correo electrónico',
      form_label_phone:   'Teléfono',
      form_label_subject: 'Asunto',
      form_label_message: 'Mensaje',
      form_optional:      '(opcional)',

      form_placeholder_name:    'Ej.: Juan Pérez',
      form_placeholder_email:   'correo@ejemplo.com',
      form_placeholder_phone:   '8888-8888',
      form_placeholder_message: 'Describa brevemente el servicio que necesita o su consulta…',

      form_hint_phone: 'Formato: 8888-8888',

      form_subject_default: 'Seleccione un asunto…',
      form_subject_diag:    'Diagnóstico computarizado',
      form_subject_maint:   'Mantenimiento preventivo',
      form_subject_repair:  'Reparación general',
      form_subject_quote:   'Solicitar presupuesto',
      form_subject_other:   'Otro',

      form_submit: 'Enviar mensaje',

      // Mensajes de validación del formulario
      form_error_name:    'Por favor ingrese su nombre completo.',
      form_error_email:   'Por favor ingrese un correo electrónico válido.',
      form_error_subject: 'Por favor seleccione un asunto.',
      form_error_message: 'Por favor ingrese su mensaje (mínimo 10 caracteres).',

      // Etiquetas aria del formulario
      form_required_hint: 'Los campos marcados con * son obligatorios.',

      // Respuesta del formulario
      form_status_success: '¡Mensaje enviado con éxito! Le responderemos a la brevedad.',
      form_status_error:   'Ocurrió un error al enviar el mensaje. Por favor intente de nuevo.',

      // Contacto — Horarios
      contact_hours_title:    'Horario de Atención',
      hours_weekdays:         'Lunes – Viernes',
      hours_weekdays_time:    '7:00 a.m. – 6:00 p.m.',
      hours_saturday:         'Sábado',
      hours_saturday_time:    'Cerrado',
      hours_sunday:           'Domingo',
      hours_sunday_time:      'Cerrado',

      // Contacto — Redes sociales
      contact_social_title:     'Síguenos',
      social_facebook_label:    'Facebook',
      social_whatsapp_label:    'WhatsApp',
      social_facebook:          'Facebook de Taller ByB (abre en nueva pestaña)',
      social_whatsapp:          'WhatsApp de Taller ByB (abre en nueva pestaña)',

      // Contacto — Información de contacto
      contact_info_title:    'Información de Contacto',
      contact_address_label: 'Dirección',
      contact_address_value: '150 m sureste del Colegio Técnico Profesional de Venecia, San Carlos, Alajuela, Costa Rica',
      contact_phone_label:   'Teléfono',
      contact_phone_value:   '6187-3968',
      contact_email_label:   'Correo electrónico',
      contact_email_value:   'melbarh@gmail.com',

      // Footer
      footer_copy:    '© 2026 Taller Mecánico ByB. Todos los derechos reservados.',
    },

    /* ----------------------------------------------------------
       ENGLISH
       ---------------------------------------------------------- */
    en: {
      // Logo
      logo_alt: 'Official logo of ByB Mechanic Workshop',

      // Skip link
      skip_link: 'Skip to main content',

      // Navigation
      nav_home:     'Home',
      nav_services: 'Services',
      nav_about:    'About',
      nav_gallery:  'Gallery',
      nav_reviews:  'Reviews',
      nav_contact:  'Contact',

      // Hamburger button (aria)
      nav_toggle_open:  'Open navigation menu',
      nav_toggle_close: 'Close navigation menu',

      // Hero
      hero_eyebrow:       'Auto Repair Shop in Costa Rica',
      hero_title:         'Your vehicle in expert hands',
      hero_subtitle:      'Precise diagnostics, guaranteed repairs and personalized service for all types of vehicles.',
      hero_cta_primary:   'Book appointment',
      hero_cta_secondary: 'View services',

      // Services
      services_title:    'Our Services',
      services_subtitle: 'Complete solutions for the maintenance and repair of your vehicle.',

      service_1_title: 'Computerized Diagnostics',
      service_1_desc:  'Advanced OBD scanner to accurately detect electronic faults in any vehicle system.',
      service_2_title: 'Oil & Filter Change',
      service_2_desc:  'Preventive maintenance using the highest-quality oils and full filter replacement.',
      service_3_title: 'General Mechanics',
      service_3_desc:  'Engine, brake, suspension, transmission and all mechanical system repairs.',
      service_4_title: 'Air Conditioning',
      service_4_desc:  'Inspection, recharge and repair of the climate system for always-comfortable rides.',
      service_5_title: 'Electrical System',
      service_5_desc:  'Diagnosis and repair of electrical faults: battery, alternator, starter and general wiring.',
      service_6_title: 'Wheel Alignment & Balancing',
      service_6_desc:  'Computerized steering alignment and wheel balancing for greater safety and tire longevity.',

      // About
      about_title:  'Who We Are',
      about_text_1: 'We are a family-owned auto repair shop with over 15 years of experience serving vehicles in the northern zone of Costa Rica. Our priority is honesty, quality of work, and the complete satisfaction of every customer who trusts us with their vehicle.',
      about_text_2: 'We have certified technicians, state-of-the-art diagnostic equipment, and a firm commitment to agreed delivery times.',
      about_cta:    'Contact Us',

      // Gallery
      gallery_title:    'Our Gallery',
      gallery_subtitle: 'A look at our facilities and completed work.',

      // Reviews
      reviews_title:    'What our customers say',
      reviews_subtitle: 'The trust of those who already know us.',

      review_1_name: 'Yohel Barrantes',
      review_1_text: 'I brought my Tacoma in twice and I have never received such great service — they pay close attention to every detail and work to solve each issue until the car is in perfect condition. Highly recommended.',
      review_2_name: 'Erick Rojas',
      review_2_text: 'I know how hard it is to find a shop with a sharp eye for engine and suspension details. I bring my vehicles here regularly because I trust no one else; the diagnosis is always accurate and the service is top quality.',
      review_3_name: 'Adriel Córtes',
      review_3_text: 'I brought in my Can-Am Outlander because it had a transmission fault and they left it good as new. In a couple of days it was ready to use again without any issues. You can tell they really know how to handle any engine — 10 out of 10.',

      // Contact — section headings
      contact_title:    'Contact Us',
      contact_subtitle: 'We are ready to serve you. Write to us or visit us.',

      // Contact — form
      contact_form_title: 'Send us a message',

      form_label_name:    'Full name',
      form_label_email:   'Email address',
      form_label_phone:   'Phone',
      form_label_subject: 'Subject',
      form_label_message: 'Message',
      form_optional:      '(optional)',

      form_placeholder_name:    'E.g.: John Smith',
      form_placeholder_email:   'email@example.com',
      form_placeholder_phone:   '8888-8888',
      form_placeholder_message: 'Briefly describe the service you need or your inquiry…',

      form_hint_phone: 'Format: 8888-8888',

      form_subject_default: 'Select a subject…',
      form_subject_diag:    'Computerized diagnostics',
      form_subject_maint:   'Preventive maintenance',
      form_subject_repair:  'General repair',
      form_subject_quote:   'Request a quote',
      form_subject_other:   'Other',

      form_submit: 'Send message',

      // Form validation messages
      form_error_name:    'Please enter your full name.',
      form_error_email:   'Please enter a valid email address.',
      form_error_subject: 'Please select a subject.',
      form_error_message: 'Please enter your message (minimum 10 characters).',

      // Form aria labels
      form_required_hint: 'Fields marked with * are required.',

      // Form submission response
      form_status_success: 'Message sent successfully! We will reply shortly.',
      form_status_error:   'An error occurred while sending your message. Please try again.',

      // Contact — Business hours
      contact_hours_title:    'Business Hours',
      hours_weekdays:         'Monday – Friday',
      hours_weekdays_time:    '7:00 a.m. – 6:00 p.m.',
      hours_saturday:         'Saturday',
      hours_saturday_time:    'Closed',
      hours_sunday:           'Sunday',
      hours_sunday_time:      'Closed',

      // Contact — Social media
      contact_social_title:     'Follow Us',
      social_facebook_label:    'Facebook',
      social_whatsapp_label:    'WhatsApp',
      social_facebook:          'ByB Workshop on Facebook (opens in new tab)',
      social_whatsapp:          'ByB Workshop on WhatsApp (opens in new tab)',

      // Contact — Contact information
      contact_info_title:    'Contact Information',
      contact_address_label: 'Address',
      contact_address_value: '150 m southeast of the Colegio Técnico Profesional de Venecia, San Carlos, Alajuela, Costa Rica',
      contact_phone_label:   'Phone',
      contact_phone_value:   '6187-3968',
      contact_email_label:   'Email',
      contact_email_value:   'melbarh@gmail.com',

      // Footer
      footer_copy:    '© 2026 Taller Mecánico ByB. All rights reserved.',
    },

  }; // fin translations

  /* ── Estado interno del módulo ──────────────────────────────── */
  let currentLang = DEFAULT_LANG;

  /* ── Métodos privados ───────────────────────────────────────── */

  /** Detecta el idioma preferido del navegador, acotado a los
   *  idiomas soportados. Útil como fallback cuando no hay valor
   *  guardado en localStorage.
   *  @returns {string} — 'es' | 'en'
   */
  function detectBrowserLang() {
    // navigator.language devuelve 'es-CR', 'en-US', etc.
    // Tomamos solo los dos primeros caracteres.
    const browserLang = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    return SUPPORTED_LANGS.includes(browserLang) ? browserLang : DEFAULT_LANG;
  }

  /** Aplica una traducción (textContent) a todos los elementos del
   *  DOM que tienen el atributo data-i18n con la clave dada.
   *  Se actualiza el nodo de texto directamente para evitar
   *  sobreescribir nodos hijos (ej.: spans de íconos dentro de botones).
   *  @param {string} lang
   */
  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    // ── Nodos de texto: [data-i18n] ──────────────────────────────
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // innerHTML permite usar <br> en la dirección pero sigue siendo
        // contenido controlado (viene de nuestro propio diccionario),
        // no de input del usuario — no hay riesgo de XSS aquí.
        el.innerHTML = dict[key];
      }
    });

    // ── Placeholders: [data-i18n-placeholder] ────────────────────
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // ── Atributos alt: [data-i18n-alt] ───────────────────
    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      if (dict[key] !== undefined) {
        el.setAttribute('alt', dict[key]);
      }
    });

    // ── Atributos aria-label: [data-i18n-aria] ───────────────────
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) {
        el.setAttribute('aria-label', dict[key]);
      }
    });

    // ── Atributo lang del elemento raíz ──────────────────────────
    // Criterio WCAG 3.1.1: el idioma de la página debe estar
    // indicado mediante el atributo lang de <html>. Los lectores
    // de pantalla lo usan para seleccionar el motor de síntesis de
    // voz correcto.
    document.documentElement.setAttribute('lang', lang);
  }

  /** Actualiza el estado visual y ARIA de los botones de idioma.
   *  aria-pressed="true/false" comunica el estado de un toggle
   *  button a tecnologías asistivas.
   *  @param {string} lang
   */
  function updateLangButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.classList.toggle('lang-btn--active', isActive);
    });
  }

  /* ── API pública ────────────────────────────────────────────── */

  /** Inicializa el módulo: carga el idioma guardado o detectado,
   *  aplica las traducciones y registra los event listeners.
   */
  function init() {
    // Prioridad: 1) localStorage, 2) idioma del navegador, 3) DEFAULT_LANG
    const saved = StorageService.get(STORAGE_KEY);
    currentLang = SUPPORTED_LANGS.includes(saved) ? saved : detectBrowserLang();

    applyTranslations(currentLang);
    updateLangButtons(currentLang);

    // Registrar listeners en los botones de cambio de idioma
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang && lang !== currentLang) {
          setLang(lang);
        }
      });
    });
  }

  /** Cambia el idioma activo, persiste en localStorage y re-aplica.
   *  @param {string} lang
   */
  function setLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;
    currentLang = lang;
    applyTranslations(lang);
    updateLangButtons(lang);
    StorageService.set(STORAGE_KEY, lang);

    // Anunciar el cambio a lectores de pantalla mediante una región
    // aria-live existente (usaremos el form-status si está vacío,
    // o creamos un nodo temporal de anuncio).
    announceToScreenReader(
      lang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English'
    );
  }

  /** Devuelve el idioma actualmente activo.
   *  @returns {string}
   */
  function getLang() {
    return currentLang;
  }

  /** Devuelve la traducción de una clave para el idioma activo.
   *  Útil para obtener mensajes de error en validación JS.
   *  @param {string} key
   *  @returns {string}
   */
  function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
  }

  return { init, setLang, getLang, t };

})();


/* ================================================================
   UTILIDAD GLOBAL — announceToScreenReader
   ----------------------------------------------------------------
   Crea un nodo aria-live="polite" temporal para anunciar mensajes
   que no están asociados a ningún elemento visible del DOM.
   Se usa para anunciar cambios de idioma y otras acciones JS.
   ================================================================ */

function announceToScreenReader(message) {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');

  // Posicionamiento fuera de la vista (técnica "visually-hidden")
  Object.assign(announcer.style, {
    position:   'absolute',
    width:      '1px',
    height:     '1px',
    padding:    '0',
    margin:     '-1px',
    overflow:   'hidden',
    clip:       'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border:     '0',
  });

  document.body.appendChild(announcer);

  // El navegador necesita un tick para registrar el nodo antes
  // de que se le asigne texto, de lo contrario no lo anuncia.
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });

  // Eliminar el nodo tras 3 s para no ensuciar el DOM
  setTimeout(() => announcer.remove(), 3000);
}


/* ================================================================
   MÓDULO 3 — Header
   ----------------------------------------------------------------
   Responsabilidades:
     a) Menú hamburguesa: toggle de visibilidad + estado ARIA.
     b) Clase "scrolled" en el header al desplazarse.
     c) Cerrar el menú al hacer clic en un enlace de navegación
        (Single Page Application pattern: todas las secciones
        están en la misma página).
     d) Resaltar el enlace activo según la sección visible
        (Intersection Observer API).
   ================================================================ */

const Header = (() => {

  let headerEl, navToggle, mainNav;
  let isOpen = false;

  /** Abre o cierra el menú móvil.
   *  @param {boolean} open
   */
  function setMenuOpen(open) {
    isOpen = open;
    mainNav.classList.toggle('main-nav--open', open);
    navToggle.setAttribute('aria-expanded', String(open));

    // Actualizar aria-label del botón según estado
    navToggle.setAttribute(
      'aria-label',
      open ? i18n.t('nav_toggle_close') : i18n.t('nav_toggle_open')
    );
  }

  /** Agrega la clase visual cuando el usuario hace scroll */
  function onScroll() {
    const scrolled = window.scrollY > 10;
    headerEl.classList.toggle('site-header--scrolled', scrolled);
  }

  /** Intersection Observer: resalta el enlace activo según la sección visible. */
  function initActiveNavLink() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.main-nav__link');

    if (!sections.length || !navLinks.length) return;

    // Altura real renderizada del header (px), sin necesidad de parsear rem.
    const headerHeightPx = headerEl.offsetHeight || 64;

    // Mapa id-de-sección → elemento <a> del nav para búsqueda O(1).
    const linkMap = new Map();
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) linkMap.set(href.slice(1), link);
    });

    function setActiveLink(id) {
      navLinks.forEach((link) => link.classList.remove('main-nav__link--active'));
      const target = linkMap.get(id);
      if (target) target.classList.add('main-nav__link--active');
    }

    // Conjunto de secciones actualmente dentro de la zona de detección.
    const visibleSections = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target);
          } else {
            visibleSections.delete(entry.target);
          }
        });

        // Si la zona queda vacía (p. ej. scroll más allá de la última sección),
        // se mantiene el enlace activo actual en lugar de borrarlo.
        if (!visibleSections.size) return;

        // De las secciones visibles, activar la que tenga el borde superior
        // más alto en el viewport (la que el usuario está leyendo actualmente).
        let activeSection = null;
        visibleSections.forEach((section) => {
          if (
            !activeSection ||
            section.getBoundingClientRect().top < activeSection.getBoundingClientRect().top
          ) {
            activeSection = section;
          }
        });

        if (activeSection) setActiveLink(activeSection.id);
      },
      {
        // Superior: compensar la altura del header fijo para que las secciones
        // ocultas detrás de él nunca se consideren activas.
        // Inferior: reducir el 50 % para que solo el semipanel superior del
        // viewport (bajo el header) actúe como zona de activación.
        rootMargin: `-${headerHeightPx}px 0px -50% 0px`,
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function init() {
    headerEl  = document.querySelector('.site-header');
    navToggle = document.querySelector('.nav-toggle');
    mainNav   = document.querySelector('.main-nav');

    if (!headerEl || !navToggle || !mainNav) return;

    // Toggle del menú
    navToggle.addEventListener('click', () => setMenuOpen(!isOpen));

    // Cerrar al hacer clic en cualquier enlace del nav móvil
    mainNav.querySelectorAll('.main-nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        if (isOpen) setMenuOpen(false);
      });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (isOpen && !headerEl.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });

    // Comportamiento al hacer scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Estado inicial

    // Enlace activo
    initActiveNavLink();
  }

  return { init };

})();



/* ================================================================
   MÓDULO 4 — FormValidator
   ----------------------------------------------------------------
   Validación accesible del formulario de contacto.

   Principios de diseño:
     - El atributo novalidate en el <form> desactiva la validación
       nativa del navegador, que no es estilizable ni traducible.
       El JS retoma el control total.
     - Los mensajes de error se inyectan en los spans con role="alert"
       aria-live="polite" ya definidos en el HTML, de modo que los
       lectores de pantalla los anuncian automáticamente sin que el
       usuario tenga que navegar hasta ellos.
     - Se valida campo por campo al perder el foco (evento blur)
       para feedback inmediato, y el formulario completo al enviar.
     - El estado aria-invalid="true/false" en cada campo comunica
       su validez a tecnologías asistivas de forma estándar.
   ================================================================ */

const FormValidator = (() => {

  let form;

  /* ── Reglas de validación ────────────────────────────────────── */

  const rules = {
    'field-name': {
      validate: (v) => v.trim().length >= 2,
      errorKey: 'form_error_name',
    },
    'field-email': {
      // RFC 5322 simplificado: usuario@dominio.extensión
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      errorKey: 'form_error_email',
    },
    'field-subject': {
      validate: (v) => v !== '',
      errorKey: 'form_error_subject',
    },
    'field-message': {
      validate: (v) => v.trim().length >= 10,
      errorKey: 'form_error_message',
    },
    // field-phone es opcional: no tiene regla obligatoria
  };

  /* ── Métodos privados ───────────────────────────────────────── */

  /** Valida un campo individual y actualiza su UI de error.
   *  @param {HTMLElement} field
   *  @returns {boolean} — true si el campo es válido.
   */
  function validateField(field) {
    const rule = rules[field.id];
    if (!rule) return true; // Campo sin regla = siempre válido

    const isValid = rule.validate(field.value);

    // Actualizar aria-invalid para lectores de pantalla
    field.setAttribute('aria-invalid', String(!isValid));

    // Inyectar o limpiar el mensaje de error en el span asociado
    const errorEl = document.getElementById(`${field.id.replace('field-', '')}-error`);
    if (errorEl) {
      errorEl.textContent = isValid ? '' : i18n.t(rule.errorKey);
    }

    return isValid;
  }

  /** Valida todos los campos del formulario.
   *  @returns {boolean} — true si todos los campos son válidos.
   */
  function validateAll() {
    const fields = form.querySelectorAll('[id^="field-"]');
    let allValid = true;
    let firstInvalid = null;

    fields.forEach((field) => {
      const valid = validateField(field);
      if (!valid) {
        allValid = false;
        if (!firstInvalid) firstInvalid = field;
      }
    });

    // Mover el foco al primer campo inválido para guiar al usuario
    if (firstInvalid) {
      firstInvalid.focus();
    }

    return allValid;
  }

  /** Muestra el mensaje de estado tras el envío del formulario.
   *  @param {'success'|'error'} type
   */
  function showFormStatus(type) {
    const statusEl = document.getElementById('form-status');
    if (!statusEl) return;

    statusEl.textContent = i18n.t(`form_status_${type}`);
    statusEl.className   = `form-status form-status--${type}`;
  }

  /** Resetea completamente el formulario y limpia los mensajes. */
  function resetForm() {
    form.reset();

    // Limpiar todos los mensajes de error y aria-invalid
    form.querySelectorAll('[id^="field-"]').forEach((field) => {
      field.removeAttribute('aria-invalid');
    });
    form.querySelectorAll('.form-error').forEach((el) => {
      el.textContent = '';
    });

    const statusEl = document.getElementById('form-status');
    if (statusEl) {
      statusEl.textContent = '';
      statusEl.className   = 'form-status';
    }
  }

  /*
   * INTEGRACIÓN TEMPORAL — AIRTABLE (evaluación del laboratorio en GitHub Pages)
   * El PAT queda expuesto en el código fuente del cliente. Esto es una limitación
   * estructural de sitios estáticos sin backend y una decisión consciente:
   * el token tiene scope mínimo (data.records:write, solo esta base) y el proyecto
   * no maneja datos sensibles ni va a producción real. Después de la defensa,
   * migrar a Formspree u otra solución con proxy para proteger credenciales.
   */
  const AIRTABLE_ENDPOINT =
    'https://api.airtable.com/v0/appjCLy5yKilg4zav/Contactos';
  const AIRTABLE_TOKEN =
    'patGPwEkXX2A2NA0F.61214bef7902b54a5e22d9bead228ddbe38805e29d8cd031e256b946679a7088';

  /** Envía los datos del formulario a Airtable con fetch nativo.
   *  @returns {Promise<boolean>}
   */
  async function submitForm() {
    const payload = {
      fields: {
        Name:    form.querySelector('#field-name').value.trim(),
        email:   form.querySelector('#field-email').value.trim(),
        phone:   form.querySelector('#field-phone').value.trim(),
        subject: form.querySelector('#field-subject').value,
        message: form.querySelector('#field-message').value.trim(),
      },
    };

    const res = await fetch(AIRTABLE_ENDPOINT, {
      method:  'POST',
      headers: {
        Authorization:  `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  function init() {
    form = document.getElementById('contact-form');
    if (!form) return;

    // Validación en tiempo real: al perder el foco de cada campo
    form.querySelectorAll('[id^="field-"]').forEach((field) => {
      field.addEventListener('blur', () => validateField(field));
    });

    // Envío del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevenir recarga de página

      if (!validateAll()) return; // Detener si hay errores

      // Estado de carga: deshabilitar botón de envío
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = i18n.getLang() === 'es' ? 'Enviando…' : 'Sending…';

      try {
        const success = await submitForm();

        if (success) {
          showFormStatus('success');
          resetForm();
        } else {
          showFormStatus('error');
        }
      } catch (_error) {
        showFormStatus('error');
      } finally {
        // Rehabilitar botón siempre, incluso si hubo error
        submitBtn.disabled    = false;
        submitBtn.textContent = originalText;
      }
    });
  }

  return { init };

})();


/* ================================================================
   MÓDULO 5 — Init (Orquestador de arranque)
   ----------------------------------------------------------------
   Punto de entrada único del script. Inicializa todos los módulos
   en el orden correcto una vez que el DOM está completamente cargado.

   Se usa DOMContentLoaded en lugar de window.load porque:
     - DOMContentLoaded se dispara cuando el HTML fue parseado
       completamente, sin esperar imágenes ni recursos externos.
     - Permite que los módulos encuentren los elementos del DOM
       inmediatamente, sin retrasos por imágenes grandes.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. StorageService — verificar disponibilidad una vez al arrancar.
  //    Si no está disponible, el sitio funciona normalmente
  //    pero sin persistencia de preferencias (degradación elegante).
  if (!StorageService.isAvailable()) {
    console.warn(
      '[ByB] localStorage no está disponible en este entorno. ' +
      'Las preferencias del usuario (idioma) no se persistirán entre sesiones. ' +
      'El sitio funcionará correctamente sin persistencia.'
    );
  }

  // 2. i18n — debe inicializarse primero: los demás módulos
  //    pueden llamar a i18n.t() para obtener cadenas traducidas.
  i18n.init();

  // 3. Header — navegación y comportamiento de scroll
  Header.init();

  // 4. FormValidator — validación del formulario de contacto
  FormValidator.init();

});