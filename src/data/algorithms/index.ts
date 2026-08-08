export * from './patterns';
export * from './registry';
export * from './validate';
export * from './containsDuplicate';

import { validateAlgorithmLabContent } from './validate';

export const ALGORITHM_LAB_VALIDATION = validateAlgorithmLabContent();
