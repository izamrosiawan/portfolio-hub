"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  ArrowUpRight, 
  Github, 
  Mail, 
  X, 
  Copy,
  ExternalLink,
  BookOpen,
  Search,
  ChevronRight,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Truck,
  Globe,
  Activity,
  Cpu
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const categories = [
    { id: "All", label: "Semua Riset (20)" },
    { id: "Insurance", label: "Aktuaria & Asuransi (5)" },
    { id: "Banking", label: "Keuangan Kuantitatif (2)" },
    { id: "SupplyChain", label: "Supply Chain & Ops (2)" },
    { id: "PublicPolicy", label: "Kebijakan Publik (3)" },
    { id: "Healthcare", label: "Healthcare AI (4)" },
    { id: "Systems", label: "MLOps & Systems (4)" },
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
    <div className="min-h-screen bg-[#e5e5e5] text-[#111213] antialiased font-sans">
      
      {/* 1. Max Arden Header Bar */}
      <header className="border-b border-[#d4d4d4] bg-[#f4f4f5]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xl sm:text-2xl tracking-tighter text-[#111213] font-black uppercase">
              IZAM ROSIAWAN
            </span>
            <span className="text-[10px] font-mono text-[#525252] font-semibold tracking-widest uppercase mt-0.5">
              QUANTITATIVE DATA SCIENCE & ACTUARIAL RESEARCH
            </span>
          </div>

          <div className="flex items-center gap-8 text-xs font-mono font-black uppercase tracking-wider">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="text-[#111213] hover:text-[#2563eb] transition-colors"
            >
              [ GITHUB ↗ ]
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-[#111213] hover:text-[#2563eb] transition-colors"
            >
              [ EMAIL ↗ ]
            </a>
          </div>
        </div>
      </header>

      {/* 2. Infinite Ticker Marquee Strip (Max Arden Style) */}
      <div className="bg-[#111213] text-white py-2.5 overflow-hidden border-b border-black font-mono text-xs font-bold uppercase tracking-widest">
        <div className="inline-flex gap-8 whitespace-nowrap animate-marquee">
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
          <span>STRICT ZERO-LEAKAGE PRECISION. ACTUARIAL GLM TWEEDIE.</span>
          <span>INDONESIAN BIG FOUR BANKS FINANCIAL RISK. ASEAN ECONOMIC RECOVERY.</span>
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
        </div>
      </div>

      {/* 3. Max Arden Hero Showcase Section */}
      <section className="relative max-w-7xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#d4d4d4] bg-[#111213]">
          
          {/* Main Studio Generated Hero Image */}
          <div className="relative w-full h-[520px] sm:h-[620px]">
            <Image
              src="/images/hero_hand_phone.jpg"
              alt="Izam Rosiawan Portfolio Mobile Showcase"
              fill
              className="object-cover object-center opacity-85 hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>

          {/* Max Arden Glassmorphism Card Overlay */}
          <div className="absolute bottom-8 left-6 right-6 sm:left-12 sm:bottom-12 sm:right-auto max-w-2xl bg-white/80 backdrop-blur-md border border-white/60 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#525252] uppercase tracking-widest block mb-2">
                01 / PRESENTATION MATTERS
              </span>
              <h1 className="font-sans text-2xl sm:text-4xl text-[#111213] font-black tracking-tight leading-tight uppercase">
                FOR THOSE WHO KNOW QUANTITATIVE RIGOR & PRESENTATION MATTER.
              </h1>
              <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed mt-4">
                Sains data industri, pemodelan aktuaria, analisis risiko kuantitatif perbankan, dan pengujian otomatis Pytest 100%.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects-section"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#111213] text-white hover:bg-black font-mono font-bold text-xs rounded-2xl transition-all shadow-md uppercase tracking-wider"
              >
                <span>EKSPLORASI MONOGRAF</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive Live Showcase Deck (Max Arden Screenshots 1 & 3 Style Carousel) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex items-center justify-between border-b border-[#d4d4d4] pb-4 mb-8">
          <div>
            <span className="text-xs font-mono font-bold text-[#525252] uppercase tracking-widest">
              02 / LIVE INTERACTIVE APPLICATIONS
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl text-[#111213] font-black uppercase tracking-tight mt-1">
              WEBSITE PORTFOLIOS & INTERACTIVE WEB DEMOS
            </h2>
          </div>
          
          <span className="text-xs font-mono font-bold text-[#525252]">
            [ 3 LIVE WEB APPS ]
          </span>
        </div>

        {/* 3 Live Showcase Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Showcase Card 1: Bank Risk Analytics */}
          <div className="group bg-white border border-[#d4d4d4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/mockup_bank_risk.jpg"
                alt="Bank Risk Analytics Laptop Mockup"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold rounded-full border border-white/20">
                VaR 95% = 2.28%
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#525252] uppercase tracking-wider block mb-1">
                  QUANTITATIVE FINANCE
                </span>
                <h3 className="font-sans text-lg font-bold text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                  Indonesian Big Four Banks Financial Risk Analytics
                </h3>
              </div>

              <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                <a
                  href="https://izamrosiawan.github.io/indonesian-banks-risk-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <span>Buka Web Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-[#525252] font-semibold">2,840 Days</span>
              </div>
            </div>
          </div>

          {/* Showcase Card 2: Olist E-Commerce Analytics */}
          <div className="group bg-white border border-[#d4d4d4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/mockup_olist_ecommerce.jpg"
                alt="Olist E-Commerce Tablet Mockup"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold rounded-full border border-white/20">
                100,000+ ORDERS
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#525252] uppercase tracking-wider block mb-1">
                  E-COMMERCE LOGISTICS
                </span>
                <h3 className="font-sans text-lg font-bold text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                  Olist E-Commerce RFM Analytics & Relational Pipeline
                </h3>
              </div>

              <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                <a
                  href="https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <span>Buka Web Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-[#525252] font-semibold">9 Tables</span>
              </div>
            </div>
          </div>

          {/* Showcase Card 3: ASEAN Economic Recovery */}
          <div className="group bg-white border border-[#d4d4d4] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden">
              <Image
                src="/images/mockup_asean_recovery.jpg"
                alt="ASEAN Economic Recovery Phone Mockup"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold rounded-full border border-white/20">
                99.5% RECOVERY
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#525252] uppercase tracking-wider block mb-1">
                  MACROECONOMICS
                </span>
                <h3 className="font-sans text-lg font-bold text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                  ASEAN Post-Pandemic Economic Recovery & Tourism
                </h3>
              </div>

              <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between">
                <a
                  href="https://izamrosiawan.github.io/asean-economic-recovery/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-mono font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <span>Buka Web Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <span className="text-[11px] font-mono text-[#525252] font-semibold">10 Nations</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Max Arden 3-Step Process Glassmorphism Section (Screenshots 4 & 5 Style) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="border-t border-b border-[#d4d4d4] py-3 text-xs font-mono font-bold uppercase tracking-widest text-[#525252] mb-8">
          QUICK METHODOLOGY IN 3 STRICT ENGINE STEPS. QUICK METHODOLOGY IN 3 STRICT ENGINE STEPS.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-md border border-[#d4d4d4] p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#111213] text-white font-mono font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-sans text-lg font-black uppercase tracking-tight text-[#111213]">
              ZERO-LEAKAGE DATA SPLIT
            </h3>
            <p className="text-xs text-[#404040] leading-relaxed">
              Pemisahan data latih dan uji wajib dilakukan pertama kali sebelum scaling atau imputasi nilai untuk mencegah kebocoran target.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-[#d4d4d4] p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#111213] text-white font-mono font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-sans text-lg font-black uppercase tracking-tight text-[#111213]">
              RIGOROUS FORMULATION
            </h3>
            <p className="text-xs text-[#404040] leading-relaxed">
              Setiap model diverifikasi dengan persamaan matematika teruji (GLM Tweedie, Poisson, QWK Nelder-Mead, ADF Stationarity).
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-[#d4d4d4] p-8 rounded-3xl space-y-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#111213] text-white font-mono font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-sans text-lg font-black uppercase tracking-tight text-[#111213]">
              PYTEST 100% AUTOMATION
            </h3>
            <p className="text-xs text-[#404040] leading-relaxed">
              Seluruh pipeline dilengkapi unit pengujian otomatis Pytest 100% dan verifikasi integritas data AST.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Filter & Full Monograph Deck Section */}
      <section id="projects-section" className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-b border-[#d4d4d4] py-5 mb-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono font-bold">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-colors text-left py-1 ${
                    isActive
                      ? "text-[#111213] font-black underline underline-offset-8 decoration-2 decoration-[#111213]"
                      : "text-[#525252] hover:text-[#111213]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#71717a] absolute left-0 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik, algoritma, rumus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#a3a3a3] pl-6 py-1 text-xs text-[#111213] font-medium placeholder-[#71717a] focus:outline-none focus:border-[#111213] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Monograph Cards Grid */}
        <div className="space-y-6">
          {filteredProjects.map((project, idx) => {
            const hasWebDemo = !!project.demoUrl;

            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group bg-white border border-[#d4d4d4] hover:border-[#111213] rounded-3xl p-8 shadow-xs hover:shadow-xl transition-all duration-200 cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-3 space-y-4">
                    <div>
                      <span className="text-xs font-mono text-[#525252] font-semibold block mb-1">
                        {String(idx + 1).padStart(2, "0")} / {project.domain}
                      </span>
                      <div className="text-xs font-mono text-[#262626] font-medium">
                        {project.datasetInfo.name}
                      </div>
                    </div>

                    <div className="p-3 bg-[#fafaf9] border border-[#e5e5e5] rounded-2xl font-mono">
                      <div className="text-[11px] text-[#525252] font-semibold uppercase">
                        {project.metrics[0].label}
                      </div>
                      <div className="text-xl font-bold text-[#111213] mt-0.5">
                        {project.metrics[0].value}
                      </div>
                    </div>
                  </div>

                  {/* Center Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug font-medium">
                        {project.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#404040] mt-3 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3 bg-[#fafaf9] border border-[#e5e5e5] rounded-2xl font-mono text-xs text-[#111213] overflow-x-auto">
                      <code>{project.formula.latex}</code>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.techStack.map((t, i) => (
                        <span key={i} className="text-[11px] font-mono text-[#525252]">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-3 lg:text-right flex flex-col items-start lg:items-end justify-between h-full space-y-4">
                    <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                      {hasWebDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-2xl text-xs font-mono font-bold transition-all shadow-xs"
                        >
                          <span>Buka Web Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project);
                        }}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111213] text-white hover:bg-black rounded-2xl text-xs font-mono font-bold transition-all shadow-xs"
                      >
                        <span>Rincian Monograf</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#525252] hover:text-[#111213] transition-colors pt-2"
                    >
                      <span>GitHub Repositori</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#d4d4d4] py-12 mt-16 bg-[#f4f4f5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#525252] font-semibold">
          <div>© {new Date().getFullYear()} Izam Rosiawan. All rights reserved.</div>
          <div>STRICT ZERO-LEAKAGE & ACTUARIAL PRECISION</div>
        </div>
      </footer>

      {/* 8. Publication Monograph Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-[#ffffff] border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-3xl">
            <div className="p-8 border-b border-[#e5e5e5] flex items-start justify-between gap-6 sticky top-0 bg-[#ffffff] z-10">
              <div>
                <div className="text-xs font-mono text-[#525252] uppercase tracking-widest font-semibold mb-1">
                  {activeProject.domain} — {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#111213] font-semibold leading-tight">
                  {activeProject.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-2 text-[#525252] hover:text-[#111213] transition-colors rounded-xl bg-[#f4f4f5]"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8 space-y-8 text-xs sm:text-sm text-[#1a1a1a]">
              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-2">
                  01 / Masalah Bisnis & Formulasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-2">
                  02 / Metodologi Komputasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.methodology}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-2">
                  03 / Formulasi Matematika ({activeProject.formula.title})
                </h3>
                <div className="p-4 bg-[#f4f4f5] border border-[#e5e5e5] font-mono text-[#111213] text-xs sm:text-sm overflow-x-auto my-2 font-semibold rounded-2xl">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-xs font-mono text-[#525252] font-medium">
                  {activeProject.formula.explanation}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-3">
                  04 / Metrik Evaluasi Kuantitatif
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 bg-[#fafaf9] border border-[#e5e5e5] rounded-2xl">
                      <div className="text-[11px] font-mono text-[#525252] uppercase font-bold">{m.label}</div>
                      <div className="font-mono text-xl font-bold text-[#111213] mt-1">{m.value}</div>
                      <div className="text-xs font-mono text-[#525252] mt-1 font-medium">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-3">
                  05 / Temuan Analitik Utama
                </h3>
                <ul className="space-y-2 text-[#1a1a1a] text-sm">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#111213] font-mono font-bold text-sm">—</span>
                      <span className="leading-relaxed font-normal">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#525252] font-bold mb-2">
                  <span>06 / Contoh Kode Produksi (src/)</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="text-[#111213] hover:underline font-bold transition-colors"
                  >
                    {copiedCode ? "[Tersalin]" : "[Salin Kode]"}
                  </button>
                </div>
                <pre className="p-4 bg-[#18181b] text-[#f4f4f5] font-mono text-xs overflow-x-auto leading-relaxed rounded-2xl">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="p-8 border-t border-[#e5e5e5] bg-[#fafaf9] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 rounded-b-3xl">
              <span className="text-xs font-mono text-[#525252] font-medium">
                {activeProject.datasetInfo.size}
              </span>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-mono font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    <span>Buka Demo Web Interaktif</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111213] text-white hover:bg-black font-mono font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <span>GitHub Repositori</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
