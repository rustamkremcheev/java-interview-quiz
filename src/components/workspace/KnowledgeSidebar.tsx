import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { OOP_DATA_PACKAGE } from '../../data/modules/oop';
import { TagChip } from '../common/TagChip';
import { X, BookOpen, AlertTriangle, MessageSquare, ExternalLink, Lightbulb, Hash } from 'lucide-react';

export const KnowledgeSidebar: React.FC = () => {
  const {
    sidebarOpen,
    toggleSidebar,
    sidebarActiveTab,
    setSidebarActiveTab,
    sidebarSelectedTag,
    languageMode
  } = useAppStore();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        toggleSidebar(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen, toggleSidebar]);

  if (!sidebarOpen) return null;

  const getText = (en: string, ru: string) => {
    if (languageMode === 'ru') return ru;
    if (languageMode === 'bilingual') return `${en} / ${ru}`;
    return en;
  };

  const selectedConcept = sidebarSelectedTag
    ? OOP_DATA_PACKAGE.concepts.find((c) => c.canonicalTag === sidebarSelectedTag || c.canonicalTag === `#${sidebarSelectedTag}`)
    : OOP_DATA_PACKAGE.concepts[0];

  return (
    <>
      {/* Semi-transparent backdrop for mobile/overlay view */}
      <div className="sidebar-backdrop-dim" onClick={() => toggleSidebar(false)} />

      <div
        ref={drawerRef}
        className="knowledge-sidebar-drawer"
        role="dialog"
        aria-label="Knowledge Sidebar"
        aria-modal="true"
      >
        {/* Mobile Drag Handle */}
        <div className="mobile-sheet-drag-handle" />

        <div className="sidebar-drawer-header">
          <div className="drawer-title-area">
            <BookOpen size={18} className="text-accent" />
            <h3 className="drawer-heading">Knowledge Sidebar</h3>
          </div>
          <button
            type="button"
            className="btn-icon-close"
            onClick={() => toggleSidebar(false)}
            aria-label="Close Knowledge Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="sidebar-tab-bar" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={sidebarActiveTab === 'THEORY'}
            className={`sidebar-tab-btn ${sidebarActiveTab === 'THEORY' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('THEORY')}
          >
            <BookOpen size={14} /> Theory
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarActiveTab === 'CONCEPTS'}
            className={`sidebar-tab-btn ${sidebarActiveTab === 'CONCEPTS' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('CONCEPTS')}
          >
            <Lightbulb size={14} /> Concepts
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarActiveTab === 'MISTAKES'}
            className={`sidebar-tab-btn ${sidebarActiveTab === 'MISTAKES' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('MISTAKES')}
          >
            <AlertTriangle size={14} /> Mistakes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarActiveTab === 'INTERVIEW_TIPS'}
            className={`sidebar-tab-btn ${sidebarActiveTab === 'INTERVIEW_TIPS' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('INTERVIEW_TIPS')}
          >
            <MessageSquare size={14} /> Speech Tips
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={sidebarActiveTab === 'TAGS'}
            className={`sidebar-tab-btn ${sidebarActiveTab === 'TAGS' ? 'active' : ''}`}
            onClick={() => setSidebarActiveTab('TAGS')}
          >
            <Hash size={14} /> Tags
          </button>
        </div>

        {/* Scrollable Tab Content Area */}
        <div className="sidebar-content-body">
          {sidebarActiveTab === 'THEORY' && (
            <div className="tab-pane-theory">
              <h4>{getText(OOP_DATA_PACKAGE.theoryArticles[0].title.en, OOP_DATA_PACKAGE.theoryArticles[0].title.ru)}</h4>
              <p className="summary-p">{getText(OOP_DATA_PACKAGE.theoryArticles[0].summary.en, OOP_DATA_PACKAGE.theoryArticles[0].summary.ru)}</p>

              {OOP_DATA_PACKAGE.theoryArticles[0].sections.map((sec) => (
                <div key={sec.id} className="sidebar-section-card">
                  <h5 className="section-card-title">{getText(sec.title.en, sec.title.ru)}</h5>
                  {sec.blocks.map((b) => {
                    if (b.type === 'PARAGRAPH') {
                      return <p key={b.id} className="block-p">{getText(b.content.en, b.content.ru)}</p>;
                    }
                    if (b.type === 'CALLOUT' || b.type === 'WARNING') {
                      return (
                        <div key={b.id} className={`callout-box ${b.type.toLowerCase()}`}>
                          {b.title && <h6>{getText(b.title.en, b.title.ru)}</h6>}
                          <p>{getText(b.content.en, b.content.ru)}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          )}

          {sidebarActiveTab === 'CONCEPTS' && (
            <div className="tab-pane-concepts">
              <h4>{selectedConcept ? getText(selectedConcept.title.en, selectedConcept.title.ru) : 'Domain Invariants'}</h4>
              <p className="concept-summary-text">
                {selectedConcept ? getText(selectedConcept.summary.en, selectedConcept.summary.ru) : ''}
              </p>

              <div className="all-concepts-list">
                <h5>All Module Concepts:</h5>
                {OOP_DATA_PACKAGE.concepts.map((c) => (
                  <div key={c.id} className="mini-concept-item">
                    <strong>{getText(c.title.en, c.title.ru)}</strong>
                    <span>{c.canonicalTag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sidebarActiveTab === 'MISTAKES' && (
            <div className="tab-pane-mistakes">
              <h4>Common Misconceptions & Traps</h4>
              {OOP_DATA_PACKAGE.mistakePatterns.map((mp) => (
                <div key={mp.id} className="mistake-pattern-card">
                  <div className="pattern-header">
                    <AlertTriangle size={16} className="text-warning" />
                    <strong>{getText(mp.title.en, mp.title.ru)}</strong>
                  </div>
                  <p className="pattern-desc">{getText(mp.description.en, mp.description.ru)}</p>
                  <div className="reasoning-comparison">
                    <div className="incorrect-reasoning">
                      ❌ {getText(mp.exampleIncorrectReasoning.en, mp.exampleIncorrectReasoning.ru)}
                    </div>
                    <div className="corrected-reasoning">
                      🟢 {getText(mp.correctedReasoning.en, mp.correctedReasoning.ru)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sidebarActiveTab === 'INTERVIEW_TIPS' && (
            <div className="tab-pane-tips">
              <h4>Senior Verbal Speech Structure</h4>
              <div className="tip-card">
                <h5>1. Elevator Pitch (30 sec)</h5>
                <p>State clearly that encapsulation protects state invariants, not merely getters and setters.</p>
              </div>
              <div className="tip-card">
                <h5>2. Deep Mechanics (60 sec)</h5>
                <p>Explain precondition guards in constructors and replacing setters with deposit() / withdraw() domain behaviors.</p>
              </div>
              <div className="tip-card">
                <h5>3. Production Trade-offs (30 sec)</h5>
                <p>Discuss defensive copying allocation overhead vs zero-GC low-latency paths.</p>
              </div>
            </div>
          )}

          {sidebarActiveTab === 'TAGS' && (
            <div className="tab-pane-tags">
              <h4>Canonical Graph Tags</h4>
              <div className="tags-flex-wrap">
                {OOP_DATA_PACKAGE.tags.map((t) => (
                  <TagChip key={t.id} tag={t.displayName.en} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
