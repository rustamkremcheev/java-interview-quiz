import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { LanguageMode } from '../../types/domain';
import { db } from '../../db/database';
import { useLiveQuery } from 'dexie-react-hooks';
import { Shield, Zap, Flame, Compass, BookOpen, Clock, BarChart3, Settings } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { languageMode, setLanguageMode, xp, level, streak } = useAppStore();

  const dueReviewsCount = useLiveQuery(async () => {
    return db.reviewItems.where('status').equals('DUE').count();
  }, []) || 0;

  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguageMode(e.target.value as LanguageMode);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <div className="brand-logo">
            <Shield size={22} className="logo-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">JAVA MISSION CONTROL</span>
            <span className="brand-subtitle">Practice. Diagnose. Explain. Master.</span>
          </div>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Compass size={18} /> Dashboard
          </NavLink>
          <NavLink to="/modules" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookOpen size={18} /> Modules
          </NavLink>
          <NavLink to="/review" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Clock size={18} /> Review
            {dueReviewsCount > 0 && <span className="due-count-badge">{dueReviewsCount}</span>}
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BarChart3 size={18} /> Progress
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={18} /> Settings
          </NavLink>
        </nav>

        <div className="navbar-right">
          <div className="user-stats">
            <div className="stat-pill level-pill" title="Current Level">
              <span className="level-tag">LVL</span>
              <span className="stat-num">{level}</span>
            </div>
            <div className="stat-pill xp-pill" title="Total Experience Points">
              <Zap size={14} className="icon-xp" />
              <span className="stat-num">{xp} XP</span>
            </div>
            <div className="stat-pill streak-pill" title="Daily Practice Streak">
              <Flame size={14} className="icon-flame" />
              <span className="stat-num">{streak}d</span>
            </div>
          </div>

          <div className="lang-switcher">
            <select value={languageMode} onChange={handleLangChange} className="lang-select">
              <option value="en">English (EN)</option>
              <option value="ru">Русский (RU)</option>
              <option value="bilingual">Bilingual (EN / RU)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
