import { Component, OnInit } from '@angular/core';

import timelineItemsEn from '../../../assets/strings/en/timeline-items.json';
import timelineItemsDe from '../../../assets/strings/de/timeline-items.json';

import textEn from '../../../assets/strings/en/timeline.json';
import textDe from '../../../assets/strings/de/timeline.json';
import { TextDataInterface } from '../../models/interface/text-data-interface';
import { SettingsService } from '../../service/settings.service';
import { TimelineObject } from '../../models/object/timeline-object';
import { TimelineItemComponent } from '../../components/timeline-item/timeline-item.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-timeline',
    imports: [CommonModule, TimelineItemComponent],
    templateUrl: './timeline.component.html',
})
export class TimelineComponent implements OnInit {
  timelineItems: TimelineObject[] = [];
  text: TextDataInterface = {};

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.timelineItems = [];

        if (value == "EN") {
          this.text = textEn;

          timelineItemsEn.forEach(
            value => this.timelineItems.push(value)
          );
        } else {
          this.text = textDe;

          timelineItemsDe.forEach(
            value => this.timelineItems.push(value)
          );
        }

        this.timelineItems.reverse();
      }
    });
  }


}
