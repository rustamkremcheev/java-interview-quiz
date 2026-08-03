import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_DYNAMIC_DISPATCH: readonly MistakePattern[] = [
  {
    id: "err_static_bind_instance_call",
    code: "ERR_STATIC_BIND_INSTANCE_CALL",
    title: {
      en: "Assuming Static Helpers Preserve Polymorphic Dispatch",
      ru: "Предположение, что Static Helpers Сохраняют Полиморфную Диспетчеризацию"
    },
    description: {
      en: "Routing RiskHandler.evaluate through RiskHandlers.evaluate(handler, event) or similar static utilities and believing the runtime type of handler still selects overrides.",
      ru: "Маршрутизация RiskHandler.evaluate через RiskHandlers.evaluate(handler, event) или похожие static utilities с убеждением, что runtime-тип handler всё ещё выбирает overrides."
    },
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    exampleIncorrectReasoning: {
      en: "Passing handler into a static helper means Java still polymorphic-dispatches to CardExposureHandler.",
      ru: "Передача handler в static helper означает, что Java всё ещё полиморфно диспетчеризует к CardExposureHandler."
    },
    correctedReasoning: {
      en: "The outer call is invokestatic. Unless the helper itself calls handler.evaluate(event), no dynamic dispatch occurs — and evaluateStatic on the base type never selects subclass statics.",
      ru: "Внешний вызов — invokestatic. Пока helper сам не вызовет handler.evaluate(event), динамической диспетчеризации нет — а evaluateStatic на базовом типе никогда не выбирает static подклассов."
    },
    remediationMissionIds: ["mis_dynamic_dispatch"]
  },
  {
    id: "err_static_hiding_as_override",
    code: "ERR_STATIC_HIDING_AS_OVERRIDE",
    title: {
      en: "Treating Static Method Hiding as Overriding",
      ru: "Считать Static Method Hiding Переопределением"
    },
    description: {
      en: "Declaring CardExposureHandler.evaluateStatic and expecting RiskHandler.evaluateStatic(event) to invoke it because a CardExposureHandler instance exists elsewhere.",
      ru: "Объявление CardExposureHandler.evaluateStatic с ожиданием, что RiskHandler.evaluateStatic(event) вызовет его, потому что где-то существует экземпляр CardExposureHandler."
    },
    conceptIds: ["cpt_dynamic_dispatch"],
    exampleIncorrectReasoning: {
      en: "Subclass static methods override parent static methods just like instance methods.",
      ru: "Static-методы подкласса переопределяют static-методы родителя так же, как instance-методы."
    },
    correctedReasoning: {
      en: "Static methods hide. Binding uses the compile-time qualifier. Only instance evaluate(RiskEvent) participates in invokeinterface/invokevirtual dispatch.",
      ru: "Static-методы скрывают. Связывание использует compile-time квалификатор. Только instance evaluate(RiskEvent) участвует в диспетчеризации invokeinterface/invokevirtual."
    },
    remediationMissionIds: ["mis_dynamic_dispatch"]
  },
  {
    id: "err_interface_counts_as_mono",
    code: "ERR_INTERFACE_COUNTS_AS_MONO",
    title: {
      en: "Counting Shared Interface as Monomorphic Call Site",
      ru: "Считать Общий Интерфейс Мономорфным Call Site"
    },
    description: {
      en: "Believing a call site is monomorphic because all receivers implement RiskHandler, ignoring that HotSpot profiles concrete classes (8 handlers ⇒ megamorphic).",
      ru: "Убеждение, что call site мономорфен, потому что все получатели реализуют RiskHandler, игнорируя что HotSpot профилирует конкретные классы (8 handler-ов ⇒ megamorphic)."
    },
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    exampleIncorrectReasoning: {
      en: "One interface type at the call site means HotSpot will always inline evaluate.",
      ru: "Один тип интерфейса на call site означает, что HotSpot всегда сделает inline evaluate."
    },
    correctedReasoning: {
      en: "Call-site polymorphism is counted by concrete receiver types observed. Eight implementations at one site are megamorphic — seal or split sites to restore inlining.",
      ru: "Полиморфизм call site считается по наблюдаемым конкретным типам получателей. Восемь реализаций на одном сайте — megamorphic; запечатайте или разделите сайты для восстановления inlining."
    },
    remediationMissionIds: ["mis_dynamic_dispatch"]
  },
  {
    id: "err_instanceof_static_switch",
    code: "ERR_INSTANCEOF_STATIC_SWITCH",
    title: {
      en: "Replacing Virtual Dispatch with instanceof + Static Calls",
      ru: "Замена Виртуальной Диспетчеризации на instanceof + Static Вызовы"
    },
    description: {
      en: "Using instanceof switches that invoke CardExposureHandler.evaluateStatic / WireExposureHandler.evaluateStatic instead of polymorphic handler.evaluate(event).",
      ru: "Использование instanceof switch с вызовами CardExposureHandler.evaluateStatic / WireExposureHandler.evaluateStatic вместо полиморфного handler.evaluate(event)."
    },
    conceptIds: ["cpt_dynamic_dispatch"],
    exampleIncorrectReasoning: {
      en: "Manual instanceof routing is equivalent to dynamic dispatch and easier for the JIT.",
      ru: "Ручная маршрутизация instanceof эквивалентна динамической диспетчеризации и проще для JIT."
    },
    correctedReasoning: {
      en: "instanceof + static calls reintroduce invokestatic binding and brittle open-closed design. Prefer virtual calls; use sealed splits only to reduce megamorphism, not to call statics.",
      ru: "instanceof + static вызовы возвращают связывание invokestatic и хрупкий open-closed дизайн. Предпочитайте virtual calls; sealed splits — только для снижения мегаморфизма, не для вызова static."
    },
    remediationMissionIds: ["mis_dynamic_dispatch"]
  },
  {
    id: "err_megamorphic_ignored",
    code: "ERR_MEGAMORPHIC_IGNORED",
    title: {
      en: "Ignoring Megamorphic Cost After Fixing Correctness",
      ru: "Игнорирование Стоимости Мегаморфизма После Фикса Корректности"
    },
    description: {
      en: "Restoring handler.evaluate(event) but leaving eight concrete handlers on one RiskEventProcessor call site, so p99 remains high despite correct pricing.",
      ru: "Восстановление handler.evaluate(event) при оставлении восьми конкретных handler-ов на одном call site RiskEventProcessor, поэтому p99 остаётся высоким несмотря на корректный pricing."
    },
    conceptIds: ["cpt_dynamic_dispatch", "cpt_invokevirtual"],
    exampleIncorrectReasoning: {
      en: "Once invokeinterface is used, HotSpot will always inline regardless of receiver cardinality.",
      ru: "Как только используется invokeinterface, HotSpot всегда сделает inline независимо от кардинальности получателей."
    },
    correctedReasoning: {
      en: "Correct bytecode is necessary but not sufficient at 1M events/sec. Seal RiskHandler or split processors so each hot site stays monomorphic or bimorphic.",
      ru: "Корректный байткод необходим, но недостаточен при 1M events/sec. Запечатайте RiskHandler или разделите processors, чтобы каждый hot site оставался monomorphic или bimorphic."
    },
    remediationMissionIds: ["mis_dynamic_dispatch"]
  }
];
