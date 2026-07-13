import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesComponent } from './technologies.component';
import { SettingsStore } from '../../service/settings.store';
import technologyEn from '../../../assets/strings/en/technology.json';
import technologyDe from '../../../assets/strings/de/technology.json';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TechnologiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SettingsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes the EN title and tech list', () => {
    store.setLanguage('EN');
    expect(component.title()).toBe(technologyEn.title);
    expect(component.technologies()).toEqual(technologyEn.tech);
  });

  it('switches title and tech list with the language', () => {
    store.setLanguage('EN');
    expect(component.title()).toBe('Learned technologies');
    store.setLanguage('DE');
    expect(component.title()).toBe('Erlernte Technologien');
    expect(component.technologies()).toEqual(technologyDe.tech);
  });
});
