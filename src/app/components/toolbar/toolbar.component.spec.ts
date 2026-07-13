import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { SettingsStore } from '../../service/settings.store';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SettingsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleDarkMode delegates to the store', () => {
    const initial = store.darkMode();
    component.toggleDarkMode();
    expect(store.darkMode()).toBe(!initial);
  });

  it('toggleLanguage delegates to the store', () => {
    store.setLanguage('EN');
    component.toggleLanguage();
    expect(store.language()).toBe('DE');
  });

  it('exposes localized text that follows the language', () => {
    store.setLanguage('EN');
    expect(component.text()['wButton']).toBe('Welcome');
    store.setLanguage('DE');
    expect(component.text()['wButton']).toBe('Willkommen');
  });
});
