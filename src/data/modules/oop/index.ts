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

import { OOP_TOPICS } from './topics';
import { OOP_CONCEPTS, OOP_TAGS } from './concepts';
import { BANK_ACCOUNT_MISSION, BANK_ACCOUNT_MISSION_STAGES } from './missions/bankAccountInvariants/mission';
import { THEORY_ARTICLE_BANK_ACCOUNT, THEORY_CHECKPOINTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/theory';
import { ALL_BANK_ACCOUNT_CHALLENGES } from './missions/bankAccountInvariants/challenges';
import { CODE_ARTIFACTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/codeArtifacts';
import { HINTS_BANK_ACCOUNT } from './missions/bankAccountInvariants/hints';
import { SOURCES_BANK_ACCOUNT, SOURCE_REFERENCES_BANK_ACCOUNT } from './missions/bankAccountInvariants/sources';
import { MISTAKE_PATTERNS_BANK_ACCOUNT } from './missions/bankAccountInvariants/mistakePatterns';
import { MODULES_REGISTRY } from '../registry';

export const OOP_MODULE: Module = MODULES_REGISTRY.find((m) => m.id === "mod_oop")!;

export const OOP_DATA_PACKAGE = {
  module: OOP_MODULE,
  topics: OOP_TOPICS,
  concepts: OOP_CONCEPTS,
  tags: OOP_TAGS,
  missions: [BANK_ACCOUNT_MISSION],
  stages: BANK_ACCOUNT_MISSION_STAGES,
  theoryArticles: [THEORY_ARTICLE_BANK_ACCOUNT],
  theoryCheckpoints: THEORY_CHECKPOINTS_BANK_ACCOUNT,
  challenges: ALL_BANK_ACCOUNT_CHALLENGES,
  codeArtifacts: CODE_ARTIFACTS_BANK_ACCOUNT,
  hints: HINTS_BANK_ACCOUNT,
  sources: SOURCES_BANK_ACCOUNT,
  sourceReferences: SOURCE_REFERENCES_BANK_ACCOUNT,
  mistakePatterns: MISTAKE_PATTERNS_BANK_ACCOUNT
};
