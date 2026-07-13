import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { SettingsStore } from '../../service/settings.store';
import timelineItemsEn from '../../../assets/strings/en/timeline-items.json';
import timelineItemsDe from '../../../assets/strings/de/timeline-items.json';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SettingsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('exposes the localized title', () => {
    store.setLanguage('EN');
    expect(component.title()).toBe('Timeline');
  });

  it('returns the EN items in reverse source order', () => {
    store.setLanguage('EN');
    const items = component.timelineItems();
    expect(items.length).toBe(timelineItemsEn.length);
    expect(items[0]).toEqual(timelineItemsEn[timelineItemsEn.length - 1]);
    expect(items[items.length - 1]).toEqual(timelineItemsEn[0]);
  });

  it('switches to the DE dataset with the language', () => {
    store.setLanguage('DE');
    const items = component.timelineItems();
    expect(items.length).toBe(timelineItemsDe.length);
    expect(items[0]).toEqual(timelineItemsDe[timelineItemsDe.length - 1]);
  });

  it('does not mutate the source array when reversing', () => {
    store.setLanguage('EN');
    const firstBefore = timelineItemsEn[0];
    component.timelineItems();
    expect(timelineItemsEn[0]).toBe(firstBefore);
  });
});
