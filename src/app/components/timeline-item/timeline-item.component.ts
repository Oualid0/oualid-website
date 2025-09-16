import { Component, Input, OnInit } from '@angular/core';

import textEn from '../../../assets/strings/en/timeline.json';
import textDe from '../../../assets/strings/de/timeline.json';
import { TextDataInterface } from '../../models/interface/text-data-interface';
import { SettingsService } from '../../service/settings.service';
import { CommonModule } from '@angular/common';
import { TimelineObject } from '../../models/object/timeline-object';
import { TimelineItemTypeEnum } from '../../models/enum/timeline-item-type-enum';

@Component({
    selector: 'app-timeline-item',
    imports: [CommonModule],
    templateUrl: './timeline-item.component.html',
})
export class TimelineItemComponent implements OnInit {
  @Input() data: TimelineObject | undefined;
  isExpanded: boolean = false;
  text: TextDataInterface = {};
  type = TimelineItemTypeEnum;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.text = (value == "EN" ? textEn : textDe);
      }
    });
  }

}
