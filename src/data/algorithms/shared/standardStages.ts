import { AlgorithmStage } from '../../../types/algorithmLab';
import { LocalizedText } from '../../../types/domain';

/** Shared 6-stage workshop shell; instructions stay problem-specific via overrides. */
export function standardWorkshopStages(
  prefix: string,
  instructions: Partial<Record<AlgorithmStage['type'], LocalizedText>> = {}
): readonly AlgorithmStage[] {
  const defaults: Record<AlgorithmStage['type'], LocalizedText> = {
    CLARIFY: {
      en: 'Identify decision-relevant constraints before choosing a technique.',
      ru: 'Определите ограничения, влияющие на выбор техники, до выбора подхода.'
    },
    STRATEGY: {
      en: 'Compare realistic approaches and justify the target path for this workshop.',
      ru: 'Сравните реалистичные подходы и обоснуйте целевой путь этого воркшопа.'
    },
    BLUEPRINT: {
      en: 'Assemble the algorithm’s logical blocks before seeing Java syntax.',
      ru: 'Соберите логические блоки алгоритма до появления синтаксиса Java.'
    },
    CODE_MOSAIC: {
      en: 'Rebuild the canonical Java 17 solution from line tiles. Discard distractors.',
      ru: 'Соберите каноническое Java 17 решение из плиток. Отбросьте distractors.'
    },
    TRACE: {
      en: 'Step through algorithm-specific state transitions on a carefully chosen input.',
      ru: 'Пройдите по специфичным для алгоритма переходам состояния на выбранном входе.'
    },
    SUMMARY: {
      en: 'Capture the pattern, invariant, complexity, and recognition cue.',
      ru: 'Зафиксируйте паттерн, инвариант, сложность и признак распознавания.'
    }
  };

  const order: AlgorithmStage['type'][] = [
    'CLARIFY',
    'STRATEGY',
    'BLUEPRINT',
    'CODE_MOSAIC',
    'TRACE',
    'SUMMARY'
  ];

  const titles: Record<AlgorithmStage['type'], LocalizedText> = {
    CLARIFY: { en: '1. Clarify', ru: '1. Уточнение' },
    STRATEGY: { en: '2. Choose Strategy', ru: '2. Выбор Стратегии' },
    BLUEPRINT: { en: '3. Blueprint', ru: '3. Чертёж' },
    CODE_MOSAIC: { en: '4. Code Mosaic', ru: '4. Кодовая Мозаика' },
    TRACE: { en: '5. Execution Trace', ru: '5. Трассировка' },
    SUMMARY: { en: '6. Summary', ru: '6. Итоги' }
  };

  return order.map((type, index) => ({
    id: `stg_${prefix}_${type.toLowerCase()}`,
    type,
    order: index + 1,
    title: titles[type],
    instructions: instructions[type] ?? defaults[type]
  }));
}
