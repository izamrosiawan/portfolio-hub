"use client";

import React, { useState, useRef } from "react";
import { ProjectDetail } from "@/data/projects_detail";
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Globe, 
  Activity, 
  Cpu, 
  ExternalLink, 
  BookOpen, 
  Sparkles,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Layers,
  TrendingUp,
  Search,
  Target,
  Award,
  Package,
  GraduationCap,
  Music,
  Zap,
  Terminal,
  Database,
  Sliders,
  Move
} from "lucide-react";

interface IsometricQuantTownMapProps {
  projects: ProjectDetail[];
  onSelectProject: (project: ProjectDetail) => void;
}

interface TownBuildingNode {
  projectId: string;
  districtId: string;
  districtName: string;
  category: string;
  x: number; // canvas x coordinate
  y: number; // canvas y coordinate
  height: number; // 3D building height in px
  icon: React.ReactNode;
  badgeBg: string;
  accentColor: string;
  glowColor: string;
}

const TOWN_NODES: TownBuildingNode[] = [
  // 1. Banking & Finance District (Top-Left 3D Quad)
  {
    projectId: "indonesian-banks-risk-analytics",
    districtId: "banking",
    districtName: "Financial Risk & Banking District",
    category: "Banking",
    x: 180,
    y: 160,
    height: 70,
    icon: <Building2 className="w-5 h-5 text-indigo-400" />,
    badgeBg: "bg-indigo-600 text-white",
    accentColor: "border-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)"
  },
  {
    projectId: "stock-price-simulation-jsmr",
    districtId: "banking",
    districtName: "Financial Risk & Banking District",
    category: "Banking",
    x: 380,
    y: 240,
    height: 55,
    icon: <TrendingUp className="w-5 h-5 text-indigo-300" />,
    badgeBg: "bg-indigo-500 text-white",
    accentColor: "border-indigo-400",
    glowColor: "rgba(129, 140, 248, 0.4)"
  },

  // 2. Actuarial Science Institute (Top-Center 3D Quad)
  {
    projectId: "insurance-pricing-glm",
    districtId: "insurance",
    districtName: "Actuarial Science Institute",
    category: "Insurance",
    x: 620,
    y: 120,
    height: 80,
    icon: <Database className="w-5 h-5 text-emerald-400" />,
    badgeBg: "bg-emerald-600 text-white",
    accentColor: "border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    projectId: "insurance-underwriting-risk",
    districtId: "insurance",
    districtName: "Actuarial Science Institute",
    category: "Insurance",
    x: 780,
    y: 220,
    height: 65,
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    badgeBg: "bg-emerald-600 text-white",
    accentColor: "border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    projectId: "insurance-claims-fraud-detection",
    districtId: "insurance",
    districtName: "Actuarial Science Institute",
    category: "Insurance",
    x: 940,
    y: 140,
    height: 60,
    icon: <Search className="w-5 h-5 text-emerald-400" />,
    badgeBg: "bg-emerald-600 text-white",
    accentColor: "border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },
  {
    projectId: "insurance-cross-sell-propensity",
    districtId: "insurance",
    districtName: "Actuarial Science Institute",
    category: "Insurance",
    x: 680,
    y: 330,
    height: 50,
    icon: <Target className="w-5 h-5 text-emerald-300" />,
    badgeBg: "bg-emerald-500 text-white",
    accentColor: "border-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.4)"
  },
  {
    projectId: "insurance-customer-lifetime-value",
    districtId: "insurance",
    districtName: "Actuarial Science Institute",
    category: "Insurance",
    x: 880,
    y: 340,
    height: 55,
    icon: <Award className="w-5 h-5 text-emerald-300" />,
    badgeBg: "bg-emerald-500 text-white",
    accentColor: "border-emerald-400",
    glowColor: "rgba(52, 211, 153, 0.4)"
  },

  // 3. E-Commerce & Supply Chain Hub (Bottom-Left 3D Quad)
  {
    projectId: "olist-brazilian-ecommerce-analytics",
    districtId: "supplychain",
    districtName: "Supply Chain & Logistics Hub",
    category: "SupplyChain",
    x: 160,
    y: 520,
    height: 75,
    icon: <Truck className="w-5 h-5 text-blue-400" />,
    badgeBg: "bg-blue-600 text-white",
    accentColor: "border-blue-500",
    glowColor: "rgba(59, 130, 246, 0.4)"
  },
  {
    projectId: "supply-chain-demand-forecasting",
    districtId: "supplychain",
    districtName: "Supply Chain & Logistics Hub",
    category: "SupplyChain",
    x: 360,
    y: 620,
    height: 60,
    icon: <Package className="w-5 h-5 text-blue-300" />,
    badgeBg: "bg-blue-500 text-white",
    accentColor: "border-blue-400",
    glowColor: "rgba(96, 165, 250, 0.4)"
  },

  // 4. Public Policy & Macroeconomic Center (Bottom-Center 3D Quad)
  {
    projectId: "asean-economic-recovery",
    districtId: "publicpolicy",
    districtName: "Public Policy & ASEAN Center",
    category: "PublicPolicy",
    x: 620,
    y: 580,
    height: 70,
    icon: <Globe className="w-5 h-5 text-teal-400" />,
    badgeBg: "bg-teal-600 text-white",
    accentColor: "border-teal-500",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
  {
    projectId: "smart-mustahik",
    districtId: "publicpolicy",
    districtName: "Public Policy & ASEAN Center",
    category: "PublicPolicy",
    x: 800,
    y: 680,
    height: 50,
    icon: <Sliders className="w-5 h-5 text-teal-300" />,
    badgeBg: "bg-teal-600 text-white",
    accentColor: "border-teal-500",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
  {
    projectId: "campus-id",
    districtId: "publicpolicy",
    districtName: "Public Policy & ASEAN Center",
    category: "PublicPolicy",
    x: 960,
    y: 560,
    height: 55,
    icon: <GraduationCap className="w-5 h-5 text-teal-300" />,
    badgeBg: "bg-teal-500 text-white",
    accentColor: "border-teal-400",
    glowColor: "rgba(45, 212, 191, 0.4)"
  },

  // 5. Healthcare & Bio-AI Lab (Top-Right 3D Quad)
  {
    projectId: "mlp-vs-random-forest-breast-cancer",
    districtId: "healthcare",
    districtName: "Healthcare AI & Audio Lab",
    category: "Healthcare",
    x: 1200,
    y: 140,
    height: 75,
    icon: <Activity className="w-5 h-5 text-rose-400" />,
    badgeBg: "bg-rose-600 text-white",
    accentColor: "border-rose-500",
    glowColor: "rgba(244, 63, 94, 0.4)"
  },
  {
    projectId: "principal-component-analysis-clustering",
    districtId: "healthcare",
    districtName: "Healthcare AI & Audio Lab",
    category: "Healthcare",
    x: 1380,
    y: 240,
    height: 55,
    icon: <Activity className="w-5 h-5 text-rose-300" />,
    badgeBg: "bg-rose-500 text-white",
    accentColor: "border-rose-400",
    glowColor: "rgba(251, 113, 133, 0.4)"
  },
  {
    projectId: "spotify-tracks-analysis",
    districtId: "healthcare",
    districtName: "Healthcare AI & Audio Lab",
    category: "Healthcare",
    x: 1180,
    y: 350,
    height: 60,
    icon: <Music className="w-5 h-5 text-emerald-400" />,
    badgeBg: "bg-emerald-600 text-white",
    accentColor: "border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.4)"
  },

  // 6. MLOps & Systems Factory (Bottom-Right 3D Quad)
  {
    projectId: "fastapi-house-price-predictor",
    districtId: "systems",
    districtName: "Systems & MLOps Factory",
    category: "Systems",
    x: 1200,
    y: 560,
    height: 80,
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    badgeBg: "bg-amber-600 text-white",
    accentColor: "border-amber-500",
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    projectId: "ai-research-os",
    districtId: "systems",
    districtName: "Systems & MLOps Factory",
    category: "Systems",
    x: 1380,
    y: 660,
    height: 65,
    icon: <Terminal className="w-5 h-5 text-slate-300" />,
    badgeBg: "bg-slate-800 text-white",
    accentColor: "border-slate-700",
    glowColor: "rgba(71, 85, 105, 0.4)"
  },
  {
    projectId: "cic-music-player",
    districtId: "systems",
    districtName: "Systems & MLOps Factory",
    category: "Systems",
    x: 1180,
    y: 780,
    height: 50,
    icon: <Cpu className="w-5 h-5 text-slate-400" />,
    badgeBg: "bg-slate-700 text-white",
    accentColor: "border-slate-600",
    glowColor: "rgba(100, 116, 139, 0.4)"
  }
];

export default function IsometricQuantTownMap({
  projects,
  onSelectProject
}: IsometricQuantTownMapProps) {
  const [scale, setScale] = useState<number>(0.85);
  const [rotateX, setRotateX] = useState<number>(55);
  const [rotateZ, setRotateZ] = useState<number>(-35);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<TownBuildingNode | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.15, 1.6));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.15, 0.5));
  const handleReset = () => {
    setScale(0.85);
    setRotateX(55);
    setRotateZ(-35);
    setPan({ x: 0, y: 0 });
  };

  const handleFocusNode = (node: TownBuildingNode) => {
    setScale(1.1);
    setPan({
      x: -(node.x - 400),
      y: -(node.y - 250)
    });
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#070b14] border border-[#1e293b] rounded-3xl shadow-2xl text-white select-none">
      
      {/* 1. Top Control Bar Overlay */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-none">
        
        {/* Title Badge */}
        <div className="pointer-events-auto bg-[#0d1322]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-lg font-bold text-white tracking-wide">Peta Spasial 3D Research Town</h2>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full uppercase">
                3D Isometric View
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Perspektif Spasial 3D — Geser (Drag) & Perbesar (Zoom) Kanvas Peta.
            </p>
          </div>
        </div>

        {/* 3D Map Control Tools */}
        <div className="pointer-events-auto bg-[#0d1322]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl p-1.5 shadow-xl flex items-center gap-1 font-mono text-xs">
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setRotateX(prev => (prev === 55 ? 0 : 55))}
            className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors flex items-center gap-1 px-2.5"
            title="Toggle Tilt 3D"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{rotateX === 55 ? "3D Tilt" : "2D Flat"}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl transition-colors flex items-center gap-1 px-3"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Drag & Zoom 3D Canvas Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`w-full h-[660px] sm:h-[740px] relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#070b14] to-black ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "1200px" }}
      >
        {/* 3D Isometric Viewport Container */}
        <div
          className="absolute top-0 left-0 w-[1600px] h-[950px] transition-transform duration-100 ease-out origin-top-left"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* 3D Isometric Grid Floor Plan */}
          <div
            className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25) 0%, transparent 70%),
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 50px 50px, 50px 50px"
            }}
          />

          {/* District 3D Floor Zones */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
            {/* District 1: Banking */}
            <div className="absolute left-[100px] top-[80px] w-[420px] h-[340px] border-2 border-indigo-500/30 bg-indigo-950/20 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest bg-indigo-950/80 border border-indigo-500/40 px-3 py-1 rounded-full">
                01 / Financial Risk & Banking District
              </span>
            </div>

            {/* District 2: Insurance */}
            <div className="absolute left-[560px] top-[60px] w-[500px] h-[380px] border-2 border-emerald-500/30 bg-emerald-950/20 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full">
                02 / Actuarial Science Institute
              </span>
            </div>

            {/* District 3: Supply Chain */}
            <div className="absolute left-[100px] top-[460px] w-[420px] h-[400px] border-2 border-blue-500/30 bg-blue-950/20 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest bg-blue-950/80 border border-blue-500/40 px-3 py-1 rounded-full">
                03 / Supply Chain & Logistics Hub
              </span>
            </div>

            {/* District 4: Public Policy */}
            <div className="absolute left-[560px] top-[480px] w-[500px] h-[380px] border-2 border-teal-500/30 bg-teal-950/20 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-widest bg-teal-950/80 border border-teal-500/40 px-3 py-1 rounded-full">
                04 / Public Policy & ASEAN Center
              </span>
            </div>

            {/* District 5: Healthcare */}
            <div className="absolute left-[1100px] top-[80px] w-[440px] h-[380px] border-2 border-rose-500/30 bg-rose-950/20 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-rose-300 uppercase tracking-widest bg-rose-950/80 border border-rose-500/40 px-3 py-1 rounded-full">
                05 / Healthcare AI & Audio Lab
              </span>
            </div>

            {/* District 6: Systems */}
            <div className="absolute left-[1100px] top-[480px] w-[440px] h-[400px] border-2 border-slate-500/30 bg-slate-900/40 rounded-3xl p-4 shadow-2xl">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest bg-slate-900/80 border border-slate-600/40 px-3 py-1 rounded-full">
                06 / Systems & MLOps Factory
              </span>
            </div>
          </div>

          {/* Render 3D Building Nodes */}
          {TOWN_NODES.map((node) => {
            const project = projects.find(p => p.id === node.projectId);
            if (!project) return null;

            const isHovered = hoveredNode?.projectId === node.projectId;
            const hasWebDemo = !!project.demoUrl;

            return (
              <div
                key={node.projectId}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFocusNode(node);
                  onSelectProject(project);
                }}
                className="absolute z-10 cursor-pointer group"
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: "translate(-50%, -50%)",
                  transformStyle: "preserve-3d"
                }}
              >
                {/* 3D Extruded Building Block */}
                <div
                  className={`relative bg-[#0d1322]/95 border-2 ${node.accentColor} rounded-2xl p-4 shadow-2xl transition-all duration-200 ${
                    isHovered ? "scale-110 z-30 ring-4 ring-white/30" : "hover:scale-105"
                  }`}
                  style={{
                    width: "210px",
                    transform: `translateZ(${node.height}px)`,
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Top Badge & SVG Icon */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="p-2 bg-slate-800/90 rounded-xl border border-slate-700">
                      {node.icon}
                    </div>

                    {hasWebDemo && (
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/40 rounded-full font-mono text-[9px] font-bold">
                        LIVE DEMO
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-xs font-bold text-white leading-tight line-clamp-2 mb-2 group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h4>

                  {/* Main Metric Chip */}
                  <div className="p-2 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between font-mono text-[10px]">
                    <span className="text-slate-400 uppercase">{project.metrics[0].label}</span>
                    <span className="font-bold text-emerald-400">{project.metrics[0].value}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                    {hasWebDemo && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-mono text-[9px] font-bold transition-all"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-mono text-[9px] font-bold transition-all border border-slate-700"
                    >
                      <span>Detail</span>
                      <BookOpen className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Navigation Hint Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between pointer-events-none">
          <div className="pointer-events-auto bg-[#0d1322]/90 backdrop-blur-md border border-[#1e293b] rounded-xl px-4 py-2 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-xl">
            <Move className="w-4 h-4 text-indigo-400" />
            <span>Klik & Geser Kanvas Peta 3D untuk Berkeliling</span>
          </div>
        </div>

      </div>

    </div>
  );
}
