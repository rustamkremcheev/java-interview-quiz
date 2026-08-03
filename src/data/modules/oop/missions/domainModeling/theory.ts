import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_DOMAIN_MODELING: TheoryArticle = {
  id: "art_theory_domain_modeling",
  topicIds: ["top_oop_33"],
  conceptIds: ["cpt_domain_modeling", "cpt_value_objects"],
  title: {
    en: "Domain Modeling: Illegal States & LoanApplication Value Objects",
    ru: "Domain Modeling: Нелегальные Состояния и Value Objects LoanApplication"
  },
  summary: {
    en: "Primitive Obsession lets LoanApplication encode approved=true with REJECTED and negative amounts. Domain modeling replaces String/boolean/double bags with ApplicantId, LoanMoney, LoanStatus, CreditDecision, and ApprovalPolicy so illegal lending states become unrepresentable — focused value objects + entity invariants, not a full DDD course.",
    ru: "Primitive Obsession позволяет LoanApplication кодировать approved=true при REJECTED и отрицательные суммы. Domain modeling заменяет мешки String/boolean/double на ApplicantId, LoanMoney, LoanStatus, CreditDecision и ApprovalPolicy, делая нелегальные lending-состояния непредставимыми — сфокусированные value objects + инварианты сущности, не полный курс DDD."
  },
  sections: [
    {
      id: "sec_dm_definition",
      category: "DEFINITION",
      title: {
        en: "1. Make Illegal States Unrepresentable",
        ru: "1. Делать Нелегальные Состояния Непредставимыми"
      },
      blocks: [
        {
          id: "blk_dm_def_1",
          type: "PARAGRAPH",
          content: {
            en: "If the type system can construct a LoanApplication that is both REJECTED and approved=true, or that holds amount=-5000.0, then every downstream service must re-validate those rules — and one missed check becomes a compliance incident. Evans-style domain modeling (adapted, lite) pushes invariants into types and behavior: prefer models where illegal combinations do not compile or cannot be constructed.",
            ru: "Если система типов может построить LoanApplication, который одновременно REJECTED и approved=true, или держит amount=-5000.0, каждый downstream-сервис обязан заново проверять эти правила — и один пропущенный check становится инцидентом compliance. Domain modeling в духе Evans (адаптировано, lite) переносит инварианты в типы и поведение: предпочитайте модели, где нелегальные комбинации не компилируются или не конструируются."
          }
        },
        {
          id: "blk_dm_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Types Encode Business Rules",
            ru: "💡 Главная Ментальная Модель: Типы Кодируют Бизнес-Правила"
          },
          content: {
            en: "A boolean approved beside a free-form String status is two independent knobs that can disagree. A CreditDecision (or a LoanStatus that already means APPROVED/REJECTED) is one knob. LoanMoney(long cents) cannot be negative if the compact constructor rejects cents < 0. Modeling is choosing representations that make contradictions hard.",
            ru: "boolean approved рядом со свободным String status — две независимые ручки, которые могут расходиться. CreditDecision (или LoanStatus, уже означающий APPROVED/REJECTED) — одна ручка. LoanMoney(long cents) не может быть отрицательным, если compact constructor отвергает cents < 0. Моделирование — выбор представлений, где противоречия затруднены."
          }
        }
      ]
    },
    {
      id: "sec_dm_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Value Objects, Status, and Aggregate-Boundary Transitions",
        ru: "2. Value Objects, Status и Переходы на Границе Агрегата"
      },
      blocks: [
        {
          id: "blk_dm_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Value objects (Fowler / Evans classification): defined by attributes, immutable, value equality, self-validating. ApplicantId wraps a non-blank lending applicant key. LoanMoney stores long amountCents (not double) so floating-point drift and negative amounts die at construction. LoanStatus is an enum (or sealed hierarchy): DRAFT, SUBMITTED, APPROVED, REJECTED — no typo strings.",
            ru: "Value objects (классификация Fowler / Evans): определяются атрибутами, неизменяемы, равенство по значению, самовалидация. ApplicantId оборачивает непустой ключ заявителя. LoanMoney хранит long amountCents (не double), поэтому drift с плавающей точкой и отрицательные суммы умирают при создании. LoanStatus — enum (или sealed): DRAFT, SUBMITTED, APPROVED, REJECTED — без строк-опечаток."
          }
        },
        {
          id: "blk_dm_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Independent approved Flag: Production Contradiction",
            ru: "⚙️ Независимый Флаг approved: Противоречие на Продакшене"
          },
          content: {
            en: "Public fields `status = \"REJECTED\"; approved = true;` compile and persist. Risk engines that trust `approved` book capacity for denied loans. Fix: remove the redundant boolean; derive outcome from LoanStatus or store a single CreditDecision produced by ApprovalPolicy.decide(...). Transitions happen only through LoanApplication.submit() / decide(CreditDecision) — not setters.",
            ru: "Public fields `status = \"REJECTED\"; approved = true;` компилируются и персистятся. Risk engines, доверяющие `approved`, резервируют ёмкость для отклонённых займов. Фикс: убрать избыточный boolean; выводить исход из LoanStatus или хранить один CreditDecision от ApprovalPolicy.decide(...). Переходы только через LoanApplication.submit() / decide(CreditDecision) — не через setters."
          }
        },
        {
          id: "blk_dm_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Aggregate Boundary Lite (Not Full DDD)",
            ru: "📜 Граница Агрегата Lite (Не Полный DDD)"
          },
          content: {
            en: "Treat LoanApplication as the consistency boundary for its status and amount: outsiders never mutate fields; they call behavior methods that apply ApprovalPolicy rules (e.g. only SUBMITTED may be decided; APPROVED requires positive LoanMoney). Skip repositories, bounded contexts, and event storms here — the interview win is illegal-states-unrepresentable + value objects + transition methods.",
            ru: "Считайте LoanApplication границей согласованности для status и amount: снаружи поля не мутируют; вызывают методы поведения, применяющие правила ApprovalPolicy (например, decide только из SUBMITTED; APPROVED требует положительный LoanMoney). Repositories, bounded contexts и event storms здесь пропускаем — выигрыш на интервью: illegal-states-unrepresentable + value objects + методы перехода."
          }
        }
      ]
    },
    {
      id: "sec_dm_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Typed Domain vs Primitive DTOs",
        ru: "3. Компромиссы: Типизированный Домен vs Примитивные DTO"
      },
      blocks: [
        {
          id: "blk_dm_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "Value objects add types and mapping at persistence/API edges. For a throwaway report DTO that never enforces lending rules, primitives may be fine. For LoanApplication that feeds underwriting and capacity booking, typed models pay for themselves: fewer scattered validators, clearer code review, and fewer 'how did REJECTED get approved?' incidents. Prefer LoanMoney over a shared Money name if another bounded context already owns a Money type — package or rename (lending.domain.LoanMoney) to avoid collisions.",
            ru: "Value objects добавляют типы и mapping на границах persistence/API. Для одноразового report DTO без lending-правил примитивы могут быть ок. Для LoanApplication, питающего андеррайтинг и booking ёмкости, типизированные модели окупаются: меньше размазанных валидаторов, яснее code review и меньше инцидентов «как REJECTED стал approved?». Предпочитайте LoanMoney общему имени Money, если другой bounded context уже владеет типом Money — пакет или rename (lending.domain.LoanMoney), чтобы избежать коллизий."
          }
        },
        {
          id: "blk_dm_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Map extras: Escape Hatch or Smell?",
            ru: "🔧 Map extras: Escape Hatch или Smell?"
          },
          content: {
            en: "An open Map<String,Object> extras recreates Primitive Obsession for unknown keys. Prefer explicit optional fields or a typed UnderwritingNotes value object. If you must keep a map at the anti-corruption layer, do not let it drive status/amount/approval — those stay on typed fields.",
            ru: "Открытый Map<String,Object> extras воссоздаёт Primitive Obsession для неизвестных ключей. Предпочитайте явные optional-поля или типизированный value object UnderwritingNotes. Если map нужен на anti-corruption слое, не давайте ему управлять status/amount/approval — они остаются на типизированных полях."
          }
        }
      ]
    },
    {
      id: "sec_dm_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: Domain Modeling",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Domain Modeling"
      },
      blocks: [
        {
          id: "blk_dm_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What does Primitive Obsession mean here?' — Model Answer: Using String/boolean/double for domain concepts that have rules (applicant identity, money, loan lifecycle). The primitives compile illegal combinations; value objects / enums push rules to construction and types.",
            ru: "Доп. Вопрос 1: 'Что значит Primitive Obsession здесь?' — Модельный Ответ: Использование String/boolean/double для доменных понятий с правилами (идентичность заявителя, деньги, жизненный цикл займа). Примитивы компилируют нелегальные комбинации; value objects / enums переносят правила в конструкцию и типы."
          }
        },
        {
          id: "blk_dm_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'Value object vs entity for LoanApplication?' — Model Answer: LoanApplication is an entity (identity over time, mutable lifecycle). ApplicantId and LoanMoney are value objects (no lifecycle identity; replace, don't mutate). CreditDecision is typically a value capturing an outcome.",
            ru: "Доп. Вопрос 2: 'Value object vs entity для LoanApplication?' — Модельный Ответ: LoanApplication — entity (идентичность во времени, мутабельный lifecycle). ApplicantId и LoanMoney — value objects (без lifecycle-идентичности; заменяем, не мутируем). CreditDecision обычно value, фиксирующий исход."
          }
        },
        {
          id: "blk_dm_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why long cents instead of double?' — Model Answer: Binary floating point cannot represent many decimal amounts exactly; negative/NaN paths are easier to miss. long amountCents (or BigDecimal with scale policy) makes money arithmetic explicit and lets the constructor forbid cents < 0.",
            ru: "Доп. Вопрос 3: 'Почему long cents вместо double?' — Модельный Ответ: Двоичная плавающая точка неточно представляет многие десятичные суммы; пути negative/NaN легче пропустить. long amountCents (или BigDecimal с политикой scale) делает арифметику денег явной и позволяет конструктору запретить cents < 0."
          }
        },
        {
          id: "blk_dm_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'How do you stop REJECTED+approved?' — Model Answer: Delete the redundant approved boolean. Status APPROVED/REJECTED is the decision. Or store Optional<CreditDecision> set only via decide(), never independently of LoanStatus.",
            ru: "Доп. Вопрос 4: 'Как остановить REJECTED+approved?' — Модельный Ответ: Удалить избыточный boolean approved. Status APPROVED/REJECTED и есть решение. Или хранить Optional<CreditDecision>, выставляемый только через decide(), никогда независимо от LoanStatus."
          }
        },
        {
          id: "blk_dm_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Where does ApprovalPolicy live?' — Model Answer: Domain policy collaborator used by LoanApplication.decide. It encodes rules (min amount, allowed transitions). Keep application services thin: load aggregate → call decide → persist.",
            ru: "Доп. Вопрос 5: 'Где живёт ApprovalPolicy?' — Модельный Ответ: Доменный policy-коллаборатор, используемый LoanApplication.decide. Кодирует правила (мин. сумма, допустимые переходы). Application services тонкие: load aggregate → call decide → persist."
          }
        },
        {
          id: "blk_dm_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'Is this the same as Anemic Domain Model?' — Model Answer: Related but distinct. Anemic = behaviorless bags + fat services. Primitive Obsession = wrong types even if some methods exist. LoanApplication fix addresses both: rich transitions + proper value types.",
            ru: "Доп. Вопрос 6: 'Это то же, что Anemic Domain Model?' — Модельный Ответ: Связано, но различно. Anemic = мешки без поведения + толстые сервисы. Primitive Obsession = неверные типы даже при наличии методов. Фикс LoanApplication бьёт по обоим: богатые переходы + правильные value types."
          }
        },
        {
          id: "blk_dm_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How do you persist value objects?' — Model Answer: Embed columns (applicant_id, amount_cents, status) or JPA AttributeConverter / @Embeddable. Mapping lives at the edge; domain types stay free of JDBC types.",
            ru: "Доп. Вопрос 7: 'Как персистить value objects?' — Модельный Ответ: Embed-колонки (applicant_id, amount_cents, status) или JPA AttributeConverter / @Embeddable. Mapping на границе; доменные типы свободны от JDBC-типов."
          }
        },
        {
          id: "blk_dm_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'What about API JSON still using primitives?' — Model Answer: Anti-corruption / mapper layer converts DTO primitives into domain types once. Controllers never construct illegal LoanApplication by setting public fields.",
            ru: "Доп. Вопрос 8: 'А API JSON всё ещё на примитивах?' — Модельный Ответ: Anti-corruption / mapper слой один раз конвертирует DTO-примитивы в доменные типы. Controllers никогда не собирают нелегальный LoanApplication через public fields."
          }
        },
        {
          id: "blk_dm_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'Sealed LoanStatus vs enum?' — Model Answer: Enum is enough for a closed lifecycle. Sealed interfaces help if statuses carry different payloads (e.g. Rejected(reasonCode)). Prefer the simplest closed set that matches the domain.",
            ru: "Доп. Вопрос 9: 'Sealed LoanStatus vs enum?' — Модельный Ответ: Enum достаточно для закрытого lifecycle. Sealed interfaces полезны, если статусы несут разный payload (например Rejected(reasonCode)). Выбирайте простейший закрытый набор, соответствующий домену."
          }
        },
        {
          id: "blk_dm_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'Why rename Money to LoanMoney?' — Model Answer: Avoid colliding with another module's Money (e.g. the immutability / defensive-copy mission). Same concept family, different package/context — explicit naming prevents wrong imports and mixed invariants.",
            ru: "Доп. Вопрос 10: 'Зачем rename Money → LoanMoney?' — Модельный Ответ: Избежать коллизии с Money другого модуля (например миссия immutability / defensive-copy). То же семейство понятий, другой package/context — явное имя предотвращает неверные import и смешанные инварианты."
          }
        },
        {
          id: "blk_dm_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Can validation annotations on fields replace value objects?' — Model Answer: Bean Validation helps at boundaries but still allows in-memory illegal combinations via reflection/setters and does not remove redundant approved vs status. Types + transition methods are stronger.",
            ru: "Доп. Вопрос 11: 'Могут ли validation annotations заменить value objects?' — Модельный Ответ: Bean Validation помогает на границах, но всё ещё допускает in-memory нелегальные комбинации через reflection/setters и не убирает избыточный approved vs status. Типы + методы перехода сильнее."
          }
        },
        {
          id: "blk_dm_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'What ArchUnit / review rule after this incident?' — Model Answer: Forbid public fields on LoanApplication; forbid double for money in lending.domain; require decide/submit for status changes; integration test that REJECTED applications never report isApproved().",
            ru: "Доп. Вопрос 12: 'Какое ArchUnit / review правило после инцидента?' — Модельный Ответ: Запретить public fields на LoanApplication; запретить double для денег в lending.domain; требовать decide/submit для смены status; интеграционный тест, что REJECTED никогда не репортит isApproved()."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: ["cpt_invariants", "cpt_encapsulation"],
  sourceIds: ["src_evans_ddd_adapted", "src_fowler_value_object", "src_head_first_ooad_dm", "src_baeldung_value_objects"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#domain-modeling", "#value-objects", "#primitive-obsession", "#loan-application"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_DOMAIN_MODELING: readonly TheoryCheckpoint[] = [
  {
    id: "chk_dm_1",
    theoryArticleId: "art_theory_domain_modeling",
    question: {
      en: "What is the primary modeling win of replacing String status + boolean approved with LoanStatus / CreditDecision?",
      ru: "В чём главный выигрыш моделирования при замене String status + boolean approved на LoanStatus / CreditDecision?"
    },
    explanation: {
      en: "Independent flags can disagree (REJECTED + approved=true); a single typed outcome cannot encode that contradiction.",
      ru: "Независимые флаги могут расходиться (REJECTED + approved=true); один типизированный исход не кодирует это противоречие."
    },
    options: [
      {
        id: "opt_dm1_a",
        text: {
          en: "Illegal combinations like REJECTED + approved=true become unrepresentable (or impossible to construct).",
          ru: "Нелегальные комбинации вроде REJECTED + approved=true становятся непредставимыми (или неконструируемыми)."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! That is make-illegal-states-unrepresentable applied to lending lifecycle.",
          ru: "Верно! Это make-illegal-states-unrepresentable для lending lifecycle."
        }
      },
      {
        id: "opt_dm1_b",
        text: {
          en: "Enums make JDBC inserts 10× faster than Strings.",
          ru: "Enums делают JDBC insert в 10× быстрее, чем Strings."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The win is correctness of domain states, not JDBC throughput.",
          ru: "Неверно. Выигрыш — корректность доменных состояний, не throughput JDBC."
        }
      },
      {
        id: "opt_dm1_c",
        text: {
          en: "boolean approved must remain so JSON serializers keep working.",
          ru: "boolean approved обязан остаться, чтобы JSON-сериализаторы продолжали работать."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. DTOs can map at the edge; the domain should not keep contradictory flags.",
          ru: "Неверно. DTO могут маппиться на границе; домен не должен держать противоречивые флаги."
        },
        misconceptionId: "err_redundant_approved_flag"
      }
    ],
    order: 1
  },
  {
    id: "chk_dm_2",
    theoryArticleId: "art_theory_domain_modeling",
    question: {
      en: "Why model loan amounts as LoanMoney(long amountCents) instead of double amount?",
      ru: "Почему моделировать суммы займа как LoanMoney(long amountCents) вместо double amount?"
    },
    explanation: {
      en: "Self-validating value object forbids negative/NaN money and avoids binary floating-point money bugs.",
      ru: "Самовалидирующий value object запрещает negative/NaN деньги и избегает багов двоичной плавающей точки."
    },
    options: [
      {
        id: "opt_dm2_a",
        text: {
          en: "Compact constructor can reject cents < 0 and avoid floating-point money representation hazards.",
          ru: "Compact constructor может отвергать cents < 0 и избегать hazards представления денег с плавающей точкой."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Value objects encapsulate money invariants at construction.",
          ru: "Верно! Value objects инкапсулируют денежные инварианты при создании."
        }
      },
      {
        id: "opt_dm2_b",
        text: {
          en: "double is illegal in Java 17, so long is mandatory.",
          ru: "double запрещён в Java 17, поэтому long обязателен."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. double is legal; it is a poor money type for lending invariants.",
          ru: "Неверно. double законен; это плохой тип денег для lending-инвариантов."
        },
        misconceptionId: "err_double_money_loan"
      },
      {
        id: "opt_dm2_c",
        text: {
          en: "long cents automatically sync approved and status fields.",
          ru: "long cents автоматически синхронизирует поля approved и status."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Money typing is orthogonal to status/decision modeling.",
          ru: "Неверно. Типизация денег ортогональна моделированию status/decision."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_dm_3",
    theoryArticleId: "art_theory_domain_modeling",
    question: {
      en: "How should LoanApplication change from SUBMITTED to APPROVED in a well-modeled aggregate?",
      ru: "Как LoanApplication должен переходить из SUBMITTED в APPROVED в хорошо смоделированном агрегате?"
    },
    explanation: {
      en: "Via behavior methods + ApprovalPolicy — not public field writes.",
      ru: "Через методы поведения + ApprovalPolicy — не через запись в public fields."
    },
    options: [
      {
        id: "opt_dm3_a",
        text: {
          en: "Call decide(CreditDecision) / ApprovalPolicy so transitions enforce invariants at the aggregate boundary.",
          ru: "Вызвать decide(CreditDecision) / ApprovalPolicy, чтобы переходы защищали инварианты на границе агрегата."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Behavior methods are the write API of the aggregate.",
          ru: "Верно! Методы поведения — write API агрегата."
        }
      },
      {
        id: "opt_dm3_b",
        text: {
          en: "Set public status and approved fields from the controller after a SQL update.",
          ru: "Выставить public status и approved из controller после SQL update."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That recreates the illegal-state incident class.",
          ru: "Неверно. Это воспроизводит класс инцидента нелегальных состояний."
        },
        misconceptionId: "err_public_field_transitions"
      },
      {
        id: "opt_dm3_c",
        text: {
          en: "Put all transition rules only in a Map extras key named 'workflow'.",
          ru: "Положить все правила переходов только в ключ Map extras с именем 'workflow'."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Open maps recreate Primitive Obsession and hide invariants.",
          ru: "Неверно. Открытые map воссоздают Primitive Obsession и прячут инварианты."
        }
      }
    ],
    order: 3
  }
];
