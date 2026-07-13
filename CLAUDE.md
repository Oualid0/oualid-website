# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio website (Angular 22, standalone components, signals) deployed at https://personal-website-oualid.vercel.app/. Single Angular project named `oualid-o-website` (see `angular.json`).

## Commands

- `npm start` / `ng serve` — dev server at http://localhost:4200/
- `npm run build` / `ng build` — production build, output to `dist/oualid-o-website`
- `npm run watch` — build in watch mode (development configuration)
- `npm test` / `ng test` — unit tests via Karma/Jasmine
- `npm run lint` / `ng lint` — ESLint (uses `.eslintrc.json`, angular-eslint rules)
- `ng generate component path/name` — scaffold a new component (also `directive|pipe|service|class|guard|interface|enum|module`)

There is no e2e test setup. CI (`.gitlab-ci.yml`) runs three jobs: `ng lint`, headless unit tests (`npm test -- --watch=false --browsers=ChromeHeadlessNoSandbox`), and `ng build --configuration production` (deployed to GitLab Pages).

## Architecture

All source lives in `src/app`, organized as:
- `components/` — reusable UI pieces (toolbar, bottom/footer, timeline-item, section-title, imprint)
- `pages/` — page-level views (welcome, timeline, technologies, contact)
- `service/` — `SettingsStore` (`@ngrx/signals` `signalStore` for dark mode + language, backed by `localStorage`), `localizedText()` helper, and `EmailService` (stub, not implemented)
- `models/` — `enum/`, `interface/`, `object/` for typed data (e.g. `TimelineObject`, `TimelineItemTypeEnum`)

`app.routes.ts` currently defines no routes — `AppComponent` (`app.component.html`) composes the visible sections (`ToolbarComponent`, `WelcomeComponent`, `TimelineComponent`, `TechnologiesComponent`, `BottomComponent`) directly as a single-page layout.

### Text/i18n pattern

There is no i18n framework. Text content lives in `src/assets/strings/{en,de}/<page>.json`, mirrored per language with matching filenames (e.g. `welcome.json`, `toolbar.json`, `timeline-items.json`). Each component that displays text:
1. Statically imports both language JSON files (`import textEn from '.../en/x.json'`, `import textDe from '.../de/x.json'`).
2. Injects `SettingsStore` via `inject()` and derives `text = localizedText(this.settingsStore.language, textEn, textDe)` (`localized-text.ts`), a `computed()` signal that swaps between `textEn`/`textDe` on language change (language values are the strings `"EN"`/`"DE"`).
3. Reads `text()` in the template (signal call syntax).

When adding a new component with text, follow this same per-component JSON pair + `localizedText()` pattern rather than introducing a new i18n mechanism.

### Settings/state

`SettingsStore` (`src/app/service/settings.store.ts`) is the single source of truth for dark mode and language, implemented as an `@ngrx/signals` `signalStore` (`withState`/`withMethods`/`withHooks`). State is exposed as signals (`store.darkMode()`, `store.language()`), persisted to `localStorage` (`darkMode`, `language` keys) via an `effect()` in `withHooks`, which also toggles the `dark` class on `document.body`. Mutate state only through `setDarkMode`/`setLanguage`/`toggleDarkMode`/`toggleLanguage`.

### Styling

Tailwind CSS v4 with the CSS-first config in `src/styles.css` (`@import "tailwindcss"`) — there is no `tailwind.config.js`. PostCSS wires in `@tailwindcss/postcss` (`.postcssrc.json`). Class-based dark mode is preserved via `@custom-variant dark (&:where(.dark, .dark *))` so `dark:` follows the `dark` body class toggled by `SettingsStore` (rather than v4's default `prefers-color-scheme`). Design tokens (colors/surfaces) are defined as CSS custom properties in `styles.css`. Most components use plain templates + Tailwind utility classes; component-scoped `.scss` is used only where needed (e.g. `technologies.component.scss`).
