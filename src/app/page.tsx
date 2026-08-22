"use client";

import React, { useState, useMemo } from "react";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import AbstractDataCanvas from "@/components/AbstractDataCanvas";
import { 
  ArrowUpRight, 
  Github, 
  Mail, 
  X, 
  Check, 
  Copy,
  ExternalLink,
  BookOpen,
  Sparkles,
  Search,
  Building2,
  ShieldCheck,
  Truck,
  Globe,
  Activity,
  Cpu,
  Layers,
  Sliders,
  Grid
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [viewStyle, setViewStyle] = useState<"abstract_cards" | "publication_list">("abstract_cards");

  const categories = [
    { id: "All", label: "Semua Riset (20)", icon: <Grid className="w-3.5 h-3.5" /> },
    { id: "Insurance", label: "Aktuaria & Asuransi (5)", icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> },
    { id: "Banking", label: "Keuangan Kuantitatif (2)", icon: <Building2 className="w-3.5 h-3.5 text-indigo-600" /> },
    { id: "SupplyChain", label: "Supply Chain & Ops (2)", icon: <Truck className="w-3.5 h-3.5 text-blue-600" /> },
    { id: "PublicPolicy", label: "Kebijakan Publik (3)", icon: <Globe className="w-3.5 h-3.5 text-teal-600" /> },
    { id: "Healthcare", label: "Healthcare AI (4)", icon: <Activity className="w-3.5 h-3.5 text-rose-600" /> },
    { id: "Systems", label: "MLOps & Systems (4)", icon: <Cpu className="w-3.5 h-3.5 text-slate-700" /> },
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

  // Render Abstract Geometric SVG Pattern Thumbnail per Domain
  const renderAbstractPattern = (category: string) => {
    switch (category) {
      case "Banking":
        return (
          <svg className="w-full h-full text-indigo-600/15" viewBox="0 0 200 120" fill="none">
            <path d="M10 90 Q 60 10, 100 60 T 190 30" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="100" cy="60" r="4" fill="currentColor" />
            <circle cx="60" cy="30" r="3" fill="currentColor" />
            <circle cx="160" cy="45" r="3" fill="currentColor" />
            <line x1="100" y1="60" x2="100" y2="110" stroke="currentColor" strokeDasharray="3 3" />
          </svg>
        );
      case "Insurance":
        return (
          <svg className="w-full h-full text-emerald-600/15" viewBox="0 0 200 120" fill="none">
            <polygon points="100,15 170,95 30,95" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="60" r="28" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <line x1="30" y1="95" x2="170" y2="95" stroke="currentColor" strokeWidth="2" />
          </svg>
        );
      case "SupplyChain":
        return (
          <svg className="w-full h-full text-blue-600/15" viewBox="0 0 200 120" fill="none">
            <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="1.5" />
            <rect x="130" y="30" width="40" height="40" stroke="currentColor" strokeWidth="1.5" />
            <rect x="80" y="70" width="40" height="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="70" y1="50" x2="130" y2="50" stroke="currentColor" strokeWidth="1.5" />
            <line x1="50" y1="70" x2="80" y2="90" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case "PublicPolicy":
        return (
          <svg className="w-full h-full text-teal-600/15" viewBox="0 0 200 120" fill="none">
            <circle cx="100" cy="60" r="45" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <ellipse cx="100" cy="60" rx="45" ry="18" stroke="currentColor" strokeWidth="1" fill="none" />
            <line x1="100" y1="15" x2="100" y2="105" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case "Healthcare":
        return (
          <svg className="w-full h-full text-rose-600/15" viewBox="0 0 200 120" fill="none">
            <path d="M20 60 Q 50 20, 80 60 T 140 60 T 180 60" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="80" cy="60" r="4" fill="currentColor" />
            <circle cx="140" cy="60" r="4" fill="currentColor" />
          </svg>
        );
      default:
        return (
          <svg className="w-full h-full text-slate-700/15" viewBox="0 0 200 120" fill="none">
            <rect x="40" y="25" width="120" height="70" stroke="currentColor" strokeWidth="1.5" />
            <line x1="40" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="1" />
            <line x1="80" y1="25" x2="80" y2="95" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#111213] antialiased font-sans">
      
      {/* 1. Header Bar */}
      <header className="border-b border-[#e5e5e5] bg-[#fafaf9]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-xl tracking-tight text-[#111213] font-semibold">Izam Rosiawan</span>
            <span className="text-xs font-mono text-[#525252] font-medium tracking-wider uppercase">
              Quantitative Data Science & Actuarial Research
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono font-medium">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="text-[#111213] hover:text-black transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-[#111213] hover:text-black transition-colors"
            >
              Email ↗
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        
        {/* Generative Abstract Mathematical Canvas Header */}
        <AbstractDataCanvas />

        {/* Filter Strip & Layout Switcher */}
        <section className="border-t border-b border-[#e5e5e5] py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          
          {/* Category Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono font-medium">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`inline-flex items-center gap-1.5 transition-colors text-left py-1 ${
                    isActive
                      ? "text-[#111213] font-bold underline underline-offset-8 decoration-2 decoration-[#111213]"
                      : "text-[#525252] hover:text-[#111213]"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-[#71717a] absolute left-0 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari topik, algoritma, rumus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#a3a3a3] pl-6 py-1 text-xs text-[#111213] font-medium placeholder-[#71717a] focus:outline-none focus:border-[#111213] transition-colors font-mono"
            />
          </div>
        </section>

        {/* Projects Presentation Grid (Abstract Cards View) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const hasWebDemo = !!project.demoUrl;

            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group bg-[#ffffff] border border-[#e5e5e5] hover:border-[#111213] rounded-3xl p-6 shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-6 cursor-pointer relative overflow-hidden"
              >
                {/* Background Abstract Geometric SVG Art */}
                <div className="absolute right-0 top-0 w-48 h-32 opacity-80 pointer-events-none group-hover:scale-110 transition-transform duration-300">
                  {renderAbstractPattern(project.category)}
                </div>

                {/* Card Top: Index, Domain & Web App Tag */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-[#525252] font-semibold">
                      {String(idx + 1).padStart(2, "0")} / {project.domain}
                    </span>

                    {hasWebDemo && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] rounded-full">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>LIVE DEMO</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111213] group-hover:text-[#2563eb] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#525252] line-clamp-3 mt-2 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                </div>

                {/* Card Middle: Formula Chip & Metric */}
                <div className="space-y-3 relative z-10">
                  <div className="p-3 bg-[#fafaf9] border border-[#e5e5e5] rounded-2xl font-mono text-xs overflow-x-auto text-[#111213]">
                    <code>{project.formula.latex}</code>
                  </div>

                  <div className="flex items-center justify-between font-mono text-xs p-2">
                    <span className="text-[#525252] font-semibold uppercase">{project.metrics[0].label}</span>
                    <span className="font-bold text-[#111213] text-sm">{project.metrics[0].value}</span>
                  </div>
                </div>

                {/* Card Bottom: Actions */}
                <div className="pt-4 border-t border-[#e5e5e5] flex items-center justify-between gap-2 relative z-10">
                  <div className="flex items-center gap-2">
                    {hasWebDemo && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl text-xs font-mono font-bold transition-all shadow-xs"
                      >
                        <span>Demo Web</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveProject(project);
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3 py-1.5 bg-[#111213] text-white hover:bg-black rounded-xl text-xs font-mono font-bold transition-all"
                    >
                      <span>Monograf</span>
                      <BookOpen className="w-3 h-3" />
                    </button>
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-[#525252] hover:text-[#111213] transition-colors"
                    title="Buka Repositori GitHub"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </section>

      </main>

      {/* 3. Footer */}
      <footer className="border-t border-[#e5e5e5] py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#525252] font-semibold">
          <div>© {new Date().getFullYear()} Izam Rosiawan. All rights reserved.</div>
          <div>Strict Zero-Leakage & Actuarial Precision</div>
        </div>
      </footer>

      {/* 4. Publication Monograph Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-[#ffffff] border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-3xl">
            {/* Modal Header */}
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

            {/* Modal Content */}
            <div className="p-8 space-y-8 text-xs sm:text-sm text-[#1a1a1a]">
              
              {/* Problem Statement */}
              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-2">
                  01 / Masalah Bisnis & Formulasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.problem}
                </p>
              </div>

              {/* Methodology */}
              <div>
                <h3 className="text-xs font-mono text-[#525252] font-bold uppercase tracking-widest mb-2">
                  02 / Metodologi Komputasi
                </h3>
                <p className="text-[#1a1a1a] leading-relaxed font-normal text-sm">
                  {activeProject.methodology}
                </p>
              </div>

              {/* Mathematical Formulation */}
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

              {/* Metrics Grid */}
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

              {/* Findings */}
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

              {/* Code Snippet */}
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

            {/* Modal Footer */}
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
