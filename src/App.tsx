import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

const DashboardPage = lazy(() =>
  import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const ModulesPage = lazy(() =>
  import('./pages/ModulesPage').then((m) => ({ default: m.ModulesPage }))
);
const ModulePage = lazy(() =>
  import('./pages/ModulePage').then((m) => ({ default: m.ModulePage }))
);
const TopicPage = lazy(() =>
  import('./pages/TopicPage').then((m) => ({ default: m.TopicPage }))
);
const MissionPage = lazy(() =>
  import('./pages/MissionPage').then((m) => ({ default: m.MissionPage }))
);
const ReviewPage = lazy(() =>
  import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage }))
);
const ProgressPage = lazy(() =>
  import('./pages/ProgressPage').then((m) => ({ default: m.ProgressPage }))
);
const SettingsPage = lazy(() =>
  import('./pages/SettingsPage').then((m) => ({ default: m.SettingsPage }))
);
const AlgorithmLabPage = lazy(() =>
  import('./pages/AlgorithmLabPage').then((m) => ({ default: m.AlgorithmLabPage }))
);
const AlgorithmWorkshopPage = lazy(() =>
  import('./pages/AlgorithmWorkshopPage').then((m) => ({ default: m.AlgorithmWorkshopPage }))
);

const RouteFallback: React.FC = () => (
  <div className="route-loading-fallback" style={{ padding: '2rem', color: 'var(--text-secondary, #94a3b8)' }}>
    Loading…
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="modules" element={<ModulesPage />} />
            <Route path="modules/:moduleSlug" element={<ModulePage />} />
            <Route path="modules/:moduleSlug/topics/:topicSlug" element={<TopicPage />} />
            <Route path="missions/:missionSlug" element={<MissionPage />} />
            <Route path="mission/:id" element={<MissionPage />} />
            <Route path="learn" element={<Navigate to="/modules" replace />} />
          <Route path="algorithms" element={<AlgorithmLabPage />} />
          <Route path="algorithms/:problemSlug" element={<AlgorithmLabPage />} />
          <Route path="algorithms/:problemSlug/workshop" element={<AlgorithmWorkshopPage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
