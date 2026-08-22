"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  ArrowUpRight, 
  X, 
  ExternalLink,
  BookOpen,
  Search,
  ChevronRight,
  Menu
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    <div className="min-h-screen bg-[#c2c5cc] text-[#111213] antialiased selection:bg-[#111213] selection:text-white font-sans">
      
      {/* 1. Max Arden 1:1 Header */}
      <header className="w-full bg-[#c2c5cc] border-b border-[#a1a6b0] px-6 sm:px-12 h-20 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="font-extrabold text-xl sm:text-2xl tracking-tighter uppercase font-mono text-[#111213]">
          IZAM ROSIAWAN
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-black/5 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-[#111213]" />
        </button>

        <div className="hidden sm:flex items-center gap-6 font-mono text-xs font-black uppercase tracking-wider text-[#111213]">
          <a href="#featured" className="hover:opacity-70 transition-opacity">DEMOS (3)</a>
          <a href="#monographs" className="hover:opacity-70 transition-opacity">MONOGRAPHS (20)</a>
          <a href="https://github.com/izamrosiawan" target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">GITHUB ↗</a>
        </div>
      </header>

      {/* 2. Max Arden 1:1 Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-end p-6 sm:p-12 overflow-hidden bg-[#b8bbc3]">
        
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_hand_phone.jpg"
            alt="Izam Rosiawan Presentation"
            fill
            className="object-cover object-center brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Max Arden Bottom-Right Floating Glass Box */}
        <div className="relative z-10 self-end max-w-xl bg-[#26282b]/60 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-2xl text-white shadow-2xl space-y-6">
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
            FOR THOSE WHO KNOW PRESENTATION MATTERS.
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
            Minimalist quantitative data science monograph portfolio, actuarial GLM modeling, financial risk analytics, and production MLOps pipelines inspired by editorial design.
          </p>

          <div className="pt-2">
            <a
              href="#featured"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg"
            >
              <span>EXPLORE MONOGRAPHS • EXPLORE</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </section>

      {/* 3. Max Arden 1:1 Double Line Ticker Marquee */}
      <div className="w-full bg-[#111213] text-white py-3 border-t-2 border-b-2 border-[#111213] overflow-hidden font-mono text-xs sm:text-sm font-black uppercase tracking-widest">
        <div className="inline-flex gap-12 whitespace-nowrap animate-marquee">
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
          <span>STRICT ZERO-LEAKAGE PRECISION. ACTUARIAL GLM TWEEDIE.</span>
          <span>INDONESIAN BIG FOUR BANKS FINANCIAL RISK. ASEAN ECONOMIC RECOVERY.</span>
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
        </div>
      </div>

      {/* 4. Max Arden 1:1 Section 2: Website Portfolios & 3 Image Grid */}
      <section id="featured" className="max-w-7xl mx-auto px-6 sm:px-12 py-16">
        
        {/* Title Group */}
        <div className="space-y-2 mb-12 border-b border-[#a1a6b0] pb-8">
          <span className="font-mono text-xs font-bold text-[#525252] uppercase tracking-widest block">
            / BESTSELLERS & FEATURED APPS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111213]">
              WEBSITE PORTFOLIOS
            </h2>
            <span className="font-mono text-xs font-bold text-[#525252] uppercase">
              FOR DATA SCIENTISTS & RESEARCHERS
            </span>
          </div>
        </div>

        {/* 3 Vertical Image Cards (Exact Max Arden Screenshot 1 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="space-y-4 group cursor-pointer">
            <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-lg border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_bank_risk.jpg"
                alt="Bank Risk Laptop Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                01 / BANKING
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-black text-lg text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase">
                Indonesian Big Four Banks Financial Risk
              </h3>
              <p className="text-xs text-[#404040] leading-relaxed">
                Analisis risiko kuantitatif saham BBCA, BBRI, BMRI, BBNI dengan kalkulasi Value at Risk (VaR 95%) dan GARCH.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/indonesian-banks-risk-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="space-y-4 group cursor-pointer">
            <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-lg border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_olist_ecommerce.jpg"
                alt="Olist E-Commerce Tablet Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                02 / E-COMMERCE
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-black text-lg text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase">
                Olist E-Commerce Logistics & RFM Pipeline
              </h3>
              <p className="text-xs text-[#404040] leading-relaxed">
                Pipeline data relasional 9 tabel, segmentasi pelanggan RFM, dan pemodelan estimasi waktu pengiriman paket Brasil.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="space-y-4 group cursor-pointer">
            <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-lg border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_asean_recovery.jpg"
                alt="ASEAN Economic Recovery Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                03 / MACROECONOMICS
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-black text-lg text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase">
                ASEAN Post-Pandemic Economic Recovery
              </h3>
              <p className="text-xs text-[#404040] leading-relaxed">
                Pemodelan tren V-shape pemulihan pariwisata dan GDP 10 negara anggota ASEAN pasca-pandemi COVID-19.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/asean-economic-recovery/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Exact Max Arden Stats Row (Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#a1a6b0] font-mono text-xs font-bold text-[#333333]">
          <div>/ TRUSTED BY ACADEMIA & INDUSTRY</div>
          <div>/ 20 MONOGRAPHS PUBLISHED</div>
          <div>/ 678K+ OBSERVATIONS ANALYZED</div>
        </div>

      </section>

      {/* 5. Max Arden 1:1 Quick Setup Steps Section (Screenshot 2 & 3 Layout) */}
      <section className="w-full bg-[#111213] text-white py-20 px-6 sm:px-12 relative overflow-hidden">
        
        {/* Double Line Marquee Header */}
        <div className="border-t border-b border-white/20 py-3 mb-16 font-mono text-xs sm:text-sm font-black uppercase tracking-widest">
          <div className="inline-flex gap-8 whitespace-nowrap animate-marquee">
            <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
            <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Stack of Glassmorphism Step Cards (Max Arden Image 2 & 3 Style) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step Card 1 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase text-gray-300">
                <span className="px-2.5 py-1 bg-white text-black font-black rounded-md">1</span>
                <span>FIRST STEP • ZERO-LEAKAGE PREPARATION</span>
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">
                STRICT TRAIN-TEST SPLIT ORDER
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Pemisahan data latih dan uji wajib dilakukan pertama kali sebelum scaling atau imputasi nilai untuk mencegah kebocoran target secara absolut.
              </p>
            </div>

            {/* Step Card 2 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase text-gray-300">
                <span className="px-2.5 py-1 bg-white text-black font-black rounded-md">2</span>
                <span>SECOND STEP • RIGOROUS FORMULATION</span>
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">
                MATHEMATICAL MODEL CALIBRATION
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Setiap model diverifikasi dengan formulasi matematika teruji (GLM Tweedie, Poisson, QWK Nelder-Mead, ADF Stationarity).
              </p>
            </div>

            {/* Step Card 3 */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-mono text-xs font-bold uppercase text-gray-300">
                <span className="px-2.5 py-1 bg-white text-black font-black rounded-md">3</span>
                <span>THIRD STEP • PRODUCTION DEPLOYMENT</span>
              </div>
              <h3 className="text-xl font-black uppercase text-white tracking-tight">
                PUBLISH WITH COMPLETE CONFIDENCE
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Seluruh pipeline dilengkapi unit pengujian otomatis Pytest 100%, verifikasi integritas AST, dan skema Pydantic defensif.
              </p>
            </div>

          </div>

          {/* Right Photographic Image */}
          <div className="lg:col-span-5 relative h-[580px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src="/images/hero_hand_phone.jpg"
              alt="Production Mobile Showcase"
              fill
              className="object-cover object-center brightness-90"
            />
          </div>

        </div>

      </section>

      {/* 6. Filterable Monograph Archive (Max Arden Typography & Clean Grid) */}
      <section id="monographs" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        
        <div className="border-b border-[#a1a6b0] pb-8 mb-12">
          <span className="font-mono text-xs font-bold text-[#525252] uppercase tracking-widest block mb-2">
            / RESEARCH ARCHIVE (2024 — 2026)
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111213]">
            COMPLETE MONOGRAPH COLLECTION
          </h2>
        </div>

        {/* Filter Categories Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#a1a6b0] pb-6 mb-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs font-mono font-black uppercase tracking-wider">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-colors py-1 ${
                    isActive
                      ? "text-[#111213] underline underline-offset-8 decoration-2"
                      : "text-[#525252] hover:text-[#111213]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#525252] absolute left-0 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik, algoritma, rumus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#525252] pl-7 py-1.5 text-xs text-[#111213] font-mono placeholder-[#525252] focus:outline-none focus:border-[#111213] transition-colors"
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
                className="group bg-[#b8bbc3]/40 border border-[#a1a6b0] hover:border-[#111213] rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-3 space-y-3">
                    <span className="font-mono text-xs font-bold text-[#525252] uppercase block">
                      {String(idx + 1).padStart(2, "0")} / {project.domain}
                    </span>
                    <div className="font-mono text-xs font-bold text-[#111213]">
                      {project.datasetInfo.name}
                    </div>
                    <div className="p-3 bg-white/60 border border-black/10 rounded-xl font-mono">
                      <div className="text-[10px] text-[#525252] uppercase font-bold">
                        {project.metrics[0].label}
                      </div>
                      <div className="text-lg font-black text-[#111213] mt-0.5">
                        {project.metrics[0].value}
                      </div>
                    </div>
                  </div>

                  {/* Center Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h3 className="font-serif text-2xl text-[#111213] group-hover:text-[#2563eb] transition-colors font-medium">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#333333] mt-2 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3 bg-white/60 border border-black/10 rounded-xl font-mono text-xs text-[#111213] overflow-x-auto">
                      <code>{project.formula.latex}</code>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-[#525252]">
                      {project.techStack.map((t, i) => (
                        <span key={i}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-3 lg:text-right flex flex-col items-start lg:items-end justify-between h-full space-y-4 font-mono">
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      {hasWebDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl text-xs font-bold transition-all shadow-xs"
                        >
                          <span>BUKA WEB DEMO</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(project);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#111213] text-white hover:bg-black rounded-xl text-xs font-bold transition-all shadow-xs"
                      >
                        <span>RINCIAN MONOGRAF</span>
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#525252] hover:text-[#111213] transition-colors"
                    >
                      <span>GITHUB REPOSITORI</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* 7. Max Arden 1:1 Footer */}
      <footer className="w-full bg-[#111213] text-white py-12 px-6 sm:px-12 border-t border-white/20 font-mono text-xs font-bold">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 uppercase tracking-wider">
          <div>NAVIGATION • INDEX • MONOGRAPHS • ABOUT</div>
          <div>IZAM ROSIAWAN © 2026 | CREATED WITH NEXT.JS</div>
        </div>
      </footer>

      {/* 8. Publication Monograph Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl">
            <div className="p-8 border-b border-[#e5e5e5] flex items-start justify-between gap-6 sticky top-0 bg-white z-10">
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
                <div className="p-4 bg-[#f4f4f5] border border-[#e5e5e5] font-mono text-[#111213] text-xs sm:text-sm overflow-x-auto my-2 font-semibold rounded-xl">
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
                    <div key={idx} className="p-4 bg-[#fafaf9] border border-[#e5e5e5] rounded-xl">
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
                <pre className="p-4 bg-[#18181b] text-[#f4f4f5] font-mono text-xs overflow-x-auto leading-relaxed rounded-xl">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="p-8 border-t border-[#e5e5e5] bg-[#fafaf9] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 rounded-b-2xl">
              <span className="text-xs font-mono text-[#525252] font-medium">
                {activeProject.datasetInfo.size}
              </span>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-mono">
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    <span>BUKA DEMO WEB INTERAKTIF</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#111213] text-white hover:bg-black font-bold text-xs rounded-xl transition-colors shadow-xs"
                >
                  <span>GITHUB REPOSITORI</span>
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
