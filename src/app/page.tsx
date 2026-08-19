"use client";

import React, { useState, useMemo } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { 
  ShieldCheck, 
  Database, 
  Layers, 
  CheckCircle2, 
  ExternalLink, 
  Search, 
  Activity, 
  Cpu, 
  Building2, 
  TrendingUp, 
  ShoppingBag, 
  HeartPulse, 
  Code2, 
  Calculator,
  Terminal,
  Github,
  Mail,
  Linkedin
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Interactive Live Simulator State (VaR & Education Ratio Calculator)
  const [simAssetValue, setSimAssetValue] = useState<number>(100000000);
  const [simVaRPct, setSimVaRPct] = useState<number>(2.28);
  const [simStudents, setSimStudents] = useState<number>(25000);
  const [simLecturers, setSimLecturers] = useState<number>(1120);

  const categories = [
    { id: "All", label: "All Repositories", icon: Layers },
    { id: "Insurance", label: "Actuarial & Insurance", icon: Activity },
    { id: "Banking", label: "Quantitative Finance", icon: TrendingUp },
    { id: "SupplyChain", label: "E-Commerce & Supply Chain", icon: ShoppingBag },
    { id: "PublicPolicy", label: "Public Policy & Impact", icon: Building2 },
    { id: "Healthcare", label: "Healthcare AI & ML", icon: HeartPulse },
    { id: "Systems", label: "MLOps & Systems", icon: Cpu },
  ];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      const matchCat = selectedCategory === "All" || proj.category === selectedCategory;
      const matchSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        proj.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Live Calculations
  const calculatedVaRNominal = (simAssetValue * (simVaRPct / 100));
  const calculatedLecturerRatio = (simStudents / (simLecturers || 1)).toFixed(1);
  const isRatioIdeal = parseFloat(calculatedLecturerRatio) <= 30.0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Header / Executive Identity */}
      <header className="border-b border-slate-800/80 pb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-lg text-blue-400">
                IR
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Izam Rosiawan</h1>
                <p className="text-sm text-slate-400 font-medium">Quantitative Analyst & Applied Machine Learning Specialist</p>
              </div>
            </div>
          </div>

          {/* Social & Contact Bar */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/izamrosiawan" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-sm font-medium text-slate-200 transition-colors"
            >
              <Github className="w-4 h-4 text-slate-300" />
              <span>github.com/izamrosiawan</span>
            </a>
            <a 
              href="mailto:izamrosiawan13@gmail.com" 
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-600/10 border border-blue-500/30 hover:bg-blue-600/20 text-sm font-medium text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mt-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight max-w-3xl">
            Quantitative Analytics & Applied Machine Learning Engineering Portfolio
          </h2>
          <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
            Koleksi portofolio data science tingkat produksi yang menggabungkan ketelitian aktuaria, pemodelan keuangan stokastik, penanganan ketidakseimbangan kelas, dan arsitektur MLOps terstandarisasi.
          </p>
        </div>

        {/* Key Production Badges (Clean Solid Containers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <Database className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <div className="text-xl font-bold font-mono text-slate-100">{PROJECTS.length}+</div>
              <div className="text-xs font-medium text-slate-400">Production Repositories</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mt-0.5" />
            <div>
              <div className="text-xl font-bold font-mono text-emerald-400">100%</div>
              <div className="text-xs font-medium text-slate-400">Automated Pytest Suite</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <div className="text-xl font-bold font-mono text-amber-400">Zero Leakage</div>
              <div className="text-xs font-medium text-slate-400">Train-Only Scaling & Target Audit</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3.5">
            <Code2 className="w-5 h-5 text-indigo-400 mt-0.5" />
            <div>
              <div className="text-xl font-bold font-mono text-indigo-400">6 Domains</div>
              <div className="text-xs font-medium text-slate-400">Deep Specialized Verticals</div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Interactive Analytics Sandbox (Interactive Feature) */}
      <section className="my-10 p-6 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
          <Calculator className="w-4 h-4" />
          <span>Live Interactive Sandbox</span>
        </div>
        <h3 className="text-lg font-bold text-slate-100">Live Mathematical Calculators (Client-Side Verification)</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Coba verifikasi formulasi matematika langsung yang digunakan pada portofolio perbankan kuantitatif dan analisis pendidikan:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* VaR Financial Sandbox */}
          <div className="p-4 rounded-lg bg-[#0c121e] border border-slate-800">
            <div className="text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>1. Value at Risk (VaR 95%) Simulator</span>
              <span className="text-xs font-mono text-blue-400">BBCA Historical Metric</span>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Nilai Investasi Portofolio (IDR):</label>
                <input 
                  type="number" 
                  value={simAssetValue} 
                  onChange={(e) => setSimAssetValue(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 font-mono text-slate-200"
                />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Estimasi Kerugian Harian Maksimal (95% CI):</span>
                <span className="font-mono font-bold text-amber-400 text-sm">
                  Rp {calculatedVaRNominal.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* Lecturer Ratio Sandbox */}
          <div className="p-4 rounded-lg bg-[#0c121e] border border-slate-800">
            <div className="text-sm font-semibold text-slate-200 flex items-center justify-between">
              <span>2. Rasio Kecukupan Pengajaran Dosen</span>
              <span className="text-xs font-mono text-emerald-400">Campus-ID Metric</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Total Mahasiswa:</label>
                <input 
                  type="number" 
                  value={simStudents} 
                  onChange={(e) => setSimStudents(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 font-mono text-slate-200"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Total Dosen:</label>
                <input 
                  type="number" 
                  value={simLecturers} 
                  onChange={(e) => setSimLecturers(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-1.5 font-mono text-slate-200"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800 text-xs">
              <span className="text-slate-400">Rasio Dosen : Mahasiswa:</span>
              <span className={`font-mono font-bold text-sm ${isRatioIdeal ? "text-emerald-400" : "text-amber-400"}`}>
                1 : {calculatedLecturerRatio} {isRatioIdeal ? "(Ideal ≤ 1:30)" : "(Perlu Penambahan)"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Navigation & Search Filter */}
      <section className="mt-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Domain Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-sm"
                      : "bg-slate-900/90 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search algorithm, metric, library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
            />
          </div>
        </div>
      </section>

      {/* Grid of Clean Structured Project Cards */}
      <section className="mt-6">
        <div className="text-xs font-medium text-slate-400 mb-4">
          Showing <span className="font-bold text-slate-200">{filteredProjects.length}</span> verified repositories
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between p-5 group"
            >
              <div>
                {/* Domain & Pytest Pill */}
                <div className="flex items-center justify-between gap-2 text-xs mb-3">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20 text-[11px]">
                    {project.domain}
                  </span>
                  {project.hasTests && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Pytest Passed
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="text-base font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-snug">
                  {project.title}
                </h4>

                {/* Summary */}
                <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                {/* Key Metrics Display */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-center p-1.5 rounded bg-slate-950/60 border border-slate-800/50">
                      <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                      <div className="text-xs font-bold font-mono text-slate-200 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mathematical Formula Preview */}
                {project.formula && (
                  <div className="mt-3 p-2 rounded bg-slate-950/80 border border-slate-800/60 font-mono text-[11px] text-slate-300 overflow-x-auto">
                    <span className="text-slate-400 select-none">Formula: </span>
                    <code>{project.formula}</code>
                  </div>
                )}
              </div>

              {/* Footer Tech Stack & Direct Link */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-1 py-0.5 rounded text-slate-400 text-[10px] font-mono">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors shrink-0"
                >
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Principles Section (Anti-AI Slop Manifesto) */}
      <section className="mt-14 p-6 rounded-xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-base font-bold text-slate-200 uppercase tracking-wider text-xs">
          Engineering & Academic Rigor Standards
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Setiap repositori dibangun mengikuti 5 protokol metodologi data science ketat:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs text-slate-300">
          <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-blue-400 block mb-1">1. Strict Train-Only Preprocessing</span>
            Train-test split dilakukan mutlak sebelum imputasi dan penskalaan (StandardScaler) untuk mengeliminasi data leakage.
          </div>
          <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">2. Target Reconstruction Prevention</span>
            Fitur prediktor diaudit secara matematis agar tidak memiliki hubungan identitas aljabar dengan variabel target.
          </div>
          <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
            <span className="font-bold text-amber-400 block mb-1">3. Deterministic Seed & Modular Inference</span>
            Inisialisasi random seed eksplisit pada seluruh komputasi stokastik dan modul inferensi mandiri di folder `src/`.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-800/80 text-center text-xs text-slate-400">
        <p>Built with Next.js 15 & Tailwind CSS. Hosted on GitHub Pages / Vercel.</p>
        <p className="mt-1 text-slate-400">© 2026 Izam Rosiawan. All portfolio code & datasets are licensed under MIT.</p>
      </footer>
    </main>
  );
}
