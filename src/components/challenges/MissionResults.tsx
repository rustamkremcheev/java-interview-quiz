import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mission } from '../../types/mission';
import { Trophy, Award, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MissionResultsProps {
  mission: Mission;
  totalXpEarned: number;
  hintsUsed: number;
}

export const MissionResults: React.FC<MissionResultsProps> = ({
  mission,
  totalXpEarned,
  hintsUsed
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Fallback if confetti fails
    }
  }, []);

  return (
    <div className="challenge-container results-card">
      <div className="results-header">
        <div className="trophy-badge">
          <Trophy size={40} className="trophy-icon" />
        </div>
        <h2>Mission Accomplished!</h2>
        <p className="subtitle">{mission.title.en}</p>
      </div>

      <div className="results-grid">
        <div className="stat-card">
          <Zap size={24} className="stat-icon xp" />
          <div className="stat-val">+{totalXpEarned} XP</div>
          <div className="stat-lbl">XP Earned</div>
        </div>

        <div className="stat-card">
          <Award size={24} className="stat-icon mastery" />
          <div className="stat-val">100%</div>
          <div className="stat-lbl">Stage Mastery</div>
        </div>

        <div className="stat-card">
          <CheckCircle2 size={24} className="stat-icon hints" />
          <div className="stat-val">{hintsUsed}</div>
          <div className="stat-lbl">Hints Used</div>
        </div>
      </div>

      <div className="concepts-mastered-box">
        <h4>Concepts Practiced:</h4>
        <div className="concept-tags">
          {mission.concepts.map((c) => (
            <span key={c} className="concept-chip">
              #{c}
            </span>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button onClick={() => navigate('/')} className="btn-secondary">
          Return to Dashboard
        </button>
        <button onClick={() => navigate('/learn')} className="btn-primary">
          Continue Learning Path <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
