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
          {isLocked && <span className="status-pill status-locked"><Lock size={12} /> Locked</span>}
          {topic.id === 'top_oop_05' && <span className="status-pill status-active"><Trophy size={12} /> MVP Mission Active</span>}
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
          <span>📚 {topic.missionIds.length || (topic.id === 'top_oop_05' ? 1 : 0)} Missions</span>
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
        {topic.id === 'top_oop_05' ? (
          <button type="button" className="btn-small-primary">
            <Play size={13} /> Start Encapsulation Topic
          </button>
        ) : isLocked ? (
          <button type="button" className="btn-small-secondary">
            <span>Unlock Prerequisite</span>
          </button>
        ) : (
          <button type="button" className="btn-small-secondary">
            <span>Explore Topic</span>
          </button>
        )}
      </div>
    </div>
  );
};
