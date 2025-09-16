import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../service/settings.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../service/email.service';
import { TextDataInterface } from '../../models/interface/text-data-interface';

import textEn from '../../../assets/strings/en/contact.json';
import textDe from '../../../assets/strings/de/contact.json';

@Component({
    selector: 'app-contact',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  text: TextDataInterface = {};

  constructor(private settingsService: SettingsService, private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.settingsService.getLanguage().subscribe({
      next: value => {
        this.text = (value == "EN" ? textEn : textDe);
      }
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      // TODO
      //this.emailService.sendEmail(this.contactForm.value).subscribe();
    }
  }

}
