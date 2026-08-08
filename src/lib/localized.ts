import { LanguageMode, LocalizedText } from '../types/domain';

export function getLocalizedText(text: LocalizedText, mode: LanguageMode): string {
  if (mode === 'ru') return text.ru;
  if (mode === 'bilingual') return `${text.en}\n${text.ru}`;
  return text.en;
}

export function getLocalizedInline(text: LocalizedText, mode: LanguageMode): string {
  if (mode === 'ru') return text.ru;
  if (mode === 'bilingual') return `${text.en} / ${text.ru}`;
  return text.en;
}
