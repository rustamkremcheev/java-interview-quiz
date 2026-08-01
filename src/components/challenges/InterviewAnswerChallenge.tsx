import React, { useState } from 'react';
import { InterviewAnswerChallenge } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { ConfidenceSelector } from '../workspace/ConfidenceSelector';
import { MessageSquare, Clock, CheckCircle2, AlertTriangle, ArrowRight, Lock } from 'lucide-react';

interface InterviewAnswerChallengeProps {
  challenge: InterviewAnswerChallenge;
  onAttemptSubmit: (responseText: string, matchedConceptIds: string[]) => void;
  isSubmitted?: boolean;
}

export const InterviewAnswerChallengeView: React.FC<InterviewAnswerChallengeProps> = ({
  challenge,
  onAttemptSubmit,
  isSubmitted = false
}) => {
  const { languageMode, timerEnabled } = useAppStore();
  const [responseText, setResponseText] = useState('');
  const [confidence, setConfidence] = useState<'CONFIDENT' | 'UNSURE' | 'GUESSING'>('UNSURE');
  const [timerSeconds, setTimerSeconds] = useState(0);

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  const payload = challenge.payload;
  const wordCount = responseText.trim().split(/\s+/).filter(Boolean).length;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isSubmitted) return;
    setResponseText(e.target.value);
  };

  const handleSubmit = () => {
    if (!responseText.trim() || isSubmitted) return;

    // Perform deterministic concept matching
    const matchedConceptIds: string[] = [];
    const lowerText = responseText.toLowerCase();

    payload.expectedConcepts.forEach((ec) => {
      const hasKeyword = ec.keywords.some((kw) => lowerText.includes(kw.toLowerCase()));
      if (hasKeyword) {
        matchedConceptIds.push(ec.id);
      }
    });

    onAttemptSubmit(responseText, matchedConceptIds);
  };

  return (
    <div className="interview-answer-workspace">
      <div className="challenge-prompt-header">
        <div className="prompt-title-row">
          <MessageSquare size={20} className="text-accent" />
          <h3>{getText(challenge.title.en, challenge.title.ru)}</h3>
        </div>
        <p className="interview-question-text">{getText(challenge.prompt.en, challenge.prompt.ru)}</p>
      </div>

      {/* Answer Input Area */}
      <div className="response-textarea-box">
        <div className="textarea-toolbar">
          <span className="eval-method-tag">Evaluation Method: Deterministic Concept Matching</span>
          <div className="metrics-group">
            <span className="word-count-tag">{wordCount} words</span>
            {timerEnabled && (
              <span className="timer-tag">
                <Clock size={13} /> {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </span>
            )}
          </div>
        </div>

        <textarea
          className="interview-response-textarea"
          rows={7}
          disabled={isSubmitted}
          value={responseText}
          onChange={handleTextChange}
          placeholder="Formulate your structured answer here (Elevator Pitch + Mechanics + Trade-offs)..."
        />
      </div>

      {!isSubmitted ? (
        <>
          <ConfidenceSelector value={confidence} onChange={setConfidence} disabled={isSubmitted} />

          <div className="answer-lock-notice">
            <Lock size={14} className="text-secondary" />
            <span>Answer Locking Active: Model speech scripts and trade-offs remain hidden until attempt submission.</span>
          </div>

          <div className="submit-action-footer">
            <button
              type="button"
              className="btn-primary-action large"
              disabled={!responseText.trim()}
              onClick={handleSubmit}
            >
              Submit Interview Answer for Evaluation
            </button>
          </div>
        </>
      ) : (
        /* Post-Submission Evaluation & Model Speech Script Display */
        <div className="post-submission-evaluation-view">
          <div className="eval-heading-row">
            <CheckCircle2 size={20} className="text-success" />
            <h4>Evaluation & Model Speech Delivery Script</h4>
          </div>

          {/* Concept Coverage Analysis */}
          <div className="concept-coverage-analysis">
            <h5>Concept Coverage Analysis:</h5>
            <div className="concepts-evaluation-list">
              {payload.expectedConcepts.map((ec) => {
                const lowerText = responseText.toLowerCase();
                const matched = ec.keywords.some((kw) => lowerText.includes(kw.toLowerCase()));

                return (
                  <div key={ec.id} className={`eval-concept-row ${matched ? 'matched' : 'missing'}`}>
                    {matched ? (
                      <CheckCircle2 size={16} className="text-success" />
                    ) : (
                      <AlertTriangle size={16} className="text-warning" />
                    )}
                    <span className="concept-label">{getText(ec.label.en, ec.label.ru)}</span>
                    <span className="concept-status-tag">{matched ? 'MATCHED IN ANSWER' : 'MISSING FROM ANSWER'}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3-Tier Speech Script Model */}
          <div className="speech-script-section">
            <div className="script-card">
              <h5>1. Elevator Pitch (30 seconds)</h5>
              <p>{getText(payload.modelAnswer30s.en, payload.modelAnswer30s.ru)}</p>
            </div>

            <div className="script-card">
              <h5>2. Deep Technical Mechanics (60 seconds)</h5>
              <p>{getText(payload.modelAnswerDetailed.en, payload.modelAnswerDetailed.ru)}</p>
            </div>

            <div className="script-card">
              <h5>3. Production Trade-offs (30 seconds)</h5>
              <p>{getText(payload.modelAnswerTradeOffs.en, payload.modelAnswerTradeOffs.ru)}</p>
            </div>
          </div>

          {/* Follow-up Question Scenario */}
          <div className="followup-question-box">
            <h5>Senior Interviewer Follow-Up Scenario:</h5>
            <p className="followup-text">{getText(payload.followUpQuestionText.en, payload.followUpQuestionText.ru)}</p>
            <div className="followup-model-answer">
              <strong>Model Follow-up Answer:</strong>
              <p>{getText(payload.followUpModelAnswerText.en, payload.followUpModelAnswerText.ru)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
