import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_COUPLING_COHESION: readonly MistakePattern[] = [
  {
    id: "err_cc_size_equals_coupling",
    code: "ERR_CC_SIZE_EQUALS_COUPLING",
    title: {
      en: "Equating Line Count with Coupling or Cohesion",
      ru: "Приравнивание Числа Строк к Coupling или Cohesion"
    },
    description: {
      en: "Treating class size as the definition of coupling/cohesion instead of change interdependence and responsibility relatedness.",
      ru: "Считать размер класса определением coupling/cohesion вместо взаимозависимости изменений и связанности обязанностей."
    },
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    exampleIncorrectReasoning: {
      en: "ReconciliationService is fine — it is under 500 lines, so coupling must be low.",
      ru: "ReconciliationService в порядке — меньше 500 строк, значит coupling низкий."
    },
    correctedReasoning: {
      en: "Measure blast radius: does an alert-channel change force DB/PDF retests? A small class mixing SMTP and JDBC is still high coupling and low cohesion.",
      ru: "Измеряйте blast radius: форсит ли смена канала алертов ретест DB/PDF? Маленький класс, смешивающий SMTP и JDBC, всё равно имеет высокий coupling и низкую cohesion."
    },
    remediationMissionIds: ["mis_coupling_cohesion"]
  },
  {
    id: "err_cc_fake_extract_shared_state",
    code: "ERR_CC_FAKE_EXTRACT_SHARED_STATE",
    title: {
      en: "Fake Extraction Keeping Shared Mutable ReportContext",
      ru: "Фальшивое Извлечение с Shared Mutable ReportContext"
    },
    description: {
      en: "Moving methods to inner/helper classes while continuing to mutate a shared ReportContext across alert and PDF concerns — content coupling remains.",
      ru: "Перенос методов во inner/helper-классы при продолжающейся мутации общего ReportContext между alert и PDF — content coupling остаётся."
    },
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    exampleIncorrectReasoning: {
      en: "If PDF and alert are private inner classes, we have decomposed and lowered coupling.",
      ru: "Если PDF и alert — private inner classes, мы декомпозировали и снизили coupling."
    },
    correctedReasoning: {
      en: "Pass immutable AlertPayload / ReportModel across interfaces. AlertPublisher must not clear rows owned by ReconciliationReporter.",
      ru: "Передавайте immutable AlertPayload / ReportModel через интерфейсы. AlertPublisher не должен чистить rows, которыми владеет ReconciliationReporter."
    },
    remediationMissionIds: ["mis_coupling_cohesion"]
  },
  {
    id: "err_cc_god_class_only_argument",
    code: "ERR_CC_GOD_CLASS_ONLY_ARGUMENT",
    title: {
      en: "Rejecting Design with Only 'God Class Bad'",
      ru: "Отклонение Дизайна Только Аргументом «God Class Плох»"
    },
    description: {
      en: "Using the God Class label without quantifying coupling, cohesion, or change amplification — weak senior interview reasoning.",
      ru: "Использование ярлыка God Class без квантификации coupling, cohesion или усиления изменений — слабая senior-аргументация."
    },
    conceptIds: ["cpt_coupling", "cpt_cohesion"],
    exampleIncorrectReasoning: {
      en: "It is a God Class, so split it — that is the whole analysis.",
      ru: "Это God Class, значит разрежем — в этом весь анализ."
    },
    correctedReasoning: {
      en: "Name metrics: five reasons to change (validate/DB/PDF/alert/retry), alert PR reds PDF CI, shared mutable ReportContext. Then propose high-cohesion modules behind interfaces.",
      ru: "Назовите метрики: пять причин меняться (validate/DB/PDF/alert/retry), alert-PR краснит PDF CI, shared mutable ReportContext. Затем предложите высоко-cohesive модули за интерфейсами."
    },
    remediationMissionIds: ["mis_coupling_cohesion"]
  },
  {
    id: "err_cc_concrete_sdk_in_coordinator",
    code: "ERR_CC_CONCRETE_SDK_IN_COORDINATOR",
    title: {
      en: "Coordinator Depending on Concrete Slack/JDBC Types",
      ru: "Coordinator, Зависящий от Конкретных Типов Slack/JDBC"
    },
    description: {
      en: "Extracting collaborators but injecting concrete SmtpClient/DataSource into ReconciliationCoordinator, so channel swaps still recompile the orchestration core.",
      ru: "Извлечение коллабораторов, но инжект конкретных SmtpClient/DataSource в ReconciliationCoordinator, из-за чего смена канала всё ещё перекомпилирует ядро оркестрации."
    },
    conceptIds: ["cpt_coupling"],
    exampleIncorrectReasoning: {
      en: "As long as methods are in separate classes, depending on SlackWebhookClient in the coordinator is fine.",
      ru: "Пока методы в отдельных классах, зависимость coordinator от SlackWebhookClient нормальна."
    },
    correctedReasoning: {
      en: "Depend on AlertPublisher and LedgerRepository interfaces. Wire Slack/JDBC adapters at the composition root so alert changes stay in the adapter module.",
      ru: "Зависьте от интерфейсов AlertPublisher и LedgerRepository. Связывайте Slack/JDBC адаптеры в composition root, чтобы смены алертов оставались в модуле адаптера."
    },
    remediationMissionIds: ["mis_coupling_cohesion"]
  },
  {
    id: "err_cc_mix_retry_into_persistence",
    code: "ERR_CC_MIX_RETRY_INTO_PERSISTENCE",
    title: {
      en: "Embedding Retry Policy Inside LedgerRepository",
      ru: "Встраивание Политики Retry внутрь LedgerRepository"
    },
    description: {
      en: "Putting backoff/retry loops inside JDBC repository methods, mixing orchestration policy with persistence and lowering cohesion of both.",
      ru: "Размещение backoff/retry циклов внутри JDBC repository методов, смешивая orchestration policy с persistence и снижая cohesion обоих."
    },
    conceptIds: ["cpt_cohesion"],
    exampleIncorrectReasoning: {
      en: "Retries are about the database, so they belong inside LedgerRepository.loadRows.",
      ru: "Retry — про базу, значит они принадлежат внутрь LedgerRepository.loadRows."
    },
    correctedReasoning: {
      en: "Keep LedgerRepository cohesive around SQL/mapping. Let ReconciliationCoordinator (or RetryExecutor) apply retry policy around port calls.",
      ru: "Держите LedgerRepository cohesive вокруг SQL/mapping. Пусть ReconciliationCoordinator (или RetryExecutor) применяет retry policy вокруг вызовов портов."
    },
    remediationMissionIds: ["mis_coupling_cohesion"]
  }
];
