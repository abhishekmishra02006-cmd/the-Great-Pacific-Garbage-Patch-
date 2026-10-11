import React, { useState } from 'react';
import { X, Check, Copy, BookOpen, ExternalLink } from 'lucide-react';
import { SCIENTIFIC_CITATIONS } from '../data/oceanData';

interface CitationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationsModal: React.FC<CitationsModalProps> = ({ isOpen, onClose }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (citationText: string, idx: number) => {
    navigator.clipboard.writeText(citationText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081220] border border-slate-700 rounded-xl shadow-2xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Academic Citations & Data Sources
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Peer-reviewed literature for geography research papers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5">
          {SCIENTIFIC_CITATIONS.map((c, idx) => (
            <div
              key={idx}
              className="bg-[#050a14] p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="font-serif text-slate-200 leading-relaxed text-xs">{c.citation}</p>
                <button
                  onClick={() => handleCopy(c.citation, idx)}
                  className="shrink-0 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors"
                  title="Copy Citation"
                >
                  {copiedIdx === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-cyan-400">
                <span>DOI / ID: {c.doi}</span>
              </div>

              <div className="pt-1.5 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <span className="text-slate-500 font-semibold font-mono">Curricular Context: </span>
                {c.relevance}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close Dialog
          </button>
        </div>
      </div>
    </div>
  );
};
