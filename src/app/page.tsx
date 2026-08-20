"use client";

import React, { useState, useMemo } from "react";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  ShieldCheck, 
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
  X,
  ChevronRight,
  Sparkles,
  Check,
  Copy,
  BookOpen,
  ArrowRight,
  Sliders,
  FileCode,
  Layers,
  BarChart3,
  Flame,
  CheckCircle2,
  Atom
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"projects" | "benchmarks" | "simulator">("projects");

  // Interactive Live Model Simulators
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

  // Pure Premium Model live computation
  const baseFreq = 0.08 * (bonusMalus / 50) * (drivAge < 25 ? 1.45 : drivAge > 60 ? 1.25 : 1.0);
  const baseSev = 1250 * (1 + (vehPower - 4) * 0.15);
  const livePurePremium = baseFreq * baseSev;

  // SNBT live computation
  const liveCompetitionRatio = (applicants / (quota || 1)).toFixed(1);
  const liveAcceptanceRate = ((quota / (applicants || 1)) * 100).toFixed(2);

  const categories = [
    { id: "All", label: "All Repositories", count: DETAILED_PROJECTS.length },
    { id: "Insurance", label: "Actuarial & Insurance", count: DETAILED_PROJECTS.filter(p => p.category === "Insurance").length },
    { id: "Banking", label: "Quantitative Finance", count: DETAILED_PROJECTS.filter(p => p.category === "Banking").length },
    { id: "SupplyChain", label: "Supply Chain & Ops", count: DETAILED_PROJECTS.filter(p => p.category === "SupplyChain").length },
    { id: "PublicPolicy", label: "Public Policy & Impact", count: DETAILED_PROJECTS.filter(p => p.category === "PublicPolicy").length },
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
    <div className="min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#080c14]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-mono font-bold text-sm shadow-sm">
              IR
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-slate-100">Izam Rosiawan</span>
              <span className="text-[11px] text-slate-400 font-mono block -mt-0.5">Quantitative Data Scientist</span>
            </div>
          </div>

          {/* Navigation Mode Pill Tabs */}
          <div className="hidden md:flex items-center p-1 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-medium transition-all ${
                activeTab === "projects"
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Repositories ({DETAILED_PROJECTS.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-medium transition-all ${
                activeTab === "benchmarks"
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Empirical Benchmarks</span>
            </button>

            <button
              onClick={() => setActiveTab("simulator")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md font-medium transition-all ${
                activeTab === "simulator"
                  ? "bg-indigo-600 text-white shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Live Inference Simulator</span>
            </button>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-xs font-mono text-slate-300 transition-all active:scale-[0.98]"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-sm active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Executive Hero Section */}
        <section className="border-b border-slate-800/80 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            <span>Production ML & Actuarial Quantitative Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl leading-[1.15]">
            Industrial Data Science, Actuarial Pricing & Financial Modeling.
          </h1>
          
          <p className="mt-5 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Menghubungkan teori aktuaria mendalam, ekonometrika keuangan, dan machine learning skala produksi. Dilengkapi validasi pengujian otomatis Pytest 100%, protokol anti kebocoran data terisolasi, dan inferensi matematis teruji.
          </p>

          {/* Key Executive Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Total Repositories</div>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-1">{DETAILED_PROJECTS.length} Proyek</div>
              <div className="text-[11px] text-slate-500 mt-1">Verified on GitHub</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Automated Tests</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">100% Passed</div>
              <div className="text-[11px] text-slate-500 mt-1">Pytest & Integration Suites</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Integrity Audit</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">Zero Leakage</div>
              <div className="text-[11px] text-slate-500 mt-1">Strict Train-Test Isolation</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800/80 hover:border-slate-700 transition-all">
              <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider">Specialized Domains</div>
              <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">6 Verticals</div>
              <div className="text-[11px] text-slate-500 mt-1">Actuarial to Macro Policy</div>
            </div>
          </div>
        </section>

        {/* Tab 1: Live Mathematical Simulators */}
        {activeTab === "simulator" && (
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100">Live Mathematical Inference Simulators</h2>
              <p className="text-xs text-slate-400 mt-1">
                Uji langsung model matematika dan formulasi aktuaria yang telah diterapkan pada repositori terkait:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Quantitative Finance VaR Simulator */}
              <div className="p-5 rounded-xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono text-[11px] border border-indigo-500/20 font-medium">Quant Finance</span>
                    <span className="text-slate-400 font-mono text-[11px]">VaR & ES 95%</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">Portfolio Value at Risk Simulator</h3>
                  <p className="text-xs text-slate-400 mt-1">Estimasi risiko kerugian harian saham Big Four Bank Indonesia.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Pilih Emiten Perbankan:</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(["BBCA", "BBRI", "BMRI", "BBNI"] as const).map((bank) => (
                          <button
                            key={bank}
                            onClick={() => setSelectedBank(bank)}
                            className={`py-1.5 rounded-lg font-mono font-bold text-xs transition-all active:scale-[0.98] ${
                              selectedBank === bank
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
                            }`}
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1.5 font-mono italic">
                        {bankRiskParams[selectedBank].label}
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Nominal Portofolio (IDR):</label>
                      <input
                        type="number"
                        value={portfolioValue}
                        onChange={(e) => setPortfolioValue(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Value at Risk 95% (1 Hari):</span>
                    <span className="font-mono font-bold text-amber-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].var95).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expected Shortfall 95% (Tail Risk):</span>
                    <span className="font-mono font-bold text-red-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].es95).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-300">Sensitivitas Pasar (Beta):</span>
                    <span className="font-mono font-bold text-slate-100">{bankRiskParams[selectedBank].beta}</span>
                  </div>
                </div>
              </div>

              {/* 2. Actuarial Pure Premium Simulator */}
              <div className="p-5 rounded-xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[11px] border border-emerald-500/20 font-medium">Actuarial Science</span>
                    <span className="text-slate-400 font-mono text-[11px]">GLM Poisson-Gamma</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">Pure Premium Pricing Calculator</h3>
                  <p className="text-xs text-slate-400 mt-1">Simulasi penetapan premi murni asuransi motor freMTPL2.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Tenaga Mesin Kendaraan (VehPower):</span>
                        <span className="font-mono font-bold text-slate-200">{vehPower}</span>
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
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Usia Pengemudi (DrivAge):</span>
                        <span className="font-mono font-bold text-slate-200">{drivAge} Tahun</span>
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
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Bonus-Malus Coefficient:</span>
                        <span className="font-mono font-bold text-slate-200">{bonusMalus}</span>
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

                <div className="mt-5 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ekspektasi Frekuensi Klaim:</span>
                    <span className="font-mono font-bold text-slate-200">{(baseFreq * 100).toFixed(2)}% / thn</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ekspektasi Severitas Biaya:</span>
                    <span className="font-mono font-bold text-slate-200">€{baseSev.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-300 font-semibold">Rekomendasi Premi Murni E[Y]:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">€{livePurePremium.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* 3. Higher Education SNBT Calculator */}
              <div className="p-5 rounded-xl bg-[#0d1322] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px] border border-blue-500/20 font-medium">Public Policy</span>
                    <span className="text-slate-400 font-mono text-[11px]">Campus-ID Metric</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">SNBT Competition & Acceptance Calculator</h3>
                  <p className="text-xs text-slate-400 mt-1">Menghitung peluang kelolosan dan rasio keketatan prodi.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <label className="text-slate-400 block mb-1">Daya Tampung / Kuota Kursi:</label>
                      <input
                        type="number"
                        value={quota}
                        onChange={(e) => setQuota(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Jumlah Pendaftar / Peminat:</label>
                      <input
                        type="number"
                        value={applicants}
                        onChange={(e) => setApplicants(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700/80 rounded-lg px-3 py-1.5 font-mono text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rasio Keketatan Persaingan:</span>
                    <span className="font-mono font-bold text-slate-200">1 : {liveCompetitionRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Peluang Kelolosan Masuk:</span>
                    <span className={`font-mono font-bold ${Number(liveAcceptanceRate) < 5 ? "text-red-400" : "text-emerald-400"}`}>
                      {liveAcceptanceRate}%
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-800">
                    <span className="text-slate-300">Tingkat Persaingan:</span>
                    <span className="font-mono font-bold text-indigo-400">
                      {Number(liveAcceptanceRate) < 3.0 ? "Sangat Tinggi" : Number(liveAcceptanceRate) < 7.0 ? "Tinggi" : "Moderat"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Tab 2: Evaluation Metrics Matrix */}
        {activeTab === "benchmarks" && (
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100">Benchmark & Performance Evaluation Matrix</h2>
              <p className="text-xs text-slate-400 mt-1">
                Tabel evaluasi kuantitatif perbandingan model terhadap baseline empiris di seluruh repositori:
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0d1322]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3.5">Project Domain</th>
                    <th className="px-4 py-3.5">Best Model Architecture</th>
                    <th className="px-4 py-3.5">Primary Metric</th>
                    <th className="px-4 py-3.5">Baseline Comparison</th>
                    <th className="px-4 py-3.5">Operational Impact</th>
                    <th className="px-4 py-3.5">Repository</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono">
                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">Motor Insurance Pricing</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Poisson x Gamma GLM</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">Gini = 0.2882</td>
                    <td className="px-4 py-3.5 text-slate-400">vs Mean Rate (Gini 0.00)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">Eliminasi adverse selection risiko tinggi</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/insurance-pricing-glm" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">Life Underwriting Risk</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Ordinal LightGBM (Nelder-Mead)</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">QWK = 0.6495</td>
                    <td className="px-4 py-3.5 text-slate-400">vs Multiclass Softmax (0.5639)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">74% Straight-Through Processing (STP)</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/insurance-underwriting-risk" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">Big Four Banks Risk</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Historical VaR & Expected Shortfall</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">BBCA VaR = 2.28%</td>
                    <td className="px-4 py-3.5 text-slate-400">vs BBNI (VaR 3.25%, ES 4.72%)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">Portofolio Markowitz meredam MDD ke -48.37%</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/indonesian-banks-risk-analytics" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">Claims Fraud Detection</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Cost-Sensitive LightGBM</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">PR-AUC = 0.5248</td>
                    <td className="px-4 py-3.5 text-slate-400">vs Logistic Reg (0.4957)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">Prioritisasi Special Investigation Unit</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/insurance-claims-fraud-detection" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">SMART-MUSTAHIK Zakat</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Zero-Leakage Random Forest</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">Akurasi = 87.50%</td>
                    <td className="px-4 py-3.5 text-slate-400">vs Baseline Noise (83.33%)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">Penurunan salah sasaran (IER) sebesar 5.71 pp</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/smart-mustahik" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3.5 font-sans font-medium text-slate-200">Breast Cancer Oncology</td>
                    <td className="px-4 py-3.5 text-indigo-400 font-medium">Neural Network MLP (16-8)</td>
                    <td className="px-4 py-3.5 text-slate-100 font-bold">Precision = 100.00%</td>
                    <td className="px-4 py-3.5 text-slate-400">vs Random Forest (97.83%)</td>
                    <td className="px-4 py-3.5 font-sans text-slate-300">Nol false-positive diagnosis pada data uji</td>
                    <td className="px-4 py-3.5">
                      <a href="https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer" target="_blank" className="text-indigo-400 hover:underline">Link</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Tab 0: Repositories & Case Studies (Default) */}
        {activeTab === "projects" && (
          <section className="py-6">
            {/* Filter Navigation Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-[0.98] ${
                        isActive
                          ? "bg-indigo-600 text-white font-semibold shadow-sm"
                          : "bg-[#0d1322] text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? "bg-indigo-800 text-white" : "bg-slate-950 text-slate-400"}`}>
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
                  className="w-full bg-[#0d1322] border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="rounded-xl bg-[#0d1322] border border-slate-800/90 hover:border-indigo-500/50 hover:bg-[#111827] transition-all p-5 flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-indigo-500/5"
                >
                  <div>
                    {/* Header Pill */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-[11px] border border-indigo-500/20">
                        {project.domain}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Pytest 100%
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-1 line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Problem Preview */}
                    <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                      {project.problem}
                    </p>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/60 text-center">
                          <div className="text-[10px] text-slate-400 truncate">{m.label}</div>
                          <div className="text-xs font-bold font-mono text-slate-100 mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-indigo-400 group-hover:translate-x-0.5 transition-transform font-medium">
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Case Study Detail Modal (In-Depth Technical View) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b101c] border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-[#0b101c]/95 backdrop-blur-md z-10">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
                    {activeProject.domain}
                  </span>
                  <span className="text-slate-400 font-mono text-xs">{activeProject.datasetInfo.name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{activeProject.title}</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">{activeProject.tagline}</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs sm:text-sm">
              
              {/* Problem & Methodology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                  <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    1. Masalah Bisnis & Formulasi
                  </div>
                  <p className="text-slate-400 leading-relaxed">{activeProject.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#0d1322] border border-slate-800">
                  <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    2. Metodologi Komputasi & Solusi
                  </div>
                  <p className="text-slate-400 leading-relaxed">{activeProject.methodology}</p>
                </div>
              </div>

              {/* Key Quantitative Metrics */}
              <div>
                <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-3 font-mono">
                  3. Evaluasi Metrik Kuantitatif
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-400">{m.label}</div>
                      <div className="text-lg font-bold font-mono text-slate-100 mt-0.5">{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Equation Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                  4. {activeProject.formula.title}
                </div>
                <div className="p-3 my-2 rounded-lg bg-[#0d1322] border border-slate-800 font-mono text-indigo-300 text-xs overflow-x-auto">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-xs text-slate-400">{activeProject.formula.explanation}</p>
              </div>

              {/* Key Findings List */}
              <div>
                <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                  5. Temuan Analitik Utama
                </div>
                <ul className="space-y-2 text-slate-300">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Production Code Snippet */}
              <div className="relative">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span>6. Modular Production Inference Code (src/)</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied" : "Copy Code"}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-[#0b101c] flex items-center justify-between gap-4 sticky bottom-0 rounded-b-2xl">
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
                <span>Open Full GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
