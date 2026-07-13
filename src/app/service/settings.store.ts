import { effect } from '@angular/core';
import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';

interface SettingsState {
  darkMode: boolean;
  language: string;
}

function getStoredDarkMode(): boolean | null {
  const storedMode = localStorage.getItem('darkMode');
  return storedMode !== null ? JSON.parse(storedMode) : null;
}

function getStoredLanguage(): string | null {
  return localStorage.getItem('language');
}

const initialState: SettingsState = {
  darkMode: getStoredDarkMode() ?? true,
  language: getStoredLanguage() ?? 'DE',
};

export const SettingsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setDarkMode(mode: boolean): void {
      patchState(store, { darkMode: mode });
    },
    setLanguage(language: string): void {
      patchState(store, { language });
    },
    toggleDarkMode(): void {
      patchState(store, { darkMode: !store.darkMode() });
    },
    toggleLanguage(): void {
      patchState(store, { language: store.language() === 'EN' ? 'DE' : 'EN' });
    },
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const mode = store.darkMode();
        localStorage.setItem('darkMode', JSON.stringify(mode));
        document.body.classList.toggle('dark', mode);
      });
      effect(() => {
        localStorage.setItem('language', store.language());
      });
    },
  })
);
