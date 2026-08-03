import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_INHERITANCE: readonly MistakePattern[] = [
  {
    id: "err_inh_protected_undocumented",
    code: "ERR_INH_PROTECTED_UNDOCUMENTED",
    title: {
      en: "Subclass Couples to Undocumented Protected Internals",
      ru: "Подкласс Связывается с Недокументированными Protected-Внутренностями"
    },
    description: {
      en: "Relying on BaseRegulatoryReport protected fields/methods (headerVersion, appendSection encoding) that were never part of a published extension contract — platform changes break filings without compile errors.",
      ru: "Опора на protected-поля/методы BaseRegulatoryReport (headerVersion, кодирование appendSection), не входившие в опубликованный контракт расширения — изменения платформы ломают filings без ошибок компиляции."
    },
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    exampleIncorrectReasoning: {
      en: "Protected means it is a stable API for subclasses — we can use any protected member we see.",
      ru: "Protected значит стабильный API для подклассов — можно использовать любой видимый protected-член."
    },
    correctedReasoning: {
      en: "Protected visibility ≠ extension contract. Only documented hooks (@implSpec / javadoc) are safe; otherwise seal or redesign.",
      ru: "Видимость protected ≠ контракт расширения. Безопасны только документированные хуки (@implSpec / javadoc); иначе seal или редизайн."
    },
    remediationMissionIds: ["mis_inheritance"]
  },
  {
    id: "err_inh_late_header_mutation",
    code: "ERR_INH_LATE_HEADER_MUTATION",
    title: {
      en: "Mutating Inherited State After super() Wrote the Header",
      ru: "Мутация Унаследованного Состояния После Записи Заголовка в super()"
    },
    description: {
      en: "Assigning this.headerVersion after super(...) while the base constructor already called writeRegulatoryHeader using the old/default value — filings keep the wrong version silently.",
      ru: "Присваивание this.headerVersion после super(...), тогда как базовый конструктор уже вызвал writeRegulatoryHeader со старым/default значением — filings молча сохраняют неверную версию."
    },
    conceptIds: ["cpt_inherited_state", "cpt_inheritance"],
    exampleIncorrectReasoning: {
      en: "Setting headerVersion in the subclass constructor body updates the header for this report.",
      ru: "Установка headerVersion в теле конструктора подкласса обновит заголовок этого отчёта."
    },
    correctedReasoning: {
      en: "super() runs first and may freeze inherited state into the filing buffer. Pass version into the base constructor or use a documented pre-header hook.",
      ru: "super() выполняется первым и может зафиксировать унаследованное состояние в буфер filing. Передавайте version в конструктор базы или используйте документированный pre-header hook."
    },
    remediationMissionIds: ["mis_inheritance"]
  },
  {
    id: "err_inh_double_serialize",
    code: "ERR_INH_DOUBLE_SERIALIZE",
    title: {
      en: "Assuming Stable appendSection Encoding Semantics",
      ru: "Предположение о Стабильной Семантике Кодирования appendSection"
    },
    description: {
      en: "Pre-encoding section payloads in the subclass while the base later starts encoding inside appendSection, producing double-serialized regulatory sections.",
      ru: "Предварительное кодирование payload секций в подклассе, пока база позже начинает кодировать внутри appendSection — получаются дважды сериализованные регуляторные секции."
    },
    conceptIds: ["cpt_inherited_state", "cpt_fragile_base_class"],
    exampleIncorrectReasoning: {
      en: "appendSection just concatenates strings — encoding in the subclass is an implementation detail that cannot break.",
      ru: "appendSection просто конкатенирует строки — кодирование в подклассе не может ничего сломать."
    },
    correctedReasoning: {
      en: "Document who owns encoding. Prefer final appendSection with a clear raw-payload contract, or a named hook that cannot silently change meaning.",
      ru: "Документируйте, кто владеет кодированием. Предпочитайте final appendSection с ясным контрактом raw-payload или именованный хук без тихой смены смысла."
    },
    remediationMissionIds: ["mis_inheritance"]
  },
  {
    id: "err_inh_inheritance_always_reuse",
    code: "ERR_INH_INHERITANCE_ALWAYS_REUSE",
    title: {
      en: "Using Inheritance Purely for Code Reuse Without IS-A Design",
      ru: "Наследование Только ради Переиспользования Кода без Дизайна IS-A"
    },
    description: {
      en: "Extending BaseRegulatoryReport solely to reuse formatting helpers when the subtype relationship and extension contract were never designed — amplifying brittle-base risk.",
      ru: "Расширение BaseRegulatoryReport только ради переиспользования хелперов форматирования, когда отношение подтипа и контракт расширения никогда не проектировались — усиливает риск хрупкого base."
    },
    conceptIds: ["cpt_inheritance", "cpt_fragile_base_class"],
    exampleIncorrectReasoning: {
      en: "Shared header logic means every report type must extend BaseRegulatoryReport.",
      ru: "Общая логика заголовка значит, что каждый тип отчёта должен extends BaseRegulatoryReport."
    },
    correctedReasoning: {
      en: "Inheritance requires a designed IS-A + documented hooks. Shared formatting can be a collaborator (composition trade-off) without claiming fragile subclass rights.",
      ru: "Наследование требует спроектированного IS-A + документированных хуков. Общее форматирование может быть коллаборатором (компромисс композиции) без хрупких прав подкласса."
    },
    remediationMissionIds: ["mis_inheritance"]
  },
  {
    id: "err_inh_ignore_item19",
    code: "ERR_INH_IGNORE_ITEM19",
    title: {
      en: "Shipping an Extensible Base Without Documenting or Sealing It",
      ru: "Выпуск Расширяемого Base без Документации или Seal"
    },
    description: {
      en: "Leaving BaseRegulatoryReport open for subclassing without @implSpec contracts or final/sealed restrictions, then changing protected semantics in a platform upgrade.",
      ru: "Оставление BaseRegulatoryReport открытым для subclassing без контрактов @implSpec или ограничений final/sealed, затем изменение protected-семантики в апгрейде платформы."
    },
    conceptIds: ["cpt_inheritance", "cpt_inherited_state"],
    exampleIncorrectReasoning: {
      en: "If subclasses compile after our base refactor, the inheritance API is fine.",
      ru: "Если подклассы компилируются после рефакторинга base, inheritance API в порядке."
    },
    correctedReasoning: {
      en: "Item 19: design and document for inheritance or prohibit it. Compile success does not prove behavioral compatibility of protected contracts.",
      ru: "Item 19: проектируйте и документируйте для наследования или запретите его. Успех компиляции не доказывает поведенческую совместимость protected-контрактов."
    },
    remediationMissionIds: ["mis_inheritance"]
  }
];
