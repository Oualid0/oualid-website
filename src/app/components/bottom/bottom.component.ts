import { Component, OnInit } from '@angular/core';

import config from '../../../assets/strings/config/config.json';
import { ImprintComponent } from '../imprint/imprint.component';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../service/settings.service';
import { TextDataInterface } from '../../models/interface/text-data-interface';

import textEn from '../../../assets/strings/en/bottom.json';
import textDe from '../../../assets/strings/de/bottom.json';

@Component({
    selector: 'app-bottom',
    imports: [ImprintComponent, CommonModule],
    templateUrl: './bottom.component.html',
})
export class BottomComponent implements OnInit {
  appVersion: string = "";
  appAuthor: string = "";
  appYear: string = "";
  text: TextDataInterface = {};
  isImprintVisible = false;

  constructor(private settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.appVersion = config.appVersion;
    this.appAuthor = config.appAuthor;
    this.appYear = config.appYear;

    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.text = (value == "EN" ? textEn : textDe);
      }
    });
  }

  toggleImprint() {
    this.isImprintVisible = !this.isImprintVisible;
  }

}
