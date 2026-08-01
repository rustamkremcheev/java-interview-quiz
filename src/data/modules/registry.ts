import { Module } from '../../types/domain';

export const MODULES_REGISTRY: readonly Module[] = [
  {
    id: "mod_oop",
    slug: "object-oriented-programming",
    title: {
      en: "Object-Oriented Programming & Clean Architecture",
      ru: "Объектно-Ориентированное Программирование и Чистая Архитектура"
    },
    shortTitle: {
      en: "OOP & Clean Arch",
      ru: "ООП и Чистая Архитектура"
    },
    description: {
      en: "Master encapsulation, invariants, SOLID principles, dynamic dispatch, composition vs inheritance, and enterprise design patterns.",
      ru: "Освойте инкапсуляцию, инварианты, принципы SOLID, динамическую диспетчеризацию, композицию вместо наследования и паттерны проектирования."
    },
    icon: "Layers",
    difficultyRange: {
      min: "FOUNDATION",
      max: "STAFF"
    },
    estimatedMinutes: 870, // 14.5 hours
    topicIds: [
      "top_oop_01", "top_oop_02", "top_oop_03", "top_oop_04", "top_oop_05",
      "top_oop_06", "top_oop_07", "top_oop_08", "top_oop_09", "top_oop_10",
      "top_oop_11", "top_oop_12", "top_oop_13", "top_oop_14", "top_oop_15",
      "top_oop_16", "top_oop_17", "top_oop_18", "top_oop_19", "top_oop_20",
      "top_oop_21", "top_oop_22", "top_oop_23", "top_oop_24", "top_oop_25",
      "top_oop_26", "top_oop_27", "top_oop_28", "top_oop_29", "top_oop_30",
      "top_oop_31", "top_oop_32", "top_oop_33", "top_oop_34", "top_oop_35",
      "top_oop_36", "top_oop_37"
    ],
    tags: ["#oop", "#encapsulation", "#solid", "#design-patterns", "#java"],
    order: 1,
    availability: "AVAILABLE",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 24,
    interviewQuestionCount: 85
  },
  {
    id: "mod_java_core",
    slug: "java-core",
    title: {
      en: "Java Core & Modern JDK Features",
      ru: "Ядро Java и Возможности Современных JDK"
    },
    shortTitle: { en: "Java Core", ru: "Ядро Java" },
    description: {
      en: "Deep dive into generics type erasure, Records, Sealed Classes, Pattern Matching, Exception hierarchies, and String Pool internals.",
      ru: "Глубокое погружение в стирание типов дженериков, Records, Sealed-классы, Pattern Matching, иерархию исключений и устройcтво String Pool."
    },
    icon: "Code",
    difficultyRange: { min: "FOUNDATION", max: "SENIOR" },
    estimatedMinutes: 600,
    topicIds: [],
    tags: ["#java17", "#java21", "#records", "#generics"],
    order: 2,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 18,
    interviewQuestionCount: 65
  },
  {
    id: "mod_collections",
    slug: "collections-framework",
    title: {
      en: "Collections Framework & Low-Level Data Structures",
      ru: "Фреймворк Коллекций и Низкоуровневые Структуры Данных"
    },
    shortTitle: { en: "Collections", ru: "Коллекции" },
    description: {
      en: "HashMap treeification, ConcurrentHashMap lock-striping/CAS, ArrayList cache locality, and PriorityQueue internal mechanics.",
      ru: "Древовидность HashMap, блокировки/CAS в ConcurrentHashMap, кэш-локальность ArrayList и механика PriorityQueue."
    },
    icon: "Hash",
    difficultyRange: { min: "APPLIED", max: "SENIOR" },
    estimatedMinutes: 540,
    topicIds: [],
    tags: ["#hashmap", "#concurrenthashmap", "#collections"],
    order: 3,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 20,
    interviewQuestionCount: 70
  },
  {
    id: "mod_concurrency",
    slug: "multithreading-and-concurrency",
    title: {
      en: "Multithreading, JMM & Concurrency Mechanics",
      ru: "Многопоточность, JMM и Механика Конкурентности"
    },
    shortTitle: { en: "Concurrency & JMM", ru: "Многопоточность и JMM" },
    description: {
      en: "Java Memory Model happens-before guarantees, volatile barriers, ReentrantLock, Virtual Threads (Loom), and lock-free algorithms.",
      ru: "Гарантии happens-before в JMM, volatile-барьеры, ReentrantLock, виртуальные потоки (Project Loom) и lock-free алгоритмы."
    },
    icon: "Cpu",
    difficultyRange: { min: "APPLIED", max: "STAFF" },
    estimatedMinutes: 1080,
    topicIds: [],
    tags: ["#concurrency", "#jmm", "#volatile", "#virtual-threads"],
    order: 4,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 30,
    interviewQuestionCount: 95
  },
  {
    id: "mod_jvm",
    slug: "jvm-internals-and-gc",
    title: {
      en: "JVM Internals, Memory Layout & Garbage Collection",
      ru: "Внутреннее Устройство JVM, Память и Сборка Мусора"
    },
    shortTitle: { en: "JVM Internals & GC", ru: "Устройство JVM и GC" },
    description: {
      en: "HotSpot C1/C2 JIT compilation, Metaspace leaks, Thread Dumps, JFR analysis, and ZGC / G1GC pause mitigation algorithms.",
      ru: "Компиляция JIT C1/C2 в HotSpot, утечки Metaspace, дампы потоков, анализ JFR и алгоритмы минимизации пауз в ZGC / G1GC."
    },
    icon: "Server",
    difficultyRange: { min: "SENIOR", max: "STAFF" },
    estimatedMinutes: 960,
    topicIds: [],
    tags: ["#jvm", "#garbage-collection", "#bytecode", "#zgc"],
    order: 5,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 16,
    interviewQuestionCount: 60
  },
  {
    id: "mod_spring_framework",
    slug: "spring-framework-core",
    title: {
      en: "Spring Framework Core & IoC Mechanics",
      ru: "Ядро Spring Framework и Механика IoC"
    },
    shortTitle: { en: "Spring Core", ru: "Ядро Spring" },
    description: {
      en: "IoC Container internals, Bean Lifecycle, Circular Dependency resolution, JDK Dynamic Proxies vs CGLIB, and @Transactional isolation.",
      ru: "Внутренности IoC-контейнера, жизненный цикл бинов, циклические зависимости, JDK Dynamic Proxies vs CGLIB и изоляция @Transactional."
    },
    icon: "Leaf",
    difficultyRange: { min: "APPLIED", max: "STAFF" },
    estimatedMinutes: 900,
    topicIds: [],
    tags: ["#spring", "#ioc", "#aop", "#transactional"],
    order: 6,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 22,
    interviewQuestionCount: 75
  },
  {
    id: "mod_spring_boot",
    slug: "spring-boot-and-cloud-native",
    title: {
      en: "Spring Boot & Cloud Native Microservices",
      ru: "Spring Boot и Облачные Микросервисы"
    },
    shortTitle: { en: "Spring Boot", ru: "Spring Boot" },
    description: {
      en: "Auto-configuration imports, custom Starters, Actuator metric hooks, embedded Netty tuning, and GraalVM Native Image compilation.",
      ru: "Автоконфигурация, пользовательские Стартеры, метрики Actuator, настройка Netty и компиляция GraalVM Native Image."
    },
    icon: "Zap",
    difficultyRange: { min: "APPLIED", max: "SENIOR" },
    estimatedMinutes: 720,
    topicIds: [],
    tags: ["#springboot", "#microservices", "#graalvm"],
    order: 7,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 15,
    interviewQuestionCount: 50
  },
  {
    id: "mod_kafka",
    slug: "apache-kafka-and-event-streaming",
    title: {
      en: "Apache Kafka & Distributed Event Streaming",
      ru: "Apache Kafka и Распределенный Стриминг"
    },
    shortTitle: { en: "Apache Kafka", ru: "Apache Kafka" },
    description: {
      en: "Partitioning algorithms, Producer idempotency, Consumer Group rebalance protocols, commit strategies, and Spring Kafka resilience.",
      ru: "Алгоритмы партиционирования, идемпотентность продюсера, протоколы ребалансировки консьюмеров и транзакции."
    },
    icon: "Activity",
    difficultyRange: { min: "SENIOR", max: "STAFF" },
    estimatedMinutes: 840,
    topicIds: [],
    tags: ["#kafka", "#event-driven", "#messaging"],
    order: 8,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 18,
    interviewQuestionCount: 55
  },
  {
    id: "mod_sql_db",
    slug: "sql-rdbms-and-persistence",
    title: {
      en: "RDBMS, SQL Tuning, Indexing & Hibernate",
      ru: "РСУБД, Оптимизация SQL, Индексы и Hibernate"
    },
    shortTitle: { en: "SQL & RDBMS", ru: "SQL и БД" },
    description: {
      en: "B-Tree vs LSM trees, Query Execution Plans, Transaction Isolation levels & anomalies, JPA First/Second-level cache, and N+1 query fixes.",
      ru: "B-Tree и LSM деревья, планы выполнения запросов, уровни изоляции транзакций, кэш JPA и решение проблемы N+1."
    },
    icon: "Database",
    difficultyRange: { min: "APPLIED", max: "SENIOR" },
    estimatedMinutes: 780,
    topicIds: [],
    tags: ["#sql", "#postgresql", "#hibernate", "#indexing"],
    order: 9,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 20,
    interviewQuestionCount: 65
  },
  {
    id: "mod_docker_k8s",
    slug: "docker-kubernetes-and-containers",
    title: {
      en: "Docker Ergonomics & Kubernetes JVM Orchestration",
      ru: "Эргономика Docker и Оркестрация JVM в Kubernetes"
    },
    shortTitle: { en: "Docker & K8s", ru: "Docker и K8s" },
    description: {
      en: "cgroups v1/v2 RAM limits (-XX:MaxRAMPercentage), multi-stage builds, Distroless images, and Kubernetes liveness/readiness probes.",
      ru: "Ограничения RAM в cgroups v1/v2 (-XX:MaxRAMPercentage), многоэтапные сборки, Distroless образы и пробы Kubernetes."
    },
    icon: "Box",
    difficultyRange: { min: "APPLIED", max: "SENIOR" },
    estimatedMinutes: 540,
    topicIds: [],
    tags: ["#docker", "#kubernetes", "#devops"],
    order: 10,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 12,
    interviewQuestionCount: 40
  },
  {
    id: "mod_aws",
    slug: "aws-cloud-architecture",
    title: {
      en: "AWS Cloud Infrastructure for Java Backend Architects",
      ru: "Облачная Инфраструктура AWS для Java-Архитекторов"
    },
    shortTitle: { en: "AWS Cloud", ru: "Облако AWS" },
    description: {
      en: "ECS/EKS deployment patterns, RDS Aurora failover tuning, DynamoDB single-table design, and SQS/SNS event propagation.",
      ru: "Паттерны развертывания ECS/EKS, настройка отказоустойчивости RDS Aurora, DynamoDB и маршрутизация SQS/SNS."
    },
    icon: "Cloud",
    difficultyRange: { min: "SENIOR", max: "STAFF" },
    estimatedMinutes: 600,
    topicIds: [],
    tags: ["#aws", "#cloud", "#dynamodb", "#architecture"],
    order: 11,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 10,
    interviewQuestionCount: 35
  },
  {
    id: "mod_system_design",
    slug: "high-scale-system-design",
    title: {
      en: "High-Scale System Design for Senior Java Engineers",
      ru: "Проектирование Высоконагруженных Систем"
    },
    shortTitle: { en: "System Design", ru: "Системный Дизайн" },
    description: {
      en: "Distributed Rate Limiters, Distributed Caching (Redis), Saga Pattern, Outbox Pattern, Circuit Breakers (Resilience4j), and latency trade-offs.",
      ru: "Распределенные Rate Limiter'ы, кэширование Redis, паттерн Saga, Outbox, Circuit Breaker и компромиссы задержки."
    },
    icon: "Globe",
    difficultyRange: { min: "SENIOR", max: "STAFF" },
    estimatedMinutes: 900,
    topicIds: [],
    tags: ["#systemdesign", "#distributed-systems", "#resilience"],
    order: 12,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 14,
    interviewQuestionCount: 50
  },
  {
    id: "mod_coding_interviews",
    slug: "pair-programming-and-refactoring",
    title: {
      en: "Live Pair-Programming & Senior Refactoring Exercises",
      ru: "Парное Программирование и Упражнения по Рефакторингу"
    },
    shortTitle: { en: "Live Coding", ru: "Лайв Кодинг" },
    description: {
      en: "Live senior pair-programming scenarios: refactoring anti-patterns, eliminating thread race conditions, and designing clean APIs under pressure.",
      ru: "Сценарии парного программирования: рефакторинг антипаттернов, устранение состояние гонки и проектирование чистых API."
    },
    icon: "Terminal",
    difficultyRange: { min: "APPLIED", max: "SENIOR" },
    estimatedMinutes: 660,
    topicIds: [],
    tags: ["#refactoring", "#pair-programming", "#clean-code"],
    order: 13,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 16,
    interviewQuestionCount: 45
  },
  {
    id: "mod_behavioral",
    slug: "behavioral-and-engineering-leadership",
    title: {
      en: "Behavioral Interviews & Staff Engineering Leadership",
      ru: "Поведенческие Интервью и Инженерное Лидерство"
    },
    shortTitle: { en: "Behavioral & Lead", ru: "Поведенческие и Лидерство" },
    description: {
      en: "STAR method tailored for Staff+ roles, explaining architectural trade-offs, managing cross-team conflicts, and driving technical deprecations.",
      ru: "Метод STAR для уровней Staff+, объяснение архитектурных компромиссов, разрешение конфликтов и вывод систем из эксплуатации."
    },
    icon: "Users",
    difficultyRange: { min: "SENIOR", max: "STAFF" },
    estimatedMinutes: 480,
    topicIds: [],
    tags: ["#behavioral", "#leadership", "#star-method"],
    order: 14,
    availability: "COMING_SOON",
    version: "1.0.0",
    createdAt: "2026-07-31T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    codingExerciseCount: 0,
    interviewQuestionCount: 30
  }
];
