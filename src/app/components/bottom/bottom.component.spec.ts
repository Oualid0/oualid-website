import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomComponent } from './bottom.component';
import config from '../../../assets/strings/config/config.json';

describe('BottomComponent', () => {
  let component: BottomComponent;
  let fixture: ComponentFixture<BottomComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [BottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes the app metadata from config', () => {
    expect(component.appVersion).toBe(config.appVersion);
    expect(component.appAuthor).toBe(config.appAuthor);
    expect(component.appYear).toBe(config.appYear);
  });

  it('hides the imprint by default and toggles its visibility', () => {
    expect(component.isImprintVisible()).toBeFalse();
    component.toggleImprint();
    expect(component.isImprintVisible()).toBeTrue();
    component.toggleImprint();
    expect(component.isImprintVisible()).toBeFalse();
  });
});
