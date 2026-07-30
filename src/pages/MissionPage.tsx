import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionById } from '../data/missions';
import { useAppStore, LevelMode } from '../store/useAppStore';
import { db, updateConceptMastery } from '../db/database';
import { ConfidenceLevel } from '../types/user';

// Stage Components
import { SequencePuzzle } from '../components/challenges/SequencePuzzle';
import { BugHuntChallenge } from '../components/challenges/BugHuntChallenge';
import { FixBuilderChallenge } from '../components/challenges/FixBuilderChallenge';
import { TradeOffChallenge } from '../components/challenges/TradeOffChallenge';
import { InterviewAnswerChallenge } from '../components/challenges/InterviewAnswerChallenge';
import { ConfidenceSelector } from '../components/challenges/ConfidenceSelector';
import { HintBox } from '../components/challenges/HintBox';
import { ReflectionPrompt } from '../components/challenges/ReflectionPrompt';
import { MissionResults } from '../components/challenges/MissionResults';

import { ArrowLeft, ArrowRight, Shield, Layers, HelpCircle, CheckCircle2 } from 'lucide-react';

export const MissionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { languageMode, confidence, setConfidence, levelMode, setLevelMode, addXP } = useAppStore();

  const mission = getMissionById(id || '');

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [hintsUsedThisStage, setHintsUsedThisStage] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);
  const [stagePassed, setStagePassed] = useState<boolean | null>(null);

  if (!mission) {
    return (
      <div className="error-page">
        <h2>Mission Not Found</h2>
        <button onClick={() => navigate('/learn')} className="btn-primary">
          Back to Learn Catalog
        </button>
      </div>
    );
  }

  const currentStage = mission.stages[currentStageIdx];
  const isFirstStage = currentStageIdx === 0;
  const isLastStage = currentStageIdx === mission.stages.length - 1;

  const handleStageComplete = async (isCorrect: boolean, xpReward: number = 20) => {
    setStagePassed(isCorrect);

    // Calculate XP after hint penalties
    const hintPenalty = hintsUsedThisStage * 6;
    const finalXp = Math.max(5, isCorrect ? xpReward - hintPenalty : 2);
    setTotalXpEarned((prev) => prev + finalXp);
    await addXP(finalXp);

    // Log attempt to Dexie IndexedDB
    await db.attempts.add({
      missionId: mission.id,
      stageId: currentStage.stageId,
      challengeType: currentStage.type,
      answer: { correct: isCorrect },
      correct: isCorrect,
      confidence,
      hintsUsed: hintsUsedThisStage,
      createdAt: new Date().toISOString()
    });

    // Update Concept Mastery
    await updateConceptMastery(mission.concepts, isCorrect, confidence, hintsUsedThisStage);
  };

  const handleNextStage = () => {
    setStagePassed(null);
    setHintsUsedThisStage(0);
    if (currentStageIdx < mission.stages.length - 1) {
      setCurrentStageIdx((prev) => prev + 1);
    }
  };

  const handlePrevStage = () => {
    setStagePassed(null);
    setHintsUsedThisStage(0);
    if (currentStageIdx > 0) {
      setCurrentStageIdx((prev) => prev - 1);
    }
  };

  const getText = (text?: { en: string; ru: string }) => {
    if (!text) return '';
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div className="mission-page-container">
      {/* Top Mission Control Bar */}
      <header className="mission-control-bar">
        <button onClick={() => navigate('/learn')} className="btn-exit-mission">
          <ArrowLeft size={16} /> Exit Mission
        </button>

        <div className="mission-title-center">
          <span className="mission-topic-tag">{getText(mission.topicTitle)}</span>
          <h2>{getText(mission.title)}</h2>
        </div>

        {/* Level Selector */}
        <div className="level-selector-pills">
          <button
            onClick={() => setLevelMode('guided')}
            className={`lvl-pill ${levelMode === 'guided' ? 'active-guided' : ''}`}
          >
            Lvl 1: Guided
          </button>
          <button
            onClick={() => setLevelMode('applied')}
            className={`lvl-pill ${levelMode === 'applied' ? 'active-applied' : ''}`}
          >
            Lvl 2: Applied
          </button>
          <button
            onClick={() => setLevelMode('interview')}
            className={`lvl-pill ${levelMode === 'interview' ? 'active-interview' : ''}`}
          >
            Lvl 3: Interview
          </button>
        </div>
      </header>

      {/* Progress Bar (10 Stages) */}
      <div className="stage-progress-header">
        <div className="stage-info">
          <span>Stage {currentStageIdx + 1} of {mission.stages.length}: <strong>{getText(currentStage.title)}</strong></span>
          <span>{Math.round(((currentStageIdx + 1) / mission.stages.length) * 100)}% Complete</span>
        </div>
        <div className="progress-track">
          {mission.stages.map((stg, idx) => (
            <div
              key={stg.stageId}
              onClick={() => setCurrentStageIdx(idx)}
              className={`track-segment ${idx === currentStageIdx ? 'active' : ''} ${idx < currentStageIdx ? 'completed' : ''}`}
              title={`Stage ${idx + 1}: ${stg.type}`}
            />
          ))}
        </div>
      </div>

      {/* Stage Body */}
      <div className="stage-body-card">
        {/* Render Stage based on Stage Type */}

        {/* 1. Scenario Introduction Stage */}
        {currentStage.type === 'scenario' && (
          <div className="stage-content scenario-stage">
            <div className="stage-badge">
              <Layers size={16} /> Production Scenario
            </div>
            <h3>{getText(currentStage.content.scenarioTitle)}</h3>
            <div className="story-box">
              <p>{getText(currentStage.content.scenarioStory)}</p>
            </div>
            <div className="context-box">
              <Shield size={18} />
              <p>{getText(currentStage.content.scenarioContext)}</p>
            </div>
          </div>
        )}

        {/* 2. Concept Primer Stage */}
        {currentStage.type === 'primer' && (
          <div className="stage-content primer-stage">
            <div className="stage-badge">
              <HelpCircle size={16} /> Concept Primer
            </div>
            <h3>{getText(currentStage.content.primerTitle)}</h3>
            <div className="primer-summary-box">
              <p>{getText(currentStage.content.primerSummary)}</p>
            </div>

            {currentStage.content.primerDiagramSteps && (
              <div className="primer-diagram">
                {currentStage.content.primerDiagramSteps.map((step, idx) => (
                  <div key={idx} className="diagram-step-box">
                    <span className="step-badge">#0{idx + 1}</span>
                    <strong>{getText(step.title)}</strong>
                    <p>{getText(step.desc)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Guided Puzzle Stage */}
        {currentStage.type === 'puzzle' && currentStage.content.puzzleItems && (
          <div>
            <ConfidenceSelector currentConfidence={confidence} onSelect={setConfidence} />
            <HintBox
              hints={currentStage.hints}
              languageMode={languageMode}
              onHintUsed={(cnt) => {
                setHintsUsedThisStage(cnt);
                setTotalHintsUsed((prev) => prev + 1);
              }}
            />
            <SequencePuzzle
              items={currentStage.content.puzzleItems}
              instruction={currentStage.content.puzzleInstruction || { en: '', ru: '' }}
              languageMode={languageMode}
              onComplete={(correct) => handleStageComplete(correct, 20)}
            />
          </div>
        )}

        {/* 4. Bug Hunt Stage */}
        {currentStage.type === 'bughunt' && currentStage.content.bugHuntLines && (
          <div>
            <ConfidenceSelector currentConfidence={confidence} onSelect={setConfidence} />
            <HintBox
              hints={currentStage.hints}
              languageMode={languageMode}
              onHintUsed={(cnt) => {
                setHintsUsedThisStage(cnt);
                setTotalHintsUsed((prev) => prev + 1);
              }}
            />
            <BugHuntChallenge
              instruction={currentStage.content.bugHuntInstruction || { en: '', ru: '' }}
              code={currentStage.content.bugHuntCode || ''}
              lines={currentStage.content.bugHuntLines}
              languageMode={languageMode}
              onComplete={(correct) => handleStageComplete(correct, 25)}
            />
          </div>
        )}

        {/* 5. Fix Builder Stage */}
        {currentStage.type === 'fixbuilder' && currentStage.content.fixOptions && (
          <div>
            <ConfidenceSelector currentConfidence={confidence} onSelect={setConfidence} />
            <HintBox
              hints={currentStage.hints}
              languageMode={languageMode}
              onHintUsed={(cnt) => {
                setHintsUsedThisStage(cnt);
                setTotalHintsUsed((prev) => prev + 1);
              }}
            />
            <FixBuilderChallenge
              instruction={currentStage.content.fixBuilderInstruction || { en: '', ru: '' }}
              options={currentStage.content.fixOptions}
              languageMode={languageMode}
              onComplete={(correct) => handleStageComplete(correct, 20)}
            />
          </div>
        )}

        {/* 6. Trade-Off Stage */}
        {currentStage.type === 'tradeoff' && currentStage.content.tradeOffOptions && (
          <div>
            <ConfidenceSelector currentConfidence={confidence} onSelect={setConfidence} />
            <TradeOffChallenge
              question={currentStage.content.tradeOffQuestion || { en: '', ru: '' }}
              options={currentStage.content.tradeOffOptions}
              languageMode={languageMode}
              onComplete={(correct) => handleStageComplete(correct, 25)}
            />
          </div>
        )}

        {/* 7. Interview Answer Stage */}
        {currentStage.type === 'interview' && currentStage.content.expectedConcepts && (
          <div>
            <InterviewAnswerChallenge
              question={currentStage.content.interviewQuestion || { en: '', ru: '' }}
              expectedConcepts={currentStage.content.expectedConcepts}
              languageMode={languageMode}
              onComplete={(assessment) => {
                const passed = assessment !== 'weak';
                const reward = assessment === 'strong' ? 30 : 20;
                handleStageComplete(passed, reward);
              }}
            />
          </div>
        )}

        {/* 8. Reference Model Answer Stage */}
        {currentStage.type === 'reference' && (
          <div className="stage-content reference-stage">
            <div className="stage-badge">
              <CheckCircle2 size={16} /> Senior Interviewer Reference Answer
            </div>

            <div className="ref-short-answer">
              <h4>Concise Interview-Ready Answer:</h4>
              <p>{getText(currentStage.content.referenceShortAnswer)}</p>
            </div>

            <div className="ref-detailed-answer">
              <h4>Detailed Senior Breakdown:</h4>
              <p>{getText(currentStage.content.referenceDetailedAnswer)}</p>
            </div>

            {currentStage.content.commonMistake && (
              <div className="ref-warning-box">
                <strong>Common Candidate Mistake:</strong>
                <p>{getText(currentStage.content.commonMistake)}</p>
              </div>
            )}

            {currentStage.content.followUpQuestion && (
              <div className="ref-followup-box">
                <h4>Interviewer Follow-Up Question:</h4>
                <p className="followup-q">{getText(currentStage.content.followUpQuestion)}</p>
                <strong>Model Follow-Up Answer:</strong>
                <p className="followup-a">{getText(currentStage.content.followUpModelAnswer)}</p>
              </div>
            )}

            {currentStage.content.modelJavaCode && (
              <div className="ref-code-box">
                <h4>Production Reference Code:</h4>
                <pre className="java-code-container">
                  <code>{currentStage.content.modelJavaCode}</code>
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 9. Reflection Stage */}
        {currentStage.type === 'reflection' && (
          <ReflectionPrompt
            missionId={mission.id}
            prompt={currentStage.content.reflectionPrompt || { en: '', ru: '' }}
            languageMode={languageMode}
            onComplete={() => handleStageComplete(true, 5)}
          />
        )}

        {/* 10. Mission Results Stage */}
        {currentStage.type === 'results' && (
          <MissionResults
            mission={mission}
            totalXpEarned={totalXpEarned}
            hintsUsed={totalHintsUsed}
          />
        )}
      </div>

      {/* Stage Footer Navigation */}
      <footer className="stage-footer-nav">
        <button onClick={handlePrevStage} disabled={isFirstStage} className="btn-secondary">
          <ArrowLeft size={16} /> Previous Stage
        </button>

        <span className="stage-step-indicator">
          Stage {currentStageIdx + 1} of {mission.stages.length}
        </span>

        {!isLastStage && (
          <button onClick={handleNextStage} className="btn-primary">
            Next Stage <ArrowRight size={16} />
          </button>
        )}
      </footer>
    </div>
  );
};
