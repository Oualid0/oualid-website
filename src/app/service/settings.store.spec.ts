import { TestBed } from '@angular/core/testing';

import { SettingsStore } from './settings.store';

describe('SettingsStore', () => {
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    store = TestBed.inject(SettingsStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const initial = store.darkMode();
    store.toggleDarkMode();
    expect(store.darkMode()).toBe(!initial);
  });

  it('should toggle language between EN and DE', () => {
    store.setLanguage('EN');
    store.toggleLanguage();
    expect(store.language()).toBe('DE');
    store.toggleLanguage();
    expect(store.language()).toBe('EN');
  });

  it('persists dark mode and reflects it on the body class', () => {
    store.setDarkMode(true);
    TestBed.tick();
    expect(localStorage.getItem('darkMode')).toBe('true');
    expect(document.body.classList.contains('dark')).toBeTrue();

    store.setDarkMode(false);
    TestBed.tick();
    expect(localStorage.getItem('darkMode')).toBe('false');
    expect(document.body.classList.contains('dark')).toBeFalse();
  });

  it('persists the selected language', () => {
    store.setLanguage('EN');
    TestBed.tick();
    expect(localStorage.getItem('language')).toBe('EN');
  });
});
