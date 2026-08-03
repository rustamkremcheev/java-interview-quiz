import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_INTERFACE_DEFAULT_METHODS: readonly MistakePattern[] = [
  {
    id: "err_unrelated_default_collision",
    code: "ERR_UNRELATED_DEFAULT_COLLISION",
    title: {
      en: "Unrelated Default Method Diamond Collision",
      ru: "Столкновение Несвязанных Default-Методов Ромба"
    },
    description: {
      en: "Implementing two sibling interfaces that both provide default methods with identical signatures but unrelated implementations, causing JLS 9.4.1.2 compile error.",
      ru: "Реализация двух «братских» интерфейсов, оба предоставляющих default-методы с одинаковыми сигнатурами, но несвязанными реализациями, вызывая ошибку компиляции JLS 9.4.1.2."
    },
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    exampleIncorrectReasoning: {
      en: "Java should automatically call both default methods when interfaces conflict.",
      ru: "Java должна автоматически вызывать оба default-метода при конфликте интерфейсов."
    },
    correctedReasoning: {
      en: "JLS 9.4.1.2 requires explicit override with super-qualified calls — the compiler never auto-invokes both unrelated defaults.",
      ru: "JLS 9.4.1.2 требует явного переопределения с super-qualified вызовами — компилятор никогда не вызывает оба несвязанных defaults автоматически."
    },
    remediationMissionIds: ["mis_interface_default_methods"]
  },
  {
    id: "err_empty_default_override",
    code: "ERR_EMPTY_DEFAULT_OVERRIDE",
    title: {
      en: "Empty Override Silencing All Default Behaviors",
      ru: "Пустое Переопределение, Заглушающее Все Default-Поведения"
    },
    description: {
      en: "Adding @Override public void auditLog() { } to resolve compile error while silently dropping all inherited default method behavior from every superinterface.",
      ru: "Добавление @Override public void auditLog() { } для устранения ошибки компиляции с молчаливым отбрасыванием всего унаследованного default-поведения от каждого супер-интерфейса."
    },
    conceptIds: ["cpt_default_methods"],
    exampleIncorrectReasoning: {
      en: "An empty override fixes the compile error, so the audit problem is solved.",
      ru: "Пустое переопределение исправляет ошибку компиляции, значит проблема аудита решена."
    },
    correctedReasoning: {
      en: "Empty override compiles but drops compliance DB writes and trace spans — use Auditable.super.auditLog() and Traceable.super.auditLog() to chain both behaviors.",
      ru: "Пустое override компилируется, но отбрасывает записи compliance DB и trace spans — используйте Auditable.super.auditLog() и Traceable.super.auditLog() для цепочки обоих поведений."
    },
    remediationMissionIds: ["mis_interface_default_methods"]
  },
  {
    id: "err_partial_super_delegation",
    code: "ERR_PARTIAL_SUPER_DELEGATION",
    title: {
      en: "Partial Super-Qualified Default Delegation",
      ru: "Частичное Super-Qualified Делегирование Default"
    },
    description: {
      en: "Overriding a conflicting default method but invoking only one InterfaceName.super.method(), silently dropping the other superinterface's audit or tracing behavior.",
      ru: "Переопределение конфликтующего default-метода с вызовом только одного InterfaceName.super.method(), молча отбрасывая audit или tracing поведение другого супер-интерфейса."
    },
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    exampleIncorrectReasoning: {
      en: "Calling Traceable.super.auditLog() is sufficient because distributed tracing is more important than compliance audit.",
      ru: "Вызова Traceable.super.auditLog() достаточно, так как distributed tracing важнее compliance audit."
    },
    correctedReasoning: {
      en: "Both audit trails are regulatory requirements. Chain Auditable.super.auditLog() BEFORE Traceable.super.auditLog() to preserve compliance ordering.",
      ru: "Оба аудит-трейла — регуляторные требования. Вызывайте Auditable.super.auditLog() ПЕРЕД Traceable.super.auditLog() для сохранения порядка compliance."
    },
    remediationMissionIds: ["mis_interface_default_methods"]
  },
  {
    id: "err_super_vs_interface_super",
    code: "ERR_SUPER_VS_INTERFACE_SUPER",
    title: {
      en: "Confusing super.method() with Interface.super.method()",
      ru: "Путаница super.method() с Interface.super.method()"
    },
    description: {
      en: "Using super.auditLog() instead of Auditable.super.auditLog() when attempting to invoke a specific superinterface default method from a diamond conflict override.",
      ru: "Использование super.auditLog() вместо Auditable.super.auditLog() при попытке вызвать default конкретного супер-интерфейса из override конфликта ромба."
    },
    conceptIds: ["cpt_default_methods"],
    exampleIncorrectReasoning: {
      en: "super.auditLog() calls the parent class default, same as Interface.super.auditLog().",
      ru: "super.auditLog() вызывает default родительского класса, то же самое что Interface.super.auditLog()."
    },
    correctedReasoning: {
      en: "super.method() refers to the superclass. InterfaceName.super.method() is the JLS 9.4.1.2 syntax exclusively for invoking a specific superinterface default.",
      ru: "super.method() относится к суперклассу. InterfaceName.super.method() — синтаксис JLS 9.4.1.2 исключительно для вызова default конкретного супер-интерфейса."
    },
    remediationMissionIds: ["mis_interface_default_methods"]
  },
  {
    id: "err_class_always_wins_diamond",
    code: "ERR_CLASS_ALWAYS_WINS_DIAMOND",
    title: {
      en: "Assuming Class Methods Auto-Resolve All Diamond Conflicts",
      ru: "Предположение, что Методы Класса Авто-Разрешают Все Конфликты Ромба"
    },
    description: {
      en: "Believing that JLS 9.4.1.2 rule 1 (class wins) eliminates all default method conflicts without requiring explicit override when unrelated interface defaults collide.",
      ru: "Убеждение, что правило 1 JLS 9.4.1.2 (класс побеждает) устраняет все конфликты default-методов без явного переопределения при столкновении несвязанных defaults интерфейсов."
    },
    conceptIds: ["cpt_default_methods", "cpt_interface_contracts"],
    exampleIncorrectReasoning: {
      en: "PaymentReconciliationService is a class, so its methods always win over interface defaults automatically.",
      ru: "PaymentReconciliationService — класс, поэтому его методы всегда автоматически побеждают defaults интерфейсов."
    },
    correctedReasoning: {
      en: "Rule 1 applies only when the CLASS declares or inherits the method. Without an explicit class-level auditLog(), unrelated interface defaults still conflict.",
      ru: "Правило 1 применяется только когда КЛАСС объявляет или наследует метод. Без явного auditLog() на уровне класса несвязанные defaults интерфейсов по-прежнему конфликтуют."
    },
    remediationMissionIds: ["mis_interface_default_methods"]
  }
];
