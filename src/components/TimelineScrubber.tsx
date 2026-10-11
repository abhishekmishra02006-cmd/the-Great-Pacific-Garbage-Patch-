import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, TrendingUp, ShieldCheck, AlertTriangle } from 'lucide-react';
import { TIMELINE_DATA, TimelineDataPoint } from '../data/oceanData';

interface TimelineScrubberProps {
  currentYear: number;
  onYearChange: (year: number) => void;
  scenario: 'status-quo' | 'mitigation-treaty';
  onScenarioChange: (scenario: 'status-quo' | 'mitigation-treaty') => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  currentYear,
  onYearChange,
  scenario,
  onScenarioChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState<number>(1);

  // Playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        const years = TIMELINE_DATA.map((d) => d.year);
        const currentIdx = years.indexOf(currentYear);
        if (currentIdx === -1 || currentIdx >= years.length - 1) {
          setIsPlaying(false);
        } else {
          onYearChange(years[currentIdx + 1]);
        }
      }, 1000 / playSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, playSpeed, currentYear, onYearChange]);

  // Find active data point (exact or closest interpolated)
  const currentData: TimelineDataPoint =
    TIMELINE_DATA.find((d) => d.year === currentYear) ||
    TIMELINE_DATA.reduce((prev, curr) =>
      Math.abs(curr.year - currentYear) < Math.abs(prev.year - currentYear) ? curr : prev
    );

  const activeTonnes =
    scenario === 'status-quo' ? currentData.statusQuoTonnes : currentData.mitigationTonnes;
  const activeTrillions =
    scenario === 'status-quo' ? currentData.statusQuoTrillions : currentData.mitigationTrillions;

  // Baseline 2018 is 79,000 tonnes
  const deltaVs2018 = (((activeTonnes - 79000) / 79000) * 100).toFixed(0);

  return (
    <div className="w-full bg-[#091322] border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg">
      {/* Header Bar with Mode Switcher & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Temporal Modeling & Accumulation Dynamics
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-cyan-400 font-mono">1980 — 2050 Model</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-0.5">
            Year {currentYear} Multi-Decade Simulation
          </h3>
        </div>

        {/* Scenario Toggle */}
        <div className="flex items-center gap-1 bg-[#050a14] p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => onScenarioChange('status-quo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              scenario === 'status-quo'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Status Quo (+3.8%/yr)</span>
          </button>
          <button
            onClick={() => onScenarioChange('mitigation-treaty')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              scenario === 'mitigation-treaty'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>UN Treaty & River Interceptors</span>
          </button>
        </div>
      </div>

      {/* Main Scrubber Control Row */}
      <div className="space-y-3">
        {/* Timeline Slider with Years */}
        <div className="relative pt-2 pb-1">
          <input
            type="range"
            min={1980}
            max={2050}
            step={1}
            value={currentYear}
            onChange={(e) => {
              onYearChange(Number(e.target.value));
              if (isPlaying) setIsPlaying(false);
            }}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />

          {/* Notch Markers for Key Scientific Years */}
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1.5 px-0.5">
            {TIMELINE_DATA.map((d) => (
              <button
                key={d.year}
                onClick={() => onYearChange(d.year)}
                className={`transition-colors hover:text-cyan-300 ${
                  currentYear === d.year
                    ? 'text-cyan-400 font-bold underline decoration-cyan-400 decoration-2 underline-offset-4'
                    : ''
                }`}
              >
                {d.year}
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls & Milestone Annotation */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Play Simulation</span>
                </>
              )}
            </button>

            <button
              onClick={() => onYearChange(1980)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
              title="Reset to 1980"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Speed Multiplier */}
            <div className="flex items-center gap-1 bg-[#050a14] px-1.5 py-0.5 rounded border border-slate-800 text-xs">
              <span className="text-slate-500 text-[11px]">Speed:</span>
              {[1, 2, 5].map((spd) => (
                <button
                  key={spd}
                  onClick={() => setPlaySpeed(spd)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    playSpeed === spd
                      ? 'bg-slate-700 text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          {/* Research Milestone Highlight */}
          <div className="text-xs text-slate-300 max-w-xl flex items-center gap-2 bg-[#050a14] px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-cyan-400 font-mono font-bold shrink-0">{currentData.year}:</span>
            <span className="truncate">{currentData.milestone}</span>
          </div>
        </div>
      </div>

      {/* Telemetry Metric Readout Cards (Tabular figures) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-800">
        <div className="bg-[#050a14] p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
            Accumulated Plastic Mass
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-white">
              {activeTonnes.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-400">tonnes</span>
          </div>
          <span
            className={`text-[10px] font-mono mt-0.5 block ${
              Number(deltaVs2018) > 0 ? 'text-rose-400' : 'text-emerald-400'
            }`}
          >
            {Number(deltaVs2018) > 0 ? `+${deltaVs2018}%` : `${deltaVs2018}%`} vs 2018 benchmark
          </span>
        </div>

        <div className="bg-[#050a14] p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
            Floating Particle Count
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-cyan-300">
              {activeTrillions.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-400">Trillion pieces</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
            94% microplastics (&lt;5mm)
          </span>
        </div>

        <div className="bg-[#050a14] p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
            Global Production Rate
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-amber-300">
              {currentData.globalProductionMt}
            </span>
            <span className="text-xs font-mono text-slate-400">Million tonnes/yr</span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
            Polymer & additive flux
          </span>
        </div>

        <div className="bg-[#050a14] p-3 rounded-lg border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-mono">
            Trajectory Forecast
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={`text-lg sm:text-xl font-bold font-mono ${
                scenario === 'status-quo' ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {scenario === 'status-quo' ? 'Uncontrolled Swell' : 'Net Depletion'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 block font-mono mt-0.5 truncate">
            {scenario === 'status-quo' ? 'Doubling by 2045' : 'Treaty cap + river barrier'}
          </span>
        </div>
      </div>
    </div>
  );
};
