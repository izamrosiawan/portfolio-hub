"use client";

import React, { useState, useMemo } from "react";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  Search, 
  Layers, 
  BarChart3, 
  Atom, 
  Github, 
  Mail, 
  X, 
  Check, 
  Copy, 
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Terminal,
  Activity,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"projects" | "benchmarks" | "simulator">("projects");

  // 1. VaR Financial Simulator
  const [portfolioValue, setPortfolioValue] = useState<number>(100000000);
  const [selectedBank, setSelectedBank] = useState<"BBCA" | "BBRI" | "BMRI" | "BBNI">("BBCA");
  
  // 2. Pure Premium Insurance Actuarial Simulator
  const [vehPower, setVehPower] = useState<number>(5);
  const [drivAge, setDrivAge] = useState<number>(30);
  const [bonusMalus, setBonusMalus] = useState<number>(50);

  // 3. Higher Education SNBT Calculator
  const [quota, setQuota] = useState<number>(50);
  const [applicants, setApplicants] = useState<number>(1200);

  const bankRiskParams = {
    BBCA: { var95: 0.0228, es95: 0.0346, beta: 0.710, label: "Defensive Anchor (Safe Haven)" },
    BBRI: { var95: 0.0310, es95: 0.0458, beta: 1.066, label: "Micro High-Yield (Cyclical)" },
    BMRI: { var95: 0.0318, es95: 0.0463, beta: 1.116, label: "Corporate High ROE (Cyclical)" },
    BBNI: { var95: 0.0325, es95: 0.0472, beta: 1.108, label: "High Beta Sensitivity" },
  };

  const baseFreq = 0.08 * (bonusMalus / 50) * (drivAge < 25 ? 1.45 : drivAge > 60 ? 1.25 : 1.0);
  const baseSev = 1250 * (1 + (vehPower - 4) * 0.15);
  const livePurePremium = baseFreq * baseSev;

  const liveCompetitionRatio = (applicants / (quota || 1)).toFixed(1);
  const liveAcceptanceRate = ((quota / (applicants || 1)) * 100).toFixed(2);

  const categories = [
    { id: "All", label: "Semua Proyek", count: DETAILED_PROJECTS.length },
    { id: "Insurance", label: "Aktuaria & Asuransi", count: DETAILED_PROJECTS.filter(p => p.category === "Insurance").length },
    { id: "Banking", label: "Keuangan Kuantitatif", count: DETAILED_PROJECTS.filter(p => p.category === "Banking").length },
    { id: "SupplyChain", label: "Supply Chain & Ops", count: DETAILED_PROJECTS.filter(p => p.category === "SupplyChain").length },
    { id: "PublicPolicy", label: "Kebijakan Publik", count: DETAILED_PROJECTS.filter(p => p.category === "PublicPolicy").length },
    { id: "Healthcare", label: "Healthcare AI", count: DETAILED_PROJECTS.filter(p => p.category === "Healthcare").length },
    { id: "Systems", label: "MLOps & Systems", count: DETAILED_PROJECTS.filter(p => p.category === "Systems").length },
  ];

  const filteredProjects = useMemo(() => {
    return DETAILED_PROJECTS.filter(project => {
      const matchCat = selectedCategory === "All" || project.category === selectedCategory;
      const matchSearch = searchQuery.trim() === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* 1. Ultra-Clean Minimal Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-mono font-bold text-xs">
              IR
            </div>
            <div>
              <span className="font-semibold text-sm text-white tracking-tight">Izam Rosiawan</span>
              <span className="text-[11px] text-slate-400 font-mono block -mt-0.5">Quantitative Data Science Hub</span>
            </div>
          </div>

          {/* Centered Mode Navigation Switcher */}
          <div className="hidden md:flex items-center p-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === "projects"
                  ? "bg-white/10 text-white font-medium shadow-sm border border-white/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Proyek ({DETAILED_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === "benchmarks"
                  ? "bg-white/10 text-white font-medium shadow-sm border border-white/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Benchmark Evaluasi</span>
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all ${
                activeTab === "simulator"
                  ? "bg-white/10 text-white font-medium shadow-sm border border-white/10"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Simulator Live</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-xs font-mono text-slate-300 transition-all active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-sm active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Kontak</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 2. Bespoke Editorial Hero (Clean & High-Contrast) */}
        <section className="pb-12 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Production ML & Actuarial Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl font-sans">
            Sains Data Industri, Penetapan Tarif Aktuaria & Pemodelan Keuangan Kuantitatif.
          </h1>
          
          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed font-normal">
            Portofolio rekayasa machine learning terapan tingkat produksi milik **Izam Rosiawan**. Menggabungkan teori aktuaria mendalam (*pure premium Poisson x Gamma GLM*), analisis risiko keuangan (*Value at Risk & Expected Shortfall 95%*), serta pipeline terisolasi bebas kebocoran data dengan pengujian otomatis Pytest 100%.
          </p>

          {/* Key Executive Pillars Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Repositori</div>
              <div className="text-xl font-bold font-mono text-white mt-1">{DETAILED_PROJECTS.length} Proyek Spesifik</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Open-source di GitHub</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Automated Tests</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">100% Passed</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Pytest & Integration Suites</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Audit Integritas</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">Zero Leakage</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Isolasi Train-Test Terverifikasi</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Domain Vertikal</div>
              <div className="text-xl font-bold font-mono text-indigo-400 mt-1">6 Vertikal</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Asuransi hingga Kebijakan Publik</div>
            </div>
          </div>
        </section>

        {/* 3. Tab 1: Live Interactive Simulators */}
        {activeTab === "simulator" && (
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Simulator Inferensi Model Live</h2>
              <p className="text-xs text-slate-400 mt-1">
                Kalkulasi interaktif langsung dari formulasi matematika yang diimplementasikan pada repositori:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quant Finance VaR Simulator */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[11px] border border-indigo-500/20">Keuangan Kuantitatif</span>
                    <span className="text-slate-400 font-mono text-[11px]">VaR & ES 95%</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Value at Risk Portofolio Saham Bank</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Estimasi potensi risiko kerugian harian saham Big Four Bank Indonesia.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">Pilih Emiten Bank:</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(["BBCA", "BBRI", "BMRI", "BBNI"] as const).map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`py-1.5 rounded-lg font-mono font-bold text-xs transition-all active:scale-[0.98] ${
                              selectedBank === bank
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.06]"
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 font-mono italic">
                        {bankRiskParams[selectedBank].label}
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-300 font-medium block mb-1">Nilai Portofolio (IDR):</label>
                      <input
                        type="number"
                        value={portfolioValue}
                        onChange={(e) => setPortfolioValue(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-3 py-1.5 font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Value at Risk (1 Hari 95%):</span>
                    <span className="font-mono font-bold text-amber-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].var95).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Expected Shortfall (Tail Risk):</span>
                    <span className="font-mono font-bold text-red-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].es95).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/[0.04]">
                    <span className="text-slate-400">Sensitivitas Pasar (Beta):</span>
                    <span className="font-mono font-bold text-white">{bankRiskParams[selectedBank].beta}</span>
                  </div>
                </div>
              </div>

              {/* Actuarial Pure Premium Simulator */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20">Sains Aktuaria</span>
                    <span className="text-slate-400 font-mono text-[11px]">GLM Poisson-Gamma</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Kalkulator Premi Murni Asuransi Motor</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Simulasi kalkulasi premi murni frekuensi x keparahan klaim.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-300 font-medium mb-1">
                        <span>Kekuatan Kendaraan (VehPower):</span>
                        <span className="font-mono font-bold text-white">{vehPower}</span>
                      </div>
                      <input
                        type="range"
                        min={4}
                        max={12}
                        value={vehPower}
                        onChange={(e) => setVehPower(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-medium mb-1">
                        <span>Usia Pengemudi (DrivAge):</span>
                        <span className="font-mono font-bold text-white">{drivAge} Tahun</span>
                      </div>
                      <input
                        type="range"
                        min={18}
                        max={75}
                        value={drivAge}
                        onChange={(e) => setDrivAge(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 font-medium mb-1">
                        <span>Koefisien Bonus-Malus:</span>
                        <span className="font-mono font-bold text-white">{bonusMalus}</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={230}
                        value={bonusMalus}
                        onChange={(e) => setBonusMalus(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Ekspektasi Frekuensi Klaim:</span>
                    <span className="font-mono font-bold text-white">{(baseFreq * 100).toFixed(2)}% / thn</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Ekspektasi Biaya Klaim:</span>
                    <span className="font-mono font-bold text-white">€{baseSev.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/[0.04]">
                    <span className="text-emerald-400 font-semibold">Premi Murni Rekomendasi E[Y]:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">€{livePurePremium.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Higher Education SNBT Calculator */}
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-mono text-[11px] border border-blue-500/20">Kebijakan Publik</span>
                    <span className="text-slate-400 font-mono text-[11px]">Campus-ID Analytics</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">Kalkulator Keketatan & Peluang SNBT</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">Estimasi peluang kelolosan prodi perguruan tinggi negeri.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">Daya Tampung / Kuota Kursi:</label>
                      <input
                        type="number"
                        value={quota}
                        onChange={(e) => setQuota(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-3 py-1.5 font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-medium block mb-1">Jumlah Peminat / Pendaftar:</label>
                      <input
                        type="number"
                        value={applicants}
                        onChange={(e) => setApplicants(Number(e.target.value))}
                        className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg px-3 py-1.5 font-mono text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Rasio Keketatan Persaingan:</span>
                    <span className="font-mono font-bold text-white">1 : {liveCompetitionRatio}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Peluang Kelolosan Masuk:</span>
                    <span className={`font-mono font-bold ${Number(liveAcceptanceRate) < 5 ? "text-red-400" : "text-emerald-400"}`}>
                      {liveAcceptanceRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-white/[0.04]">
                    <span className="text-slate-400">Kategori Persaingan:</span>
                    <span className="font-mono font-bold text-indigo-400">
                      {Number(liveAcceptanceRate) < 3.0 ? "Sangat Tinggi" : Number(liveAcceptanceRate) < 7.0 ? "Tinggi" : "Moderat"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. Tab 2: Evaluation Matrix */}
        {activeTab === "benchmarks" && (
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white">Matriks Evaluasi & Benchmark Model</h2>
              <p className="text-xs text-slate-400 mt-1">
                Perbandingan kinerja model machine learning terhadap baseline konvensional:
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/[0.04] text-slate-300 font-mono uppercase text-[11px] border-b border-white/[0.08]">
                  <tr>
                    <th className="px-4 py-3">Domain Proyek</th>
                    <th className="px-4 py-3">Arsitektur Model Terbaik</th>
                    <th className="px-4 py-3">Metrik Utama</th>
                    <th className="px-4 py-3">Perbandingan Baseline</th>
                    <th className="px-4 py-3">Dampak Operasional</th>
                    <th className="px-4 py-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] font-mono">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">Motor Insurance Pricing</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Poisson x Gamma GLM</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Gini = 0.2882</td>
                    <td className="px-4 py-3 text-slate-400">vs Mean Rate (0.00)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Eliminasi adverse selection risiko tinggi</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-pricing-glm" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">Life Underwriting Risk</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Ordinal LightGBM (Nelder-Mead)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">QWK = 0.6495</td>
                    <td className="px-4 py-3 text-slate-400">vs Softmax (0.5639)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">74% Straight-Through Processing (STP)</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-underwriting-risk" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">Big Four Banks Risk</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Historical VaR & ES 95%</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">BBCA VaR = 2.28%</td>
                    <td className="px-4 py-3 text-slate-400">vs BBNI (VaR 3.25%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Portofolio Markowitz meredam MDD ke -48.37%</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/indonesian-banks-risk-analytics" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">Claims Fraud Detection</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Cost-Sensitive LightGBM</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">PR-AUC = 0.5248</td>
                    <td className="px-4 py-3 text-slate-400">vs Logistic Reg (0.4957)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Prioritisasi Unit Investigasi Khusus (SIU)</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-claims-fraud-detection" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">SMART-MUSTAHIK Zakat</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Zero-Leakage Random Forest</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Akurasi = 87.50%</td>
                    <td className="px-4 py-3 text-slate-400">vs Baseline Noise (83.33%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Penurunan salah sasaran (IER) sebesar 5.71 pp</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/smart-mustahik" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-sans font-medium text-white">Breast Cancer Oncology</td>
                    <td className="px-4 py-3 text-indigo-400 font-medium">Neural Network MLP (16-8)</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Presisi = 100.00%</td>
                    <td className="px-4 py-3 text-slate-400">vs Random Forest (97.83%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Nol false-positive diagnosis pada data uji</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer" target="_blank" className="text-indigo-400 hover:text-indigo-300 underline font-medium">Lihat Repo</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 5. Tab 0: Curated Project Cards (Editorial Layout) */}
        {activeTab === "projects" && (
          <section className="py-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-white/[0.06]">
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-white text-slate-900 font-bold shadow-sm"
                          : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? "bg-slate-200 text-slate-900 font-bold" : "bg-white/[0.06] text-slate-400"}`}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari algoritma, formula, metrik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Project Cards (Restrained 8px Card Radii, High Readability) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all p-5 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-300 font-mono text-[11px] border border-white/[0.06]">
                        {project.domain}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Pytest 100%
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 font-mono mt-1 line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Problem Statement */}
                    <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                      {project.problem}
                    </p>

                    {/* 3 Metrics Box */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/[0.06]">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-black/40 border border-white/[0.04] text-center">
                          <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                          <div className="text-xs font-bold font-mono text-white mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-white font-medium group-hover:text-indigo-300 transition-colors">
                      <span>Studi Kasus</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* 6. Case Study Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b0e17] border border-white/[0.1] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 sticky top-0 bg-[#0b0e17]/95 backdrop-blur-xl z-10">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
                    {activeProject.domain}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">{activeProject.datasetInfo.name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{activeProject.title}</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">{activeProject.tagline}</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs sm:text-sm">
              
              {/* Problem & Methodology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    1. Masalah Bisnis & Formulasi
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">{activeProject.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    2. Metodologi Komputasi & Solusi
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">{activeProject.methodology}</p>
                </div>
              </div>

              {/* Quantitative Metrics */}
              <div>
                <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2.5 font-mono">
                  3. Evaluasi Metrik Kuantitatif
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
                      <div className="text-xs text-slate-400">{m.label}</div>
                      <div className="text-base font-bold font-mono text-white mt-0.5">{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Equation Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-mono">
                  4. {activeProject.formula.title}
                </div>
                <div className="p-3 my-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] font-mono text-indigo-300 text-xs overflow-x-auto">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-xs text-slate-400 mt-1">{activeProject.formula.explanation}</p>
              </div>

              {/* Key Findings */}
              <div>
                <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                  5. Temuan Analitik Utama
                </div>
                <ul className="space-y-2 text-slate-300 text-xs">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div className="relative">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>6. Modular Production Inference Code (src/)</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Tersalin" : "Salin Kode"}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-black/60 border border-white/[0.08] font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/[0.08] bg-[#0b0e17] flex items-center justify-between gap-4 sticky bottom-0 rounded-b-2xl">
              <div className="text-xs text-slate-400 font-mono">
                Dataset: {activeProject.datasetInfo.size} ({activeProject.datasetInfo.source})
              </div>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white transition-all shadow-sm active:scale-[0.98]"
              >
                <Github className="w-4 h-4" />
                <span>Buka Repositori GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
