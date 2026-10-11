/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopBar } from './components/TopBar';
import { GisMapCanvas } from './components/GisMapCanvas';
import { TimelineScrubber } from './components/TimelineScrubber';
import { StoryChapters } from './components/StoryChapters';
import { CitationsModal } from './components/CitationsModal';
import { ExportSummaryModal } from './components/ExportSummaryModal';
import { GPGP_KEY_STATS } from './data/oceanData';
import { Globe, BookOpen, Layers, Compass, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [timelineYear, setTimelineYear] = useState<number>(2024);
  const [predictionScenario, setPredictionScenario] = useState<'status-quo' | 'mitigation-treaty'>('status-quo');
  const [isCitationsOpen, setIsCitationsOpen] = useState<boolean>(false);
  const [isExportSummaryOpen, setIsExportSummaryOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#050913] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3-Zone Top Navigation Contract */}
      <TopBar
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        onOpenCitations={() => setIsCitationsOpen(true)}
        onOpenExportSummary={() => setIsExportSummaryOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Academic Presentation Header Banner */}
        <section className="bg-gradient-to-r from-[#091528] via-[#0b1b36] to-[#071120] rounded-2xl p-5 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>Department of Geography & Ocean Studies</span>
              <span className="text-slate-600">·</span>
              <span>Research Geospatial Project</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance">
              The Great Pacific Garbage Patch: Oceanographic GIS & Dynamics
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed text-pretty">
              An empirical exploration into the physics, chemical composition, trophic food-web bioaccumulation,
              and 1980–2050 accumulation projections within the North Pacific Subtropical Gyre.
            </p>
          </div>

          {/* Core Geography KPI Strip (Tabular Figures, Unboxed text metadata) */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase">ACCUMULATION AREA</span>
              <span className="text-base sm:text-lg font-bold font-mono text-white mt-0.5 block tabular-nums">
                {GPGP_KEY_STATS.areaFormatted}
              </span>
              <span className="text-[11px] text-slate-400">~2.5x the territory of France</span>
            </div>

            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase">ESTIMATED PLASTIC MASS</span>
              <span className="text-base sm:text-lg font-bold font-mono text-amber-300 mt-0.5 block tabular-nums">
                {GPGP_KEY_STATS.estimatedMassRange}
              </span>
              <span className="text-[11px] text-slate-400">Lebreton et al. (Scientific Reports)</span>
            </div>

            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase">FLOATING PIECE COUNT</span>
              <span className="text-base sm:text-lg font-bold font-mono text-cyan-300 mt-0.5 block tabular-nums">
                {GPGP_KEY_STATS.particleCountFormatted}
              </span>
              <span className="text-[11px] text-slate-400">94% microplastics by count</span>
            </div>

            <div>
              <span className="text-slate-400 block font-mono text-[10px] uppercase">DOMINANT MASS SOURCE</span>
              <span className="text-base sm:text-lg font-bold font-mono text-rose-300 mt-0.5 block tabular-nums">
                {GPGP_KEY_STATS.fishingGearMassPercent}% Ghost Fishing Gear
              </span>
              <span className="text-[11px] text-slate-400">Commercial maritime lines & nets</span>
            </div>
          </div>
        </section>

        {/* Primary Interactive GIS Map Viewport */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Geospatial Cartography & Hydrodynamic Vector Stage
              </h2>
            </div>
            <div className="text-xs text-slate-400 hidden sm:block">
              Coordinates: <span className="text-cyan-400 font-mono">110°E — 110°W</span> · Drag to Pan, Scroll to Zoom
            </div>
          </div>

          <GisMapCanvas
            timelineYear={timelineYear}
            predictionScenario={predictionScenario}
            activeChapter={activeChapter}
          />
        </section>

        {/* Temporal Scrubber & Predictive Modeling Bar (1980 - 2050) */}
        <section>
          <TimelineScrubber
            currentYear={timelineYear}
            onYearChange={setTimelineYear}
            scenario={predictionScenario}
            onScenarioChange={setPredictionScenario}
          />
        </section>

        {/* 7-Chapter Academic Story Deck */}
        <section className="pt-2">
          <StoryChapters
            activeChapter={activeChapter}
            onSelectChapter={setActiveChapter}
          />
        </section>
      </main>

      {/* Disciplined Academic Footer (Anti-slop: zero fake tickers) */}
      <footer className="mt-12 border-t border-slate-800 bg-[#040812] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">The Great Pacific Garbage Patch</span>
            <span>·</span>
            <span>By Abhishek Mishra</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsCitationsOpen(true)}
              className="hover:text-cyan-300 transition-colors"
            >
              Academic Citations
            </button>
            <span>·</span>
            <button
              onClick={() => setIsExportSummaryOpen(true)}
              className="hover:text-cyan-300 transition-colors"
            >
              Export Report
            </button>
            <span>·</span>
            <span className="text-slate-500 font-mono">Sources: NOAA · UNEP · Nature Scientific Reports</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CitationsModal
        isOpen={isCitationsOpen}
        onClose={() => setIsCitationsOpen(false)}
      />

      <ExportSummaryModal
        isOpen={isExportSummaryOpen}
        onClose={() => setIsExportSummaryOpen(false)}
        timelineYear={timelineYear}
        scenario={predictionScenario}
      />
    </div>
  );
}
