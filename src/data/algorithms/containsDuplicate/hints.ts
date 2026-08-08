import { AlgorithmHint } from '../../../types/algorithmLab';

export const CONTAINS_DUPLICATE_HINTS: readonly AlgorithmHint[] = [
  {
    id: 'hnt_cd_bp_1',
    stageType: 'BLUEPRINT',
    level: 1,
    text: {
      en: 'Start by creating the memory that will remember values you have already scanned.',
      ru: 'Начните с создания памяти, которая запомнит уже просмотренные значения.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_bp_2',
    stageType: 'BLUEPRINT',
    level: 2,
    text: {
      en: 'The first action is: create an empty seen-set.',
      ru: 'Первое действие: создать пустой seen-set.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_bp_3',
    stageType: 'BLUEPRINT',
    level: 3,
    text: {
      en: 'Inside the loop: check membership, return true on hit, otherwise add.',
      ru: 'Внутри цикла: проверить принадлежность, при попадании return true, иначе добавить.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_bp_4',
    stageType: 'BLUEPRINT',
    level: 4,
    text: {
      en: 'Revealing the first block position: Create empty seen-set.',
      ru: 'Открываем позицию первого блока: Создать пустой seen-set.'
    },
    revealType: 'BLOCK',
    revealTargetId: 'bp_cd_create'
  },
  {
    id: 'hnt_cd_mos_1',
    stageType: 'CODE_MOSAIC',
    level: 1,
    text: {
      en: 'Indentation cue: set creation sits one level inside the method.',
      ru: 'Подсказка по отступам: создание set — на один уровень внутри метода.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_mos_2',
    stageType: 'CODE_MOSAIC',
    level: 2,
    text: {
      en: 'The critical tile uses HashSet.add’s boolean return — false means duplicate.',
      ru: 'Ключевая плитка использует boolean-результат HashSet.add — false значит дубликат.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_mos_3',
    stageType: 'CODE_MOSAIC',
    level: 3,
    text: {
      en: 'Reveal one tile role: the loop header is required.',
      ru: 'Открываем роль одной плитки: заголовок цикла обязателен.'
    },
    revealType: 'TILE',
    revealTargetId: 'mos_cd_for'
  },
  {
    id: 'hnt_cd_mos_4',
    stageType: 'CODE_MOSAIC',
    level: 4,
    text: {
      en: 'Reveal loop body only: if (!seen.add(number)) { return true; }',
      ru: 'Открываем только тело цикла: if (!seen.add(number)) { return true; }'
    },
    revealType: 'SECTION',
    revealTargetId: 'mos_cd_if'
  },
  {
    id: 'hnt_cd_mos_5',
    stageType: 'CODE_MOSAIC',
    level: 5,
    text: {
      en: 'Full solution reveal is available as a last resort after prior hints.',
      ru: 'Полное раскрытие решения доступно как крайняя мера после предыдущих подсказок.'
    },
    revealType: 'FULL'
  },
  {
    id: 'hnt_cd_tr_1',
    stageType: 'TRACE',
    level: 1,
    text: {
      en: 'When add returns true, the value was new and enters the set.',
      ru: 'Когда add возвращает true, значение новое и попадает в set.'
    },
    revealType: 'NONE'
  },
  {
    id: 'hnt_cd_tr_2',
    stageType: 'TRACE',
    level: 2,
    text: {
      en: 'Watch for the second 4 — add fails, method returns true.',
      ru: 'Следите за второй 4 — add не удаётся, метод возвращает true.'
    },
    revealType: 'NONE'
  }
];
