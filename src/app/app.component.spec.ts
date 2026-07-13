import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('composes the main sections', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('app-toolbar')).toBeTruthy();
    expect(el.querySelector('app-welcome')).toBeTruthy();
    expect(el.querySelector('app-timeline')).toBeTruthy();
    expect(el.querySelector('app-technologies')).toBeTruthy();
    expect(el.querySelector('app-bottom')).toBeTruthy();
  });
});
