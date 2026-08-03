import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OVERLOADING: readonly MistakePattern[] = [
  {
    id: "err_overload_is_runtime",
    code: "ERR_OVERLOAD_IS_RUNTIME",
    title: {
      en: "Treating Overload Selection as Runtime Dispatch",
      ru: "Считая Выбор Перегрузки Runtime-Диспетчеризацией"
    },
    description: {
      en: "Claiming that LedgerPostingService.settle(...) is chosen by the JVM from the runtime type of the argument. Overload resolution is compile-time (JLS §15.12); runtime dispatch applies to overriding the receiver.",
      ru: "Утверждение, что LedgerPostingService.settle(...) выбирается JVM по runtime-типу аргумента. Разрешение перегрузок — compile-time (JLS §15.12); runtime-диспетчеризация относится к override получателя."
    },
    conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
    exampleIncorrectReasoning: {
      en: "At runtime Java looks at whether amount is Integer or BigDecimal and picks the matching settle overload.",
      ru: "В рантайме Java смотрит, Integer это amount или BigDecimal, и выбирает соответствующую перегрузку settle."
    },
    correctedReasoning: {
      en: "The compiler binds the call to a specific method descriptor using static argument types. The JVM then invokes that already-chosen method (unless the receiver override path applies to an instance method hierarchy — unrelated to picking among settle overloads).",
      ru: "Компилятор привязывает вызов к конкретному дескриптору метода по статическим типам аргументов. JVM затем вызывает уже выбранный метод (override получателя — отдельная история, не выбор среди перегрузок settle)."
    },
    remediationMissionIds: ["mis_method_overloading"]
  },
  {
    id: "err_null_overload_ok",
    code: "ERR_NULL_OVERLOAD_OK",
    title: {
      en: "Assuming settle(null) Safely Picks One Overload",
      ru: "Предположение, что settle(null) Безопасно Выбирает Одну Перегрузку"
    },
    description: {
      en: "Believing null uniquely selects settle(Long) or settles as zero. null is applicable to Long, BigDecimal, and String overloads — the call is ambiguous without a cast.",
      ru: "Вера, что null однозначно выбирает settle(Long) или пишет ноль. null применим к перегрузкам Long, BigDecimal и String — вызов неоднозначен без приведения."
    },
    conceptIds: ["cpt_method_overloading", "cpt_compile_time_resolution"],
    exampleIncorrectReasoning: {
      en: "settle(null) clearly means no cents, so it must call settle(Long) and post nothing.",
      ru: "settle(null) очевидно означает отсутствие центов, значит вызовется settle(Long) и ничего не запишется."
    },
    correctedReasoning: {
      en: "Remove null-ambiguous reference overloads. Use settleCents with a primitive, or requireNonNull / Optional at the API boundary.",
      ru: "Уберите null-неоднозначные reference-перегрузки. Используйте settleCents с примитивом или requireNonNull / Optional на границе API."
    },
    remediationMissionIds: ["mis_method_overloading"]
  },
  {
    id: "err_integer_picks_long_wrapper",
    code: "ERR_INTEGER_PICKS_LONG_WRAPPER",
    title: {
      en: "Expecting Integer to Select settle(Long)",
      ru: "Ожидание, что Integer Выберет settle(Long)"
    },
    description: {
      en: "Assuming an Integer argument binds to settle(Long). Integer→Long is not a method-invocation conversion; Integer unboxes to settle(long) instead, and null Integer NPEs.",
      ru: "Предположение, что аргумент Integer привяжется к settle(Long). Integer→Long не является преобразованием вызова; Integer unboxится в settle(long), а null Integer даёт NPE."
    },
    conceptIds: ["cpt_compile_time_resolution"],
    exampleIncorrectReasoning: {
      en: "Integer and Long are both wrappers, so settle(amountCents) with Integer must call settle(Long).",
      ru: "Integer и Long оба wrapper, значит settle(amountCents) с Integer вызовет settle(Long)."
    },
    correctedReasoning: {
      en: "Remember JLS phases: Integer→long unboxing applies in phase 2; Integer→Long does not. Convert explicitly and null-check before settleCents.",
      ru: "Помните фазы JLS: Integer→long unboxing применим в фазе 2; Integer→Long — нет. Конвертируйте явно и проверяйте null перед settleCents."
    },
    remediationMissionIds: ["mis_method_overloading"]
  },
  {
    id: "err_document_overloads_enough",
    code: "ERR_DOCUMENT_OVERLOADS_ENOUGH",
    title: {
      en: "Documenting Mixed-Scale Overloads Instead of Renaming",
      ru: "Документирование Перегрузок со Смешанным Масштабом Вместо Переименования"
    },
    description: {
      en: "Leaving settle(long) as cents and settle(BigDecimal) as dollars, relying on Javadoc to prevent misuse. Documentation does not change compile-time resolution or stop 100× ledger skew.",
      ru: "Оставление settle(long) как центы и settle(BigDecimal) как доллары с опорой на Javadoc. Документация не меняет compile-time разрешение и не останавливает искажение леджера ×100."
    },
    conceptIds: ["cpt_method_overloading"],
    exampleIncorrectReasoning: {
      en: "If we clearly document that BigDecimal means dollars, callers will not pass cents-as-BigDecimal.",
      ru: "Если ясно задокументировать, что BigDecimal — доллары, вызывающий код не передаст центы как BigDecimal."
    },
    correctedReasoning: {
      en: "Follow Effective Java Item 41: rename to settleCents / settleDecimal so the scale is in the method name, not tribal knowledge.",
      ru: "Следуйте Effective Java Item 41: переименуйте в settleCents / settleDecimal, чтобы масштаб был в имени метода, а не в устных знаниях команды."
    },
    remediationMissionIds: ["mis_method_overloading"]
  }
];
