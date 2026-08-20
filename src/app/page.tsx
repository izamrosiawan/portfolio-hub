"use client";

import React, { useState, useMemo } from "react";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { 
  ArrowUpRight, 
  Github, 
  Mail, 
  X, 
  Check, 
  Copy
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
    <div className="min-h-screen bg-[#fafaf9] text-[#111213] antialiased font-sans">
      
      {/* 1. Header (Minimalissimo Editorial Open Bar) */}
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
              className="text-[#111213] hover:text-black transition-colors editorial-link"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-[#111213] hover:text-black transition-colors editorial-link"
            >
              Email ↗
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
        
        {/* Editorial Introduction */}
        <section className="mb-16 max-w-3xl">
          <p className="text-xs font-mono text-[#525252] font-semibold uppercase tracking-widest mb-4">
            Koleksi Riset & Rekayasa Terapan (2024 — 2026)
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-[#111213] leading-[1.15] font-normal">
            Koleksi sains data industri, formulasi aktuaria, dan arsitektur risiko kuantitatif.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-[#262626] leading-relaxed font-normal max-w-2xl">
            Setiap repositori dibangun dengan formulasi matematika teruji, pipeline isolasi zero data leakage, dan pengujian otomatis Pytest 100%.
          </p>
        </section>

        {/* Curation Filter & Search Strip (No Box, Pure Lines) */}
        <section className="border-t border-b border-[#e5e5e5] py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Categories Underline Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono font-medium">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-colors text-left ${
                    isActive
                      ? "text-[#111213] font-bold underline underline-offset-8 decoration-2 decoration-[#111213]"
                      : "text-[#525252] hover:text-[#111213]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Line */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Cari topik, algoritma, rumus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#a3a3a3] py-1 text-xs text-[#111213] font-medium placeholder-[#525252] focus:outline-none focus:border-[#111213] transition-colors font-mono"
            />
          </div>
        </section>

        {/* 3. Open Horizontal Minimalissimo Stream (Zero Boxed Cards, Pure Editorial Lines) */}
        <section className="divide-y divide-[#e5e5e5]">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="py-10 sm:py-12 group cursor-pointer transition-colors hover:bg-black/[0.015] -mx-4 px-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-baseline">
                {/* Index & Domain */}
                <div className="lg:col-span-3">
                  <span className="text-xs font-mono text-[#525252] font-semibold block mb-1">
                    {String(idx + 1).padStart(2, "0")} / {project.domain}
                  </span>
                  <div className="text-xs font-mono text-[#262626] font-medium">
                    {project.datasetInfo.name}
                  </div>
                </div>

                {/* Title, Problem & Tech */}
                <div className="lg:col-span-6">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#111213] group-hover:underline underline-offset-4 decoration-1 decoration-[#111213] transition-colors leading-snug font-medium">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#262626] mt-3 leading-relaxed font-normal">
                    {project.problem}
                  </p>
                  
                  {/* Tech stack inline tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="text-[11px] font-mono text-[#525252] font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Metric & Link CTA */}
                <div className="lg:col-span-3 lg:text-right flex lg:flex-col justify-between items-end gap-2">
                  <div>
                    <div className="text-[11px] font-mono text-[#525252] uppercase font-semibold">
                      {project.metrics[0].label}
                    </div>
                    <div className="font-mono text-lg sm:text-xl font-bold text-[#111213] mt-0.5">
                      {project.metrics[0].value}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#111213] font-bold group-hover:translate-x-0.5 transition-transform pt-2">
                    <span>Lihat Kasus</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-[#e5e5e5] py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#525252] font-semibold">
          <div>© {new Date().getFullYear()} Izam Rosiawan. All rights reserved.</div>
          <div>Strict Zero-Leakage & Actuarial Precision</div>
        </div>
      </footer>

      {/* 5. Clean Modal Monograph (No nested dark boxes, crisp high contrast) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-[#ffffff] border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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
                className="p-1.5 text-[#525252] hover:text-[#111213] transition-colors"
                aria-label="Tutup"
              >
                <X className="w-6 h-6" />
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
                <div className="p-4 bg-[#f4f4f5] border border-[#e5e5e5] font-mono text-[#111213] text-xs sm:text-sm overflow-x-auto my-2 font-semibold">
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
                    <div key={idx} className="p-4 bg-[#fafaf9] border border-[#e5e5e5]">
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
                <pre className="p-4 bg-[#18181b] text-[#f4f4f5] font-mono text-xs overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-[#e5e5e5] bg-[#fafaf9] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0">
              <span className="text-xs font-mono text-[#525252] font-medium">
                {activeProject.datasetInfo.size}
              </span>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111213] text-white hover:bg-black font-mono font-bold text-xs transition-colors shadow-xs"
              >
                <span>Buka Repositori GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
