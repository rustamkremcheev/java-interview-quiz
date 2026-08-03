import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OOP_REFACTORING_LEGACY: readonly MistakePattern[] = [
  {
    id: "err_leg_big_bang_rewrite",
    code: "ERR_LEG_BIG_BANG_REWRITE",
    title: {
      en: "Big-Bang Rewrite Without Characterization",
      ru: "Big-Bang Rewrite без Characterization"
    },
    description: {
      en: "Rewriting LegacyCreditDecisionEngine to a new stack before locking current behavior with tests under live regulatory traffic.",
      ru: "Переписывание LegacyCreditDecisionEngine на новый стек до фиксации текущего поведения тестами под живым regulatory traffic."
    },
    conceptIds: ["cpt_characterization_test", "cpt_incremental_refactoring"],
    exampleIncorrectReasoning: {
      en: "The code is too bad to test — rewrite it clean.",
      ru: "Код слишком плох для тестов — перепишем чисто."
    },
    correctedReasoning: {
      en: "Capture behavior with characterization tests first, then extract seams incrementally.",
      ru: "Сначала зафиксируйте поведение characterization-тестами, затем извлекайте seams инкрементально."
    },
    remediationMissionIds: ["mis_oop_refactoring_legacy"]
  },
  {
    id: "err_leg_no_seam",
    code: "ERR_LEG_NO_SEAM",
    title: {
      en: "Refactoring Without Introducing a Seam",
      ru: "Рефакторинг без Введение Seam"
    },
    description: {
      en: "Trying to unit-test decide() while static DB calls remain embedded with no ApplicantLookupPort.",
      ru: "Попытка unit-тестировать decide() при встроенных static DB calls без ApplicantLookupPort."
    },
    conceptIds: ["cpt_seam_extraction"],
    exampleIncorrectReasoning: {
      en: "Mock the database driver globally.",
      ru: "Замокаем database driver глобально."
    },
    correctedReasoning: {
      en: "Introduce a seam (port/interface) at the dependency boundary so pure CreditPolicy can be tested.",
      ru: "Введите seam (port/interface) на границе зависимости, чтобы чистый CreditPolicy тестировался."
    },
    remediationMissionIds: ["mis_oop_refactoring_legacy"]
  },
  {
    id: "err_leg_fix_bugs_silently",
    code: "ERR_LEG_FIX_BUGS_SILENTLY",
    title: {
      en: "Silently Fixing Bugs During Characterization",
      ru: "Тихое Исправление Багов во время Characterization"
    },
    description: {
      en: "Changing known wrong decisions while locking tests, so production parity is lost without an explicit decision.",
      ru: "Изменение заведомо неверных решений при фиксации тестов — теряется parity с продом без явного решения."
    },
    conceptIds: ["cpt_characterization_test"],
    exampleIncorrectReasoning: {
      en: "While we are here, correct the obvious bug.",
      ru: "Раз уж здесь — исправим очевидный баг."
    },
    correctedReasoning: {
      en: "Characterization preserves current behavior first. Known bugs are fixed in a separate, reviewed change.",
      ru: "Characterization сначала сохраняет текущее поведение. Известные баги чинятся отдельным reviewed change."
    },
    remediationMissionIds: ["mis_oop_refactoring_legacy"]
  },
  {
    id: "err_leg_rename_to_loan_application",
    code: "ERR_LEG_COLLIDE_DOMAIN_NAMES",
    title: {
      en: "Colliding with Unrelated Domain Types During Extract",
      ru: "Коллизия с Чужими Доменными Типами при Extract"
    },
    description: {
      en: "Renaming to SharedLendingDto mid-refactor creates collisions with other bounded contexts and obscures credit-facility semantics.",
      ru: "Rename в SharedLendingDto mid-refactor создаёт коллизии с другими bounded contexts и затеняет семантику credit-facility."
    },
    conceptIds: ["cpt_incremental_refactoring"],
    exampleIncorrectReasoning: {
      en: "SharedLendingDto is the universal name — reuse it.",
      ru: "SharedLendingDto — универсальное имя — переиспользуем."
    },
    correctedReasoning: {
      en: "Keep CreditFacilityApplication in this context until a deliberate shared model exists.",
      ru: "Держите CreditFacilityApplication в этом контексте, пока нет deliberate shared model."
    },
    remediationMissionIds: ["mis_oop_refactoring_legacy"]
  },
  {
    id: "err_leg_extract_without_audit_port",
    code: "ERR_LEG_EXTRACT_WITHOUT_AUDIT",
    title: {
      en: "Extracting Logic but Dropping Audit Side Effects",
      ru: "Extract Логики с Потерей Audit Side Effects"
    },
    description: {
      en: "Moving decision rules to CreditPolicy while omitting DecisionAuditPort calls changes regulatory observability.",
      ru: "Перенос правил в CreditPolicy без вызовов DecisionAuditPort меняет regulatory observability."
    },
    conceptIds: ["cpt_seam_extraction", "cpt_incremental_refactoring"],
    exampleIncorrectReasoning: {
      en: "Pure functions should not audit — drop it.",
      ru: "Чистые функции не должны аудитить — уберём."
    },
    correctedReasoning: {
      en: "Keep orchestration that calls DecisionAuditPort around the pure policy; prove parity with characterization tests.",
      ru: "Оркестрацию с DecisionAuditPort оставьте вокруг pure policy; докажите parity characterization-тестами."
    },
    remediationMissionIds: ["mis_oop_refactoring_legacy"]
  }
];
