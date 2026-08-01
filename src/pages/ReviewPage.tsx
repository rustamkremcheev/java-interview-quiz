import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db/database';
import { ReviewItem } from '../types/domain';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAppStore } from '../store/useAppStore';
import { RotateCcw, CheckCircle2, Play, AlertTriangle } from 'lucide-react';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { languageMode } = useAppStore();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const items = await db.reviewItems.toArray();
        setReviews(items);
      } catch (err) {
        console.warn('Failed to load review items:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Интервальный Повтор' : 'Spaced Review' }
  ];

  return (
    <div className="review-queue-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="page-header-banner">
        <div className="header-icon-box">
          <RotateCcw size={28} className="text-accent" />
        </div>
        <div>
          <h1 className="page-heading">
            {languageMode === 'ru' ? 'Очередь Интервального Повторения' : 'Spaced Repetition Review Queue'}
          </h1>
          <p className="page-subheading">
            {languageMode === 'ru'
              ? 'Алгоритм интервального повторения формирует очередь концепций для предотвращения кривой забывания.'
              : 'Our spaced repetition algorithm queues weak concepts and confident mistake patterns to maximize retention for tier-1 interviews.'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="loading-state-placeholder">Loading review queue...</div>
      ) : reviews.length === 0 ? (
        <div className="empty-queue-card">
          <CheckCircle2 size={48} className="text-success" />
          <h3>{languageMode === 'ru' ? 'Очередь Повторения Пуста!' : 'Your Review Queue is Clear!'}</h3>
          <p>
            {languageMode === 'ru'
              ? 'Все изученные концепции находятся в хорошем состоянии памяти. Отличная работа!'
              : 'All exposed concepts are currently well-retained. Continue practicing new missions to expand your domain mastery.'}
          </p>
          <button
            type="button"
            className="btn-primary-action"
            onClick={() => navigate('/missions/protecting-bank-account-invariants')}
          >
            <Play size={16} />
            <span>Practice Active Mission</span>
          </button>
        </div>
      ) : (
        <div className="reviews-list-container">
          {reviews.map((rev) => (
            <div key={rev.id} className="review-item-card">
              <div className="card-left">
                <AlertTriangle size={20} className="text-warning" />
                <div>
                  <h4>Concept: {rev.conceptId}</h4>
                  <span className="due-tag">Reason: {rev.reviewReason}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-small-primary"
                onClick={() => navigate(`/missions/${rev.missionId}`)}
              >
                <Play size={14} /> Start Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
