import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, updateConceptMastery } from '../db/database';
import { useAppStore } from '../store/useAppStore';
import { RotateCcw, CheckCircle2, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { addXP } = useAppStore();
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Live query due reviews where nextReviewTime is past
  const dueConcepts = useLiveQuery(async () => {
    const now = new Date().toISOString();
    return db.mastery.where('nextReviewTime').below(now).toArray();
  }, []) || [];

  const currentConcept = dueConcepts[activeReviewIdx];

  const handleReviewAnswer = async (correct: boolean) => {
    if (!currentConcept) return;

    setIsCorrect(correct);
    setIsAnswered(true);

    // Update Concept Mastery algorithm (calculates new review timestamp)
    await updateConceptMastery([currentConcept.conceptId], correct, 'confident', 0);
    await addXP(correct ? 15 : 5);
  };

  const handleNextReview = () => {
    setIsAnswered(false);
    setIsCorrect(null);
    if (activeReviewIdx < dueConcepts.length - 1) {
      setActiveReviewIdx((prev) => prev + 1);
    }
  };

  return (
    <div className="review-page-container">
      <div className="page-header">
        <h1><RotateCcw size={28} /> Spaced Repetition Review Queue</h1>
        <p className="subtext">
          Local spaced repetition queue. Practicing concepts right before memory decay locks knowledge in long-term memory.
        </p>
      </div>

      {dueConcepts.length === 0 ? (
        <div className="empty-review-box">
          <CheckCircle2 size={48} className="icon-success" />
          <h2>Review Queue All Clear!</h2>
          <p>No concept reviews are due right now. You are up to date on your spaced repetition queue.</p>
          <button onClick={() => navigate('/learn')} className="btn-primary">
            Explore Active Missions <ArrowRight size={16} />
          </button>
        </div>
      ) : (
        <div className="review-active-card">
          <div className="review-progress-bar">
            <span>Review {activeReviewIdx + 1} of {dueConcepts.length}</span>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${((activeReviewIdx + 1) / dueConcepts.length) * 100}%` }}
              />
            </div>
          </div>

          {currentConcept && (
            <div className="review-prompt-box">
              <div className="concept-badge">Concept: #{currentConcept.conceptId}</div>
              <h3>Memory Retrieval Challenge</h3>
              <p className="question-text">
                Explain or verify: Why does mutating a key field in a HashMap cause <code>get(key)</code> to return <code>null</code> even if the entry remains in the table array?
              </p>

              {!isAnswered ? (
                <div className="review-actions">
                  <button onClick={() => handleReviewAnswer(true)} className="btn-success">
                    <ShieldCheck size={18} /> I Remembered Correctly (+15 XP)
                  </button>
                  <button onClick={() => handleReviewAnswer(false)} className="btn-error">
                    <Zap size={18} /> I Was Unsure / Failed (+5 XP)
                  </button>
                </div>
              ) : (
                <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
                  <h4>{isCorrect ? 'Mastery Score Boosted!' : 'Scheduled for 10-Min Re-Test'}</h4>
                  <p>
                    {isCorrect
                      ? 'Great job! Your mastery score increased and the next review interval has been extended to 4-7 days.'
                      : 'No worries. This concept has been flagged for quick re-testing in 10 minutes.'}
                  </p>

                  <button onClick={handleNextReview} className="btn-primary">
                    Next Review Card <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
