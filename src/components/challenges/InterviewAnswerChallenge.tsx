import React, { useState, useEffect } from 'react';
import { ExpectedConcept, LocalizedText, LanguageMode } from '../../types/mission';
import { Timer, CheckCircle, AlertTriangle, XCircle, Send, Award } from 'lucide-react';

interface InterviewAnswerChallengeProps {
  question: LocalizedText;
  expectedConcepts: ExpectedConcept[];
  languageMode: LanguageMode;
  onComplete: (assessment: 'weak' | 'acceptable' | 'strong', conceptResults: Record<string, boolean>) => void;
}

export const InterviewAnswerChallenge: React.FC<InterviewAnswerChallengeProps> = ({
  question,
  expectedConcepts,
  languageMode,
  onComplete
}) => {
  const [answerText, setAnswerText] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selfAssessment, setSelfAssessment] = useState<'weak' | 'acceptable' | 'strong' | null>(null);

  // 90-second countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(90);
  };

  // Local concept keyword evaluator
  const evaluateConcepts = () => {
    const textLower = answerText.toLowerCase();
    const results: Record<string, { matched: boolean; hits: string[] }> = {};

    expectedConcepts.forEach((concept) => {
      const hits = concept.keywords.filter((kw) => textLower.includes(kw.toLowerCase()));
      results[concept.id] = {
        matched: hits.length > 0,
        hits
      };
    });

    return results;
  };

  const conceptEvaluation = isSubmitted ? evaluateConcepts() : {};

  const handleSubmitAnswer = () => {
    if (!answerText.trim()) return;
    setIsTimerRunning(false);
    setIsSubmitted(true);
  };

  const handleConfirmAssessment = (level: 'weak' | 'acceptable' | 'strong') => {
    setSelfAssessment(level);
    const booleanMap: Record<string, boolean> = {};
    Object.keys(conceptEvaluation).forEach((k) => {
      booleanMap[k] = conceptEvaluation[k].matched;
    });
    onComplete(level, booleanMap);
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <div className="interview-top-bar">
          <span className="badge badge-citi">Level 3: Senior Interview</span>
          <div className="timer-widget">
            <Timer size={18} className={timeLeft <= 15 ? 'timer-danger' : ''} />
            <span className="timer-text">{timeLeft}s</span>
            <button onClick={toggleTimer} className="btn-small-ghost" disabled={isSubmitted}>
              {isTimerRunning ? 'Pause' : 'Start Timer'}
            </button>
            <button onClick={resetTimer} className="btn-small-ghost" disabled={isSubmitted}>
              Reset
            </button>
          </div>
        </div>

        <h3 className="interview-prompt">{getText(question)}</h3>
      </div>

      {!isSubmitted ? (
        <div className="interview-input-box">
          <textarea
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
            placeholder="Type your structured senior engineering response here... Mention root cause, HashMap mechanics, and recommended fixes."
            rows={7}
            className="interview-textarea"
          />
          <div className="textarea-footer">
            <span className="char-count">{answerText.length} chars | ~{answerText.split(/\s+/).filter(Boolean).length} words</span>
            <button
              onClick={handleSubmitAnswer}
              disabled={!answerText.trim()}
              className="btn-primary"
            >
              Submit Answer for Concept Analysis <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="interview-results-box">
          <h4><Award size={20} /> Concept Match & Self-Assessment</h4>
          <p className="subtext">Our local concept engine scanned your response for key interview concepts:</p>

          <div className="concept-checklist">
            {expectedConcepts.map((concept) => {
              const evalRes = conceptEvaluation[concept.id];
              const isMatched = evalRes?.matched;

              return (
                <div key={concept.id} className={`concept-item ${isMatched ? 'matched' : 'missing'}`}>
                  <div className="concept-status">
                    {isMatched ? (
                      <CheckCircle size={18} className="icon-success" />
                    ) : (
                      <XCircle size={18} className="icon-error" />
                    )}
                    <span className="concept-label">{getText(concept.label)}</span>
                  </div>
                  {isMatched && evalRes.hits.length > 0 && (
                    <span className="matched-keywords">Detected: "{evalRes.hits.join('", "')}"</span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="self-assessment-section">
            <h5>Self-Assess Your Interview Answer:</h5>
            <div className="assessment-buttons">
              <button
                onClick={() => handleConfirmAssessment('weak')}
                className={`btn-assess btn-weak ${selfAssessment === 'weak' ? 'active' : ''}`}
              >
                <AlertTriangle size={18} /> Weak (Missed core concepts)
              </button>
              <button
                onClick={() => handleConfirmAssessment('acceptable')}
                className={`btn-assess btn-acceptable ${selfAssessment === 'acceptable' ? 'active' : ''}`}
              >
                <CheckCircle size={18} /> Acceptable (Covered main points)
              </button>
              <button
                onClick={() => handleConfirmAssessment('strong')}
                className={`btn-assess btn-strong ${selfAssessment === 'strong' ? 'active' : ''}`}
              >
                <Award size={18} /> Strong (Senior pitch quality)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
