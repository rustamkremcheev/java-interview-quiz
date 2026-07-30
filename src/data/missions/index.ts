import { Mission, LocalizedText } from '../../types/mission';
import { mission1 } from './hashmap/mission1';
import { mission2 } from './hashmap/mission2';
import { mission3 } from './hashmap/mission3';

export interface CurriculumTopic {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  iconName: string;
  isAvailable: boolean;
  missions: Mission[];
}

export const ALL_MISSIONS: Mission[] = [mission1, mission2, mission3];

export const CURRICULUM: CurriculumTopic[] = [
  {
    id: 'java-core-hashmap',
    title: {
      en: 'Java Core: HashMap & Immutability',
      ru: 'Java Core: HashMap и Неизменяемость'
    },
    description: {
      en: 'Master bucket routing, equals/hashCode contract, mutable key disasters, and production immutability.',
      ru: 'Освойте маршрутизацию бакетов, контракт equals/hashCode, катастрофы изменяемых ключей и неизменяемость на продакшене.'
    },
    iconName: 'Hash',
    isAvailable: true,
    missions: [mission1, mission2, mission3]
  },
  {
    id: 'concurrency',
    title: {
      en: 'Concurrency & Threading',
      ru: 'Многопоточность и Конкурентность'
    },
    description: {
      en: 'Volatile, JMM memory barriers, CAS, Executors, and ReentrantLock deadlock diagnosis.',
      ru: 'Volatile, барьеры памяти JMM, CAS, Executors и диагностика дедлоков ReentrantLock.'
    },
    iconName: 'Cpu',
    isAvailable: false,
    missions: []
  },
  {
    id: 'jvm-internals',
    title: {
      en: 'JVM Internals & Garbage Collection',
      ru: 'Внутреннее устройство JVM и GC'
    },
    description: {
      en: 'G1GC, ZGC tuning, Metaspace leaks, Stack vs Heap, and Thread Dumps under load.',
      ru: 'Настройка G1GC, ZGC, утечки Metaspace, Stack vs Heap и дампы потоков под нагрузкой.'
    },
    iconName: 'Server',
    isAvailable: false,
    missions: []
  },
  {
    id: 'spring-framework',
    title: {
      en: 'Spring Boot & Microservices',
      ru: 'Spring Boot и Микросервисы'
    },
    description: {
      en: '@Transactional proxy traps, Bean Lifecycle, Circular Dependencies, and Resilience4j.',
      ru: 'Ловушки прокси @Transactional, жизненный цикл Bean, циклические зависимости и Resilience4j.'
    },
    iconName: 'Layers',
    isAvailable: false,
    missions: []
  },
  {
    id: 'kafka-messaging',
    title: {
      en: 'Apache Kafka & Distributed Streaming',
      ru: 'Apache Kafka и Распределенный Стриминг'
    },
    description: {
      en: 'Exactly-once semantics, consumer rebalance storms, consumer lag, and partition ordering.',
      ru: 'Семантика Exactly-once, штормы ребалансировки консьюмеров, лаг консьюмеров и порядок партиций.'
    },
    iconName: 'Activity',
    isAvailable: false,
    missions: []
  },
  {
    id: 'sql-banking',
    title: {
      en: 'SQL & High-Throughput Databases',
      ru: 'SQL и Высоконагруженные Базы Данных'
    },
    description: {
      en: 'PostgreSQL locking, Isolation levels, Deadlock resolution, and Index B-Tree optimization.',
      ru: 'Блокировки PostgreSQL, уровни изоляции, разрешение дедлоков и оптимизация B-Tree индексов.'
    },
    iconName: 'Database',
    isAvailable: false,
    missions: []
  },
  {
    id: 'system-design',
    title: {
      en: 'High-Availability System Design',
      ru: 'Системный Дизайн Высокой Доступности'
    },
    description: {
      en: 'Distributed locks (Redis vs Zookeeper), Idempotency keys, and Rate limiters for Citi-scale banking.',
      ru: 'Распределенные блокировки (Redis vs Zookeeper), ключи идемпотентности и Rate Limiter\'ы банковского масштаба.'
    },
    iconName: 'Globe',
    isAvailable: false,
    missions: []
  }
];

export function getMissionById(id: string): Mission | undefined {
  return ALL_MISSIONS.find((m) => m.id === id);
}
