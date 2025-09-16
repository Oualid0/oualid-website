import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';
import { TextDataInterface } from '../../models/interface/text-data-interface';

import textEn from '../../../assets/strings/en/welcome.json';
import textDe from '../../../assets/strings/de/welcome.json';

@Component({
    selector: 'app-welcome',
    imports: [],
    templateUrl: './welcome.component.html',
})
export class WelcomeComponent implements OnInit {
  text: TextDataInterface = {};

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.text = (value == "EN" ? textEn : textDe);
      }
    });
  }

}
