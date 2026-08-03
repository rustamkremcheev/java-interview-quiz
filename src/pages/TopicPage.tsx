import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicBySlug, getMissionsForTopic } from '../data';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TagChip } from '../components/common/TagChip';
import { useAppStore } from '../store/useAppStore';
import { Clock, Play, BookOpen, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { moduleSlug, topicSlug } = useParams<{ moduleSlug: string; topicSlug: string }>();
  const navigate = useNavigate();
  const { languageMode } = useAppStore();

  const currentModuleSlug = moduleSlug || 'object-oriented-programming';
  const currentTopicSlug = topicSlug || 'encapsulation';

  const topicObj = getTopicBySlug(currentModuleSlug, currentTopicSlug);
  const missions = topicObj ? getMissionsForTopic(topicObj.id) : [];

  const getTitle = () => {
    if (!topicObj) return 'Topic Not Found';
    if (languageMode === 'ru') return topicObj.title.ru;
    return topicObj.title.en;
  };

  const getDescription = () => {
    if (!topicObj) return '';
    if (languageMode === 'ru') return topicObj.description.ru;
    return topicObj.description.en;
  };

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Модули' : 'Modules', path: '/modules' },
    { label: 'OOP & Clean Arch', path: `/modules/${currentModuleSlug}` },
    { label: getTitle() }
  ];

  if (!topicObj) {
    return (
      <div className="topic-detail-page">
        <Breadcrumbs items={breadcrumbs} />
        <div className="card-panel">
          <h2><AlertCircle size={24} className="text-warning" /> Topic Not Found</h2>
          <p>The requested topic could not be found in the current curriculum module.</p>
          <button type="button" className="btn-primary-action" onClick={() => navigate(`/modules/${currentModuleSlug}`)}>
            Back to Module
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="topic-detail-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="topic-header-banner">
        <div className="banner-top-badges">
          <span className="badge badge-active">{topicObj.difficulty} ──► TOPIC</span>
          <span className="difficulty-tag">Est Time: {topicObj.estimatedMinutes} Mins</span>
        </div>
        <h1 className="topic-page-title">{getTitle()}</h1>
        <p className="topic-page-desc">{getDescription()}</p>

        {/* Canonical Tags Row */}
        <div className="tags-row">
          <span className="tags-row-label">Canonical Tags:</span>
          {topicObj.canonicalTags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      </div>

      <div className="topic-content-grid">
        {/* Left Column: Objectives, Prerequisites & Provenance Summary */}
        <div className="topic-info-column">
          <div className="card-panel">
            <h3><CheckCircle2 size={18} className="text-success" /> Key Learning Objectives</h3>
            <ul className="objectives-list">
              {topicObj.learningObjectives.map((obj, idx) => (
                <li key={idx}>
                  {languageMode === 'ru' ? obj.ru : obj.en}
                </li>
              ))}
            </ul>
          </div>

          {topicObj.prerequisiteTopicIds.length > 0 && (
            <div className="card-panel">
              <h3><BookOpen size={18} className="text-accent" /> Prerequisites</h3>
              <p className="prereq-list">
                Required Prerequisite Topics: <strong>{topicObj.prerequisiteTopicIds.join(', ')}</strong>
              </p>
            </div>
          )}

          <div className="card-panel">
            <h3><ShieldCheck size={18} className="text-accent" /> Verified Source Coverage</h3>
            <div className="source-coverage-box">
              {topicObj.sourceIds && topicObj.sourceIds.length > 0 ? (
                topicObj.sourceIds.map((srcId) => (
                  <div key={srcId} className="source-item">
                    <BookOpen size={14} />
                    <span>Source Reference: {srcId}</span>
                  </div>
                ))
              ) : (
                <div className="source-item">
                  <BookOpen size={14} />
                  <span>Curated Senior Java Interview Preparation Question Bank</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Mission Expedition Cards */}
        <div className="topic-missions-column">
          <h3>Available Learning Missions ({missions.length})</h3>

          {missions.length === 0 ? (
            <div className="mission-hero-card coming-soon-card" style={{ opacity: 0.9 }}>
              <div className="mission-card-top">
                <span className="badge badge-planned">PLANNED</span>
                <span className="xp-tag">⏳ Coming Soon</span>
              </div>

              <h4>Mission Coming Soon</h4>
              <p>No active interactive mission is available yet for this topic. An interactive scenario-based challenge is planned for a future release.</p>

              <div className="mission-scenario-preview">
                <strong>Current Status:</strong>
                <p>You can study the learning objectives, tags, and prerequisites above to prepare for this topic's interview questions.</p>
              </div>

              <div className="mission-card-footer">
                <button type="button" className="btn-secondary-action large" disabled style={{ cursor: 'not-allowed', opacity: 0.7 }}>
                  <span>Mission Coming Soon</span>
                </button>
              </div>
            </div>
          ) : (
            missions.map((mission) => (
              <div key={mission.id} className="mission-hero-card">
                <div className="mission-card-top">
                  <span className="badge badge-active">ACTIVE MISSION</span>
                  <span className="xp-tag">⚡ +{mission.xpReward || 250} XP</span>
                </div>

                <h4>{languageMode === 'ru' ? mission.title.ru : mission.title.en}</h4>
                <p>{languageMode === 'ru' ? mission.description.ru : mission.description.en}</p>

                <div className="mission-scenario-preview">
                  <strong>Educational Scenario:</strong>
                  <p>{languageMode === 'ru' ? mission.scenarioIntroduction.ru : mission.scenarioIntroduction.en}</p>
                </div>

                <div className="mission-card-meta">
                  <span><Clock size={13} /> {mission.estimatedMinutes} Mins</span>
                  <span>📚 {mission.stageIds?.length || 13} Stages</span>
                  <span>❓ {mission.challengeIds?.length || 3} Verified Challenges</span>
                </div>

                <div className="mission-card-footer">
                  <button
                    type="button"
                    className="btn-primary-action large"
                    onClick={() => navigate(`/missions/${mission.slug}`)}
                  >
                    <Play size={16} />
                    <span>Start Mission: {languageMode === 'ru' ? mission.title.ru : mission.title.en}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
