import React from 'react';
import { MissionStage } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { CheckCircle2, Circle, ChevronDown } from 'lucide-react';

interface StageStepperProps {
  stages: readonly MissionStage[];
  currentStageId: string;
  completedStageIds: readonly string[];
  onSelectStage: (stageId: string) => void;
}

export const StageStepper: React.FC<StageStepperProps> = ({
  stages,
  currentStageId,
  completedStageIds,
  onSelectStage
}) => {
  const { languageMode } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const getStageTitle = (stage: MissionStage) => {
    if (languageMode === 'ru') return stage.title.ru;
    return stage.title.en;
  };

  const currentIndex = stages.findIndex((s) => s.id === currentStageId);
  const currentStage = stages[currentIndex] || stages[0];

  return (
    <div className="stage-stepper-container">
      {/* Desktop & Tablet Stepper Bar */}
      <div className="stepper-track-desktop">
        {stages.map((stage, idx) => {
          const isCurrent = stage.id === currentStageId;
          const isCompleted = completedStageIds.includes(stage.id);

          return (
            <button
              key={stage.id}
              type="button"
              className={`stepper-step-btn ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              onClick={() => onSelectStage(stage.id)}
              title={getStageTitle(stage)}
            >
              <div className="step-icon-wrap">
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-success" />
                ) : isCurrent ? (
                  <div className="step-active-dot" />
                ) : (
                  <Circle size={14} className="text-muted" />
                )}
              </div>
              <span className="step-number">{idx + 1}</span>
              <span className="step-label">{getStageTitle(stage).split('.')[1] || getStageTitle(stage)}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Compact Dropdown Stepper */}
      <div className="stepper-mobile-dropdown">
        <button
          type="button"
          className="mobile-stepper-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="current-step-text">
            Stage {currentIndex + 1} of {stages.length}: {getStageTitle(currentStage)}
          </span>
          <ChevronDown size={18} className={`arrow-icon ${mobileMenuOpen ? 'open' : ''}`} />
        </button>

        {mobileMenuOpen && (
          <div className="mobile-stepper-menu">
            {stages.map((stage, idx) => {
              const isCurrent = stage.id === currentStageId;
              const isCompleted = completedStageIds.includes(stage.id);

              return (
                <button
                  key={stage.id}
                  type="button"
                  className={`mobile-menu-item ${isCurrent ? 'active' : ''}`}
                  onClick={() => {
                    onSelectStage(stage.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-success" />
                  ) : (
                    <span className="mobile-step-num">{idx + 1}</span>
                  )}
                  <span>{getStageTitle(stage)}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
