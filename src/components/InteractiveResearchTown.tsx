"use client";

import React, { useState } from "react";
import { ProjectDetail } from "@/data/projects_detail";
import { 
  Building2, 
  ShieldCheck, 
  Truck, 
  Globe2, 
  Activity, 
  Cpu, 
  ExternalLink, 
  Github, 
  BookOpen, 
  Sparkles,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Compass
} from "lucide-react";

interface InteractiveResearchTownProps {
  projects: ProjectDetail[];
  onSelectProject: (project: ProjectDetail) => void;
}

interface DistrictConfig {
  id: string;
  category: "Banking" | "Insurance" | "SupplyChain" | "PublicPolicy" | "Healthcare" | "Systems";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
}

const DISTRICTS: DistrictConfig[] = [
  {
    id: "district-banking",
    category: "Banking",
    title: "Distrik Keuangan Kuantitatif & Pasar Modal",
    subtitle: "Pemodelan Volatilitas, Value at Risk (VaR), & Simulasi Stokastik Monte Carlo",
    icon: <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    gradient: "from-indigo-50/80 via-white to-slate-50/50",
    borderColor: "border-indigo-200/80",
    badgeBg: "bg-indigo-50",
    badgeText: "text-indigo-700"
  },
  {
    id: "district-insurance",
    category: "Insurance",
    title: "Institut Sains Aktuaria & Risiko Asuransi",
    subtitle: "Pricing GLM Tweedie, Ordinal Underwriting Rating, & Deteksi Fraud Klaim",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    gradient: "from-emerald-50/80 via-white to-slate-50/50",
    borderColor: "border-emerald-200/80",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700"
  },
  {
    id: "district-supplychain",
    category: "SupplyChain",
    title: "Pusat Logistik & Optimalisasi Supply Chain",
    subtitle: "Segmentasi RFM E-Commerce, Disparitas SLA Pengiriman, & Forecast ROP",
    icon: <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    gradient: "from-blue-50/80 via-white to-slate-50/50",
    borderColor: "border-blue-200/80",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-700"
  },
  {
    id: "district-publicpolicy",
    category: "PublicPolicy",
    title: "Pusat Kebijakan Publik & Ekonomi Makro",
    subtitle: "Pemulihan Ekonomi ASEAN, Sistem Zakat Zero-Leakage, & Analisis Pendidikan",
    icon: <Globe2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
    gradient: "from-teal-50/80 via-white to-slate-50/50",
    borderColor: "border-teal-200/80",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-700"
  },
  {
    id: "district-healthcare",
    category: "Healthcare",
    title: "Laboratorium Healthcare AI & Sinyal Audio",
    subtitle: "Diagnosis Onkologi Neural Network MLP, Reduksi Dimensi PCA, & Spotify Audio",
    icon: <Activity className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
    gradient: "from-rose-50/80 via-white to-slate-50/50",
    borderColor: "border-rose-200/80",
    badgeBg: "bg-rose-50",
    badgeText: "text-rose-700"
  },
  {
    id: "district-systems",
    category: "Systems",
    title: "Pabrik Rekayasa MLOps & Sistem Otomasi",
    subtitle: "FastAPI Inferensi Real-Time, Engine Riset AI OS, & Pemutar Musik Desktop GUI",
    icon: <Cpu className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
    gradient: "from-slate-100/80 via-white to-zinc-50/50",
    borderColor: "border-slate-300/80",
    badgeBg: "bg-slate-100",
    badgeText: "text-slate-800"
  }
];

export default function InteractiveResearchTown({
  projects,
  onSelectProject
}: InteractiveResearchTownProps) {
  const [activeDistrict, setActiveDistrict] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProjects = projects.filter(p => {
    const matchCat = activeDistrict === "All" || p.category === activeDistrict;
    const matchSearch = searchTerm.trim() === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-12">
      
      {/* Interactive Map Toolbar */}
      <div className="bg-[#ffffff] border border-[#e5e5e5] rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#f0f0f0] pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#111213] text-white rounded-xl shadow-xs">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl font-bold text-[#111213]">Peta Interaktif Distrik Riset (Research Town)</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#ecfdf5] text-[#059669] border border-[#a7f3d0] rounded-full">
                  LIVE INTERACTIVE MAP
                </span>
              </div>
              <p className="text-xs text-[#525252] font-mono mt-0.5">
                Eksplorasi 20 repositori riset terapan yang terbagi dalam 6 distrik domain spesifik.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#525252]">
            <span className="font-bold text-[#111213]">{filteredProjects.length}</span> / <span>20 Proyek Terpetakan</span>
          </div>
        </div>

        {/* District Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveDistrict("All")}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
              activeDistrict === "All"
                ? "bg-[#111213] text-white shadow-xs"
                : "bg-[#f4f4f5] text-[#525252] hover:bg-[#e4e4e7] hover:text-[#111213]"
            }`}
          >
            🏛️ Semua Distrik (20)
          </button>
          {DISTRICTS.map((d) => {
            const count = projects.filter(p => p.category === d.category).length;
            const isActive = activeDistrict === d.category;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDistrict(d.category)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isActive
                    ? "bg-[#111213] text-white shadow-xs"
                    : "bg-[#f4f4f5] text-[#525252] hover:bg-[#e4e4e7] hover:text-[#111213]"
                }`}
              >
                {d.icon}
                <span>{d.category} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#71717a] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari repositori, algoritma, atau metrik di dalam Peta Distrik..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#fafaf9] border border-[#e4e4e7] rounded-xl text-xs font-mono text-[#111213] placeholder-[#71717a] focus:outline-none focus:border-[#111213] focus:bg-[#ffffff] transition-all"
          />
        </div>
      </div>

      {/* Spatial Districts Container */}
      <div className="space-y-12">
        {DISTRICTS.map((district) => {
          const districtProjects = filteredProjects.filter(p => p.category === district.category);
          if (districtProjects.length === 0) return null;

          return (
            <div
              key={district.id}
              className={`border ${district.borderColor} rounded-2xl bg-gradient-to-br ${district.gradient} p-6 sm:p-8 space-y-6 shadow-xs transition-all`}
            >
              {/* District Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5]/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 bg-white rounded-2xl shadow-xs border ${district.borderColor}`}>
                    {district.icon}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#111213]">
                      {district.title}
                    </h3>
                    <p className="text-xs font-mono text-[#525252] mt-0.5">
                      {district.subtitle}
                    </p>
                  </div>
                </div>

                <span className={`self-start sm:self-auto text-xs font-mono font-bold px-3 py-1 rounded-full ${district.badgeBg} ${district.badgeText} border ${district.borderColor}`}>
                  {districtProjects.length} Repositori Terverifikasi
                </span>
              </div>

              {/* Project Building Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {districtProjects.map((project) => {
                  const hasWebDemo = !!project.demoUrl;

                  return (
                    <div
                      key={project.id}
                      className="group bg-[#ffffff] border border-[#e4e4e7] hover:border-[#111213] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4 cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      {/* Card Top: Category & Main KPI */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold px-2.5 py-1 bg-[#f4f4f5] text-[#525252] rounded-full uppercase tracking-wider">
                            {project.domain}
                          </span>

                          {hasWebDemo && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] rounded-full animate-pulse">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>LIVE WEB APP</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h4 className="font-serif text-base font-bold text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                            {project.title}
                          </h4>
                          <p className="text-xs text-[#525252] line-clamp-2 mt-1.5 leading-relaxed">
                            {project.tagline}
                          </p>
                        </div>
                      </div>

                      {/* Card Middle: Primary KPI Chip */}
                      <div className="p-3 bg-[#fafaf9] border border-[#f0f0f0] rounded-xl flex items-center justify-between font-mono">
                        <span className="text-[11px] text-[#71717a] font-medium uppercase">
                          {project.metrics[0].label}
                        </span>
                        <span className="text-sm font-bold text-[#111213]">
                          {project.metrics[0].value}
                        </span>
                      </div>

                      {/* Card Bottom: Tech stack & CTAs */}
                      <div className="space-y-3 pt-2 border-t border-[#f4f4f5]">
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono text-[#71717a]">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          {hasWebDemo && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl text-xs font-mono font-bold transition-all shadow-xs"
                            >
                              <span>Demo Web</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(project);
                            }}
                            className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                              hasWebDemo
                                ? "bg-[#f4f4f5] text-[#111213] hover:bg-[#e4e4e7]"
                                : "w-full bg-[#111213] text-white hover:bg-black"
                            }`}
                          >
                            <span>Monograf</span>
                            <BookOpen className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
