"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  ExternalLink,
  BookOpen,
  Search,
  CheckCircle2,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  Layers,
  Database,
  BarChart3,
  Cpu,
  GraduationCap,
  Award,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "Data Analytics & BI",
    message: "",
  });

  const categories = [
    { id: "All", label: "All (20)" },
    { id: "Insurance", label: "Actuarial (5)" },
    { id: "Banking", label: "Banking & Risk (2)" },
    { id: "SupplyChain", label: "Supply Chain (2)" },
    { id: "PublicPolicy", label: "Public Policy (3)" },
    { id: "Healthcare", label: "Healthcare AI (4)" },
    { id: "Systems", label: "MLOps & Systems (4)" },
  ];

  const competencies = [
    {
      num: "01",
      icon: BarChart3,
      title: "Data Analytics & BI",
      description:
        "Developing interactive business dashboards with Power BI, advanced exploratory analytics, and statistical decision support frameworks.",
    },
    {
      num: "02",
      icon: Database,
      title: "Data Engineering & Pipelines",
      description:
        "Building automated ETL pipelines using Python and SQL, structured relational database architecture, and data standardization workflows.",
    },
    {
      num: "03",
      icon: Cpu,
      title: "Machine Learning & Quantitative Modeling",
      description:
        "Tweedie GLM pricing, GARCH volatility modeling, and zero-leakage predictive pipelines with automated Pytest verification.",
    },
    {
      num: "04",
      icon: Layers,
      title: "Gait & Sensor Motion Analysis",
      description:
        "Multi-camera calibration, reflective marker tracking, and kinematic motion capture sensor pre-processing at MOSHEE Lab.",
    },
  ];

  const experiences = [
    {
      role: "Member of Data Engineer",
      org: "UKM CODER IT Telkom Surabaya",
      period: "Okt 2024 - Sekarang",
      points: [
        "Developing automated Python and SQL extraction, transformation, and cleaning scripts for internal databases.",
        "Engineering structured data processing pipelines to boost relational database governance efficiency.",
        "Active member of the LUMINA (Luminous Insights & Narratives Arena) technical committee.",
      ],
    },
    {
      role: "Motion Laboratory Assistant",
      org: "MOSHEE Lab (Gait & Motion)",
      period: "Juli 2025 - Sekarang",
      points: [
        "Technical support for human gait motion analysis research, multi-camera calibration, and reflective marker placement.",
        "Managing laboratory hardware readiness and experimental testing facilities for faculty and student research.",
        "Pre-processing kinematic motion capture sensor data streams for academic publications.",
      ],
    },
    {
      role: "Web Developer & Project Team Member",
      org: "Pengabdian Masyarakat Telkom University",
      period: "Feb 2025 - Jun 2025",
      points: [
        "Developed and deployed official school web portal for SDN Wonokromo III Surabaya using WordPress CMS.",
        "Configured school domain (sch.id), server hosting, and functional verification via Black Box Testing.",
        "Conducted hands-on training workshops and authoring comprehensive website administration guidebooks.",
      ],
    },
  ];

  const certifications = [
    "Pandas Bootcamp: Data Analysis with Pandas Python3 (2025)",
    "Master the Basics of Azure: Data Fundamentals (Microsoft Azure)",
    "Microsoft Power BI for Beginners & Excel Users",
    "Big Data 101 (Cognitive Class / IBM)",
    "Belajar Machine Learning untuk Pemula (Dicoding Indonesia)",
  ];

  const results = [
    {
      value: "20+",
      label: "Research Monographs",
      desc: "Quantitative papers spanning Actuarial, Risk, and Machine Learning",
    },
    {
      value: "99.9%",
      label: "Zero-Leakage Guarantee",
      desc: "Strict train-test split isolation before any scaling or preprocessing",
    },
    {
      value: "5+",
      label: "Live Web Prototypes",
      desc: "Interactive analytical web applications deployed live on GitHub",
    },
    {
      value: "100%",
      label: "Automated Testing",
      desc: "Deterministic random seeds and automated Pytest test suites",
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

  return (
    <div className="min-h-screen bg-[#f7f6f4] text-[#162d3d] antialiased selection:bg-[#116dff] selection:text-white font-sans">

      {/* NAVBAR */}
      <header className="w-full bg-[#f7f6f4]/95 backdrop-blur-md px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between sticky top-0 z-50 border-b border-[#dfe5eb]">
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col">
            <span className="font-display text-xl font-extrabold tracking-tight text-[#162d3d]">
              IZAM ROSIAWAN
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-[#116dff] uppercase">
              Data Science & Analytics
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#52606d]">
          <a href="#about" className="hover:text-[#116dff] transition-colors">
            ABOUT
          </a>
          <a href="#competencies" className="hover:text-[#116dff] transition-colors">
            COMPETENCIES
          </a>
          <a href="#experience" className="hover:text-[#116dff] transition-colors">
            EXPERIENCE
          </a>
          <a href="#portfolio" className="hover:text-[#116dff] transition-colors">
            MONOGRAPHS
          </a>
          <a href="#contact" className="hover:text-[#116dff] transition-colors">
            CONTACT
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/izamrosiawan"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#162d3d] hover:bg-[#116dff] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-sm"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GITHUB (20)</span>
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full px-6 sm:px-12 lg:px-20 pt-16 pb-20 lg:py-24 border-b border-[#dfe5eb] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Typography & Action */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ecf3ff] border border-[#d8e2ec] text-[#116dff] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#116dff] animate-pulse" />
              Telkom University Surabaya - Data Science
            </div>

            <div className="space-y-3">
              <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl leading-[1.02] tracking-tight text-[#162d3d]">
                Izam Rosiawan
              </h1>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#116dff] tracking-normal">
                Data Analytics & Business Intelligence
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#52606d] leading-relaxed max-w-xl font-normal">
              Undergraduate Data Science student focused on automated Python/SQL
              data pipelines, interactive Power BI business analytics, and
              zero-leakage quantitative machine learning modeling.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#116dff] hover:bg-[#0052cc] text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <span>EXPLORE MONOGRAPHS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-[#f0f1f5] text-[#162d3d] border border-[#dfe5eb] text-sm font-bold uppercase tracking-wider rounded-full transition-all"
              >
                <span>VIEW EXPERIENCE</span>
              </a>
            </div>
          </div>

          {/* Right Column: Real Photo with Studio Grey BG */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#ecf3ff]">
              <Image
                src="/images/izam_photo_grey_color.jpg"
                alt="Izam Rosiawan - Data Science Student"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#162d3d]/50 via-transparent to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#718096]">
                    SURABAYA, JAWA TIMUR
                  </div>
                  <div className="font-display font-bold text-base text-[#162d3d]">
                    Telkom University
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#116dff] text-white text-[11px] font-bold rounded-full">
                  DATA SCIENCE
                </span>
              </div>
            </div>

            {/* Background Graphic Lines */}
            <div className="absolute -z-10 -right-8 -bottom-8 w-48 h-48 opacity-40 hidden sm:block">
              <Image
                src="/images/jr_dots_lines.jpg"
                alt="Data visualization pattern"
                fill
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* CORE COMPETENCIES SECTION */}
      <section id="competencies" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-white border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#dfe5eb] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
                SKILLS & TECHNICAL COMPETENCIES
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight">
                Core Domains
              </h2>
            </div>
            <p className="text-sm text-[#718096] max-w-md">
              Systematic technical skills spanning exploratory data analysis,
              pipeline automation, and laboratory motion capture research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {competencies.map((srv) => {
              const Icon = srv.icon;
              return (
                <div
                  key={srv.num}
                  className="group relative p-8 rounded-2xl bg-[#f7f6f4] hover:bg-[#ecf3ff] border border-[#dfe5eb] hover:border-[#116dff]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-3xl text-[#116dff]/30 group-hover:text-[#116dff] transition-colors">
                        {srv.num}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#162d3d] group-hover:text-[#116dff] group-hover:scale-110 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-lg text-[#162d3d] leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-[#52606d] leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#dfe5eb]/60 flex items-center gap-1.5 text-xs font-bold text-[#116dff] group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE SKILLSET</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ABOUT & EDUCATION SECTION */}
      <section id="about" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-[#f7f6f4] border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Graphic Art & Education Box */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-xl border-4 border-white">
              <Image
                src="/images/jr_dots_lines.jpg"
                alt="Graph visual"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#162d3d]/20" />
              <div className="absolute bottom-4 left-4 right-4 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg space-y-1.5">
                <div className="flex items-center gap-2 text-[#116dff] font-bold text-xs">
                  <GraduationCap className="w-4 h-4" />
                  <span>ACADEMIC BACKGROUND</span>
                </div>
                <div className="font-display font-bold text-sm text-[#162d3d]">
                  S1 Sains Data - Telkom University Surabaya
                </div>
                <p className="text-[11px] text-[#718096]">
                  Agustus 2024 - Sekarang | Fokus Data Analytics & Engineering
                </p>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#dfe5eb] shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#116dff]">
                <Award className="w-4 h-4" />
                <span>CERTIFICATIONS & TRAINING</span>
              </div>
              <ul className="space-y-2 text-xs text-[#52606d]">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#116dff] mt-0.5 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Professional Summary */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
                PROFESSIONAL SUMMARY
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight leading-tight">
                Systematic & Analytical Data Practitioner
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#52606d] leading-relaxed font-normal">
              <p>
                Undergraduate Data Science student at <strong>Universitas Telkom Surabaya</strong> with
                a primary focus on <strong>Data Analytics</strong>, <strong>Data Engineering</strong>,
                and <strong>Business Intelligence</strong>.
              </p>
              <p>
                Experienced in designing automated data processing scripts with Python and SQL,
                managing structured relational databases, constructing interactive Power BI analytical
                dashboards, and conducting web system testing. Accustomed to systematic, analytical thinking
                to deliver accurate data insights that drive operational decisions.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="font-display font-black text-2xl text-[#116dff]">Python & SQL</div>
                <div className="text-xs font-semibold text-[#718096] uppercase tracking-wider mt-1">
                  Core Stack
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="font-display font-black text-2xl text-[#162d3d]">Power BI</div>
                <div className="text-xs font-semibold text-[#718096] uppercase tracking-wider mt-1">
                  BI & Analytics
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="font-display font-black text-2xl text-[#116dff]">Azure</div>
                <div className="text-xs font-semibold text-[#718096] uppercase tracking-wider mt-1">
                  Data Fundamentals
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#162d3d] hover:bg-[#116dff] text-white text-sm font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
              >
                <span>EXPLORE MONOGRAPHS</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/izam-rosiawan"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white hover:bg-[#dfe5eb] text-[#162d3d] border border-[#dfe5eb] text-sm font-bold uppercase tracking-wider rounded-full transition-all"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span>LINKEDIN PROFILE</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* EXPERIENCE & ORGANIZATIONAL BACKGROUND */}
      <section id="experience" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-white border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#dfe5eb] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
                WORK & ORGANIZATIONAL EXPERIENCE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight">
                Track Record
              </h2>
            </div>
            <p className="text-sm text-[#718096] max-w-md">
              Hands-on contributions in data engineering, laboratory motion capture research, and web system deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#f7f6f4] border border-[#dfe5eb] hover:border-[#116dff] hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#116dff] uppercase tracking-wider bg-[#ecf3ff] px-3 py-1 rounded-full">
                      {exp.period}
                    </span>
                    <span className="font-display font-black text-xl text-[#a0aec0]">
                      #{idx + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#162d3d] leading-snug">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-semibold text-[#718096] mt-0.5">
                      {exp.org}
                    </div>
                  </div>
                  <ul className="space-y-2.5 pt-2 text-xs text-[#52606d] leading-relaxed">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <span className="text-[#116dff] font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROVEN RESULTS / METRICS SECTION */}
      <section id="results" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-[#f7f6f4] border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto space-y-16">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
              EMPIRICAL VALIDATION
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight">
              Proven Results
            </h2>
            <p className="text-sm text-[#718096]">
              Quantifiable performance milestones and validation metrics across the research portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white border border-[#dfe5eb] hover:border-[#116dff] hover:shadow-lg transition-all duration-300 text-center space-y-3"
              >
                <div className="font-display font-black text-4xl sm:text-5xl text-[#116dff] tracking-tight">
                  {res.value}
                </div>
                <div className="font-display font-bold text-base text-[#162d3d]">
                  {res.label}
                </div>
                <p className="text-xs text-[#718096] leading-relaxed">
                  {res.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PORTFOLIO / RESEARCH ARCHIVE SECTION */}
      <section id="portfolio" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-white border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#dfe5eb] pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
                RESEARCH ARCHIVE & MONOGRAPHS (2024 - 2026)
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight">
                Featured Monographs
              </h2>
            </div>
            <div className="text-sm text-[#718096]">
              Showing <strong>{filteredProjects.length}</strong> research papers
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive
                        ? "bg-[#116dff] text-white shadow-sm"
                        : "bg-[#f7f6f4] text-[#52606d] hover:bg-[#dfe5eb] border border-[#dfe5eb]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#718096]" />
              <input
                type="text"
                placeholder="Search topic, formula, algorithm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f7f6f4] pl-10 pr-4 py-2.5 rounded-full border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 text-[#162d3d]"
              />
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const hasWebDemo = !!project.demoUrl;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group cursor-pointer rounded-2xl bg-[#f7f6f4] border border-[#dfe5eb] hover:border-[#116dff] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#116dff] bg-[#ecf3ff] px-2.5 py-1 rounded-full">
                        {project.domain}
                      </span>
                      <span className="text-xs font-bold text-[#a0aec0]">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#162d3d] group-hover:text-[#116dff] transition-colors leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs text-[#52606d] leading-relaxed line-clamp-3">
                      {project.problem}
                    </p>

                    {/* Metric Highlight Box */}
                    <div className="p-3.5 rounded-xl bg-white border border-[#dfe5eb]/70 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-[#718096] tracking-wider">
                          {project.metrics[0].label}
                        </div>
                        <div className="font-display font-black text-xl text-[#162d3d]">
                          {project.metrics[0].value}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#718096] max-w-[120px] text-right truncate font-medium">
                        {project.datasetInfo.name}
                      </span>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.techStack.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white border border-[#dfe5eb] text-[10px] font-bold text-[#52606d]"
                        >
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-white border border-[#dfe5eb] text-[10px] font-bold text-[#718096]">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="px-7 py-4 bg-white border-t border-[#dfe5eb] flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#162d3d] group-hover:text-[#116dff] transition-colors uppercase tracking-wider"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>VIEW MONOGRAPH</span>
                    </button>
                    {hasWebDemo && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#116dff] hover:underline uppercase tracking-wider"
                      >
                        <span>DEMO</span>
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

      {/* CONTACT & CONSULTATION FORM SECTION */}
      <section id="contact" className="w-full px-6 sm:px-12 lg:px-20 py-20 lg:py-28 bg-[#f7f6f4] border-b border-[#dfe5eb]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#116dff]">
                GET IN TOUCH
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-[#162d3d] tracking-tight leading-tight">
                Let&apos;s discuss data collaboration
              </h2>
              <p className="text-sm text-[#52606d] leading-relaxed">
                Connect for data analytics projects, automated data engineering pipelines, or academic research collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="w-10 h-10 rounded-full bg-[#ecf3ff] flex items-center justify-center text-[#116dff]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#718096] uppercase tracking-wider">
                    LOCATION
                  </div>
                  <div className="text-sm font-bold text-[#162d3d]">
                    Surabaya, Jawa Timur, Indonesia
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="w-10 h-10 rounded-full bg-[#ecf3ff] flex items-center justify-center text-[#116dff]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#718096] uppercase tracking-wider">
                    EMAIL
                  </div>
                  <a
                    href="mailto:izamrosiawan13@gmail.com"
                    className="text-sm font-bold text-[#116dff] hover:underline"
                  >
                    izamrosiawan13@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="w-10 h-10 rounded-full bg-[#ecf3ff] flex items-center justify-center text-[#116dff]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#718096] uppercase tracking-wider">
                    LINKEDIN
                  </div>
                  <a
                    href="https://linkedin.com/in/izam-rosiawan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#116dff] hover:underline"
                  >
                    linkedin.com/in/izam-rosiawan
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#dfe5eb]">
                <div className="w-10 h-10 rounded-full bg-[#ecf3ff] flex items-center justify-center text-[#116dff]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#718096] uppercase tracking-wider">
                    GITHUB
                  </div>
                  <a
                    href="https://github.com/izamrosiawan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#116dff] hover:underline"
                  >
                    github.com/izamrosiawan
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Submission Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#dfe5eb] shadow-xl">
            <h3 className="font-display font-bold text-2xl text-[#162d3d] mb-2">
              Send a Message or Project Inquiry
            </h3>
            <p className="text-xs text-[#718096] mb-8">
              Fill in your contact details and message below to initiate a discussion.
            </p>

            {formSubmitted ? (
              <div className="p-6 rounded-2xl bg-[#ecf3ff] border border-[#116dff]/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#116dff] mx-auto" />
                <h4 className="font-display font-bold text-lg text-[#162d3d]">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-[#52606d]">
                  Thank you for reaching out. I will respond to your inquiry via email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#52606d]">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 bg-[#f7f6f4]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#52606d]">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 bg-[#f7f6f4]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#52606d]">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 bg-[#f7f6f4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#52606d]">
                    Area of Interest *
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) =>
                      setFormData({ ...formData, interest: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 bg-[#f7f6f4]"
                  >
                    <option>Data Analytics & Business Intelligence</option>
                    <option>Data Engineering & ETL Pipelines</option>
                    <option>Machine Learning & Quantitative Modeling</option>
                    <option>Motion Capture & Sensor Analysis</option>
                    <option>Web Development & Digitalization</option>
                    <option>Academic Research Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#52606d]">
                    Message / Project Brief *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your analytics requirements or collaboration objectives..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#dfe5eb] text-xs font-medium focus:outline-none focus:border-[#116dff] focus:ring-2 focus:ring-[#116dff]/20 bg-[#f7f6f4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#116dff] hover:bg-[#0052cc] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND INQUIRY</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#162d3d] text-white px-6 sm:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-white/10 pb-12">
            <div className="space-y-2">
              <span className="font-display text-2xl font-extrabold text-white">
                IZAM ROSIAWAN
              </span>
              <p className="text-xs text-white/60">
                Data Science Student - Telkom University Surabaya | Data Analytics & Business Intelligence.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-wider text-white/70">
              <a href="#about" className="hover:text-white transition-colors">
                ABOUT
              </a>
              <a href="#competencies" className="hover:text-white transition-colors">
                COMPETENCIES
              </a>
              <a href="#experience" className="hover:text-white transition-colors">
                EXPERIENCE
              </a>
              <a href="#portfolio" className="hover:text-white transition-colors">
                MONOGRAPHS
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                CONTACT
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/50">
            <div>
              © 2026 Izam Rosiawan. Surabaya, Jawa Timur. Built with Next.js & Tailwind CSS.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/izamrosiawan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/izam-rosiawan"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:izamrosiawan13@gmail.com"
                className="hover:text-white transition-colors"
              >
                Email
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL VIEW */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-[#dfe5eb]">
            <div className="p-8 flex items-start justify-between gap-6 sticky top-0 bg-white z-10 border-b border-[#dfe5eb]">
              <div>
                <div className="font-display font-bold uppercase mb-1 text-[11px] text-[#116dff] tracking-wider">
                  {activeProject.domain} - {activeProject.datasetInfo.name}
                </div>
                <h2 className="font-display font-extrabold text-2xl text-[#162d3d] leading-tight">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 hover:bg-[#f4f4f5] rounded-full transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#52606d]" />
              </button>
            </div>

            <div className="p-8 space-y-8 text-sm">
              <div>
                <div className="font-display font-bold uppercase mb-2 text-xs text-[#718096] tracking-wider">
                  01 / PROBLEM STATEMENT
                </div>
                <p className="leading-relaxed text-[#162d3d]">
                  {activeProject.problem}
                </p>
              </div>

              <div>
                <div className="font-display font-bold uppercase mb-2 text-xs text-[#718096] tracking-wider">
                  02 / METHODOLOGY
                </div>
                <p className="leading-relaxed text-[#162d3d]">
                  {activeProject.methodology}
                </p>
              </div>

              <div>
                <div className="font-display font-bold uppercase mb-2 text-xs text-[#718096] tracking-wider">
                  03 / FORMULA ({activeProject.formula.title})
                </div>
                <div className="p-4 font-mono text-xs overflow-x-auto bg-[#f7f6f4] border border-[#dfe5eb] text-[#162d3d] rounded-xl">
                  {activeProject.formula.latex}
                </div>
                <p className="text-xs mt-2 text-[#718096]">
                  {activeProject.formula.explanation}
                </p>
              </div>

              <div>
                <div className="font-display font-bold uppercase mb-3 text-xs text-[#718096] tracking-wider">
                  04 / EVALUATION METRICS
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeProject.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#f7f6f4] border border-[#dfe5eb] rounded-xl"
                    >
                      <div className="font-display font-bold uppercase text-[10px] text-[#718096] tracking-wider">
                        {m.label}
                      </div>
                      <div className="font-display font-black text-2xl text-[#116dff] mt-1">
                        {m.value}
                      </div>
                      <div className="text-xs mt-1 text-[#718096]">{m.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-display font-bold uppercase mb-3 text-xs text-[#718096] tracking-wider">
                  05 / KEY FINDINGS
                </div>
                <ul className="space-y-2">
                  {activeProject.findings.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#162d3d]">
                      <span className="font-bold text-[#116dff] flex-shrink-0">-</span>
                      <span className="leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display font-bold uppercase text-xs text-[#718096] tracking-wider">
                    06 / CODE SNIPPET
                  </div>
                  <button
                    onClick={() => handleCopyCode(activeProject.codeSnippet)}
                    className="font-display font-bold uppercase text-[10px] text-[#116dff] hover:underline tracking-wider"
                  >
                    {copiedCode ? "[COPIED]" : "[COPY CODE]"}
                  </button>
                </div>
                <pre className="p-4 text-xs overflow-x-auto leading-relaxed font-mono bg-[#162d3d] text-white rounded-xl">
                  <code>{activeProject.codeSnippet}</code>
                </pre>
              </div>
            </div>

            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white border-t border-[#dfe5eb]">
              <span className="text-xs text-[#718096]">
                Dataset: {activeProject.datasetInfo.name} ({activeProject.datasetInfo.size})
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#116dff] hover:bg-[#0052cc] text-white font-bold uppercase text-xs rounded-full transition-all"
                  >
                    OPEN WEB DEMO <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#f7f6f4] hover:bg-[#dfe5eb] text-[#162d3d] font-bold uppercase text-xs rounded-full border border-[#dfe5eb] transition-all"
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
