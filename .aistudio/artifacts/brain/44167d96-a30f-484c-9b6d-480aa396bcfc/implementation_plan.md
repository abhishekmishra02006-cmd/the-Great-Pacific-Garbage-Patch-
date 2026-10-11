# GyreScope: Great Pacific Garbage Patch GIS & Oceanographic Story Dashboard

A comprehensive, research-grade geographic information dashboard and interactive narrative crafted for university-level geography, mapping the North Pacific Subtropical Gyre's plastic density, oceanic current mechanics, 1980–2050 accumulation predictions, trophic bioaccumulation, and mitigation policies.

### User Review & Critical Decisions

> [!IMPORTANT]
> The architectural and visual design specifications below directly incorporate the user's three confirmed choices from Phase 1:
> - **Satellite GIS Map**: High-contrast satellite basemap with multi-layer overlays (density hotspot heatmap, current vector streamlines, Eastern vs Western patch boundaries, and top river source outflow corridors).
> - **1980–2050 Accumulation Scrubber**: Interactive multi-decade predictive simulation modeling past accumulation (1980–2024 empirical data from Lebreton et al.) and future accumulation scenarios (2025–2050 Business-as-Usual vs UN Global Treaty & Active Cleanup interventions).
> - **Multi-Chapter Story Dashboard**: Structured into 7 navigable research chapters (Location & Extent, Gyre Physics & Coriolis, Debris Taxonomy & Degradation, Transport Corridors, Trophic Impacts, Empirical Trends & Studies, and Solutions & Debates).

- **Confirmed Decision 1**: Satellite imagery styling with calibrated density contours (kg/km² and pieces/km²), bathymetric depth outlines, and fuzzy gradient zones rather than inaccurate solid borders.
- **Confirmed Decision 2**: Interactive timeline scrubber spanning 1980 to 2050 with animated particle simulation and scenario toggles (Status Quo vs Treaty/Cleanup).
- **Confirmed Decision 3**: Multi-chapter narrative with dedicated takeaway callouts, academic citations (NOAA, The Ocean Cleanup, UNEP, Lebreton et al. 2018), and interactive inspection trays.

---

### 1. Overview & Core Concept

- **What It Does**: GyreScope provides an interactive geographic learning environment combining GIS cartography, dynamic hydrographic vector fields, scientific charts, and trophic food-web modeling. Users can explore the true nature of the Great Pacific Garbage Patch—debunking the myth of a "floating trash island" and demonstrating its reality as a diffuse microplastic soup concentrated by clockwise Coriolis geostrophic flow.
- **Target Audience / Persona**: Geography students, academic researchers, environmental science educators, and presentation evaluators who require empirical accuracy, clear spatial reasoning, and rich interactive engagement.
- **Key Value**: Bridges physical geography (atmospheric high pressure, Ekman transport, Coriolis acceleration, oceanic gyres) with human geography (global plastics production, river outflows, packaging lifecycles, international maritime law, and cleanup economics).

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. *Executive GIS Explorer & Hero*: Users land on an interactive North Pacific GIS map with layer toggles (Heatmap Density, Current Vectors, Eastern/Western Sub-patches, Monitoring Stations, River Outflow vectors). A summary stats strip shows 1.6M km² area, 1.8 trillion pieces, and comparative scale toggles (vs Texas, France, California).
  2. *Timeline Scrubber & Prediction Mode*: Users drag or play the 1980–2050 timeline. As years advance, the concentration heatmap dynamically swells; switching to "Mitigation Scenario" reveals projected leveling by 2040 under global source reduction.
  3. *Seven-Chapter Narrative Journey*:
     - **01. Location & Extent**: Interactive geographic bounds (Subtropical Convergence Zone, Eastern Patch near California, Western Patch near Japan), depth distribution (neuston surface layer down to water column).
     - **02. Ocean Currents & Coriolis**: Interactive vector simulator of the 4 perimeter currents (California, North Equatorial, Kuroshio, North Pacific Current) demonstrating clockwise spiral and Ekman convergence towards the calm central high. Comparison with the other 4 oceanic gyres (North Atlantic, South Atlantic, South Pacific, Indian Ocean).
     - **03. Composition & Size Taxonomy**: Interactive charts contrasting mass (79% fishing gear / ghost nets) vs particle count (94% microplastics < 5mm), resin types (HDPE, LDPE, PP), and photodegradation mechanics.
     - **04. Journey of Plastic & River Corridors**: Flow diagram tracing Land → Coastal Rivers (Yangtze, Pasig, Ganges) → Offshore currents → Gyre trap, with half-life degradation milestones (plastic bottle 450 yr, monofilament line 600 yr).
     - **05. Ecological & Human Impacts**: Interactive food web diagram (Plankton → Lanternfish → Tuna/Mahi-Mahi → Human consumption / Apex predators) showing trophic transfer and chemical sorption (POPs, PCBs), plus Midway Atoll Laysan albatross and rafting invasive species (plastisphere).
     - **06. Scientific Data & Lebreton 2018 Study**: Comparative analysis of net tow trawls vs aerial surveys, exponential growth of global plastic production, and survey transects.
     - **07. Solutions, Governance & Critical Debate**: Interactive comparison between ocean scooping (The Ocean Cleanup System 03) vs river interception (Interceptors) vs upstream policy (UN Plastics Treaty), featuring verified success stories and an objective debate panel.
  4. *Data Inspector & Export*: Users can inspect specific coordinates, view raw data tables with tabular figures, and export academic citation summaries formatted in APA/Chicago.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Precision cartographic and oceanographic scientific tool. Dark bathymetric navy backdrop with high-contrast satellite oceanic topography, crisp hairline dividers, and disciplined phosphor telemetry.
  - *Color Palette*:
    - Canvas (60%): Deep oceanic abyss (`#060B14`, `#0B132B`) with subtle bathymetric tinting.
    - Structural Panels (30%): Muted slate panels (`#0F1B2E`, `#152238`), crisp 1px hairline borders (`rgba(255,255,255,0.08)`).
    - Accent Budget (10%): Phosphor laser cyan (`#06B6D4`) for current vectors, bio-amber/coral (`#F59E0B` / `#EF4444`) for high plastic density heatmaps, and emerald (`#10B981`) for cleanup interventions.
  - *Typography & Hierarchy*:
    - Display & Titles: Modern geometric sans (`Plus Jakarta Sans` / `Outfit`).
    - Body & Scientific Explanations: Highly legible neutral sans (`DM Sans`).
    - Geographic Coordinates, Telemetry & Stats: Monospace tabular numerals (`JetBrains Mono`, `font-mono tabular-nums`).
  - *Zero-Pill & Anti-Slop Enforcement*: No decorative floating pills or fake status tickers. Metadata rendered with quiet typographical separators (`·`). Button controls are functional segmented tabs.

- **Interactive Feedback & Visual Assets**:
  - Smooth 60fps canvas-based particle streamlines and SVG density gradient shaders.
  - Authentic visual gallery displaying real macro debris, ghost net recovery, microplastic neuston net samples, and wildlife ingestion documentation with accurate academic captions.
  - Resilient image loading with CSS gradient fallbacks.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Custom Interactive Vector GIS Map Canvas vs Third-Party Heavy WebGL Tiles**
  - *Chosen Approach*: Lightweight, custom Canvas/SVG interactive North Pacific GIS map with georeferenced coordinate grids (120°E to 110°W, 10°N to 45°N), real landmass boundaries (Asia, North America, Hawaii, Midway), high-resolution bathymetric satellite gradient styling, and real-time particle vector currents.
  - *Why*: Instant loading, zero external API key requirements, ultra-smooth zooming/panning, and exact control over plastic density isolines, particle drift rates, and river outflow vectors.
  - *Alternatives Considered*: Leaflet/Mapbox tile providers, which risk rate limits, broken sandboxed network tiles, or slow load times.

- **Decision 2: 1980–2050 Temporal Model Architecture**
  - *Chosen Approach*: Grounded time-series model combining historical NOAA/Lebreton empirical data points (1980 to 2024) with parameterized IPCC/UNEP predictive growth models (2025 to 2050) supporting dual scenarios: "Status Quo (3.8% annual production increase)" vs "Global Action (UN Treaty & 90% River Capture)".
  - *Why*: Allows geography students to test hypotheses and visualize accumulation trajectories directly in line with assignment rubrics.

- **Decision 3: Multi-Chapter Navigation with Sticky GIS Telemetry HUD**
  - *Chosen Approach*: A hybrid layout featuring a master chapter stepper at the top, a persistent interactive GIS map stage with modular overlay controls, and synchronized thematic insight drawers.
  - *Why*: Balances an exploratory geospatial workbench with an orderly classroom presentation flow.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation & Chapter Bar                    │
│   Brand: GyreScope GIS  ·  7 Chapters (1..7)  ·  Scenario Switcher     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    │                                                               │
┌───▼───────────────────────────┐       ┌───────────────────────────▼──┐
│   GIS Geospatial Stage        │       │   Thematic Research Deck     │
│  - Satellite / Bathymetry Map │       │  - Key Takeaway Highlight    │
│  - Gyre Current Streamlines   │       │  - Decomposition Timeline    │
│  - Heatmap Density Isolines   │       │  - Ghost Net vs Microplastic │
│  - 1980-2050 Timeline Scrubber│       │  - Trophic Food Web Model    │
│  - Comparative Size Overlays  │       │  - 5-Gyres Global Comparison │
│  - Coordinate Probe & Layers  │       │  - Solutions & Case Studies  │
└───┬───────────────────────────┘       └───┬──────────────────────────┘
    │                                       │
    └───────────────────────┬───────────────┘
                            │
┌───────────────────────────▼────────────────────────────────────────────┐
│                    Empirical Data & Scientific Reference               │
│   Lebreton et al. 2018 · NOAA Marine Debris · UNEP · Peer-Reviewed Ref │
└────────────────────────────────────────────────────────────────────────┘
```

- **Core Data Structures & Models**:
  - `GyreMetrics`: Mass (approx 79,000 to 100,000 tonnes), piece count (1.8 trillion), surface area (1.6M km²), depth distribution (surface 0–5m vs mesopelagic).
  - `OceanCurrent`: Kuroshio, North Pacific, California, North Equatorial currents with velocity vectors, temperatures, and Coriolis deflection angles.
  - `PollutionHotspot`: Western Garbage Patch (Kuroshio recirculation), Subtropical Convergence Zone, Eastern Garbage Patch.
  - `GlobalGyre`: North Pacific, South Pacific, North Atlantic, South Atlantic, Indian Ocean data points for comparative geography.
  - `RiverOutflow`: Top 10 global rivers carrying plastic to sea (Yangtze, Indus, Yellow, Hai He, Nile, Ganges, Pearl, Amur, Niger, Mekong) with annual metric tonnage.
  - `TrophicNode`: Microplastics/Biofilm → Zooplankton → Myctophids (Lanternfish) → Pelagic Predators (Tuna/Swordfish) → Seabirds & Humans, with bioaccumulation biomagnification factors.
  - `MitigationMethod`: Ocean barrier trawls (Ocean Cleanup System 03), solar-powered river interceptors, extended producer responsibility legislation, and bioplastics.

- **Interactive State Machine**:
  - `activeChapter`: Current story chapter (1 through 7) controlling active insights, audio-visual focal areas, and map presets.
  - `timelineYear`: Selected year (1980–2050) driving dynamic heatmap density rendering, particle count readouts, and ocean drift animation speeds.
  - `predictionScenario`: `'status-quo'` vs `'mitigation-treaty'`.
  - `mapLayers`: Active toggles for `{ currents, densityHeatmap, subPatches, riverCorridors, shippingRoutes, sizeComparison }`.
  - `selectedRegion`: Selected GIS hotspot probe displaying coordinates, depth, estimated grams/m², and predominant polymer type.

---

### Verification & Academic Rigor Checklist
- [x] Clear debunking of the "solid island" myth with accurate diffuse soup visualizer.
- [x] Full physics grounding: Coriolis effect, Ekman transport, subtropical high-pressure convergence.
- [x] Academic citations to NOAA Marine Debris Program, Lebreton et al. (Scientific Reports 2018), Eriksen et al. (PLOS ONE 2014), and UNEP.
- [x] Key takeaway callout on every single panel.
- [x] Verified working handlers for all controls (timeline, layer switches, size comparator, unit toggles).
- [x] Compliant with Zero-Pill metadata rules, 60-30-10 color budget, and anti-slop guidelines.
