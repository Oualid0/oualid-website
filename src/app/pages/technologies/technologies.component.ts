import { Component, computed, inject } from '@angular/core';

import textEn from '../../../assets/strings/en/technology.json';
import textDe from '../../../assets/strings/de/technology.json';
import { SettingsStore } from '../../service/settings.store';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from '../../components/section-title/section-title.component';

@Component({
    selector: 'app-technologies',
    imports: [CommonModule, SectionTitleComponent],
    templateUrl: './technologies.component.html',
})
export class TechnologiesComponent {
  private settingsStore = inject(SettingsStore);

  private data = computed(() => (this.settingsStore.language() === 'EN' ? textEn : textDe));
  title = computed(() => this.data().title);
  categories = computed(() => this.data().categories);
}
