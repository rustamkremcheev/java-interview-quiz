import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  requiredTypedText?: string;
  confirmButtonLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  requiredTypedText,
  confirmButtonLabel = "Confirm Action",
  onConfirm,
  onCancel
}) => {
  const [typedInput, setTypedInput] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTypedInput('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const isConfirmedDisabled = requiredTypedText
    ? typedInput.trim().toUpperCase() !== requiredTypedText.toUpperCase()
    : false;

  return (
    <div className="dialog-backdrop-overlay">
      <div
        ref={dialogRef}
        className="dialog-window-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="dialog-header">
          <div className="title-area">
            <AlertTriangle size={20} className="text-danger" />
            <h3 id="dialog-title">{title}</h3>
          </div>
          <button type="button" className="btn-icon-close" onClick={onCancel} aria-label="Close dialog">
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body">
          <p className="dialog-desc">{description}</p>

          {requiredTypedText && (
            <div className="typed-confirmation-field">
              <label htmlFor="confirm-typed-input">
                To confirm, type <strong>"{requiredTypedText}"</strong> in the box below:
              </label>
              <input
                id="confirm-typed-input"
                type="text"
                className="input-text-field"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={`Type ${requiredTypedText} here`}
                autoFocus
              />
            </div>
          )}
        </div>

        <div className="dialog-footer-actions">
          <button type="button" className="btn-tertiary-action" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger-action"
            disabled={isConfirmedDisabled}
            onClick={onConfirm}
          >
            {confirmButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
