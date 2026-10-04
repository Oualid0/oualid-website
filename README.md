# OualidOWebsite

Personal portfolio website that showcases my projects, career timeline and background as a single-page Angular app.

- **Live page:** https://oualid0.github.io/oualid-website/

## Features

- **Single-page layout**: welcome intro, a career/project timeline, and a technologies overview, composed directly in `AppComponent`.
- **Bilingual (EN/DE)**: every text lives in per-language JSON files and swaps live via a reactive signal, no page reload.
- **Light & dark mode**: toggled in the toolbar and persisted to `localStorage`; applied through a `dark` class on `<body>`.
- **Signal-based state**: dark mode and language are held in an `@ngrx/signals` store, the single source of truth for the whole app.
- **Fully responsive**: built with Tailwind CSS utility classes and design tokens.

## Tech stack

| Area       | Choice                                                        |
| ---------- | ------------------------------------------------------------ |
| Framework  | [Angular](https://angular.dev/) 22 (standalone components, signals) |
| State      | [@ngrx/signals](https://ngrx.io/guide/signals) `signalStore` |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) v4 (CSS-first config) |
| Language   | TypeScript                                                   |
| Tests      | Karma + Jasmine (unit)                                       |
| Lint       | ESLint (angular-eslint)                                      |
| CI/Deploy  | GitHub Actions, GitHub Pages                                 |

## Getting started

Requires Node.js (`^20.19`, `^22.12` or `^24`) and npm.

```bash
npm install       # install dependencies
npm start         # dev server at http://localhost:4200/
```

The application reloads automatically when you change any of the source files.

## Scripts

| Command          | Description                                                        |
| ---------------- | ----------------------------------------------------------------- |
| `npm start`      | Dev server (`ng serve`) at http://localhost:4200/                 |
| `npm run build`  | Production build into `dist/oualid-o-website`                      |
| `npm run watch`  | Incremental development build in watch mode                       |
| `npm test`       | Unit tests via Karma / Jasmine                                    |
| `npm run lint`   | ESLint with the angular-eslint rules (flat config, `eslint.config.js`) |

Run a single spec file with `npx ng test --include src/app/service/localized-text.spec.ts` (headless, one run: add `--watch=false --browsers=ChromeHeadless`).

There is no end-to-end test setup.

## Project structure

```
src/app/
  components/   reusable UI (toolbar, bottom/footer, timeline-item, section-title, imprint)
  pages/        page-level views (welcome, timeline, technologies, contact)
  service/      SettingsStore (dark mode + language), localizedText() helper, EmailService (stub)
  models/       typed data: enum/, interface/, object/
src/assets/
  strings/{en,de}/   per-language text JSON, mirrored filename per language
  strings/config/    app metadata (name, version, author, year)
  pics/              images
src/styles.css   Tailwind v4 entry + design tokens
```

Tailwind v4 uses the CSS-first config in `src/styles.css` (no `tailwind.config.js`). `dark:` is bound to the `dark` class on `<body>` via `@custom-variant dark`, not to `prefers-color-scheme`. Colors are CSS custom properties (light in `:root`, dark in `.dark`).

`app.routes.ts` defines no routes; `AppComponent` composes all sections as one page.

## Adding or editing text (i18n)

There is no i18n framework. Text content lives in `src/assets/strings/{en,de}/<page>.json`, mirrored per language with matching filenames. A component:

1. Statically imports both language files (`import textEn from '.../en/x.json'`, `import textDe from '.../de/x.json'`).
2. Derives `text = localizedText(this.settingsStore.language, textEn, textDe)`, a `computed()` signal.
3. Reads `text()` in the template.

To add/change copy, edit **both** the `en` and `de` JSON files with matching keys.

## Deployment

GitHub Actions (`.github/workflows/ci.yml`) runs lint, headless unit tests (`--browsers=ChromeHeadlessNoSandbox`) and a production build on pull requests and `main`. On `main`, the build is deployed to GitHub Pages. The build uses `--base-href /oualid-website/` because Pages serves the site under the repo name.

## Further help

To get more help on the Angular CLI use `ng help` or see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).
