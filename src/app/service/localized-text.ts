import { computed, Signal } from '@angular/core';
import { TextDataInterface } from '../models/interface/text-data-interface';

export function localizedText(
  language: Signal<string>,
  en: TextDataInterface,
  de: TextDataInterface
): Signal<TextDataInterface> {
  return computed(() => (language() === 'EN' ? en : de));
}
