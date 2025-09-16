import { Component, OnInit } from '@angular/core';

import textEn from '../../../assets/strings/en/technology.json';
import textDe from '../../../assets/strings/de/technology.json';
import { SettingsService } from '../../service/settings.service';
import { TextDataInterface } from '../../models/interface/text-data-interface';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-technologies',
    imports: [CommonModule],
    templateUrl: './technologies.component.html',
    styleUrl: './technologies.component.scss'
})
export class TechnologiesComponent implements OnInit {
  text: TextDataInterface = {};
  technologies: string[] = []

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.text = (value == "EN" ? textEn : textDe);
        this.technologies = textEn["tech"]
      }
    });
  }
}
