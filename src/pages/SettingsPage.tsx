import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { exportUserDataJSON, importUserDataJSON, resetUserData } from '../db/database';
import { ConfirmDialog } from '../components/workspace/ConfirmDialog';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Settings, Globe, Eye, Clock, Download, Upload, RotateCcw, ShieldAlert, Check } from 'lucide-react';
import { LanguageMode } from '../types/domain';

export const SettingsPage: React.FC = () => {
  const {
    languageMode, setLanguageMode,
    codeCommentsMode, setCodeCommentsMode,
    timerEnabled, setTimerEnabled,
    reducedMotion, setReducedMotion
  } = useAppStore();

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = async () => {
    const jsonStr = await exportUserDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `java-senior-prep-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const ok = await importUserDataJSON(content);
      if (ok) {
        setImportStatus('Progress imported successfully! Please reload.');
      } else {
        setImportStatus('Import failed. Invalid JSON format.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmReset = async () => {
    await resetUserData();
    setResetDialogOpen(false);
    window.location.reload();
  };

  const breadcrumbs = [
    { label: languageMode === 'ru' ? 'Дашборд' : 'Dashboard', path: '/' },
    { label: languageMode === 'ru' ? 'Настройки' : 'System Settings' }
  ];

  return (
    <div className="system-settings-page">
      <Breadcrumbs items={breadcrumbs} />

      <div className="page-header-banner">
        <div className="header-icon-box">
          <Settings size={28} className="text-accent" />
        </div>
        <div>
          <h1 className="page-heading">
            {languageMode === 'ru' ? 'Системные Настройки и Данные' : 'System Settings & Data Management'}
          </h1>
          <p className="page-subheading">
            Configure language preferences, accessibility, code comment modes, and local IndexedDB backup export/import.
          </p>
        </div>
      </div>

      <div className="settings-cards-grid">
        {/* Preference Settings Card */}
        <div className="settings-panel-card">
          <h3>
            <Globe size={18} className="text-accent" />
            <span>Localization & Language Mode</span>
          </h3>
          <p className="setting-desc">
            Choose your preferred language. Java code, bytecode, and API identifiers remain untranslated across all modes.
          </p>

          <div className="setting-option-group">
            <label className="radio-label">
              <input
                type="radio"
                name="lang"
                checked={languageMode === 'en'}
                onChange={() => setLanguageMode('en')}
              />
              <span>English (Default)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="lang"
                checked={languageMode === 'ru'}
                onChange={() => setLanguageMode('ru')}
              />
              <span>Russian (Русский)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="lang"
                checked={languageMode === 'bilingual'}
                onChange={() => setLanguageMode('bilingual')}
              />
              <span>Bilingual Mode (EN / RU)</span>
            </label>
          </div>
        </div>

        {/* Display & Workspace Settings */}
        <div className="settings-panel-card">
          <h3>
            <Eye size={18} className="text-accent" />
            <span>Code Viewer & Accessibility</span>
          </h3>

          <div className="toggle-setting-row">
            <div>
              <strong>Code Comments Display Mode</strong>
              <p>Toggle between Clean Production Code and Annotated Learning Code.</p>
            </div>
            <button
              type="button"
              className={`btn-toggle ${codeCommentsMode === 'ANNOTATED' ? 'active' : ''}`}
              onClick={() => setCodeCommentsMode(codeCommentsMode === 'ANNOTATED' ? 'CLEAN' : 'ANNOTATED')}
            >
              {codeCommentsMode}
            </button>
          </div>

          <div className="toggle-setting-row">
            <div>
              <strong>Practice Timer</strong>
              <p>Show optional timer in Interview Verbal stage (Disabled by default to reduce anxiety).</p>
            </div>
            <button
              type="button"
              className={`btn-toggle ${timerEnabled ? 'active' : ''}`}
              onClick={() => setTimerEnabled(!timerEnabled)}
            >
              {timerEnabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          <div className="toggle-setting-row">
            <div>
              <strong>Reduced Motion</strong>
              <p>Minimize UI animations and transition effects for accessibility.</p>
            </div>
            <button
              type="button"
              className={`btn-toggle ${reducedMotion ? 'active' : ''}`}
              onClick={() => setReducedMotion(!reducedMotion)}
            >
              {reducedMotion ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </div>

        {/* Data Persistence & Export/Import */}
        <div className="settings-panel-card">
          <h3>
            <Download size={18} className="text-accent" />
            <span>Local Progress Backup (JSON)</span>
          </h3>
          <p className="setting-desc">
            Export or import your local IndexedDB user attempts, mastery metrics, and reflection notes as a JSON file.
          </p>

          <div className="data-action-buttons">
            <button type="button" className="btn-secondary-action" onClick={handleExport}>
              <Download size={16} /> Export Progress JSON
            </button>

            <label className="btn-secondary-action input-file-btn">
              <Upload size={16} /> Import Progress JSON
              <input type="file" accept=".json" onChange={handleImportFile} hidden />
            </label>
          </div>

          {importStatus && (
            <div className="import-status-msg">
              <Check size={14} className="text-success" />
              <span>{importStatus}</span>
            </div>
          )}
        </div>

        {/* Danger Zone: Reset Progress */}
        <div className="settings-panel-card danger-card">
          <h3>
            <ShieldAlert size={18} className="text-danger" />
            <span>Danger Zone: Reset All Progress</span>
          </h3>
          <p className="setting-desc">
            Wipe all local user attempts, concept mastery scores, spaced reviews, and reflection notes.
          </p>

          <button
            type="button"
            className="btn-danger-action"
            onClick={() => setResetDialogOpen(true)}
          >
            <RotateCcw size={16} /> Reset All Progress Data
          </button>
        </div>
      </div>

      {/* Glassmorphic Confirm Dialog with Typed RESET Confirmation */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Confirm Full Progress Reset"
        description="Are you absolutely sure you want to reset all practice attempts, concept mastery scores, and reflection notes? This action cannot be undone."
        requiredTypedText="RESET"
        confirmButtonLabel="Wipe All Progress"
        onConfirm={handleConfirmReset}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
};
