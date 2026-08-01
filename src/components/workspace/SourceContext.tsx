import React, { useState } from 'react';
import { Source, SourceReference, ProvenanceClassification } from '../../types/domain';
import { ShieldCheck, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';

interface SourceContextProps {
  classification: ProvenanceClassification;
  sources: readonly Source[];
  sourceReferences: readonly SourceReference[];
}

export const SourceContext: React.FC<SourceContextProps> = ({
  classification,
  sources,
  sourceReferences
}) => {
  const [expanded, setExpanded] = useState(false);

  const formatClassification = (cls: ProvenanceClassification) => {
    switch (cls) {
      case "BOOK_DERIVED_EXERCISE":
        return "Book Derived Educational Exercise (Effective Java)";
      case "CURATED_INTERVIEW_BANK":
        return "Curated Technical Interview Question Bank";
      case "OFFICIAL_LANGUAGE_EDGE_CASE":
        return "Official Java Language Specification Edge Case";
      case "GENERATED_PRACTICE_VARIATION":
        return "Generated Practice Variation";
      case "REAL_INTERVIEW_REPORT":
        return "Verified Real Interview Report";
      default:
        return cls;
    }
  };

  return (
    <div className="source-context-drawer">
      <button
        type="button"
        className="source-context-header-btn"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="header-left">
          <ShieldCheck size={16} className="text-accent" />
          <span className="source-label-text">
            <strong>Provenance:</strong> {formatClassification(classification)}
          </span>
        </div>
        <div className="header-right">
          <span className="expand-hint">{expanded ? "Hide Details" : "Inspect Context"}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {expanded && (
        <div className="source-context-body">
          <div className="provenance-detail-row">
            <span className="detail-key">Classification:</span>
            <span className="detail-value">{classification}</span>
          </div>

          <div className="provenance-detail-row">
            <span className="detail-key">Technical Authority:</span>
            <span className="detail-value">Java Language Specification (JLS 8.3) & Effective Java Item 17</span>
          </div>

          {sources.length > 0 && (
            <div className="sources-list">
              <span className="detail-key">Audited Sources:</span>
              <ul className="sources-ul">
                {sources.map((s) => (
                  <li key={s.id} className="source-li">
                    <BookOpen size={14} className="text-secondary" />
                    <span>{s.title} ({s.platform})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {classification === "GENERATED_PRACTICE_VARIATION" && (
            <div className="generated-disclaimer">
              ℹ️ Practice variation generated for learning reinforcement. Does not claim official company attribution.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
