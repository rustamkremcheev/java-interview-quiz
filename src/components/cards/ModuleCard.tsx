import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Module } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import {
  Layers, Code, Hash, Cpu, Server, Leaf, Zap, Activity,
  Database, Box, Cloud, Globe, Terminal, Users, Clock, Play, Lock, LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, Code, Hash, Cpu, Server, Leaf, Zap, Activity,
  Database, Box, Cloud, Globe, Terminal, Users
};

interface ModuleCardProps {
  module: Module;
  progressPercent?: number;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, progressPercent = 0 }) => {
  const navigate = useNavigate();
  const { languageMode } = useAppStore();

  const IconComp = ICON_MAP[module.icon] || Layers;

  const getTitle = () => {
    if (languageMode === 'ru') return module.title.ru;
    return module.title.en;
  };

  const getDescription = () => {
    if (languageMode === 'ru') return module.description.ru;
    return module.description.en;
  };

  const isAvailable = module.availability === 'AVAILABLE';

  const handleCardClick = () => {
    if (isAvailable) {
      navigate(`/modules/${module.slug}`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAvailable) {
      navigate(`/modules/${module.slug}`);
    }
  };

  return (
    <div
      className={`module-grid-card ${!isAvailable ? 'card-disabled' : 'card-interactive'}`}
      onClick={handleCardClick}
      tabIndex={isAvailable ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="module-card-header">
        <div className="module-icon-box">
          <IconComp size={24} className="module-icon" />
        </div>

        {isAvailable ? (
          <span className="badge badge-active">
            {progressPercent > 0 ? 'IN PROGRESS' : 'ACTIVE MVP'}
          </span>
        ) : (
          <span className="badge badge-coming-soon">
            <Lock size={12} /> COMING SOON
          </span>
        )}
      </div>

      <div className="module-card-body">
        <h3 className="module-card-title">{getTitle()}</h3>
        <p className="module-card-desc">{getDescription()}</p>

        <div className="module-difficulty-range">
          <span className="meta-label">Difficulty:</span>
          <span className="difficulty-tag">{module.difficultyRange.min} ──► {module.difficultyRange.max}</span>
        </div>

        <div className="module-stats-row">
          <div className="stat-item" title="Estimated Hours">
            <Clock size={14} />
            <span>{Math.round(module.estimatedMinutes / 60)}h</span>
          </div>
          <div className="stat-item" title="Topics Count">
            <span className="stat-num">{module.topicIds.length || 37}</span>
            <span>Topics</span>
          </div>
          <div className="stat-item" title="Interview Questions">
            <span className="stat-num">{module.interviewQuestionCount || 85}</span>
            <span>Qs</span>
          </div>
          <div className="stat-item" title="Coding Exercises">
            <span className="stat-num">{module.codingExerciseCount || 24}</span>
            <span>Code</span>
          </div>
        </div>

        {isAvailable && (
          <div className="module-progress-wrapper">
            <div className="progress-info">
              <span>Completion</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="module-card-footer">
        {isAvailable ? (
          <button type="button" className="btn-primary-action" onClick={handleButtonClick}>
            <Play size={14} />
            <span>{progressPercent > 0 ? 'Continue Module' : 'Explore Module'}</span>
          </button>
        ) : (
          <button type="button" className="btn-secondary-action" disabled>
            <span>Preview Details</span>
          </button>
        )}
      </div>
    </div>
  );
};
