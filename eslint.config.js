// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      // Newer angular-eslint recommends inject() over constructor DI. The
      // codebase intentionally uses constructor injection; opting out keeps
      // this migration a deliberate future choice rather than a lint gate.
      "@angular-eslint/prefer-inject": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      // Newer angular-eslint recommends @if/@for built-in control flow. The
      // templates still use *ngIf/*ngFor; migrating is a deliberate future
      // choice, so this stricter rule is opted out for now.
      "@angular-eslint/template/prefer-control-flow": "off",
    },
  }
);
