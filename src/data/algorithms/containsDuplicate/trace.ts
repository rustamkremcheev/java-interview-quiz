import { TraceScenario } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_TRACE: TraceScenario = {
  id: 'tr_cd_main',
  problemId: 'alg_contains_duplicate',
  kind: 'HASH_STATE',
  label: { en: 'Primary trace', ru: 'Основная трассировка' },
  inputSummary: {
    en: 'nums = [4, 1, 7, 4]',
    ru: 'nums = [4, 1, 7, 4]'
  },
  arrayInput: [4, 1, 7, 4],
  steps: [
    {
      id: 'tr_cd_0',
      title: { en: 'Visit 4', ru: 'Посетить 4' },
      narrative: {
        en: 'seen is empty. Try to add 4.',
        ru: 'seen пуст. Пробуем добавить 4.'
      },
      state: { current: '4', seen: '∅', addResult: 'true (new)' },
      question: {
        en: 'Does seen.add(4) succeed?',
        ru: 'Успешен ли seen.add(4)?'
      },
      choices: [
        { id: 'yes', text: { en: 'Yes — new value', ru: 'Да — новое значение' } },
        { id: 'no', text: { en: 'No — already present', ru: 'Нет — уже было' } }
      ],
      correctChoiceId: 'yes',
      feedbackCorrect: {
        en: 'add succeeds — 4 enters the set; method does not return yet.',
        ru: 'add успешен — 4 попадает в set; метод ещё не возвращает.'
      },
      feedbackIncorrect: {
        en: '4 was not seen before, so add returns true.',
        ru: '4 ещё не встречалось, поэтому add возвращает true.'
      },
      highlightIndex: 0,
      setValues: [],
      highlightSetValue: 4
    },
    {
      id: 'tr_cd_1',
      title: { en: 'Visit 1', ru: 'Посетить 1' },
      narrative: {
        en: 'seen = {4}. Try to add 1.',
        ru: 'seen = {4}. Пробуем добавить 1.'
      },
      state: { current: '1', seen: '{4}', addResult: 'true (new)' },
      question: {
        en: 'Does seen.add(1) succeed?',
        ru: 'Успешен ли seen.add(1)?'
      },
      choices: [
        { id: 'yes', text: { en: 'Yes — new value', ru: 'Да — новое значение' } },
        { id: 'no', text: { en: 'No — already present', ru: 'Нет — уже было' } }
      ],
      correctChoiceId: 'yes',
      feedbackCorrect: {
        en: '1 is new — set becomes {4, 1}.',
        ru: '1 новое — set становится {4, 1}.'
      },
      feedbackIncorrect: {
        en: '1 was not in the set.',
        ru: '1 не было в set.'
      },
      highlightIndex: 1,
      setValues: [4],
      highlightSetValue: 1
    },
    {
      id: 'tr_cd_2',
      title: { en: 'Visit 7', ru: 'Посетить 7' },
      narrative: {
        en: 'seen = {4, 1}. Try to add 7.',
        ru: 'seen = {4, 1}. Пробуем добавить 7.'
      },
      state: { current: '7', seen: '{4, 1}', addResult: 'true (new)' },
      question: {
        en: 'Does seen.add(7) succeed?',
        ru: 'Успешен ли seen.add(7)?'
      },
      choices: [
        { id: 'yes', text: { en: 'Yes — new value', ru: 'Да — новое значение' } },
        { id: 'no', text: { en: 'No — already present', ru: 'Нет — уже было' } }
      ],
      correctChoiceId: 'yes',
      feedbackCorrect: {
        en: '7 is new — continue scanning.',
        ru: '7 новое — продолжаем сканирование.'
      },
      feedbackIncorrect: {
        en: '7 was not present yet.',
        ru: '7 ещё не было.'
      },
      highlightIndex: 2,
      setValues: [4, 1],
      highlightSetValue: 7
    },
    {
      id: 'tr_cd_3',
      title: { en: 'Visit second 4', ru: 'Посетить второй 4' },
      narrative: {
        en: 'seen = {4, 1, 7}. Try to add 4 again.',
        ru: 'seen = {4, 1, 7}. Снова пробуем добавить 4.'
      },
      state: { current: '4', seen: '{4, 1, 7}', addResult: 'false (duplicate)' },
      question: {
        en: 'What happens when add fails?',
        ru: 'Что происходит, когда add не удаётся?'
      },
      choices: [
        {
          id: 'return_true',
          text: { en: 'Return true — duplicate found', ru: 'Вернуть true — найден дубликат' }
        },
        {
          id: 'continue',
          text: { en: 'Ignore and continue', ru: 'Игнорировать и продолжить' }
        }
      ],
      correctChoiceId: 'return_true',
      feedbackCorrect: {
        en: 'add returns false → value already present → method returns true.',
        ru: 'add возвращает false → значение уже было → метод возвращает true.'
      },
      feedbackIncorrect: {
        en: 'Failed add means a duplicate — return true immediately.',
        ru: 'Неудачный add означает дубликат — сразу вернуть true.'
      },
      highlightIndex: 3,
      setValues: [4, 1, 7],
      highlightSetValue: 4
    }
  ],
  followUpQuestion: {
    en: 'For nums = [1, 2, 3], what is the final answer?',
    ru: 'Для nums = [1, 2, 3] какой итоговый ответ?'
  },
  followUpChoices: [
    { id: 'true', text: { en: 'true', ru: 'true' } },
    { id: 'false', text: { en: 'false', ru: 'false' } }
  ],
  followUpCorrectChoiceId: 'false',
  followUpFeedbackCorrect: {
    en: 'All values are distinct → false.',
    ru: 'Все значения различны → false.'
  },
  followUpFeedbackIncorrect: {
    en: 'No duplicates in [1, 2, 3] → false.',
    ru: 'В [1, 2, 3] нет дубликатов → false.'
  }
};

/** Alias for older imports during migration. */
export const CONTAINS_DUPLICATE_TRACE_MAIN = CONTAINS_DUPLICATE_TRACE;
export const CONTAINS_DUPLICATE_TRACE_FOLLOWUP = CONTAINS_DUPLICATE_TRACE;
