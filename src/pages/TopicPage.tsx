import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTopicBySlug } from '../data';
import { BANK_ACCOUNT_MISSION } from '../data/modules/oop';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TagChip } from '../components/common/TagChip';
import { useAppStore } from '../store/useAppStore';
import { Clock, Play, BookOpen, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TopicPage: React.FC = () => {
  const { moduleSlug, topicSlug } = useParams<{ moduleSlug: string; topicSlug: string }>();
  const navigate = useNavigate();
  const { languageMode } = useAppStore();

  const topicObj = getTopicBySlug(moduleSlug || 'object-oriented-programming', topicSlug || 'encapsulation');

  const getTitle = () => {
    if (!topicObj) return '05. Encapsulation & Information Hiding';
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
    { label: 'OOP & Clean Arch', path: '/modules/object-oriented-programming' },
    { label: getTitle() }
  ];

  return (
    <div className="topic-detail-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="topic-header-banner">
        <div className="banner-top-badges">
          <span className="badge badge-active">APPLIED ──► SENIOR TOPIC</span>
          <span className="difficulty-tag">Est Time: 45 Mins</span>
        </div>
        <h1 className="topic-page-title">{getTitle()}</h1>
        <p className="topic-page-desc">{getDescription()}</p>

        {/* Canonical Tags Row */}
        <div className="tags-row">
          <span className="tags-row-label">Canonical Tags:</span>
          {topicObj?.canonicalTags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          )) || (
            <>
              <TagChip tag="#encapsulation" />
              <TagChip tag="#invariants" />
              <TagChip tag="#access-modifiers" />
              <TagChip tag="#defensive-copying" />
            </>
          )}
        </div>
      </div>

      <div className="topic-content-grid">
        {/* Left Column: Objectives & Provenance Summary */}
        <div className="topic-info-column">
          <div className="card-panel">
            <h3><CheckCircle2 size={18} className="text-success" /> Key Learning Objectives</h3>
            <ul className="objectives-list">
              <li>Understand encapsulation as state invariant enforcement, not simple getter/setter generation.</li>
              <li>Eliminate illegal direct mutations and setter invariant bypass vulnerabilities.</li>
              <li>Apply defensive copying for mutable Date and Collection reference objects.</li>
              <li>Represent monetary values as integer sub-units (cents) to eliminate float precision bugs.</li>
            </ul>
          </div>

          <div className="card-panel">
            <h3><ShieldCheck size={18} className="text-accent" /> Verified Source Coverage</h3>
            <div className="source-coverage-box">
              <div className="source-item">
                <BookOpen size={14} />
                <span>Effective Java (Item 17: Minimize mutability & Item 50: Defensive copies)</span>
              </div>
              <div className="source-item">
                <BookOpen size={14} />
                <span>Curated Senior Java Interview Preparation Question Bank</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mission Expedition Cards */}
        <div className="topic-missions-column">
          <h3>Available Learning Missions</h3>

          <div className="mission-hero-card">
            <div className="mission-card-top">
              <span className="badge badge-active">MVP ACTIVE MISSION</span>
              <span className="xp-tag">⚡ +250 XP</span>
            </div>

            <h4>{languageMode === 'ru' ? BANK_ACCOUNT_MISSION.title.ru : BANK_ACCOUNT_MISSION.title.en}</h4>
            <p>{languageMode === 'ru' ? BANK_ACCOUNT_MISSION.description.ru : BANK_ACCOUNT_MISSION.description.en}</p>

            <div className="mission-scenario-preview">
              <strong>Educational Scenario:</strong>
              <p>{languageMode === 'ru' ? BANK_ACCOUNT_MISSION.scenarioIntroduction.ru : BANK_ACCOUNT_MISSION.scenarioIntroduction.en}</p>
            </div>

            <div className="mission-card-meta">
              <span><Clock size={13} /> {BANK_ACCOUNT_MISSION.estimatedMinutes} Mins</span>
              <span>📚 13 Stages</span>
              <span>❓ 3 Verified Challenges</span>
            </div>

            <div className="mission-card-footer">
              <button
                type="button"
                className="btn-primary-action large"
                onClick={() => navigate(`/missions/protecting-bank-account-invariants`)}
              >
                <Play size={16} />
                <span>Start Mission: Protecting BankAccount Invariants</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
