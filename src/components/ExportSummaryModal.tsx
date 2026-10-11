import React, { useState } from 'react';
import { X, Check, Copy, Download, FileText } from 'lucide-react';
import { GPGP_KEY_STATS } from '../data/oceanData';

interface ExportSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  timelineYear: number;
  scenario: 'status-quo' | 'mitigation-treaty';
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({
  isOpen,
  onClose,
  timelineYear,
  scenario,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const summaryMarkdown = `# Academic Briefing: Great Pacific Garbage Patch (GPGP)
Course: Marine & Physical Geography
Topic: North Pacific Subtropical Gyre Plastic Accumulation Dynamics

## 1. Executive Summary & Core Metrics
- Surface Area: 1.6 Million km² (approximately 2.5x the size of France / 2.3x Texas)
- Estimated Mass: 79,000 to 100,000 metric tonnes (Lebreton et al. 2018)
- Particle Count: 1.8 Trillion floating plastic fragments
- Count Duality: 94% of pieces are microplastics (<5 mm); 46% of total mass is commercial fishing gear / ghost nets.
- Spatial Reality: Not a solid island, but a diffuse, cloudy "plastic soup" concentrated in the upper 5 meters of the neuston layer.

## 2. Oceanographic & Physical Mechanics
- Gyre Structure: North Pacific Subtropical Gyre bounded by 4 perimeter currents:
  1. Kuroshio Current (Warm western jet carrying East Asian coastal outflow)
  2. North Pacific Current (Trans-oceanic eastward transition)
  3. California Current (Cool eastern boundary current flowing southward)
  4. North Equatorial Current (Warm trade-wind-driven return flow)
- Coriolis Effect: Causes 90° rightward deflection in Northern Hemisphere surface water (Ekman transport), piling water into a central high-pressure lens.
- Subtropical High: Calm winds and weak horizontal pressure gradients trap buoyant polymers with residence times exceeding 50 years.

## 3. Hydrological Sources & Polymer Chemistry
- Origin Breakdown: ~80% land-based municipal runoff (funneled via major rivers such as the Yangtze, Indus, Yellow, and Pasig), ~20% maritime (commercial fishing gear, container loss).
- Predominant Polymers: Polyethylene (PE) and Polypropylene (PP) comprise >86% of mass due to densities (<1.0 g/cm³) lower than seawater (1.025 g/cm³).
- Photodegradation: Sunlight UV cleavage fragments brittle plastics into millimeter-scale shards; items persist for 450 (PET bottles) to 600 (nylon line) years.

## 4. Trophic & Ecological Cascades
- Trophic Web: Microplastics -> Filter-feeding Zooplankton -> Mesopelagic Lanternfish (Myctophids) -> Pelagic Predators (Tuna, Mahi-Mahi) -> Seabirds & Humans.
- Midway Atoll Case Study: 98% of Laysan albatross chicks on Midway possess ingested plastics regurgitated by foraging parents, resulting in malnutrition and death.
- Chemical Sorption: Hydrophobic Persistent Organic Pollutants (POPs, PCBs, DDT) adsorb to plastics at concentrations up to 1,000,000x seawater baseline.
- The Plastisphere: Over 400 species raft on durable plastic debris across ocean basins as invasive vectors.

## 5. Model Projections (Active Simulation: Year ${timelineYear})
- Scenario: ${scenario === 'status-quo' ? 'Status Quo (+3.8% annual production growth)' : 'UN Treaty & 90% River Capture Mitigation'}
- Projected Trajectory: ${scenario === 'status-quo' ? 'Accumulation swells beyond 220,000 tonnes by 2050.' : 'GPGP mass reduces by ~60% with river interceptors and production caps.'}

## 6. Solutions & Policy Debate
- Downstream: Offshore retention barriers (The Ocean Cleanup System 03) retrieve legacy ghost nets and macro debris.
- Midstream: Automated solar river interceptors halt plastic at high-density river mouths.
- Upstream: UN Legally Binding Global Plastics Treaty enforcing caps on virgin resin and Extended Producer Responsibility (EPR).
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([summaryMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GPGP_Geography_Assignment_Briefing_${timelineYear}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081220] border border-slate-700 rounded-xl shadow-2xl p-5 sm:p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Assignment Briefing Report
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Formatted markdown summary for your geography submission
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

        <div className="mt-4">
          <pre className="p-3.5 bg-[#050a14] rounded-lg border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-80 whitespace-pre-wrap leading-relaxed select-all">
            {summaryMarkdown}
          </pre>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            Ready to paste into Google Docs or Word
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .MD</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
