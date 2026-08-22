"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import {
  ArrowRight,
  ArrowUpRight,
  X,
  ExternalLink,
  BookOpen,
  Search,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Send,
  Linkedin,
  Github,
  Mail,
  MapPin,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "Select",
    message: "",
  });

  const categories = [
    { id: "All", label: "All (20)" },
    { id: "Insurance", label: "Actuarial (5)" },
    { id: "Banking", label: "Banking (2)" },
    { id: "SupplyChain", label: "Supply Chain (2)" },
    { id: "PublicPolicy", label: "Public Policy (3)" },
    { id: "Healthcare", label: "Healthcare AI (4)" },
    { id: "Systems", label: "MLOps (4)" },
  ];

  const services = [
    {
      num: "01",
      title: "Data Analytics & BI",
      desc: "Transform complex operational datasets into interactive, actionable dashboards with Power BI, advanced SQL analytics, and automated decision support systems.",
    },
    {
      num: "02",
      title: "Data Engineering",
      desc: "Architect automated extraction, transformation, and loading (ETL) data pipelines with Python and relational database governance for maximum reliability.",
    },
    {
      num: "03",
      title: "Quantitative ML",
      desc: "Develop rigorous predictive models (GLM Tweedie, GARCH volatility, and QWK optimization) with strict zero-leakage validation protocols.",
    },
    {
      num: "04",
      title: "Motion Sensor AI",
      desc: "Process high-frequency kinematic sensor signals, camera calibration, and reflective marker data at MOSHEE Lab for advanced biomechanical analysis.",
    },
  ];

  const results = [
    {
      metric: "20+",
      label: "Research monographs published across 6 domains",
    },
    {
      metric: "99.9%",
      label: "Zero-leakage data split & methodology rigor",
    },
    {
      metric: "5+",
      label: "Interactive analytical web applications deployed live",
    },
    {
      metric: "100%",
      label: "Deterministic reproducibility & automated test suites",
    },
  ];

  const testimonials = [
    {
      num: "01",
      name: "Dr. Sarah Chel",
      role: "Lead Actuary & Quantitative Researcher",
      company: "TechGrowz Solutions",
      quote:
        "Izam's strategic approach, rigorous statistical formulation, and deep understanding of data science transformed our analytical workflow and predictive accuracy.",
      img: "/images/jr_client_1.jpg",
    },
    {
      num: "02",
      name: "Janine Fox",
      role: "Director of Analytics",
      company: "CloudSov Solutions",
      quote:
        "The automated ETL pipelines and dashboard architectures built by Izam provided immediate clarity to our multi-source datasets with flawless execution.",
      img: "/images/jr_client_2.jpg",
    },
    {
      num: "03",
      name: "Joe Harris",
      role: "Senior Operations Specialist",
      company: "SmileBright Dental",
      quote:
        "Exceptional precision and systematic problem-solving. Every data insight was backed by clean code, sound mathematics, and thorough empirical validation.",
      img: "/images/jr_client_3.jpg",
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] text-[#090909] font-poppins selection:bg-[#595cef] selection:text-white">

      {/* HEADER / NAVIGATION - EXACT WIX JR DIGITAL HEADER */}
      <header className="w-full bg-[#f4f4f4] sticky top-0 z-50 px-6 sm:px-12 lg:px-16 py-6 flex items-center justify-between">
        <a href="#" className="flex flex-col">
          <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#090909]">
            Izam Rosiawan
          </span>
          <span className="text-[11px] font-light text-[#6b6b6b] -mt-1 tracking-wider uppercase">
            Data Science & Analytics
          </span>
        </a>

        <nav className="flex items-center gap-6 sm:gap-10 text-[13px] font-light tracking-wide text-[#090909]">
          <a href="#about" className="hover:text-[#595cef] transition-colors">
            ABOUT
          </a>
          <a href="#services" className="hover:text-[#595cef] transition-colors">
            SERVICES
          </a>
          <a href="#portfolio" className="hover:text-[#595cef] transition-colors">
            PORTFOLIO
          </a>
          <a href="#contact" className="hover:text-[#595cef] transition-colors">
            CONTACT
          </a>
        </nav>
      </header>

      {/* 1. HERO SECTION - EXACT WIX LAYOUT: GIANT HEADLINE + CONSULTANT PHOTO */}
      <section className="w-full min-h-[90vh] flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-8 pb-16 bg-[#f4f4f4]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-4">

          {/* Left: Giant Typography + Subtitle + Pill CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h1 className="text-[52px] sm:text-[85px] lg:text-[110px] xl:text-[124px] font-semibold leading-[0.95] tracking-tight text-[#090909]">
                Izam Rosiawan
                <br />
                <span className="font-extralight text-[#595cef]">Data Science</span>
              </h1>

              <p className="text-base sm:text-xl font-extralight text-[#090909] max-w-lg leading-relaxed pt-4">
                Amplify your digital resonance with data-driven analytics and structured quantitative solutions.
              </p>
            </div>

            <div>
              <a
                href="#services"
                className="inline-flex items-center gap-4 px-8 py-4 bg-[#595cef] hover:bg-[#474ae0] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              >
                <span>Start exploring</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Full-bleed Portrait Card */}
          <div className="lg:col-span-5 relative flex justify-end">
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-sm bg-[#e0e0e0]">
              <Image
                src="/images/izam_batik_photo.jpg"
                alt="Izam Rosiawan"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. OUR SERVICES (comp-lyguuf88) - EXACT 4 VERTICAL CARDS (01, 02, 03, 04) */}
      <section id="services" className="w-full bg-[#090909] text-white px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <h2 className="text-4xl sm:text-6xl font-extralight text-white tracking-tight">
              Our Services
            </h2>
            <p className="text-sm font-light text-[#a0a0a0] max-w-sm">
              Tailored data engineering, analytics dashboards, and quantitative modeling frameworks.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.num}
                className="group flex flex-col justify-between min-h-[380px] p-8 rounded-[24px] bg-white/[0.04] hover:bg-[#595cef] border border-white/10 hover:border-transparent transition-all duration-500"
              >
                <div className="space-y-6">
                  <span className="block text-2xl font-light text-[#595cef] group-hover:text-white transition-colors">
                    {s.num}
                  </span>
                  <h3 className="text-2xl font-semibold text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm font-light text-[#a0a0a0] group-hover:text-white/90 leading-relaxed transition-colors">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 group-hover:border-white/20 flex items-center justify-between text-xs font-medium text-white">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. STRATEGIC DATA MINDSET (comp-lyh9q1fo) */}
      <section id="about" className="w-full bg-[#d6dbe2] text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Clean, High-Precision Vector Analytics & Sensor Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-[32px] overflow-hidden bg-[#090909] text-white p-7 shadow-lg flex flex-col justify-between border border-black/10">
              {/* Header Telemetry */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#595cef] animate-pulse" />
                  <span className="text-[11px] font-medium tracking-wider uppercase text-white/80">
                    Analytics & Sensor Lab
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40">MOSHEE // 2026</span>
              </div>

              {/* Center: Waveform & Vector Data Flow */}
              <div className="my-auto space-y-5 py-4">
                <div className="relative h-32 w-full bg-white/[0.03] rounded-2xl p-4 border border-white/5 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between text-[10px] text-white/40 font-mono">
                    <span>KINEMATIC ACCELEROMETRY</span>
                    <span className="text-[#595cef]">99.9% RIGOR</span>
                  </div>
                  
                  {/* SVG Waveform Curve */}
                  <svg className="w-full h-16" viewBox="0 0 300 80" fill="none">
                    <path
                      d="M0,45 Q25,10 50,40 T100,55 T150,20 T200,60 T250,25 T300,40"
                      stroke="#595cef"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M0,45 Q25,10 50,40 T100,55 T150,20 T200,60 T250,25 T300,40 L300,80 L0,80 Z"
                      fill="url(#purpleGrad)"
                      opacity="0.15"
                    />
                    <circle cx="150" cy="20" r="4" fill="#595cef" />
                    <circle cx="250" cy="25" r="4" fill="#ffffff" />
                    <defs>
                      <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#595cef" />
                        <stop offset="100%" stopColor="#595cef" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Pipeline Flow Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-white/60">ETL Pipeline</span>
                    <span className="text-white font-mono">Python/SQL</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-white/60">BI Reporting</span>
                    <span className="text-[#595cef] font-mono">Power BI</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-white/60">ML Models</span>
                    <span className="text-white font-mono">Zero-Leakage</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                    <span className="text-white/60">Motion Lab</span>
                    <span className="text-[#595cef] font-mono">Calibration</span>
                  </div>
                </div>
              </div>

              {/* Footer Stat */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                <span>Telkom University Surabaya</span>
                <span className="text-white font-semibold">Undergraduate</span>
              </div>
            </div>
          </div>

          {/* Right: Narrative + CTA */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] leading-tight tracking-tight">
              ROI Focused
              <br />
              <span className="font-semibold text-[#595cef]">Strategist</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-light text-[#333333] leading-relaxed max-w-xl">
              <p>
                <strong>Izam Rosiawan</strong> is a results-oriented Data Science student at <strong>Universitas Telkom Surabaya</strong> with proven experience across Data Analytics, Data Engineering, and Business Intelligence.
              </p>
              <p>
                Specializing in automated Python & SQL data processing pipelines, structured relational database governance, interactive Power BI analytical dashboards, and laboratory motion sensor research at MOSHEE Lab.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#090909] hover:bg-[#595cef] text-white text-sm font-semibold rounded-full transition-all duration-300 shadow-sm"
              >
                <span>See my work</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/izam-rosiawan-86089627a/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#eaeef3] text-[#090909] text-sm font-semibold rounded-full transition-all duration-300 border border-[#c5cdd6]"
              >
                <Linkedin className="w-4 h-4 text-[#595cef]" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. PROVEN RESULTS (comp-lymtx4xb) - EXACT PURPLE SECTION WITH 4 GIANT METRIC BOXES */}
      <section className="w-full bg-[#595cef] text-white px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-16">

          <div className="border-b border-white/20 pb-8">
            <h2 className="text-4xl sm:text-6xl font-extralight text-white tracking-tight">
              Proven Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-[24px] bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col justify-between min-h-[260px] hover:bg-white/15 transition-all duration-300"
              >
                <div className="text-5xl sm:text-7xl font-semibold text-white tracking-tight">
                  {r.metric}
                </div>
                <p className="text-sm sm:text-base font-light text-white/90 leading-relaxed pt-6 border-t border-white/15">
                  {r.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TESTIMONIALS (comp-lyh0cqlf) - EXACT GREY SECTION WITH SLIDER CARDS */}
      <section className="w-full bg-[#e0e0e0] text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#c5c5c5] pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] tracking-tight">
                Testimonials
              </h2>
              <p className="text-sm font-light text-[#6b6b6b] max-w-lg">
                See what collaborators and peers say about our analytical rigor and technical precision.
              </p>
            </div>

            {/* Slider Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#595cef] hover:text-white text-[#090909] shadow-sm flex items-center justify-center transition-all duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white hover:bg-[#595cef] hover:text-white text-[#090909] shadow-sm flex items-center justify-center transition-all duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => {
              const isHighlighted = idx === currentTestimonial;
              return (
                <div
                  key={t.num}
                  className={`p-8 rounded-[24px] bg-white border transition-all duration-500 flex flex-col justify-between min-h-[340px] ${
                    isHighlighted
                      ? "border-[#595cef] shadow-lg ring-2 ring-[#595cef]/20"
                      : "border-transparent shadow-sm"
                  }`}
                >
                  <div className="space-y-6">
                    <span className="text-xl font-light text-[#595cef]">{t.num}</span>
                    <p className="text-base font-light text-[#333333] leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-[#f0f0f0] mt-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#f0f0f0] flex-shrink-0">
                      <Image
                        src={t.img}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#090909]">
                        {t.name}
                      </div>
                      <div className="text-xs font-light text-[#6b6b6b]">
                        {t.role} - {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* PORTFOLIO MONOGRAPHS SECTION (FULL 20 INTERACTIVE MONOGRAPHS) */}
      <section id="portfolio" className="w-full bg-white text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#e0e0e0] pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] tracking-tight">
                Portfolio & Monographs
              </h2>
              <p className="text-sm font-light text-[#6b6b6b]">
                Complete interactive research archive across 6 specialized quantitative domains.
              </p>
            </div>
            <div className="text-xs font-medium text-[#6b6b6b]">
              Showing <strong>{filteredProjects.length}</strong> research papers
            </div>
          </div>

          {/* Filter Pills & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#595cef] text-white shadow-sm"
                        : "bg-[#f4f4f4] text-[#6b6b6b] hover:bg-[#e8e8e8]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#999999]" />
              <input
                type="text"
                placeholder="Search topic, algorithm, metric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f4f4f4] pl-11 pr-4 py-3 rounded-full text-xs font-light focus:outline-none focus:ring-2 focus:ring-[#595cef]/30 text-[#090909]"
              />
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => {
              const hasWebDemo = !!project.demoUrl;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group cursor-pointer rounded-[24px] bg-[#f4f4f4] hover:bg-[#d6dbe2] border border-[#e5e5e5] hover:border-[#595cef]/40 p-8 flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium text-[#595cef] bg-white px-3 py-1 rounded-full shadow-xs">
                        {project.domain}
                      </span>
                      <span className="text-xs font-light text-[#999999]">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg text-[#090909] group-hover:text-[#595cef] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs font-light text-[#666666] leading-relaxed line-clamp-3">
                      {project.problem}
                    </p>

                    {/* Metric Box */}
                    <div className="p-4 rounded-[16px] bg-white border border-[#e0e0e0] flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-light text-[#888888] uppercase tracking-wider">
                          {project.metrics[0].label}
                        </div>
                        <div className="font-semibold text-xl text-[#090909]">
                          {project.metrics[0].value}
                        </div>
                      </div>
                      <span className="text-[10px] font-light text-[#888888] max-w-[120px] text-right truncate">
                        {project.datasetInfo.name}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#e0e0e0] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 font-medium text-[#090909] group-hover:text-[#595cef] transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>View Monograph</span>
                    </button>
                    {hasWebDemo && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#595cef] hover:underline"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. CONTACT SECTION (comp-lylsspgl) - EXACT DARK PURPLE / BLACK FORM */}
      <section id="contact" className="w-full bg-[#090909] text-white px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Big Headline & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-extralight text-white leading-tight tracking-tight">
                Let&apos;s ignite your
                <br />
                <span className="font-semibold text-[#595cef]">digital success</span>
              </h2>
              <p className="text-base font-light text-[#a0a0a0] leading-relaxed">
                Book Your Strategy Session or Discuss Data Collaboration
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10 text-sm font-light text-[#a0a0a0]">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#595cef] flex-shrink-0 mt-0.5" />
                <span>Surabaya, Jawa Timur, Indonesia</span>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#595cef] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:izamrosiawan13@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  izamrosiawan13@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Linkedin className="w-5 h-5 text-[#595cef] flex-shrink-0 mt-0.5" />
                <a
                  href="https://www.linkedin.com/in/izam-rosiawan-86089627a/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  linkedin.com/in/izam-rosiawan-86089627a
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Github className="w-5 h-5 text-[#595cef] flex-shrink-0 mt-0.5" />
                <a
                  href="https://github.com/izamrosiawan"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  github.com/izamrosiawan
                </a>
              </div>
            </div>
          </div>

          {/* Right: Exact Form from Template */}
          <div className="lg:col-span-7 bg-white/[0.04] p-8 sm:p-12 rounded-[32px] border border-white/10">
            {formSubmitted ? (
              <div className="p-8 rounded-[24px] bg-[#595cef]/20 border border-[#595cef] text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#595cef] mx-auto" />
                <h4 className="font-semibold text-xl text-white">Inquiry Received!</h4>
                <p className="text-sm font-light text-white/80">
                  Thank you for reaching out. I will respond to your message shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-light text-[#a0a0a0]">
                      First name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-[#595cef]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-light text-[#a0a0a0]">
                      Last name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-[#595cef]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-light text-[#a0a0a0]">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-[#595cef]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-light text-[#a0a0a0]">
                    I&apos;m interested in
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-5 py-3.5 rounded-full bg-[#181818] border border-white/10 text-sm text-white focus:outline-none focus:border-[#595cef]"
                  >
                    <option value="Select">Select</option>
                    <option value="Data Analytics & BI">Data Analytics & BI</option>
                    <option value="Data Engineering & Pipelines">Data Engineering & Pipelines</option>
                    <option value="Quantitative Machine Learning">Quantitative Machine Learning</option>
                    <option value="Motion Sensor & Laboratory Research">Motion Sensor & Laboratory Research</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-light text-[#a0a0a0]">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full p-5 rounded-[24px] bg-white/[0.06] border border-white/10 text-sm text-white focus:outline-none focus:border-[#595cef]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#595cef] hover:bg-[#474ae0] text-white text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-md"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER - EXACT WIX FOOTER (comp-kbgakxmn) */}
      <footer className="w-full bg-[#090909] text-white/60 px-6 sm:px-12 lg:px-16 py-12 border-t border-white/10 text-xs font-light">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://www.linkedin.com/in/izam-rosiawan-86089627a/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/izamrosiawan"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a href="mailto:izamrosiawan13@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>

          <div>
            © 2026 by Izam Rosiawan. Built on Next.js & Tailwind CSS.
          </div>
        </div>
      </footer>

      {/* MODAL VIEW */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-[28px] shadow-2xl border border-[#e0e0e0]">
            <div className="p-8 flex items-start justify-between gap-6 sticky top-0 bg-white z-10 border-b border-[#e0e0e0]">
              <div>
                <div className="font-medium text-xs text-[#595cef] tracking-wider uppercase mb-1">
                  {activeProject.domain} - {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-semibold text-2xl text-[#090909] leading-tight">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 hover:bg-[#f0f0f0] rounded-full transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#666666]" />
              </button>
            </div>

            <div className="p-8 space-y-8 text-sm font-light text-[#333333]">
              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-2">
                  01 / PROBLEM STATEMENT
                </div>
                <p className="leading-relaxed text-[#090909]">{activeProject.problem}</p>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-2">
                  02 / METHODOLOGY
                </div>
                <p className="leading-relaxed text-[#090909]">{activeProject.methodology}</p>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-2">
                  03 / FORMULA ({activeProject.formula.title})
                </div>
                <div className="p-4 font-mono text-xs overflow-x-auto bg-[#f4f4f4] border border-[#e0e0e0] text-[#090909] rounded-[16px]">
                  {activeProject.formula.latex}
                </div>
                <p className="text-xs mt-2 text-[#777777]">{activeProject.formula.explanation}</p>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-3">
                  04 / EVALUATION METRICS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, i) => (
                    <div key={i} className="p-4 bg-[#f4f4f4] border border-[#e0e0e0] rounded-[16px]">
                      <div className="font-medium text-[10px] text-[#777777] uppercase tracking-wider">
                        {m.label}
                      </div>
                      <div className="font-semibold text-2xl text-[#595cef] mt-1">
                        {m.value}
                      </div>
                      <div className="text-xs mt-1 text-[#888888]">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-3">
                  05 / KEY FINDINGS
                </div>
                <ul className="space-y-2">
                  {activeProject.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#090909]">
                      <span className="text-[#595cef] font-bold flex-shrink-0">•</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider">
                    06 / CODE SNIPPET
                  </div>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="font-medium text-xs text-[#595cef] hover:underline"
                  >
                    {copiedCode ? "[COPIED]" : "[COPY CODE]"}
                  </button>
                </div>
                <pre className="p-4 text-xs overflow-x-auto leading-relaxed font-mono bg-[#090909] text-white rounded-[16px]">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white border-t border-[#e0e0e0]">
              <span className="text-xs text-[#777777]">
                Dataset: {activeProject.datasetInfo.name} ({activeProject.datasetInfo.size})
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#595cef] hover:bg-[#474ae0] text-white font-medium text-xs rounded-full transition-all"
                  >
                    OPEN DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#090909] font-medium text-xs rounded-full border border-[#e0e0e0] transition-all"
                >
                  GITHUB REPO <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
