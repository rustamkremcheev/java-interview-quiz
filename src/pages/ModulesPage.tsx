import React from 'react';
import { MODULES_REGISTRY } from '../data/modules/registry';
import { ModuleCard } from '../components/cards/ModuleCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useAppStore } from '../store/useAppStore';

export const ModulesPage: React.FC = () => {
  const { languageMode } = useAppStore();

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Модули' : 'Modules' }
  ];

  return (
    <div className="modules-directory-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="page-title-banner">
        <h1 className="page-heading">
          {languageMode === 'ru' ? 'Каталог Доменных Модулей' : 'Curriculum Modules Directory'}
        </h1>
        <p className="page-subheading">
          {languageMode === 'ru'
            ? 'Сертифицированные доменные модули для подготовки Senior Java и JVM Backend инженеров к Tier-1 интервью.'
            : 'Audited deep-dive modules engineered for Senior Java Backend Engineers preparing for Tier-1 technology & banking interviews.'}
        </p>
      </div>

      <div className="modules-grid-container">
        {MODULES_REGISTRY.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            progressPercent={mod.id === 'mod_oop' ? 15 : 0}
          />
        ))}
      </div>
    </div>
  );
};
