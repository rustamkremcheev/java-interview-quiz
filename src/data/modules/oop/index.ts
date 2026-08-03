import { Module } from '../../../types/domain';

export * from './topics';
export * from './concepts';
export * from './missions/bankAccountInvariants/mission';
export * from './missions/bankAccountInvariants/theory';
export * from './missions/bankAccountInvariants/challenges';
export * from './missions/bankAccountInvariants/codeArtifacts';
export * from './missions/bankAccountInvariants/hints';
export * from './missions/bankAccountInvariants/sources';
export * from './missions/bankAccountInvariants/mistakePatterns';

export * from './missions/equalsHashCodeContract/mission';
export * from './missions/equalsHashCodeContract/theory';
export * from './missions/equalsHashCodeContract/challenges';
export * from './missions/equalsHashCodeContract/codeArtifacts';
export * from './missions/equalsHashCodeContract/hints';
export * from './missions/equalsHashCodeContract/sources';
export * from './missions/equalsHashCodeContract/mistakePatterns';

export * from './missions/immutabilityDefensiveCopy/mission';
export * from './missions/immutabilityDefensiveCopy/theory';
export * from './missions/immutabilityDefensiveCopy/challenges';
export * from './missions/immutabilityDefensiveCopy/codeArtifacts';
export * from './missions/immutabilityDefensiveCopy/hints';
export * from './missions/immutabilityDefensiveCopy/sources';
export * from './missions/immutabilityDefensiveCopy/mistakePatterns';

export * from './missions/compositionOverInheritance/mission';
export * from './missions/compositionOverInheritance/theory';
export * from './missions/compositionOverInheritance/challenges';
export * from './missions/compositionOverInheritance/codeArtifacts';
export * from './missions/compositionOverInheritance/hints';
export * from './missions/compositionOverInheritance/sources';
export * from './missions/compositionOverInheritance/mistakePatterns';

export * from './missions/liskovSubstitution/mission';
export * from './missions/liskovSubstitution/theory';
export * from './missions/liskovSubstitution/challenges';
export * from './missions/liskovSubstitution/codeArtifacts';
export * from './missions/liskovSubstitution/hints';
export * from './missions/liskovSubstitution/sources';
export * from './missions/liskovSubstitution/mistakePatterns';

export * from './missions/objectCreationBuilder/mission';
export * from './missions/objectCreationBuilder/theory';
export * from './missions/objectCreationBuilder/challenges';
export * from './missions/objectCreationBuilder/codeArtifacts';
export * from './missions/objectCreationBuilder/hints';
export * from './missions/objectCreationBuilder/sources';
export * from './missions/objectCreationBuilder/mistakePatterns';

export * from './missions/interfaceDefaultMethods/mission';
export * from './missions/interfaceDefaultMethods/theory';
export * from './missions/interfaceDefaultMethods/challenges';
export * from './missions/interfaceDefaultMethods/codeArtifacts';
export * from './missions/interfaceDefaultMethods/hints';
export * from './missions/interfaceDefaultMethods/sources';
export * from './missions/interfaceDefaultMethods/mistakePatterns';

export * from './missions/methodOverridingCovariant/mission';
export * from './missions/methodOverridingCovariant/theory';
export * from './missions/methodOverridingCovariant/challenges';
export * from './missions/methodOverridingCovariant/codeArtifacts';
export * from './missions/methodOverridingCovariant/hints';
export * from './missions/methodOverridingCovariant/sources';
export * from './missions/methodOverridingCovariant/mistakePatterns';

export * from './missions/methodOverloading/mission';
export * from './missions/methodOverloading/theory';
export * from './missions/methodOverloading/challenges';
export * from './missions/methodOverloading/codeArtifacts';
export * from './missions/methodOverloading/hints';
export * from './missions/methodOverloading/sources';
export * from './missions/methodOverloading/mistakePatterns';

export * from './missions/dynamicDispatch/mission';
export * from './missions/dynamicDispatch/theory';
export * from './missions/dynamicDispatch/challenges';
export * from './missions/dynamicDispatch/codeArtifacts';
export * from './missions/dynamicDispatch/hints';
export * from './missions/dynamicDispatch/sources';
export * from './missions/dynamicDispatch/mistakePatterns';

export * from './missions/dependencyInjection/mission';
export * from './missions/dependencyInjection/theory';
export * from './missions/dependencyInjection/challenges';
export * from './missions/dependencyInjection/codeArtifacts';
export * from './missions/dependencyInjection/hints';
export * from './missions/dependencyInjection/sources';
export * from './missions/dependencyInjection/mistakePatterns';

export * from './missions/strategyPattern/mission';
export * from './missions/strategyPattern/theory';
export * from './missions/strategyPattern/challenges';
export * from './missions/strategyPattern/codeArtifacts';
export * from './missions/strategyPattern/hints';
export * from './missions/strategyPattern/sources';
export * from './missions/strategyPattern/mistakePatterns';

export * from './missions/factoryPattern/mission';
export * from './missions/factoryPattern/theory';
export * from './missions/factoryPattern/challenges';
export * from './missions/factoryPattern/codeArtifacts';
export * from './missions/factoryPattern/hints';
export * from './missions/factoryPattern/sources';
export * from './missions/factoryPattern/mistakePatterns';

export * from './missions/oopAntiPatterns/mission';
export * from './missions/oopAntiPatterns/theory';
export * from './missions/oopAntiPatterns/challenges';
export * from './missions/oopAntiPatterns/codeArtifacts';
export * from './missions/oopAntiPatterns/hints';
export * from './missions/oopAntiPatterns/sources';
export * from './missions/oopAntiPatterns/mistakePatterns';

import { OOP_TOPICS } from './topics';
import { OOP_CONCEPTS, OOP_TAGS } from './concepts';
import { BANK_ACCOUNT_MISSION, BANK_ACCOUNT_MISSION_STAGES } from './missions/bankAccountInvariants/mission';
import { THEORY_ARTICLE_BANK_ACCOUNT, THEORY_CHECKPOINTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/theory';
import { ALL_BANK_ACCOUNT_CHALLENGES } from './missions/bankAccountInvariants/challenges';
import { CODE_ARTIFACTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/codeArtifacts';
import { HINTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/hints';
import { SOURCES_BANK_ACCOUNT, SOURCE_REFERENCES_BANK_ACCOUNT } from './missions/bankAccountInvariants/sources';
import { MISTAKE_PATTERNS_BANK_ACCOUNT } from './missions/bankAccountInvariants/mistakePatterns';

import { EQUALS_HASHCODE_MISSION, EQUALS_HASHCODE_MISSION_STAGES } from './missions/equalsHashCodeContract/mission';
import { THEORY_ARTICLE_EQUALS_HASHCODE, THEORY_CHECKPOINTS_EQUALS_HASHCODE } from './missions/equalsHashCodeContract/theory';
import { ALL_EQUALS_HASHCODE_CHALLENGES } from './missions/equalsHashCodeContract/challenges';
import { CODE_ARTIFACTS_EQUALS_HASHCODE } from './missions/equalsHashCodeContract/codeArtifacts';
import { HINTS_EQUALS_HASHCODE } from './missions/equalsHashCodeContract/hints';
import { SOURCES_EQUALS_HASHCODE, SOURCE_REFERENCES_EQUALS_HASHCODE } from './missions/equalsHashCodeContract/sources';
import { MISTAKE_PATTERNS_EQUALS_HASHCODE } from './missions/equalsHashCodeContract/mistakePatterns';

import { IMMUTABILITY_DEFENSIVE_COPY_MISSION, IMMUTABILITY_DEFENSIVE_COPY_MISSION_STAGES } from './missions/immutabilityDefensiveCopy/mission';
import { THEORY_ARTICLE_IMMUTABILITY, THEORY_CHECKPOINTS_IMMUTABILITY } from './missions/immutabilityDefensiveCopy/theory';
import { ALL_IMMUTABILITY_CHALLENGES } from './missions/immutabilityDefensiveCopy/challenges';
import { CODE_ARTIFACTS_IMMUTABILITY } from './missions/immutabilityDefensiveCopy/codeArtifacts';
import { HINTS_IMMUTABILITY } from './missions/immutabilityDefensiveCopy/hints';
import { SOURCES_IMMUTABILITY, SOURCE_REFERENCES_IMMUTABILITY } from './missions/immutabilityDefensiveCopy/sources';
import { MISTAKE_PATTERNS_IMMUTABILITY } from './missions/immutabilityDefensiveCopy/mistakePatterns';

import { COMPOSITION_MISSION, COMPOSITION_MISSION_STAGES } from './missions/compositionOverInheritance/mission';
import { THEORY_ARTICLE_COMPOSITION, THEORY_CHECKPOINTS_COMPOSITION } from './missions/compositionOverInheritance/theory';
import { ALL_COMPOSITION_CHALLENGES } from './missions/compositionOverInheritance/challenges';
import { CODE_ARTIFACTS_COMPOSITION } from './missions/compositionOverInheritance/codeArtifacts';
import { HINTS_COMPOSITION } from './missions/compositionOverInheritance/hints';
import { SOURCES_COMPOSITION, SOURCE_REFERENCES_COMPOSITION } from './missions/compositionOverInheritance/sources';
import { MISTAKE_PATTERNS_COMPOSITION } from './missions/compositionOverInheritance/mistakePatterns';

import { LISKOV_SUBSTITUTION_MISSION, LISKOV_SUBSTITUTION_MISSION_STAGES } from './missions/liskovSubstitution/mission';
import { THEORY_ARTICLE_LISKOV, THEORY_CHECKPOINTS_LISKOV } from './missions/liskovSubstitution/theory';
import { ALL_LISKOV_CHALLENGES } from './missions/liskovSubstitution/challenges';
import { CODE_ARTIFACTS_LISKOV } from './missions/liskovSubstitution/codeArtifacts';
import { HINTS_LISKOV } from './missions/liskovSubstitution/hints';
import { SOURCES_LISKOV, SOURCE_REFERENCES_LISKOV } from './missions/liskovSubstitution/sources';
import { MISTAKE_PATTERNS_LISKOV } from './missions/liskovSubstitution/mistakePatterns';

import { OBJECT_CREATION_BUILDER_MISSION, OBJECT_CREATION_BUILDER_MISSION_STAGES } from './missions/objectCreationBuilder/mission';
import { THEORY_ARTICLE_OBJECT_CREATION, THEORY_CHECKPOINTS_OBJECT_CREATION } from './missions/objectCreationBuilder/theory';
import { ALL_OBJECT_CREATION_CHALLENGES } from './missions/objectCreationBuilder/challenges';
import { CODE_ARTIFACTS_OBJECT_CREATION } from './missions/objectCreationBuilder/codeArtifacts';
import { HINTS_OBJECT_CREATION } from './missions/objectCreationBuilder/hints';
import { SOURCES_OBJECT_CREATION, SOURCE_REFERENCES_OBJECT_CREATION } from './missions/objectCreationBuilder/sources';
import { MISTAKE_PATTERNS_OBJECT_CREATION } from './missions/objectCreationBuilder/mistakePatterns';

import { INTERFACE_DEFAULT_METHODS_MISSION, INTERFACE_DEFAULT_METHODS_MISSION_STAGES } from './missions/interfaceDefaultMethods/mission';
import { THEORY_ARTICLE_DEFAULT_METHODS, THEORY_CHECKPOINTS_DEFAULT_METHODS } from './missions/interfaceDefaultMethods/theory';
import { ALL_INTERFACE_DEFAULT_METHODS_CHALLENGES } from './missions/interfaceDefaultMethods/challenges';
import { CODE_ARTIFACTS_INTERFACE_DEFAULT_METHODS } from './missions/interfaceDefaultMethods/codeArtifacts';
import { HINTS_INTERFACE_DEFAULT_METHODS } from './missions/interfaceDefaultMethods/hints';
import { SOURCES_INTERFACE_DEFAULT_METHODS, SOURCE_REFERENCES_INTERFACE_DEFAULT_METHODS } from './missions/interfaceDefaultMethods/sources';
import { MISTAKE_PATTERNS_INTERFACE_DEFAULT_METHODS } from './missions/interfaceDefaultMethods/mistakePatterns';

import { METHOD_OVERRIDING_COVARIANT_MISSION, METHOD_OVERRIDING_COVARIANT_MISSION_STAGES } from './missions/methodOverridingCovariant/mission';
import { THEORY_ARTICLE_OVERRIDING_COVARIANT, THEORY_CHECKPOINTS_OVERRIDING_COVARIANT } from './missions/methodOverridingCovariant/theory';
import { ALL_OVERRIDING_COVARIANT_CHALLENGES } from './missions/methodOverridingCovariant/challenges';
import { CODE_ARTIFACTS_OVERRIDING_COVARIANT } from './missions/methodOverridingCovariant/codeArtifacts';
import { HINTS_OVERRIDING_COVARIANT } from './missions/methodOverridingCovariant/hints';
import { SOURCES_OVERRIDING_COVARIANT, SOURCE_REFERENCES_OVERRIDING_COVARIANT } from './missions/methodOverridingCovariant/sources';
import { MISTAKE_PATTERNS_OVERRIDING_COVARIANT } from './missions/methodOverridingCovariant/mistakePatterns';

import { METHOD_OVERLOADING_MISSION, METHOD_OVERLOADING_MISSION_STAGES } from './missions/methodOverloading/mission';
import { THEORY_ARTICLE_OVERLOADING, THEORY_CHECKPOINTS_OVERLOADING } from './missions/methodOverloading/theory';
import { ALL_OVERLOADING_CHALLENGES } from './missions/methodOverloading/challenges';
import { CODE_ARTIFACTS_OVERLOADING } from './missions/methodOverloading/codeArtifacts';
import { HINTS_OVERLOADING } from './missions/methodOverloading/hints';
import { SOURCES_OVERLOADING, SOURCE_REFERENCES_OVERLOADING } from './missions/methodOverloading/sources';
import { MISTAKE_PATTERNS_OVERLOADING } from './missions/methodOverloading/mistakePatterns';

import { DYNAMIC_DISPATCH_MISSION, DYNAMIC_DISPATCH_MISSION_STAGES } from './missions/dynamicDispatch/mission';
import { THEORY_ARTICLE_DYNAMIC_DISPATCH, THEORY_CHECKPOINTS_DYNAMIC_DISPATCH } from './missions/dynamicDispatch/theory';
import { ALL_DYNAMIC_DISPATCH_CHALLENGES } from './missions/dynamicDispatch/challenges';
import { CODE_ARTIFACTS_DYNAMIC_DISPATCH } from './missions/dynamicDispatch/codeArtifacts';
import { HINTS_DYNAMIC_DISPATCH } from './missions/dynamicDispatch/hints';
import { SOURCES_DYNAMIC_DISPATCH, SOURCE_REFERENCES_DYNAMIC_DISPATCH } from './missions/dynamicDispatch/sources';
import { MISTAKE_PATTERNS_DYNAMIC_DISPATCH } from './missions/dynamicDispatch/mistakePatterns';

import { DEPENDENCY_INJECTION_MISSION, DEPENDENCY_INJECTION_MISSION_STAGES } from './missions/dependencyInjection/mission';
import { THEORY_ARTICLE_DEPENDENCY_INJECTION, THEORY_CHECKPOINTS_DEPENDENCY_INJECTION } from './missions/dependencyInjection/theory';
import { ALL_DEPENDENCY_INJECTION_CHALLENGES } from './missions/dependencyInjection/challenges';
import { CODE_ARTIFACTS_DEPENDENCY_INJECTION } from './missions/dependencyInjection/codeArtifacts';
import { HINTS_DEPENDENCY_INJECTION } from './missions/dependencyInjection/hints';
import { SOURCES_DEPENDENCY_INJECTION, SOURCE_REFERENCES_DEPENDENCY_INJECTION } from './missions/dependencyInjection/sources';
import { MISTAKE_PATTERNS_DEPENDENCY_INJECTION } from './missions/dependencyInjection/mistakePatterns';

import { STRATEGY_PATTERN_MISSION, STRATEGY_PATTERN_MISSION_STAGES } from './missions/strategyPattern/mission';
import { THEORY_ARTICLE_STRATEGY, THEORY_CHECKPOINTS_STRATEGY } from './missions/strategyPattern/theory';
import { ALL_STRATEGY_CHALLENGES } from './missions/strategyPattern/challenges';
import { CODE_ARTIFACTS_STRATEGY } from './missions/strategyPattern/codeArtifacts';
import { HINTS_STRATEGY } from './missions/strategyPattern/hints';
import { SOURCES_STRATEGY, SOURCE_REFERENCES_STRATEGY } from './missions/strategyPattern/sources';
import { MISTAKE_PATTERNS_STRATEGY } from './missions/strategyPattern/mistakePatterns';

import { FACTORY_PATTERN_MISSION, FACTORY_PATTERN_MISSION_STAGES } from './missions/factoryPattern/mission';
import { THEORY_ARTICLE_FACTORY, THEORY_CHECKPOINTS_FACTORY } from './missions/factoryPattern/theory';
import { ALL_FACTORY_CHALLENGES } from './missions/factoryPattern/challenges';
import { CODE_ARTIFACTS_FACTORY } from './missions/factoryPattern/codeArtifacts';
import { HINTS_FACTORY } from './missions/factoryPattern/hints';
import { SOURCES_FACTORY, SOURCE_REFERENCES_FACTORY } from './missions/factoryPattern/sources';
import { MISTAKE_PATTERNS_FACTORY } from './missions/factoryPattern/mistakePatterns';

import { OOP_ANTI_PATTERNS_MISSION, OOP_ANTI_PATTERNS_MISSION_STAGES } from './missions/oopAntiPatterns/mission';
import { THEORY_ARTICLE_ANTI_PATTERNS, THEORY_CHECKPOINTS_ANTI_PATTERNS } from './missions/oopAntiPatterns/theory';
import { ALL_ANTI_PATTERNS_CHALLENGES } from './missions/oopAntiPatterns/challenges';
import { CODE_ARTIFACTS_ANTI_PATTERNS } from './missions/oopAntiPatterns/codeArtifacts';
import { HINTS_ANTI_PATTERNS } from './missions/oopAntiPatterns/hints';
import { SOURCES_ANTI_PATTERNS, SOURCE_REFERENCES_ANTI_PATTERNS } from './missions/oopAntiPatterns/sources';
import { MISTAKE_PATTERNS_ANTI_PATTERNS } from './missions/oopAntiPatterns/mistakePatterns';

import { MODULES_REGISTRY } from '../registry';

export const OOP_MODULE: Module = MODULES_REGISTRY.find((m) => m.id === "mod_oop")!;

export const OOP_DATA_PACKAGE = {
  module: OOP_MODULE,
  topics: OOP_TOPICS,
  concepts: OOP_CONCEPTS,
  tags: OOP_TAGS,
  missions: [
    BANK_ACCOUNT_MISSION,
    EQUALS_HASHCODE_MISSION,
    IMMUTABILITY_DEFENSIVE_COPY_MISSION,
    COMPOSITION_MISSION,
    LISKOV_SUBSTITUTION_MISSION,
    OBJECT_CREATION_BUILDER_MISSION,
    INTERFACE_DEFAULT_METHODS_MISSION,
    METHOD_OVERRIDING_COVARIANT_MISSION,
    METHOD_OVERLOADING_MISSION,
    DYNAMIC_DISPATCH_MISSION,
    DEPENDENCY_INJECTION_MISSION,
    STRATEGY_PATTERN_MISSION,
    FACTORY_PATTERN_MISSION,
    OOP_ANTI_PATTERNS_MISSION
  ],
  stages: [
    ...BANK_ACCOUNT_MISSION_STAGES,
    ...EQUALS_HASHCODE_MISSION_STAGES,
    ...IMMUTABILITY_DEFENSIVE_COPY_MISSION_STAGES,
    ...COMPOSITION_MISSION_STAGES,
    ...LISKOV_SUBSTITUTION_MISSION_STAGES,
    ...OBJECT_CREATION_BUILDER_MISSION_STAGES,
    ...INTERFACE_DEFAULT_METHODS_MISSION_STAGES,
    ...METHOD_OVERRIDING_COVARIANT_MISSION_STAGES,
    ...METHOD_OVERLOADING_MISSION_STAGES,
    ...DYNAMIC_DISPATCH_MISSION_STAGES,
    ...DEPENDENCY_INJECTION_MISSION_STAGES,
    ...STRATEGY_PATTERN_MISSION_STAGES,
    ...FACTORY_PATTERN_MISSION_STAGES,
    ...OOP_ANTI_PATTERNS_MISSION_STAGES
  ],
  theoryArticles: [
    THEORY_ARTICLE_BANK_ACCOUNT,
    THEORY_ARTICLE_EQUALS_HASHCODE,
    THEORY_ARTICLE_IMMUTABILITY,
    THEORY_ARTICLE_COMPOSITION,
    THEORY_ARTICLE_LISKOV,
    THEORY_ARTICLE_OBJECT_CREATION,
    THEORY_ARTICLE_DEFAULT_METHODS,
    THEORY_ARTICLE_OVERRIDING_COVARIANT,
    THEORY_ARTICLE_OVERLOADING,
    THEORY_ARTICLE_DYNAMIC_DISPATCH,
    THEORY_ARTICLE_DEPENDENCY_INJECTION,
    THEORY_ARTICLE_STRATEGY,
    THEORY_ARTICLE_FACTORY,
    THEORY_ARTICLE_ANTI_PATTERNS
  ],
  theoryCheckpoints: [
    ...THEORY_CHECKPOINTS_BANK_ACCOUNT,
    ...THEORY_CHECKPOINTS_EQUALS_HASHCODE,
    ...THEORY_CHECKPOINTS_IMMUTABILITY,
    ...THEORY_CHECKPOINTS_COMPOSITION,
    ...THEORY_CHECKPOINTS_LISKOV,
    ...THEORY_CHECKPOINTS_OBJECT_CREATION,
    ...THEORY_CHECKPOINTS_DEFAULT_METHODS,
    ...THEORY_CHECKPOINTS_OVERRIDING_COVARIANT,
    ...THEORY_CHECKPOINTS_OVERLOADING,
    ...THEORY_CHECKPOINTS_DYNAMIC_DISPATCH,
    ...THEORY_CHECKPOINTS_DEPENDENCY_INJECTION,
    ...THEORY_CHECKPOINTS_STRATEGY,
    ...THEORY_CHECKPOINTS_FACTORY,
    ...THEORY_CHECKPOINTS_ANTI_PATTERNS
  ],
  challenges: [
    ...ALL_BANK_ACCOUNT_CHALLENGES,
    ...ALL_EQUALS_HASHCODE_CHALLENGES,
    ...ALL_IMMUTABILITY_CHALLENGES,
    ...ALL_COMPOSITION_CHALLENGES,
    ...ALL_LISKOV_CHALLENGES,
    ...ALL_OBJECT_CREATION_CHALLENGES,
    ...ALL_INTERFACE_DEFAULT_METHODS_CHALLENGES,
    ...ALL_OVERRIDING_COVARIANT_CHALLENGES,
    ...ALL_OVERLOADING_CHALLENGES,
    ...ALL_DYNAMIC_DISPATCH_CHALLENGES,
    ...ALL_DEPENDENCY_INJECTION_CHALLENGES,
    ...ALL_STRATEGY_CHALLENGES,
    ...ALL_FACTORY_CHALLENGES,
    ...ALL_ANTI_PATTERNS_CHALLENGES
  ],
  codeArtifacts: [
    ...CODE_ARTIFACTS_BANK_ACCOUNT,
    ...CODE_ARTIFACTS_EQUALS_HASHCODE,
    ...CODE_ARTIFACTS_IMMUTABILITY,
    ...CODE_ARTIFACTS_COMPOSITION,
    ...CODE_ARTIFACTS_LISKOV,
    ...CODE_ARTIFACTS_OBJECT_CREATION,
    ...CODE_ARTIFACTS_INTERFACE_DEFAULT_METHODS,
    ...CODE_ARTIFACTS_OVERRIDING_COVARIANT,
    ...CODE_ARTIFACTS_OVERLOADING,
    ...CODE_ARTIFACTS_DYNAMIC_DISPATCH,
    ...CODE_ARTIFACTS_DEPENDENCY_INJECTION,
    ...CODE_ARTIFACTS_STRATEGY,
    ...CODE_ARTIFACTS_FACTORY,
    ...CODE_ARTIFACTS_ANTI_PATTERNS
  ],
  hints: [
    ...HINTS_BANK_ACCOUNT,
    ...HINTS_EQUALS_HASHCODE,
    ...HINTS_IMMUTABILITY,
    ...HINTS_COMPOSITION,
    ...HINTS_LISKOV,
    ...HINTS_OBJECT_CREATION,
    ...HINTS_INTERFACE_DEFAULT_METHODS,
    ...HINTS_OVERRIDING_COVARIANT,
    ...HINTS_OVERLOADING,
    ...HINTS_DYNAMIC_DISPATCH,
    ...HINTS_DEPENDENCY_INJECTION,
    ...HINTS_STRATEGY,
    ...HINTS_FACTORY,
    ...HINTS_ANTI_PATTERNS
  ],
  sources: [
    ...SOURCES_BANK_ACCOUNT,
    ...SOURCES_EQUALS_HASHCODE,
    ...SOURCES_IMMUTABILITY,
    ...SOURCES_COMPOSITION,
    ...SOURCES_LISKOV,
    ...SOURCES_OBJECT_CREATION,
    ...SOURCES_INTERFACE_DEFAULT_METHODS,
    ...SOURCES_OVERRIDING_COVARIANT,
    ...SOURCES_OVERLOADING,
    ...SOURCES_DYNAMIC_DISPATCH,
    ...SOURCES_DEPENDENCY_INJECTION,
    ...SOURCES_STRATEGY,
    ...SOURCES_FACTORY,
    ...SOURCES_ANTI_PATTERNS
  ],
  sourceReferences: [
    ...SOURCE_REFERENCES_BANK_ACCOUNT,
    ...SOURCE_REFERENCES_EQUALS_HASHCODE,
    ...SOURCE_REFERENCES_IMMUTABILITY,
    ...SOURCE_REFERENCES_COMPOSITION,
    ...SOURCE_REFERENCES_LISKOV,
    ...SOURCE_REFERENCES_OBJECT_CREATION,
    ...SOURCE_REFERENCES_INTERFACE_DEFAULT_METHODS,
    ...SOURCE_REFERENCES_OVERRIDING_COVARIANT,
    ...SOURCE_REFERENCES_OVERLOADING,
    ...SOURCE_REFERENCES_DYNAMIC_DISPATCH,
    ...SOURCE_REFERENCES_DEPENDENCY_INJECTION,
    ...SOURCE_REFERENCES_STRATEGY,
    ...SOURCE_REFERENCES_FACTORY,
    ...SOURCE_REFERENCES_ANTI_PATTERNS
  ],
  mistakePatterns: [
    ...MISTAKE_PATTERNS_BANK_ACCOUNT,
    ...MISTAKE_PATTERNS_EQUALS_HASHCODE,
    ...MISTAKE_PATTERNS_IMMUTABILITY,
    ...MISTAKE_PATTERNS_COMPOSITION,
    ...MISTAKE_PATTERNS_LISKOV,
    ...MISTAKE_PATTERNS_OBJECT_CREATION,
    ...MISTAKE_PATTERNS_INTERFACE_DEFAULT_METHODS,
    ...MISTAKE_PATTERNS_OVERRIDING_COVARIANT,
    ...MISTAKE_PATTERNS_OVERLOADING,
    ...MISTAKE_PATTERNS_DYNAMIC_DISPATCH,
    ...MISTAKE_PATTERNS_DEPENDENCY_INJECTION,
    ...MISTAKE_PATTERNS_STRATEGY,
    ...MISTAKE_PATTERNS_FACTORY,
    ...MISTAKE_PATTERNS_ANTI_PATTERNS
  ]
};
