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
  Move,
  ArrowLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Box,
  CornerDownRight,
  Sparkle
} from "lucide-react";

interface IsometricQuantTownMapProps {
  projects: ProjectDetail[];
  onSelectProject: (project: ProjectDetail) => void;
}

interface DistrictComplex {
  id: string;
  category: "Banking" | "Insurance" | "SupplyChain" | "PublicPolicy" | "Healthcare" | "Systems";
  name: string;
  subtitle: string;
  worldX: number;
  worldY: number;
  height: number;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  subLabs: {
    id: string;
    projectId?: string;
    title: string;
    description: string;
    roomX: number;
    roomY: number;
    icon: React.ReactNode;
    isInteractive: boolean;
  }[];
}

const DISTRICT_COMPLEXES: DistrictComplex[] = [
  // 1. Banking District
  {
    id: "district-banking",
    category: "Banking",
    name: "Financial Risk & Banking Complex",
    subtitle: "Pusat Pemodelan Volatilitas, Risk Analytics & Monte Carlo Engine",
    worldX: 240,
    worldY: 200,
    height: 85,
    icon: <Building2 className="w-6 h-6 text-indigo-400" />,
    accentColor: "border-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
    subLabs: [
      {
        id: "lab-bank-risk",
        projectId: "indonesian-banks-risk-analytics",
        title: "Laboratorium Volatilitas & VaR 95% Bank BEI",
        description: "Analisis statistik log-return, Value at Risk, dan Expected Shortfall 4 Bank BUMN.",
        roomX: 250,
        roomY: 200,
        icon: <Building2 className="w-5 h-5 text-indigo-400" />,
        isInteractive: true
      },
      {
        id: "lab-monte-carlo",
        projectId: "stock-price-simulation-jsmr",
        title: "Ruang Simulasi Stokastik Monte Carlo (JSMR)",
        description: "1.000 lintasan Geometric Brownian Motion peramalan harga saham toll road.",
        roomX: 650,
        roomY: 220,
        icon: <TrendingUp className="w-5 h-5 text-indigo-300" />,
        isInteractive: true
      },
      {
        id: "lab-markowitz",
        projectId: "indonesian-banks-risk-analytics",
        title: "Suite Optimasi Portofolio Efisien Markowitz",
        description: "Kurva batas efisiensi Sharpe Ratio dan alokasi bobot diversifikasi.",
        roomX: 450,
        roomY: 500,
        icon: <Database className="w-5 h-5 text-indigo-300" />,
        isInteractive: true
      }
    ]
  },

  // 2. Actuarial Science Institute
  {
    id: "district-insurance",
    category: "Insurance",
    name: "Actuarial Science & Risk Institute",
    subtitle: "Fasilitas Pricing GLM Tweedie, Underwriting Rating, & Deteksi Fraud",
    worldX: 720,
    worldY: 180,
    height: 95,
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    accentColor: "border-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.4)",
    subLabs: [
      {
        id: "lab-pricing-glm",
        projectId: "insurance-pricing-glm",
        title: "Studio Pricing Engine GLM Tweedie & Poisson",
        description: "Model premi murni frekuensi-severitas asuransi kendaraan bermotor.",
        roomX: 220,
        roomY: 180,
        icon: <Database className="w-5 h-5 text-emerald-400" />,
        isInteractive: true
      },
      {
        id: "lab-underwriting",
        projectId: "insurance-underwriting-risk",
        title: "Pusat Underwriting Otomatis Ordinal QWK",
        description: "Penilaian risiko 8-tingkat dengan optimasi ambang batas Nelder-Mead.",
        roomX: 680,
        roomY: 180,
        icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
        isInteractive: true
      },
      {
        id: "lab-fraud",
        projectId: "insurance-claims-fraud-detection",
        title: "Unit Investigasi Fraud Klaim Asuransi SIU",
        description: "Deteksi penipuan klaim cost-sensitive PR-AUC berbasis LightGBM.",
        roomX: 300,
        roomY: 480,
        icon: <Search className="w-5 h-5 text-emerald-300" />,
        isInteractive: true
      },
      {
        id: "lab-cross-sell",
        projectId: "insurance-cross-sell-propensity",
        title: "Laboratorium Marketing Propensity & Uplift",
        description: "Skoring kecenderungan konversi asuransi kesehatan ke kendaraan.",
        roomX: 600,
        roomY: 480,
        icon: <Target className="w-5 h-5 text-emerald-300" />,
        isInteractive: true
      },
      {
        id: "lab-clv",
        projectId: "insurance-customer-lifetime-value",
        title: "Suite Customer Lifetime Value & Retensi Polis",
        description: "Prediksi nilai seumur hidup nasabah dan optimasi pembaruan.",
        roomX: 850,
        roomY: 340,
        icon: <Award className="w-5 h-5 text-emerald-300" />,
        isInteractive: true
      }
    ]
  },

  // 3. Supply Chain Hub
  {
    id: "district-supplychain",
    category: "SupplyChain",
    name: "Supply Chain & Logistics Hub",
    subtitle: "Pusat Segmentasi RFM E-Commerce & Optimalisasi Inventori ROP",
    worldX: 240,
    worldY: 580,
    height: 75,
    icon: <Truck className="w-6 h-6 text-blue-400" />,
    accentColor: "border-blue-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
    subLabs: [
      {
        id: "lab-olist",
        projectId: "olist-brazilian-ecommerce-analytics",
        title: "Terminal Analytics E-Commerce Olist Brasil",
        description: "Segmentasi RFM, disparitas logistik antar negara bagian, & 9 tabel relasional.",
        roomX: 300,
        roomY: 240,
        icon: <Truck className="w-5 h-5 text-blue-400" />,
        isInteractive: true
      },
      {
        id: "lab-demand",
        projectId: "supply-chain-demand-forecasting",
        title: "Fasilitas Peramalan Demand SARIMA & Stok ROP",
        description: "Dekomposisi deret waktu musiman dan kalkulasi safety stock dinamis.",
        roomX: 700,
        roomY: 400,
        icon: <Package className="w-5 h-5 text-blue-300" />,
        isInteractive: true
      }
    ]
  },

  // 4. Public Policy Plaza
  {
    id: "district-publicpolicy",
    category: "PublicPolicy",
    name: "Public Policy & ASEAN Center",
    subtitle: "Pusat Peramalan Pariwisata ASEAN & Zakat Zero-Leakage",
    worldX: 720,
    worldY: 580,
    height: 80,
    icon: <Globe className="w-6 h-6 text-teal-400" />,
    accentColor: "border-teal-500",
    glowColor: "rgba(20, 184, 166, 0.4)",
    subLabs: [
      {
        id: "lab-asean",
        projectId: "asean-economic-recovery",
        title: "Pusat Peramalan Pemulihan Ekonomi ASEAN",
        description: "Lintasan V-shape wisatawan mancanegara & indikator makro 10 negara.",
        roomX: 250,
        roomY: 220,
        icon: <Globe className="w-5 h-5 text-teal-400" />,
        isInteractive: true
      },
      {
        id: "lab-zakat",
        projectId: "smart-mustahik",
        title: "Kantor Alokasi Zakat SMART-MUSTAHIK",
        description: "Sistem pendukung keputusan zakat produktif zero data leakage.",
        roomX: 680,
        roomY: 220,
        icon: <Sliders className="w-5 h-5 text-teal-300" />,
        isInteractive: true
      },
      {
        id: "lab-campus",
        projectId: "campus-id",
        title: "Observatorium Pendidikan Tinggi Campus-ID",
        description: "Pemetaan rasio dosen-mahasiswa & keketatan seleksi SNBT nasional.",
        roomX: 480,
        roomY: 480,
        icon: <GraduationCap className="w-5 h-5 text-teal-300" />,
        isInteractive: true
      }
    ]
  },

  // 5. Healthcare AI Lab
  {
    id: "district-healthcare",
    category: "Healthcare",
    name: "Healthcare AI & Audio Analytics Complex",
    subtitle: "Fasilitas AI Onkologi MLP, Reduksi PCA, & Sinyal Audio Spotify",
    worldX: 1200,
    worldY: 200,
    height: 85,
    icon: <Activity className="w-6 h-6 text-rose-400" />,
    accentColor: "border-rose-500",
    glowColor: "rgba(244, 63, 94, 0.4)",
    subLabs: [
      {
        id: "lab-cancer",
        projectId: "mlp-vs-random-forest-breast-cancer",
        title: "Laboratorium AI Onkologi MLP vs Random Forest",
        description: "Klasifikasi tumor jinak vs ganas dengan akurasi 97.08% dan SMOTE.",
        roomX: 250,
        roomY: 240,
        icon: <Activity className="w-5 h-5 text-rose-400" />,
        isInteractive: true
      },
      {
        id: "lab-pca",
        projectId: "principal-component-analysis-clustering",
        title: "Suite Reduksi Dimensi PCA & Klaster Obesitas",
        description: "Segmentasi 4 profil individu dari 15 variabel gaya hidup.",
        roomX: 650,
        roomY: 240,
        icon: <Activity className="w-5 h-5 text-rose-300" />,
        isInteractive: true
      },
      {
        id: "lab-spotify",
        projectId: "spotify-tracks-analysis",
        title: "Studio Sinyal Audio Music Analytics Spotify",
        description: "Profiling 114k lagu & 125 genre musik berbasis fitur audio.",
        roomX: 450,
        roomY: 500,
        icon: <Music className="w-5 h-5 text-emerald-400" />,
        isInteractive: true
      }
    ]
  },

  // 6. MLOps Factory
  {
    id: "district-systems",
    category: "Systems",
    name: "Systems & MLOps Engineering Factory",
    subtitle: "Pabrik Server Web Service Real-Time, Engine AI OS, & GUI Desktop",
    worldX: 1200,
    worldY: 580,
    height: 90,
    icon: <Cpu className="w-6 h-6 text-slate-300" />,
    accentColor: "border-slate-600",
    glowColor: "rgba(100, 116, 139, 0.4)",
    subLabs: [
      {
        id: "lab-fastapi",
        projectId: "fastapi-house-price-predictor",
        title: "Port Inferensi Real-Time FastAPI & Pydantic",
        description: "REST API prediksi harga rumah latency <15ms dengan Swagger UI.",
        roomX: 250,
        roomY: 220,
        icon: <Zap className="w-5 h-5 text-amber-400" />,
        isInteractive: true
      },
      {
        id: "lab-ai-os",
        projectId: "ai-research-os",
        title: "Bengkel Automasi Riset AI Research OS",
        description: "CLI Toolkit verifikasi 1-to-1 BibTeX, AST audit leakage, & LaTeX.",
        roomX: 680,
        roomY: 220,
        icon: <Terminal className="w-5 h-5 text-slate-300" />,
        isInteractive: true
      },
      {
        id: "lab-music-player",
        projectId: "cic-music-player",
        title: "Studio Aplikasi Desktop Audio GUI CIC",
        description: "Pemutar musik CustomTkinter & Pygame Mixer berbasis Node Graph.",
        roomX: 450,
        roomY: 480,
        icon: <Cpu className="w-5 h-5 text-slate-400" />,
        isInteractive: true
      }
    ]
  }
];

export default function IsometricQuantTownMap({
  projects,
  onSelectProject
}: IsometricQuantTownMapProps) {
  // Navigation State: Level 1 (World Map) vs Level 2 (District Interior)
  const [level, setLevel] = useState<"level1_world" | "level2_district">("level1_world");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictComplex | null>(null);

  // Map Controls State
  const [scale, setScale] = useState<number>(0.85);
  const [rotateX, setRotateX] = useState<number>(55);
  const [rotateZ, setRotateZ] = useState<number>(-35);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredComplex, setHoveredComplex] = useState<DistrictComplex | null>(null);

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
  
  const handleResetWorld = () => {
    setLevel("level1_world");
    setSelectedDistrict(null);
    setScale(0.85);
    setRotateX(55);
    setRotateZ(-35);
    setPan({ x: 0, y: 0 });
  };

  // Drill-down into Level 2 District Building Interior
  const handleEnterDistrict = (district: DistrictComplex) => {
    setSelectedDistrict(district);
    setLevel("level2_district");
    setScale(1.0);
    setRotateX(45);
    setRotateZ(-25);
    setPan({ x: -100, y: -50 });
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#050811] border border-[#1e293b] rounded-3xl shadow-2xl text-white select-none">
      
      {/* 1. Top Breadcrumb & Control Overlay */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-none">
        
        {/* Breadcrumb Navigation Pill */}
        <div className="pointer-events-auto bg-[#0b101d]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-300 font-bold">
              <button
                onClick={handleResetWorld}
                className="hover:text-indigo-400 transition-colors"
              >
                Peta Utama Town
              </button>

              {level === "level2_district" && selectedDistrict && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-indigo-400 font-bold">{selectedDistrict.name}</span>
                </>
              )}
            </div>

            <p className="text-xs text-slate-400 font-mono mt-0.5">
              {level === "level1_world" 
                ? "Klik Gedung Distrik untuk Masuk ke Dalam Kompleks Riset."
                : "Klik Ruangan Lab untuk Membuka Monograf & Demo Web."}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pointer-events-auto bg-[#0b101d]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl p-1.5 shadow-xl flex items-center gap-1 font-mono text-xs">
          {level === "level2_district" && (
            <button
              onClick={handleResetWorld}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-xs mr-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Peta Utama</span>
            </button>
          )}

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
            onClick={handleResetWorld}
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
        className={`w-full h-[660px] sm:h-[740px] relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#050811] to-black ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "1200px" }}
      >
        {/* Isometric Grid Floor Background */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.2) 0%, transparent 70%),
              linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 50px 50px, 50px 50px"
          }}
        />

        {/* LEVEL 1: MAIN TOWN WORLD VIEW */}
        {level === "level1_world" && (
          <div
            className="absolute top-0 left-0 w-[1600px] h-[950px] transition-transform duration-100 ease-out origin-top-left"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Render 6 Major District Isometric Buildings */}
            {DISTRICT_COMPLEXES.map((district) => {
              const projectCount = district.subLabs.filter(l => l.projectId).length;
              const isHovered = hoveredComplex?.id === district.id;

              return (
                <div
                  key={district.id}
                  onMouseEnter={() => setHoveredComplex(district)}
                  onMouseLeave={() => setHoveredComplex(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEnterDistrict(district);
                  }}
                  className="absolute z-10 cursor-pointer group"
                  style={{
                    left: `${district.worldX}px`,
                    top: `${district.worldY}px`,
                    transform: "translate(-50%, -50%)",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {/* Glowing Pulse Ring under Building */}
                  <div
                    className="absolute -inset-6 rounded-full opacity-50 group-hover:opacity-100 transition-opacity animate-ping"
                    style={{ backgroundColor: district.glowColor }}
                  />

                  {/* 3D Extruded Building Structure */}
                  <div
                    className={`relative bg-[#0b101d]/95 border-2 ${district.accentColor} rounded-3xl p-6 shadow-2xl transition-all duration-200 ${
                      isHovered ? "scale-110 z-30 ring-4 ring-indigo-400/40" : "hover:scale-105"
                    }`}
                    style={{
                      width: "280px",
                      transform: `translateZ(${district.height}px)`,
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xs">
                        {district.icon}
                      </div>

                      <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full font-mono text-[10px] font-bold">
                        {projectCount} Repositori Lab
                      </span>
                    </div>

                    {/* District Building Title */}
                    <h3 className="font-serif text-base font-bold text-white leading-tight mb-1 group-hover:text-indigo-300 transition-colors">
                      {district.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-mono line-clamp-2 mb-4">
                      {district.subtitle}
                    </p>

                    {/* Entrance Button */}
                    <div className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-mono text-xs font-bold transition-all shadow-md">
                      <span>Masuk ke Dalam Gedung</span>
                      <CornerDownRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* LEVEL 2: DISTRICT BUILDING INTERIOR SUB-MAP VIEW ("DALEM NYA") */}
        {level === "level2_district" && selectedDistrict && (
          <div
            className="absolute top-0 left-0 w-[1200px] h-[750px] transition-transform duration-100 ease-out origin-top-left"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale}) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg)`,
              transformStyle: "preserve-3d"
            }}
          >
            {/* Interior Building Floor Plan Boundary */}
            <div className="absolute inset-x-8 inset-y-8 border-4 border-indigo-500/40 bg-indigo-950/20 rounded-3xl p-8 backdrop-blur-xs shadow-2xl">
              <div className="flex items-center justify-between border-b border-indigo-500/30 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl">
                    {selectedDistrict.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white">{selectedDistrict.name} - Denah Dalam (Interior)</h3>
                    <p className="text-xs font-mono text-indigo-300">Pilih Ruang Laboratorium untuk Menginspeksi Kode & Aplikasi Web Live</p>
                  </div>
                </div>

                <button
                  onClick={handleResetWorld}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-mono text-xs font-bold border border-slate-700 transition-all"
                >
                  Keluar Gedung
                </button>
              </div>

              {/* Render Sub-Labs / Rooms inside Building */}
              <div className="relative w-full h-[540px]">
                {selectedDistrict.subLabs.map((lab) => {
                  const project = lab.projectId ? projects.find(p => p.id === lab.projectId) : null;
                  const hasWebDemo = project?.demoUrl;

                  return (
                    <div
                      key={lab.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project) onSelectProject(project);
                      }}
                      className="absolute z-20 cursor-pointer group"
                      style={{
                        left: `${lab.roomX}px`,
                        top: `${lab.roomY}px`,
                        transform: "translate(-50%, -50%)",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      {/* Room Card */}
                      <div
                        className="bg-[#0b101d]/95 border-2 border-indigo-400/80 hover:border-indigo-300 rounded-2xl p-4 shadow-2xl transition-all duration-200 hover:scale-110 hover:-translate-y-2 group-hover:ring-4 group-hover:ring-indigo-400/30"
                        style={{ width: "240px" }}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="p-2 bg-indigo-950 rounded-xl border border-indigo-800">
                            {lab.icon}
                          </div>

                          {hasWebDemo && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-full font-mono text-[9px] font-bold">
                              LIVE DEMO WEB
                            </span>
                          )}
                        </div>

                        <h4 className="font-serif text-xs font-bold text-white leading-tight mb-1 group-hover:text-indigo-300 transition-colors">
                          {lab.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-mono line-clamp-2 mb-3">
                          {lab.description}
                        </p>

                        {project && (
                          <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between font-mono text-[10px] mb-3">
                            <span className="text-slate-400 uppercase">{project.metrics[0].label}</span>
                            <span className="font-bold text-emerald-400">{project.metrics[0].value}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
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
                              if (project) onSelectProject(project);
                            }}
                            className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-mono text-[9px] font-bold transition-all"
                          >
                            <span>Inspeksi</span>
                            <BookOpen className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. Bottom Instruction Banner Overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-30 flex items-end justify-between pointer-events-none">
          <div className="pointer-events-auto bg-[#0b101d]/90 backdrop-blur-md border border-[#1e293b] rounded-xl px-4 py-2 text-xs font-mono text-slate-300 flex items-center gap-2 shadow-xl">
            <Move className="w-4 h-4 text-indigo-400" />
            <span>
              {level === "level1_world"
                ? "Klik Gedung Distrik untuk Masuk ke Dalam (" + DISTRICT_COMPLEXES.length + " Kompleks)"
                : "Klik Ruangan Lab Dalam Gedung (" + selectedDistrict?.name + ")"}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
