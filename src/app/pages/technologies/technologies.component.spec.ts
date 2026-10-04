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

  it('exposes the EN title and categories', () => {
    store.setLanguage('EN');
    expect(component.title()).toBe(technologyEn.title);
    expect(component.categories()).toEqual(technologyEn.categories);
  });

  it('highlights only the first entry of each category', () => {
    store.setLanguage('EN');
    fixture.detectChanges();
    const highlighted: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.font-bold'));
    expect(highlighted.map((el) => el.textContent?.trim()))
      .toEqual(technologyEn.categories.map((category) => category.tech[0].name));
  });

  it('switches title and categories with the language', () => {
    store.setLanguage('EN');
    expect(component.title()).toBe('Tech stack');
    store.setLanguage('DE');
    expect(component.title()).toBe('Tech-Stack');
    expect(component.categories()).toEqual(technologyDe.categories);
  });
});
