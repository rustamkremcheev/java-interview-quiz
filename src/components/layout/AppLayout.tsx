import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppStore } from '../../store/useAppStore';
import { BookOpen, Search } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { initializeStore, isInitialized, toggleSidebar } = useAppStore();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      initializeStore();
    }
  }, [initializeStore, isInitialized]);

  // Check if we are inside a mission workspace route
  const isMissionWorkspace = location.pathname.startsWith('/missions/') || location.pathname.startsWith('/mission/');

  return (
    <div className="app-shell-root">
      <DesktopSidebar />

      <div className="app-shell-main-wrapper">
        <header className="app-top-header">
          <div className="header-left-area">
            <div className="header-search-trigger">
              <Search size={16} className="text-secondary" />
              <span className="search-placeholder">Search modules, topics, concepts... (Press /)</span>
              <kbd className="search-kbd">/</kbd>
            </div>
          </div>

          <div className="header-right-area">
            <LanguageSwitcher />

            {isMissionWorkspace && (
              <button
                type="button"
                className="btn-sidebar-toggle"
                onClick={() => toggleSidebar()}
                title="Toggle Knowledge Sidebar (Press K)"
              >
                <BookOpen size={18} />
                <span className="desktop-only-text">Knowledge Sidebar</span>
              </button>
            )}
          </div>
        </header>

        <main className="app-content-area" id="main-content">
          <Outlet />
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
};
