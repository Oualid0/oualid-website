import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private darkMode: BehaviorSubject<boolean>;
  private language: BehaviorSubject<string>;

  constructor() {
    // Initialize with values from localStorage or defaults
    this.darkMode = new BehaviorSubject<boolean>(this.getStoredDarkMode() ?? true);
    this.language = new BehaviorSubject<string>(this.getStoredLanguage() ?? 'DE'); 

    // Subscribe to changes and update localStorage accordingly
    this.darkMode.subscribe(mode => {
      console.log("Current dark mode: ", mode);
      localStorage.setItem('darkMode', JSON.stringify(mode));
      document.body.classList.toggle('dark', mode);
    });
    
    this.language.subscribe(lang => {
      console.log("Current language: ", lang);
      localStorage.setItem('language', lang)
    });
  }

  private getStoredDarkMode(): boolean | null {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode !== null ? JSON.parse(storedMode) : null;
  }

  private getStoredLanguage(): string | null {
    return localStorage.getItem('language');
  }

  getDarkMode(): Observable<boolean> {
    return this.darkMode.asObservable();
  }

  setDarkMode(mode: boolean) {
    this.darkMode.next(mode);
  }

  getLanguage(): Observable<string> {
    return this.language.asObservable();
  }

  setLanguage(language: string) {
    this.language.next(language);
  }
}
