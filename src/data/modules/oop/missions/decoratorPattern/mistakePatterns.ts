import { MistakePattern } from '../../../../../types/domain';

export const MISTAKE_PATTERNS_DECORATOR_PATTERN: readonly MistakePattern[] = [
  {
    id: "err_dec_bypass_core",
    code: "ERR_DEC_BYPASS_CORE",
    title: {
      en: "Calling CoreFundsTransferGateway Directly",
      ru: "Прямой Вызов CoreFundsTransferGateway"
    },
    description: {
      en: "Some code paths inject the core gateway and skip Audited/Authorized wrappers.",
      ru: "Некоторые пути инжектят core gateway и пропускают обёртки Audited/Authorized."
    },
    conceptIds: ["cpt_decorator_pattern", "cpt_decorator_order"],
    exampleIncorrectReasoning: {
      en: "Hot path can skip audit for latency.",
      ru: "Hot path может пропустить audit ради latency."
    },
    correctedReasoning: {
      en: "Composition root must expose only the fully decorated FundsTransferGateway. Never publish the core bean to callers.",
      ru: "Composition root должен отдавать только полностью декорированный FundsTransferGateway. Никогда не публикуйте core bean вызывающим."
    },
    remediationMissionIds: ["mis_decorator_pattern"]
  },
  {
    id: "err_dec_inherit_instead",
    code: "ERR_DEC_INHERIT_INSTEAD",
    title: {
      en: "Using Inheritance Instead of Same-Contract Wrappers",
      ru: "Наследование Вместо Обёрток с Тем Же Контрактом"
    },
    description: {
      en: "Subclassing CoreFundsTransferGateway for retry/audit creates combinatorial subclasses and bypass risks.",
      ru: "Subclassing CoreFundsTransferGateway для retry/audit создаёт комбинаторные подклассы и риски обхода."
    },
    conceptIds: ["cpt_decorator_pattern"],
    exampleIncorrectReasoning: {
      en: "Extend the core class for each cross-cutting concern.",
      ru: "Расширяйте core-класс для каждого cross-cutting concern."
    },
    correctedReasoning: {
      en: "Implement FundsTransferGateway wrappers that delegate — compose concerns at runtime.",
      ru: "Реализуйте обёртки FundsTransferGateway с делегированием — компонуйте concerns в runtime."
    },
    remediationMissionIds: ["mis_decorator_pattern"]
  },
  {
    id: "err_dec_ignore_order",
    code: "ERR_DEC_IGNORE_ORDER",
    title: {
      en: "Ignoring Decorator Order",
      ru: "Игнорирование Порядка Decorator"
    },
    description: {
      en: "Placing Retry outside Auth can retry unauthorized transfers; audit order affects what is recorded.",
      ru: "Retry снаружи Auth может повторять неавторизованные transfers; порядок audit влияет на записи."
    },
    conceptIds: ["cpt_decorator_order"],
    exampleIncorrectReasoning: {
      en: "Wrappers commute — order never matters.",
      ru: "Обёртки коммутативны — порядок не важен."
    },
    correctedReasoning: {
      en: "Decorator order is part of the security/observability design. Document and test the stack.",
      ru: "Порядок decorator — часть security/observability дизайна. Документируйте и тестируйте стек."
    },
    remediationMissionIds: ["mis_decorator_pattern"]
  },
  {
    id: "err_dec_confuse_proxy",
    code: "ERR_DEC_CONFUSE_PROXY",
    title: {
      en: "Confusing Decorator with Proxy",
      ru: "Путаница Decorator и Proxy"
    },
    description: {
      en: "Treating access-control-only proxies as interchangeable with layered behavioral decorators without clarifying intent.",
      ru: "Считать access-control proxy взаимозаменяемым с layered behavioral decorators без уточнения intent."
    },
    conceptIds: ["cpt_decorator_vs_proxy"],
    exampleIncorrectReasoning: {
      en: "Proxy and Decorator are the same pattern.",
      ru: "Proxy и Decorator — один паттерн."
    },
    correctedReasoning: {
      en: "Proxy controls access/identity to another object; Decorator adds responsibilities while preserving the service contract.",
      ru: "Proxy контролирует доступ/identity к другому объекту; Decorator добавляет обязанности, сохраняя контракт сервиса."
    },
    remediationMissionIds: ["mis_decorator_pattern"]
  },
  {
    id: "err_dec_equals_identity",
    code: "ERR_DEC_EQUALS_IDENTITY",
    title: {
      en: "Broken equals/hashCode Across Wrapper Layers",
      ru: "Сломанные equals/hashCode через Слои Обёрток"
    },
    description: {
      en: "Comparing decorated gateways by identity or leaking wrapper equals into domain equality.",
      ru: "Сравнение декорированных gateway по identity или утечка equals обёртки в доменное равенство."
    },
    conceptIds: ["cpt_decorator_pattern"],
    exampleIncorrectReasoning: {
      en: "Decorators should forward equals to the core always.",
      ru: "Decorators всегда должны делегировать equals в core."
    },
    correctedReasoning: {
      en: "Usually avoid equals on service wrappers; if needed, define explicit policy — wrapping changes identity.",
      ru: "Обычно избегайте equals на service wrappers; если нужно — явная политика: wrapping меняет identity."
    },
    remediationMissionIds: ["mis_decorator_pattern"]
  }
];
