import { Component, inject, signal } from '@angular/core';

import config from '../../../assets/strings/config/config.json';
import { ImprintComponent } from '../imprint/imprint.component';
import { CommonModule } from '@angular/common';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';

import textEn from '../../../assets/strings/en/bottom.json';
import textDe from '../../../assets/strings/de/bottom.json';

@Component({
    selector: 'app-bottom',
    imports: [ImprintComponent, CommonModule],
    templateUrl: './bottom.component.html',
})
export class BottomComponent {
  private settingsStore = inject(SettingsStore);

  appVersion = config.appVersion;
  appAuthor = config.appAuthor;
  appYear = config.appYear;
  isImprintVisible = signal(false);
  text = localizedText(this.settingsStore.language, textEn, textDe);

  toggleImprint() {
    this.isImprintVisible.update(value => !value);
  }

}
