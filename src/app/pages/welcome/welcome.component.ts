import { Component, inject, signal } from '@angular/core';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';

import textEn from '../../../assets/strings/en/welcome.json';
import textDe from '../../../assets/strings/de/welcome.json';

@Component({
    selector: 'app-welcome',
    imports: [],
    templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  private settingsStore = inject(SettingsStore);

  text = localizedText(this.settingsStore.language, textEn, textDe);

  readonly email = 'laboumyt@gmail.com';
  readonly mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${this.email}`;
  readonly copied = signal(false);
  /** LinkedIn is hidden for now; set to true to show the link again. */
  readonly showLinkedIn = false;

  /** Copy the address + show the toast first, then open Gmail after a short beat
   *  so the user actually notices it landed in the clipboard. */
  openContact(event: MouseEvent): void {
    event.preventDefault();
    this.copyEmail();
    setTimeout(() => window.open(this.mailUrl, '_blank', 'noopener'), 1200);
  }

  copyEmail(): void {
    navigator.clipboard?.writeText(this.email)
      .then(() => {
        this.copied.set(true);
        setTimeout(() => this.copied.set(false), 2000);
      })
      .catch(() => { /* clipboard unavailable — the Gmail tab still opens */ });
  }
}
