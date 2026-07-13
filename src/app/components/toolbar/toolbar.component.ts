import { Component, inject } from '@angular/core';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';
import { CommonModule } from '@angular/common';

import textEn from '../../../assets/strings/en/toolbar.json';
import textDe from '../../../assets/strings/de/toolbar.json';

@Component({
    selector: 'app-toolbar',
    imports: [CommonModule],
    templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  private settingsStore = inject(SettingsStore);

  darkMode = this.settingsStore.darkMode;
  language = this.settingsStore.language;
  text = localizedText(this.settingsStore.language, textEn, textDe);

  toggleDarkMode() {
    this.settingsStore.toggleDarkMode();
  }

  toggleLanguage() {
    this.settingsStore.toggleLanguage();
  }
}
