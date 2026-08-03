import { Hint } from '../../../../../types/domain';

export const HINTS_CLASSES_OBJECTS: readonly Hint[] = [
  {
    id: "hnt_co_1",
    challengeId: "chl_co_fix_builder",
    level: 1,
    text: {
      en: "Directional Clue: Count heap objects, not CSV rows. If only one PaymentInstruction exists, the batch cannot hold independent payments.",
      ru: "Направляющая Подсказка: Считайте объекты в куче, не CSV-строки. Если PaymentInstruction один, батч не может держать независимые платежи."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_co_2",
    challengeId: "chl_co_fix_builder",
    level: 2,
    text: {
      en: "Concept Reminder: Variables hold references. batch.add(draft) stores a pointer — later draft.setX rewrites every alias.",
      ru: "Напоминание Концепции: Переменные хранят ссылки. batch.add(draft) сохраняет указатель — поздний draft.setX переписывает каждый alias."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_co_3",
    challengeId: "chl_co_fix_builder",
    level: 3,
    text: {
      en: "Mechanism Clue: Move creation inside the loop — PaymentInstructionFactory.fromCsvRow(row) then batch.add(instruction).",
      ru: "Механика: Перенесите creation внутрь цикла — PaymentInstructionFactory.fromCsvRow(row), затем batch.add(instruction)."
    },
    xpPenalty: 50,
    order: 3
  },
  {
    id: "hnt_co_4",
    challengeId: "chl_co_fix_builder",
    level: 4,
    text: {
      en: "Near-Solution: Per-row new/factory + add distinct reference + prefer immutable instruction after build; reject shared draft field and equals-as-fix.",
      ru: "Структура Решения: new/factory на строку + add отдельной ссылки + предпочтителен immutable после сборки; отклоните shared draft field и equals-as-fix."
    },
    xpPenalty: 75,
    order: 4
  },
  {
    id: "hnt_co_bug_1",
    challengeId: "chl_co_bughunt",
    level: 1,
    text: {
      en: "Directional Clue: Look for PaymentInstruction created outside the for-loop and then added repeatedly.",
      ru: "Направляющая Подсказка: Ищите PaymentInstruction, созданный вне for-цикла и затем многократно добавляемый."
    },
    xpPenalty: 10,
    order: 1
  },
  {
    id: "hnt_co_bug_2",
    challengeId: "chl_co_bughunt",
    level: 2,
    text: {
      en: "Concept Reminder: Mutation of a shared draft after prior adds is part of the same aliasing bug.",
      ru: "Напоминание Концепции: Мутация shared draft после предыдущих add — часть того же бага aliasing."
    },
    xpPenalty: 25,
    order: 2
  },
  {
    id: "hnt_co_bug_3",
    challengeId: "chl_co_bughunt",
    level: 3,
    text: {
      en: "Near-Solution: Flag the outer draft allocation, a mutating setter in the loop, and batch.add(draft).",
      ru: "Структура Решения: Отметьте внешнюю аллокацию draft, мутирующий setter в цикле и batch.add(draft)."
    },
    xpPenalty: 50,
    order: 3
  }
];
