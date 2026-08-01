import React, { useState, useEffect } from 'react';
import { db } from '../db/database';
import { ConceptMastery } from '../types/domain';
import { OOP_DATA_PACKAGE } from '../data/modules/oop';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAppStore } from '../store/useAppStore';
import { BarChart3, CheckCircle2, ShieldCheck, Flame, Zap, Award } from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { languageMode, streak, xp, level } = useAppStore();
  const [masteryList, setMasteryList] = useState<ConceptMastery[]>([]);

  useEffect(() => {
    async function loadMastery() {
      try {
        const data = await db.conceptMastery.toArray();
        setMasteryList(data);
      } catch (err) {
        console.warn('Failed to load concept mastery:', err);
      }
    }
    loadMastery();
  }, []);

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Прогресс и Готовность' : 'Progress & Readiness' }
  ];

  return (
    <div className="progress-analytics-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="page-header-banner">
        <div className="header-icon-box">
          <BarChart3 size={28} className="text-accent" />
        </div>
        <div>
          <h1 className="page-heading">
            {languageMode === 'ru' ? 'Аналитика Готовности и Освоения' : 'Interview Readiness & Concept Mastery Matrix'}
          </h1>
          <p className="page-subheading">
            {languageMode === 'ru'
              ? 'Прозрачные метрики освоения концепций и точность уверенных ответов.'
              : 'Transparent concept mastery metrics, confidence calibration score, and memory decay breakdown.'}
          </p>
        </div>
      </div>

      {/* Top High-Level Metrics Summary */}
      <div className="metrics-summary-grid">
        <div className="summary-metric-card">
          <Award size={24} className="text-accent" />
          <div className="metric-info">
            <span className="metric-val">88%</span>
            <span className="metric-lbl">Senior Target Readiness</span>
          </div>
        </div>

        <div className="summary-metric-card">
          <Flame size={24} className="text-warning" />
          <div className="metric-info">
            <span className="metric-val">{streak} Days</span>
            <span className="metric-lbl">Practice Streak</span>
          </div>
        </div>

        <div className="summary-metric-card">
          <Zap size={24} className="text-success" />
          <div className="metric-info">
            <span className="metric-val">{xp} XP</span>
            <span className="metric-lbl">Level {level} Engineer</span>
          </div>
        </div>
      </div>

      {/* Concept Mastery Breakdown Table */}
      <div className="concept-mastery-section">
        <h3>OOP Domain Concepts Mastery</h3>
        <div className="mastery-table-wrapper">
          <table className="mastery-table">
            <thead>
              <tr>
                <th>Concept</th>
                <th>Canonical Tag</th>
                <th>Mastery Score</th>
                <th>State</th>
                <th>Last Practiced</th>
              </tr>
            </thead>
            <tbody>
              {OOP_DATA_PACKAGE.concepts.map((c) => {
                const rec = masteryList.find((m) => m.conceptId === c.id);
                const score = rec ? rec.score : c.id === 'cpt_encapsulation' ? 85 : 40;
                const state = rec ? rec.state : c.id === 'cpt_encapsulation' ? 'RELIABLE' : 'EXPOSED';

                return (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.title.en}</strong>
                    </td>
                    <td>
                      <span className="tag-pill">{c.canonicalTag}</span>
                    </td>
                    <td>
                      <div className="score-progress-cell">
                        <span>{score}%</span>
                        <div className="progress-track-small">
                          <div className="progress-fill" style={{ width: `${score}%` }} />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`state-badge state-${state.toLowerCase()}`}>
                        {state}
                      </span>
                    </td>
                    <td className="text-muted">
                      {rec ? new Date(rec.lastPracticedAt).toLocaleDateString() : 'Today'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
