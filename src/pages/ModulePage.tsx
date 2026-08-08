import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { getModuleBySlug } from '../data';
import { OOP_TOPICS } from '../data/modules/oop/topics';
import { TopicCard } from '../components/cards/TopicCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAppStore } from '../store/useAppStore';
import { Clock, Layers, Trophy } from 'lucide-react';
import { Topic } from '../types/domain';

export const ModulePage: React.FC = () => {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const navigate = useNavigate();
  const { languageMode } = useAppStore();

  const moduleObj = getModuleBySlug(moduleSlug || 'object-oriented-programming');

  if (moduleObj?.id === 'mod_algorithm_lab' || moduleSlug === 'algorithm-lab') {
    return <Navigate to="/algorithms" replace />;
  }

  const getTitle = () => {
    if (!moduleObj) return 'Object-Oriented Programming';
    if (languageMode === 'ru') return moduleObj.title.ru;
    return moduleObj.title.en;
  };

  const getDescription = () => {
    if (!moduleObj) return '';
    if (languageMode === 'ru') return moduleObj.description.ru;
    return moduleObj.description.en;
  };

  const activeMissionCount = OOP_TOPICS.reduce((acc, t) => acc + (t.missionIds?.length || 0), 0);

  const handleSelectTopic = (topic: Topic) => {
    const currentSlug = moduleSlug || 'object-oriented-programming';
    navigate(`/modules/${currentSlug}/topics/${topic.slug}`);
  };

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Модули' : 'Modules', path: '/modules' },
    { label: getTitle() }
  ];

  return (
    <div className="module-detail-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="module-header-hero">
        <div className="hero-icon-box">
          <Layers size={32} className="text-accent" />
        </div>
        <div className="hero-content">
          <div className="hero-badge-row">
            <span className="badge badge-active">PRIMARY RELEASE MODULE</span>
            <span className="difficulty-range">APPLIED ──► STAFF BENCHMARK</span>
          </div>
          <h1 className="hero-title">{getTitle()}</h1>
          <p className="hero-desc">{getDescription()}</p>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <Clock size={16} />
              <span>14.5 Total Hours</span>
            </div>
            <div className="hero-stat-item">
              <Layers size={16} />
              <span>{OOP_TOPICS.length} Canonical Topics</span>
            </div>
            <div className="hero-stat-item">
              <Trophy size={16} />
              <span>{activeMissionCount} Active Mission{activeMissionCount !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="topics-section-header">
        <h2>Canonical Topics Directory ({OOP_TOPICS.length} Topics)</h2>
        <p>Explore the prerequisite topics graph and interactive learning missions.</p>
      </div>

      <div className="topics-grid-container">
        {OOP_TOPICS.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onSelect={handleSelectTopic}
          />
        ))}
      </div>
    </div>
  );
};
