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
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const categories = [
    { id: "All", label: "All (20)" },
    { id: "Insurance", label: "Actuarial (5)" },
    { id: "Banking", label: "Banking (2)" },
    { id: "SupplyChain", label: "Supply Chain (2)" },
    { id: "PublicPolicy", label: "Public Policy (3)" },
    { id: "Healthcare", label: "Healthcare AI (4)" },
    { id: "Systems", label: "MLOps (4)" },
  ];

  const faqs = [
    {
      q: "EXPERIENCE",
      a: "Every research monograph is developed using pure industry data science methodology, prohibiting data leakage and verifying mathematical precision with GLM Tweedie, GARCH, or QWK Nelder-Mead optimization.",
    },
    {
      q: "SETUP",
      a: "Train-test split is performed FIRST before any preprocessing, scaling, or imputation steps to guarantee absolute evaluation integrity with zero target leakage.",
    },
    {
      q: "CUSTOMIZATION",
      a: "Adopts IEEE/Scopus actuarial assessment standards and OJK banking regulations for insurance solvency evaluation and Value at Risk (VaR 95%) computation.",
    },
    {
      q: "INCLUDED",
      a: "100% automated Pytest unit testing, deterministic random seed specification, and open repository on GitHub.",
    },
  ];

  const filteredProjects = useMemo(() => {
    return DETAILED_PROJECTS.filter((project) => {
      const matchCat =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const steps = [
    {
      num: "1",
      label: "FIRST STEP",
      title: "CHOOSE YOUR PERFECT FRAMEWORK.",
      body: "Start with a professionally designed foundation. Select your research domain and gain instant access to a portfolio built with clarity, character and precision in mind.",
      delay: "0s",
    },
    {
      num: "2",
      label: "SECOND STEP",
      title: "MAKE IT ENTIRELY YOUR OWN.",
      body: "Replace the datasets, update the narrative and adjust the methodology to reflect your work, style and analytical personality. No boilerplate required.",
      delay: "-8s",
    },
    {
      num: "3",
      label: "THIRD STEP",
      title: "PUBLISH WITH COMPLETE CONFIDENCE.",
      body: "Connect your domain, push to GitHub Pages and share your portfolio with the world. Start showcasing your work to clients, employers and research collaborators.",
      delay: "-16s",
    },
  ];

  const thumbnails = [
    "/images/max_strip_01.jpg",
    "/images/max_strip_02.jpg",
    "/images/max_strip_03.jpg",
    "/images/max_strip_04.jpg",
    "/images/max_strip_05.jpg",
    "/images/max_strip_06.jpg",
    "/images/max_strip_07.jpg",
    "/images/max_strip_08.jpg",
    "/images/max_receipt_tag.jpg",
  ];

  const footerLinks = [
    { label: "NAVIGATION", href: "#featured", bold: true },
    { label: "INDEX", href: "#monographs", bold: false },
    { label: "MONOGRAPHS", href: "#monographs", bold: false },
    { label: "ABOUT", href: "#steps", bold: false },
    { label: "PORTFOLIO", href: "https://github.com/izamrosiawan", bold: false, external: true },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111] antialiased selection:bg-[#111] selection:text-white">

      {/* HEADER */}
      <header
        className="w-full bg-white/95 backdrop-blur-md px-8 sm:px-14 h-[72px] flex items-center justify-between sticky top-0 z-50"
        style={{ borderBottom: "1px solid #e5e5e5" }}
      >
        <div className="font-syne text-sm font-extrabold uppercase" style={{ letterSpacing: "0.15em" }}>
          IZAM ROSIAWAN
        </div>
        <button aria-label="Open menu" className="flex flex-col gap-[5px] items-center justify-center p-2">
          <span className="block w-6 h-[2px] bg-[#111]" />
          <span className="block w-6 h-[2px] bg-[#111]" />
          <span className="block w-6 h-[2px] bg-[#111]" />
        </button>
        <div className="font-syne text-sm font-extrabold uppercase" style={{ letterSpacing: "0.15em" }}>
          GITHUB (20)
        </div>
      </header>

      {/* HERO SECTION - Exact Max Arden Studio Grey Photo */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "88vh", minHeight: 580, background: "#d2d0cc" }}
      >
        <Image
          src="/images/max_hero_main.jpg"
          alt="Izam Rosiawan portfolio editorial"
          fill
          className="object-cover object-center"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, transparent 40%, rgba(0,0,0,0.15) 100%)" }}
        />

        {/* Hero Card: warm grey glassmorphism */}
        <div
          className="absolute bottom-10 right-10 max-w-[420px] p-8 space-y-5"
          style={{
            background: "rgba(215, 213, 208, 0.86)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          <h1
            className="font-syne font-extrabold uppercase leading-tight"
            style={{ fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)", color: "#111" }}
          >
            FOR THOSE WHO KNOW PRESENTATION MATTERS.
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: "#333" }}>
            Minimalist quantitative research monograph portfolio for Data Scientists, Actuaries, and Quantitative Financial Analysts inspired by Editorial Design.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#featured"
              className="font-syne font-extrabold text-[11px] uppercase"
              style={{ color: "#111", letterSpacing: "0.18em" }}
            >
              EXPLORE MONOGRAPHS - EXPLORE
            </a>
            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0" style={{ border: "1.5px solid #111" }}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE 1 - Hairline Top/Bottom */}
      <div
        className="w-full overflow-hidden"
        style={{ background: "#fff", borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", padding: "14px 0" }}
      >
        <div className="inline-flex gap-16 whitespace-nowrap animate-marquee font-syne font-extrabold uppercase" style={{ fontSize: 13, letterSpacing: "0.14em", color: "#111" }}>
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
          <span>STRICT ZERO-LEAKAGE PRECISION. ACTUARIAL GLM TWEEDIE. GARCH MODEL.</span>
          <span>INDONESIAN BIG FOUR BANKS. ASEAN ECONOMIC RECOVERY. OLIST LOGISTICS.</span>
          <span>FOR RESEARCHERS. BY RESEARCHERS. FOR RESEARCHERS. BY RESEARCHERS.</span>
          <span>STRICT ZERO-LEAKAGE PRECISION. ACTUARIAL GLM TWEEDIE. GARCH MODEL.</span>
        </div>
      </div>

      {/* FEATURED BESTSELLERS SECTION - Pure White Background */}
      <section id="featured" className="w-full bg-white px-8 sm:px-14 pt-20 pb-16">
        <div className="mb-14">
          <h2
            className="font-syne font-extrabold uppercase leading-none"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", color: "#111", letterSpacing: "-0.03em" }}
          >
            RESEARCH
            <br />
            MONOGRAPHS
          </h2>
          <div className="font-syne font-extrabold uppercase mt-2" style={{ fontSize: 13, color: "#777", letterSpacing: "0.18em" }}>
            FOR DATA SCIENTISTS
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <span className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#111", letterSpacing: "0.2em" }}>
            / FEATURED PROJECTS
          </span>
          <a href="#monographs" className="font-syne font-extrabold uppercase hover:underline" style={{ fontSize: 11, color: "#111", letterSpacing: "0.2em" }}>
            BROWSE ALL
          </a>
        </div>

        {/* 3-Column portrait grid with real Max Arden visuals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              src: "/images/max_grid_photographer.jpg",
              label: "01 / BANKING",
              title: "Indonesian Banks Financial Risk Analytics",
              href: "https://izamrosiawan.github.io/indonesian-banks-risk-analytics/",
            },
            {
              src: "/images/max_grid_creative.jpg",
              label: "02 / E-COMMERCE",
              title: "Olist Brazilian E-Commerce Logistics Pipeline",
              href: "https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/",
            },
            {
              src: "/images/max_grid_director.jpg",
              label: "03 / MACROECONOMICS",
              title: "ASEAN Post-Pandemic Economic Recovery",
              href: "https://izamrosiawan.github.io/asean-economic-recovery/",
            },
          ].map((card) => (
            <div key={card.label} className="group cursor-pointer">
              <div className="relative overflow-hidden" style={{ height: 480, background: "#1a1a1a" }}>
                <Image src={card.src} alt={card.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" />
              </div>
              <div className="pt-4 space-y-1">
                <div className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#999", letterSpacing: "0.18em" }}>{card.label}</div>
                <h3 className="font-syne font-extrabold uppercase leading-snug" style={{ fontSize: 16, color: "#111" }}>{card.title}</h3>
                <a href={card.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-syne font-extrabold uppercase hover:underline" style={{ fontSize: 11, color: "#111", letterSpacing: "0.15em" }}>
                  VIEW PROJECT <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats + Editorial Narrative Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10" style={{ borderTop: "1px solid #ddd" }}>
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <Image src="/images/max_photographer_2.jpg" alt="studio ref 1" fill className="object-cover brightness-90" />
            </div>
            <div className="relative overflow-hidden" style={{ height: 140 }}>
              <Image src="/images/max_hero_main.jpg" alt="studio ref 2" fill className="object-cover brightness-90" />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col justify-center gap-5">
            <div className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#111", letterSpacing: "0.18em" }}>
              / TRUSTED BY ACADEMIA<br /><span style={{ color: "#999" }}>IN INDONESIA</span>
            </div>
            <div className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#111", letterSpacing: "0.18em" }}>
              / 20+ MONOGRAPHS PUBLISHED
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col justify-center">
            <p className="text-[13px] leading-relaxed" style={{ color: "#444" }}>
              Your portfolio is often your first introduction. A <strong>carefully designed</strong> presentation does not just showcase your work, it shapes how it is perceived, helping you attract <strong>better</strong> clients, stronger <strong>opportunities</strong> and the right research collaborations.
            </p>
          </div>
        </div>
      </section>

      {/* MARQUEE 2 - Quick Setup */}
      <div
        className="w-full overflow-hidden"
        style={{ borderTop: "1.5px solid #111", borderBottom: "1.5px solid #111", padding: "14px 0", background: "#fff" }}
      >
        <div className="inline-flex gap-16 whitespace-nowrap animate-marquee font-syne font-extrabold uppercase" style={{ fontSize: 13, letterSpacing: "0.14em", color: "#111" }}>
          <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
          <span>QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS. QUICK SETUP IN 3 EASY STEPS.</span>
        </div>
      </div>

      {/* STEPS & FAQ SECTION - Grey Studio Background */}
      <section id="steps" className="w-full" style={{ background: "#cac8c4" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 sm:px-14 py-16 space-y-4">
            {steps.map((step) => (
              <div key={step.num} style={{ background: "rgba(185,183,179,0.75)", backdropFilter: "blur(8px)" }}>
                <div className="overflow-hidden py-2.5 px-5" style={{ borderBottom: "1px solid rgba(100,100,100,0.25)" }}>
                  <div
                    className="inline-flex gap-8 whitespace-nowrap animate-marquee font-syne font-extrabold uppercase"
                    style={{ fontSize: 10, letterSpacing: "0.2em", color: "#666", animationDelay: step.delay }}
                  >
                    <span>{step.num} &nbsp; {step.label} &nbsp; {step.label} &nbsp; {step.label} &nbsp; {step.label}</span>
                    <span>{step.num} &nbsp; {step.label} &nbsp; {step.label} &nbsp; {step.label} &nbsp; {step.label}</span>
                  </div>
                </div>
                <div className="p-7 space-y-3">
                  <h3
                    className="font-syne font-extrabold uppercase leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", color: "#111" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: "#444" }}>{step.body}</p>
                </div>
              </div>
            ))}

            {/* FAQ Accordion */}
            <div className="mt-4" style={{ background: "rgba(185,183,179,0.75)", backdropFilter: "blur(8px)" }}>
              <div className="overflow-hidden py-2.5 px-5" style={{ borderBottom: "1px solid rgba(100,100,100,0.25)" }}>
                <div
                  className="inline-flex gap-8 whitespace-nowrap animate-marquee font-syne font-extrabold uppercase"
                  style={{ fontSize: 10, letterSpacing: "0.2em", color: "#666", animationDelay: "-4s" }}
                >
                  <span>? &nbsp; FREQUENTLY ASKED &nbsp; FREQUENTLY ASKED &nbsp; FREQUENTLY ASKED</span>
                  <span>? &nbsp; FREQUENTLY ASKED &nbsp; FREQUENTLY ASKED &nbsp; FREQUENTLY ASKED</span>
                </div>
              </div>
              <div>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} style={{ borderBottom: idx < faqs.length - 1 ? "1px solid rgba(100,100,100,0.2)" : "none" }}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-7 py-5 flex items-center justify-between text-left"
                      >
                        <span className="font-syne font-extrabold uppercase" style={{ fontSize: 13, color: "#111", letterSpacing: "0.12em" }}>
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          style={{ color: "#666" }}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-7 pb-5 text-[13px] leading-relaxed" style={{ color: "#444" }}>{faq.a}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block" style={{ minHeight: 700 }}>
            <Image src="/images/max_photographer_2.jpg" alt="Editorial portfolio showcase" fill className="object-cover object-center" />
          </div>
        </div>
      </section>

      {/* WHO IS IZAM SECTION */}
      <section className="w-full" style={{ background: "#d4d2ce" }}>
        <div className="overflow-hidden" style={{ borderTop: "1.5px solid #666", borderBottom: "1.5px solid #666", padding: "14px 0" }}>
          <div className="inline-flex gap-16 whitespace-nowrap animate-marquee font-syne font-extrabold uppercase" style={{ fontSize: 13, letterSpacing: "0.14em", color: "#111" }}>
            <span>FOR CREATIVES. BY CREATIVES. FOR CREATIVES. BY CREATIVES. FOR CREATIVES. BY CREATIVES.</span>
            <span>FOR CREATIVES. BY CREATIVES. FOR CREATIVES. BY CREATIVES. FOR CREATIVES. BY CREATIVES.</span>
          </div>
        </div>
        <div className="grid grid-cols-2" style={{ height: 520 }}>
          <div className="relative overflow-hidden">
            <Image src="/images/max_hero_main.jpg" alt="Who is Izam left" fill className="object-cover brightness-90" />
            <div className="absolute bottom-6 left-6">
              <div className="font-syne font-black uppercase" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", lineHeight: 1.05 }}>
                WHO<br />IS<br />IZAM
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden">
            <Image src="/images/max_photographer_2.jpg" alt="Who is Izam right" fill className="object-cover brightness-90" />
            <div className="absolute top-1/2 -translate-y-1/2 right-8 max-w-[260px] text-right">
              <div className="font-syne font-extrabold uppercase leading-tight" style={{ fontSize: 15, color: "#fff" }}>
                TEMPLATES<br />DESIGNED THE WAY<br />I'D WANT TO BUY<br />THEM.
              </div>
            </div>
            <div className="absolute bottom-6 left-6 max-w-[300px]">
              <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                Every monograph starts from scratch. Typography, spacing, method and interaction are <strong>considered</strong> together, not <strong>layered</strong> on afterwards. The result is something flexible enough to become <strong>yours</strong> without feeling generic.
              </p>
            </div>
          </div>
        </div>
        <div className="px-8 sm:px-14 py-10">
          <p className="font-syne font-extrabold uppercase" style={{ fontSize: 13, color: "#333", letterSpacing: "0.12em" }}>
            I'M IZAM, AN INDONESIAN DATA SCIENTIST BASED IN JAKARTA,
          </p>
        </div>
      </section>

      {/* GIANT OVERLAPPING WORDMARK SECTION */}
      <section className="w-full relative overflow-hidden" style={{ background: "#fff" }}>
        <div className="relative" style={{ height: "65vh", minHeight: 400 }}>
          <Image src="/images/max_photographer_2.jpg" alt="Presentation editorial background" fill className="object-cover object-center" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14">
            <div
              className="font-syne font-black uppercase leading-none select-none"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)", WebkitTextStroke: "2px #fff", color: "transparent", letterSpacing: "-0.04em" }}
            >
              PRESENTATION
            </div>
            <div
              className="font-syne font-black uppercase leading-none select-none"
              style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "#fff", letterSpacing: "-0.04em" }}
            >
              PRESENTATION
            </div>
          </div>
          <div
            className="absolute left-8 sm:left-14 bottom-8 max-w-[340px] p-6 space-y-3"
            style={{ background: "rgba(200,198,195,0.8)", backdropFilter: "blur(12px)" }}
          >
            <p className="text-[12px] leading-relaxed" style={{ color: "#222" }}>
              After building machine learning pipelines and quantitative models for years, I <strong>realized</strong> finding presentation scaffolds that felt <strong>genuinely</strong> well designed was surprisingly difficult. So I started <strong>creating</strong> the kind I'd actually want to use myself; clean, <strong>thoughtful</strong>, and built around presentation.
            </p>
            <div className="flex flex-wrap gap-3">
              {["/ ART", "/ DESIGN", "/ ANALYSIS"].map((tag) => (
                <span key={tag} className="font-syne font-extrabold uppercase" style={{ fontSize: 10, color: "#555", letterSpacing: "0.18em" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH ARCHIVE - COMPLETE MONOGRAPH COLLECTION */}
      <section id="monographs" className="w-full bg-white px-8 sm:px-14 py-20">
        <div className="mb-12" style={{ borderBottom: "1px solid #ddd", paddingBottom: 32 }}>
          <div className="font-syne font-extrabold uppercase mb-3" style={{ fontSize: 11, color: "#999", letterSpacing: "0.2em" }}>
            / RESEARCH ARCHIVE (2024 - 2026)
          </div>
          <h2 className="font-syne font-extrabold uppercase" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#111", letterSpacing: "-0.02em" }}>
            COMPLETE MONOGRAPH COLLECTION
          </h2>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12" style={{ borderBottom: "1px solid #ddd", paddingBottom: 24 }}>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="font-syne font-extrabold uppercase transition-opacity"
                  style={{ fontSize: 11, letterSpacing: "0.18em", color: "#111", opacity: isActive ? 1 : 0.4, textDecoration: isActive ? "underline" : "none", textUnderlineOffset: 6 }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2" style={{ color: "#999" }} />
            <input
              type="text"
              placeholder="Search topic, algorithm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-7 py-1.5 text-[12px] font-syne placeholder-[#aaa] focus:outline-none"
              style={{ borderBottom: "1px solid #bbb", color: "#111" }}
            />
          </div>
        </div>

        <div>
          {filteredProjects.map((project, idx) => {
            const hasWebDemo = !!project.demoUrl;
            return (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer py-8 transition-all hover:bg-[#f8f8f8]"
                style={{ borderBottom: "1px solid #e8e8e8" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-2 space-y-2">
                    <div className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#999", letterSpacing: "0.18em" }}>
                      {String(idx + 1).padStart(2, "0")} / {project.domain}
                    </div>
                    <div className="font-syne text-[11px]" style={{ color: "#666" }}>{project.datasetInfo.name}</div>
                    <div className="font-syne font-extrabold" style={{ fontSize: 20, color: "#111" }}>{project.metrics[0].value}</div>
                    <div className="font-syne text-[10px] uppercase" style={{ color: "#aaa", letterSpacing: "0.14em" }}>{project.metrics[0].label}</div>
                  </div>
                  <div className="lg:col-span-7 space-y-3">
                    <h3 className="font-syne font-extrabold uppercase leading-snug" style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "#111" }}>
                      {project.title}
                    </h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#555" }}>{project.problem}</p>
                    <div className="text-[11px] leading-relaxed font-mono" style={{ color: "#999" }}>{project.formula.latex}</div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      {project.techStack.map((t, i) => (
                        <span key={i} className="font-syne font-extrabold uppercase" style={{ fontSize: 10, color: "#bbb", letterSpacing: "0.14em" }}>#{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-between gap-3 h-full">
                    {hasWebDemo && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1.5 font-syne font-extrabold uppercase hover:underline" style={{ fontSize: 11, color: "#111", letterSpacing: "0.15em" }}>
                        VIEW DEMO <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button type="button" onClick={(e) => { e.stopPropagation(); setActiveProject(project); }} className="inline-flex items-center gap-1.5 font-syne font-extrabold uppercase hover:underline" style={{ fontSize: 11, color: "#777", letterSpacing: "0.15em" }}>
                      VIEW DETAIL <BookOpen className="w-3 h-3" />
                    </button>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-1 font-syne font-extrabold uppercase hover:underline" style={{ fontSize: 11, color: "#bbb", letterSpacing: "0.15em" }}>
                      GITHUB <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER - White background with real thumbnail strip */}
      <footer className="w-full bg-white" style={{ borderTop: "1px solid #e8e8e8" }}>
        <div className="px-8 sm:px-14 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ borderBottom: "1px solid #e8e8e8" }}>
          <div className="flex flex-wrap gap-8 items-center">
            {footerLinks.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className="font-syne font-extrabold uppercase hover:underline"
                style={{ fontSize: 11, color: item.bold ? "#111" : "#aaa", letterSpacing: "0.18em" }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="font-syne font-extrabold uppercase" style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.14em" }}>
            IZAM ROSIAWAN © 2026 | CREATED WITH NEXT.JS
          </div>
        </div>
        <div className="px-8 sm:px-14 py-8">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {thumbnails.map((src, i) => (
              <div key={i} className="relative overflow-hidden" style={{ height: 72 }}>
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover brightness-90 hover:brightness-100 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* MODAL VIEW */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" style={{ border: "1px solid #e5e5e5" }}>
            <div className="p-8 flex items-start justify-between gap-6 sticky top-0 bg-white z-10" style={{ borderBottom: "1px solid #e5e5e5" }}>
              <div>
                <div className="font-syne font-extrabold uppercase mb-1" style={{ fontSize: 11, color: "#999", letterSpacing: "0.2em" }}>
                  {activeProject.domain} - {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-syne font-extrabold uppercase leading-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", color: "#111" }}>
                  {activeProject.title}
                </h2>
              </div>
              <button onClick={() => setActiveProject(null)} className="p-2 hover:bg-[#f4f4f5] transition-colors flex-shrink-0" aria-label="Close">
                <X className="w-5 h-5" style={{ color: "#555" }} />
              </button>
            </div>
            <div className="p-8 space-y-8 text-sm">
              <div>
                <div className="font-syne font-extrabold uppercase mb-2" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>01 / PROBLEM STATEMENT</div>
                <p className="leading-relaxed" style={{ color: "#222" }}>{activeProject.problem}</p>
              </div>
              <div>
                <div className="font-syne font-extrabold uppercase mb-2" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>02 / METHODOLOGY</div>
                <p className="leading-relaxed" style={{ color: "#222" }}>{activeProject.methodology}</p>
              </div>
              <div>
                <div className="font-syne font-extrabold uppercase mb-2" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>03 / FORMULA ({activeProject.formula.title})</div>
                <div className="p-4 font-mono text-xs overflow-x-auto" style={{ background: "#f4f4f5", border: "1px solid #e5e5e5", color: "#111" }}>{activeProject.formula.latex}</div>
                <p className="text-xs mt-2" style={{ color: "#666" }}>{activeProject.formula.explanation}</p>
              </div>
              <div>
                <div className="font-syne font-extrabold uppercase mb-3" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>04 / EVALUATION METRICS</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, i) => (
                    <div key={i} className="p-4" style={{ background: "#fafaf9", border: "1px solid #e5e5e5" }}>
                      <div className="font-syne font-extrabold uppercase" style={{ fontSize: 10, color: "#999", letterSpacing: "0.16em" }}>{m.label}</div>
                      <div className="font-syne font-extrabold" style={{ fontSize: 22, color: "#111", marginTop: 4 }}>{m.value}</div>
                      <div className="text-xs mt-1" style={{ color: "#888" }}>{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-syne font-extrabold uppercase mb-3" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>05 / KEY FINDINGS</div>
                <ul className="space-y-2">
                  {activeProject.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#222" }}>
                      <span className="font-syne font-bold flex-shrink-0" style={{ color: "#bbb" }}>-</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-syne font-extrabold uppercase" style={{ fontSize: 10, color: "#999", letterSpacing: "0.2em" }}>06 / CODE SNIPPET</div>
                  <button onClick={() => handleCopyCode(activeProject.codeSnippet)} className="font-syne font-extrabold uppercase text-[10px] hover:underline" style={{ color: "#111", letterSpacing: "0.14em" }}>
                    {copiedCode ? "[COPIED]" : "[COPY]"}
                  </button>
                </div>
                <pre className="p-4 text-xs overflow-x-auto leading-relaxed font-mono" style={{ background: "#18181b", color: "#f4f4f5" }}>
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>
            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white" style={{ borderTop: "1px solid #e5e5e5" }}>
              <span className="text-xs font-syne" style={{ color: "#999" }}>{activeProject.datasetInfo.size}</span>
              <div className="flex flex-wrap items-center gap-3">
                {activeProject.demoUrl && (
                  <a href={activeProject.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-syne font-extrabold uppercase text-[11px]" style={{ background: "#111", color: "#fff", letterSpacing: "0.14em" }}>
                    OPEN DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a href={activeProject.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 font-syne font-extrabold uppercase text-[11px]" style={{ background: "#f4f4f5", color: "#111", letterSpacing: "0.14em" }}>
                  GITHUB <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
