import { CodeArtifact } from '../../../../../types/domain';

export const CODE_ARTIFACTS_COMPOSITION: readonly CodeArtifact[] = [
  {
    id: "art_code_broken_notification_service",
    type: "COUNTER_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Broken EmailNotificationService (NotificationService Subclass Double-Count)",
      ru: "Сломанный EmailNotificationService (Двойной Подсчет через Подкласс NotificationService)"
    },
    sourceCode: `package com.platform.notifications;

import java.util.List;

/**
 * Concrete base — NOT designed for inheritance.
 * sendBatch() internally calls send() for each recipient.
 */
public class NotificationService {
    public void send(Notification n) {
        // platform delivery plumbing
    }

    public void sendBatch(List<Notification> batch) {
        for (Notification n : batch) {
            send(n);
        }
    }
}

/**
 * PRODUCTION BUG: Extends concrete NotificationService to track deliveries.
 * Overrides BOTH send() and sendBatch() — causing 2× double-counting.
 */
public class EmailNotificationService extends NotificationService {
    private int deliveryCount;

    @Override
    public void send(Notification n) {
        deliveryCount++;
        super.send(n);
    }

    @Override
    public void sendBatch(List<Notification> batch) {
        // BUG: Pre-counts ALL recipients before super.sendBatch()
        deliveryCount += batch.size();
        // super.sendBatch() internally calls send() for each → DOUBLE COUNT!
        super.sendBatch(batch);
    }

    public int getDeliveryCount() {
        return deliveryCount;
    }
}`,
    annotations: [
      {
        id: "ann_broken_notif_1",
        startLine: 25,
        endLine: 25,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "Fragile Base Class Inheritance", ru: "Наследование Хрупкого Базового Класса" },
        explanation: {
          en: "Line 25: `extends NotificationService` creates dependency on undocumented internal call chains. The concrete base was NOT designed for extension (Effective Java Item 19).",
          ru: "Строка 25: `extends NotificationService` создает зависимость от недокументированных внутренних цепочек вызовов. Конкретный базовый класс НЕ был спроектирован для расширения (Effective Java Item 19)."
        },
        conceptDemonstrated: "cpt_fragile_base_class"
      },
      {
        id: "ann_broken_notif_2",
        startLine: 28,
        endLine: 32,
        category: "PROBLEM_IN_ORIGINAL_CODE",
        title: { en: "send() Delivery Increment", ru: "Инкремент Доставки в send()" },
        explanation: {
          en: "Lines 28-32: send() increments deliveryCount. This method is invoked internally by super.sendBatch() for each recipient.",
          ru: "Строки 28-32: send() увеличивает deliveryCount. Этот метод вызывается внутренне super.sendBatch() для каждого получателя."
        },
        conceptDemonstrated: "cpt_composition_over_inheritance"
      },
      {
        id: "ann_broken_notif_3",
        startLine: 35,
        endLine: 40,
        category: "PRODUCTION_RISK",
        title: { en: "sendBatch() Pre-Count Double-Increment", ru: "Предварительный Подсчет в sendBatch() — Двойной Инкремент" },
        explanation: {
          en: "Lines 35-40: sendBatch() adds batch.size(), then super.sendBatch() triggers send() per recipient. Each delivery counted TWICE.",
          ru: "Строки 35-40: sendBatch() добавляет batch.size(), затем super.sendBatch() вызывает send() для каждого получателя. Каждая доставка считается ДВАЖДЫ."
        },
        problemSolved: {
          en: "This IS the bug — not a fix.",
          ru: "Это и есть баг — не исправление."
        },
        conceptDemonstrated: "cpt_composition_over_inheritance"
      }
    ],
    relatedQuestionIds: ["q_comp_notification_01"],
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    tags: ["#composition", "#double-count", "#fragile-base-class"]
  },
  {
    id: "art_code_fixed_notification_service",
    type: "CORRECT_SOLUTION",
    language: "java",
    javaVersion: "17",
    title: {
      en: "Production Solution — Compose EmailSender / SmsSender Strategies",
      ru: "Продакшн Решение — Композиция Стратегий EmailSender / SmsSender"
    },
    sourceCode: `package com.platform.notifications;

import java.util.List;

/**
 * PRODUCTION SOLUTION (Effective Java Item 18 — Composition):
 * 1. Does NOT extend concrete NotificationService.
 * 2. Holds EmailSender and SmsSender strategy delegates.
 * 3. CountingNotificationService wraps a NotificationSender — instruments ONLY send().
 */
public class NotificationDispatcher {
    private final EmailSender emailSender;
    private final SmsSender smsSender;

    public NotificationDispatcher(EmailSender emailSender, SmsSender smsSender) {
        this.emailSender = emailSender;
        this.smsSender = smsSender;
    }

    public void dispatch(Notification n) {
        switch (n.channel()) {
            case EMAIL -> emailSender.send(n);
            case SMS -> smsSender.send(n);
        }
    }

    public void dispatchBatch(List<Notification> batch) {
        batch.forEach(this::dispatch);
    }
}

/** Counting wrapper — instruments a single send() path via composition */
public final class CountingNotificationService implements NotificationSender {
    private final NotificationSender delegate;
    private int deliveryCount;

    public CountingNotificationService(NotificationSender delegate) {
        this.delegate = delegate;
    }

    @Override
    public void send(Notification n) {
        deliveryCount++;
        delegate.send(n);
    }

    @Override
    public void sendBatch(List<Notification> batch) {
        // Route through instrumented send() — counted exactly once each
        batch.forEach(this::send);
    }

    public int getDeliveryCount() {
        return deliveryCount;
    }
}`,
    annotations: [
      {
        id: "ann_fixed_notif_1",
        startLine: 12,
        endLine: 13,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Composition: EmailSender + SmsSender Delegates", ru: "Композиция: Делегаты EmailSender + SmsSender" },
        explanation: {
          en: "Lines 12-13: Holds strategy delegates — eliminates fragile base class dependency on NotificationService internals entirely.",
          ru: "Строки 12-13: Хранит делегаты-стратегии — полностью устраняет зависимость от внутренностей NotificationService."
        },
        conceptDemonstrated: "cpt_composition_over_inheritance"
      },
      {
        id: "ann_fixed_notif_2",
        startLine: 41,
        endLine: 45,
        category: "HOW_IT_FIXES_THE_PROBLEM",
        title: { en: "Single Instrumentation Point in send()", ru: "Единая Точка Инструментирования в send()" },
        explanation: {
          en: "Lines 41-45: Only send() increments deliveryCount. All instrumented deliveries flow through this single method.",
          ru: "Строки 41-45: Только send() увеличивает deliveryCount. Все инструментированные доставки проходят через этот единственный метод."
        },
        conceptDemonstrated: "cpt_composition_over_inheritance"
      },
      {
        id: "ann_fixed_notif_3",
        startLine: 47,
        endLine: 51,
        category: "INTERVIEW_CONCEPT",
        title: { en: "sendBatch() Routes Through send() Explicitly", ru: "sendBatch() Явно Маршрутизирует через send()" },
        explanation: {
          en: "Lines 47-51: sendBatch() uses batch.forEach(this::send) — each delivery counted exactly once through the instrumented send() method.",
          ru: "Строки 47-51: sendBatch() использует batch.forEach(this::send) — каждая доставка считается ровно один раз через instrumented send()."
        },
        conceptDemonstrated: "cpt_fragile_base_class"
      }
    ],
    relatedQuestionIds: ["q_comp_notification_01"],
    conceptIds: ["cpt_composition_over_inheritance", "cpt_fragile_base_class"],
    tags: ["#composition", "#forwarding", "#strategy", "#effective-java"]
  },
  {
    id: "art_code_notification_sender",
    type: "SUPPLEMENTARY_EXAMPLE",
    language: "java",
    javaVersion: "17",
    title: {
      en: "EmailSender / SmsSender Strategy Interfaces",
      ru: "Интерфейсы Стратегий EmailSender / SmsSender"
    },
    sourceCode: `package com.platform.notifications;

import java.util.List;

/** Common sender contract used by counting wrappers and dispatchers */
public interface NotificationSender {
    void send(Notification n);
    void sendBatch(List<Notification> batch);
}

/** Email delivery strategy — composed into NotificationDispatcher */
public interface EmailSender {
    void send(Notification n);
}

/** SMS delivery strategy — composed into NotificationDispatcher */
public interface SmsSender {
    void send(Notification n);
}

public enum Channel { EMAIL, SMS }

public record Notification(String id, String recipient, Channel channel, String body) {
    public Notification {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("id required");
        }
        if (recipient == null || recipient.isBlank()) {
            throw new IllegalArgumentException("recipient required");
        }
    }
}`,
    annotations: [
      {
        id: "ann_sender_1",
        startLine: 11,
        endLine: 19,
        category: "WHY_IT_EXISTS",
        title: { en: "Strategy Interfaces for Composition", ru: "Интерфейсы Стратегий для Композиции" },
        explanation: {
          en: "EmailSender and SmsSender are injectable strategies. NotificationDispatcher and CountingNotificationService compose them instead of extending a concrete NotificationService base.",
          ru: "EmailSender и SmsSender — внедряемые стратегии. NotificationDispatcher и CountingNotificationService компонуют их вместо наследования конкретного NotificationService."
        },
        conceptDemonstrated: "cpt_composition_over_inheritance"
      }
    ],
    relatedQuestionIds: ["q_comp_notification_01"],
    conceptIds: ["cpt_composition_over_inheritance"],
    tags: ["#notification", "#strategy", "#composition"]
  }
];
