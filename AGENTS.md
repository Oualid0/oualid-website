# AGENTS.md

Guidance for coding agents working in this repository.

Read `README.md` first: commands (incl. running a single spec), project structure, i18n pattern, styling and CI are documented there. This file only holds rules for agents.

## Rules

- **Text:** never hardcode user-visible text. Edit both `src/assets/strings/en/` and `de/` with matching keys, and wire new components via the static JSON imports + `localizedText()`. Do not introduce an i18n framework.
- **State:** `SettingsStore` is the single source of truth for dark mode and language. Mutate it only through `setDarkMode`/`setLanguage`/`toggleDarkMode`/`toggleLanguage`; never write the `darkMode`/`language` `localStorage` keys or the body `dark` class directly.
- **Layout:** there are no routes. New sections are added to `app.component.html`.
- **Styling:** use Tailwind utilities and the CSS custom properties in `src/styles.css`. Add new colors as tokens there for both `:root` and `.dark`; there is no `tailwind.config.js`.
- **Before finishing:** run the same checks as CI: `npm run lint`, `npm test -- --watch=false --browsers=ChromeHeadless`, `npm run build`.
