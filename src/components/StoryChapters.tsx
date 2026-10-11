import React, { useState } from 'react';
import {
  GPGP_KEY_STATS,
  COMPARATIVE_AREAS,
  OCEAN_CURRENTS,
  FIVE_GYRES,
  SIZE_FRACTIONS,
  MATERIAL_COMPOSITION,
  DEGRADATION_TIMELINE,
  TROPHIC_CHAIN,
  TOP_RIVERS,
  SOLUTIONS_DATA,
  SCIENTIFIC_CITATIONS,
} from '../data/oceanData';
import {
  Compass,
  Wind,
  Layers,
  ArrowRight,
  Fish,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Scale,
  Shield,
  Clock,
  Sparkles,
} from 'lucide-react';

interface StoryChaptersProps {
  activeChapter: number;
  onSelectChapter: (ch: number) => void;
  onHighlightMap?: (type: string) => void;
}

export const StoryChapters: React.FC<StoryChaptersProps> = ({
  activeChapter,
  onSelectChapter,
}) => {
  // Local state for chapter interactive widgets
  const [selectedSizeCat, setSelectedSizeCat] = useState<string>('Mega-plastics');
  const [selectedTrophicLevel, setSelectedTrophicLevel] = useState<number>(3);
  const [selectedCompArea, setSelectedCompArea] = useState<string>('France');
  const [activeDebateSide, setActiveDebateSide] = useState<'cleanup' | 'prevention'>('prevention');

  return (
    <div className="w-full space-y-6">
      {/* CHAPTER 1: LOCATION & EXTENT */}
      {activeChapter === 1 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 01</span>
              <span>·</span>
              <span>Spatial Bounds & Oceanographic Extent</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Location, True Extent, and Dispelling the "Trash Island" Myth
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              The Great Pacific Garbage Patch (GPGP) is located in the high seas of the North Pacific
              Subtropical Gyre, roughly positioned between Hawaii and California (extending from
              approximately 135°W to 155°W and 35°N to 42°N for the eastern core, and east of Japan for the
              western patch). Spanning approximately <strong className="text-white">1.6 million square kilometers</strong>,
              it represents the planet's largest oceanic accumulation of synthetic polymers.
            </p>

            {/* The Critical Myth-Buster Callout */}
            <div className="mt-5 p-4 rounded-lg bg-[#050a14] border border-cyan-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-white">
                    Geography Sentinel: It is NOT a Solid "Floating Island"
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Satellite radar and visible photography cannot detect a solid mass because one does
                    not exist. Instead, the patch is a diffuse, semi-transparent{' '}
                    <strong className="text-cyan-300">"plastic soup"</strong> suspended in the upper 5
                    meters of the water column. While large fishing ghost nets and crates float on the
                    surface, over <strong className="text-cyan-300">94% of the 1.8 trillion pieces</strong>{' '}
                    are millimeter-scale microplastic confetti, giving the water a cloudy texture rather than
                    a walkable surface.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Size Comparison Calculator */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h3 className="text-sm font-bold text-slate-200">
                  Spatial Scale Comparison (GPGP = 1,600,000 km²)
                </h3>
                <div className="flex items-center gap-1.5 text-xs">
                  {COMPARATIVE_AREAS.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedCompArea(c.name)}
                      className={`px-2.5 py-1 rounded transition-colors ${
                        selectedCompArea === c.name
                          ? 'bg-slate-700 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200 bg-[#050a14]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const activeComp =
                  COMPARATIVE_AREAS.find((c) => c.name === selectedCompArea) || COMPARATIVE_AREAS[0];
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#050a14] p-3.5 rounded-lg border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px] font-mono">SELECTED ENTITY</span>
                      <span className="text-base font-bold text-white mt-0.5 block">
                        {activeComp.name}
                      </span>
                      <span className="text-slate-400 font-mono text-[11px]">
                        {activeComp.areaKm2.toLocaleString()} km²
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-mono">COMPARATIVE RATIO</span>
                      <span className="text-base font-bold text-cyan-300 mt-0.5 block font-mono">
                        {activeComp.multiplier}x Larger
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        GPGP encompasses ~{activeComp.multiplier} of this landmass
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px] font-mono">CARTOGRAPHIC NOTE</span>
                      <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                        Boundaries are dynamic gradient zones shifting seasonally with subtropical wind
                        shifts, not fixed sovereign borders.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 01 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                The Great Pacific Garbage Patch is an immense 1.6M km² diffuse oceanic soup spanning
                nearly three times the territory of France, characterized by fuzzy gradient boundaries
                rather than an impermeable solid mass.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 2: WHY IT FORMS (GYRE OCEANOGRAPHY & CORIOLIS) */}
      {activeChapter === 2 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 02</span>
              <span>·</span>
              <span>Oceanographic Dynamics & Coriolis Mechanics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Why It Forms: The Physics of the North Pacific Subtropical Gyre
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              Oceanic garbage patches are not accidental litter dumps; they are the direct consequence of
              planetary atmospheric and hydrodynamic physics. In the North Pacific, a massive system of
              rotating ocean currents—driven by global wind belts and Earth's rotation—creates a natural
              funnel that traps and retains buoyant materials for decades.
            </p>

            {/* The 4 Perimeter Currents Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {OCEAN_CURRENTS.map((c) => (
                <div key={c.id} className="bg-[#050a14] p-3.5 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                        c.temp === 'Warm'
                          ? 'bg-rose-500/20 text-rose-300'
                          : c.temp === 'Cold'
                          ? 'bg-sky-500/20 text-sky-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {c.temp} · {c.speed}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-300 leading-relaxed">{c.role}</p>
                  <span className="text-[11px] text-slate-500 font-mono mt-1.5 block">
                    Trajectory: {c.direction}
                  </span>
                </div>
              ))}
            </div>

            {/* Coriolis & Ekman Transport Physics Walkthrough */}
            <div className="mt-5 p-4 rounded-lg bg-[#050a14] border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Wind className="w-4 h-4 text-cyan-400" />
                <span>The Coriolis Effect & Ekman Transport Convergence</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300 leading-relaxed">
                <div>
                  <strong className="text-white block font-mono text-[11px]">
                    1. TRADE WINDS & WESTERLIES
                  </strong>
                  Trade winds blow westward in the tropics; prevailing westerlies blow eastward at mid-latitudes,
                  establishing a massive clockwise rotational wind stress across the Pacific.
                </div>
                <div>
                  <strong className="text-white block font-mono text-[11px]">
                    2. EKMAN TRANSPORT DEFLECTION
                  </strong>
                  Earth's rotation induces the Coriolis force, deflecting moving surface water 90° to the
                  right in the Northern Hemisphere, continuously pushing water inward toward the center.
                </div>
                <div>
                  <strong className="text-white block font-mono text-[11px]">
                    3. SUBTROPICAL HIGH DOLDRUMS
                  </strong>
                  The convergent water creates a subtle dome of high pressure. Calm center winds and weak
                  horizontal gradients ensure trapped buoyant debris cannot easily escape.
                </div>
              </div>
            </div>

            {/* Comparison to Other 4 Major Oceanic Gyres */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-200 mb-2">
                Global Context: The World's 5 Major Subtropical Gyres
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800">
                  <thead className="bg-[#050a14] text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-2.5">Gyre System</th>
                      <th className="p-2.5">Est. Area</th>
                      <th className="p-2.5">Plastic Mass</th>
                      <th className="p-2.5">Particle Count</th>
                      <th className="p-2.5">Key Dynamics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {FIVE_GYRES.map((g) => (
                      <tr
                        key={g.name}
                        className={g.name.includes('North Pacific') ? 'bg-cyan-950/20 font-semibold' : ''}
                      >
                        <td className="p-2.5 text-white font-sans">{g.name}</td>
                        <td className="p-2.5 tabular-nums">{(g.areaKm2 / 1000).toFixed(0)}k km²</td>
                        <td className="p-2.5 tabular-nums text-amber-300">
                          {g.estimatedTonnes.toLocaleString()} t
                        </td>
                        <td className="p-2.5 tabular-nums text-cyan-300">
                          {g.particleCountTrillions.toFixed(2)} T
                        </td>
                        <td className="p-2.5 font-sans text-slate-400 text-[11px]">
                          {g.keyCharacteristic}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 02 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                The patch is created by physical planetary mechanics: clockwise wind friction combined with
                Coriolis-driven Ekman transport drives surface waters and floating plastics inward into a
                calm, high-pressure oceanic dead-zone.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 3: WHAT'S IN IT (DEBRIS TAXONOMY & POLYMERS) */}
      {activeChapter === 3 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 03</span>
              <span>·</span>
              <span>Debris Taxonomy, Polymers & Photodegradation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              What's In It: Ghost Nets Mass Dominance vs Microplastic Count
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              Scientific surveys published by Lebreton et al. (2018) revealed a stark duality: while
              millimeter-sized microplastics account for over 94% of all floating pieces by count,{' '}
              <strong className="text-white">commercial fishing gear and ghost nets make up roughly 46% to 79% of the total mass</strong>.
            </p>

            {/* Visual Real Imagery Showcase with Captions */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#050a14] rounded-lg overflow-hidden border border-slate-800">
                <div className="relative aspect-4/3 bg-slate-900">
                  <img
                    src="/src/assets/images/ghost_net_debris_1791712295357.jpg"
                    alt="Marine ghost net floating in Pacific Gyre"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300">
                    MACROPLASTIC MASS LEADER (46%)
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-white">
                    Abandoned Commercial Fishing Gear ("Ghost Nets")
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Massive bundles of braided polypropylene and nylon gillnets lost or discarded by
                    high-seas fleets. They drift indefinitely, snaring sea turtles and marine mammals.
                  </p>
                </div>
              </div>

              <div className="bg-[#050a14] rounded-lg overflow-hidden border border-slate-800">
                <div className="relative aspect-4/3 bg-slate-900">
                  <img
                    src="/src/assets/images/microplastic_sample_1791712307559.jpg"
                    alt="Neuston net microplastic sample on grid"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-amber-300">
                    PARTICLE COUNT LEADER (94%)
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-white">
                    Neuston Net Microplastic Sampling Tray (&lt; 5 mm)
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                    Primary pre-production resin nurdles and brittle secondary fragments generated by
                    photochemical cleavage under harsh equatorial UV solar radiation.
                  </p>
                </div>
              </div>
            </div>

            {/* Size Fraction Matrix Interactivity */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-3">
                Size Fraction Breakdown: Mass vs Count Duality
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {SIZE_FRACTIONS.map((sf) => (
                  <button
                    key={sf.category}
                    onClick={() => setSelectedSizeCat(sf.category)}
                    className={`p-2.5 rounded-lg text-left transition-colors border ${
                      selectedSizeCat === sf.category
                        ? 'bg-slate-800 border-cyan-500 text-white'
                        : 'bg-[#050a14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[11px] font-mono block text-slate-400">{sf.sizeRange}</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{sf.category}</span>
                    <div className="mt-1 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-400">Mass: {sf.massPercent}%</span>
                      <span className="text-cyan-400">Count: {sf.countPercent}%</span>
                    </div>
                  </button>
                ))}
              </div>

              {(() => {
                const activeFraction =
                  SIZE_FRACTIONS.find((s) => s.category === selectedSizeCat) || SIZE_FRACTIONS[0];
                return (
                  <div className="bg-[#050a14] p-3 rounded-lg border border-slate-800 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2 mb-2">
                      <span className="font-bold text-white">
                        {activeFraction.category} ({activeFraction.sizeRange})
                      </span>
                      <span className="text-slate-400">
                        Represents <strong className="text-amber-300">{activeFraction.massPercent}%</strong> of total weight, but{' '}
                        <strong className="text-cyan-300">{activeFraction.countPercent}%</strong> of all pieces
                      </span>
                    </div>
                    <p className="text-slate-300">{activeFraction.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-slate-500">Typical debris examples:</span>
                      {activeFraction.typicalItems.map((item) => (
                        <span key={item} className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Polymer Material Composition */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-2">
                Predominant Polymer Chemistry & Buoyancy
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Polymers that float in seawater must possess densities lower than oceanic saltwater (~1.025 g/cm³).
                Hence, Polyethylene (PE) and Polypropylene (PP) represent over 86% of the patch mass.
              </p>
              <div className="space-y-2">
                {MATERIAL_COMPOSITION.map((m) => (
                  <div key={m.name} className="bg-[#050a14] p-2.5 rounded border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-white">{m.name}</span>
                      <span className="font-mono text-cyan-300">{m.massPercent}% by Mass</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${m.massPercent}%`, backgroundColor: m.color }}
                      />
                    </div>
                    <p className="text-slate-300 text-[11px]">{m.description}</p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      Common sources: {m.commonOrigin}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 03 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                By weight, ghost fishing gear dominates the patch (~46–79%), but by piece count, 94% are
                buoyant polyolefin microplastics created as sunlight photochemically fragments macroplastics
                into perpetual micro-confetti.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 4: JOURNEY OF PLASTIC & RIVER CORRIDORS */}
      {activeChapter === 4 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 04</span>
              <span>·</span>
              <span>Source Hydrology & Marine Degradation Timeline</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              The Journey of Plastic: From Inland Cities to Ocean Gyre
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              Plastic debris follows a multi-stage geographic migration: estimated at{' '}
              <strong className="text-white">75%–80% from land-based municipal runoff</strong> carried by major
              river systems, and <strong className="text-white">20%–25% from commercial fishing vessels, cargo losses, and aquaculture</strong>.
            </p>

            {/* Migration Flow Diagram */}
            <div className="mt-5 p-4 rounded-lg bg-[#050a14] border border-slate-800">
              <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
                Four-Stage Migration Pathway
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 font-mono text-[10px] block">STAGE 1 · LAND</span>
                  <strong className="text-white text-xs block mt-1">Consumer & Industrial Waste</strong>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Mismanaged plastic packaging discarded in dense urban drainage basins without sealed landfills.
                  </p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 font-mono text-[10px] block">STAGE 2 · RIVERS</span>
                  <strong className="text-white text-xs block mt-1">Fluvial Transport Arteries</strong>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Monsoonal rain surges flush debris through rivers (Yangtze, Pasig, Ganges) out to sea.
                  </p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 font-mono text-[10px] block">STAGE 3 · COASTAL JET</span>
                  <strong className="text-white text-xs block mt-1">Boundary Current Conveyor</strong>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Kuroshio and California boundary currents entrain buoyant items over 1 to 3 years.
                  </p>
                </div>
                <div className="bg-slate-900 p-3 rounded border border-slate-800">
                  <span className="text-cyan-400 font-mono text-[10px] block">STAGE 4 · GYRE TRAP</span>
                  <strong className="text-white text-xs block mt-1">Subtropical Dead-Zone</strong>
                  <p className="text-slate-400 text-[11px] mt-1">
                    Ekman transport funnels debris into the high-pressure center with residence times &gt; 50 years.
                  </p>
                </div>
              </div>
            </div>

            {/* Top 10 Polluting Rivers Table */}
            <div className="mt-5 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-slate-200 mb-2">
                Major River Outflows Supplying Oceanic Plastics (Schmidt et al. 2017)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-800">
                  <thead className="bg-[#050a14] text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-2">River System</th>
                      <th className="p-2">Country / Basin</th>
                      <th className="p-2">Annual Mass Flux</th>
                      <th className="p-2">Outflow Ocean</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {TOP_RIVERS.map((r) => (
                      <tr key={r.name} className="hover:bg-slate-900/40">
                        <td className="p-2 text-white font-sans font-semibold">{r.name}</td>
                        <td className="p-2">{r.country}</td>
                        <td className="p-2 text-rose-300 font-bold">{r.annualTonnage}</td>
                        <td className="p-2 text-slate-400 font-sans">{r.oceanBasin}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Polymer Degradation Lifetime Chart */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-2">
                Marine Environmental Persistence: How Long Plastics Last
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Plastics never truly biodegrade in cold, saline marine environments—they simply photo-oxidize
                into progressively smaller, biologically accessible microplastics.
              </p>
              <div className="space-y-2">
                {DEGRADATION_TIMELINE.map((d) => (
                  <div key={d.item} className="bg-[#050a14] p-2.5 rounded border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-white block">{d.item}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{d.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-400 font-bold font-mono text-sm">~{d.years} Years</span>
                      <span className="text-[10px] text-slate-500 block">Est. Marine Half-life</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 04 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                Roughly 80% of marine plastic originates from land, funneled by a handful of major river
                basins before entering trans-oceanic boundary currents. Monofilament lines and PET bottles
                endure for 450 to 600 years in the gyre without biological decomposition.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 5: ECOLOGICAL & TROPHIC IMPACTS */}
      {activeChapter === 5 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 05</span>
              <span>·</span>
              <span>Marine Trophic Cascades & Bioaccumulation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ecological Impacts: From Zooplankton to Seabirds and Humans
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              Marine plastic pollution does not remain passive debris. It penetrates every trophic level of
              the marine food web through physical obstruction, bioaccumulation of hydrophobic toxins, and
              the creation of artificial rafting ecosystems known as the "Plastisphere."
            </p>

            {/* Midway Atoll Case Study Spotlight with Photo */}
            <div className="mt-5 bg-[#050a14] rounded-lg overflow-hidden border border-slate-800 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="/src/assets/images/albatross_midway_1791712320793.jpg"
                    alt="Laysan albatross chick nest with plastic debris on Midway Atoll"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-rose-300">
                    ECOLOGICAL SENTINEL SITE
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="text-base font-bold text-white">
                    Midway Atoll & The Laysan Albatross (*Phoebastria immutabilis*)
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Midway Atoll, situated 2,000 miles from any continent in the Northwestern Hawaiian
                    Islands, sits directly in the path of the Subtropical Convergence Zone. Over{' '}
                    <strong className="text-rose-400">98% of albatross chicks</strong> examined by biologists
                    contain plastic debris in their stomachs.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Adult albatrosses forage on flying fish eggs that attach to floating plastics. Parents
                    regurgitate bottle caps, disposable lighters, and glow sticks into chick bellies, causing
                    false satiation, internal ulceration, and dehydration deaths.
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-cyan-300">
                    Documented: ~5 tons of plastic brought ashore to chicks every nesting season.
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive 5-Level Trophic Web Model */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-2">
                Trophic Chain Bioaccumulation & Chemical Sorption
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Hydrophobic Persistent Organic Pollutants (POPs such as PCBs, DDT, and dioxins) adsorb to
                floating plastics at concentrations up to 1,000,000 times higher than surrounding seawater.
              </p>

              {/* Trophic Level Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-3">
                {TROPHIC_CHAIN.map((t) => (
                  <button
                    key={t.level}
                    onClick={() => setSelectedTrophicLevel(t.level)}
                    className={`p-2 rounded text-left transition-colors border ${
                      selectedTrophicLevel === t.level
                        ? 'bg-slate-800 border-cyan-500 text-white'
                        : 'bg-[#050a14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-cyan-400 block">LEVEL {t.level}</span>
                    <span className="text-xs font-bold text-white block mt-0.5 truncate">{t.name}</span>
                    <span className="text-[10px] text-amber-400 font-mono block mt-1">
                      {t.bioaccumulationFactor}
                    </span>
                  </button>
                ))}
              </div>

              {(() => {
                const activeLevel =
                  TROPHIC_CHAIN.find((t) => t.level === selectedTrophicLevel) || TROPHIC_CHAIN[2];
                return (
                  <div className="bg-[#050a14] p-3.5 rounded-lg border border-slate-800 text-xs space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                      <span className="font-bold text-white text-sm">
                        Level {activeLevel.level}: {activeLevel.name}
                      </span>
                      <span className="font-mono text-amber-300 text-xs">
                        Trophic Concentration: {activeLevel.bioaccumulationFactor}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] block">REPRESENTATIVE TAXA</span>
                        <span className="text-slate-200 font-medium">{activeLevel.organism}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] block">PLASTIC EXPOSURE VECTOR</span>
                        <span className="text-slate-300">{activeLevel.plasticEncounter}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-mono text-[10px] block">PHYSIOLOGICAL MECHANISM</span>
                        <span className="text-rose-300">{activeLevel.hazardMechanism}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* The Plastisphere & Invasive Rafting */}
            <div className="mt-5 p-3.5 bg-[#050a14] rounded-lg border border-slate-800 text-xs">
              <h4 className="font-bold text-white text-xs mb-1">
                The "Plastisphere" & Trans-Oceanic Biological Rafting
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Unlike natural organic debris (wood, pumice) which rots in months, durable plastics provide
                permanent floating substrates. Over 400 species of coastal invertebrates, bryozoans, and
                toxic red-tide dinoflagellates have been documented hitchhiking across the Pacific Gyre,
                threatening fragile island ecosystems with biological invasions.
              </p>
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 05 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                Plastics act as sponge-like chemical vectors concentrating toxic pollutants by 1,000,000x,
                ascending from lanternfish to commercial pelagic predators (tuna) and devastating seabird
                populations on remote Pacific atolls.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 6: SCIENTIFIC DATA & BENCHMARK STUDIES */}
      {activeChapter === 6 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 06</span>
              <span>·</span>
              <span>Empirical Field Studies & Methodology</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Data & Benchmarks: Lebreton et al. (2018) vs Earlier Trawls
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              In 2018, an international team led by oceanographer Laurent Lebreton published a groundbreaking
              study in <em>Scientific Reports</em> (Nature). Combining multi-vessel manta trawls with aerial
              LiDAR imaging across 300+ ocean square kilometers, they proved earlier scientific estimates
              severely understated the total plastic volume.
            </p>

            {/* 2018 Methodology Breakthrough */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#050a14] p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="text-amber-400 font-mono text-[11px] block font-bold">
                  TRADITIONAL NET-TOW LIMITATION
                </span>
                <h4 className="text-sm font-bold text-white">Why Previous Models Missed 80% of Mass</h4>
                <p className="text-slate-300 leading-relaxed">
                  Earlier ocean expeditions relied solely on small Manta/Neuston surface nets with a 0.5-meter
                  mouth width. While nets caught millions of tiny microplastics, their small apertures
                  systematically missed large, widely dispersed mega-plastics like 500-kg ghost nets and
                  crushed container boxes that account for the lion's share of total weight.
                </p>
              </div>

              <div className="bg-[#050a14] p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-mono text-[11px] block font-bold">
                  2018 AERIAL + MULTI-VESSEL BREAKTHROUGH
                </span>
                <h4 className="text-sm font-bold text-white">Aerial LiDAR & Hercules C-130 Transects</h4>
                <p className="text-slate-300 leading-relaxed">
                  By flying low-altitude aerial surveys over the core patch combined with 18 research vessel
                  transects, Lebreton et al. calibrated mathematical debris dispersal curves. They revised the
                  total estimated plastic mass to <strong className="text-white">79,000 tonnes</strong>—4 to 16
                  times greater than prior published models.
                </p>
              </div>
            </div>

            {/* Comparative Studies Citation Table */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-2">
                Core Academic Literature Citations
              </h3>
              <div className="space-y-2.5">
                {SCIENTIFIC_CITATIONS.map((cit, idx) => (
                  <div key={idx} className="bg-[#050a14] p-3 rounded-lg border border-slate-800 text-xs">
                    <p className="font-semibold text-slate-200">{cit.citation}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-mono text-cyan-400">
                      <span>DOI: {cit.doi}</span>
                    </div>
                    <p className="mt-1 text-slate-400 text-[11px] leading-relaxed">
                      {cit.relevance}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 06 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                Modern aerial reconnaissance surveys proved that legacy net tows overlooked dense mega-plastics.
                The patch contains at least 79,000 tonnes—exponentially higher than historic models estimated.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CHAPTER 7: SOLUTIONS, GOVERNANCE & CRITICAL DEBATE */}
      {activeChapter === 7 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-[#091322] border border-slate-800 rounded-xl p-5 sm:p-6 shadow-md">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-mono uppercase tracking-wider mb-2">
              <span>Chapter 07</span>
              <span>·</span>
              <span>Mitigation Interventions & The Critical Policy Debate</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Solutions & Action: Ocean Cleanup vs Upstream Prevention Debate
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-4xl">
              Addressing oceanic plastic pollution requires tackling both the 80,000 tonnes of legacy debris
              currently adrift in the Pacific and the continuous torrent of 11 million tonnes of new plastic
              entering global waterways each year. Geography and environmental economics demand a balanced
              critique of each strategy.
            </p>

            {/* Ocean Cleanup System 03 Photo Spotlight */}
            <div className="mt-5 bg-[#050a14] rounded-lg overflow-hidden border border-slate-800 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-slate-900 border border-slate-800">
                  <img
                    src="/src/assets/images/ocean_cleanup_system_1791712332156.jpg"
                    alt="The Ocean Cleanup System 03 deployed in North Pacific"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300">
                    SYSTEM 03 RETENTION BARRIER
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="text-base font-bold text-white">
                    Active Offshore Remediation: The Ocean Cleanup System 03
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    System 03 consists of a 2.5-km-long floating U-shaped containment barrier towed at 1.5 knots
                    between two offshore vessels. It channels surface debris into a central retention zone
                    (the "Retention Zone") for extraction and subsequent recycling on land.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Over 500,000 pounds of macroplastic have been successfully harvested. However, scientists
                    critique its carbon emissions and argue that offshore remediation cannot outpace land outflows.
                  </p>
                </div>
              </div>
            </div>

            {/* The 3 Mitigation Tiers Matrix */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 mb-3">
                Tripartite Mitigation Framework
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {SOLUTIONS_DATA.map((sol) => (
                  <div key={sol.id} className="bg-[#050a14] p-3.5 rounded-lg border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block font-semibold">
                        {sol.type}
                      </span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{sol.title}</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{sol.mechanism}</p>

                      <div className="mt-3 space-y-1 text-[11px]">
                        <span className="text-emerald-400 font-semibold block">Key Advantages:</span>
                        {sol.pros.slice(0, 2).map((p, i) => (
                          <div key={i} className="flex items-start gap-1 text-slate-300">
                            <span className="text-emerald-400">✓</span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 space-y-1 text-[11px]">
                        <span className="text-amber-400 font-semibold block">Limitations:</span>
                        {sol.cons.slice(0, 2).map((c, i) => (
                          <div key={i} className="flex items-start gap-1 text-slate-400">
                            <span className="text-amber-400">⚠</span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
                      Est. Cost: <span className="text-white font-bold">{sol.costPerTonne}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Critical Academic Debate Panel */}
            <div className="mt-6 p-4 rounded-lg bg-[#050a14] border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span>The Geography Classroom Debate: Cleanup vs Prevention</span>
                </h4>
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => setActiveDebateSide('cleanup')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeDebateSide === 'cleanup'
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Argument: Active Cleanup
                  </button>
                  <button
                    onClick={() => setActiveDebateSide('prevention')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      activeDebateSide === 'prevention'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Argument: Upstream Prevention
                  </button>
                </div>
              </div>

              {activeDebateSide === 'cleanup' ? (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>
                    <strong className="text-white">Why offshore cleanup is essential:</strong> Ghost fishing
                    nets and macroplastics already adrift will continue photolyzing into trillions of toxic
                    microplastic shards if left unharvested. Upstream policy changes cannot save marine life from
                    the 80,000 tonnes already circulating in the gyre.
                  </p>
                </div>
              ) : (
                <div className="text-xs text-slate-300 space-y-2">
                  <p>
                    <strong className="text-white">Why upstream prevention is the true solution:</strong> Cleaning
                    the ocean while millions of tonnes enter annually is like "bailing out a flooding sink without
                    turning off the faucet." Stopping river outflows via solar interceptors and capping virgin
                    plastics under the UN Global Plastics Treaty costs 90% less per tonne and prevents emissions.
                  </p>
                </div>
              )}
            </div>

            {/* Key Takeaway Box */}
            <div className="mt-6 p-3.5 bg-cyan-950/20 border-l-2 border-cyan-500 rounded-r-lg">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                Chapter 07 Key Takeaway
              </span>
              <p className="text-xs text-cyan-100/90 mt-1 leading-relaxed">
                Neither strategy succeeds alone: offshore extraction must retrieve legacy ghost nets before they
                photodegrade into microplastics, while legally binding upstream caps and automated river barriers
                turn off the influx at the source.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Chapter Navigation Stepper Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => onSelectChapter(Math.max(1, activeChapter - 1))}
          disabled={activeChapter === 1}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous Chapter
        </button>

        <div className="text-xs text-slate-400 font-mono">
          Chapter {activeChapter} of 7
        </div>

        <button
          onClick={() => onSelectChapter(Math.min(7, activeChapter + 1))}
          disabled={activeChapter === 7}
          className="px-4 py-2 text-xs font-semibold rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
        >
          <span>Next Chapter</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
