import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Grid, RotateCcw, BarChart3, Settings } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const MobileBottomNav: React.FC = () => {
  const { languageMode } = useAppStore();

  const getLabel = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    return en;
  };

  return (
    <nav className="mobile-bottom-nav-bar" aria-label="Mobile Navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <LayoutDashboard size={20} />
        <span>{getLabel('Home', 'Главная')}</span>
      </NavLink>

      <NavLink
        to="/modules"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Grid size={20} />
        <span>{getLabel('Modules', 'Модули')}</span>
      </NavLink>

      <NavLink
        to="/review"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <RotateCcw size={20} />
        <span>{getLabel('Review', 'Повтор')}</span>
      </NavLink>

      <NavLink
        to="/progress"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <BarChart3 size={20} />
        <span>{getLabel('Progress', 'Прогресс')}</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
      >
        <Settings size={20} />
        <span>{getLabel('Settings', 'Опции')}</span>
      </NavLink>
    </nav>
  );
};
