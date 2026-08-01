import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMissionBySlug } from '../data';
import { OOP_DATA_PACKAGE } from '../data/modules/oop';
import { useAppStore } from '../store/useAppStore';
import { useMissionStore } from '../store/useMissionStore';
import {
  recordUserAttempt, updateConceptMastery, recordMistakeOccurrence,
  saveMissionProgress, saveReflectionNote
} from '../db/database';
import { StageStepper } from '../components/workspace/StageStepper';
import { KnowledgeSidebar } from '../components/workspace/KnowledgeSidebar';
import { SourceContext } from '../components/workspace/SourceContext';
import { CodeViewer } from '../components/workspace/CodeViewer';
import { FeedbackPanel } from '../components/workspace/FeedbackPanel';
import { GuidedPuzzle } from '../components/challenges/GuidedPuzzle';
import { BugHuntChallengeView } from '../components/challenges/BugHuntChallenge';
import { InterviewAnswerChallengeView } from '../components/challenges/InterviewAnswerChallenge';
import { EvaluationResult, LocalizedText } from '../types/domain';
import { ArrowLeft, BookOpen, Clock, Play, HelpCircle, Trophy, RotateCcw, CheckCircle2 } from 'lucide-react';

export const MissionPage: React.FC = () => {
  const { missionSlug, id } = useParams<{ missionSlug?: string; id?: string }>();
  const navigate = useNavigate();
  const slug = missionSlug || id || 'protecting-bank-account-invariants';

  const mission = getMissionBySlug(slug) || OOP_DATA_PACKAGE.missions[0];
  const { stages } = OOP_DATA_PACKAGE;

  const { languageMode, addXP, toggleSidebar } = useAppStore();
  const {
    currentStageId, setCurrentStageId,
    hypothesisText, setHypothesisText,
    confidence,
    hintsRevealedIds, revealHint,
    reflectionText, setReflectionText
  } = useMissionStore();

  const [completedStageIds, setCompletedStageIds] = useState<string[]>([]);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);

  // Theory Checkpoints Local State
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<string, string>>({});
  const [checkpointFeedback, setCheckpointFeedback] = useState<Record<string, { isCorrect: boolean; text: LocalizedText }>>({});

  useEffect(() => {
    if (!currentStageId && stages.length > 0) {
      setCurrentStageId(stages[0].id);
    }
  }, [currentStageId, setCurrentStageId, stages]);

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  const currentStageIndex = stages.findIndex((s) => s.id === currentStageId);
  const currentStage = stages[currentStageIndex] || stages[0];

  const handleNextStage = () => {
    if (!completedStageIds.includes(currentStage.id)) {
      setCompletedStageIds([...completedStageIds, currentStage.id]);
    }
    setEvaluation(null);
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageId(stages[currentStageIndex + 1].id);
    }
  };

  const handlePrevStage = () => {
    setEvaluation(null);
    if (currentStageIndex > 0) {
      setCurrentStageId(stages[currentStageIndex - 1].id);
    }
  };

  // Stage 3 Hypothesis Submission
  const handleHypothesisSubmit = async () => {
    if (!hypothesisText.trim()) return;

    const evalRes: EvaluationResult = {
      correctness: "CORRECT",
      score: 1.0,
      feedback: {
        en: "Great initial diagnostic hypothesis! Public balance exposure and missing negative checks corrupt class invariants.",
        ru: "Отличная первичная гипотеза! Открытый доступ к балансу и отсутствие проверок ломают инварианты."
      },
      matchedConceptIds: ["cpt_encapsulation"],
      missingConceptIds: [],
      detectedMistakePatternIds: []
    };
    setEvaluation(evalRes);
    await addXP(25);
  };

  // Stage 5 Theory Checkpoint Selection
  const handleCheckpointSelect = (checkpointId: string, optionId: string) => {
    const chk = OOP_DATA_PACKAGE.theoryCheckpoints.find((c) => c.id === checkpointId);
    if (!chk) return;
    const opt = chk.options.find((o) => o.id === optionId);
    if (!opt) return;

    setCheckpointAnswers({ ...checkpointAnswers, [checkpointId]: optionId });
    setCheckpointFeedback({
      ...checkpointFeedback,
      [checkpointId]: {
        isCorrect: opt.isCorrect,
        text: opt.feedback
      }
    });

    if (!opt.isCorrect && opt.misconceptionId) {
      recordMistakeOccurrence(opt.misconceptionId, confidence === 'CONFIDENT');
    }
  };

  // Stage 7 Guided FixBuilder Submission
  const handleGuidedSubmit = async (selectedOptionIds: string[]) => {
    const correctOptions = OOP_DATA_PACKAGE.challenges[0].type === 'FIX_BUILDER'
      ? (OOP_DATA_PACKAGE.challenges[0] as any).payload.options.filter((o: any) => o.isCorrect).map((o: any) => o.id)
      : [];

    const isFullyCorrect = correctOptions.every((id: string) => selectedOptionIds.includes(id)) &&
      selectedOptionIds.length === correctOptions.length;

    const evalRes: EvaluationResult = {
      correctness: isFullyCorrect ? "CORRECT" : selectedOptionIds.length > 0 ? "PARTIALLY_CORRECT" : "INCORRECT",
      score: isFullyCorrect ? 1.0 : 0.5,
      feedback: isFullyCorrect
        ? {
            en: "Flawless solution! Private fields, constructor guards, and domain methods deposit()/withdraw() enforce state encapsulation.",
            ru: "Идеальное решение! Приватные поля, проверки в конструкторе и доменные методы deposit()/withdraw() защищают состояние."
          }
        : {
            en: "Partial match. Ensure you include private long cents fields, constructor validation, and validated deposit/withdraw methods.",
            ru: "Частично верно. Убедитесь, что выбрали приватные поля long центов, проверки в конструкторе и методы deposit/withdraw."
          },
      matchedConceptIds: ["cpt_encapsulation", "cpt_invariants"],
      missingConceptIds: [],
      detectedMistakePatternIds: isFullyCorrect ? [] : ["err_setter_invariant_bypass"]
    };

    setEvaluation(evalRes);
    await updateConceptMastery(["cpt_encapsulation", "cpt_invariants"], evalRes.correctness, confidence, hintsRevealedIds.length);
    await recordUserAttempt({
      userId: 'local-user',
      challengeId: OOP_DATA_PACKAGE.challenges[0].id,
      missionId: mission.id,
      stageId: currentStage.id,
      challengeType: OOP_DATA_PACKAGE.challenges[0].type,
      answerPayloadJson: JSON.stringify(selectedOptionIds),
      submittedAt: new Date().toISOString(),
      durationMs: 120000,
      confidence,
      hintsUsedCount: hintsRevealedIds.length,
      hintsUsedIds: hintsRevealedIds,
      evaluation: evalRes,
      xpAwarded: isFullyCorrect ? 100 : 50
    });

    if (isFullyCorrect) {
      await addXP(100);
    }
  };

  // Stage 9 Interview Answer Submission
  const handleInterviewSubmit = async (responseText: string, matchedConceptIds: string[]) => {
    const isGood = matchedConceptIds.length >= 2;

    const evalRes: EvaluationResult = {
      correctness: isGood ? "CORRECT" : "PARTIALLY_CORRECT",
      score: isGood ? 1.0 : 0.6,
      feedback: isGood
        ? {
            en: "Strong verbal answer! You correctly emphasized state invariant protection and replacing setters with explicit domain behaviors.",
            ru: "Сильный устный ответ! Вы верно подчеркнули защиту инвариантов состояния и замену сеттеров на доменные методы."
          }
        : {
            en: "Answer recorded. Review the model 3-tier speech script below to refine your elevator pitch and trade-offs delivery.",
            ru: "Ответ записан. Изучите модель устного ответа ниже для улучшения Elevator Pitch и аргументации компромиссов."
          },
      matchedConceptIds,
      missingConceptIds: [],
      detectedMistakePatternIds: []
    };

    setEvaluation(evalRes);
    await updateConceptMastery(["cpt_encapsulation", "cpt_access_modifiers"], evalRes.correctness, confidence, 0);
    await addXP(100);
  };

  // Stage 10 Bug Hunt Submission
  const handleBugHuntSubmit = async (selectedLines: number[]) => {
    const isCorrect = selectedLines.includes(10) || selectedLines.includes(15);

    const evalRes: EvaluationResult = {
      correctness: isCorrect ? "CORRECT" : "INCORRECT",
      score: isCorrect ? 1.0 : 0.0,
      feedback: isCorrect
        ? {
            en: "Vulnerability identified! Lines 10 and 15 leak mutable Date references without defensive copying.",
            ru: "Уязвимость найдена! Строки 10 и 15 приводят к утечке мутабельной ссылки Date без защитного копирования."
          }
        : {
            en: "Incorrect line selected. Inspect where internal java.util.Date references are directly assigned or returned.",
            ru: "Неверно выбранная строка. Посмотрите, где ссылки на java.util.Date напрямую присваиваются или возвращаются."
          },
      matchedConceptIds: ["cpt_defensive_copying"],
      missingConceptIds: [],
      detectedMistakePatternIds: isCorrect ? [] : ["err_mutable_reference_leak"]
    };

    setEvaluation(evalRes);
    await updateConceptMastery(["cpt_defensive_copying"], evalRes.correctness, confidence, hintsRevealedIds.length);
    if (!isCorrect) {
      await recordMistakeOccurrence("err_mutable_reference_leak", confidence === 'CONFIDENT');
    } else {
      await addXP(100);
    }
  };

  // Stage 13 Reflection Submission
  const handleReflectionSubmit = async () => {
    if (!reflectionText.trim()) return;
    await saveReflectionNote(mission.id, reflectionText);
    await saveMissionProgress({
      userId: 'local-user',
      missionId: mission.id,
      state: "MASTERED",
      currentStageId: currentStage.id,
      completedStageIds: stages.map((s) => s.id),
      startedAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      completionPercentage: 100,
      bestScore: 100,
      totalAttempts: 3
    });
    await addXP(50);
    navigate('/progress');
  };

  return (
    <div className="mission-workspace-page">
      {/* Workspace Navigation Header */}
      <div className="mission-workspace-header">
        <div className="header-left-group">
          <button type="button" className="btn-exit-mission" onClick={() => navigate('/modules/object-oriented-programming/topics/encapsulation')}>
            <ArrowLeft size={16} /> Exit Mission
          </button>
          <div className="mission-title-area">
            <h2>{getText(mission.title.en, mission.title.ru)}</h2>
            <span className="topic-badge">Topic 05: Encapsulation</span>
          </div>
        </div>

        <div className="header-right-group">
          <div className="xp-reward-tag">
            <Trophy size={14} className="text-warning" />
            <span>+250 XP</span>
          </div>
          <button type="button" className="btn-sidebar-trigger" onClick={() => toggleSidebar()}>
            <BookOpen size={16} />
            <span>Knowledge Sidebar</span>
          </button>
        </div>
      </div>

      {/* Stage Stepper Navigation Bar */}
      <StageStepper
        stages={stages}
        currentStageId={currentStage.id}
        completedStageIds={completedStageIds}
        onSelectStage={(stgId) => setCurrentStageId(stgId)}
      />

      {/* Main Workspace Active Stage Stage View */}
      <div className="mission-stage-viewport">
        {/* STAGE 1: MISSION INTRODUCTION */}
        {currentStage.type === 'MISSION_INTRODUCTION' && (
          <div className="stage-card intro-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 01</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="scenario-story">{getText(mission.scenarioIntroduction.en, mission.scenarioIntroduction.ru)}</p>

            <CodeViewer artifact={OOP_DATA_PACKAGE.codeArtifacts[0]} />

            <SourceContext
              classification="BOOK_DERIVED_EXERCISE"
              sources={OOP_DATA_PACKAGE.sources}
              sourceReferences={OOP_DATA_PACKAGE.sourceReferences}
            />

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Real Engineering Problem</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: REAL ENGINEERING PROBLEM */}
        {currentStage.type === 'REAL_ENGINEERING_PROBLEM' && (
          <div className="stage-card problem-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 02</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="problem-text">{getText(mission.engineeringProblem.en, mission.engineeringProblem.ru)}</p>

            <CodeViewer artifact={OOP_DATA_PACKAGE.codeArtifacts[0]} />

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Think Yourself Diagnostic</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: THINK YOURSELF */}
        {currentStage.type === 'THINK_YOURSELF' && (
          <div className="stage-card think-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 03</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>Formulate your initial diagnostic hypothesis: Why is public balance mutation dangerous, and which class invariant is unprotected?</p>

            <textarea
              className="hypothesis-textarea"
              rows={4}
              value={hypothesisText}
              onChange={(e) => setHypothesisText(e.target.value)}
              placeholder="Write your diagnostic hypothesis here..."
            />

            <div className="think-actions">
              <button type="button" className="btn-secondary-action" onClick={handleNextStage}>
                <HelpCircle size={16} /> I'm not sure (Skip to Theory)
              </button>
              <button
                type="button"
                className="btn-primary-action"
                disabled={!hypothesisText.trim()}
                onClick={handleHypothesisSubmit}
              >
                Submit Diagnostic Hypothesis
              </button>
            </div>

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Theory Stage"
              />
            )}
          </div>
        )}

        {/* STAGE 4: NEED HELP */}
        {currentStage.type === 'NEED_HELP' && (
          <div className="stage-card help-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 04</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>This is a no-penalty bridge to transition into deep core theory and visual state mechanics.</p>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Open Core Theory & Checkpoints</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5: THEORY */}
        {currentStage.type === 'THEORY' && (
          <div className="stage-card theory-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 05</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            {/* Theory Sections */}
            <div className="theory-sections-container">
              {OOP_DATA_PACKAGE.theoryArticles[0].sections.map((sec) => (
                <div key={sec.id} className="theory-section-block">
                  <h3>{getText(sec.title.en, sec.title.ru)}</h3>
                  {sec.blocks.map((b) => (
                    <p key={b.id} className="theory-p">{getText((b as any).content.en, (b as any).content.ru)}</p>
                  ))}
                </div>
              ))}
            </div>

            {/* 3 Theory Checkpoints */}
            <div className="theory-checkpoints-container">
              <h3>Theory Checkpoints (3 Learning Checks)</h3>
              {OOP_DATA_PACKAGE.theoryCheckpoints.map((chk, idx) => {
                const feedback = checkpointFeedback[chk.id];

                return (
                  <div key={chk.id} className="checkpoint-card">
                    <h4>Checkpoint {idx + 1}: {getText(chk.question.en, chk.question.ru)}</h4>
                    <div className="options-stack">
                      {chk.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className={`checkpoint-option-btn ${checkpointAnswers[chk.id] === opt.id ? 'selected' : ''}`}
                          onClick={() => handleCheckpointSelect(chk.id, opt.id)}
                        >
                          <span>{getText(opt.text.en, opt.text.ru)}</span>
                        </button>
                      ))}
                    </div>

                    {feedback && (
                      <div className={`checkpoint-feedback ${feedback.isCorrect ? 'correct' : 'incorrect'}`}>
                        <span>{getText(feedback.text.en, feedback.text.ru)}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Interactive Visualization</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 6: VISUALIZATION */}
        {currentStage.type === 'VISUALIZATION' && (
          <div className="stage-card visual-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 06</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <div className="visualization-comparison-box">
              <div className="visual-column broken">
                <h4>🔴 Unprotected Direct Field Mutation</h4>
                <div className="memory-flow-box">
                  <code>account.balance = -500.0;</code>
                  <p>Bypasses pre-condition guards ──► Corrupts Heap Memory State!</p>
                </div>
              </div>

              <div className="visual-column protected">
                <h4>🟢 Encapsulated Behavior Execution</h4>
                <div className="memory-flow-box">
                  <code>account.withdraw(50000);</code>
                  <p>Validates amount & funds ──► Throws IllegalStateException!</p>
                </div>
              </div>
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Guided FixBuilder Practice</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 7: INTERACTIVE PRACTICE */}
        {currentStage.type === 'INTERACTIVE_PRACTICE' && (
          <div className="stage-card practice-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 07</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <GuidedPuzzle
              challenge={OOP_DATA_PACKAGE.challenges[0] as any}
              onAttemptSubmit={handleGuidedSubmit}
            />

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Senior Interview Question"
              />
            )}
          </div>
        )}

        {/* STAGE 8: INTERVIEW QUESTION */}
        {currentStage.type === 'INTERVIEW_QUESTION' && (
          <div className="stage-card interview-q-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 08</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p className="scenario-statement">
              How do you explain the fundamental difference between encapsulation and data hiding to a developer who claims 'making fields private and adding getters/setters is encapsulation'?
            </p>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Verbal Answer Formulation</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 9: INTERVIEW ANSWER */}
        {currentStage.type === 'INTERVIEW_ANSWER' && (
          <div className="stage-card interview-a-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 09</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <InterviewAnswerChallengeView
              challenge={OOP_DATA_PACKAGE.challenges[2] as any}
              onAttemptSubmit={handleInterviewSubmit}
              isSubmitted={!!evaluation}
            />

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Applied Bug Hunt"
              />
            )}
          </div>
        )}

        {/* STAGE 10: DEBUG COUNTER-EXAMPLE */}
        {currentStage.type === 'DEBUG_COUNTER_EXAMPLE' && (
          <div className="stage-card debug-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 10</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <BugHuntChallengeView
              challenge={OOP_DATA_PACKAGE.challenges[1] as any}
              onAttemptSubmit={handleBugHuntSubmit}
            />

            {evaluation && (
              <FeedbackPanel
                evaluation={evaluation}
                onNextAction={handleNextStage}
                nextActionLabel="Continue to Related Topics"
              />
            )}
          </div>
        )}

        {/* STAGE 11: RELATED TOPICS */}
        {currentStage.type === 'RELATED_TOPICS' && (
          <div className="stage-card related-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 11</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>Explore lateral knowledge connections to reinforce concepts across the OOP module graph.</p>

            <div className="related-nodes-grid">
              <div className="node-card" onClick={() => navigate('/modules/object-oriented-programming/topics/access-modifiers')}>
                <h4>Topic 06: Access Modifiers</h4>
                <p>Private, protected, package-private visibility boundaries.</p>
              </div>
              <div className="node-card" onClick={() => navigate('/modules/object-oriented-programming/topics/coupling-and-cohesion')}>
                <h4>Topic 18: Coupling and Cohesion</h4>
                <p>High cohesion and low coupling in enterprise aggregates.</p>
              </div>
              <div className="node-card" onClick={() => navigate('/modules/object-oriented-programming/topics/immutability-defensive-copy')}>
                <h4>Topic 22: Immutability & Defensive Copying</h4>
                <p>Building bulletproof immutable domain entities & Records.</p>
              </div>
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>View Mission Results Summary</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 12: MISSION RESULTS */}
        {currentStage.type === 'MISSION_RESULTS' && (
          <div className="stage-card results-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 12</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>

            <div className="results-summary-card">
              <Trophy size={48} className="text-warning hero-trophy" />
              <h3>Mission Completed!</h3>
              <p>You have successfully protected state invariants for BankAccount.</p>

              <div className="stats-metric-grid">
                <div className="metric-box">
                  <span className="metric-num">+250</span>
                  <span className="metric-lbl">XP Earned</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">100%</span>
                  <span className="metric-lbl">Accuracy</span>
                </div>
                <div className="metric-box">
                  <span className="metric-num">25m</span>
                  <span className="metric-lbl">Time Spent</span>
                </div>
              </div>
            </div>

            <div className="stage-actions">
              <button type="button" className="btn-primary-action" onClick={handleNextStage}>
                <span>Proceed to Engineering Reflection</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 13: REFLECTION */}
        {currentStage.type === 'REFLECTION' && (
          <div className="stage-card reflection-stage">
            <div className="stage-header">
              <span className="stage-num-badge">STAGE 13</span>
              <h2>{getText(currentStage.title.en, currentStage.title.ru)}</h2>
            </div>
            <p>Write a 1-sentence engineering reflection on what production rule you will apply in your daily code:</p>

            <textarea
              className="reflection-textarea"
              rows={4}
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              placeholder="e.g. I will replace arbitrary setters with validated domain methods and apply defensive copying to Date objects..."
            />

            <div className="stage-actions">
              <button
                type="button"
                className="btn-primary-action large"
                disabled={!reflectionText.trim()}
                onClick={handleReflectionSubmit}
              >
                Save Reflection & View Progress Matrix
              </button>
            </div>
          </div>
        )}
      </div>

      <KnowledgeSidebar />
    </div>
  );
};
