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
  Menu,
  ChevronDown
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    { id: "All", label: "Semua Riset (20)" },
    { id: "Insurance", label: "Aktuaria & Asuransi (5)" },
    { id: "Banking", label: "Keuangan Kuantitatif (2)" },
    { id: "SupplyChain", label: "Supply Chain & Ops (2)" },
    { id: "PublicPolicy", label: "Kebijakan Publik (3)" },
    { id: "Healthcare", label: "Healthcare AI (4)" },
    { id: "Systems", label: "MLOps & Systems (4)" },
  ];

  const faqs = [
    {
      q: "EXPERIENCE & METHODOLOGY",
      a: "Setiap riset dikembangkan menggunakan metodologi sains data industri murni, melarang kebocoran data (data leakage), dan memverifikasi presisi matematis dengan GLM Tweedie, GARCH, atau QWK Nelder-Mead."
    },
    {
      q: "ZERO-LEAKAGE PREPARATION",
      a: "Pemisahan data latih dan uji (train-test split) WAJIB dilakukan sebelum langkah preprocessing, scaling, atau imputasi apapun untuk menjamin integritas evaluasi."
    },
    {
      q: "ACTUARIAL & FINANCIAL STANDARDS",
      a: "Mengadopsi standar penilaian aktuaria IEEE/Scopus dan OJK perbankan untuk evaluasi solvabilitas asuransi dan kalkulasi Value at Risk (VaR 95%)."
    },
    {
      q: "PYTEST & REPRODUCIBILITY",
      a: "100% pengujian unit otomatis Pytest, penentuan seed acak deterministik, dan repositori terbuka di GitHub."
    }
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
    <div className="min-h-screen bg-[#c2c5cc] text-[#111213] antialiased selection:bg-[#111213] selection:text-white font-space">
      
      {/* ==================== 1. MAX ARDEN 1:1 HEADER (Screenshot 0.jpg) ==================== */}
      <header className="w-full bg-[#c2c5cc]/90 border-b border-[#a1a6b0] px-6 sm:px-12 h-20 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md">
        <div className="font-syne text-xl sm:text-2xl font-extrabold uppercase tracking-tighter text-[#111213]">
          IZAM ROSIAWAN
        </div>

        {/* Center Pill Badge Navigation */}
        <nav className="hidden md:flex items-center gap-6 bg-white/40 border border-white/60 backdrop-blur-md px-6 py-2 rounded-full font-space text-xs font-bold uppercase tracking-wider text-[#111213]">
          <a href="#featured" className="hover:opacity-60 transition-opacity">WEBSITE APPS</a>
          <span>•</span>
          <a href="#steps" className="hover:opacity-60 transition-opacity">METHODOLOGY</a>
          <span>•</span>
          <a href="#monographs" className="hover:opacity-60 transition-opacity font-extrabold">MONOGRAPHS (20)</a>
        </nav>

        {/* Right Action Links */}
        <div className="flex items-center gap-6 font-space text-xs font-bold uppercase tracking-widest text-[#111213]">
          <a 
            href="https://github.com/izamrosiawan" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:opacity-60 transition-opacity hidden sm:inline-block"
          >
            GITHUB ↗
          </a>
          <div className="px-3.5 py-1.5 bg-[#111213] text-white rounded-full text-[11px] font-extrabold">
            RESEARCH (20)
          </div>
        </div>
      </header>

      {/* ==================== 2. MAX ARDEN 1:1 HERO SECTION (Screenshot 0.jpg) ==================== */}
      <section className="relative w-full h-[88vh] min-h-[600px] flex flex-col justify-end p-6 sm:p-12 overflow-hidden bg-[#b8bbc3]">
        
        {/* Full-bleed Studio Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_hand_phone.jpg"
            alt="Izam Rosiawan Portfolio Presentation"
            fill
            className="object-cover object-center brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Max Arden Bottom-Right Floating Glass Box */}
        <div className="relative z-10 self-end max-w-xl bg-[#1e2024]/75 backdrop-blur-2xl border border-white/20 p-8 sm:p-10 rounded-2xl text-white shadow-2xl space-y-6">
          <h1 className="font-syne text-2xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight text-white">
            FOR THOSE WHO KNOW PRESENTATION MATTERS.
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
            Minimalist quantitative research monograph portfolio for Data Scientists, Actuaries, and Quantitative Financial Analysts inspired by Editorial Design.
          </p>

          <div className="pt-2">
            <a
              href="#featured"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md text-white font-space font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg group"
            >
              <span>EXPLORE MONOGRAPHS • EXPLORE</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

      </section>

      {/* ==================== 3. MAX ARDEN 1:1 MARQUEE TICKER 1 (Screenshot 1.jpg) ==================== */}
      <div className="w-full bg-[#c2c5cc] border-t-2 border-b-2 border-[#111213] py-3 overflow-hidden font-syne text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#111213]">
        <div className="inline-flex gap-12 whitespace-nowrap animate-marquee">
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
          <span>STRICT ZERO-LEAKAGE PRECISION. ACTUARIAL GLM TWEEDIE.</span>
          <span>INDONESIAN BIG FOUR BANKS FINANCIAL RISK. ASEAN ECONOMIC RECOVERY.</span>
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
        </div>
      </div>

      {/* ==================== 4. MAX ARDEN 1:1 BESTSELLERS 3-CARD GRID (Screenshot 1 & 2.jpg) ==================== */}
      <section id="featured" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        
        {/* Title Group (Screenshot 1.jpg) */}
        <div className="space-y-3 mb-16 border-b border-[#a1a6b0] pb-10">
          <span className="font-space text-xs font-bold text-[#525252] uppercase tracking-widest block">
            / FEATURED WEBSITES & APPS
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-syne text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-[#111213] leading-none">
                WEBSITE PORTFOLIOS
              </h2>
              <span className="font-syne text-xl sm:text-2xl font-bold text-[#525252] uppercase tracking-tight block mt-2">
                FOR RESEARCHERS
              </span>
            </div>

            <a
              href="#monographs"
              className="font-space text-xs font-extrabold uppercase tracking-widest text-[#111213] hover:opacity-60 underline underline-offset-4"
            >
              BROWSE ALL (20) ↗
            </a>
          </div>
        </div>

        {/* 3 Column Portrait Grid (Screenshot 1.jpg Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="space-y-5 group cursor-pointer">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_bank_risk.jpg"
                alt="Bank Risk Laptop Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-space text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                01 / BANKING
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-syne font-extrabold text-xl text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase leading-snug">
                Indonesian Big Four Banks Financial Risk
              </h3>
              <p className="text-xs text-[#333333] leading-relaxed">
                Analisis risiko kuantitatif saham BBCA, BBRI, BMRI, BBNI dengan kalkulasi Value at Risk (VaR 95%) dan GARCH.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/indonesian-banks-risk-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-space font-extrabold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="space-y-5 group cursor-pointer">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_olist_ecommerce.jpg"
                alt="Olist E-Commerce Tablet Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-space text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                02 / E-COMMERCE
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-syne font-extrabold text-xl text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase leading-snug">
                Olist E-Commerce Logistics & RFM Pipeline
              </h3>
              <p className="text-xs text-[#333333] leading-relaxed">
                Pipeline data relasional 9 tabel, segmentasi pelanggan RFM, dan pemodelan estimasi waktu pengiriman paket Brasil.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-space font-extrabold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="space-y-5 group cursor-pointer">
            <div className="relative h-[480px] rounded-2xl overflow-hidden shadow-xl border border-[#a1a6b0] bg-[#111213]">
              <Image
                src="/images/mockup_asean_recovery.jpg"
                alt="ASEAN Economic Recovery Showcase"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute top-4 left-4 bg-black/80 text-white font-space text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                03 / MACROECONOMICS
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-syne font-extrabold text-xl text-[#111213] group-hover:text-[#2563eb] transition-colors uppercase leading-snug">
                ASEAN Post-Pandemic Economic Recovery
              </h3>
              <p className="text-xs text-[#333333] leading-relaxed">
                Pemodelan tren V-shape pemulihan pariwisata dan GDP 10 negara anggota ASEAN pasca-pandemi COVID-19.
              </p>
              <div className="pt-2">
                <a
                  href="https://izamrosiawan.github.io/asean-economic-recovery/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-space font-extrabold text-[#111213] underline underline-offset-4 hover:text-[#2563eb]"
                >
                  <span>BUKA WEB DEMO ↗</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Max Arden Quote & Stats Banner (Screenshot 2.jpg Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 border-t border-[#a1a6b0] text-xs font-space font-bold text-[#333333]">
          <div className="lg:col-span-4 uppercase tracking-wider">
            / TRUSTED BY ACADEMIA & INDUSTRY
          </div>
          <div className="lg:col-span-4 uppercase tracking-wider">
            / 20 MONOGRAPHS PUBLISHED
          </div>
          <div className="lg:col-span-4 text-xs font-normal text-[#404040] leading-relaxed">
            Your portfolio is often your first introduction. A carefully designed presentation doesn't just showcase your work, it shapes how it's perceived, helping you attract better research collaborations and stronger industry opportunities.
          </div>
        </div>

      </section>

      {/* ==================== 5. MAX ARDEN 1:1 3 STEPS SECTION (Screenshot 2 & 3.jpg) ==================== */}
      <section id="steps" className="w-full bg-[#111213] text-white py-20 px-6 sm:px-12 relative overflow-hidden">
        
        {/* Marquee Header */}
        <div className="border-t-2 border-b-2 border-white/20 py-3.5 mb-16 font-syne text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white">
          <div className="inline-flex gap-8 whitespace-nowrap animate-marquee">
            <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
            <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Stack of Glassmorphism Step Cards (Screenshot 2 & 3 Layout) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step Card 1 */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-space text-xs font-bold uppercase text-gray-300">
                <span className="px-3 py-1 bg-white text-black font-extrabold rounded-md">1</span>
                <span>FIRST STEP • ZERO-LEAKAGE PREPARATION</span>
              </div>
              <h3 className="font-syne text-2xl font-extrabold uppercase text-white tracking-tight">
                CHOOSE YOUR PERFECT FRAMEWORK.
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Pemisahan data latih dan uji (train-test split) WAJIB dilakukan pertama kali sebelum scaling atau imputasi nilai untuk mencegah kebocoran target secara absolut.
              </p>
            </div>

            {/* Step Card 2 */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-space text-xs font-bold uppercase text-gray-300">
                <span className="px-3 py-1 bg-white text-black font-extrabold rounded-md">2</span>
                <span>SECOND STEP • RIGOROUS FORMULATION</span>
              </div>
              <h3 className="font-syne text-2xl font-extrabold uppercase text-white tracking-tight">
                MAKE IT ENTIRELY YOUR OWN.
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Setiap model diverifikasi dengan formulasi matematika teruji (GLM Tweedie, Poisson, QWK Nelder-Mead, ADF Stationarity) tanpa kompromi.
              </p>
            </div>

            {/* Step Card 3 */}
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-2xl space-y-3 shadow-2xl">
              <div className="inline-flex items-center gap-3 font-space text-xs font-bold uppercase text-gray-300">
                <span className="px-3 py-1 bg-white text-black font-extrabold rounded-md">3</span>
                <span>THIRD STEP • PRODUCTION DEPLOYMENT</span>
              </div>
              <h3 className="font-syne text-2xl font-extrabold uppercase text-white tracking-tight">
                PUBLISH WITH COMPLETE CONFIDENCE.
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-normal">
                Seluruh pipeline dilengkapi unit pengujian otomatis Pytest 100%, verifikasi integritas AST, dan skema Pydantic defensif.
              </p>
            </div>

          </div>

          {/* Right Photographic Image */}
          <div className="lg:col-span-5 relative h-[620px] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src="/images/hero_hand_phone.jpg"
              alt="Production Mobile Showcase"
              fill
              className="object-cover object-center brightness-90"
            />
          </div>

        </div>

      </section>

      {/* ==================== 6. MAX ARDEN 1:1 FAQ ACCORDION (Screenshot 3.jpg) ==================== */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        
        <div className="flex items-center justify-between border-b border-[#a1a6b0] pb-8 mb-12">
          <div>
            <span className="font-space text-xs font-bold text-[#525252] uppercase tracking-widest block mb-1">
              / FREQUENTLY ASKED
            </span>
            <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#111213]">
              EXPERIENCE & STANDARDS
            </h2>
          </div>

          <div className="hidden sm:block px-4 py-2 bg-white/50 border border-black/10 rounded-full font-space text-xs font-bold uppercase">
            ? FREQUENTLY ASKED
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="bg-white/60 backdrop-blur-md border border-[#a1a6b0] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 flex items-center justify-between text-left font-syne font-extrabold text-lg uppercase text-[#111213] hover:text-[#2563eb] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-xs font-space text-[#333333] leading-relaxed border-t border-[#a1a6b0]/40 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </section>

      {/* ==================== 7. MAX ARDEN 1:1 GIANT WORDMARK & QUOTE (Screenshot 5.jpg) ==================== */}
      <section className="w-full bg-[#111213] text-white py-24 px-6 sm:px-12 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Stacked Giant Typography */}
          <div className="font-syne text-5xl sm:text-8xl font-black uppercase tracking-tighter leading-none opacity-90 select-none">
            <div className="text-transparent border-text stroke-white" style={{ WebkitTextStroke: '2px white' }}>
              PRESENTATION
            </div>
            <div className="text-white">
              PRESENTATION
            </div>
          </div>

          {/* Quote Block */}
          <div className="max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 sm:p-10 rounded-2xl space-y-4 shadow-2xl">
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-space font-normal">
              "After building machine learning pipelines and quantitative models for years, I realized finding presentation scaffolds that felt genuinely well-designed was surprisingly difficult. So I started creating this monograph archive—clean, thoughtful, and built around academic rigor."
            </p>
            <div className="font-syne text-xs font-extrabold uppercase text-white tracking-wider">
              — IZAM ROSIAWAN, DATA SCIENTIST & ACTUARIAL RESEARCHER
            </div>
          </div>

        </div>

      </section>

      {/* ==================== 8. FILTERABLE MONOGRAPH ARCHIVE (20 DETAILED MONOGRAPHS) ==================== */}
      <section id="monographs" className="max-w-7xl mx-auto px-6 sm:px-12 py-20">
        
        <div className="border-b border-[#a1a6b0] pb-8 mb-12">
          <span className="font-space text-xs font-bold text-[#525252] uppercase tracking-widest block mb-2">
            / RESEARCH ARCHIVE (2024 — 2026)
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-[#111213]">
            COMPLETE MONOGRAPH COLLECTION
          </h2>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#a1a6b0] pb-6 mb-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-space text-xs font-extrabold uppercase tracking-wider">
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
              className="w-full bg-transparent border-0 border-b border-[#525252] pl-7 py-1.5 text-xs text-[#111213] font-space placeholder-[#525252] focus:outline-none focus:border-[#111213] transition-colors"
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
                className="group bg-white/70 backdrop-blur-md border border-[#a1a6b0] hover:border-[#111213] rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column */}
                  <div className="lg:col-span-3 space-y-3">
                    <span className="font-space text-xs font-bold text-[#525252] uppercase block">
                      {String(idx + 1).padStart(2, "0")} / {project.domain}
                    </span>
                    <div className="font-space text-xs font-extrabold text-[#111213]">
                      {project.datasetInfo.name}
                    </div>
                    <div className="p-3.5 bg-white border border-black/10 rounded-xl font-space">
                      <div className="text-[10px] text-[#525252] uppercase font-bold">
                        {project.metrics[0].label}
                      </div>
                      <div className="text-xl font-extrabold text-[#111213] mt-0.5">
                        {project.metrics[0].value}
                      </div>
                    </div>
                  </div>

                  {/* Center Column */}
                  <div className="lg:col-span-6 space-y-4">
                    <div>
                      <h3 className="font-syne font-extrabold text-2xl text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#333333] mt-2 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-3.5 bg-white border border-black/10 rounded-xl font-space text-xs text-[#111213] overflow-x-auto font-bold">
                      <code>{project.formula.latex}</code>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 font-space text-[11px] text-[#525252] font-semibold">
                      {project.techStack.map((t, i) => (
                        <span key={i}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:col-span-3 lg:text-right flex flex-col items-start lg:items-end justify-between h-full space-y-4 font-space">
                    <div className="flex flex-col gap-2.5 w-full sm:w-auto">
                      {hasWebDemo && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl text-xs font-extrabold transition-all shadow-md"
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
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#111213] text-white hover:bg-black rounded-xl text-xs font-extrabold transition-all shadow-md"
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
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-[#525252] hover:text-[#111213] transition-colors"
                    >
                      <span>GITHUB REPOSITORI</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </section>

      {/* ==================== 9. MAX ARDEN 1:1 FOOTER & THUMBNAILS (Screenshot 5.jpg) ==================== */}
      <footer className="w-full bg-[#111213] text-white py-16 px-6 sm:px-12 border-t border-white/20 font-space text-xs font-bold space-y-12">
        
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 uppercase tracking-wider">
          <div className="flex flex-wrap gap-6 text-gray-400">
            <a href="#featured" className="hover:text-white transition-colors">NAVIGATION</a>
            <a href="#monographs" className="hover:text-white transition-colors">INDEX</a>
            <a href="#monographs" className="hover:text-white transition-colors">MONOGRAPHS</a>
            <a href="#steps" className="hover:text-white transition-colors">ABOUT</a>
            <a href="https://github.com/izamrosiawan" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">PORTFOLIO</a>
          </div>

          <div className="text-gray-400">
            IZAM ROSIAWAN © 2026 | CREATED WITH NEXT.JS & TAILWIND
          </div>
        </div>

        {/* Bottom Thumbnail Strip (Screenshot 5.jpg) */}
        <div className="max-w-7xl mx-auto grid grid-cols-3 sm:grid-cols-6 gap-3 pt-6 border-t border-white/10 opacity-75">
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/mockup_bank_risk.jpg" alt="Thumb" fill className="object-cover" />
          </div>
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/mockup_olist_ecommerce.jpg" alt="Thumb" fill className="object-cover" />
          </div>
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/mockup_asean_recovery.jpg" alt="Thumb" fill className="object-cover" />
          </div>
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/hero_hand_phone.jpg" alt="Thumb" fill className="object-cover" />
          </div>
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/mockup_bank_risk.jpg" alt="Thumb" fill className="object-cover" />
          </div>
          <div className="relative h-20 rounded-lg overflow-hidden border border-white/20">
            <Image src="/images/mockup_olist_ecommerce.jpg" alt="Thumb" fill className="object-cover" />
          </div>
        </div>

      </footer>

      {/* ==================== 10. PUBLICATION MONOGRAPH MODAL ==================== */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl">
            <div className="p-8 border-b border-[#e5e5e5] flex items-start justify-between gap-6 sticky top-0 bg-white z-10">
              <div>
                <div className="text-xs font-space text-[#525252] uppercase tracking-widest font-extrabold mb-1">
                  {activeProject.domain} — {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-syne text-2xl sm:text-3xl text-[#111213] font-extrabold leading-tight">
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
                <h3 className="text-xs font-space text-[#525252] font-bold uppercase tracking-widest mb-2">
                  01 / Masalah Bisnis & Formulasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-space text-[#525252] font-bold uppercase tracking-widest mb-2">
                  02 / Metodologi Komputasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.methodology}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-space text-[#525252] font-bold uppercase tracking-widest mb-2">
                  03 / Formulasi Matematika ({activeProject.formula.title})
                </h3>
                <div className="p-4 bg-[#f4f4f5] border border-[#e5e5e5] font-space text-[#111213] text-xs sm:text-sm overflow-x-auto my-2 font-bold rounded-xl">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-xs font-space text-[#525252] font-medium">
                  {activeProject.formula.explanation}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-space text-[#525252] font-bold uppercase tracking-widest mb-3">
                  04 / Metrik Evaluasi Kuantitatif
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 bg-[#fafaf9] border border-[#e5e5e5] rounded-xl font-space">
                      <div className="text-[11px] text-[#525252] uppercase font-bold">{m.label}</div>
                      <div className="text-xl font-extrabold text-[#111213] mt-1">{m.value}</div>
                      <div className="text-xs text-[#525252] mt-1 font-medium">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-space text-[#525252] font-bold uppercase tracking-widest mb-3">
                  05 / Temuan Analitik Utama
                </h3>
                <ul className="space-y-2 text-[#1a1a1a] text-sm">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#111213] font-space font-bold text-sm">—</span>
                      <span className="leading-relaxed font-normal">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-space text-[#525252] font-bold mb-2">
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

            <div className="p-8 border-t border-[#e5e5e5] bg-[#fafaf9] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 rounded-b-2xl font-space">
              <span className="text-xs text-[#525252] font-bold">
                {activeProject.datasetInfo.size}
              </span>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto font-space">
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
