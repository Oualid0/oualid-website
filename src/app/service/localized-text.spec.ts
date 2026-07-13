import { signal } from '@angular/core';
import { localizedText } from './localized-text';
import { TextDataInterface } from '../models/interface/text-data-interface';

const en: TextDataInterface = { greeting: 'Hello' };
const de: TextDataInterface = { greeting: 'Hallo' };

describe('localizedText', () => {
  it('returns the EN object when language is "EN"', () => {
    const text = localizedText(signal('EN'), en, de);
    expect(text()).toBe(en);
  });

  it('returns the DE object for "DE" and any non-EN value', () => {
    expect(localizedText(signal('DE'), en, de)()).toBe(de);
    expect(localizedText(signal('xx'), en, de)()).toBe(de);
  });

  it('reacts to language changes', () => {
    const language = signal('EN');
    const text = localizedText(language, en, de);
    expect(text()).toBe(en);
    language.set('DE');
    expect(text()).toBe(de);
  });
});
