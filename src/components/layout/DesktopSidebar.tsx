import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Grid, RotateCcw, BarChart3, Settings, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const DesktopSidebar: React.FC = () => {
  const { languageMode, streak, xp } = useAppStore();

  const getLabel = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  return (
    <aside className="desktop-sidebar-rail" aria-label="Main Navigation">
      <div className="sidebar-brand">
        <ShieldCheck size={28} className="brand-icon" />
        <div className="brand-text">
          <span className="brand-title">JAVA SENIOR</span>
          <span className="brand-subtitle">MENTORSHIP ENGINE</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-rail-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>{getLabel('Dashboard', 'Дашборд')}</span>
        </NavLink>

        <NavLink
          to="/modules"
          className={({ isActive }) => `nav-rail-item ${isActive ? 'active' : ''}`}
        >
          <Grid size={20} />
          <span>{getLabel('Modules Grid', 'Сетка Модулей')}</span>
        </NavLink>

        <NavLink
          to="/review"
          className={({ isActive }) => `nav-rail-item ${isActive ? 'active' : ''}`}
        >
          <RotateCcw size={20} />
          <span>{getLabel('Spaced Review', 'Интервальный Повтор')}</span>
        </NavLink>

        <NavLink
          to="/progress"
          className={({ isActive }) => `nav-rail-item ${isActive ? 'active' : ''}`}
        >
          <BarChart3 size={20} />
          <span>{getLabel('Progress & Readiness', 'Прогресс и Готовность')}</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => `nav-rail-item ${isActive ? 'active' : ''}`}
        >
          <Settings size={20} />
          <span>{getLabel('System Settings', 'Настройки')}</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer-stats">
        <div className="stat-badge">
          <span className="stat-icon">🔥</span>
          <span className="stat-label">{streak} {getLabel('Day Streak', 'Дней подряд')}</span>
        </div>
        <div className="stat-badge">
          <span className="stat-icon">⚡</span>
          <span className="stat-label">{xp} XP</span>
        </div>
      </div>
    </aside>
  );
};
