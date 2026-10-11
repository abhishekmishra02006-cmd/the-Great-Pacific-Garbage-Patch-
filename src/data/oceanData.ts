export interface CurrentVector {
  id: string;
  name: string;
  direction: string;
  speed: string; // m/s
  temp: 'Warm' | 'Cold' | 'Moderate';
  role: string;
  path: { x: number; y: number }[];
}

export interface HotspotArea {
  id: string;
  name: string;
  lat: string;
  lng: string;
  density: string; // kg/km2
  pieces: string; // pieces/km2
  type: string;
  description: string;
  dominantDebris: string;
  x: number;
  y: number;
}

export interface RiverOutflow {
  name: string;
  country: string;
  oceanBasin: string;
  annualTonnage: string;
  lat: number;
  lng: number;
  mapX: number;
  mapY: number;
}

export interface GyreComparison {
  name: string;
  ocean: string;
  areaKm2: number;
  estimatedTonnes: number;
  particleCountTrillions: number;
  dominantCurrents: string[];
  keyCharacteristic: string;
}

export interface TimelineDataPoint {
  year: number;
  statusQuoTonnes: number;
  statusQuoTrillions: number;
  mitigationTonnes: number;
  mitigationTrillions: number;
  densityIndex: number; // 0 to 1 scale
  globalProductionMt: number; // million metric tonnes
  milestone: string;
}

export interface SizeFraction {
  category: string;
  sizeRange: string;
  massPercent: number;
  countPercent: number;
  description: string;
  typicalItems: string[];
}

export interface MaterialComposition {
  name: string;
  massPercent: number;
  color: string;
  description: string;
  commonOrigin: string;
}

export interface TrophicLevel {
  level: number;
  name: string;
  organism: string;
  plasticEncounter: string;
  hazardMechanism: string;
  bioaccumulationFactor: string;
}

export interface SolutionMethod {
  id: string;
  title: string;
  type: 'Upstream Prevention' | 'Midstream Interception' | 'Downstream Remediation';
  organization: string;
  mechanism: string;
  pros: string[];
  cons: string[];
  costPerTonne: string;
  readiness: string;
  successStory: string;
}

export const GPGP_KEY_STATS = {
  areaKm2: 1600000,
  areaFormatted: '1.6 Million km²',
  estimatedMassTonnes: 79000,
  estimatedMassRange: '79,000 – 100,000 tonnes',
  particleCountTrillions: 1.8,
  particleCountFormatted: '1.8 Trillion pieces',
  microplasticCountPercent: 94,
  fishingGearMassPercent: 46,
  peakDensityKgKm2: 450,
  averageDensityKgKm2: 49.4,
  centerCoordinates: '32°N, 145°W (Eastern) · 31°N, 155°E (Western)',
};

export const COMPARATIVE_AREAS = [
  { name: 'France', areaKm2: 643801, multiplier: 2.48, color: '#38bdf8' },
  { name: 'State of Texas', areaKm2: 695662, multiplier: 2.30, color: '#f59e0b' },
  { name: 'State of California', areaKm2: 423970, multiplier: 3.77, color: '#34d399' },
  { name: 'Germany', areaKm2: 357022, multiplier: 4.48, color: '#a78bfa' },
];

export const OCEAN_CURRENTS: CurrentVector[] = [
  {
    id: 'kuroshio',
    name: 'Kuroshio Current',
    direction: 'Northeastwards along Japan',
    speed: '1.2 – 2.0 m/s',
    temp: 'Warm',
    role: 'Western boundary jet transporting land runoff from East Asia into the Pacific drift.',
    path: [{ x: 135, y: 350 }, { x: 170, y: 280 }, { x: 220, y: 220 }],
  },
  {
    id: 'north-pacific',
    name: 'North Pacific Current',
    direction: 'Eastwards across the mid-latitude Pacific',
    speed: '0.3 – 0.6 m/s',
    temp: 'Moderate',
    role: 'Trans-basin conveyor carrying pelagic floating debris from East Asia toward North America.',
    path: [{ x: 220, y: 220 }, { x: 420, y: 190 }, { x: 680, y: 200 }],
  },
  {
    id: 'california',
    name: 'California Current',
    direction: 'Southwards along the US West Coast',
    speed: '0.2 – 0.4 m/s',
    temp: 'Cold',
    role: 'Eastern boundary current deflecting floating items south before sweeping them westward.',
    path: [{ x: 740, y: 210 }, { x: 730, y: 340 }, { x: 670, y: 440 }],
  },
  {
    id: 'north-equatorial',
    name: 'North Equatorial Current',
    direction: 'Westwards driven by trade winds',
    speed: '0.3 – 0.5 m/s',
    temp: 'Warm',
    role: 'Equatorial belt driven by easterly trade winds completing the clockwise gyre circuit.',
    path: [{ x: 670, y: 440 }, { x: 380, y: 450 }, { x: 160, y: 420 }],
  },
];

export const HOTSPOT_REGIONS: HotspotArea[] = [
  {
    id: 'eastern-patch',
    name: 'Eastern Garbage Patch (Main GPGP Core)',
    lat: '32.0°N',
    lng: '142.5°W',
    density: '240 – 450 kg/km²',
    pieces: '> 350,000 pieces/km²',
    type: 'Subtropical Anticyclonic Convergence Zone',
    description: 'The dense core located between California and Hawaii where persistent anticyclonic high pressure traps plastics for decades.',
    dominantDebris: 'Degraded polyolefin fragments, abandoned driftnets, buoy clusters',
    x: 620,
    y: 290,
  },
  {
    id: 'western-patch',
    name: 'Western Garbage Patch',
    lat: '31.5°N',
    lng: '158.0°E',
    density: '110 – 190 kg/km²',
    pieces: '> 180,000 pieces/km²',
    type: 'Kuroshio Recirculation Gyre',
    description: 'Secondary high-density vortex formed off Japan near the Kuroshio Extension where Asian industrial runoff and coastal fisheries debris collect.',
    dominantDebris: 'Commercial aquaculture gear, EPS styrofoam floats, fishing crates',
    x: 230,
    y: 300,
  },
  {
    id: 'subtropical-convergence',
    name: 'Subtropical Convergence Zone (STCZ)',
    lat: '28.0°N',
    lng: '175.0°W',
    density: '70 – 140 kg/km²',
    pieces: '> 95,000 pieces/km²',
    type: 'Frontal Boundary Corridor',
    description: 'Meandering oceanographic ribbon connecting the Eastern and Western zones; major foraging corridor for loggerhead turtles and Hawaiian seabirds.',
    dominantDebris: 'Ghost nets, monofilament longlines, floating bottles',
    x: 430,
    y: 330,
  },
  {
    id: 'midway-atoll',
    name: 'Midway Atoll Impact Zone',
    lat: '28.2°N',
    lng: '177.3°W',
    density: 'Extreme Beach Accumulation',
    pieces: '> 5 tons washed ashore annually',
    type: 'Ecological Sentinel Site',
    description: 'Remote atoll where 98% of Laysan albatross chicks have plastics in their digestive tracts regurgitated by foraging parents.',
    dominantDebris: 'Bottle caps, lighters, toothbrush handles, fishing line',
    x: 410,
    y: 350,
  },
];

export const TOP_RIVERS: RiverOutflow[] = [
  { name: 'Yangtze River', country: 'China', oceanBasin: 'East China Sea', annualTonnage: '333,000 tonnes/yr', lat: 31.2, lng: 121.5, mapX: 110, mapY: 310 },
  { name: 'Indus River', country: 'Pakistan', oceanBasin: 'Arabian Sea', annualTonnage: '164,000 tonnes/yr', lat: 24.0, lng: 67.5, mapX: 30, mapY: 360 },
  { name: 'Yellow River (Huang He)', country: 'China', oceanBasin: 'Bohai Sea', annualTonnage: '124,000 tonnes/yr', lat: 37.8, lng: 119.3, mapX: 95, mapY: 260 },
  { name: 'Hai He', country: 'China', oceanBasin: 'Bohai Sea', annualTonnage: '91,800 tonnes/yr', lat: 38.9, lng: 117.7, mapX: 90, mapY: 245 },
  { name: 'Ganges River', country: 'India', oceanBasin: 'Bay of Bengal', annualTonnage: '115,000 tonnes/yr', lat: 22.0, lng: 89.0, mapX: 50, mapY: 380 },
  { name: 'Pearl River (Zhujiang)', country: 'China', oceanBasin: 'South China Sea', annualTonnage: '52,900 tonnes/yr', lat: 22.2, lng: 113.8, mapX: 95, mapY: 380 },
  { name: 'Pasig River', country: 'Philippines', oceanBasin: 'Manila Bay / Pacific', annualTonnage: '38,800 tonnes/yr', lat: 14.6, lng: 121.0, mapX: 115, mapY: 430 },
  { name: 'Mekong River', country: 'Vietnam/Cambodia', oceanBasin: 'South China Sea', annualTonnage: '33,400 tonnes/yr', lat: 10.2, lng: 106.3, mapX: 85, mapY: 460 },
];

export const FIVE_GYRES: GyreComparison[] = [
  {
    name: 'North Pacific Gyre (GPGP)',
    ocean: 'North Pacific',
    areaKm2: 1600000,
    estimatedTonnes: 79000,
    particleCountTrillions: 1.80,
    dominantCurrents: ['Kuroshio', 'North Pacific', 'California', 'North Equatorial'],
    keyCharacteristic: 'World\'s largest accumulation zone; high concentration of commercial fishing gear and trans-Pacific plastics.',
  },
  {
    name: 'North Atlantic Gyre (Sargasso Sea)',
    ocean: 'North Atlantic',
    areaKm2: 920000,
    estimatedTonnes: 32000,
    particleCountTrillions: 0.93,
    dominantCurrents: ['Gulf Stream', 'North Atlantic Drift', 'Canary Current', 'North Equatorial'],
    keyCharacteristic: 'Overlaps the fragile Sargassum seaweed floating ecosystem; heavy inputs from North America and Western Europe.',
  },
  {
    name: 'South Pacific Gyre',
    ocean: 'South Pacific',
    areaKm2: 1150000,
    estimatedTonnes: 21000,
    particleCountTrillions: 0.49,
    dominantCurrents: ['East Australian', 'South Pacific Current', 'Humboldt (Peru)', 'South Equatorial'],
    keyCharacteristic: 'Centered near Easter Island; oceanic desert with long residence times and low coastal river dilution.',
  },
  {
    name: 'South Atlantic Gyre',
    ocean: 'South Atlantic',
    areaKm2: 740000,
    estimatedTonnes: 12700,
    particleCountTrillions: 0.29,
    dominantCurrents: ['Brazil Current', 'South Atlantic Current', 'Benguela Current', 'South Equatorial'],
    keyCharacteristic: 'Fed by South American and African coastlines; lower overall ship traffic than northern counterparts.',
  },
  {
    name: 'Indian Ocean Gyre',
    ocean: 'Indian Ocean',
    areaKm2: 980000,
    estimatedTonnes: 28000,
    particleCountTrillions: 0.59,
    dominantCurrents: ['Agulhas', 'West Australian', 'South Equatorial Current'],
    keyCharacteristic: 'Subject to seasonal monsoon reversals affecting surface current trajectories and debris trapping efficiency.',
  },
];

export const SIZE_FRACTIONS: SizeFraction[] = [
  {
    category: 'Mega-plastics',
    sizeRange: '> 50 cm',
    massPercent: 46,
    countPercent: 0.05,
    description: 'Ghost nets, fish aggregating devices (FADs), large buoys, aquaculture crates.',
    typicalItems: ['Commercial trawl nets', 'Polypropylene mooring hawser', 'Crab pots', 'Shipping crates'],
  },
  {
    category: 'Macro-plastics',
    sizeRange: '5 cm – 50 cm',
    massPercent: 26,
    countPercent: 1.15,
    description: 'Intact or partially cracked consumer packaging, bottles, buckets, shoes.',
    typicalItems: ['Drink bottles', 'Detergent containers', 'Hard hats', 'Fishing floats'],
  },
  {
    category: 'Meso-plastics',
    sizeRange: '0.5 cm – 5 cm',
    massPercent: 16,
    countPercent: 4.80,
    description: 'Secondary fragments from weathered items, bottle caps, cutlery pieces.',
    typicalItems: ['Bottle caps', 'Fragmented bucket rims', 'Degraded toy remnants', 'Lighters'],
  },
  {
    category: 'Micro-plastics',
    sizeRange: '< 0.5 cm (0.5 – 5 mm)',
    massPercent: 8,
    countPercent: 94.00,
    description: 'Primary pre-production pellets (nurdles) and photochemically brittle shards.',
    typicalItems: ['Industrial resin nurdles', 'Brittle micro-flakes', 'Synthetic microfiber bundles', 'Cosmetic microbeads'],
  },
];

export const MATERIAL_COMPOSITION: MaterialComposition[] = [
  {
    name: 'Polyethylene (PE - HDPE / LDPE)',
    massPercent: 48,
    color: '#06b6d4',
    description: 'Low density (<1.0 g/cm³), highly buoyant. UV sunlight oxidizes and cleaves polymer chains into billions of jagged micro-fragments.',
    commonOrigin: 'Ghost nets, detergent jugs, shopping bags, floating agricultural films',
  },
  {
    name: 'Polypropylene (PP)',
    massPercent: 38,
    color: '#3b82f6',
    description: 'Naturally buoyant (~0.90 g/cm³). Extremely resistant to biological breakdown; brittle in marine UV radiation.',
    commonOrigin: 'Braided fishing rope, bottle closures, strapping tape, woven sacks',
  },
  {
    name: 'Expanded Polystyrene (EPS)',
    massPercent: 7,
    color: '#f59e0b',
    description: 'Ultra-lightweight foam that easily breaks into millions of individual spherical beads ingested by small fish.',
    commonOrigin: 'Aquaculture buoys, ice chests, packing blocks',
  },
  {
    name: 'Polyamide (Nylon - PA)',
    massPercent: 4,
    color: '#10b981',
    description: 'High tensile strength monofilaments designed not to snap under heavy marine strain; persists indefinitely.',
    commonOrigin: 'Gillnets, longline monofilament, trawl netting',
  },
  {
    name: 'Other Polymers & Additives',
    massPercent: 3,
    color: '#a855f7',
    description: 'Polyurethane coatings, PVC floats, vulcanized synthetic elastomers, plus toxic plasticizers (phthalates, BPA).',
    commonOrigin: 'Industrial adhesives, footwear, composite coatings',
  },
];

export const DEGRADATION_TIMELINE = [
  { item: 'Plastic Fishing Monofilament', years: 600, category: 'Commercial Fishing' },
  { item: 'PET Beverage Bottle', years: 450, category: 'Single-Use Packaging' },
  { item: 'Synthetic Disposable Diaper', years: 450, category: 'Sanitary Hygiene' },
  { item: 'Polystyrene Coffee Cup', years: 50, category: 'Food Service' },
  { item: 'LDPE Thin Film Bag', years: 20, category: 'Retail Packaging' },
  { item: 'Cellulose Acetate Cigarette Butt', years: 10, category: 'Smoking Debris' },
];

export const TROPHIC_CHAIN: TrophicLevel[] = [
  {
    level: 1,
    name: 'Neuston & Biofilm Interface',
    organism: 'Velella velella (By-the-wind sailor), Halobates (Sea skaters), Bacteria',
    plasticEncounter: 'Microplastic particles serve as artificial substrate ("The Plastisphere").',
    hazardMechanism: 'Alters surface ocean albedo and transfers pathogenic microbial colonies across oceanic boundaries.',
    bioaccumulationFactor: 'Baseline (1x)',
  },
  {
    level: 2,
    name: 'Primary Herbivores & Zooplankton',
    organism: 'Calanoid Copepods, Salps, Euphausiids (Krill)',
    plasticEncounter: 'Filter-feeding indiscriminately consumes particles 10–500 µm.',
    hazardMechanism: 'Pseudofeces blockage, false satiation leading to energy starvation, reduced fecundity.',
    bioaccumulationFactor: '5x – 12x sorbed contaminants',
  },
  {
    level: 3,
    name: 'Mesopelagic Planktivores',
    organism: 'Myctophidae (Lanternfish), Anchovies, Flying Fish',
    plasticEncounter: 'Active predation mistaking brightly colored microplastics for prey.',
    hazardMechanism: 'Over 35% of lanternfish sampled in the GPGP contained stomach plastics; intestinal lacerations.',
    bioaccumulationFactor: '25x – 80x POPs / PCBs',
  },
  {
    level: 4,
    name: 'Pelagic Predators & Seabirds',
    organism: 'Albacore Tuna, Mahi-Mahi, Laysan Albatross (Phoebastria immutabilis)',
    plasticEncounter: 'Ingestion of contaminated prey plus direct foraging on floating macroplastic caps.',
    hazardMechanism: 'Midway Atoll chicks suffer stomach puncture, dehydration, and stunted wing growth.',
    bioaccumulationFactor: '150x – 600x biomagnification',
  },
  {
    level: 5,
    name: 'Apex Consumers & Humans',
    organism: 'Humans (Commercial Seafood), Shark species, Cetaceans',
    plasticEncounter: 'Dietary intake of commercial apex seafood and marine salts containing nanoplastics.',
    hazardMechanism: 'Translocation of sub-micron particles across gut epithelium into vascular tissue; endocrine disruption.',
    bioaccumulationFactor: 'Peak Trophic Endpoint',
  },
];

export const TIMELINE_DATA: TimelineDataPoint[] = [
  { year: 1980, statusQuoTonnes: 12000, statusQuoTrillions: 0.22, mitigationTonnes: 12000, mitigationTrillions: 0.22, densityIndex: 0.15, globalProductionMt: 70, milestone: 'First scientific observations of plastic accumulation in North Pacific subtropical waters' },
  { year: 1988, statusQuoTonnes: 21000, statusQuoTrillions: 0.38, mitigationTonnes: 21000, mitigationTrillions: 0.38, densityIndex: 0.25, globalProductionMt: 100, milestone: 'NOAA paper by Day et al. predicts high-density convergence zone in North Pacific' },
  { year: 1997, statusQuoTonnes: 34000, statusQuoTrillions: 0.65, mitigationTonnes: 34000, mitigationTrillions: 0.65, densityIndex: 0.40, globalProductionMt: 155, milestone: 'Oceanographer Charles Moore crosses patch during Transpac race, coining popular awareness' },
  { year: 2005, statusQuoTonnes: 49000, statusQuoTrillions: 0.95, mitigationTonnes: 49000, mitigationTrillions: 0.95, densityIndex: 0.58, globalProductionMt: 230, milestone: 'Algalita Marine Research expeditions document 6:1 plastic to plankton ratio by dry weight' },
  { year: 2015, statusQuoTonnes: 68000, statusQuoTrillions: 1.45, mitigationTonnes: 68000, mitigationTrillions: 1.45, densityIndex: 0.82, globalProductionMt: 322, milestone: 'Mega Expedition: Multi-vessel transect mapping surface concentrations' },
  { year: 2018, statusQuoTonnes: 79000, statusQuoTrillions: 1.80, mitigationTonnes: 79000, mitigationTrillions: 1.80, densityIndex: 1.00, globalProductionMt: 359, milestone: 'Lebreton et al. (Scientific Reports) publish benchmark study finding 4–16x previous estimates' },
  { year: 2024, statusQuoTonnes: 94000, statusQuoTrillions: 2.25, mitigationTonnes: 94000, mitigationTrillions: 2.25, densityIndex: 1.18, globalProductionMt: 410, milestone: 'System 03 deployed; INC-4 UN Treaty negotiations underway in Ottawa and Busan' },
  { year: 2030, statusQuoTonnes: 118000, statusQuoTrillions: 2.90, mitigationTonnes: 86000, mitigationTrillions: 1.95, densityIndex: 1.45, globalProductionMt: 490, milestone: 'Model projection: Projected 25% increase without global packaging treaty' },
  { year: 2040, statusQuoTonnes: 165000, statusQuoTrillions: 4.20, mitigationTonnes: 62000, mitigationTrillions: 1.30, densityIndex: 2.05, globalProductionMt: 640, milestone: 'Model projection: Global Treaty & River Interceptors reduce oceanic influx by 80%' },
  { year: 2050, statusQuoTonnes: 220000, statusQuoTrillions: 5.80, mitigationTonnes: 38000, mitigationTrillions: 0.75, densityIndex: 2.75, globalProductionMt: 820, milestone: 'Model projection: GPGP reduced by ~60% with sustained offshore capture and source caps' },
];

export const SOLUTIONS_DATA: SolutionMethod[] = [
  {
    id: 'ocean-cleanup-sys3',
    title: 'Offshore Retention Barriers (The Ocean Cleanup System 03)',
    type: 'Downstream Remediation',
    organization: 'The Ocean Cleanup Foundation',
    mechanism: 'A 2.5-kilometer-long floating U-shaped barrier towed at 1.5 knots by two vessels to concentrate buoyant macroplastics and ghost nets in a retention retention zone.',
    pros: [
      'Removes massive ghost nets that continue killing marine wildlife for decades',
      'Effective at harvesting macroplastics before they photodegrade into microplastics',
      'Provides empirical data for ocean circulation and material forensics',
    ],
    cons: [
      'High fuel consumption and carbon footprint of towing ships',
      'Risks bycatch of surface pleuston (Velella, Porpita, Janthina)',
      'Addresses downstream symptoms rather than stopping continuous upstream land outflow',
    ],
    costPerTonne: '$18,000 – $25,000 / tonne',
    readiness: 'Active Deployment (Scale-up underway)',
    successStory: 'System 03 has extracted over 500,000 kg of plastic from the GPGP, recycling sorted polymers into durable goods.',
  },
  {
    id: 'river-interceptors',
    title: 'Automated Solar River Interceptors',
    type: 'Midstream Interception',
    organization: 'Global River Barrier Consortiums',
    mechanism: 'Autonomous solar-powered catamarans and boom barriers moored at the mouths of top polluting rivers to extract debris before it enters the sea.',
    pros: [
      'Stops plastic where concentration is densest (rivers), preventing dispersion into 100M km² of ocean',
      'Zero emissions: Powered 100% by onboard solar arrays and lithium iron phosphate batteries',
      'Cost per tonne is 80% lower than open ocean retrieval',
    ],
    cons: [
      'Requires municipal waste logistics and sorting infrastructure on land',
      'Vulnerable to extreme monsoonal flood surges and floating tree trunks',
      'Requires bilateral government permits and local workforce integration',
    ],
    costPerTonne: '$1,200 – $3,500 / tonne',
    readiness: 'Operational in 15+ rivers globally',
    successStory: 'Interceptor 001 in Rio Ozama (Santo Domingo) and Interceptor 007 in Ballona Creek (Los Angeles) prevent thousands of tons from reaching the Pacific annually.',
  },
  {
    id: 'un-plastics-treaty',
    title: 'UN Legally Binding Global Plastics Treaty (INC Process)',
    type: 'Upstream Prevention',
    organization: 'United Nations Environment Programme (UNEP)',
    mechanism: 'Mandatory international treaty setting global caps on virgin polymer production, banning non-essential single-use polymers, and enforcing Extended Producer Responsibility (EPR).',
    pros: [
      'Addresses the root cause: runaway production of fossil-fuel-based packaging',
      'Levels the regulatory playing field for international manufacturers',
      'Funds waste management infrastructure in developing Global South nations',
    ],
    cons: [
      'Intense lobbying opposition from petrochemical and oil-producing states',
      'Long ratification and enforcement lead times across sovereign jurisdictions',
      'Does not remove the 80,000+ tonnes of legacy debris already adrift in the gyre',
    ],
    costPerTonne: 'Economically net-positive over lifecycle',
    readiness: 'Under active diplomatic negotiation',
    successStory: 'Single-use plastic bans across 120+ nations have reduced lightweight carrier bag marine strandings by up to 70% in regional coastal surveys.',
  },
];

export const SCIENTIFIC_CITATIONS = [
  {
    citation: 'Lebreton, L., Slat, B., Ferrari, F., et al. (2018). Evidence that the Great Pacific Garbage Patch is rapidly accumulating plastic. Scientific Reports, 8(1), 4666.',
    doi: '10.1038/s41598-018-22939-w',
    relevance: 'Primary benchmark study utilizing 18 vessel trawls and aerial LiDAR surveys, revising mass estimates upward to 79,000 tonnes and 1.8 trillion pieces.',
  },
  {
    citation: 'NOAA Marine Debris Program. (2023). Great Pacific Garbage Patch: Myths vs. Facts. National Oceanic and Atmospheric Administration.',
    doi: 'NOAA-MDP-2023-GPGP',
    relevance: 'Authoritative guidance dispelling the "floating solid island" myth and detailing geostrophic convergence in subtropical gyres.',
  },
  {
    citation: 'Eriksen, M., Lebreton, L. C., Carson, H. S., et al. (2014). Plastic Pollution in the World\'s Oceans: More than 5 Trillion Plastic Pieces Weighing over 250,000 Tons Afloat at Sea. PLOS ONE, 9(12), e111913.',
    doi: '10.1371/journal.pone.0111913',
    relevance: 'Comprehensive baseline model comparing microplastic and macroplastic mass distributions across all 5 subtropical ocean gyres.',
  },
  {
    citation: 'Schmidt, C., Krauth, T., & Wagner, S. (2017). Export of Plastic Debris by Rivers to the Sea. Environmental Science & Technology, 51(21), 12246–12253.',
    doi: '10.1021/acs.est.7b02368',
    relevance: 'Empirical calculation establishing that 10 major global river systems account for the vast majority of continental plastic flux to the marine environment.',
  },
];
