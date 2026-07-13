import { Component, computed, inject } from '@angular/core';

import timelineItemsEn from '../../../assets/strings/en/timeline-items.json';
import timelineItemsDe from '../../../assets/strings/de/timeline-items.json';

import textEn from '../../../assets/strings/en/timeline.json';
import textDe from '../../../assets/strings/de/timeline.json';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item.component';
import { SectionTitleComponent } from '../../components/section-title/section-title.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-timeline',
    imports: [CommonModule, TimelineItemComponent, SectionTitleComponent],
    templateUrl: './timeline.component.html',
})
export class TimelineComponent {
  private settingsStore = inject(SettingsStore);

  text = localizedText(this.settingsStore.language, textEn, textDe);
  title = computed(() => this.text()['title'] as string);
  timelineItems = computed(() => {
    const items = this.settingsStore.language() === 'EN' ? [...timelineItemsEn] : [...timelineItemsDe];
    return items.reverse();
  });
}
