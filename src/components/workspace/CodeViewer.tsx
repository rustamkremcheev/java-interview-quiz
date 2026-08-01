import React, { useState } from 'react';
import { CodeArtifact, CodeAnnotation } from '../../types/domain';
import { useAppStore } from '../../store/useAppStore';
import { Copy, Check, Eye, MessageSquareCode } from 'lucide-react';

interface CodeViewerProps {
  artifact: CodeArtifact;
  selectedLineNumbers?: readonly number[];
  onLineClick?: (lineNumber: number) => void;
  interactiveSelection?: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  artifact,
  selectedLineNumbers = [],
  onLineClick,
  interactiveSelection = false
}) => {
  const { codeCommentsMode, setCodeCommentsMode, languageMode } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [activeAnnotation, setActiveAnnotation] = useState<CodeAnnotation | null>(null);

  const getTitle = () => {
    if (languageMode === 'ru') return artifact.title.ru;
    return artifact.title.en;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.sourceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = artifact.sourceCode.split('\n');

  return (
    <div className="code-viewer-container">
      <div className="code-viewer-toolbar">
        <div className="toolbar-left">
          <span className="code-file-title">{getTitle()}</span>
          <span className={`code-type-badge code-type-${artifact.type.toLowerCase()}`}>
            {artifact.type}
          </span>
          <span className="jdk-badge">JDK {artifact.javaVersion}</span>
        </div>

        <div className="toolbar-right">
          <button
            type="button"
            className="btn-toolbar-toggle"
            onClick={() => setCodeCommentsMode(codeCommentsMode === 'CLEAN' ? 'ANNOTATED' : 'CLEAN')}
            title="Toggle Clean vs Annotated Code View"
          >
            {codeCommentsMode === 'CLEAN' ? <Eye size={14} /> : <MessageSquareCode size={14} />}
            <span>{codeCommentsMode === 'CLEAN' ? 'Clean View' : 'Annotated View'}</span>
          </button>

          <button
            type="button"
            className="btn-toolbar-copy"
            onClick={handleCopy}
            title="Copy Source Code"
          >
            {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Code Editor Content */}
      <div className="code-viewer-body">
        <div className="code-scroll-pane">
          <table className="code-table">
            <tbody>
              {codeLines.map((line, idx) => {
                const lineNum = idx + 1;
                const isSelected = selectedLineNumbers.includes(lineNum);
                const annotation = artifact.annotations.find(
                  (a) => lineNum >= a.startLine && lineNum <= a.endLine
                );

                return (
                  <tr
                    key={lineNum}
                    className={`code-tr ${isSelected ? 'selected-line' : ''} ${interactiveSelection ? 'clickable-line' : ''}`}
                    onClick={() => interactiveSelection && onLineClick && onLineClick(lineNum)}
                  >
                    <td className="line-number-td">{lineNum}</td>
                    <td className="code-content-td">
                      <pre className="code-line-pre">{line}</pre>
                      {codeCommentsMode === 'ANNOTATED' && annotation && (
                        <div
                          className="inline-annotation-badge"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAnnotation(activeAnnotation?.id === annotation.id ? null : annotation);
                          }}
                        >
                          💡 Annotation: {annotation.title.en}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Annotation Details */}
        {activeAnnotation && (
          <div className="annotation-detail-box">
            <div className="annotation-box-header">
              <MessageSquareCode size={16} className="text-accent" />
              <strong>{activeAnnotation.title.en}</strong>
            </div>
            <p className="annotation-box-desc">{activeAnnotation.explanation.en}</p>
          </div>
        )}
      </div>
    </div>
  );
};
