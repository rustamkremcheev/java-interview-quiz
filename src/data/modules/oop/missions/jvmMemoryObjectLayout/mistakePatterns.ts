import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_JVM_MEMORY_OBJECT_LAYOUT: readonly MistakePattern[] = [
  {
    id: "err_jol_field_only_math",
    code: "ERR_JOL_FIELD_ONLY_MATH",
    title: {
      en: "Sizing Cache from Field Widths Alone",
      ru: "Оценка Кэша Только по Ширинам Полей"
    },
    description: {
      en: "Multiplying summed long/double widths by entry count and calling it heap budget.",
      ru: "Умножение суммы ширин long/double на число записей и объявление этого бюджетом кучи."
    },
    conceptIds: ["cpt_shallow_vs_retained_size", "cpt_object_header"],
    exampleIncorrectReasoning: {
      en: "Two longs are 16 bytes — 50M entries is under 1 GB.",
      ru: "Два long — 16 байт; 50M записей — меньше 1 GB."
    },
    correctedReasoning: {
      en: "Include headers, alignment, boxing, nested graphs, and map structures — measure with JOL.",
      ru: "Учитывайте headers, alignment, boxing, вложенные графы и структуры map — измеряйте JOL."
    },
    remediationMissionIds: ["mis_jvm_memory_object_layout"]
  },
  {
    id: "err_jol_fixed_header_myth",
    code: "ERR_JOL_FIXED_HEADER_MYTH",
    title: {
      en: "Claiming a Fixed Universal Object Header Size",
      ru: "Утверждение Фиксированного Универсального Размера Заголовка"
    },
    description: {
      en: "Stating every JVM object header is exactly N bytes forever.",
      ru: "Утверждение, что заголовок каждого объекта JVM навсегда ровно N байт."
    },
    conceptIds: ["cpt_object_header", "cpt_compressed_oops"],
    exampleIncorrectReasoning: {
      en: "Header is always 12 bytes on every HotSpot forever.",
      ru: "Заголовок всегда 12 байт на каждом HotSpot навсегда."
    },
    correctedReasoning: {
      en: "Phrase as common 64-bit HotSpot compressed configs and measure — size is configuration-dependent.",
      ru: "Формулируйте через типичные 64-bit compressed-конфиги HotSpot и измеряйте — размер зависит от конфигурации."
    },
    remediationMissionIds: ["mis_jvm_memory_object_layout"]
  },
  {
    id: "err_jol_records_are_structs",
    code: "ERR_JOL_RECORDS_ARE_STRUCTS",
    title: {
      en: "Treating Records as Zero-Overhead Structs",
      ru: "Считать Records Zero-Overhead Структурами"
    },
    description: {
      en: "Assuming `record PositionSnapshot(...)` removes object headers and identity costs.",
      ru: "Предположение, что `record PositionSnapshot(...)` убирает object headers и стоимость identity."
    },
    conceptIds: ["cpt_object_header"],
    exampleIncorrectReasoning: {
      en: "Make it a record and memory becomes C-struct cheap.",
      ru: "Сделаем record — и память станет дешёвой как C-структура."
    },
    correctedReasoning: {
      en: "Records are still heap objects; flatten primitives and measure footprint.",
      ru: "Records всё ещё объекты в куче; уплотняйте примитивы и измеряйте footprint."
    },
    remediationMissionIds: ["mis_jvm_memory_object_layout"]
  },
  {
    id: "err_jol_ignore_retained",
    code: "ERR_JOL_IGNORE_RETAINED",
    title: {
      en: "Ignoring Retained Graphs (RiskBucket)",
      ru: "Игнор Retained-Графов (RiskBucket)"
    },
    description: {
      en: "Planning capacity on shallow PositionSnapshot size while each entry retains bucket lists.",
      ru: "Планировать ёмкость по shallow-размеру PositionSnapshot, пока каждая запись удерживает списки buckets."
    },
    conceptIds: ["cpt_shallow_vs_retained_size"],
    exampleIncorrectReasoning: {
      en: "The list reference is only 4–8 bytes — negligible.",
      ru: "Ссылка на список — всего 4–8 байт, пренебрежимо."
    },
    correctedReasoning: {
      en: "Retained size includes the exclusive reachable RiskBucket objects — often the dominant cost.",
      ru: "Retained size включает exclusive reachable объекты RiskBucket — часто доминирующая стоимость."
    },
    remediationMissionIds: ["mis_jvm_memory_object_layout"]
  },
  {
    id: "err_jol_confuse_jls_hotspot",
    code: "ERR_JOL_CONFUSE_JLS_HOTSPOT",
    title: {
      en: "Confusing JLS Semantics with HotSpot Layout",
      ru: "Путаница Семантики JLS с Layout HotSpot"
    },
    description: {
      en: "Treating language-spec object wording as a portable byte layout contract.",
      ru: "Считать формулировки JLS про объекты портативным контрактом байтового layout."
    },
    conceptIds: ["cpt_object_header", "cpt_compressed_oops"],
    exampleIncorrectReasoning: {
      en: "The JLS tells us exact header and padding bytes.",
      ru: "JLS сообщает точные байты заголовка и padding."
    },
    correctedReasoning: {
      en: "JLS is semantics; HotSpot chooses layout; JOL measures a concrete JVM.",
      ru: "JLS — семантика; HotSpot выбирает layout; JOL измеряет конкретную JVM."
    },
    remediationMissionIds: ["mis_jvm_memory_object_layout"]
  }
];
