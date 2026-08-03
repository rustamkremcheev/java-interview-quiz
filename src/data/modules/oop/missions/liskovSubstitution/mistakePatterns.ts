import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_LISKOV: readonly MistakePattern[] = [
  {
    id: "err_bank_transfer_throws_refund",
    code: "ERR_BANK_TRANSFER_THROWS_REFUND",
    title: {
      en: "Subtype Throws on Base Contract Method",
      ru: "Подтип Бросает Исключение на Методе Базового Контракта"
    },
    description: {
      en: "Implementing PaymentProcessor in BankTransfer but overriding refund() to throw UnsupportedOperationException. Structural IS-A holds but behavioral substitutability fails for any client expecting refund() to work.",
      ru: "Реализация PaymentProcessor в BankTransfer с переопределением refund() для throw UnsupportedOperationException. Структурное IS-A выполняется, но поведенческая взаимозаменяемость ломается для клиентов, ожидающих работающий refund()."
    },
    conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
    exampleIncorrectReasoning: {
      en: "Implementing PaymentProcessor is fine because wire transfers still support process() — we only throw on refund().",
      ru: "Реализовать PaymentProcessor нормально, wire всё равно поддерживает process() — мы бросаем только на refund()."
    },
    correctedReasoning: {
      en: "Never claim a fat interface you cannot fully honor. Segregate: PaymentProcessor (process-only) and RefundablePaymentProcessor; BankTransfer implements only process.",
      ru: "Никогда не заявляйте жирный интерфейс, который не можете полностью соблюсти. Сегрегируйте: PaymentProcessor (только process) и RefundablePaymentProcessor; BankTransfer реализует только process."
    },
    remediationMissionIds: ["mis_liskov_substitution_principle"]
  },
  {
    id: "err_processor_assumes_refundable",
    code: "ERR_PROCESSOR_ASSUMES_REFUNDABLE",
    title: {
      en: "PaymentProcessor Parameter Assumes Universal Refund Support",
      ru: "Параметр PaymentProcessor Предполагает Универсальную Поддержку Refund"
    },
    description: {
      en: "Accepting PaymentProcessor and unconditionally calling refund() without recognizing that not all payment methods are reversible.",
      ru: "Прием PaymentProcessor и безусловный вызов refund() без учета того, что не все методы оплаты обратимы."
    },
    conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
    exampleIncorrectReasoning: {
      en: "PaymentProcessor is the standard payment type — any processor passed in must support refund().",
      ru: "PaymentProcessor — стандартный тип платежа — любой переданный процессор должен поддерживать refund()."
    },
    correctedReasoning: {
      en: "If refund is required, accept RefundablePaymentProcessor or route through a dedicated RefundService. Never assume every PaymentProcessor is reversible.",
      ru: "Если нужен refund, принимайте RefundablePaymentProcessor или направляйте через отдельный RefundService. Никогда не предполагайте, что любой PaymentProcessor обратим."
    },
    remediationMissionIds: ["mis_liskov_substitution_principle"]
  },
  {
    id: "err_square_rectangle_only_answer",
    code: "ERR_SQUARE_RECTANGLE_ONLY_ANSWER",
    title: {
      en: "Citing Only Square/Rectangle in Senior Interviews",
      ru: "Ответ Только через Square/Rectangle на Senior-Интервью"
    },
    description: {
      en: "Explaining LSP exclusively through the textbook Square extends Rectangle geometry example without connecting to production API design failures like BankTransfer.refund().",
      ru: "Объяснение LSP исключительно через учебный пример Square extends Rectangle без связи с реальными сбоями API, такими как BankTransfer.refund()."
    },
    conceptIds: ["cpt_liskov_substitution"],
    exampleIncorrectReasoning: {
      en: "LSP means Square cannot extend Rectangle because setWidth changes height — that is the complete answer.",
      ru: "LSP означает, что Square не может наследовать Rectangle, потому что setWidth меняет высоту — это полный ответ."
    },
    correctedReasoning: {
      en: "Use Square/Rectangle to explain the principle abstractly, then pivot to production examples: BankTransfer.refund() throwing on PaymentProcessor, java.util.Stack extending Vector, or optional operations hidden behind fat interfaces.",
      ru: "Используйте Square/Rectangle для абстрактного объяснения, затем переходите к продакшн-примерам: BankTransfer.refund() на PaymentProcessor, Stack extends Vector или опциональные операции за жирными интерфейсами."
    },
    remediationMissionIds: ["mis_liskov_substitution_principle"]
  },
  {
    id: "err_strengthened_precondition",
    code: "ERR_STRENGTHENED_PRECONDITION",
    title: {
      en: "Subtype Strengthens Preconditions",
      ru: "Подтип Усиливает Предусловия"
    },
    description: {
      en: "Subtype methods impose stricter requirements than the base type — e.g., refund() that always throws where the base PaymentProcessor contract allows refunds. Clients cannot safely substitute the subtype.",
      ru: "Методы подтипа накладывают более строгие требования, чем базовый тип — например, refund() всегда бросает исключение, где контракт PaymentProcessor разрешает refund. Клиенты не могут безопасно подставить подтип."
    },
    conceptIds: ["cpt_behavioral_subtyping"],
    exampleIncorrectReasoning: {
      en: "Throwing UnsupportedOperationException is standard Java — Collections.emptyList() does it too, so it must be fine on PaymentProcessor.refund().",
      ru: "UnsupportedOperationException — стандарт Java, Collections.emptyList() тоже его бросает, значит это нормально и для PaymentProcessor.refund()."
    },
    correctedReasoning: {
      en: "JDK optional operations are documented on types whose contracts allow non-support. Custom subtypes claiming a guaranteed refund contract create hidden LSP traps because callers infer capability from the supertype.",
      ru: "Опциональные операции JDK документированы на типах, чей контракт допускает неподдержку. Кастомные подтипы с гарантированным контрактом refund создают скрытые LSP-ловушки, потому что вызывающий код выводит capability из супертипа."
    },
    remediationMissionIds: ["mis_liskov_substitution_principle"]
  }
];
