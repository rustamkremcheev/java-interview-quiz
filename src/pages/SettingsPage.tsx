import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { LanguageMode } from '../types/mission';
import { exportUserDataJSON, importUserDataJSON, db } from '../db/database';
import { Settings, Download, Upload, Trash2, Globe, Sparkles, Check, AlertOctagon } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { languageMode, setLanguageMode } = useAppStore();
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleExport = async () => {
    const jsonStr = await exportUserDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `java-mission-control-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      const success = await importUserDataJSON(content);
      if (success) {
        setImportStatus('Progress imported successfully! Refreshing...');
        setTimeout(() => window.location.reload(), 1200);
      } else {
        setImportStatus('Failed to import JSON: Invalid format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = async () => {
    await db.delete();
    await db.open();
    setShowResetModal(false);
    window.location.reload();
  };

  return (
    <div className="settings-page-container">
      <div className="page-header">
        <h1><Settings size={28} /> Preferences & Data Control</h1>
        <p className="subtext">Configure language modes, accessibility, and manage local-first progress storage.</p>
      </div>

      <div className="settings-grid">
        {/* Language & UI Settings */}
        <div className="section-card">
          <h3><Globe size={20} /> Language & Localization</h3>
          <div className="setting-row">
            <div>
              <strong>Interface & Mission Language</strong>
              <p>Choose your preferred language format for scenarios, questions, and model explanations.</p>
            </div>
            <select
              value={languageMode}
              onChange={(e) => setLanguageMode(e.target.value as LanguageMode)}
              className="setting-select"
            >
              <option value="en">English (EN)</option>
              <option value="ru">Русский (RU)</option>
              <option value="bilingual">Bilingual (EN / RU)</option>
            </select>
          </div>
        </div>

        {/* Data Persistence Settings */}
        <div className="section-card">
          <h3><Sparkles size={20} /> Local Progress Data Management</h3>

          <div className="setting-row">
            <div>
              <strong>Export Progress Backup (JSON)</strong>
              <p>Download your complete attempt logs, concept mastery, and reflection notes to a local JSON file.</p>
            </div>
            <button onClick={handleExport} className="btn-secondary">
              <Download size={16} /> Export JSON
            </button>
          </div>

          <div className="setting-row">
            <div>
              <strong>Import Progress Backup</strong>
              <p>Restore progress from a previously exported JSON file.</p>
            </div>
            <label className="btn-secondary file-upload-label">
              <Upload size={16} /> Select Backup JSON
              <input type="file" accept=".json" onChange={handleImportFile} hidden />
            </label>
          </div>

          {importStatus && (
            <div className="status-msg">
              <Check size={16} /> {importStatus}
            </div>
          )}

          <div className="setting-row danger-zone">
            <div>
              <strong className="text-danger">Reset All Local Progress</strong>
              <p>Permanently delete all attempt history, XP, streaks, and concept mastery from IndexedDB.</p>
            </div>
            <button onClick={() => setShowResetModal(true)} className="btn-danger">
              <Trash2 size={16} /> Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <AlertOctagon size={36} className="icon-error" />
            <h3>Reset All Progress?</h3>
            <p>This action cannot be undone. All offline IndexedDB data will be cleared.</p>
            <div className="modal-actions">
              <button onClick={() => setShowResetModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={handleResetData} className="btn-danger">
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
