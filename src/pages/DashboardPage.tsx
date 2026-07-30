import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { db } from '../db/database';
import { useLiveQuery } from 'dexie-react-hooks';
import { mission1 } from '../data/missions/hashmap/mission1';
import {
  Play,
  RotateCcw,
  Zap,
  Flame,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { xp, level, streak, languageMode } = useAppStore();

  const masteryList = useLiveQuery(() => db.mastery.toArray(), []) || [];
  const dueReviewsCount = useLiveQuery(async () => {
    const now = new Date().toISOString();
    return db.mastery.where('nextReviewTime').below(now).count();
  }, []) || 0;

  const weakConcepts = masteryList.filter((m) => m.masteryScore < 60 || m.confidentMistakes > 0);

  const calculateMasteryAverage = () => {
    if (masteryList.length === 0) return 0;
    const sum = masteryList.reduce((acc, m) => acc + m.masteryScore, 0);
    return Math.round(sum / masteryList.length);
  };

  const overallMasteryPct = calculateMasteryAverage();

  return (
    <div className="dashboard-page-container">
      {/* Hero Welcome Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} /> Citi Senior Backend Prep Active
          </div>
          <h1>Welcome back, Senior Engineer</h1>
          <p className="hero-subtext">
            Active recall, debugging puzzles, trade-off scenarios, and concept-matched interview practice. No passive memorization.
          </p>

          <div className="hero-actions">
            <button onClick={() => navigate('/mission/hashmap-disappearing-payment')} className="btn-hero-primary">
              <Play size={18} /> Launch Mission 1: Disappearing Payment
            </button>
            {dueReviewsCount > 0 && (
              <button onClick={() => navigate('/review')} className="btn-hero-secondary">
                <RotateCcw size={18} /> Practice {dueReviewsCount} Due Reviews
              </button>
            )}
          </div>
        </div>

        <div className="hero-stats-card">
          <div className="hero-level-header">
            <span>LEVEL {level} SENIOR ARCHITECT</span>
            <span>{xp % 100}/100 XP to Lvl {level + 1}</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${xp % 100}%` }} />
          </div>

          <div className="quick-stats-row">
            <div className="qs-item">
              <Zap className="qs-icon xp" size={20} />
              <div>
                <div className="qs-val">{xp}</div>
                <div className="qs-lbl">Total XP</div>
              </div>
            </div>
            <div className="qs-item">
              <Flame className="qs-icon streak" size={20} />
              <div>
                <div className="qs-val">{streak} Days</div>
                <div className="qs-lbl">Practice Streak</div>
              </div>
            </div>
            <div className="qs-item">
              <Target className="qs-icon mastery" size={20} />
              <div>
                <div className="qs-val">{overallMasteryPct}%</div>
                <div className="qs-lbl">Overall Mastery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column: Active Missions & Learning Path */}
        <div className="dash-col main-col">
          <div className="section-card">
            <div className="card-header">
              <h2><BookOpen size={20} /> Active Learning Path: HashMap & Immutability</h2>
              <span className="badge badge-citi">3 Missions Available</span>
            </div>

            <div className="missions-list">
              <div className="mission-item-card" onClick={() => navigate('/mission/hashmap-disappearing-payment')}>
                <div className="mission-info">
                  <span className="mission-topic">HashMap Mechanics</span>
                  <h3>{mission1.title.en}</h3>
                  <p>{mission1.subtitle.en}</p>
                </div>
                <button className="btn-small-primary">
                  Start Mission <ArrowRight size={16} />
                </button>
              </div>

              <div className="mission-item-card" onClick={() => navigate('/mission/hashset-duplicate-customer')}>
                <div className="mission-info">
                  <span className="mission-topic">HashSet & Equality</span>
                  <h3>Mission 2: The Duplicate Customer</h3>
                  <p>Inconsistent equals() & hashCode() causing HashSet duplicates</p>
                </div>
                <button className="btn-small-primary">
                  Start Mission <ArrowRight size={16} />
                </button>
              </div>

              <div className="mission-item-card" onClick={() => navigate('/mission/concurrenthashmap-mutable-key-myth')}>
                <div className="mission-info">
                  <span className="mission-topic">ConcurrentHashMap Myth</span>
                  <h3>Mission 3: Concurrent Fix That Did Not Fix It</h3>
                  <p>Thread safety vs key hash stability in ConcurrentHashMap</p>
                </div>
                <button className="btn-small-primary">
                  Start Mission <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Spaced Repetition & Weaknesses */}
        <div className="dash-col side-col">
          {/* Due Reviews Widget */}
          <div className="section-card">
            <div className="card-header">
              <h3><RotateCcw size={18} /> Spaced Repetition Queue</h3>
            </div>
            <div className="review-widget-body">
              {dueReviewsCount > 0 ? (
                <div className="due-review-alert">
                  <div className="due-count">{dueReviewsCount}</div>
                  <p>Concepts due for memory retrieval review right now.</p>
                  <button onClick={() => navigate('/review')} className="btn-primary full-width">
                    Start Due Review Queue
                  </button>
                </div>
              ) : (
                <div className="all-clear-box">
                  <CheckCircle2 size={32} className="icon-success" />
                  <p>All reviews clear! No concepts currently due for review.</p>
                </div>
              )}
            </div>
          </div>

          {/* Weakness Analysis Widget */}
          <div className="section-card">
            <div className="card-header">
              <h3><AlertTriangle size={18} /> Weakness Breakdown</h3>
            </div>
            <div className="weakness-body">
              {weakConcepts.length > 0 ? (
                weakConcepts.map((w) => (
                  <div key={w.conceptId} className="weakness-item">
                    <div className="weak-top">
                      <span className="weak-name">{w.conceptId}</span>
                      <span className="weak-score">{w.masteryScore}%</span>
                    </div>
                    {w.confidentMistakes > 0 && (
                      <span className="confident-mistake-badge">
                        ⚠️ {w.confidentMistakes} Confident Mistake(s)
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="empty-subtext">No critical weaknesses detected yet. Complete missions to populate error analysis.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
