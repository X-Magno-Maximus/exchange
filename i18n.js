"use strict";
(() => {
  const STORAGE_KEY = "marxia-language";
  const supported = new Set(["en", "es"]);
  const messages = {
    en: {
      "common.language": "Language",
      "common.english": "English",
      "common.spanish": "Spanish",
      "common.settings": "Settings",
      "common.support": "Tech Support",
      "common.notifications": "Notifications",
      "common.back": "Go back",
      "common.save": "Save",
      "common.cancel": "Cancel",
      "common.loading": "Loading…",
      "common.error": "Something went wrong. Please try again."
    },
    es: {
      "common.language": "Idioma",
      "common.english": "Inglés",
      "common.spanish": "Español",
      "common.settings": "Ajustes",
      "common.support": "Soporte técnico",
      "common.notifications": "Notificaciones",
      "common.back": "Volver",
      "common.save": "Guardar",
      "common.cancel": "Cancelar",
      "common.loading": "Cargando…",
      "common.error": "Ocurrió un problema. Inténtalo de nuevo."
    }
  };

  let language = supported.has(localStorage.getItem(STORAGE_KEY))
    ? localStorage.getItem(STORAGE_KEY)
    : "en";

  const format = (text, values = {}) =>
    Object.entries(values).reduce(
      (result, [name, value]) => result.replaceAll(`{{${name}}}`, String(value)),
      text
    );

  const t = (key, values) => format(messages[language][key] ?? messages.en[key] ?? key, values);

  const localize = (root = document) => {
    document.documentElement.lang = language;
    root.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
    root.querySelectorAll("[data-i18n-label]").forEach(element => {
      element.setAttribute("aria-label", t(element.dataset.i18nLabel));
    });
    root.querySelectorAll("[data-i18n-title]").forEach(element => {
      element.title = t(element.dataset.i18nTitle);
    });
    document.dispatchEvent(new CustomEvent("marxia:languagechange", { detail: { language } }));
  };

  const setLanguage = locale => {
    if (!supported.has(locale)) return false;
    language = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    localize();
    return true;
  };

  const register = (locale, additions) => {
    if (!supported.has(locale) || !additions || typeof additions !== "object") return false;
    Object.assign(messages[locale], additions);
    return true;
  };

  window.MarxiaI18n = {
    get language() { return language; },
    t,
    localize,
    register,
    setLanguage
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => localize(), { once: true });
  } else {
    localize();
  }
})();
