import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Play, RotateCcw, BarChart3, ShieldCheck, Flame, Zap, ArrowRight, Award } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { languageMode, xp, level, streak } = useAppStore();

  const getLabel = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  return (
    <div className="dashboard-control-page">
      {/* Welcome Banner */}
      <div className="dashboard-welcome-hero">
        <div className="hero-text-content">
          <div className="welcome-pill">
            <ShieldCheck size={16} className="text-accent" />
            <span>SENIOR JAVA BACKEND ENGINE</span>
          </div>
          <h1>{getLabel('Targeted Senior Mentorship', 'Целевой Старший Менторшип')}</h1>
          <p>
            {getLabel(
              'Master deep Java Core, JVM Internals, Encapsulation Invariants, Concurrency, and System Design for Tier-1 Banking & Tech interviews.',
              'Освойте глубокий Java Core, устройство JVM, инварианты инкапсуляции, многопоточность и системный дизайн для Tier-1 компаний.'
            )}
          </p>

          <div className="user-stats-bar">
            <div className="user-stat-card">
              <Flame size={20} className="text-warning" />
              <div>
                <strong>{streak} {getLabel('Days', 'Дней')}</strong>
                <span>{getLabel('Current Streak', 'Текущая серия')}</span>
              </div>
            </div>

            <div className="user-stat-card">
              <Zap size={20} className="text-accent" />
              <div>
                <strong>{xp} XP</strong>
                <span>{getLabel('Level', 'Уровень')} {level}</span>
              </div>
            </div>

            <div className="user-stat-card">
              <Award size={20} className="text-success" />
              <div>
                <strong>88%</strong>
                <span>{getLabel('Target Readiness', 'Готовность')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="dashboard-main-grid">
        {/* Left Primary Column */}
        <div className="dashboard-primary-col">
          {/* Active Mission Hero Card */}
          <div className="active-mission-hero-card">
            <div className="card-top-header">
              <span className="badge badge-active">CONTINUE LEARNING</span>
              <span className="est-time">25 Mins</span>
            </div>

            <h3>{getLabel('Protecting BankAccount Invariants', 'Защита Инвариантов BankAccount')}</h3>
            <p>
              {getLabel(
                'Fix state corruption vulnerabilities in a high-throughput payment microservice by enforcing strict encapsulation, constructor guards, and defensive copying.',
                'Устраните уязвимости повреждения состояния в платежном сервисе через инкапсуляцию, проверки в конструкторе и защитное копирование.'
              )}
            </p>

            <div className="mission-progress-bar-wrap">
              <div className="bar-info">
                <span>Progress: 2 of 13 Stages Completed</span>
                <span>15%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '15%' }} />
              </div>
            </div>

            <div className="card-action-row">
              <button
                type="button"
                className="btn-primary-action large"
                onClick={() => navigate('/missions/protecting-bank-account-invariants')}
              >
                <Play size={16} />
                <span>{getLabel('Continue Active Mission', 'Продолжить Миссию')}</span>
              </button>
            </div>
          </div>

          {/* Quick Curriculum Access */}
          <div className="quick-access-panel">
            <div className="panel-header">
              <h3>{getLabel('Curriculum Modules', 'Учебные Модули')}</h3>
              <button type="button" className="btn-link" onClick={() => navigate('/modules')}>
                <span>{getLabel('View All 14 Modules', 'Все 14 Модулей')}</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="quick-modules-row">
              <div
                className="quick-module-card active"
                onClick={() => navigate('/modules/object-oriented-programming')}
              >
                <div className="card-icon-wrap">💎</div>
                <h4>Object-Oriented Programming</h4>
                <p>37 Topics | 1 Mission Active</p>
              </div>

              <div className="quick-module-card preview" onClick={() => navigate('/modules')}>
                <div className="card-icon-wrap">⚡</div>
                <h4>Java Core & Modern JDK</h4>
                <p>Records, Generics, Sealed Classes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Secondary Column */}
        <div className="dashboard-secondary-col">
          {/* Spaced Review Queue Summary */}
          <div className="widget-card">
            <div className="widget-header">
              <RotateCcw size={18} className="text-accent" />
              <h3>{getLabel('Spaced Review Queue', 'Очередь Повторения')}</h3>
            </div>
            <div className="review-queue-count">
              <span className="count-num">1</span>
              <span className="count-label">{getLabel('Concept Due Today', 'Концепция на сегодня')}</span>
            </div>
            <p className="widget-subtext">
              {getLabel(
                'Review concept #defensive-copying to prevent retention decay.',
                'Повторите концепцию #defensive-copying для укрепления памяти.'
              )}
            </p>
            <button type="button" className="btn-secondary-action full-width" onClick={() => navigate('/review')}>
              <span>{getLabel('Open Review Queue', 'Открыть Очередь')}</span>
            </button>
          </div>

          {/* Readiness Summary */}
          <div className="widget-card">
            <div className="widget-header">
              <BarChart3 size={18} className="text-success" />
              <h3>{getLabel('Interview Readiness', 'Готовность к Интервью')}</h3>
            </div>
            <div className="readiness-score-display">
              <span className="score-val">88</span>
              <span className="score-max">/ 100</span>
            </div>
            <ul className="readiness-bullets">
              <li>🟢 Encapsulation Invariants: Reliable (85%)</li>
              <li>🟡 Defensive Copying: Exposed (40%)</li>
              <li>⚪ Dynamic Dispatch: Unseen</li>
            </ul>
            <button type="button" className="btn-tertiary-action full-width" onClick={() => navigate('/progress')}>
              <span>{getLabel('View Detailed Matrix', 'Детальная Матрица')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
