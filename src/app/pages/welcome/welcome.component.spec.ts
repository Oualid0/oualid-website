import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { SettingsStore } from '../../service/settings.store';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SettingsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the localized greeting and switches with the language', () => {
    store.setLanguage('EN');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain("Hi, I'm Oualid");

    store.setLanguage('DE');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hi, ich bin Oualid');
  });

  it('exposes a contact button opening Gmail compose to the address', () => {
    const link: HTMLAnchorElement | null =
      fixture.nativeElement.querySelector('a[href*="mail.google.com"]');
    expect(link).toBeTruthy();
    expect(link!.getAttribute('href')).toContain(`to=${component.email}`);
    expect(link!.getAttribute('target')).toBe('_blank');
  });

  it('copies the email to the clipboard and shows a toast that auto-dismisses', fakeAsync(() => {
    const writeText = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    store.setLanguage('DE');

    component.copyEmail();
    expect(writeText).toHaveBeenCalledWith(component.email);

    tick(); // resolve the clipboard promise
    expect(component.copied()).toBeTrue();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Adresse kopiert');

    tick(2000); // toast timeout elapses
    expect(component.copied()).toBeFalse();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).not.toContain('Adresse kopiert');
  }));

  it('copies first, then opens Gmail after a short delay', fakeAsync(() => {
    const writeText = spyOn(navigator.clipboard, 'writeText').and.resolveTo();
    const openSpy = spyOn(window, 'open').and.stub();
    const event = new MouseEvent('click');
    spyOn(event, 'preventDefault');

    component.openContact(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(writeText).toHaveBeenCalledWith(component.email);
    expect(openSpy).not.toHaveBeenCalled(); // not yet — waits ~1.2s

    tick(1200);
    expect(openSpy).toHaveBeenCalledWith(component.mailUrl, '_blank', 'noopener');

    tick(2000); // let the toast timer finish so no timers leak
  }));
});
