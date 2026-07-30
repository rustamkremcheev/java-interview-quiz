import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/database';
import { BarChart3, ShieldCheck, AlertTriangle, Clock, Award } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const masteryList = useLiveQuery(() => db.mastery.toArray(), []) || [];
  const attempts = useLiveQuery(() => db.attempts.toArray(), []) || [];
  const progress = useLiveQuery(() => db.userProgress.get(1), []);

  const totalAttempts = attempts.length;
  const correctAttempts = attempts.filter((a) => a.correct).length;
  const accuracyPct = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

  const totalConfidentMistakes = masteryList.reduce((sum, m) => sum + m.confidentMistakes, 0);

  return (
    <div className="progress-page-container">
      <div className="page-header">
        <h1><BarChart3 size={28} /> Senior Engineering Readiness Analytics</h1>
        <p className="subtext">
          Track concept mastery, confidence accuracy matrix, error patterns, and production review readiness.
        </p>
      </div>

      <div className="stats-overview-grid">
        <div className="analytics-card">
          <Award className="icon-metric xp" size={28} />
          <div className="metric-val">{progress?.xp || 0} XP</div>
          <div className="metric-lbl">Total Experience Points</div>
        </div>

        <div className="analytics-card">
          <ShieldCheck className="icon-metric success" size={28} />
          <div className="metric-val">{accuracyPct}%</div>
          <div className="metric-lbl">Attempt Accuracy Rate</div>
        </div>

        <div className="analytics-card">
          <AlertTriangle className="icon-metric warning" size={28} />
          <div className="metric-val">{totalConfidentMistakes}</div>
          <div className="metric-lbl">Confident Mistakes (Critical Risk)</div>
        </div>

        <div className="analytics-card">
          <Clock className="icon-metric hints" size={28} />
          <div className="metric-val">{totalAttempts}</div>
          <div className="metric-lbl">Total Challenges Attempted</div>
        </div>
      </div>

      {/* Concept Mastery Table */}
      <div className="section-card">
        <h3>Concept-Level Mastery Breakdown</h3>
        <div className="mastery-table">
          <div className="table-header-row">
            <span>Concept Topic</span>
            <span>Mastery Score</span>
            <span>Attempts</span>
            <span>Confident Mistakes</span>
            <span>Next Review</span>
          </div>

          {masteryList.length > 0 ? (
            masteryList.map((m) => (
              <div key={m.conceptId} className="table-data-row">
                <span className="concept-id-col">#{m.conceptId}</span>
                <span className="mastery-score-col">
                  <div className="mini-progress-bg">
                    <div className="mini-progress-fill" style={{ width: `${m.masteryScore}%` }} />
                  </div>
                  <strong>{m.masteryScore}%</strong>
                </span>
                <span>{m.attempts} ({m.correctAttempts} correct)</span>
                <span className={m.confidentMistakes > 0 ? 'text-danger' : ''}>
                  {m.confidentMistakes}
                </span>
                <span className="time-col">
                  {new Date(m.nextReviewTime).toLocaleDateString()} {new Date(m.nextReviewTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          ) : (
            <div className="empty-table-row">No concept data recorded yet. Complete your first mission stage to populate analytics.</div>
          )}
        </div>
      </div>
    </div>
  );
};
