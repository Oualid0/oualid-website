import { Component, HostListener, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';
import { CommonModule } from '@angular/common';

import textEn from '../../../assets/strings/en/toolbar.json';
import textDe from '../../../assets/strings/de/toolbar.json';
import { TextDataInterface } from '../../models/interface/text-data-interface';

@Component({
    selector: 'app-toolbar',
    imports: [CommonModule],
    templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  darkMode = true;
  language = "DE";
  text: TextDataInterface = {};
  lastScrollTop = 0;
  isHidden = false;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // set dark mode as default
    //document.body.classList.toggle('dark');
    this.settingsService.getDarkMode().subscribe({
      next: value => {
        this.darkMode = value
      }
    })

    this.settingsService.getLanguage().subscribe({
      next: value => {
        if (value == "EN") {
          this.text = textEn
          this.language = "EN"
        } else {
          this.text = textDe
          this.language = "DE"
        }
      }
    });
  }

  toggleDarkMode() {
    this.settingsService.setDarkMode(!this.darkMode)
  }

  toggleLanguage() {
    if (this.language == "EN") {
      this.language = "DE"
      this.settingsService.setLanguage("DE")
    } else {
      this.language = "EN"
      this.settingsService.setLanguage("EN")
    }
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
    if (currentScrollTop > this.lastScrollTop) {
      // Scrolling down
      this.isHidden = true;
    } else {
      // Scrolling up
      this.isHidden = false;
    }
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
  }
}
