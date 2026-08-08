import { TraceScenario } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_TRACE_MAIN: TraceScenario = {
  id: 'tr_cd_main',
  problemId: 'alg_contains_duplicate',
  label: {
    en: 'Primary trace',
    ru: 'Основная трассировка'
  },
  input: [4, 1, 7, 4],
  finalAnswer: true,
  steps: [
    {
      id: 'tr_cd_0',
      index: 0,
      currentValue: 4,
      setBefore: [],
      operation: 'ADD',
      setAfter: [4],
      returns: null,
      addSucceeded: true
    },
    {
      id: 'tr_cd_1',
      index: 1,
      currentValue: 1,
      setBefore: [4],
      operation: 'ADD',
      setAfter: [4, 1],
      returns: null,
      addSucceeded: true
    },
    {
      id: 'tr_cd_2',
      index: 2,
      currentValue: 7,
      setBefore: [4, 1],
      operation: 'ADD',
      setAfter: [4, 1, 7],
      returns: null,
      addSucceeded: true
    },
    {
      id: 'tr_cd_3',
      index: 3,
      currentValue: 4,
      setBefore: [4, 1, 7],
      operation: 'DUPLICATE_FOUND',
      setAfter: [4, 1, 7],
      returns: true,
      addSucceeded: false
    }
  ]
};

export const CONTAINS_DUPLICATE_TRACE_FOLLOWUP: TraceScenario = {
  id: 'tr_cd_followup',
  problemId: 'alg_contains_duplicate',
  label: {
    en: 'Follow-up prediction',
    ru: 'Прогноз follow-up'
  },
  input: [1, 2, 3],
  finalAnswer: false,
  steps: []
};
