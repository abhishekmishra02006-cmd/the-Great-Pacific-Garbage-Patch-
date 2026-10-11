import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Info,
  Maximize2,
  Minimize2,
  Crosshair,
  Flame,
  Wind
} from 'lucide-react';
import {
  HOTSPOT_REGIONS,
  OCEAN_CURRENTS,
  TOP_RIVERS,
  COMPARATIVE_AREAS,
  HotspotArea,
  GPGP_KEY_STATS
} from '../data/oceanData';

interface GisMapCanvasProps {
  timelineYear: number;
  predictionScenario: 'status-quo' | 'mitigation-treaty';
  activeChapter: number;
  onSelectHotspot?: (hotspot: HotspotArea) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export const GisMapCanvas: React.FC<GisMapCanvasProps> = ({
  timelineYear,
  predictionScenario,
  activeChapter,
  onSelectHotspot,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Viewport Transform (Zoom & Pan)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Layer Toggles
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showCurrents, setShowCurrents] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [showRivers, setShowRivers] = useState(true);
  const [showGraticule, setShowGraticule] = useState(true);
  const [showAtmosphericHigh, setShowAtmosphericHigh] = useState(true);
  const [selectedComparisonArea, setSelectedComparisonArea] = useState<string | null>(null);

  // Interactive Cursor & Probe
  const [cursorCoords, setCursorCoords] = useState<{ lat: string; lng: string; density: string } | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<HotspotArea | null>(HOTSPOT_REGIONS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Dynamic Density Factor based on timelineYear (1980 - 2050)
  const calculateDensityScale = useCallback(() => {
    // 2018 is baseline 1.0
    if (timelineYear <= 2018) {
      // 1980 is 0.15, 2018 is 1.0
      return 0.15 + ((timelineYear - 1980) / (2018 - 1980)) * 0.85;
    }
    // Future projections
    if (predictionScenario === 'status-quo') {
      // 2018 (1.0) to 2050 (2.78)
      return 1.0 + ((timelineYear - 2018) / (2050 - 2018)) * 1.78;
    } else {
      // Mitigation treaty: peaks around 2026-2028 and decreases to ~0.48 by 2050
      if (timelineYear <= 2026) {
        return 1.0 + ((timelineYear - 2018) / 8) * 0.15;
      }
      return 1.15 - ((timelineYear - 2026) / 24) * 0.67;
    }
  }, [timelineYear, predictionScenario]);

  // Particles for ocean drift simulation
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    // Initialize 160 drifting debris particles
    const pts: Particle[] = [];
    for (let i = 0; i < 160; i++) {
      pts.push({
        x: 100 + Math.random() * 700,
        y: 160 + Math.random() * 320,
        vx: 0,
        vy: 0,
        life: Math.random() * 200,
        maxLife: 150 + Math.random() * 150,
        size: 1 + Math.random() * 2.2,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(251, 146, 60, 0.75)',
      });
    }
    particlesRef.current = pts;
  }, []);

  // Update chapter-based presets
  useEffect(() => {
    if (activeChapter === 2) {
      // Gyre currents focus
      setShowCurrents(true);
      setShowParticles(true);
      setShowAtmosphericHigh(true);
    } else if (activeChapter === 4) {
      // River outflows focus
      setShowRivers(true);
    }
  }, [activeChapter]);

  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Base Satellite Ocean Deep Gradient
      const oceanGrad = ctx.createRadialGradient(
        width * 0.5 + pan.x,
        height * 0.45 + pan.y,
        50,
        width * 0.5 + pan.x,
        height * 0.45 + pan.y,
        width * 0.8 * zoom
      );
      oceanGrad.addColorStop(0, '#0a1628'); // Subtropical center
      oceanGrad.addColorStop(0.4, '#060f1e'); // Deep Pacific Basin
      oceanGrad.addColorStop(0.7, '#040914'); // Abyssal plain
      oceanGrad.addColorStop(1, '#02050c'); // Trenches & margins
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, width, height);

      // Apply Zoom & Pan
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // 1. Draw Geographic Graticule (Lat/Long lines)
      if (showGraticule) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
        ctx.lineWidth = 1 / zoom;
        ctx.setLineDash([4, 4]);

        // Parallels: 10°N, 20°N, 30°N, 40°N, 50°N
        const parallels = [
          { y: 470, label: '10°N (Equatorial Belt)' },
          { y: 380, label: '20°N (Tropic of Cancer)' },
          { y: 290, label: '30°N (Subtropical Gyre Core)' },
          { y: 200, label: '40°N (Kuroshio Extension)' },
          { y: 120, label: '50°N (Subpolar Transition)' },
        ];
        parallels.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(40, p.y);
          ctx.lineTo(860, p.y);
          ctx.stroke();

          ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(p.label, 45, p.y - 4);
        });

        // Meridians: 120°E, 140°E, 160°E, 180°, 160°W, 140°W, 120°W
        const meridians = [
          { x: 100, label: '120°E' },
          { x: 220, label: '140°E' },
          { x: 340, label: '160°E' },
          { x: 460, label: '180° (Dateline)' },
          { x: 580, label: '160°W' },
          { x: 700, label: '140°W' },
          { x: 800, label: '120°W' },
        ];
        meridians.forEach((m) => {
          ctx.beginPath();
          ctx.moveTo(m.x, 100);
          ctx.lineTo(m.x, 500);
          ctx.stroke();

          ctx.fillStyle = 'rgba(148, 163, 184, 0.35)';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText(m.label, m.x + 4, 115);
        });
        ctx.setLineDash([]);
      }

      // 2. Draw Realistic Continental Landmass Silhouettes (Satellite Dark Slate Style)
      ctx.fillStyle = '#172338';
      ctx.strokeStyle = '#2d4263';
      ctx.lineWidth = 1.2;

      // Asian Coast & Japan
      ctx.beginPath();
      ctx.moveTo(30, 100);
      ctx.lineTo(90, 120);
      ctx.lineTo(120, 180);
      ctx.lineTo(110, 260); // Yellow sea / Korean peninsula
      ctx.lineTo(80, 310); // Yangtze delta
      ctx.lineTo(60, 390); // South China coast
      ctx.lineTo(40, 480);
      ctx.lineTo(20, 500);
      ctx.lineTo(20, 100);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Japanese Archipelago (Honshu, Hokkaido, Kyushu)
      ctx.beginPath();
      ctx.moveTo(140, 210);
      ctx.quadraticCurveTo(175, 230, 195, 260);
      ctx.quadraticCurveTo(180, 285, 155, 305);
      ctx.lineTo(145, 295);
      ctx.quadraticCurveTo(165, 260, 140, 220);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // North American Pacific Coast (Alaska to Baja California)
      ctx.beginPath();
      ctx.moveTo(880, 90);
      ctx.lineTo(820, 120); // Gulf of Alaska
      ctx.lineTo(780, 160); // Pacific Northwest
      ctx.lineTo(770, 220); // Washington / Oregon
      ctx.lineTo(760, 290); // California (San Francisco)
      ctx.lineTo(775, 350); // Southern California (LA / San Diego)
      ctx.lineTo(805, 410); // Baja Peninsula
      ctx.lineTo(820, 450);
      ctx.lineTo(880, 470);
      ctx.lineTo(880, 90);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hawaiian Ridge Arch (Midway -> Oahu -> Big Island)
      ctx.fillStyle = '#38bdf8';
      // Hawaii main islands
      ctx.beginPath();
      ctx.arc(580, 375, 3.5, 0, Math.PI * 2); // Maui / Big Island
      ctx.arc(565, 368, 2.8, 0, Math.PI * 2); // Oahu
      ctx.arc(550, 362, 2.2, 0, Math.PI * 2); // Kauai
      ctx.fill();

      // Midway Atoll & Northwestern Hawaiian Islands
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(410, 350, 3, 0, Math.PI * 2); // Midway Atoll
      ctx.fill();
      ctx.fillStyle = 'rgba(245, 158, 11, 0.85)';
      ctx.font = '10px Plus Jakarta Sans, sans-serif';
      ctx.fillText('Midway Atoll (28.2°N)', 418, 348);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
      ctx.fillText('Hawaiian Islands (USA)', 575, 395);
      ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
      ctx.fillText('North America (West Coast)', 745, 145);
      ctx.fillText('East Asia (Continental Shelf)', 45, 135);

      // 3. Plastic Concentration Hotspot Heatmaps (Gradient Contour Shader)
      if (showHeatmap) {
        const densityScale = calculateDensityScale();

        // Eastern Garbage Patch (Main GPGP Core ~32°N, 142°W -> x: 630, y: 295)
        const coreX = 625;
        const coreY = 290;
        const coreRadius = Math.max(40, 110 * Math.min(densityScale, 2.2));

        const eastGrad = ctx.createRadialGradient(
          coreX,
          coreY,
          5,
          coreX,
          coreY,
          coreRadius
        );
        eastGrad.addColorStop(0, `rgba(239, 68, 68, ${Math.min(0.85, 0.45 * densityScale)})`); // High core red
        eastGrad.addColorStop(0.35, `rgba(245, 158, 11, ${Math.min(0.7, 0.35 * densityScale)})`); // Amber
        eastGrad.addColorStop(0.65, `rgba(6, 182, 212, ${Math.min(0.4, 0.22 * densityScale)})`); // Cyan
        eastGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = eastGrad;
        ctx.beginPath();
        // Slightly asymmetric elliptical shape representing wind-driven shear
        ctx.ellipse(coreX, coreY, coreRadius * 1.3, coreRadius * 0.85, -0.15, 0, Math.PI * 2);
        ctx.fill();

        // Western Garbage Patch (~31.5°N, 158°E -> x: 240, y: 300)
        const westX = 240;
        const westY = 300;
        const westRadius = Math.max(30, 75 * Math.min(densityScale, 2.0));

        const westGrad = ctx.createRadialGradient(
          westX,
          westY,
          5,
          westX,
          westY,
          westRadius
        );
        westGrad.addColorStop(0, `rgba(245, 158, 11, ${Math.min(0.75, 0.4 * densityScale)})`);
        westGrad.addColorStop(0.45, `rgba(6, 182, 212, ${Math.min(0.45, 0.25 * densityScale)})`);
        westGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.fillStyle = westGrad;
        ctx.beginPath();
        ctx.ellipse(westX, westY, westRadius * 1.1, westRadius * 0.8, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Subtropical Convergence Zone Ribbon connecting the two
        const stczGrad = ctx.createLinearGradient(westX, westY, coreX, coreY);
        stczGrad.addColorStop(0, `rgba(6, 182, 212, ${0.15 * densityScale})`);
        stczGrad.addColorStop(0.5, `rgba(245, 158, 11, ${0.25 * densityScale})`);
        stczGrad.addColorStop(1, `rgba(6, 182, 212, ${0.2 * densityScale})`);

        ctx.strokeStyle = stczGrad;
        ctx.lineWidth = Math.max(12, 28 * densityScale);
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(westX, westY);
        ctx.quadraticCurveTo(430, 335, coreX, coreY);
        ctx.stroke();

        // Boundary Isolines (Fuzzy gradient perimeter representing the 1.6M km² zone)
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 1.2 / zoom;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.ellipse(coreX, coreY, coreRadius * 1.15, coreRadius * 0.75, -0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Comparative Size Overlay (France, Texas, California)
      if (selectedComparisonArea) {
        const areaData = COMPARATIVE_AREAS.find((a) => a.name === selectedComparisonArea);
        if (areaData) {
          ctx.save();
          // Draw comparative outline in Eastern Patch core
          const compX = 625;
          const compY = 290;
          ctx.fillStyle = `${areaData.color}22`;
          ctx.strokeStyle = areaData.color;
          ctx.lineWidth = 2 / zoom;

          if (areaData.name === 'France') {
            // Hexagonal stylized footprint
            ctx.beginPath();
            ctx.moveTo(compX - 45, compY - 40);
            ctx.lineTo(compX + 35, compY - 45);
            ctx.lineTo(compX + 50, compY + 20);
            ctx.lineTo(compX - 10, compY + 50);
            ctx.lineTo(compX - 50, compY + 25);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (areaData.name.includes('Texas')) {
            // Texas shape footprint
            ctx.beginPath();
            ctx.moveTo(compX - 40, compY - 45);
            ctx.lineTo(compX + 15, compY - 45);
            ctx.lineTo(compX + 15, compY - 15);
            ctx.lineTo(compX + 55, compY + 15);
            ctx.lineTo(compX + 25, compY + 55);
            ctx.lineTo(compX - 35, compY + 40);
            ctx.lineTo(compX - 55, compY - 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else {
            // California elongated silhouette
            ctx.beginPath();
            ctx.moveTo(compX - 35, compY - 55);
            ctx.lineTo(compX + 10, compY - 50);
            ctx.lineTo(compX + 30, compY + 45);
            ctx.lineTo(compX - 15, compY + 55);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Plus Jakarta Sans, sans-serif';
          ctx.fillText(`Scale: ${areaData.name}`, compX - 40, compY - 55);
          ctx.fillStyle = areaData.color;
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText(`GPGP is ~${areaData.multiplier}x larger`, compX - 40, compY - 42);
          ctx.restore();
        }
      }

      // 5. Ocean Currents (Streamlines & Coriolis clockwise rotation)
      if (showCurrents) {
        OCEAN_CURRENTS.forEach((c) => {
          ctx.save();
          ctx.strokeStyle = c.temp === 'Warm' ? 'rgba(239, 68, 68, 0.65)' : c.temp === 'Cold' ? 'rgba(56, 189, 248, 0.65)' : 'rgba(52, 211, 153, 0.65)';
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.moveTo(c.path[0].x, c.path[0].y);
          for (let i = 1; i < c.path.length; i++) {
            ctx.lineTo(c.path[i].x, c.path[i].y);
          }
          ctx.stroke();

          // Current Name label along vector
          const midIdx = Math.floor(c.path.length / 2);
          const midPt = c.path[midIdx];
          ctx.fillStyle = '#e2e8f0';
          ctx.font = 'bold 10px Plus Jakarta Sans, sans-serif';
          ctx.fillText(c.name, midPt.x - 30, midPt.y - 10);
          ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText(`${c.speed} · ${c.temp}`, midPt.x - 30, midPt.y + 3);

          ctx.restore();
        });
      }

      // 6. Subtropical Atmospheric High Pressure Cell & Coriolis Doldrums
      if (showAtmosphericHigh) {
        ctx.save();
        const highX = 490;
        const highY = 270;

        // Subtle concentric high pressure isobars (1024 hPa, 1020 hPa)
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(highX, highY, 60, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(highX, highY, 110, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // High Pressure 'H' Symbol
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 18px Plus Jakarta Sans, sans-serif';
        ctx.fillText('H', highX - 7, highY + 6);

        ctx.fillStyle = 'rgba(245, 158, 11, 0.9)';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.fillText('Subtropical High Pressure', highX - 65, highY + 24);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '9px JetBrains Mono, monospace';
        ctx.fillText('Calm Doldrums · Ekman Inflow', highX - 62, highY + 36);

        ctx.restore();
      }

      // 7. Drifting Debris Particle Simulation (Ekman convergence)
      if (showParticles) {
        const centerCoreX = 580;
        const centerCoreY = 290;

        particlesRef.current.forEach((p) => {
          // Calculate clockwise tangential velocity + slight radial inward attraction
          const dx = p.x - centerCoreX;
          const dy = p.y - centerCoreY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Clockwise tangential velocity vector
          const tangentX = -dy / (dist + 20);
          const tangentY = dx / (dist + 20);

          // Radial inward drift (Ekman transport towards center)
          const radialX = -dx / (dist + 60);
          const radialY = -dy / (dist + 60);

          p.vx = tangentX * 0.9 + radialX * 0.25;
          p.vy = tangentY * 0.9 + radialY * 0.25;

          p.x += p.vx;
          p.y += p.vy;
          p.life += 1;

          if (p.life > p.maxLife || dist < 15) {
            // Respawn along outer perimeter currents (Kuroshio or California)
            p.life = 0;
            if (Math.random() > 0.5) {
              // Spawn off Asia / Kuroshio
              p.x = 110 + Math.random() * 80;
              p.y = 260 + Math.random() * 80;
            } else {
              // Spawn off California current
              p.x = 730 + Math.random() * 50;
              p.y = 210 + Math.random() * 90;
            }
          }

          // Render particle
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / zoom, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // 8. River Outflow Corridors
      if (showRivers) {
        TOP_RIVERS.slice(0, 6).forEach((r) => {
          ctx.save();
          ctx.fillStyle = '#f87171';
          ctx.beginPath();
          ctx.arc(r.mapX, r.mapY, 4, 0, Math.PI * 2);
          ctx.fill();

          // Outflow vector entering ocean
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(r.mapX, r.mapY);
          ctx.lineTo(r.mapX + 18, r.mapY + (r.mapY > 300 ? -8 : 10));
          ctx.stroke();

          ctx.fillStyle = '#fca5a5';
          ctx.font = '9px Plus Jakarta Sans, sans-serif';
          ctx.fillText(r.name, r.mapX - 25, r.mapY - 8);
          ctx.restore();
        });
      }

      // 9. Hotspot Markers (Eastern, Western, STCZ, Midway)
      if (showHotspots) {
        HOTSPOT_REGIONS.forEach((h) => {
          ctx.save();
          const isSelected = activeHotspot?.id === h.id;

          // Pulse circle
          ctx.strokeStyle = isSelected ? '#38bdf8' : '#f59e0b';
          ctx.lineWidth = isSelected ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.arc(h.x, h.y, isSelected ? 9 : 6, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = isSelected ? '#38bdf8' : '#f59e0b';
          ctx.beginPath();
          ctx.arc(h.x, h.y, isSelected ? 4 : 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Label
          ctx.fillStyle = '#ffffff';
          ctx.font = isSelected ? 'bold 11px Plus Jakarta Sans, sans-serif' : '10px Plus Jakarta Sans, sans-serif';
          ctx.fillText(h.name.split(' (')[0], h.x + 10, h.y + 4);

          ctx.restore();
        });
      }

      ctx.restore(); // Undo zoom & pan
      ctx.restore(); // Undo base

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    zoom,
    pan,
    showHeatmap,
    showCurrents,
    showParticles,
    showHotspots,
    showRivers,
    showGraticule,
    showAtmosphericHigh,
    selectedComparisonArea,
    activeHotspot,
    calculateDensityScale,
  ]);

  // Handle Canvas Dragging / Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    // Coordinate conversion probe
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - pan.x) / zoom;
    const mouseY = (e.clientY - rect.top - pan.y) / zoom;

    // Approximate geodetic transform:
    // x: 100 -> 120°E, 460 -> 180°, 700 -> 140°W, 800 -> 120°W
    // y: 120 -> 50°N, 290 -> 30°N, 470 -> 10°N
    let calcLat = (50 - ((mouseY - 120) / (470 - 120)) * 40).toFixed(1);
    let calcLng = '';
    if (mouseX < 460) {
      calcLng = `${(120 + ((mouseX - 100) / 360) * 60).toFixed(1)}°E`;
    } else {
      calcLng = `${(180 - ((mouseX - 460) / 340) * 60).toFixed(1)}°W`;
    }

    // Estimate local density based on distance to Eastern patch core (625, 290)
    const distEast = Math.hypot(mouseX - 625, mouseY - 290);
    const distWest = Math.hypot(mouseX - 240, mouseY - 300);
    let densityVal = '5 – 15 kg/km² (Baseline)';
    if (distEast < 50) densityVal = '320 – 450 kg/km² (Dense Core)';
    else if (distEast < 110) densityVal = '110 – 240 kg/km² (High)';
    else if (distWest < 65) densityVal = '90 – 190 kg/km² (Western Gyre)';
    else if (mouseX > 250 && mouseX < 600 && Math.abs(mouseY - 310) < 40)
      densityVal = '45 – 95 kg/km² (Convergence Zone)';

    setCursorCoords({
      lat: `${calcLat}°N`,
      lng: calcLng,
      density: densityVal,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - pan.x) / zoom;
    const clickY = (e.clientY - rect.top - pan.y) / zoom;

    // Check if clicked near any hotspot
    for (const h of HOTSPOT_REGIONS) {
      const dist = Math.hypot(clickX - h.x, clickY - h.y);
      if (dist < 20) {
        setActiveHotspot(h);
        if (onSelectHotspot) onSelectHotspot(h);
        return;
      }
    }
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-xl overflow-hidden bg-[#070e1b] border border-slate-800 ${
        isFullscreen ? 'h-screen' : 'h-[540px] sm:h-[600px] lg:h-[640px]'
      }`}
    >
      {/* Top Map HUD Telemetry Strip */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Telemetry: Basin & Coordinates */}
        <div className="flex items-center gap-2 bg-[#091322]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 pointer-events-auto">
          <Crosshair className="w-4 h-4 text-cyan-400 shrink-0" />
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-200">North Pacific Gyre GIS</span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-cyan-300">
              {cursorCoords ? `${cursorCoords.lat}, ${cursorCoords.lng}` : '32.0°N, 142.5°W'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="font-mono text-amber-300 text-[11px]">
              {cursorCoords ? cursorCoords.density : '380 kg/km² (Dense Core)'}
            </span>
          </div>
        </div>

        {/* Right Tools: Zoom, Pan Reset, Fullscreen */}
        <div className="flex items-center gap-1.5 bg-[#091322]/90 backdrop-blur-md p-1 rounded-lg border border-slate-700 pointer-events-auto">
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.25))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.75, z - 0.25))}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Reset Map View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        width={920}
        height={560}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-crosshair select-none block"
      />

      {/* Bottom Floating GIS Layer Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Layer Toggles Tray */}
        <div className="flex flex-wrap items-center gap-1 bg-[#091322]/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-700 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 text-slate-400 text-xs font-medium mr-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>GIS Layers:</span>
          </div>

          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showHeatmap
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Heatmap Contours
          </button>

          <button
            onClick={() => setShowCurrents(!showCurrents)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showCurrents
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Gyre Currents
          </button>

          <button
            onClick={() => setShowParticles(!showParticles)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showParticles
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Drift Particles
          </button>

          <button
            onClick={() => setShowRivers(!showRivers)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showRivers
                ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            River Outflows
          </button>

          <button
            onClick={() => setShowAtmosphericHigh(!showAtmosphericHigh)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              showAtmosphericHigh
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Subtropical High (H)
          </button>
        </div>

        {/* Size Comparison Switcher (Debunking size & giving real scale) */}
        <div className="flex items-center gap-1.5 bg-[#091322]/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700 pointer-events-auto">
          <span className="text-xs text-slate-400">Scale Overlay:</span>
          {COMPARATIVE_AREAS.slice(0, 3).map((comp) => (
            <button
              key={comp.name}
              onClick={() =>
                setSelectedComparisonArea(selectedComparisonArea === comp.name ? null : comp.name)
              }
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                selectedComparisonArea === comp.name
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {comp.name.replace('State of ', '')}
            </button>
          ))}
          {selectedComparisonArea && (
            <button
              onClick={() => setSelectedComparisonArea(null)}
              className="text-[11px] text-slate-500 hover:text-slate-300 ml-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Floating Active Hotspot Inspection Drawer */}
      {activeHotspot && (
        <div className="absolute top-14 left-3 z-10 w-72 sm:w-80 bg-[#081220]/95 backdrop-blur-md rounded-lg p-3.5 border border-slate-700 shadow-xl pointer-events-auto">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wide">
                {activeHotspot.name}
              </h4>
              <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
                {activeHotspot.lat}, {activeHotspot.lng} · {activeHotspot.type}
              </p>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-slate-400 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#050a14] p-2 rounded border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px]">CONCENTRATION</span>
              <span className="font-bold text-amber-300">{activeHotspot.density}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">PIECE DENSITY</span>
              <span className="font-bold text-cyan-300">{activeHotspot.pieces}</span>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-300 leading-relaxed">
            {activeHotspot.description}
          </p>

          <div className="mt-2 text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
            <span className="text-slate-500 font-medium">Predominant debris:</span>{' '}
            <span className="text-slate-300">{activeHotspot.dominantDebris}</span>
          </div>
        </div>
      )}
    </div>
  );
};
