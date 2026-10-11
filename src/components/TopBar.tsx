import React from 'react';
import { Compass, BookOpen, Download } from 'lucide-react';

interface TopBarProps {
  activeChapter: number;
  onSelectChapter: (chapter: number) => void;
  onOpenCitations: () => void;
  onOpenExportSummary: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeChapter,
  onSelectChapter,
  onOpenCitations,
  onOpenExportSummary,
}) => {
  const chapters = [
    { id: 1, label: 'Location & Extent' },
    { id: 2, label: 'Gyre Physics' },
    { id: 3, label: 'Debris & Polymers' },
    { id: 4, label: 'Journey & Rivers' },
    { id: 5, label: 'Trophic Impacts' },
    { id: 6, label: 'Empirical Data' },
    { id: 7, label: 'Solutions & Treaty' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070d18]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            The Great Pacific Garbage Patch
          </span>
        </div>

        {/* Zone 2: Chapter Navigation Links (Single line, quiet states) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => onSelectChapter(ch.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeChapter === ch.id
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {ch.id}. {ch.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Academic Resource Tools */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCitations}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-750 border border-slate-750 rounded-lg transition-colors whitespace-nowrap"
            title="View Academic Sources & Citations"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Sources</span>
          </button>
          
          <button
            onClick={onOpenExportSummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            title="Export Assignment Briefing Summary"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Assignment Report</span>
          </button>
        </div>
      </div>

      {/* Mobile Chapter Strip for Narrow Viewports */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 bg-[#050a14] border-t border-slate-800/80 no-scrollbar gap-1">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => onSelectChapter(ch.id)}
            className={`px-2.5 py-1 text-xs whitespace-nowrap rounded shrink-0 transition-colors ${
              activeChapter === ch.id
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ch {ch.id}: {ch.label}
          </button>
        ))}
      </div>
    </header>
  );
};
