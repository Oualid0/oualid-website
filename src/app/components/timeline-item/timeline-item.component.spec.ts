import { TestBed } from '@angular/core/testing';

import { TimelineItemComponent } from './timeline-item.component';
import { SettingsStore } from '../../service/settings.store';
import { TimelineObject } from '../../models/object/timeline-object';

function makeItem(overrides: Partial<TimelineObject> = {}): TimelineObject {
  return {
    type: 'CustomerProject',
    dateStart: '2020.01',
    dateEnd: '2020.12',
    ongoing: false,
    name: 'Example',
    shortDescription: null,
    fullDescription: null,
    link: null,
    linkName: null,
    company: null,
    customer: null,
    tech: null,
    ...overrides,
  };
}

describe('TimelineItemComponent', () => {
  let store: InstanceType<typeof SettingsStore>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [TimelineItemComponent]
    })
    .compileComponents();
    store = TestBed.inject(SettingsStore);
  });

  // `data` is a plain @Input (not a signal), so the derived computed()s only
  // pick it up on first read. Build a fresh instance per scenario, mirroring
  // how @Input is set once before rendering in real usage.
  function withData(data: TimelineObject | undefined): TimelineItemComponent {
    const fixture = TestBed.createComponent(TimelineItemComponent);
    fixture.componentInstance.data = data;
    fixture.detectChanges();
    return fixture.componentInstance;
  }

  it('should create', () => {
    expect(withData(makeItem())).toBeTruthy();
  });

  it('uses the ongoing card classes only when the item is ongoing', () => {
    expect(withData(makeItem({ ongoing: true })).cardClasses())
      .toContain('shadow-[0_0_24px_var(--primary-glow)]');

    expect(withData(makeItem({ ongoing: false })).cardClasses())
      .toBe('relative rounded-lg border border-outline-variant bg-surface-container p-4');
  });

  it('maps each known type to its localized (EN) tag label', () => {
    store.setLanguage('EN');
    expect(withData(makeItem({ type: 'CustomerProject' })).tagLabel()).toBe('CustomerProject');
    expect(withData(makeItem({ type: 'SideProject' })).tagLabel()).toBe('SideProject');
    expect(withData(makeItem({ type: 'Certificate' })).tagLabel()).toBe('Certificate');
    expect(withData(makeItem({ type: 'Apprenticeship' })).tagLabel()).toBe('Apprenticeship');
  });

  it('returns an empty tag label for unknown or missing types', () => {
    expect(withData(makeItem({ type: 'Something' })).tagLabel()).toBe('');
    expect(withData(undefined).tagLabel()).toBe('');
  });

  it('switches the tag label with the language', () => {
    store.setLanguage('EN');
    const component = withData(makeItem({ type: 'CustomerProject' }));
    expect(component.tagLabel()).toBe('CustomerProject');
    store.setLanguage('DE');
    expect(component.tagLabel()).toBe('Kundenprojekt');
  });
});
