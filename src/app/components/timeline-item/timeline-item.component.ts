import { Component, Input, computed, inject } from '@angular/core';

import textEn from '../../../assets/strings/en/timeline.json';
import textDe from '../../../assets/strings/de/timeline.json';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';
import { CommonModule } from '@angular/common';
import { TimelineObject } from '../../models/object/timeline-object';

const ONGOING_CARD_CLASSES =
  "relative rounded-lg border border-primary/50 bg-surface-container p-4 shadow-[0_0_24px_var(--primary-glow)] " +
  "before:content-[''] before:absolute before:-top-px before:-left-px before:w-3 before:h-3 before:border-t-[1.5px] before:border-l-[1.5px] before:border-primary before:rounded-tl-lg " +
  "after:content-[''] after:absolute after:-bottom-px after:-right-px after:w-3 after:h-3 after:border-b-[1.5px] after:border-r-[1.5px] after:border-primary after:rounded-br-lg";

const DEFAULT_CARD_CLASSES = "relative rounded-lg border border-outline-variant bg-surface-container p-4";

/** Months between two "YYYY.MM" dates; `end` defaults to the current month. */
function monthsBetween(start: string, end: string | null, today = new Date()): number {
  const [startYear, startMonth] = start.split('.').map(Number);
  const [endYear, endMonth] = end ? end.split('.').map(Number) : [today.getFullYear(), today.getMonth() + 1];
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

@Component({
    selector: 'app-timeline-item',
    imports: [CommonModule],
    templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent {
  private settingsStore = inject(SettingsStore);

  @Input() data: TimelineObject | undefined;
  text = localizedText(this.settingsStore.language, textEn, textDe);

  cardClasses = computed(() => (this.data?.ongoing ? ONGOING_CARD_CLASSES : DEFAULT_CARD_CLASSES));

  isCustomerProject = computed(() => this.data?.type === 'CustomerProject');

  /** Short duration after the date range: full years with "+" for extra months ("3J+"), else months ("4M"). */
  duration = computed(() => {
    if (!this.data || (!this.data.dateEnd && !this.data.ongoing)) {
      return '';
    }
    const months = monthsBetween(this.data.dateStart, this.data.ongoing ? null : this.data.dateEnd);
    if (months <= 0) {
      return '';
    }
    const years = Math.floor(months / 12);
    return years > 0
      ? `${years}${this.text()['yearShort']}${months % 12 > 0 ? '+' : ''}`
      : `${months}${this.text()['monthShort']}`;
  });

  tagLabel = computed(() => {
    const key = this.tagKey();
    return key ? this.text()[key] : '';
  });

  private tagKey(): string | null {
    switch (this.data?.type) {
      case 'CustomerProject':
        return 'customerProject';
      case 'SideProject':
        return 'sideProject';
      case 'Certificate':
        return 'certificate';
      case 'Apprenticeship':
        return 'apprenticeship';
      default:
        return null;
    }
  }
}
