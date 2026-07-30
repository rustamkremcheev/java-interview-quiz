import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CURRICULUM } from '../data/missions';
import { useAppStore } from '../store/useAppStore';
import { Hash, Cpu, Server, Layers, Activity, Database, Globe, Play, Lock, LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Hash: Hash,
  Cpu: Cpu,
  Server: Server,
  Layers: Layers,
  Activity: Activity,
  Database: Database,
  Globe: Globe
};

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { languageMode } = useAppStore();

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    if (languageMode === 'bilingual') return `${en} / ${ru}`;
    return en;
  };

  return (
    <div className="learn-page-container">
      <div className="page-header">
        <h1>Curriculum Paths & Missions</h1>
        <p className="subtext">
          Targeted production scenario missions for Senior Java Engineers preparing for tier-1 tech & banking interviews.
        </p>
      </div>

      <div className="topic-grid">
        {CURRICULUM.map((topic) => {
          const IconComp = ICON_MAP[topic.iconName] || Hash;

          return (
            <div key={topic.id} className={`topic-card ${!topic.isAvailable ? 'disabled-topic' : ''}`}>
              <div className="topic-card-header">
                <div className="topic-icon-wrap">
                  <IconComp size={24} />
                </div>
                {!topic.isAvailable && <span className="badge badge-coming-soon"><Lock size={12} /> Coming Soon</span>}
                {topic.isAvailable && <span className="badge badge-citi">MVP Active</span>}
              </div>

              <h3>{getText(topic.title.en, topic.title.ru)}</h3>
              <p className="topic-desc">{getText(topic.description.en, topic.description.ru)}</p>

              {topic.isAvailable && (
                <div className="topic-missions-list">
                  <h4>Available Missions:</h4>
                  {topic.missions.map((m) => (
                    <div
                      key={m.id}
                      className="mission-row-btn"
                      onClick={() => navigate(`/mission/${m.id}`)}
                    >
                      <div>
                        <strong>{getText(m.title.en, m.title.ru)}</strong>
                        <div className="mission-est">{m.estimatedMinutes} mins | 10 Stages</div>
                      </div>
                      <button className="btn-small-primary">
                        <Play size={14} /> Start
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
