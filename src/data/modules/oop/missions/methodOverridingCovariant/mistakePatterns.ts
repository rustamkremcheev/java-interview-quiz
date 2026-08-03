import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_OVERRIDING_COVARIANT: readonly MistakePattern[] = [
  {
    id: "err_silent_overload_missing_override",
    code: "ERR_SILENT_OVERLOAD_MISSING_OVERRIDE",
    title: {
      en: "Silent Overload from Missing @Override",
      ru: "Тихая Перегрузка из-за Отсутствия @Override"
    },
    description: {
      en: "Declaring a same-named method in a subclass with a non-override-equivalent signature and no @Override, so the compiler accepts an overload while polymorphic callers still invoke the parent method.",
      ru: "Объявление одноимённого метода в подклассе с не-override-equivalent сигнатурой и без @Override, так что компилятор принимает перегрузку, а полиморфные вызывающие по-прежнему вызывают метод родителя."
    },
    conceptIds: ["cpt_method_overriding"],
    exampleIncorrectReasoning: {
      en: "CorporateInvoiceRepository.findById(InvoiceKey) has the same name as the parent method, so polymorphic InvoiceRepository calls will use it.",
      ru: "CorporateInvoiceRepository.findById(InvoiceKey) имеет то же имя, что и метод родителя, значит полиморфные вызовы через InvoiceRepository будут использовать его."
    },
    correctedReasoning: {
      en: "Overriding requires an override-equivalent signature. Without @Override, a parameter-type mismatch silently creates an overload. Polymorphic dispatch via InvoiceRepository still hits InvoiceRepository.findById(String).",
      ru: "Переопределение требует override-equivalent сигнатуры. Без @Override расхождение типа параметра тихо создаёт перегрузку. Полиморфная диспетчеризация через InvoiceRepository по-прежнему попадает в InvoiceRepository.findById(String)."
    },
    remediationMissionIds: ["mis_method_overriding_covariant"]
  },
  {
    id: "err_covariant_return_confused_with_param",
    code: "ERR_COVARIANT_RETURN_CONFUSED_WITH_PARAM",
    title: {
      en: "Confusing Covariant Returns with Parameter Type Changes",
      ru: "Путаница Ковариантных Возвратов с Изменением Типа Параметра"
    },
    description: {
      en: "Believing that changing a method parameter to a more specific type is valid covariance, when Java only allows covariant return types — parameter types must remain override-equivalent (invariant for reference parameters).",
      ru: "Убеждение, что смена параметра метода на более специфичный тип — валидная ковариантность, тогда как Java разрешает только ковариантные возвраты — типы параметров должны оставаться override-equivalent (инвариантны для ссылочных параметров)."
    },
    conceptIds: ["cpt_method_overriding", "cpt_covariant_returns"],
    exampleIncorrectReasoning: {
      en: "If covariant returns are allowed, covariant parameters like findById(InvoiceKey) should also be allowed when overriding findById(String).",
      ru: "Если ковариантные возвраты разрешены, ковариантные параметры вроде findById(InvoiceKey) тоже должны быть разрешены при переопределении findById(String)."
    },
    correctedReasoning: {
      en: "Java overriding allows a more specific return type (CorporateInvoice extends Invoice) but requires matching parameter types. Changing String to InvoiceKey creates an overload, not an override.",
      ru: "Переопределение в Java допускает более специфичный возвращаемый тип (CorporateInvoice extends Invoice), но требует совпадающих типов параметров. Смена String на InvoiceKey создаёт перегрузку, а не override."
    },
    remediationMissionIds: ["mis_method_overriding_covariant"]
  },
  {
    id: "err_broader_checked_exception_override",
    code: "ERR_BROADER_CHECKED_EXCEPTION_OVERRIDE",
    title: {
      en: "Broadening Checked Exceptions in an Override",
      ru: "Расширение Checked-Исключений в Override"
    },
    description: {
      en: "Attempting to override a method that throws InvoiceNotFoundException by declaring throws Exception or IOException, which violates JLS override rules and fails compilation when @Override is present.",
      ru: "Попытка переопределить метод, бросающий InvoiceNotFoundException, объявлением throws Exception или IOException, что нарушает правила JLS и падает на компиляции при наличии @Override."
    },
    conceptIds: ["cpt_method_overriding"],
    exampleIncorrectReasoning: {
      en: "Declaring throws Exception is safer because it covers every failure mode the subclass might encounter.",
      ru: "Объявление throws Exception безопаснее, потому что покрывает все режимы отказа, с которыми может столкнуться подкласс."
    },
    correctedReasoning: {
      en: "Overrides may only throw the same checked exceptions, subtypes of those exceptions, or fewer. Broader checked exceptions break callers that only catch InvoiceNotFoundException.",
      ru: "Override может бросать только те же checked-исключения, их подтипы или меньшее число. Более широкие checked-исключения ломают вызывающий код, который ловит только InvoiceNotFoundException."
    },
    remediationMissionIds: ["mis_method_overriding_covariant"]
  },
  {
    id: "err_reduced_visibility_override",
    code: "ERR_REDUCED_VISIBILITY_OVERRIDE",
    title: {
      en: "Reducing Access Visibility When Overriding",
      ru: "Сужение Видимости при Переопределении"
    },
    description: {
      en: "Attempting to override a public superclass method with a protected or package-private subclass method, which is a compile-time error under JLS 8.4.8.",
      ru: "Попытка переопределить public-метод суперкласса protected или package-private методом подкласса — ошибка компиляции по JLS 8.4.8."
    },
    conceptIds: ["cpt_method_overriding"],
    exampleIncorrectReasoning: {
      en: "Making CorporateInvoiceRepository.findById protected hides corporate enrichment from other packages while still overriding the parent.",
      ru: "Сделав CorporateInvoiceRepository.findById protected, мы скрываем corporate-обогащение от других пакетов, всё ещё переопределяя родителя."
    },
    correctedReasoning: {
      en: "An overriding method cannot reduce visibility. public may stay public (or theoretically widen from protected to public), but public → protected is illegal.",
      ru: "Переопределяющий метод не может сужать видимость. public может остаться public (или расшириться с protected до public), но public → protected незаконно."
    },
    remediationMissionIds: ["mis_method_overriding_covariant"]
  },
  {
    id: "err_static_hiding_as_override",
    code: "ERR_STATIC_HIDING_AS_OVERRIDE",
    title: {
      en: "Treating Static Method Hiding as Runtime Override",
      ru: "Принятие Скрытия Static-Метода за Runtime Override"
    },
    description: {
      en: "Assuming a static method with the same signature in a subclass participates in polymorphic dispatch the same way instance overrides do.",
      ru: "Предположение, что static-метод с той же сигнатурой в подклассе участвует в полиморфной диспетчеризации так же, как instance-overrides."
    },
    conceptIds: ["cpt_method_overriding"],
    exampleIncorrectReasoning: {
      en: "If CorporateInvoiceRepository declares static Invoice findById(String), calls via InvoiceRepository will pick the corporate version at runtime.",
      ru: "Если CorporateInvoiceRepository объявляет static Invoice findById(String), вызовы через InvoiceRepository выберут corporate-версию в runtime."
    },
    correctedReasoning: {
      en: "Static methods are hidden, not overridden. Resolution is compile-time based on the reference type. Only instance methods use invokevirtual polymorphic dispatch.",
      ru: "Static-методы скрываются, а не переопределяются. Разрешение — compile-time по типу ссылки. Только instance-методы используют полиморфную диспетчеризацию invokevirtual."
    },
    remediationMissionIds: ["mis_method_overriding_covariant"]
  }
];
