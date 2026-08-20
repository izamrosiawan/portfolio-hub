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
  Copy
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
    <div className="min-h-screen bg-[#fafaf9] text-[#111213] antialiased">
      
      {/* 1. Header (Minimalissimo Gallery Style: Clean Off-White with Hairline Border) */}
      <header className="border-b border-[#e5e5e5] bg-[#fafaf9]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight text-[#111213] font-medium">Izam Rosiawan</span>
            <span className="text-[11px] font-mono text-[#73767c] tracking-wider uppercase">Quantitative Data Science & Actuarial Research</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="text-[#4b5563] hover:text-[#111213] transition-colors editorial-link"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:izamrosiawan13@gmail.com"
              className="text-[#4b5563] hover:text-[#111213] transition-colors editorial-link"
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
          <p className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-6">
            Selected Works (2024 — 2026)
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] text-[#111213] leading-[1.15] font-normal">
            A disciplined collection of applied machine learning, actuarial formulations, and financial risk architectures.
          </h1>
          <p className="mt-8 text-sm sm:text-base text-[#4b5563] leading-relaxed font-light max-w-2xl">
            Each repository adheres to rigorous mathematical formulation, zero-leakage preprocessing pipelines, and automated verification suites.
          </p>
        </section>

        {/* Curation Filter & Search Strip */}
        <section className="border-t border-b border-[#e5e5e5] py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
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
                      ? "text-[#111213] font-semibold underline underline-offset-8 decoration-1 decoration-[#111213]"
                      : "text-[#8c9199] hover:text-[#111213]"
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
              placeholder="Search by topic, formula, algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#d1d5db] py-1 text-xs text-[#111213] placeholder-[#9ca3af] focus:outline-none focus:border-[#111213] transition-colors font-mono"
            />
          </div>
        </section>

        {/* 3. Projects List (Minimalissimo Gallery Grid) */}
        <section className="divide-y divide-[#e5e5e5]">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="py-10 sm:py-12 group cursor-pointer transition-colors hover:bg-black/[0.015] -mx-4 px-4 rounded-lg"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-baseline">
                {/* Index & Domain */}
                <div className="lg:col-span-3">
                  <span className="text-[11px] font-mono text-[#8c9199] block mb-1">
                    {String(idx + 1).padStart(2, "0")} / {project.domain}
                  </span>
                  <div className="text-[11px] font-mono text-[#6b7280]">
                    {project.datasetInfo.name}
                  </div>
                </div>

                {/* Title & Problem */}
                <div className="lg:col-span-6">
                  <h2 className="font-serif text-xl sm:text-2xl text-[#111213] group-hover:text-black transition-colors leading-snug font-medium">
                    {project.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#4b5563] mt-3 leading-relaxed font-light">
                    {project.problem}
                  </p>
                  
                  {/* Tech stack inline */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.techStack.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono text-[#9ca3af]">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Metric & Link CTA */}
                <div className="lg:col-span-3 lg:text-right flex lg:flex-col justify-between items-end gap-2">
                  <div>
                    <div className="text-[10px] font-mono text-[#8c9199] uppercase">
                      {project.metrics[0].label}
                    </div>
                    <div className="font-mono text-base sm:text-lg font-semibold text-[#111213] mt-0.5">
                      {project.metrics[0].value}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-mono text-[#6b7280] group-hover:text-[#111213] transition-colors pt-2">
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
      <footer className="border-t border-[#e5e5e5] py-12">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8c9199]">
          <div>© {new Date().getFullYear()} Izam Rosiawan. All rights reserved.</div>
          <div>Strict Zero-Leakage & Actuarial Precision</div>
        </div>
      </footer>

      {/* 5. Minimal Modal (Editorial Monograph Overlay) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-[#ffffff] border border-[#e5e5e5] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl rounded-none">
            {/* Modal Header */}
            <div className="p-8 border-b border-[#e5e5e5] flex items-start justify-between gap-6 sticky top-0 bg-[#ffffff] z-10">
              <div>
                <div className="text-[11px] font-mono text-[#8c9199] uppercase tracking-widest mb-1">
                  {activeProject.domain} — {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#111213] font-medium leading-tight">
                  {activeProject.title}
                </h2>
              </div>

              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-[#8c9199] hover:text-[#111213] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8 text-xs sm:text-sm text-[#374151]">
              
              {/* Problem Statement */}
              <div>
                <h3 className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-3">
                  01 / Problem Context
                </h3>
                <p className="text-[#374151] leading-relaxed font-light">
                  {activeProject.problem}
                </p>
              </div>

              {/* Methodology */}
              <div>
                <h3 className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-3">
                  02 / Computational Methodology
                </h3>
                <p className="text-[#374151] leading-relaxed font-light">
                  {activeProject.methodology}
                </p>
              </div>

              {/* Mathematical Formulation */}
              <div>
                <h3 className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-3">
                  03 / Mathematical Formulation ({activeProject.formula.title})
                </h3>
                <div className="p-4 bg-[#f4f4f5] border border-[#e5e5e5] font-mono text-[#111213] text-xs overflow-x-auto my-2">
                  <code>{activeProject.formula.latex}</code>
                </div>
                <p className="text-[11px] font-mono text-[#6b7280]">
                  {activeProject.formula.explanation}
                </p>
              </div>

              {/* Metrics Grid */}
              <div>
                <h3 className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-3">
                  04 / Empirical Verification Metrics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 bg-[#fafaf9] border border-[#e5e5e5]">
                      <div className="text-[10px] font-mono text-[#8c9199] uppercase">{m.label}</div>
                      <div className="font-mono text-lg font-semibold text-[#111213] mt-1">{m.value}</div>
                      <div className="text-[10px] font-mono text-[#6b7280] mt-1">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Findings */}
              <div>
                <h3 className="text-xs font-mono text-[#8c9199] uppercase tracking-widest mb-3">
                  05 / Analytical Findings
                </h3>
                <ul className="space-y-2 text-[#374151] font-light">
                  {activeProject.findings.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#9ca3af] font-mono text-xs">—</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code Snippet */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#8c9199] mb-2">
                  <span>06 / Production Code Sample</span>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="text-[#4b5563] hover:text-[#111213] font-medium transition-colors"
                  >
                    {copiedCode ? "[Copied]" : "[Copy Snippet]"}
                  </button>
                </div>
                <pre className="p-4 bg-[#18181b] border border-[#27272a] font-mono text-xs text-[#e4e4e7] overflow-x-auto leading-relaxed">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 border-t border-[#e5e5e5] bg-[#fafaf9] flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0">
              <span className="text-[11px] font-mono text-[#6b7280]">
                {activeProject.datasetInfo.size}
              </span>

              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111213] text-white hover:bg-black font-mono font-medium text-xs transition-colors shadow-sm"
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
