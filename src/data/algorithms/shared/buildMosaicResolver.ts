import {
  AlgorithmSolution,
  LocalizedText,
  MosaicDistractor,
  MosaicPuzzle
} from '../../../types/algorithmLab';
import {
  generateMosaicFromSolution,
  resolveSolutionForStrategy
} from '../../../lib/algorithmLab/mosaicGenerator';

export function buildMosaicResolver(args: {
  readonly mosaicId: string;
  readonly solutions: readonly AlgorithmSolution[];
  readonly distractors: readonly MosaicDistractor[];
  readonly alternativeNote: LocalizedText;
  readonly targetStrategyId: string;
}): (strategyId?: string) => MosaicPuzzle {
  return (strategyId?: string) => {
    const solution = resolveSolutionForStrategy(
      args.solutions,
      strategyId,
      args.targetStrategyId
    );
    return generateMosaicFromSolution(solution, {
      mosaicId: args.mosaicId,
      distractors: args.distractors,
      alternativeNote: args.alternativeNote,
      difficulty: 'MEDIUM'
    });
  };
}
