import { TheoryArticle, TheoryCheckpoint } from '../../../../../types/domain';

export const THEORY_ARTICLE_EQUALS_HASHCODE: TheoryArticle = {
  id: "art_theory_equals_hashcode",
  topicIds: ["top_oop_20"],
  conceptIds: ["cpt_equals_contract", "cpt_hashcode_contract", "cpt_mutable_key_disaster"],
  title: {
    en: "The equals() & hashCode() Contracts and HashMap Bucket Routing Mechanics",
    ru: "Контракты equals() и hashCode() и Механика Маршрутизации Бакетов HashMap"
  },
  summary: {
    en: "Deep-dive into the general contracts of equals() and hashCode(), the mathematical bucket index formula (n-1) & hash, and why key field mutation causes silent cache lookup failures and memory leaks in production.",
    ru: "Глубокий разбор базовых контрактов equals() и hashCode(), математической формулы вычисления бакетов (n-1) & hash и того, почему изменение ключа ведет к сбоям кэша и утечкам памяти."
  },
  sections: [
    {
      id: "sec_equals_contract",
      category: "DEFINITION",
      title: {
        en: "1. The General Contract of Object.equals()",
        ru: "1. Общий Контракт Метода Object.equals()"
      },
      blocks: [
        {
          id: "blk_eq_1",
          type: "PARAGRAPH",
          content: {
            en: "According to the Java Language Specification (JLS) and Effective Java Item 10, overriding equals() requires maintaining an equivalence relation that satisfies five mandatory mathematical properties:",
            ru: "Согласно спецификации JLS и Effective Java (Item 10), переопределение equals() требует сохранения отношения эквивалентности, удовлетворяющего пяти математическим свойствам:"
          }
        },
        {
          id: "blk_eq_2",
          type: "CALLOUT",
          title: {
            en: "📜 The 5 Mathematical Properties of equals()",
            ru: "📜 5 Математических Свойств equals()"
          },
          content: {
            en: "1. Reflexive: x.equals(x) must return true.\n2. Symmetric: x.equals(y) returns true if and only if y.equals(x) returns true.\n3. Transitive: if x.equals(y) and y.equals(z), then x.equals(z) must return true.\n4. Consistent: multiple invocations of x.equals(y) must consistently return true or false provided no information used in equals comparisons is modified.\n5. Non-nullity: x.equals(null) must ALWAYS return false (never throw NullPointerException).",
            ru: "1. Рефлексивность: x.equals(x) должен возвращать true.\n2. Симметричность: x.equals(y) возвращает true тогда и только тогда, когда y.equals(x) возвращает true.\n3. Транзитивность: если x.equals(y) и y.equals(z), то x.equals(z) должен быть true.\n4. Согласованность: вызовы x.equals(y) должны возвращать одинаковый результат, пока не изменились используемые поля.\n5. Ненулевость: x.equals(null) всегда должен возвращать false (без NullPointerException)."
          }
        }
      ]
    },
    {
      id: "sec_hashcode_contract",
      category: "MECHANICS",
      title: {
        en: "2. The hashCode() Contract & HashMap Bucket Routing Formula",
        ru: "2. Контракт hashCode() и Формула Маршрутизации по Бакетам"
      },
      blocks: [
        {
          id: "blk_hash_1",
          type: "PARAGRAPH",
          content: {
            en: "The hashCode() contract enforces that if two objects are equal according to equals(Object), calling hashCode() on each of the two objects MUST produce the SAME integer result. However, unequal objects are NOT required to produce distinct hash codes (though doing so improves HashMap bucket distribution efficiency).",
            ru: "Контракт hashCode() требует: если два объекта равны по equals(Object), вызов hashCode() для каждого из них ОБЯЗАН давать ОДИНАКОВЫЙ результат. Однако неравные объекты не обязаны давать разные хэш-коды (хотя это улучшает производительность)."
          }
        },
        {
          id: "blk_hash_2",
          type: "WARNING",
          title: {
            en: "⚙️ JVM Mechanics: HashMap Bucket Index Formula",
            ru: "⚙️ Механика JVM: Формула Индекса Бакета HashMap"
          },
          content: {
            en: "HashMap stores entries in an internal node array Node<K,V>[] table. When put(key, val) or get(key) is invoked, HashMap calculates:\n1. hash = key.hashCode() ^ (hash >>> 16) [bitwise spread function]\n2. bucketIndex = (table.length - 1) & hash\n\nThe node is placed strictly into table[bucketIndex].",
            ru: "HashMap хранит записи в массиве узлов Node<K,V>[] table. При вызове put(key, val) или get(key) HashMap вычисляет:\n1. hash = key.hashCode() ^ (hash >>> 16) [функция сжатия]\n2. bucketIndex = (table.length - 1) & hash\n\nЗапись помещается строго в table[bucketIndex]."
          }
        }
      ]
    },
    {
      id: "sec_mutable_key_disaster",
      category: "TRADE_OFFS",
      title: {
        en: "3. Why Key Field Mutation Causes Disappearing Cache Entries & Memory Leaks",
        ru: "3. Почему Мутация Ключа Ведет к Исчезновению Записей и Утечкам Памяти"
      },
      blocks: [
        {
          id: "blk_mut_1",
          type: "PARAGRAPH",
          content: {
            en: "When a key field participating in hashCode() mutates after insertion into HashMap, the node remains physically sitting in its original bucket (e.g. Bucket #4). When get(key) is subsequently called, HashMap re-evaluates key.hashCode() with the updated field value, calculates a NEW index (e.g. Bucket #11), inspects Bucket #11, finds nothing, and returns null. The entry physically remains trapped in memory, creating a memory leak.",
            ru: "Когда поле ключа, входящее в hashCode(), меняется после вставки в HashMap, запись физически остается в исходном бакете (например, Бакет #4). При последующем вызове get(key) HashMap заново считает hashCode() с новым значением поля, считает НОВЫЙ индекс (Бакет #11), ищет в Бакете #11, ничего не находит и возвращает null. Запись остается в памяти, создавая утечку."
          }
        },
        {
          id: "blk_mut_2",
          type: "CALLOUT",
          title: {
            en: "🔍 Why This Bug Survives Unit Testing",
            ru: "🔍 Почему Этот Баг Проходит Юнит-Тесты"
          },
          content: {
            en: "Unit tests typically put an object into a map and immediately execute get(key) on the next line without mutating key fields or simulating asynchronous event handlers. The bug only surfaces in production under concurrent event-driven field updates.",
            ru: "Юнит-тесты обычно кладут объект в мапу и сразу проверяют get(key) на следующей строке, не меняя поля и не симулируя асинхронные события. Баг проявляется только в продакшене при фоновых обновлениях полей."
          }
        }
      ]
    }
  ],
  prerequisiteConceptIds: [],
  sourceIds: ["src_jls_equals_hashcode", "src_effective_java_item10_11", "src_interviewing_io_hashmap"],
  verificationStatus: "TECHNICALLY_VERIFIED",
  tags: ["#equals", "#hashcode", "#hashmap-buckets", "#immutability", "#records"],
  estimatedMinutes: 15,
  version: "1.0.0"
};

export const THEORY_CHECKPOINTS_EQUALS_HASHCODE: readonly TheoryCheckpoint[] = [
  {
    id: "chk_eh_1",
    theoryArticleId: "art_theory_equals_hashcode",
    question: {
      en: "What is the mandatory requirement when two objects are equal according to equals(Object)?",
      ru: "Какое обязательное требование предъявляется к двум объектам, равным по equals(Object)?"
    },
    explanation: {
      en: "If two objects are equal according to equals(Object), calling hashCode() on each must produce identical integer results.",
      ru: "Если два объекта равны по equals(Object), вызов hashCode() для каждого из них должен давать одинаковый хэш-код."
    },
    options: [
      {
        id: "opt_eh1_a",
        text: {
          en: "They must return completely different hash codes to prevent bucket collisions.",
          ru: "Они должны возвращать совершенно разные хэш-коды для предотвращения коллизий."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. Equal objects must produce IDENTICAL hash codes.",
          ru: "Неверно. Равные объекты обязаны возвращать ИДЕНТИЧНЫЕ хэш-коды."
        }
      },
      {
        id: "opt_eh1_b",
        text: {
          en: "They MUST produce the exact same integer hash code.",
          ru: "Они ОБЯЗАНЫ возвращать абсолютно одинаковый целочисленный хэш-код."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! If equal objects produced different hash codes, HashMap would route them to different buckets.",
          ru: "Верно! Если бы равные объекты давали разные хэш-коды, HashMap направлял бы их в разные бакеты."
        }
      },
      {
        id: "opt_eh1_c",
        text: {
          en: "They must be instances of primitive wrapper classes.",
          ru: "Они должны быть экземплярами примитивных классов-оберток."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. The contract applies to all Java reference objects.",
          ru: "Неверно. Контракт относится ко всем ссылочным объектам Java."
        }
      }
    ],
    order: 1
  },
  {
    id: "chk_eh_2",
    theoryArticleId: "art_theory_equals_hashcode",
    question: {
      en: "How does HashMap determine which internal table bucket an entry belongs to?",
      ru: "Как HashMap определяет, к какому внутреннему бакету принадлежит запись?"
    },
    explanation: {
      en: "HashMap calculates hash = key.hashCode() ^ (hash >>> 16) and then bucketIndex = (table.length - 1) & hash.",
      ru: "HashMap вычисляет hash = key.hashCode() ^ (hash >>> 16), а затем bucketIndex = (table.length - 1) & hash."
    },
    options: [
      {
        id: "opt_eh2_a",
        text: {
          en: "By evaluating the bitwise formula `(table.length - 1) & key.hashCode()`.",
          ru: "Путем вычисления побитовой формулы `(table.length - 1) & key.hashCode()`."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! The hash code determines the target array bucket index dynamically on every invocation.",
          ru: "Верно! Хэш-код динамически определяет индекс бакета массива при каждом вызове."
        }
      },
      {
        id: "opt_eh2_b",
        text: {
          en: "By scanning all buckets sequentially from 0 to N using linear search.",
          ru: "Путем последовательного сканирования всех бакетов от 0 до N через линейный поиск."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. HashMap achieves O(1) performance by using bitwise hashing lookup, not linear scanning.",
          ru: "Неверно. HashMap обеспечивает O(1) скорость благодаря побитовому хэшированию, а не линейному поиску."
        }
      }
    ],
    order: 2
  },
  {
    id: "chk_eh_3",
    theoryArticleId: "art_theory_equals_hashcode",
    question: {
      en: "What happens when a field participating in hashCode() is modified AFTER placing the key into a HashMap?",
      ru: "Что происходит, если поле, участвующее в hashCode(), меняется ПОСЛЕ вставки ключа в HashMap?"
    },
    explanation: {
      en: "The key remains in its original bucket node, but get(key) calculates a new bucket index and returns null.",
      ru: "Ключ остается в исходном бакете, но get(key) вычисляет новый индекс бакета и возвращает null."
    },
    options: [
      {
        id: "opt_eh3_a",
        text: {
          en: "HashMap automatically detects the field change and moves the node to the new bucket immediately.",
          ru: "HashMap автоматически замечает изменение поля и сразу перемещает узел в новый бакет."
        },
        isCorrect: false,
        feedback: {
          en: "Incorrect. HashMap has zero awareness of key object internal field mutations.",
          ru: "Неверно. HashMap абсолютно не отслеживает внутренние изменения полей объекта ключа."
        },
        misconceptionId: "err_mutable_key_hash_decay"
      },
      {
        id: "opt_eh3_b",
        text: {
          en: "The entry remains in the old bucket while get(key) searches the new bucket and returns null, creating a memory leak.",
          ru: "Запись остается в старом бакете, а get(key) ищет в новом бакете и возвращает null, создавая утечку памяти."
        },
        isCorrect: true,
        feedback: {
          en: "Correct! This is why HashMap keys MUST be strictly immutable.",
          ru: "Верно! Вот почему ключи HashMap ОБЯЗАНЫ быть строго неизменяемыми."
        }
      }
    ],
    order: 3
  }
];
