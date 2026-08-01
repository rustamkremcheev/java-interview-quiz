import React, { useState } from 'react';
import { LocalizedText, LanguageMode } from '../../types/domain';
import { db } from '../../db/database';
import { Save, CheckCircle } from 'lucide-react';

interface ReflectionPromptProps {
  missionId: string;
  prompt: LocalizedText;
  languageMode: LanguageMode;
  onComplete: () => void;
}

export const ReflectionPrompt: React.FC<ReflectionPromptProps> = ({
  missionId,
  prompt,
  languageMode,
  onComplete
}) => {
  const [noteText, setNoteText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNote = async () => {
    if (!noteText.trim()) {
      onComplete();
      return;
    }

    await db.reflectionNotes.add({
      userId: 'local-user',
      missionId,
      responseText: noteText.trim(),
      createdAt: new Date().toISOString()
    });

    setIsSaved(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const getText = (text: LocalizedText) => {
    if (languageMode === 'ru') return text.ru;
    if (languageMode === 'bilingual') return `${text.en}\n(${text.ru})`;
    return text.en;
  };

  return (
    <div className="challenge-container">
      <div className="challenge-header">
        <h3>{getText(prompt)}</h3>
        <p className="touch-hint">Save a key takeaway note for your production code review checklist.</p>
      </div>

      <div className="reflection-input-box">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="e.g. Rule: Always enforce immutable records for key objects in HashMaps. Verify equals/hashCode consistency in code reviews."
          rows={5}
          className="interview-textarea"
        />
        <div className="textarea-footer">
          {isSaved ? (
            <span className="saved-indicator"><CheckCircle size={18} /> Note Saved (+5 XP)</span>
          ) : (
            <button onClick={handleSaveNote} className="btn-primary">
              Save Production Rule <Save size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
