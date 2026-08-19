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
  FileCode
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("" );
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
    { id: "Healthcare", label: "Healthcare Oncology AI", count: DETAILED_PROJECTS.filter(p => p.category === "Healthcare").length },
    { id: "Systems", label: "MLOps & Systems", count: DETAILED_PROJECTS.filter(p => p.category === "Systems").length },
  ];

  const filteredProjects = useMemo(() => {
    return DETAILED_PROJECTS.filter((proj) => {
      const matchCat = selectedCategory === "All" || proj.category === selectedCategory;
      const matchSearch = 
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        proj.problem.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800/80 bg-[#070a12]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-md bg-blue-600/10 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm text-blue-400">
              IR
            </span>
            <div>
              <span className="font-bold text-sm text-slate-100 tracking-tight block">Izam Rosiawan</span>
              <span className="text-[11px] text-slate-400 font-mono">portfolio-hub.system</span>
            </div>
          </div>

          {/* Nav Tabs */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "projects" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Repositories & Case Studies
            </button>
            <button
              onClick={() => setActiveTab("simulator")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
                activeTab === "simulator" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-blue-400" />
              <span>Interactive Model Simulator</span>
            </button>
            <button
              onClick={() => setActiveTab("benchmarks")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "benchmarks" ? "bg-slate-800 text-slate-100 shadow-sm" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Evaluation Metrics Matrix
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900 border border-slate-700/80 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Executive Header */}
        <section className="border-b border-slate-800/80 pb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4">
            <span>Verified MLOps & Quantitative Research Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight max-w-4xl leading-tight">
            Actuarial Science, Quantitative Finance & Applied Machine Learning Portfolio
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Menampilkan repositori data science tingkat produksi dengan kepatuhan metodologi ketat: pemisahan frekuensi-severitas aktuaria, analisis risiko ekstrim ekor gemuk (VaR/ES), penanganan ketidakseimbangan kelas berekor gemuk, dan arsitektur pengujian otomatis Pytest 100%.
          </p>

          {/* Key Executive Metrics Table */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Repositories</div>
              <div className="text-2xl font-bold font-mono text-slate-100 mt-1">{DETAILED_PROJECTS.length} Specialized</div>
              <div className="text-[11px] text-slate-400 mt-1">Verified on GitHub</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Unit Testing Status</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">100% Passed</div>
              <div className="text-[11px] text-slate-400 mt-1">Automated Pytest Suite</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Leakage Audit Protocol</div>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">Zero Leakage</div>
              <div className="text-[11px] text-slate-400 mt-1">AST Static Analysis Verified</div>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/70 border border-slate-800">
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Specialized Verticals</div>
              <div className="text-2xl font-bold font-mono text-indigo-400 mt-1">6 Domains</div>
              <div className="text-[11px] text-slate-400 mt-1">Insurance to Macro Policy</div>
            </div>
          </div>
        </section>

        {/* Tab 1: Interactive Model Simulator */}
        {activeTab === "simulator" && (
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-100">Live Mathematical Inference Simulators</h2>
              <p className="text-xs text-slate-400 mt-1">
                Uji langsung model matematika dan formulasi aktuaria yang telah kami terapkan pada repositori terkait:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 1. Quantitative Finance VaR Simulator */}
              <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-medium">Quant Finance</span>
                    <span className="text-slate-400 font-mono">VaR & ES 95%</span>
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
                            className={`py-1 rounded font-mono font-bold text-xs transition-colors ${
                              selectedBank === bank
                                ? "bg-blue-600 text-white"
                                : "bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800"
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
                      <label className="text-slate-400 block mb-1">Total Nilai Investasi Portofolio (IDR):</label>
                      <input
                        type="number"
                        value={portfolioValue}
                        onChange={(e) => setPortfolioValue(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily VaR 95% (Persentase):</span>
                    <span className="font-mono font-bold text-amber-400">
                      {(bankRiskParams[selectedBank].var95 * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Maksimal Potensi Rugi Harian:</span>
                    <span className="font-mono font-bold text-amber-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].var95).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expected Shortfall 95% (Ekstrim):</span>
                    <span className="font-mono font-bold text-red-400">
                      Rp {(portfolioValue * bankRiskParams[selectedBank].es95).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Actuarial Pure Premium Simulator */}
              <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono font-medium">Actuarial GLM</span>
                    <span className="text-slate-400 font-mono">Frequency x Severity</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-100">Motor Insurance Pure Premium Calculator</h3>
                  <p className="text-xs text-slate-400 mt-1">Kalkulasi premi murni berdasarkan profil risiko pengemudi.</p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Tenaga Mesin (VehPower):</span>
                        <span className="font-mono font-bold text-slate-200">{vehPower}</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="12"
                        value={vehPower}
                        onChange={(e) => setVehPower(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Usia Pengemudi (DrivAge):</span>
                        <span className="font-mono font-bold text-slate-200">{drivAge} Tahun</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="75"
                        value={drivAge}
                        onChange={(e) => setDrivAge(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Bonus-Malus Index:</span>
                        <span className="font-mono font-bold text-slate-200">{bonusMalus}</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="150"
                        value={bonusMalus}
                        onChange={(e) => setBonusMalus(Number(e.target.value))}
                        className="w-full accent-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ekspektasi Frekuensi Klaim:</span>
                    <span className="font-mono font-bold text-slate-200">{(baseFreq * 100).toFixed(2)}% per tahun</span>
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
              <div className="p-5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono font-medium">Public Policy</span>
                    <span className="text-slate-400 font-mono">Campus-ID Metric</span>
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
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 font-mono text-slate-200"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Jumlah Pendaftar / Peminat:</label>
                      <input
                        type="number"
                        value={applicants}
                        onChange={(e) => setApplicants(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 font-mono text-slate-200"
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

            <div className="overflow-x-auto rounded-lg border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-slate-300 font-mono uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Project Domain</th>
                    <th className="px-4 py-3">Best Model Architecture</th>
                    <th className="px-4 py-3">Primary Metric</th>
                    <th className="px-4 py-3">Baseline Comparison</th>
                    <th className="px-4 py-3">Operational Impact</th>
                    <th className="px-4 py-3">Repository</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-950/60 font-mono">
                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">Motor Insurance Pricing</td>
                    <td className="px-4 py-3 text-blue-400">Poisson x Gamma GLM</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">Gini = 0.2882</td>
                    <td className="px-4 py-3 text-slate-400">vs Mean Rate (Gini 0.00)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Eliminasi adverse selection risiko tinggi</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-pricing-glm" target="_blank" className="text-blue-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">Life Underwriting Risk</td>
                    <td className="px-4 py-3 text-blue-400">Ordinal LightGBM (Nelder-Mead)</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">QWK = 0.6495</td>
                    <td className="px-4 py-3 text-slate-400">vs Multiclass Softmax (0.5639)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">74% Straight-Through Processing (STP)</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-underwriting-risk" target="_blank" className="text-blue-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">Big Four Banks Risk</td>
                    <td className="px-4 py-3 text-blue-400">Historical VaR & Expected Shortfall</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">BBCA VaR = 2.28%</td>
                    <td className="px-4 py-3 text-slate-400">vs BBNI (VaR 3.25%, ES 4.72%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Portofolio Markowitz meredam MDD ke -48.37%</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/indonesian-banks-risk-analytics" target="_blank" className="text-blue-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">Claims Fraud Detection</td>
                    <td className="px-4 py-3 text-blue-400">Cost-Sensitive LightGBM</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">PR-AUC = 0.5248</td>
                    <td className="px-4 py-3 text-slate-400">vs Logistic Reg (0.4957)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Prioritisasi Special Investigation Unit</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/insurance-claims-fraud-detection" target="_blank" className="text-blue-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">SMART-MUSTAHIK Zakat</td>
                    <td className="px-4 py-3 text-blue-400">Zero-Leakage Random Forest</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">Akurasi = 87.50%</td>
                    <td className="px-4 py-3 text-slate-400">vs Baseline Noise (83.33%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Penurunan salah sasaran (IER) sebesar 5.71 pp</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/smart-mustahik" target="_blank" className="text-blue-400 hover:underline">Link</a>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-900/50">
                    <td className="px-4 py-3 font-sans font-medium text-slate-200">Breast Cancer Oncology</td>
                    <td className="px-4 py-3 text-blue-400">Neural Network MLP (16-8)</td>
                    <td className="px-4 py-3 text-slate-100 font-bold">Precision = 100.00%</td>
                    <td className="px-4 py-3 text-slate-400">vs Random Forest (97.83%)</td>
                    <td className="px-4 py-3 font-sans text-slate-300">Nol false-positive diagnosis pada data uji</td>
                    <td className="px-4 py-3">
                      <a href="https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer" target="_blank" className="text-blue-400 hover:underline">Link</a>
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
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        isActive
                          ? "bg-blue-600 text-white font-semibold shadow-sm"
                          : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${isActive ? "bg-blue-800 text-white" : "bg-slate-950 text-slate-400"}`}>
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Project Cards Grid (Clean Editorial Design) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="rounded-lg bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all p-5 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Header Pill */}
                    <div className="flex items-center justify-between gap-2 text-xs mb-3">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono text-[11px] border border-blue-500/20">
                        {project.domain}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Pytest Passed
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-sm font-bold text-slate-100 group-hover:text-blue-300 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-1 line-clamp-1">
                      {project.tagline}
                    </p>

                    {/* Problem Preview */}
                    <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {project.problem}
                    </p>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-950/60 border border-slate-800/50 text-center">
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
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-blue-400 group-hover:translate-x-0.5 transition-transform font-medium">
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
          <div className="bg-[#0b101b] border border-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-[#0b101b] z-10">
              <div>
                <div className="flex items-center gap-2 text-xs mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-mono font-medium">
                    {activeProject.domain}
                  </span>
                  <span className="text-slate-400 font-mono">{activeProject.datasetInfo.name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{activeProject.title}</h2>
                <p className="text-xs text-slate-400 font-mono mt-1">{activeProject.tagline}</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs sm:text-sm">
              
              {/* Problem & Methodology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                  <div className="font-bold text-xs text-slate-300 uppercase tracking-wider mb-2 font-mono">
                    1. Masalah Bisnis & Formulasi
                  </div>
                  <p className="text-slate-400 leading-relaxed">{activeProject.problem}</p>
                </div>

                <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800">
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
                    <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-xs text-slate-400">{m.label}</div>
                      <div className="text-lg font-bold font-mono text-slate-100 mt-0.5">{m.value}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Equation Box */}
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 font-mono">
                  4. {activeProject.formula.title}
                </div>
                <div className="p-3 my-2 rounded bg-slate-900 border border-slate-800 font-mono text-slate-200 text-xs overflow-x-auto">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
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
                <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-800 bg-[#0b101b] flex items-center justify-between gap-4 sticky bottom-0">
              <div className="text-xs text-slate-400 font-mono">
                Dataset: {activeProject.datasetInfo.size} ({activeProject.datasetInfo.source})
              </div>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white transition-colors shadow-sm"
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
