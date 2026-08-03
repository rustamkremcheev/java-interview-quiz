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
    INTERFACE_DEFAULT_METHODS_MISSION
  ],
  stages: [
    ...BANK_ACCOUNT_MISSION_STAGES,
    ...EQUALS_HASHCODE_MISSION_STAGES,
    ...IMMUTABILITY_DEFENSIVE_COPY_MISSION_STAGES,
    ...COMPOSITION_MISSION_STAGES,
    ...LISKOV_SUBSTITUTION_MISSION_STAGES,
    ...OBJECT_CREATION_BUILDER_MISSION_STAGES,
    ...INTERFACE_DEFAULT_METHODS_MISSION_STAGES
  ],
  theoryArticles: [
    THEORY_ARTICLE_BANK_ACCOUNT,
    THEORY_ARTICLE_EQUALS_HASHCODE,
    THEORY_ARTICLE_IMMUTABILITY,
    THEORY_ARTICLE_COMPOSITION,
    THEORY_ARTICLE_LISKOV,
    THEORY_ARTICLE_OBJECT_CREATION,
    THEORY_ARTICLE_DEFAULT_METHODS
  ],
  theoryCheckpoints: [
    ...THEORY_CHECKPOINTS_BANK_ACCOUNT,
    ...THEORY_CHECKPOINTS_EQUALS_HASHCODE,
    ...THEORY_CHECKPOINTS_IMMUTABILITY,
    ...THEORY_CHECKPOINTS_COMPOSITION,
    ...THEORY_CHECKPOINTS_LISKOV,
    ...THEORY_CHECKPOINTS_OBJECT_CREATION,
    ...THEORY_CHECKPOINTS_DEFAULT_METHODS
  ],
  challenges: [
    ...ALL_BANK_ACCOUNT_CHALLENGES,
    ...ALL_EQUALS_HASHCODE_CHALLENGES,
    ...ALL_IMMUTABILITY_CHALLENGES,
    ...ALL_COMPOSITION_CHALLENGES,
    ...ALL_LISKOV_CHALLENGES,
    ...ALL_OBJECT_CREATION_CHALLENGES,
    ...ALL_INTERFACE_DEFAULT_METHODS_CHALLENGES
  ],
  codeArtifacts: [
    ...CODE_ARTIFACTS_BANK_ACCOUNT,
    ...CODE_ARTIFACTS_EQUALS_HASHCODE,
    ...CODE_ARTIFACTS_IMMUTABILITY,
    ...CODE_ARTIFACTS_COMPOSITION,
    ...CODE_ARTIFACTS_LISKOV,
    ...CODE_ARTIFACTS_OBJECT_CREATION,
    ...CODE_ARTIFACTS_INTERFACE_DEFAULT_METHODS
  ],
  hints: [
    ...HINTS_BANK_ACCOUNT,
    ...HINTS_EQUALS_HASHCODE,
    ...HINTS_IMMUTABILITY,
    ...HINTS_COMPOSITION,
    ...HINTS_LISKOV,
    ...HINTS_OBJECT_CREATION,
    ...HINTS_INTERFACE_DEFAULT_METHODS
  ],
  sources: [
    ...SOURCES_BANK_ACCOUNT,
    ...SOURCES_EQUALS_HASHCODE,
    ...SOURCES_IMMUTABILITY,
    ...SOURCES_COMPOSITION,
    ...SOURCES_LISKOV,
    ...SOURCES_OBJECT_CREATION,
    ...SOURCES_INTERFACE_DEFAULT_METHODS
  ],
  sourceReferences: [
    ...SOURCE_REFERENCES_BANK_ACCOUNT,
    ...SOURCE_REFERENCES_EQUALS_HASHCODE,
    ...SOURCE_REFERENCES_IMMUTABILITY,
    ...SOURCE_REFERENCES_COMPOSITION,
    ...SOURCE_REFERENCES_LISKOV,
    ...SOURCE_REFERENCES_OBJECT_CREATION,
    ...SOURCE_REFERENCES_INTERFACE_DEFAULT_METHODS
  ],
  mistakePatterns: [
    ...MISTAKE_PATTERNS_BANK_ACCOUNT,
    ...MISTAKE_PATTERNS_EQUALS_HASHCODE,
    ...MISTAKE_PATTERNS_IMMUTABILITY,
    ...MISTAKE_PATTERNS_COMPOSITION,
    ...MISTAKE_PATTERNS_LISKOV,
    ...MISTAKE_PATTERNS_OBJECT_CREATION,
    ...MISTAKE_PATTERNS_INTERFACE_DEFAULT_METHODS
  ]
};
