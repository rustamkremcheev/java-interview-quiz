import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAppStore } from '../store/useAppStore';
import {
  getAvailableAlgorithmProblems,
  getPatternFamilyById,
  PLANNED_ALGORITHM_PREVIEWS
} from '../data/algorithms';
import { getWorkshopProgress } from '../db/database';
import { WorkshopProgress } from '../types/algorithmLab';
import { getLocalizedText, getLocalizedInline } from '../lib/localized';
import { Play, Clock } from 'lucide-react';

export const AlgorithmLabPage: React.FC = () => {
  const navigate = useNavigate();
  const { languageMode } = useAppStore();
  const problems = getAvailableAlgorithmProblems();
  const [progressMap, setProgressMap] = useState<Record<string, WorkshopProgress>>({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const available = getAvailableAlgorithmProblems();
      const entries: Record<string, WorkshopProgress> = {};
      for (const problem of available) {
        entries[problem.id] = await getWorkshopProgress(problem.id);
      }
      if (!cancelled) setProgressMap(entries);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Модули' : 'Modules', path: '/modules' },
    { label: 'Algorithm Lab' }
  ];

  return (
    <div className="alg-lab-page">
      <Breadcrumbs items={breadcrumbs} />

      <header className="alg-lab-hero">
        <h1>Algorithm Lab</h1>
        <p>
          {languageMode === 'ru'
            ? 'Собирайте, симулируйте, отлаживайте и объясняйте алгоритмы.'
            : 'Assemble, simulate, debug, and explain algorithms.'}
        </p>
      </header>

      <section className="alg-problem-list">
        <h2>{languageMode === 'ru' ? 'Доступные задачи' : 'Available problems'}</h2>
        {problems.map((problem) => {
          const progress = progressMap[problem.id];
          const completed = progress?.completedStageTypes.length ?? 0;
          const total = problem.stages.length;
          const started = (progress?.masteryState ?? 'NOT_STARTED') !== 'NOT_STARTED';
          const pattern = getPatternFamilyById(problem.patternFamilyId);
          return (
            <article key={problem.id} className="alg-problem-card">
              <div>
                <h3>{getLocalizedInline(problem.title, languageMode)}</h3>
                <p>{getLocalizedText(problem.summary, languageMode)}</p>
                <div className="alg-meta-row">
                  <span>{problem.difficulty}</span>
                  {pattern && (
                    <span className="alg-pattern-chip">
                      {getLocalizedInline(pattern.title, languageMode)}
                    </span>
                  )}
                  <span>
                    <Clock size={14} /> ~{problem.estimatedMinutes}m
                  </span>
                  <span>
                    {languageMode === 'ru' ? 'Этап' : 'Stage'}:{' '}
                    {progress?.currentStageType ?? 'CLARIFY'}
                  </span>
                  <span>
                    {completed}/{total}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn-primary-action"
                onClick={() => navigate(`/algorithms/${problem.slug}/workshop`)}
              >
                <Play size={14} />
                {started
                  ? languageMode === 'ru'
                    ? 'Продолжить воркшоп'
                    : 'Continue Workshop'
                  : languageMode === 'ru'
                    ? 'Начать воркшоп'
                    : 'Start Workshop'}
              </button>
            </article>
          );
        })}
      </section>

      <section className="alg-problem-list">
        <h2>{languageMode === 'ru' ? 'Скоро' : 'Coming soon / Planned'}</h2>
        {PLANNED_ALGORITHM_PREVIEWS.map((preview) => (
          <article key={preview.id} className="alg-problem-card is-planned">
            <div>
              <h3>{languageMode === 'ru' ? preview.title.ru : preview.title.en}</h3>
              <div className="alg-meta-row">
                <span>{preview.difficulty}</span>
                <span className="badge badge-coming-soon">{preview.availability}</span>
              </div>
            </div>
            <button type="button" className="btn-secondary-action" disabled>
              {languageMode === 'ru' ? 'Скоро' : 'Coming soon'}
            </button>
          </article>
        ))}
      </section>
    </div>
  );
};
