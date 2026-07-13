import { Component, inject } from '@angular/core';
import { SettingsStore } from '../../service/settings.store';
import { localizedText } from '../../service/localized-text';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../service/email.service';

import textEn from '../../../assets/strings/en/contact.json';
import textDe from '../../../assets/strings/de/contact.json';

@Component({
    selector: 'app-contact',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
})
export class ContactComponent {
  private settingsStore = inject(SettingsStore);
  private fb = inject(FormBuilder);
  private emailService = inject(EmailService);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required]
  });
  text = localizedText(this.settingsStore.language, textEn, textDe);

  onSubmit() {
    if (this.contactForm.valid) {
      // TODO
      //this.emailService.sendEmail(this.contactForm.value).subscribe();
    }
  }

}
