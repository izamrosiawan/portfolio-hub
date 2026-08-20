"use client";

import React, { useState, useMemo } from "react";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  Search, 
  ArrowUpRight, 
  Github, 
  Mail, 
  X, 
  Check, 
  Copy,
  ExternalLink,
  Code2,
  Database,
  Layers,
  Sparkles
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const categories = [
    { id: "All", label: "Semua Proyek" },
    { id: "Insurance", label: "Aktuaria & Asuransi" },
    { id: "Banking", label: "Keuangan Kuantitatif" },
    { id: "SupplyChain", label: "Supply Chain & Ops" },
    { id: "PublicPolicy", label: "Kebijakan Publik" },
    { id: "Healthcare", label: "Healthcare AI" },
    { id: "Systems", label: "MLOps & Systems" },
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
    <div className="min-h-screen bg-[#fcfcfb] text-[#1a1a1a] font-sans antialiased">
      
      {/* 1. Navbar */}
      <header className="border-b border-stone-200 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-stone-900">Izam Rosiawan</span>
            <span className="text-xs font-mono text-stone-700 font-semibold tracking-wide">
              Portfolio Riset Sains Data & Aktuaria
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="text-stone-800 hover:text-black transition-colors underline underline-offset-4 decoration-stone-400 font-mono text-xs"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-stone-800 hover:text-black transition-colors underline underline-offset-4 decoration-stone-400 font-mono text-xs"
            >
              Email ↗
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-16">
        
        {/* Intro */}
        <section className="mb-12 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 leading-[1.2] tracking-tight">
            Kumpulan Proyek Sains Data Industri, Pemodelan Aktuaria & Analitik Kuantitatif.
          </h1>
          <p className="mt-4 text-base text-stone-800 leading-relaxed font-normal">
            Portofolio implementasi machine learning dengan standar industri: zero data leakage, pengujian otomatis Pytest, formulasi matematika teruji, dan siap pakai.
          </p>
        </section>

        {/* Filter & Search Bar */}
        <section className="border-y border-stone-200 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 bg-white px-4 rounded-xl shadow-xs">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-stone-900 text-white font-bold shadow-xs"
                      : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Cari topik, algoritma, rumus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-xs text-stone-900 placeholder-stone-600 focus:outline-none focus:border-stone-900 transition-colors font-medium"
            />
          </div>
        </section>

        {/* 3. Projects Grid List */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Domain & Index */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-800 font-semibold border border-stone-200">
                    {project.domain}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    ✓ Pytest 100%
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-stone-900 group-hover:text-blue-900 transition-colors leading-snug">
                  {project.title}
                </h2>
                
                <p className="text-xs font-mono text-stone-700 font-medium mt-1 line-clamp-1">
                  {project.tagline}
                </p>

                {/* Problem Statement */}
                <p className="text-xs text-stone-800 mt-3 leading-relaxed line-clamp-3">
                  {project.problem}
                </p>

                {/* Key Metrics Highlight Box */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-stone-100">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="p-2 rounded-lg bg-stone-50 border border-stone-200 text-center">
                      <div className="text-[10px] text-stone-700 truncate font-semibold">{m.label}</div>
                      <div className="text-xs font-bold font-mono text-stone-950 mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 2).map((t, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-mono text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-1 font-bold text-stone-900 group-hover:translate-x-0.5 transition-transform text-xs">
                  <span>Buka Detail</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </section>

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-stone-200 py-10 bg-white mt-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-700 font-semibold">
          <div>© {new Date().getFullYear()} Izam Rosiawan. Hak Cipta Dilindungi.</div>
          <div>Strict Zero-Leakage & Actuarial Precision</div>
        </div>
      </footer>

      {/* 5. Fixed Pop-up Detail Modal (High Contrast, Crystal Clear Text) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white border border-stone-300 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-200 flex items-start justify-between gap-4 sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono mb-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-blue-50 text-blue-800 font-bold border border-blue-200">
                    {activeProject.domain}
                  </span>
                  <span className="text-stone-700 font-bold">• {activeProject.datasetInfo.name}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-950 leading-tight">
                  {activeProject.title}
                </h2>
                <p className="text-xs text-stone-700 font-mono mt-1 font-semibold">{activeProject.tagline}</p>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-stone-900">
              
              {/* 1. Problem & 2. Methodology */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h3 className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider mb-2">
                    01 / Masalah Bisnis & Formulasi
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-900 font-normal">
                    {activeProject.problem}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                  <h3 className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider mb-2">
                    02 / Metodologi Komputasi
                  </h3>
                  <p className="text-xs leading-relaxed text-stone-900 font-normal">
                    {activeProject.methodology}
                  </p>
                </div>
              </div>

              {/* 3. Mathematical Formulation */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <h3 className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider mb-2">
                  03 / Formulasi Matematika ({activeProject.formula.title})
                </h3>
                <div className="p-3 bg-white rounded-lg border border-stone-300 font-mono text-stone-950 text-xs overflow-x-auto my-2 shadow-xs font-semibold">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-xs text-stone-700 font-medium">
                  {activeProject.formula.explanation}
                </p>
              </div>

              {/* 4. Quantitative Metrics */}
              <div>
                <h3 className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider mb-2.5">
                  04 / Metrik Evaluasi Kuantitatif
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-white border border-stone-200 rounded-xl shadow-xs">
                      <div className="text-xs text-stone-700 font-bold uppercase">{m.label}</div>
                      <div className="font-mono text-xl font-extrabold text-stone-950 mt-1">{m.value}</div>
                      <div className="text-xs text-stone-600 mt-1 font-medium">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Analytical Findings */}
              <div>
                <h3 className="text-xs font-mono font-bold text-stone-950 uppercase tracking-wider mb-2.5">
                  05 / Temuan Analitik Utama
                </h3>
                <ul className="space-y-2 text-xs text-stone-900">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-700 font-bold font-mono">●</span>
                      <span className="leading-relaxed font-normal">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. Code Sample */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-900 font-bold mb-2">
                  <span>06 / Contoh Kode Produksi (src/)</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="text-stone-800 hover:text-black font-bold flex items-center gap-1 bg-stone-100 px-2 py-1 rounded"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Tersalin" : "Salin Kode"}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 rounded-xl text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed shadow-xs">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-stone-200 bg-stone-50 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 rounded-b-2xl">
              <span className="text-xs font-mono text-stone-700 font-medium">
                Dataset: {activeProject.datasetInfo.size}
              </span>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-stone-950 text-white hover:bg-black font-medium text-xs rounded-xl transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>Buka Repositori GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
