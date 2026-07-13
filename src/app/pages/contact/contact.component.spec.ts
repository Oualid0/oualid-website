import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { EmailService } from '../../service/email.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let emailService: EmailService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    emailService = TestBed.inject(EmailService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('starts invalid with all fields required', () => {
    expect(component.contactForm.valid).toBeFalse();
    expect(component.contactForm.get('name')?.hasError('required')).toBeTrue();
    expect(component.contactForm.get('email')?.hasError('required')).toBeTrue();
    expect(component.contactForm.get('message')?.hasError('required')).toBeTrue();
  });

  it('rejects a malformed email but accepts a valid one', () => {
    const email = component.contactForm.get('email');
    email?.setValue('not-an-email');
    expect(email?.hasError('email')).toBeTrue();
    email?.setValue('someone@example.com');
    expect(email?.valid).toBeTrue();
  });

  it('becomes valid once every field is filled correctly', () => {
    component.contactForm.setValue({
      name: 'Jane',
      email: 'jane@example.com',
      message: 'Hello there',
    });
    expect(component.contactForm.valid).toBeTrue();
  });

  it('does not call the email service while the form is invalid', () => {
    const spy = spyOn(emailService, 'sendEmail');
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
});
