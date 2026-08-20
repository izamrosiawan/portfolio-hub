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
  SlidersHorizontal
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Filter Categories
  const categories = [
    { id: "All", label: "All Works" },
    { id: "Insurance", label: "Actuarial Science" },
    { id: "Banking", label: "Quantitative Finance" },
    { id: "SupplyChain", label: "Operations & Supply Chain" },
    { id: "PublicPolicy", label: "Public Policy & Impact" },
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
    <div className="min-h-screen bg-[#0c0d0e] text-[#e1e2e4] antialiased">
      
      {/* 1. Header (Minimalissimo Style: Pure Typography, Generous Whitespace) */}
      <header className="border-b border-[#1d1f22]">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight text-white font-medium">Izam Rosiawan</span>
            <span className="text-[11px] font-mono text-[#73767c] tracking-wider uppercase">Quantitative Data Science & Actuarial Research</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="text-[#a0a3a8] hover:text-white transition-colors editorial-link"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-[#a0a3a8] hover:text-white transition-colors editorial-link"
            >
              Email ↗
            </a>
          </div>
        </div>
      </header>

      {/* 2. Main Body */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        
        {/* Editorial Introduction */}
        <section className="mb-20 sm:mb-28 max-w-3xl">
          <p className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-6">
            Selected Works (2024 — 2026)
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-white leading-[1.15] font-normal">
            A disciplined collection of applied machine learning, actuarial formulations, and financial risk architectures.
          </h1>
          <p className="mt-8 text-sm sm:text-base text-[#8f9298] leading-relaxed font-light max-w-2xl">
            Each repository adheres to rigorous mathematical formulation, zero-leakage preprocessing pipelines, and automated verification suites.
          </p>
        </section>

        {/* Curation Filter & Search Strip */}
        <section className="border-t border-b border-[#1d1f22] py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`transition-colors text-left ${
                    isActive
                      ? "text-white font-medium underline underline-offset-8 decoration-1 decoration-white"
                      : "text-[#73767c] hover:text-[#c5c7cb]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder="Search by topic, formula, algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#292c31] py-1 text-xs text-white placeholder-[#54575d] focus:outline-none focus:border-white transition-colors font-mono"
            />
          </div>
        </section>

        {/* 3. Projects List (Minimalissimo Editorial Grid) */}
        <section className="divide-y divide-[#1d1f22]">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="py-10 sm:py-12 group cursor-pointer transition-colors hover:bg-white/[0.01]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-baseline">
                {/* Index & Domain */}
                <div className="lg:col-span-3">
                  <span className="text-[11px] font-mono text-[#54575d] block mb-1">
                    {String(idx + 1).padStart(2, "0")} / {project.domain}
                  </span>
                  <div className="text-[11px] font-mono text-[#73767c]">
                    {project.datasetInfo.name}
                  </div>
                </div>

                {/* Title & Problem */}
                <div className="lg:col-span-6">
                  <h2 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#f3f4f6] transition-colors leading-snug">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#8a8d93] mt-3 leading-relaxed font-light">
                    {project.problem}
                  </p>
                  
                  {/* Tech stack inline */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-[#61646b]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Metric & Link CTA */}
                <div className="lg:col-span-3 lg:text-right flex lg:flex-col justify-between items-end gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-[#54575d] uppercase">
                      {project.metrics[0].label}
                    </div>
                    <div className="font-mono text-base sm:text-lg font-medium text-white mt-0.5">
                      {project.metrics[0].value}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#73767c] group-hover:text-white transition-colors pt-2">
                    <span>Inspect Case</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-[#1d1f22] py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#54575d]">
          <div>© {new Date().getFullYear()} Izam Rosiawan. All rights reserved.</div>
          <div>Strict Zero-Leakage & Actuarial Precision</div>
        </div>
      </footer>

      {/* 5. Minimal Modal (Editorial Monograph Overlay) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-[#0f1012] border border-[#23262a] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-[#1d1f22] flex items-start justify-between gap-6 sticky top-0 bg-[#0f1012] z-10">
              <div>
                <div className="text-[11px] font-mono text-[#73767c] uppercase tracking-widest mb-1">
                  {activeProject.domain} — {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
                  {activeProject.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-[#73767c] hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8 text-xs sm:text-sm">
              
              {/* Problem Statement */}
              <div>
                <h3 className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-3">
                  01 / Problem Context
                </h3>
                <p className="text-[#a6a9af] leading-relaxed font-light">
                  {activeProject.problem}
                </p>
              </div>

              {/* Methodology */}
              <div>
                <h3 className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-3">
                  02 / Computational Methodology
                </h3>
                <p className="text-[#a6a9af] leading-relaxed font-light">
                  {activeProject.methodology}
                </p>
              </div>

              {/* Mathematical Formulation */}
              <div>
                <h3 className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-3">
                  03 / Mathematical Formulation ({activeProject.formula.title})
                </h3>
                <div className="p-4 bg-[#070809] border border-[#1d1f22] font-mono text-white text-xs overflow-x-auto my-2">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-[11px] font-mono text-[#73767c]">
                  {activeProject.formula.explanation}
                </p>
              </div>

              {/* Metrics Grid */}
              <div>
                <h3 className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-3">
                  04 / Empirical Verification Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 bg-[#070809] border border-[#1d1f22]">
                      <div className="text-[10px] font-mono text-[#73767c] uppercase">{m.label}</div>
                      <div className="font-mono text-lg font-medium text-white mt-1">{m.value}</div>
                      <div className="text-[10px] font-mono text-[#54575d] mt-1">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div>
                <h3 className="text-xs font-mono text-[#73767c] uppercase tracking-widest mb-3">
                  05 / Analytical Findings
                </h3>
                <ul className="space-y-2 text-[#a6a9af] font-light">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#54575d] font-mono text-xs">—</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#73767c] mb-2">
                  <span>06 / Production Code Sample</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="text-[#73767c] hover:text-white transition-colors"
                  >
                    {copiedCode ? "[Copied]" : "[Copy Snippet]"}
                  </button>
                </div>
                <pre className="p-4 bg-[#070809] border border-[#1d1f22] font-mono text-xs text-[#c5c7cb] overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-[#1d1f22] bg-[#0f1012] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0">
              <span className="text-[11px] font-mono text-[#54575d]">
                {activeProject.datasetInfo.size}
              </span>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black hover:bg-[#eaeaea] font-mono font-medium text-xs transition-colors"
              >
                <span>View GitHub Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
