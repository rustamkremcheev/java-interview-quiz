import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { ModulesPage } from './pages/ModulesPage';
import { ModulePage } from './pages/ModulePage';
import { TopicPage } from './pages/TopicPage';
import { MissionPage } from './pages/MissionPage';
import { ReviewPage } from './pages/ReviewPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="modules" element={<ModulesPage />} />
          <Route path="modules/:moduleSlug" element={<ModulePage />} />
          <Route path="modules/:moduleSlug/topics/:topicSlug" element={<TopicPage />} />
          <Route path="missions/:missionSlug" element={<MissionPage />} />
          <Route path="mission/:id" element={<MissionPage />} />
          <Route path="learn" element={<Navigate to="/modules" replace />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
