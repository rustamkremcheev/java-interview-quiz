import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_LISKOV: TheoryArticle = {
  id: "art_theory_liskov",
  topicIds: ["top_oop_23"],
  conceptIds: ["cpt_liskov_substitution", "cpt_behavioral_subtyping"],
  title: {
    en: "Liskov Substitution & Behavioral Subtyping in PaymentProcessor APIs",
    ru: "Принцип Подстановки Лисков и Поведенческое Подтипирование в PaymentProcessor API"
  },
  summary: {
    en: "LSP requires that subtypes be behaviorally substitutable for their base types — structural inheritance (IS-A) is insufficient. Payment orchestration fails when BankTransfer implements PaymentProcessor but breaks the refund() contract that reversePayment depends on.",
    ru: "LSP требует поведенческой взаимозаменяемости подтипов с базовыми типами — структурного наследования (IS-A) недостаточно. Оркестрация платежей ломается, когда BankTransfer реализует PaymentProcessor, но нарушает контракт refund(), от которого зависит reversePayment."
  },
  sections: [
    {
      id: "sec_lsp_definition",
      category: "DEFINITION",
      title: {
        en: "1. What Liskov Substitution Actually Means",
        ru: "1. Что На самом Деле Означает Принцип Подстановки Лисков"
      },
      blocks: [
        {
          id: "blk_lsp_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Barbara Liskov formalized substitutability: if S is a subtype of T, then objects of type T in a program may be replaced by objects of type S without altering any desirable properties of the program. In Java backend engineering, this is NOT satisfied by inheritance alone — compile-time IS-A relationships do not guarantee runtime behavioral compatibility.",
            ru: "Барбара Лисков формализовала подстановку: если S — подтип T, объекты типа T в программе могут быть заменены объектами типа S без изменения желаемых свойств программы. В Java backend-разработке это НЕ достигается одним наследованием — IS-A на этапе компиляции не гарантирует поведенческую совместимость в рантайме."
          }
        },
        {
          id: "blk_lsp_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Behavioral Contract, Not Class Diagram",
            ru: "💡 Главная Ментальная Модель: Поведенческий Контракт, а Не Диаграмма Классов"
          },
          content: {
            en: "Ask: 'If I pass this subtype wherever the base type is expected, will every caller's assumptions still hold?' For PaymentProcessor, callers assume process() and refund() work according to the interface contract unless capabilities are segregated into separate types.",
            ru: "Спросите: 'Если я передам этот подтип везде, где ожидается базовый тип, сохранятся ли предположения вызывающего кода?' Для PaymentProcessor вызывающий код предполагает, что process() и refund() работают по контракту интерфейса, пока capabilities не разделены на отдельные типы."
          }
        }
      ]
    },
    {
      id: "sec_behavioral_contracts",
      category: "MECHANICS",
      title: {
        en: "2. Behavioral Subtyping Rules (Preconditions & Postconditions)",
        ru: "2. Правила Поведенческого Подтипирования (Пред- и Постусловия)"
      },
      blocks: [
        {
          id: "blk_lsp_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "A valid subtype MUST NOT strengthen preconditions (require MORE from the caller than the base type). BankTransfer.refund() strengthens preconditions by requiring the caller to never invoke refund() at all — effectively adding an implicit 'must be a reversible payment method' rule that PaymentProcessor clients do not carry.",
            ru: "Валидный подтип НЕ ДОЛЖЕН усиливать предусловия (требовать БОЛЬШЕ от вызывающего кода, чем базовый тип). BankTransfer.refund() усиливает предусловия, фактически требуя никогда не вызывать refund() — неявное правило 'должен быть обратимый метод оплаты', которого клиенты PaymentProcessor не несут."
          }
        },
        {
          id: "blk_lsp_mech_2",
          type: "WARNING",
          title: {
            en: "⚠️ Production Risk: UnsupportedOperationException as Hidden Contract",
            ru: "⚠️ Продакшн Риск: UnsupportedOperationException как Скрытый Контракт"
          },
          content: {
            en: "When BankTransfer implements PaymentProcessor and overrides refund() to throw UnsupportedOperationException, the compile-time type remains PaymentProcessor. PaymentOrchestrator.reversePayment has no way to detect the restriction until 02:17 UTC when the nightly chargeback batch crashes. Unit tests using CardPayment mocks never exposed the failure.",
            ru: "Когда BankTransfer реализует PaymentProcessor и переопределяет refund() с UnsupportedOperationException, тип на этапе компиляции остается PaymentProcessor. PaymentOrchestrator.reversePayment не может обнаружить ограничение до 02:17 UTC, когда падает ночной chargeback-батч. Юнит-тесты с моками CardPayment не выявляли сбой."
          }
        }
      ]
    },
    {
      id: "sec_payment_api_design",
      category: "PRODUCTION_USE",
      title: {
        en: "3. Payment API Redesign: Segregate Refund Capability",
        ru: "3. Редизайн Payment API: Сегрегация Capability Refund"
      },
      blocks: [
        {
          id: "blk_lsp_prod_1",
          type: "PARAGRAPH",
          content: {
            en: "Production-safe payment APIs separate process-only processors from refundable ones. PaymentProcessor exposes process(). RefundablePaymentProcessor extends it with refund(). CardPayment implements both; BankTransfer implements only PaymentProcessor. reversePayment accepts RefundablePaymentProcessor, making refund intent visible in the method signature. Alternatively, a dedicated RefundService handles reversals outside the processor hierarchy.",
            ru: "Безопасные payment API разделяют process-only процессоры и refundable. PaymentProcessor содержит process(). RefundablePaymentProcessor расширяет его refund(). CardPayment реализует оба; BankTransfer — только PaymentProcessor. reversePayment принимает RefundablePaymentProcessor, делая намерение refund видимым в сигнатуре. Альтернатива — отдельный RefundService вне иерархии процессоров."
          }
        },
        {
          id: "blk_lsp_prod_2",
          type: "CALLOUT",
          title: {
            en: "🔍 Interview Note: Square/Rectangle vs PaymentProcessor",
            ru: "🔍 Заметка для Интервью: Square/Rectangle vs PaymentProcessor"
          },
          content: {
            en: "Square extends Rectangle is the canonical textbook example: setWidth(w) on a Square silently changes height, violating Rectangle client expectations. Use it to explain LSP abstractly in interviews, but ALWAYS pivot to production code like BankTransfer.refund() — senior interviewers want to see you catch LSP in real payment APIs, not recite geometry homework.",
            ru: "Square extends Rectangle — канонический учебный пример: setWidth(w) у Square меняет высоту, нарушая ожидания клиентов Rectangle. Используйте его для абстрактного объяснения LSP, но ВСЕГДА переходите к продакшн-коду вроде BankTransfer.refund() — Senior-интервьюеры хотят видеть распознавание LSP в реальных payment API."
          }
        }
      ]
    },
    {
      id: "sec_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions (12 Questions)",
        ru: "4. Вопросы Senior-Интервью для Закрепления (12 Вопросов)"
      },
      blocks: [
        {
          id: "blk_fu_01",
          type: "CALLOUT",
          title: { en: "Q1: Define LSP in one sentence", ru: "Q1: Определите LSP одним предложением" },
          content: {
            en: "Model Answer: Subtypes must be behaviorally substitutable for their base types — any program using the base type must continue to work correctly when given the subtype, without knowing the difference.",
            ru: "Ответ: Подтипы должны быть поведенчески взаимозаменяемы с базовыми типами — любая программа, использующая базовый тип, должна работать корректно с подтипом, не зная разницы."
          }
        },
        {
          id: "blk_fu_02",
          type: "CALLOUT",
          title: { en: "Q2: Why does BankTransfer violate LSP when CardPayment does not?", ru: "Q2: Почему BankTransfer нарушает LSP, а CardPayment — нет?" },
          content: {
            en: "Model Answer: CardPayment honors both process() and refund() as PaymentProcessor promises. BankTransfer implements the same interface but rejects refund() with UnsupportedOperationException — structural IS-A without behavioral substitutability. The LSP trap is claiming a fat contract you cannot fulfill.",
            ru: "Ответ: CardPayment соблюдает и process(), и refund() как обещает PaymentProcessor. BankTransfer реализует тот же интерфейс, но отвергает refund() через UnsupportedOperationException — структурное IS-A без поведенческой взаимозаменяемости. LSP-ловушка — заявленный жирный контракт, который нельзя выполнить."
          }
        },
        {
          id: "blk_fu_03",
          type: "CALLOUT",
          title: { en: "Q3: How does Square extends Rectangle violate LSP?", ru: "Q3: Как Square extends Rectangle нарушает LSP?" },
          content: {
            en: "Model Answer: Rectangle clients expect setWidth(w) to change only width. Square overrides setWidth to also set height, breaking the postcondition Rectangle clients rely on. Square is not substitutable for Rectangle in code that assumes independent width/height control. Mention briefly, then pivot to PaymentProcessor.",
            ru: "Ответ: Клиенты Rectangle ожидают, что setWidth(w) меняет только ширину. Square переопределяет setWidth, также меняя высоту, нарушая постусловие. Square не подставляем вместо Rectangle. Упомяните кратко, затем переходите к PaymentProcessor."
          }
        },
        {
          id: "blk_fu_04",
          type: "CALLOUT",
          title: { en: "Q4: Can a subtype throw MORE specific exceptions?", ru: "Q4: Может ли подтип бросать БОЛЕЕ специфичные исключения?" },
          content: {
            en: "Model Answer: Subtypes may throw subclasses of exceptions declared by the base type (covariant exceptions). They must NOT throw NEW unchecked exceptions the base contract does not anticipate — BankTransfer.refund() throwing UnsupportedOperationException on every call is not a narrower exception, it is a blanket rejection of the base operation.",
            ru: "Ответ: Подтипы могут бросать подклассы исключений базового типа. Они НЕ должны бросать НОВЫЕ непроверяемые исключения — BankTransfer.refund() с UnsupportedOperationException при каждом вызове — не сужение исключения, а полный отказ от базовой операции."
          }
        },
        {
          id: "blk_fu_05",
          type: "CALLOUT",
          title: { en: "Q5: What is the difference between LSP and Interface Segregation (ISP)?", ru: "Q5: В чем разница между LSP и Interface Segregation (ISP)?" },
          content: {
            en: "Model Answer: ISP says clients should not depend on methods they do not use — split fat interfaces. LSP says subtypes must honor the behavioral contract of the interface they implement. In the payment scenario, ISP suggests separate PaymentProcessor and RefundablePaymentProcessor; LSP explains WHY BankTransfer must not implement a refund-bearing interface while pretending to be a full PaymentProcessor.",
            ru: "Ответ: ISP говорит, что клиенты не должны зависеть от неиспользуемых методов — разделяйте интерфейсы. LSP говорит, что подтипы должны соблюдать поведенческий контракт реализуемого интерфейса. В payment-сценарии ISP предлагает PaymentProcessor и RefundablePaymentProcessor; LSP объясняет, ПОЧЕМУ BankTransfer не должен притворяться полным PaymentProcessor с refund."
          }
        },
        {
          id: "blk_fu_06",
          type: "CALLOUT",
          title: { en: "Q6: Why is throwing UnsupportedOperationException from refund() an anti-pattern here?", ru: "Q6: Почему throw UnsupportedOperationException из refund() — антипаттерн здесь?" },
          content: {
            en: "Model Answer: PaymentProcessor's contract promises refunds. Using UnsupportedOperationException to opt out converts a compile-time type guarantee into a runtime surprise. Prefer capability interfaces so non-refundable types never expose refund() at all.",
            ru: "Ответ: Контракт PaymentProcessor обещает refund. UnsupportedOperationException превращает compile-time гарантию типа в runtime-сюрприз. Предпочитайте capability-интерфейсы, чтобы необратимые типы вообще не экспонировали refund()."
          }
        },
        {
          id: "blk_fu_07",
          type: "CALLOUT",
          title: { en: "Q7: How would you redesign reversePayment to handle chargebacks safely?", ru: "Q7: Как перепроектировать reversePayment для безопасных chargeback?" },
          content: {
            en: "Model Answer: Option A — accept RefundablePaymentProcessor. Option B — extract RefundService that looks up refund handlers by payment method type. Option C — return Optional/Result from a tryRefund capability query. Never assume every PaymentProcessor supports refund().",
            ru: "Ответ: Вариант A — принимать RefundablePaymentProcessor. Вариант B — выделить RefundService с поиском handler по типу метода оплаты. Вариант C — capability-запрос tryRefund через Optional/Result. Никогда не предполагайте, что любой PaymentProcessor поддерживает refund()."
          }
        },
        {
          id: "blk_fu_08",
          type: "CALLOUT",
          title: { en: "Q8: Does java.util.Stack extending Vector violate LSP?", ru: "Q8: Нарушает ли java.util.Stack extends Vector принцип LSP?" },
          content: {
            en: "Model Answer: Yes — Stack IS-A Vector, so clients can call arbitrary insertElementAt() on a stack, breaking LIFO semantics. Joshua Bloch calls this a historical mistake. Modern code uses ArrayDeque. This is a real JDK example senior interviewers appreciate beyond Square/Rectangle.",
            ru: "Ответ: Да — Stack IS-A Vector, клиенты могут вызвать insertElementAt() на стеке, ломая LIFO-семантику. Joshua Bloch называет это исторической ошибкой. Современный код использует ArrayDeque. Это реальный пример JDK, ценимый на Senior-интервью."
          }
        },
        {
          id: "blk_fu_09",
          type: "CALLOUT",
          title: { en: "Q9: How do you detect LSP violations in code review?", ru: "Q9: Как обнаружить нарушения LSP на код-ревью?" },
          content: {
            en: "Model Answer: Red flags — (1) implements interface methods that throw UnsupportedOperationException, (2) empty override bodies that disable base behavior, (3) fat interfaces mixing optional capabilities (process + refund + settle), (4) class names implying restriction ('Irreversible', 'ReadOnly') while implementing unrestricted supertypes.",
            ru: "Ответ: Красные флаги — (1) методы интерфейса с UnsupportedOperationException, (2) пустые override, отключающие поведение базового типа, (3) жирные интерфейсы со смешанными optional capabilities (process + refund + settle), (4) имена с ограничением ('Irreversible') при реализации неограниченного супертипа."
          }
        },
        {
          id: "blk_fu_10",
          type: "CALLOUT",
          title: { en: "Q10: When IS throwing UnsupportedOperationException acceptable?", ru: "Q10: Когда бросать UnsupportedOperationException ДОПУСТИМО?" },
          content: {
            en: "Model Answer: When the type's contract explicitly documents optional operations — Iterator.remove() on read-only iterators, or factory-produced unmodifiable collection views. It is NOT acceptable when the supertype's implicit contract guarantees the operation — PaymentProcessor.refund() on something that IS-A PaymentProcessor.",
            ru: "Ответ: Когда контракт типа явно документирует опциональные операции — Iterator.remove() на read-only итераторах или unmodifiable-представления фабрик. НЕ допустимо, когда неявный контракт супертипа гарантирует операцию — PaymentProcessor.refund() на том, что IS-A PaymentProcessor."
          }
        },
        {
          id: "blk_fu_11",
          type: "CALLOUT",
          title: { en: "Q11: How does LSP relate to the Open/Closed Principle?", ru: "Q11: Как LSP связан с Open/Closed Principle?" },
          content: {
            en: "Model Answer: OCP says extend behavior without modifying existing code. LSP ensures those extensions are actually safe to use polymorphically. You can add BankTransfer as a new PaymentProcessor (OCP), but if refund() is broken, polymorphic callers crash — LSP guards the extension mechanism OCP relies on.",
            ru: "Ответ: OCP говорит расширять поведение без изменения существующего кода. LSP гарантирует, что расширения безопасны для полиморфного использования. Можно добавить BankTransfer как новый PaymentProcessor (OCP), но сломанный refund() роняет полиморфных клиентов — LSP защищает механизм расширения OCP."
          }
        },
        {
          id: "blk_fu_12",
          type: "CALLOUT",
          title: { en: "Q12: Design a type-safe API for irreversible wire transfers alongside card refunds", ru: "Q12: Спроектируйте type-safe API для необратимых wire-переводов рядом с card refund" },
          content: {
            en: "Model Answer: PaymentProcessor for process-only. RefundablePaymentProcessor extends PaymentProcessor with refund(). CardPayment implements RefundablePaymentProcessor; BankTransfer implements PaymentProcessor only. Charge path: charge(PaymentProcessor). Chargeback path: reversePayment(RefundablePaymentProcessor). Clear type boundaries prevent accidental substitution.",
            ru: "Ответ: PaymentProcessor только для process. RefundablePaymentProcessor расширяет его refund(). CardPayment реализует RefundablePaymentProcessor; BankTransfer — только PaymentProcessor. Charge: charge(PaymentProcessor). Chargeback: reversePayment(RefundablePaymentProcessor). Явные границы типов предотвращают случайную подстановку."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_liskov_1987_data_abstraction", "src_effective_java_item18", "src_baeldung_lsp"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#lsp", "#behavioral-subtyping", "#payments", "#solid", "#interface-segregation"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_LISKOV: readonly TheoryCheckpoint[] = [
  {
    id: "chk_lsp_1",
    theoryArticleId: "art_theory_liskov",
    question: {
      en: "What is the primary requirement of the Liskov Substitution Principle?",
      ru: "В чем заключается главное требование принципа подстановки Лисков?"
    },
    explanation: {
      en: "Subtypes must be behaviorally substitutable for base types without breaking client assumptions or program correctness.",
      ru: "Подтипы должны быть поведенчески взаимозаменяемы с базовыми типами без нарушения предположений клиентов и корректности программы."
    },
    options: [
      {
        id: "opt_lsp1_a",
        text: {
          en: "Subtypes must extend the base class and inherit all fields and methods.",
          ru: "Подтипы должны наследовать базовый класс и все его поля и методы."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Structural inheritance alone does not satisfy LSP — behavior must also be substitutable.",
          ru: "Неверно. Структурного наследования недостаточно — поведение тоже должно быть взаимозаменяемым."
        },
        misconceptionId: "err_square_rectangle_only_answer"
      },
      {
        id: "opt_lsp1_b",
        text: {
          en: "Subtypes must be usable wherever the base type is expected without altering program correctness.",
          ru: "Подтипы должны быть пригодны везде, где ожидается базовый тип, без нарушения корректности программы."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! LSP is about behavioral substitutability, not just IS-A inheritance diagrams.",
          ru: "Верно! LSP — о поведенческой взаимозаменяемости, а не только о диаграммах IS-A наследования."
        }
      },
      {
        id: "opt_lsp1_c",
        text: {
          en: "Subtypes must always override every method of the base class.",
          ru: "Подтипы должны всегда переопределять каждый метод базового класса."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Overriding methods is not required — honoring behavioral contracts is.",
          ru: "Неверно. Переопределение методов не обязательно — важно соблюдение поведенческих контрактов."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_lsp_2",
    theoryArticleId: "art_theory_liskov",
    question: {
      en: "Why does BankTransfer implementing PaymentProcessor violate LSP when used in reversePayment?",
      ru: "Почему BankTransfer, реализующий PaymentProcessor, нарушает LSP при использовании в reversePayment?"
    },
    explanation: {
      en: "BankTransfer.refund() throws UnsupportedOperationException, breaking the behavioral contract that PaymentProcessor clients expect.",
      ru: "BankTransfer.refund() бросает UnsupportedOperationException, нарушая поведенческий контракт, который ожидают клиенты PaymentProcessor."
    },
    options: [
      {
        id: "opt_lsp2_a",
        text: {
          en: "Because refund() throws an exception clients of PaymentProcessor do not expect, breaking behavioral substitutability.",
          ru: "Потому что refund() бросает исключение, которого клиенты PaymentProcessor не ожидают, нарушая поведенческую взаимозаменяемость."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! reversePayment reasonably assumes any PaymentProcessor supports refund().",
          ru: "Верно! reversePayment обоснованно предполагает, что любой PaymentProcessor поддерживает refund()."
        }
      },
      {
        id: "opt_lsp2_b",
        text: {
          en: "Because PaymentProcessor is a final interface and cannot be implemented.",
          ru: "Потому что PaymentProcessor — final-интерфейс и не может быть реализован."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Interfaces are not final — the problem is behavioral, not syntactic.",
          ru: "Неверно. Интерфейсы не final — проблема поведенческая, а не синтаксическая."
        }
      },
      {
        id: "opt_lsp2_c",
        text: {
          en: "Because PaymentRequest is a record and records cannot be refunded.",
          ru: "Потому что PaymentRequest — record, а records нельзя refund."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Records work fine as request DTOs — the LSP violation is in refund() behavior.",
          ru: "Неверно. Records отлично работают как DTO запроса — нарушение LSP в поведении refund()."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_lsp_3",
    theoryArticleId: "art_theory_liskov",
    question: {
      en: "What is the production-safe fix for irreversible bank transfers alongside refundable card payments?",
      ru: "Какое безопасное решение для необратимых bank transfers рядом с refundable card payments?"
    },
    explanation: {
      en: "Segregate interfaces: PaymentProcessor (process-only) and RefundablePaymentProcessor; BankTransfer implements only the former.",
      ru: "Сегрегируйте интерфейсы: PaymentProcessor (только process) и RefundablePaymentProcessor; BankTransfer реализует только первый."
    },
    options: [
      {
        id: "opt_lsp3_a",
        text: {
          en: "Segregate interfaces: PaymentProcessor for process-only, RefundablePaymentProcessor for refund — BankTransfer never claims refund support.",
          ru: "Сегрегация интерфейсов: PaymentProcessor только для process, RefundablePaymentProcessor для refund — BankTransfer никогда не заявляет поддержку refund."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Capability interfaces make irreversibility explicit and avoid hidden LSP traps.",
          ru: "Верно! Capability-интерфейсы делают необратимость явной и избегают скрытых LSP-ловушек."
        }
      },
      {
        id: "opt_lsp3_b",
        text: {
          en: "Add synchronized keyword to BankTransfer.refund() to make it thread-safe.",
          ru: "Добавить synchronized к BankTransfer.refund() для потокобезопасности."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Thread safety does not fix behavioral substitutability — refund() still throws.",
          ru: "Неверно. Потокобезопасность не чинит поведенческую взаимозаменяемость — refund() по-прежнему бросает исключение."
        }
      },
      {
        id: "opt_lsp3_c",
        text: {
          en: "Override refund() to return PaymentResult(success=false) instead of throwing UnsupportedOperationException.",
          ru: "Переопределить refund() для возврата PaymentResult(success=false) вместо UnsupportedOperationException."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Returning a soft failure still violates client expectations if the orchestrator treats false as a retryable payment error rather than 'capability missing'.",
          ru: "Неверно. Мягкий failure всё равно нарушает ожидания, если оркестратор трактует false как retryable ошибку платежа, а не как отсутствие capability.",
        },
        misconceptionId: "err_strengthened_precondition"
      }
    ],
    order: 3
  }
];
