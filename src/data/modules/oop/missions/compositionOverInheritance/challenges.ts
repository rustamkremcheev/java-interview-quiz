import { Challenge } from '../../../../../types/domain';

export const ALL_COMPOSITION_CHALLENGES: readonly Challenge[] = [
  {
    id: "chl_comp_fix_builder",
    type: "FIX_BUILDER",
    missionId: "mis_composition_over_inheritance",
    stageId: "stg_comp_practice",
    title: {
      en: "Fix Builder: Refactor to Composition with EmailSender / SmsSender",
      ru: "Конструктор Исправления: Рефакторинг в Композицию EmailSender / SmsSender"
    },
    prompt: {
      en: "Select ALL production-safe structural elements to fix EmailNotificationService double-counting and eliminate fragile NotificationService inheritance.",
      ru: "Выберите ВСЕ безопасные элементы для исправления двойного подсчета EmailNotificationService и устранения хрупкого наследования NotificationService."
    },
    difficulty: "SENIOR",
    assistanceLevel: "GUIDED",
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    topicIds: ["top_oop_16"],
    tags: ["#composition", "#strategy", "#forwarding"],
    hintIds: ["hnt_comp_01", "hnt_comp_02", "hnt_comp_03", "hnt_comp_04"],
    xpReward: 100,
    order: 1,
    payload: {
      baseCodeArtifactId: "art_code_broken_notification_service",
      solutionCodeArtifactId: "art_code_fixed_notification_service",
      options: [
        {
          id: "fix_comp_1",
          text: {
            en: "Replace `extends NotificationService` with a NotificationDispatcher holding private final EmailSender and SmsSender delegates.",
            ru: "Заменить `extends NotificationService` на NotificationDispatcher с private final делегатами EmailSender и SmsSender."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Composition via strategy delegates eliminates dependency on NotificationService internal call chains.",
            ru: "Верно. Композиция через делегаты-стратегии устраняет зависимость от внутренних цепочек вызовов NotificationService."
          }
        },
        {
          id: "fix_comp_2",
          text: {
            en: "Instrument ONLY send() to increment deliveryCount; let sendBatch() route through send() without a separate pre-count.",
            ru: "Инструментировать ТОЛЬКО send() для увеличения deliveryCount; sendBatch() маршрутизирует через send() без отдельного предварительного подсчета."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Single instrumentation point prevents double-count when bulk methods delegate to single-element methods.",
            ru: "Верно. Единая точка инструментирования предотвращает двойной подсчет при делегировании массовых методов одиночным."
          }
        },
        {
          id: "fix_comp_3",
          text: {
            en: "Wrap a NotificationSender interface with CountingNotificationService that forwards to EmailSender/SmsSender strategies (Decorator/Strategy composition).",
            ru: "Обернуть интерфейс NotificationSender в CountingNotificationService, перенаправляющий к стратегиям EmailSender/SmsSender (композиция Decorator/Strategy)."
          },
          isCorrect: true,
          explanation: {
            en: "Correct. Counting wrapper + channel strategies is the production-safe composition pattern — no inheritance of concrete NotificationService.",
            ru: "Верно. Counting-обертка + стратегии каналов — безопасный паттерн композиции без наследования конкретного NotificationService."
          }
        },
        {
          id: "fix_comp_distractor_1",
          text: {
            en: "Keep extending NotificationService but add synchronized to send() and sendBatch() to prevent race conditions.",
            ru: "Оставить extends NotificationService, но добавить synchronized к send() и sendBatch() для предотвращения состояния гонки."
          },
          isCorrect: false,
          explanation: {
            en: "Incorrect. Synchronization does not fix deterministic double-increment from sendBatch() calling send().",
            ru: "Неверно. Синхронизация не исправляет детерминированный двойной инкремент от вызова send() внутри sendBatch()."
          }
        },
        {
          id: "fix_comp_distractor_2",
          text: {
            en: "Override sendBatch() to add batch.size() AND call super.sendBatch(), but remove the send() override entirely.",
            ru: "Переопределить sendBatch() для добавления batch.size() И вызова super.sendBatch(), но полностью удалить переопределение send()."
          },
          isCorrect: false,
          explanation: {
            en: "Incorrect. Individual send() calls would not be instrumented, and fragile base class inheritance remains.",
            ru: "Неверно. Одиночные вызовы send() не будут инструментированы, а хрупкое наследование базового класса сохранится."
          }
        }
      ]
    }
  },
  {
    id: "chl_comp_bughunt",
    type: "BUG_HUNT",
    missionId: "mis_composition_over_inheritance",
    stageId: "stg_comp_debug",
    title: {
      en: "Applied Bug Hunt: EmailNotificationService Double-Count",
      ru: "Поиск Бага: Двойной Подсчет EmailNotificationService"
    },
    prompt: {
      en: "Select the line(s) in this Java implementation responsible for the 2× deliveryCount double-counting bug.",
      ru: "Выберите строку(и) в реализации Java, ответственные за баг двойного подсчета deliveryCount (2×)."
    },
    difficulty: "SENIOR",
    assistanceLevel: "APPLIED",
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    topicIds: ["top_oop_16"],
    tags: ["#bug-hunt", "#double-count", "#fragile-base-class"],
    hintIds: ["hnt_comp_05", "hnt_comp_06"],
    xpReward: 100,
    order: 2,
    payload: {
      baseCodeArtifactId: "art_code_broken_notification_service",
      solutionCodeArtifactId: "art_code_fixed_notification_service",
      codeSnippet: `public class EmailNotificationService extends NotificationService {
    private int deliveryCount;

    @Override
    public void send(Notification n) {
        deliveryCount++;
        super.send(n);
    }

    @Override
    public void sendBatch(List<Notification> batch) {
        deliveryCount += batch.size();
        super.sendBatch(batch);
    }

    public int getDeliveryCount() {
        return deliveryCount;
    }
}`,
      lines: [
        {
          lineNumber: 1,
          code: "public class EmailNotificationService extends NotificationService {",
          isBug: true,
          explanation: {
            en: "Extending the concrete NotificationService base couples metrics to undocumented sendBatch→send internals — the fragile base class root cause.",
            ru: "Наследование конкретного NotificationService связывает метрики с недокументированными внутренностями sendBatch→send — корневая причина хрупкого базового класса."
          }
        },
        {
          lineNumber: 6,
          code: "        deliveryCount++;",
          isBug: true,
          explanation: {
            en: "send() increments deliveryCount — this fires again when super.sendBatch() internally calls send() for each recipient.",
            ru: "send() увеличивает deliveryCount — это срабатывает снова, когда super.sendBatch() внутренне вызывает send() для каждого получателя."
          }
        },
        {
          lineNumber: 12,
          code: "        deliveryCount += batch.size();",
          isBug: true,
          explanation: {
            en: "sendBatch() pre-counts all recipients BEFORE super.sendBatch() — the first increment in the double-count chain.",
            ru: "sendBatch() предварительно считает всех получателей ПЕРЕД super.sendBatch() — первый инкремент в цепочке двойного подсчета."
          }
        },
        {
          lineNumber: 13,
          code: "        super.sendBatch(batch);",
          isBug: false,
          explanation: {
            en: "super.sendBatch() itself is correct delegation — the bug is counting BEFORE this call while send() also counts.",
            ru: "super.sendBatch() сам по себе корректен — баг в подсчете ДО этого вызова, пока send() тоже считает."
          }
        }
      ]
    }
  },
  {
    id: "chl_comp_interview_answer",
    type: "INTERVIEW_ANSWER",
    missionId: "mis_composition_over_inheritance",
    stageId: "stg_comp_interview_a",
    title: {
      en: "Senior Interview Challenge: EmailNotificationService Double-Count",
      ru: "Сценарий Senior-Интервью: Двойной Подсчет EmailNotificationService"
    },
    prompt: {
      en: "Formulate your 90-second structured verbal response explaining why EmailNotificationService double-counts deliveries and how to refactor it using composition with EmailSender/SmsSender.",
      ru: "Сформулируйте структурированный 90-секундный устный ответ с объяснением двойного подсчета EmailNotificationService и рефакторинга через композицию EmailSender/SmsSender."
    },
    difficulty: "SENIOR",
    assistanceLevel: "INTERVIEW",
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    topicIds: ["top_oop_16"],
    tags: ["#interview", "#composition", "#strategy"],
    hintIds: [],
    xpReward: 100,
    order: 3,
    payload: {
      targetQuestionId: "q_comp_notification_01",
      rubricDimensions: ["Elevator Pitch (Problem identification)", "Call Chain Mechanics (sendBatch → send)", "Composition Solution & Trade-offs"],
      expectedConcepts: [
        {
          id: "cpt_composition_over_inheritance",
          label: { en: "Composition over Inheritance", ru: "Композиция вместо Наследования" },
          keywords: ["composition", "forwarding", "wrapper", "delegate", "strategy", "композиция", "обертка", "делегирование", "стратегия"]
        },
        {
          id: "cpt_fragile_base_class",
          label: { en: "Fragile Base Class Problem", ru: "Проблема Хрупкого Базового Класса" },
          keywords: ["fragile", "base class", "platform upgrade", "internal", "implementation", "хрупкий", "базовый класс"]
        },
        {
          id: "cpt_double_count",
          label: { en: "sendBatch → send Double-Counting", ru: "Двойной Подсчет sendBatch → send" },
          keywords: ["double count", "double-count", "sendBatch", "send()", "twice", "2x", "дважды", "двойной", "deliveryCount"]
        },
        {
          id: "cpt_effective_java_18",
          label: { en: "Effective Java Item 18", ru: "Effective Java Item 18" },
          keywords: ["effective java", "item 18", "favor composition", "bloch"]
        },
        {
          id: "cpt_strategy_sender",
          label: { en: "EmailSender / SmsSender Strategy Composition", ru: "Композиция Стратегий EmailSender / SmsSender" },
          keywords: ["emailsender", "smssender", "strategy", "dispatcher", "notificationsender", "стратегия"]
        }
      ],
      modelAnswer30s: {
        en: "EmailNotificationService extends concrete NotificationService and overrides both send() and sendBatch() to track deliveryCount. The bug: sendBatch() adds batch.size(), then super.sendBatch() internally calls send() for each recipient, incrementing again. The fix is composition — NotificationDispatcher with EmailSender/SmsSender strategies, or a CountingNotificationService wrapper that instruments only send().",
        ru: "EmailNotificationService расширяет конкретный NotificationService и переопределяет send() и sendBatch() для отслеживания deliveryCount. Баг: sendBatch() добавляет batch.size(), затем super.sendBatch() внутренне вызывает send() для каждого получателя, увеличивая счетчик снова. Фикс — композиция: NotificationDispatcher со стратегиями EmailSender/SmsSender или CountingNotificationService, инструментирующий только send()."
      },
      modelAnswerDetailed: {
        en: "This is the classic Fragile Base Class / Effective Java Item 18 bug adapted to a notifications microservice. NotificationService.sendBatch() is implemented to loop and call send(n) for each recipient. When the subclass increments deliveryCount in BOTH send() and sendBatch(), each Notification is counted twice during bulk delivery. A platform upgrade can change NotificationService.sendBatch() internals, making this fragile base class dependency silently break email and SMS metrics.",
        ru: "Это классический баг Fragile Base Class / Effective Java Item 18, адаптированный к микросервису уведомлений. NotificationService.sendBatch() реализован как цикл с вызовом send(n) для каждого получателя. Когда подкласс увеличивает deliveryCount И в send(), И в sendBatch(), каждое Notification считается дважды. Обновление платформы может изменить внутренности sendBatch(), тихо ломая метрики email и SMS."
      },
      modelAnswerTradeOffs: {
        en: "Composition with EmailSender/SmsSender adds explicit wiring (dispatcher + strategies) vs free inheritance of NotificationService methods. Trade-off: slightly more structure vs elimination of silent platform-upgrade breakage. Never extend concrete platform bases for instrumentation — compose via Strategy/Decorator forwarding.",
        ru: "Композиция с EmailSender/SmsSender добавляет явную сборку (диспетчер + стратегии) vs бесплатное наследование методов NotificationService. Компромисс: чуть больше структуры vs устранение тихих поломок при обновлении платформы. Никогда не расширяйте конкретные платформенные базы для инструментирования — композиция через Strategy/Decorator."
      },
      followUpQuestionText: {
        en: "Interviewer Follow-Up: 'Could you stack multiple decorators on the notification sender, for example adding audit logging on top of delivery counting?'",
        ru: "Вопрос интервьюера: 'Можно ли наслоить несколько декораторов на notification sender, например добавив audit logging поверх подсчета доставок?'"
      },
      followUpModelAnswerText: {
        en: "Model Answer: Yes — this is a key advantage of composition over inheritance. Wrap an EmailSender/SmsSender with CountingNotificationService (metrics), then wrap that with AuditedNotificationService (logging). Each decorator implements NotificationSender and delegates to its inner wrapper. Order matters: outermost decorator intercepts calls first.",
        ru: "Ответ: Да — это ключевое преимущество композиции над наследованием. Оберните EmailSender/SmsSender в CountingNotificationService (метрики), затем в AuditedNotificationService (логирование). Каждый декоратор реализует NotificationSender и делегирует внутренней обертке. Порядок важен: внешний декоратор перехватывает вызовы первым."
      }
    }
  }
];
