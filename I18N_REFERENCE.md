# Marxia i18n Reference

Repository: `X-Magno-Maximus/exchange`

## Standard

- Supported locales: English (`en`) and Spanish (`es`).
- Default locale: English.
- Saved preference: `localStorage["marxia-language"]`.
- Runtime: `i18n.js`, exposed as `window.MarxiaI18n`.
- Spanish should use clear, neutral language suitable for Ecuador.
- Business-entered names, product names, addresses, emails, SKUs, prices, and identifiers must not be translated.

## Adding interface copy

1. Register the same semantic key in both locales.
2. Mark visible text with `data-i18n="key"`.
3. Use `data-i18n-placeholder` for placeholders.
4. Use `data-i18n-label` for `aria-label` values.
5. Use `data-i18n-title` for native title tooltips.
6. Call `MarxiaI18n.localize(component)` after inserting dynamic content.
7. Use `MarxiaI18n.t("key")` for status messages created in JavaScript.

Example:

```html
<script src="i18n.js" defer></script>
<button data-i18n="common.save">Save</button>
<button type="button" onclick="MarxiaI18n.setLanguage('es')">ES</button>
```

Repository-specific messages can be registered before localization:

```js
MarxiaI18n.register("en", { "dashboard.title": "Dashboard" });
MarxiaI18n.register("es", { "dashboard.title": "Panel" });
```

## Release checklist

- Every key exists in both `en` and `es`.
- English → Spanish → English works without reloading.
- The selected language survives a reload.
- Navigation, forms, dialogs, statuses, tooltips, placeholders, and accessibility labels are translated.
- Dynamic and click-loaded content is localized after rendering.
- User-entered and operational data remains unchanged.
- Both languages fit mobile, tablet, and desktop layouts.
- No credentials, personal information, or secrets appear in translation messages.

## Current repository state

The repository currently has a blank placeholder page. The shared i18n runtime and maintenance standard are ready; page-specific keys must be added when its dashboard interface is implemented.
