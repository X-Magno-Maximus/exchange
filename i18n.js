"use strict";
(() => {
  const STORAGE_KEY = "marxia-language";
  const supported = new Set(["en", "es"]);
  const messages = {
  "en": {
    "common.language": "Language",
    "common.english": "English",
    "common.spanish": "Spanish",
    "common.settings": "Settings",
    "common.support": "IT Support",
    "common.notifications": "Notifications",
    "common.back": "Back to overview",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.close": "Close",
    "common.search": "Search",
    "common.loading": "Loading…",
    "common.error": "Something went wrong. Please try again.",
    "exchange.title": "Platform Owner",
    "exchange.subtitle": "Govern tenants, services, security, integrations, and platform health.",
    "exchange.overview": "Platform overview",
    "exchange.tenants": "Tenants",
    "exchange.businesses": "Businesses",
    "exchange.consumers": "Consumers",
    "exchange.staff": "Staff and employees",
    "exchange.contractors": "Independent contractors",
    "exchange.logistics": "Logistics",
    "exchange.support": "IT Support",
    "exchange.integrations": "Integrations",
    "exchange.billing": "Platform billing",
    "exchange.reports": "Reports",
    "exchange.audit": "Audit history",
    "exchange.security": "Security center",
    "exchange.health": "Service health",
    "tenant.active": "Active tenant",
    "tenant.suspended": "Suspended tenant",
    "tenant.pending": "Pending approval",
    "tenant.owner": "Business owner",
    "tenant.id": "Tenant ID",
    "tenant.plan": "Subscription plan",
    "tenant.created": "Created",
    "tenant.lastActivity": "Last activity",
    "action.review": "Review",
    "action.approve": "Approve",
    "action.suspend": "Suspend",
    "action.restore": "Restore access",
    "action.open": "Open dashboard",
    "action.export": "Export report",
    "action.investigate": "Investigate",
    "security.godsEye": "Privileged platform-owner access",
    "security.reauth": "Re-authentication is required.",
    "security.denied": "Access denied.",
    "security.leastPrivilege": "Access is limited by role and tenant.",
    "audit.recorded": "This action was recorded in the audit history."
  },
  "es": {
    "common.language": "Idioma",
    "common.english": "Inglés",
    "common.spanish": "Español",
    "common.settings": "Configuración",
    "common.support": "Soporte de TI",
    "common.notifications": "Notificaciones",
    "common.back": "Volver al resumen",
    "common.save": "Guardar",
    "common.cancel": "Cancelar",
    "common.close": "Cerrar",
    "common.search": "Buscar",
    "common.loading": "Cargando…",
    "common.error": "Ocurrió un problema. Inténtalo de nuevo.",
    "exchange.title": "Propietario de la plataforma",
    "exchange.subtitle": "Administra inquilinos, servicios, seguridad, integraciones y el estado de la plataforma.",
    "exchange.overview": "Resumen de la plataforma",
    "exchange.tenants": "Inquilinos",
    "exchange.businesses": "Negocios",
    "exchange.consumers": "Consumidores",
    "exchange.staff": "Personal y empleados",
    "exchange.contractors": "Contratistas independientes",
    "exchange.logistics": "Logística",
    "exchange.support": "Soporte de TI",
    "exchange.integrations": "Integraciones",
    "exchange.billing": "Facturación de la plataforma",
    "exchange.reports": "Informes",
    "exchange.audit": "Historial de auditoría",
    "exchange.security": "Centro de seguridad",
    "exchange.health": "Estado de los servicios",
    "tenant.active": "Inquilino activo",
    "tenant.suspended": "Inquilino suspendido",
    "tenant.pending": "Aprobación pendiente",
    "tenant.owner": "Propietario del negocio",
    "tenant.id": "ID del inquilino",
    "tenant.plan": "Plan de suscripción",
    "tenant.created": "Creado",
    "tenant.lastActivity": "Última actividad",
    "action.review": "Revisar",
    "action.approve": "Aprobar",
    "action.suspend": "Suspender",
    "action.restore": "Restablecer acceso",
    "action.open": "Abrir panel",
    "action.export": "Exportar informe",
    "action.investigate": "Investigar",
    "security.godsEye": "Acceso privilegiado del propietario de la plataforma",
    "security.reauth": "Se requiere reautenticación.",
    "security.denied": "Acceso denegado.",
    "security.leastPrivilege": "El acceso está limitado por rol e inquilino.",
    "audit.recorded": "Esta acción se registró en el historial de auditoría."
  }
};
  let language = supported.has(localStorage.getItem(STORAGE_KEY)) ? localStorage.getItem(STORAGE_KEY) : "en";

  const format = (text, values = {}) => Object.entries(values).reduce(
    (result, [name, value]) => result.replaceAll(`{{${name}}}`, String(value)), text
  );
  const t = (key, values) => format(messages[language][key] ?? messages.en[key] ?? key, values);

  const localize = (root = document) => {
    document.documentElement.lang = language;
    root.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    root.querySelectorAll("[data-i18n-placeholder]").forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
    root.querySelectorAll("[data-i18n-label]").forEach(el => { el.setAttribute("aria-label", t(el.dataset.i18nLabel)); });
    root.querySelectorAll("[data-i18n-title]").forEach(el => { el.title = t(el.dataset.i18nTitle); });
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
  window.MarxiaI18n = { get language(){ return language; }, messages, t, localize, register, setLanguage };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => localize(), { once:true });
  else localize();
})();
