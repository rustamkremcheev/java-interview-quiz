import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_INTRODUCTION_TO_OOP: TheoryArticle = {
  id: "art_theory_introduction_to_oop",
  topicIds: ["top_oop_01"],
  conceptIds: ["cpt_oop_paradigm", "cpt_procedural_vs_oop", "cpt_object_collaboration"],
  title: {
    en: "From Procedural Clearing Scripts to Object Collaboration",
    ru: "От Процедурных Clearing-Скриптов к Сотрудничеству Объектов"
  },
  summary: {
    en: "OOP models a problem as collaborating objects with state and behavior. Procedural clearing scripts using maps, string statuses, and global helpers break new rails inconsistently because rules are duplicated across helpers. ClearingPayment, workflow, policy, and store localize transitions.",
    ru: "ООП моделирует задачу как сотрудничающие объекты с состоянием и поведением. Процедурные clearing-скрипты на maps, строковых статусах и глобальных хелперах ломают новые rails несогласованно, потому что правила дублируются. ClearingPayment, workflow, policy и store локализуют переходы."
  },
  sections: [
    {
      id: "sec_intro_definition",
      category: "DEFINITION",
      title: {
        en: "1. OOP Paradigm: Objects with State and Behavior",
        ru: "1. Парадигма ООП: Объекты с Состоянием и Поведением"
      },
      blocks: [
        {
          id: "blk_intro_def_1",
          type: "PARAGRAPH",
          content: {
            en: "Object-oriented programming organizes software around objects that combine data (state) with operations that maintain that data (behavior). A ClearingPayment is not a bag of map entries — it is an entity with ClearingPaymentId, ClearingPaymentStatus, and methods that enforce valid transitions. Oracle's OOP concepts materials stress objects as the unit of modularity: clients ask an object to do work rather than reaching into a shared structure from distant helpers.",
            ru: "Объектно-ориентированное программирование организует ПО вокруг объектов, объединяющих данные (state) с операциями, поддерживающими эти данные (behavior). ClearingPayment — не мешок записей map — это сущность с ClearingPaymentId, ClearingPaymentStatus и методами, гарантирующими валидные переходы. Материалы Oracle по концепциям ООП подчёркивают объекты как единицу модульности: клиенты просят объект сделать работу, а не лезут в общую структуру из далёких хелперов."
          }
        },
        {
          id: "blk_intro_def_2",
          type: "CALLOUT",
          title: {
            en: "💡 Core Mental Model: Ask the Object, Don't Poke the Map",
            ru: "💡 Главная Ментальная Модель: Проси Объект, не Трогай Map"
          },
          content: {
            en: "If call sites write `payment.put(\"status\", \"OK\")`, behavior lives outside the data. Prefer `clearingPayment.markCleared(policy)` so the object and its collaborators own the rule.",
            ru: "Если call site пишут `payment.put(\"status\", \"OK\")`, поведение живёт вне данных. Предпочитайте `clearingPayment.markCleared(policy)`, чтобы объект и его сотрудники владели правилом."
          }
        }
      ]
    },
    {
      id: "sec_intro_mechanics",
      category: "MECHANICS",
      title: {
        en: "2. Procedural vs OOP Mechanics in Clearing Flows",
        ru: "2. Механика Procedural vs OOP в Clearing-Потоках"
      },
      blocks: [
        {
          id: "blk_intro_mech_1",
          type: "PARAGRAPH",
          content: {
            en: "Procedural style: data in Map/DTO fields, logic in static helpers (validateClearing, markOk, persist). Each helper assumes a slightly different schema and string vocabulary (\"PEND\", \"OK\", \"CLR\"). Adding NEW_RAIL means hunting every helper — miss one path and production diverges. OOP style: ClearingPaymentWorkflow orchestrates; ClearingValidationPolicy encodes rail rules; ClearingPaymentStore persists; ClearingPayment holds typed status. One transition API, many rails as policy variants.",
            ru: "Процедурный стиль: данные в Map/DTO, логика в static-хелперах (validateClearing, markOk, persist). Каждый хелпер предполагает чуть другую схему и словарь строк (\"PEND\", \"OK\", \"CLR\"). Добавление NEW_RAIL значит охоту по всем хелперам — пропустите один путь, и продакшн разойдётся. Стиль ООП: ClearingPaymentWorkflow оркестрирует; ClearingValidationPolicy кодирует правила rail; ClearingPaymentStore сохраняет; ClearingPayment держит типизированный статус. Один API переходов, много rails как варианты политики."
          }
        },
        {
          id: "blk_intro_mech_2",
          type: "WARNING",
          title: {
            en: "⚙️ Dual Writers on Shared Maps",
            ru: "⚙️ Dual Writers на Общих Maps"
          },
          content: {
            en: "When processClearing and markOkGlobal both mutate the same map, status rules fork. Object collaboration with a single transition method removes dual writers.",
            ru: "Когда processClearing и markOkGlobal оба мутируют одну map, правила статусов ветвятся. Сотрудничество объектов с одним методом перехода убирает dual writers."
          }
        },
        {
          id: "blk_intro_mech_3",
          type: "CALLOUT",
          title: {
            en: "📜 Naming Note: Avoid StaticClearingUtils",
            ru: "📜 Заметка об Именах: Избегайте StaticClearingUtils"
          },
          content: {
            en: "Use ClearingPayment* names in this mission. StaticClearingUtils is reserved for Liskov Substitution scenarios elsewhere in the module — colliding names confuse the knowledge graph.",
            ru: "В этой миссии используйте имена ClearingPayment*. StaticClearingUtils зарезервирован для сценариев Liskov Substitution в другом месте модуля — коллизии имён путают граф знаний."
          }
        }
      ]
    },
    {
      id: "sec_intro_tradeoffs",
      category: "TRADE_OFFS",
      title: {
        en: "3. Trade-offs: Scripts vs Object Models",
        ru: "3. Компромиссы: Скрипты vs Объектные Модели"
      },
      blocks: [
        {
          id: "blk_intro_trade_1",
          type: "PARAGRAPH",
          content: {
            en: "A short-lived import script may tolerate maps. Multi-rail clearing with compliance audit does not: inconsistent status writes become regulatory findings. Object models cost types and wiring; they buy localized change and testable policies. Head First OOA&D emphasizes modeling the problem as collaborating objects early when change is expected — rails are change.",
            ru: "Короткоживущий import-скрипт может терпеть maps. Multi-rail clearing с compliance-аудитом — нет: несогласованные записи статусов становятся regulatory findings. Объектные модели стоят типов и wiring; они дают локализованные изменения и тестируемые политики. Head First OOA&D подчёркивает моделирование задачи сотрудничающими объектами рано, когда ожидаются изменения — rails и есть изменения."
          }
        },
        {
          id: "blk_intro_trade_2",
          type: "CALLOUT",
          title: {
            en: "🔧 Incremental Migration",
            ru: "🔧 Инкрементальная Миграция"
          },
          content: {
            en: "You need not rewrite overnight. Introduce ClearingPayment at the API boundary, route new rails through workflow/policy first, then delete static helpers as characterization coverage grows.",
            ru: "Не обязательно переписывать за ночь. Введите ClearingPayment на API-границе, проведите новые rails сначала через workflow/policy, затем удаляйте static-хелперы по мере роста characterization-покрытия."
          }
        }
      ]
    },
    {
      id: "sec_intro_interview_followups",
      category: "INTERVIEW_GUIDANCE",
      title: {
        en: "4. Senior Interview Follow-Up Questions: OOP Introduction",
        ru: "4. Дополнительные Вопросы Senior-Интервью: Введение в ООП"
      },
      blocks: [
        {
          id: "blk_intro_fup_01",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q1: 'What is OOP in one sentence?' — Model Answer: Software organized as objects that combine state and behavior and collaborate via messages/methods rather than shared global data structures.",
            ru: "Доп. Вопрос 1: 'Что такое ООП в одном предложении?' — Модельный Ответ: ПО, организованное как объекты, объединяющие state и behavior и сотрудничающие через сообщения/методы, а не через общие глобальные структуры данных."
          }
        },
        {
          id: "blk_intro_fup_02",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q2: 'How do you spot procedural Java that only looks OOP?' — Model Answer: Anemic maps/DTOs plus static utility classes with all the if/else; classes named *Util/*Helper holding business rules.",
            ru: "Доп. Вопрос 2: 'Как заметить процедурный Java, который только выглядит как ООП?' — Модельный Ответ: Анемичные maps/DTO плюс static utility со всеми if/else; классы *Util/*Helper, держащие бизнес-правила."
          }
        },
        {
          id: "blk_intro_fup_03",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q3: 'Why are string statuses dangerous?' — Model Answer: Typos, inconsistent vocabularies across helpers, and no exhaustiveness checking when a new rail adds states.",
            ru: "Доп. Вопрос 3: 'Почему опасны строковые статусы?' — Модельный Ответ: Опечатки, несогласованные словари в хелперах и отсутствие exhaustiveness при новых состояниях rail."
          }
        },
        {
          id: "blk_intro_fup_04",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q4: 'What does object collaboration mean here?' — Model Answer: Workflow, policy, and store each have a clear responsibility and talk through ClearingPayment rather than mutating a shared map independently.",
            ru: "Доп. Вопрос 4: 'Что значит сотрудничество объектов здесь?' — Модельный Ответ: Workflow, policy и store имеют ясные обязанности и общаются через ClearingPayment, а не независимо мутируют общую map."
          }
        },
        {
          id: "blk_intro_fup_05",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q5: 'Is encapsulation the same as OOP?' — Model Answer: Encapsulation is a pillar — hiding invariants inside the object — but OOP also includes collaboration and polymorphism across objects.",
            ru: "Доп. Вопрос 5: 'Инкапсуляция — это то же, что ООП?' — Модельный Ответ: Инкапсуляция — столп (скрытие инвариантов внутри объекта), но ООП также включает сотрудничество и полиморфизм между объектами."
          }
        },
        {
          id: "blk_intro_fup_06",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q6: 'When is a procedural script acceptable?' — Model Answer: Throwaway migrations, one-off reports, or glue with no evolving business rules — document the debt if it might grow.",
            ru: "Доп. Вопрос 6: 'Когда процедурный скрипт приемлем?' — Модельный Ответ: Одноразовые миграции, разовые отчёты или glue без эволюционирующих бизнес-правил — фиксируйте долг, если оно может вырасти."
          }
        },
        {
          id: "blk_intro_fup_07",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q7: 'How does Fowler frame object thinking?' — Model Answer: Focus on what objects know and do together in the domain, not on dumping data into structures and scattering procedures.",
            ru: "Доп. Вопрос 7: 'Как Fowler формулирует object thinking?' — Модельный Ответ: Фокус на том, что объекты знают и делают вместе в домене, а не на сбросе данных в структуры и размазывании процедур."
          }
        },
        {
          id: "blk_intro_fup_08",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q8: 'Where should rail-specific rules live?' — Model Answer: In ClearingValidationPolicy (or strategy variants), invoked by workflow — not copied into every static helper.",
            ru: "Доп. Вопрос 8: 'Где жить rail-specific правилам?' — Модельный Ответ: В ClearingValidationPolicy (или strategy-вариантах), вызываемой workflow — не копироваться в каждый static-хелпер."
          }
        },
        {
          id: "blk_intro_fup_09",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q9: 'How do you unit-test after the refactor?' — Model Answer: Test policy transitions with ClearingPayment fixtures; fake the store; assert workflow sequence without HashMap casting.",
            ru: "Доп. Вопрос 9: 'Как юнит-тестировать после рефакторинга?' — Модельный Ответ: Тестировать переходы policy с фикстурами ClearingPayment; подменять store; проверять последовательность workflow без кастов HashMap."
          }
        },
        {
          id: "blk_intro_fup_10",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q10: 'What is the first PR you reject on review?' — Model Answer: A PR that adds a new rail by duplicating if/else string checks in three utilities without a typed status transition API.",
            ru: "Доп. Вопрос 10: 'Какой первый PR вы отклоните на ревью?' — Модельный Ответ: PR, добавляющий новый rail дублированием if/else строковых проверок в трёх utilities без типизированного API переходов статуса."
          }
        },
        {
          id: "blk_intro_fup_11",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q11: 'Does OOP require inheritance?' — Model Answer: No. Collaboration and encapsulation matter first; inheritance is optional and often overused.",
            ru: "Доп. Вопрос 11: 'Требует ли ООП наследования?' — Модельный Ответ: Нет. Сначала важны сотрудничество и инкапсуляция; наследование опционально и часто злоупотребляется."
          }
        },
        {
          id: "blk_intro_fup_12",
          type: "PARAGRAPH",
          content: {
            en: "Follow-Up Q12: 'How does this prepare for later SOLID topics?' — Model Answer: Once behavior lives on collaborators with clear responsibilities, SRP/DIP discussions become concrete instead of abstract slogans over maps.",
            ru: "Доп. Вопрос 12: 'Как это готовит к SOLID позже?' — Модельный Ответ: Когда поведение живёт на сотрудниках с ясными обязанностями, обсуждения SRP/DIP становятся конкретными, а не абстрактными лозунгами над maps."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_intro_oracle_oop", "src_intro_hf_ooad", "src_intro_fowler_oo", "src_intro_oracle_objects"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#oop", "#procedural-vs-oop", "#clearing-payment", "#object-collaboration"],
  estimatedMinutes: 16,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_INTRODUCTION_TO_OOP: readonly TheoryCheckpoint[] = [
  {
    id: "chk_intro_1",
    theoryArticleId: "art_theory_introduction_to_oop",
    question: {
      en: "What is the primary failure mode of procedural clearing with maps and string statuses when a new rail arrives?",
      ru: "Какой главный режим отказа процедурного clearing с maps и строковыми статусами при появлении нового rail?"
    },
    explanation: {
      en: "Rules duplicated across helpers are updated inconsistently, so paths diverge.",
      ru: "Правила, продублированные в хелперах, обновляются несогласованно — пути расходятся."
    },
    options: [
      {
        id: "opt_intro1_a",
        text: {
          en: "Helpers are updated inconsistently, so some paths honor the new rail and others still write old string statuses.",
          ru: "Хелперы обновляются несогласованно: одни пути учитывают новый rail, другие всё ещё пишут старые строковые статусы."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Scattered procedural rules drift.",
          ru: "Верно! Размазанные процедурные правила дрейфуют."
        }
      },
      {
        id: "opt_intro1_b",
        text: {
          en: "Java forbids HashMap once more than one rail exists.",
          ru: "Java запрещает HashMap, когда rails больше одного."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. HashMap remains legal — the design smell is scattered rules.",
          ru: "Неверно. HashMap остаётся законным — smell дизайна в размазанных правилах."
        }
      },
      {
        id: "opt_intro1_c",
        text: {
          en: "Enums cannot represent clearing statuses in Java 17.",
          ru: "Enum не может представлять clearing-статусы в Java 17."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Enums are ideal for typed statuses.",
          ru: "Неверно. Enum идеальны для типизированных статусов."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_intro_2",
    theoryArticleId: "art_theory_introduction_to_oop",
    question: {
      en: "Which set best represents object collaboration for clearing?",
      ru: "Какой набор лучше представляет сотрудничество объектов для clearing?"
    },
    explanation: {
      en: "ClearingPayment with workflow, policy, and store collaborators.",
      ru: "ClearingPayment с сотрудниками workflow, policy и store."
    },
    options: [
      {
        id: "opt_intro2_a",
        text: {
          en: "ClearingPayment + ClearingPaymentWorkflow + ClearingValidationPolicy + ClearingPaymentStore",
          ru: "ClearingPayment + ClearingPaymentWorkflow + ClearingValidationPolicy + ClearingPaymentStore"
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Named collaborators with clear responsibilities.",
          ru: "Верно! Именованные сотрудники с ясными обязанностями."
        }
      },
      {
        id: "opt_intro2_b",
        text: {
          en: "One StaticClearingUtils class with twenty static methods over Map",
          ru: "Один класс StaticClearingUtils с двадцатью static-методами над Map"
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. That stays procedural (and uses a forbidden colliding name).",
          ru: "Неверно. Это остаётся процедурным (и использует запрещённое конфликтующее имя)."
        },
        misconceptionId: "err_intro_payment_processor_dump"
      },
      {
        id: "opt_intro2_c",
        text: {
          en: "Only ClearingPaymentStore — persistence is the whole model",
          ru: "Только ClearingPaymentStore — persistence и есть вся модель"
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Persistence alone does not own transitions or validation.",
          ru: "Неверно. Один persistence не владеет переходами и валидацией."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_intro_3",
    theoryArticleId: "art_theory_introduction_to_oop",
    question: {
      en: "Why is `payment.put(\"status\", \"OK\")` after a rail-specific validate still a defect?",
      ru: "Почему `payment.put(\"status\", \"OK\")` после rail-specific validate всё ещё дефект?"
    },
    explanation: {
      en: "Blind string writes bypass end-to-end transition ownership.",
      ru: "Слепая запись строк обходит end-to-end владение переходами."
    },
    options: [
      {
        id: "opt_intro3_a",
        text: {
          en: "It bypasses a single transition API — validation and status write are not one object-owned operation.",
          ru: "Оно обходит единый API переходов — валидация и запись статуса не одна операция, принадлежащая объекту."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Dual steps without ownership recreate procedural drift.",
          ru: "Верно! Два шага без владения воссоздают процедурный drift."
        }
      },
      {
        id: "opt_intro3_b",
        text: {
          en: "HashMap.put cannot store String values in Java 17.",
          ru: "HashMap.put не может хранить String в Java 17."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. put works — the issue is design ownership.",
          ru: "Неверно. put работает — проблема во владении дизайном."
        }
      },
      {
        id: "opt_intro3_c",
        text: {
          en: "\"OK\" must be lowercase to be valid OOP.",
          ru: "\"OK\" должен быть в нижнем регистре, чтобы быть валидным ООП."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Case is irrelevant; typed transitions matter.",
          ru: "Неверно. Регистр неважен; важны типизированные переходы."
        }
      }
    ],
    order: 3
  },
  {
    id: "chk_intro_4",
    theoryArticleId: "art_theory_introduction_to_oop",
    question: {
      en: "What is a fair production trade-off statement?",
      ru: "Какое утверждение справедливо про продакшн-компромисс?"
    },
    explanation: {
      en: "Object models cost types but localize rail change for multi-rail clearing.",
      ru: "Объектные модели стоят типов, но локализуют изменения rail для multi-rail clearing."
    },
    options: [
      {
        id: "opt_intro4_a",
        text: {
          en: "More types upfront can be worth it when multiple rails and audit require consistent transitions.",
          ru: "Больше типов заранее может окупаться, когда несколько rails и аудит требуют согласованных переходов."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! Cost vs consistency is the real trade-off.",
          ru: "Верно! Цена vs согласованность — реальный компромисс."
        }
      },
      {
        id: "opt_intro4_b",
        text: {
          en: "OOP always forbids maps anywhere in a banking codebase.",
          ru: "ООП всегда запрещает maps в любом банковском коде."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Maps are fine for infrastructure; domain rules need ownership.",
          ru: "Неверно. Maps ок для инфраструктуры; доменным правилам нужно владение."
        }
      },
      {
        id: "opt_intro4_c",
        text: {
          en: "String statuses are required for JVM performance in clearing.",
          ru: "Строковые статусы обязательны для производительности JVM в clearing."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Enum/status objects are not a meaningful hotspot here.",
          ru: "Неверно. Enum/status-объекты здесь не осмысленный hotspot."
        }
      }
    ],
    order: 4
  }
];
