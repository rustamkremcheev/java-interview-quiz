import { Topic } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { Clock, Lock, Play, Trophy } from 'lucide-react';

interface TopicCardProps {
  topic: Topic;
  onSelect: (topic: Topic) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic, onSelect }) => {
  const { languageMode } = useAppStore();

  const getTitle = () => {
    if (languageMode === 'ru') return topic.title.ru;
    return topic.title.en;
  };

  const getDescription = () => {
    if (languageMode === 'ru') return topic.description.ru;
    return topic.description.en;
  };

  const isAvailable = topic.availability === 'AVAILABLE';
  const isLocked = topic.availability === 'LOCKED';
  const missionCount = topic.missionIds ? topic.missionIds.length : 0;
  const hasMissions = missionCount > 0;

  return (
    <div
      className={`topic-item-card ${isLocked ? 'topic-locked' : ''} ${!isAvailable && !isLocked ? 'topic-planned' : ''}`}
      onClick={() => onSelect(topic)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(topic);
        }
      }}
    >
      <div className="topic-card-header">
        <div className="topic-badge-row">
          <span className="topic-difficulty-badge">{topic.difficulty}</span>
          {hasMissions && <span className="status-pill status-active"><Trophy size={12} /> Mission Active</span>}
          {isLocked && <span className="status-pill status-locked"><Lock size={12} /> Locked</span>}
          {!hasMissions && !isLocked && <span className="status-pill status-planned">Mission Coming Soon</span>}
        </div>
      </div>

      <h4 className="topic-title">{getTitle()}</h4>
      <p className="topic-desc">{getDescription()}</p>

      <div className="topic-meta-grid">
        <div className="meta-item">
          <Clock size={13} />
          <span>{topic.estimatedMinutes}m</span>
        </div>
        <div className="meta-item">
          <span>📚 {missionCount} Mission{missionCount !== 1 ? 's' : ''}</span>
        </div>
        <div className="meta-item">
          <span>❓ {topic.questionCount || 4} Verified Qs</span>
        </div>
      </div>

      {topic.prerequisiteTopicIds.length > 0 && (
        <div className="topic-prereq-note">
          <span className="note-label">Prerequisites:</span>
          <span>{topic.prerequisiteTopicIds.join(', ')}</span>
        </div>
      )}

      <div className="topic-card-action">
        {hasMissions ? (
          <button type="button" className="btn-small-primary">
            <Play size={13} /> View Topic
          </button>
        ) : isLocked ? (
          <button type="button" className="btn-small-secondary">
            <span>Unlock Prerequisite</span>
          </button>
        ) : (
          <button type="button" className="btn-small-secondary">
            <span>View Topic</span>
          </button>
        )}
      </div>
    </div>
  );
};
