import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { useAppStore } from '../../store/useAppStore';

export const AppLayout: React.FC = () => {
  const { initializeStore, isInitialized } = useAppStore();

  useEffect(() => {
    initializeStore();
  }, [initializeStore]);

  if (!isInitialized) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Initializing Java Mission Control...</p>
      </div>
    );
  }

  return (
    <div className="app-frame">
      <Navbar />
      <main className="app-main-content">
        <Outlet />
      </main>
    </div>
  );
};
