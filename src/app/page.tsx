"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import katex from "katex";
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

function renderLatex(latex: string) {
  try {
    return {
      __html: katex.renderToString(latex, {
        displayMode: true,
        throwOnError: false,
      }),
    };
  } catch {
    return { __html: latex };
  }
}

export default function HomePage() {
  const [portfolioView, setPortfolioView] = useState<"flagship" | "all">("flagship");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLabTab, setActiveLabTab] = useState<"engineering" | "bi" | "kinematics">("engineering");
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [activeService, setActiveService] = useState<{
    num: string;
    title: string;
    tagline: string;
    desc: string;
    capabilities: string[];
    techStack: string[];
    categoryFilter?: string;
  } | null>(null);
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
      tagline: "Executive Visual Intelligence & Business Decisions",
      desc: "Transform complex operational datasets into interactive, actionable dashboards with Power BI, advanced SQL analytics, and automated decision support systems.",
      capabilities: [
        "Interactive Power BI Dashboard Engineering & KPI Tracking",
        "Complex SQL Query Optimization, Aggregations & Window Functions",
        "Exploratory Data Analysis (EDA) & Skewness/Variance Diagnostics",
        "Business Metric Decomposition & Actionable Executive Reporting"
      ],
      techStack: ["Microsoft Power BI", "Microsoft Excel", "PostgreSQL", "Pandas", "Python"],
      categoryFilter: "All"
    },
    {
      num: "02",
      title: "Data Engineering",
      tagline: "Resilient ETL Pipelines & Database Governance",
      desc: "Architect automated extraction, transformation, and loading (ETL) data pipelines with Python and relational database governance for maximum reliability.",
      capabilities: [
        "Automated Python ETL & Multi-source Data Ingestion Scripts",
        "Relational Schema Design & 3NF Database Normalization",
        "Data Validation, Cleansing, and Missingness Auditing (MCAR/MAR)",
        "API Integration & Task Automation for Operational Workflows"
      ],
      techStack: ["Python", "SQL", "PostgreSQL", "MySQL", "DuckDB", "REST APIs"],
      categoryFilter: "Systems"
    },
    {
      num: "03",
      title: "Quantitative ML",
      tagline: "Zero-Leakage Statistical Learning & Actuarial Models",
      desc: "Develop rigorous predictive models (GLM Tweedie, GARCH volatility, and QWK optimization) with strict zero-leakage validation protocols.",
      capabilities: [
        "Strict Train-Only Fitting & Anti-Leakage Feature Preprocessing",
        "Compound Poisson-Gamma Tweedie Modeling for Pure Premium Pricing",
        "Time-Series Walk-Forward Expanding Window Cross-Validation",
        "Multi-Metric Evaluation (AUC-ROC, RMSE, Cohen's Kappa, Gini)"
      ],
      techStack: ["Scikit-learn", "LightGBM", "XGBoost", "Statsmodels", "NumPy", "SciPy"],
      categoryFilter: "Insurance"
    },
    {
      num: "04",
      title: "Motion Sensor AI",
      tagline: "Kinematic Biomechanics & Laboratory Instrumentation",
      desc: "Process high-frequency kinematic sensor signals, camera calibration, and reflective marker data at MOSHEE Lab for advanced biomechanical analysis.",
      capabilities: [
        "Multi-Camera Optical Space Calibration & Coordinate Transformation",
        "Reflective Marker Kinematic Tracking & Noise Filtering",
        "High-frequency Accelerometer & Gyroscope Signal Processing",
        "Gait Cycle Phase Segmentation & Biomechanical Anomaly Detection"
      ],
      techStack: ["MOSHEE Lab Systems", "Biomechanical Signal Processing", "Python", "NumPy", "OpenCV"],
      categoryFilter: "Healthcare"
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

  const flagshipProjects = useMemo(() => {
    const flagshipIds = [
      "indonesian-banks-risk-analytics",
      "olist-brazilian-ecommerce-analytics",
      "asean-economic-recovery",
      "spotify-tracks-analysis",
    ];
    return DETAILED_PROJECTS.filter((p) => flagshipIds.includes(p.id));
  }, []);

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

          {/* Left: Clean Typography + Subtitle + Pill CTA */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-10">
            <div className="space-y-6">
              <h1 className="text-[46px] sm:text-[72px] lg:text-[92px] xl:text-[104px] font-semibold leading-[0.98] tracking-tight text-[#090909]">
                Izam Rosiawan
                <br />
                <span className="font-extralight text-[#595cef]">Data &amp; Systems</span>
              </h1>

              <p className="text-base sm:text-lg font-light text-[#444444] max-w-lg leading-relaxed pt-2">
                Specializing in quantitative risk modeling, automated ETL data engineering, and interactive analytics dashboards.
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
              Core Competencies
            </h2>
            <p className="text-sm font-light text-[#a0a0a0] max-w-sm">
              Modular data engineering, interactive analytics dashboards, and quantitative statistical modeling.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s) => (
              <div
                key={s.num}
                onClick={() => setActiveService(s)}
                className="group cursor-pointer flex flex-col justify-between min-h-[380px] p-8 rounded-[24px] bg-white/[0.04] hover:bg-[#595cef] border border-white/10 hover:border-transparent transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
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
                  <button
                    type="button"
                    className="font-medium text-white group-hover:underline"
                  >
                    Learn more
                  </button>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. STRATEGIC DATA MINDSET (comp-lyh9q1fo) */}
      <section id="about" className="w-full bg-[#d6dbe2] text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: High-End Interactive Scientific & Engineering Bento Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[460px] rounded-[32px] bg-white text-[#090909] p-7 shadow-xl border border-white/80 flex flex-col justify-between space-y-6">
              
              {/* Top Header & Campus Context */}
              <div className="flex items-center justify-between border-b border-[#ececec] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#595cef]" />
                  <span className="text-xs font-semibold text-[#090909]">
                    Telkom University Surabaya
                  </span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#f0f2f5] text-[#555555]">
                  S1 Sains Data
                </span>
              </div>

              {/* Interactive Module Tabs */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#f4f4f6] rounded-2xl">
                <button
                  type="button"
                  onClick={() => setActiveLabTab("engineering")}
                  className={`py-2 text-[11px] font-medium rounded-xl transition-all ${
                    activeLabTab === "engineering"
                      ? "bg-white text-[#090909] shadow-sm font-semibold"
                      : "text-[#777777] hover:text-[#090909]"
                  }`}
                >
                  Data Pipelines
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLabTab("bi")}
                  className={`py-2 text-[11px] font-medium rounded-xl transition-all ${
                    activeLabTab === "bi"
                      ? "bg-white text-[#090909] shadow-sm font-semibold"
                      : "text-[#777777] hover:text-[#090909]"
                  }`}
                >
                  BI & KPIs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLabTab("kinematics")}
                  className={`py-2 text-[11px] font-medium rounded-xl transition-all ${
                    activeLabTab === "kinematics"
                      ? "bg-white text-[#090909] shadow-sm font-semibold"
                      : "text-[#777777] hover:text-[#090909]"
                  }`}
                >
                  MOSHEE Lab
                </button>
              </div>

              {/* Dynamic Interactive Workbench Canvas */}
              <div className="space-y-4">
                {activeLabTab === "engineering" && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#ebebeb] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#090909]">UKM CODER IT Pipeline</span>
                        <span className="text-[10px] font-mono text-[#595cef] bg-[#595cef]/10 px-2 py-0.5 rounded-full font-medium">PostgreSQL 3NF</span>
                      </div>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Automated Python & SQL ingestion pipelines transforming raw member records into validated relational data structures with zero loss.
                      </p>
                      <div className="pt-2 flex items-center justify-between text-[11px] font-medium text-[#444444] border-t border-[#e8e8e8]">
                        <span>• Data Cleaning & Validation</span>
                        <span>• 100% Zero-Loss</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Stack</div>
                        <div className="font-semibold text-[#090909] mt-0.5">Python & SQL</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Governance</div>
                        <div className="font-semibold text-[#595cef] mt-0.5">ACID Integrity</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeLabTab === "bi" && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#ebebeb] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#090909]">Executive Analytics</span>
                        <span className="text-[10px] font-mono text-[#595cef] bg-[#595cef]/10 px-2 py-0.5 rounded-full font-medium">Power BI & Excel</span>
                      </div>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Interactive multi-dimensional dashboards with DAX measures, automated weekly refresh, and cross-filter data exploration.
                      </p>
                      {/* Mini Metric Bars */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-[10px] text-[#777777]">
                          <span>Reporting Efficiency</span>
                          <span className="font-semibold text-[#090909]">+85%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                          <div className="w-[85%] h-full bg-[#595cef] rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Modeling</div>
                        <div className="font-semibold text-[#090909] mt-0.5">Star Schema</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Delivery</div>
                        <div className="font-semibold text-[#595cef] mt-0.5">Live Reports</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeLabTab === "kinematics" && (
                  <div className="space-y-3.5 animate-fadeIn">
                    <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#ebebeb] space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[#090909]">MOSHEE Biomechanics</span>
                        <span className="text-[10px] font-mono text-[#595cef] bg-[#595cef]/10 px-2 py-0.5 rounded-full font-medium">Motion Lab</span>
                      </div>
                      <p className="text-xs text-[#666666] leading-relaxed">
                        Multi-camera optical calibration and reflective marker 3D coordinate tracking for human gait trajectory analysis.
                      </p>
                      {/* Real Smooth Kinematic Curve */}
                      <div className="pt-2">
                        <svg className="w-full h-12" viewBox="0 0 280 60" fill="none">
                          <path
                            d="M0,35 Q35,5 70,30 T140,45 T210,15 T280,35"
                            stroke="#595cef"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                          />
                          <circle cx="70" cy="30" r="3.5" fill="#595cef" />
                          <circle cx="210" cy="15" r="3.5" fill="#090909" />
                        </svg>
                        <div className="flex justify-between text-[9px] text-[#888888] font-mono mt-0.5">
                          <span>Heel Strike</span>
                          <span>Mid Stance</span>
                          <span>Toe Off</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Sensors</div>
                        <div className="font-semibold text-[#090909] mt-0.5">Optical 3D</div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#f4f4f6] border border-[#e8e8e8]">
                        <div className="text-[#888888] text-[10px]">Precision</div>
                        <div className="font-semibold text-[#595cef] mt-0.5">Sub-millimeter</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Verified Credentials Strip */}
              <div className="pt-4 border-t border-[#ececec] space-y-2">
                <div className="text-[10px] uppercase font-semibold text-[#888888] tracking-wider">
                  Verified Certifications
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#f0f2f5] text-[#333333] rounded-lg">
                    Azure Data
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#f0f2f5] text-[#333333] rounded-lg">
                    Pandas Python3
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#f0f2f5] text-[#333333] rounded-lg">
                    Power BI
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#f0f2f5] text-[#333333] rounded-lg">
                    IBM Big Data
                  </span>
                  <span className="text-[10px] font-medium px-2.5 py-1 bg-[#f0f2f5] text-[#333333] rounded-lg">
                    Dicoding ML
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Narrative + CTA */}
          <div className="lg:col-span-7 space-y-8 lg:pl-6">
            <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] leading-tight tracking-tight">
              Scientific Rigor &amp;
              <br />
              <span className="font-semibold text-[#595cef]">Data Engineering</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-light text-[#333333] leading-relaxed max-w-xl">
              <p>
                <strong>Izam Rosiawan</strong> is a Data Science student at <strong>Universitas Telkom Surabaya</strong> focusing on Data Analytics, Data Engineering, and Quantitative Modeling.
              </p>
              <p>
                Dedicated to building automated Python &amp; SQL data pipelines, structured relational database governance, interactive analytical dashboards, and laboratory biomechanical sensor research at MOSHEE Lab.
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

      {/* 4. PROVEN RESULTS - REFINED MONOCHROME-FIRST RESEARCH METRICS */}
      <section className="w-full bg-[#090909] text-white px-6 sm:px-12 lg:px-16 py-24 lg:py-32 border-y border-white/10">
        <div className="w-full space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-extralight text-white tracking-tight">
                Empirical Research Milestones
              </h2>
            </div>
            <p className="text-xs font-light text-[#888888] max-w-sm">
              Standardized reproducibility metrics across actuarial modeling, econometric forecasts, and automated ETL pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((r, i) => (
              <div
                key={i}
                className="p-8 rounded-[28px] bg-white/[0.03] border border-white/10 flex flex-col justify-between min-h-[260px] hover:border-[#595cef]/50 hover:bg-white/[0.05] transition-all duration-300 group"
              >
                <div className="text-5xl sm:text-6xl font-semibold text-white tracking-tight group-hover:text-[#595cef] transition-colors font-mono">
                  {r.metric}
                </div>
                <p className="text-xs sm:text-sm font-light text-[#a0a0a0] leading-relaxed pt-6 border-t border-white/10">
                  {r.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. LABORATORY & RESEARCH INITIATIVES (RICH VISUAL SHOWCASE) */}
      <section className="w-full bg-[#f4f4f4] text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-16">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#d8d8d8] pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] tracking-tight">
                Academic &amp; Research Affiliations
              </h2>
              <p className="text-xs sm:text-sm font-light text-[#666666] max-w-xl">
                Active involvement in laboratory instrumentation, university data engineering initiatives, and quantitative research.
              </p>
            </div>
          </div>

          {/* Visual Laboratory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: MOSHEE Lab */}
            <div className="group rounded-[32px] bg-white border border-[#e2e5eb] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#595cef]/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] bg-[#0d1117] overflow-hidden">
                  <Image
                    src="/images/lab_moshee_kinematics.png"
                    alt="MOSHEE Biomechanics Lab - Kinematic Gait Trajectory"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-[#595cef]/80 backdrop-blur-sm">
                      MOSHEE Biomechanics
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-[#090909] group-hover:text-[#595cef] transition-colors">
                    Motion Sensor Instrumentation
                  </h3>
                  <p className="text-xs font-light text-[#666666] leading-relaxed">
                    Multi-camera optical space calibration, reflective marker 3D coordinate tracking, and kinematic time-series signal filtering for human gait trajectory analysis.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>Telkom University</span>
                <span className="font-semibold text-[#090909]">2024 - Present</span>
              </div>
            </div>

            {/* Card 2: UKM CODER */}
            <div className="group rounded-[32px] bg-white border border-[#e2e5eb] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#595cef]/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] bg-[#f8f9fa] overflow-hidden">
                  <Image
                    src="/images/olist/brazil_logistics_map.png"
                    alt="UKM CODER - Data Engineering Pipeline"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-[#090909]/80 backdrop-blur-sm border border-white/20">
                      UKM CODER IT
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-[#090909] group-hover:text-[#595cef] transition-colors">
                    Data Pipeline Architectures
                  </h3>
                  <p className="text-xs font-light text-[#666666] leading-relaxed">
                    Automated Python &amp; SQL data pipeline architectures for organizational member databases with 3NF relational normalization and zero data loss.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>Data &amp; IT Division</span>
                <span className="font-semibold text-[#090909]">2023 - Present</span>
              </div>
            </div>

            {/* Card 3: S1 Data Science */}
            <div className="group rounded-[32px] bg-white border border-[#e2e5eb] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#595cef]/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-[16/10] bg-[#f8f9fa] overflow-hidden">
                  <Image
                    src="/images/banks/returns_vs_var.png"
                    alt="S1 Sains Data - Applied Statistics & ML"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <span className="text-xs font-semibold text-white px-3 py-1 rounded-full bg-[#090909]/80 backdrop-blur-sm border border-white/20">
                      S1 Sains Data
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold text-[#090909] group-hover:text-[#595cef] transition-colors">
                    Applied Statistics &amp; ML
                  </h3>
                  <p className="text-xs font-light text-[#666666] leading-relaxed">
                    Mathematical statistics, stochastic processes, econometric time-series, and zero-leakage statistical learning algorithms.
                  </p>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-[#f0f0f0] flex items-center justify-between text-[11px] font-mono text-[#888888]">
                <span>Universitas Telkom</span>
                <span className="font-semibold text-[#090909]">Undergraduate</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PORTFOLIO MONOGRAPHS SECTION (FLAGSHIP 4 SHOWCASE + COMPLETE 20 ARCHIVE) */}
      <section id="portfolio" className="w-full bg-white text-[#090909] px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full space-y-12">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#e0e0e0] pb-8">
            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-extralight text-[#090909] tracking-tight">
                Featured Flagship Projects
              </h2>
              <p className="text-sm font-light text-[#6b6b6b] max-w-2xl">
                End-to-end data systems combining mathematical rigor, 300 DPI computational plots, and production-grade interactive web applications.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPortfolioView("flagship")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  portfolioView === "flagship"
                    ? "bg-[#090909] text-white shadow-sm"
                    : "bg-[#f4f4f4] text-[#666666] hover:bg-[#e5e5e5]"
                }`}
              >
                Flagship Showcase (4)
              </button>
              <button
                onClick={() => setPortfolioView("all")}
                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                  portfolioView === "all"
                    ? "bg-[#090909] text-white shadow-sm"
                    : "bg-[#f4f4f4] text-[#666666] hover:bg-[#e5e5e5]"
                }`}
              >
                All Monographs (20)
              </button>
            </div>
          </div>

          {/* 1. FLAGSHIP 4 HERO SHOWCASE VIEW */}
          {portfolioView === "flagship" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
              {flagshipProjects.map((project, idx) => (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="group cursor-pointer rounded-[32px] bg-[#f8f9fa] hover:bg-[#eceef2] border border-[#e5e7eb] hover:border-[#595cef]/50 p-8 flex flex-col justify-between transition-all duration-500 shadow-sm hover:shadow-xl space-y-6"
                >
                  <div className="space-y-4">
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#595cef] bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-[#e0e0e0]">
                        {project.domain}
                      </span>
                      <span className="text-xs font-mono font-medium text-[#888888]">
                        FLAGSHIP #{String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="font-semibold text-2xl text-[#090909] group-hover:text-[#595cef] transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs font-light text-[#555555] mt-2 leading-relaxed line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Full Visual Banner with Live Badge */}
                    {project.visualHighlights && project.visualHighlights.length > 0 && (
                      <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden border border-[#e0e0e0] bg-[#ebeef2] group-hover:border-[#595cef]/40 transition-colors">
                        <Image
                          src={project.visualHighlights[0].imageUrl}
                          alt={project.visualHighlights[0].title}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-4">
                          <span className="text-xs font-medium text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/20">
                            {project.visualHighlights[0].title}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30">
                            ● Live Web App Ready
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Metrics Summary Strip */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="p-3 bg-white rounded-[16px] border border-[#e5e7eb]">
                          <div className="text-[9px] font-medium text-[#777777] uppercase truncate">
                            {m.label}
                          </div>
                          <div className="text-base font-bold text-[#090909] mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-5 border-t border-[#e5e7eb] flex items-center justify-between text-xs">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 font-semibold text-[#090909] group-hover:text-[#595cef] transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>View Complete Monograph</span>
                    </button>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#595cef] hover:bg-[#474ae0] text-white font-medium rounded-full text-[11px] shadow-sm transition-all"
                      >
                        <span>Open Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 2. ALL 20 MONOGRAPHS FILTER & SEARCH VIEW */}
          {portfolioView === "all" && (
            <div className="space-y-8 animate-fadeIn">
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

                        <p className="text-xs font-light text-[#666666] leading-relaxed line-clamp-2">
                          {project.problem}
                        </p>

                        {/* Visual Highlight Banner if available */}
                        {project.visualHighlights && project.visualHighlights.length > 0 && (
                          <div className="relative w-full h-36 rounded-[16px] overflow-hidden border border-[#e0e0e0] bg-[#ebeef2] group-hover:border-[#595cef]/50 transition-colors">
                            <Image
                              src={project.visualHighlights[0].imageUrl}
                              alt={project.visualHighlights[0].title}
                              fill
                              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                              <span className="text-[10px] font-medium text-white px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm">
                                {project.visualHighlights[0].type === "web" ? "Interactive Web App" : "300 DPI Notebook Plot"}
                              </span>
                            </div>
                          </div>
                        )}

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
          )}

        </div>
      </section>

      {/* 6. CONTACT SECTION (comp-lylsspgl) - EXACT DARK PURPLE / BLACK FORM */}
      <section id="contact" className="w-full bg-[#090909] text-white px-6 sm:px-12 lg:px-16 py-24 lg:py-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Big Headline & Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-extralight text-white leading-tight tracking-tight">
                Let&apos;s build robust
                <br />
                <span className="font-semibold text-[#595cef]">data systems</span>
              </h2>
              <p className="text-base font-light text-[#a0a0a0] leading-relaxed">
                Open for Data Science, Data Engineering, and Research Collaborations
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
                <div
                  className="p-5 overflow-x-auto bg-[#f4f4f4] border border-[#e0e0e0] text-[#090909] rounded-[16px] text-center my-2 text-sm sm:text-base leading-relaxed"
                  dangerouslySetInnerHTML={renderLatex(activeProject.formula.latex)}
                />
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

              {/* 07. VISUAL ARTIFACTS & NOTEBOOK HIGHLIGHTS */}
              {activeProject.visualHighlights && activeProject.visualHighlights.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider">
                      07 / VISUAL ARTIFACTS & NOTEBOOK HIGHLIGHTS
                    </div>
                    <span className="text-[11px] text-[#595cef] font-medium">
                      {activeProject.visualHighlights.length} Visual Assets
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeProject.visualHighlights.map((v, i) => (
                      <div
                        key={i}
                        className="group/img rounded-[20px] overflow-hidden border border-[#e0e0e0] bg-[#f8f9fa] flex flex-col"
                      >
                        <div className="relative w-full aspect-[16/10] bg-[#eef1f5] overflow-hidden">
                          <Image
                            src={v.imageUrl}
                            alt={v.title}
                            fill
                            className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-black/70 text-white backdrop-blur-sm">
                            {v.type === "web" ? "Interactive Web App" : v.type === "notebook" ? "Jupyter EDA" : "300 DPI Chart"}
                          </span>
                        </div>
                        <div className="p-4 space-y-1.5 flex-1 flex flex-col justify-between">
                          <h4 className="font-semibold text-xs text-[#090909] leading-snug">
                            {v.title}
                          </h4>
                          <p className="text-[11px] text-[#666666] leading-relaxed">
                            {v.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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

      {/* SERVICE DETAIL MODAL */}
      {activeService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[28px] shadow-2xl border border-[#e0e0e0]">
            <div className="p-8 flex items-start justify-between gap-6 sticky top-0 bg-white z-10 border-b border-[#e0e0e0]">
              <div>
                <span className="font-medium text-xs text-[#595cef] tracking-wider uppercase mb-1 block">
                  SERVICE DOMAIN // {activeService.num}
                </span>
                <h2 className="font-semibold text-2xl text-[#090909] leading-tight">
                  {activeService.title}
                </h2>
                <p className="text-xs text-[#6b6b6b] mt-1">{activeService.tagline}</p>
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="p-2 hover:bg-[#f0f0f0] rounded-full transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#666666]" />
              </button>
            </div>

            <div className="p-8 space-y-6 text-sm font-light text-[#333333]">
              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-2">
                  OVERVIEW & STRATEGIC VALUE
                </div>
                <p className="leading-relaxed text-[#090909]">{activeService.desc}</p>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-3">
                  CORE TECHNICAL CAPABILITIES
                </div>
                <div className="space-y-2.5">
                  {activeService.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-[#f4f4f4] border border-[#e8e8e8] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#595cef] flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-[#090909] leading-relaxed">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-semibold text-xs text-[#888888] uppercase tracking-wider mb-3">
                  PRIMARY TECH STACK & TOOLS
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeService.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full bg-[#595cef]/10 border border-[#595cef]/20 text-[#595cef] text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white border-t border-[#e0e0e0]">
              <button
                onClick={() => {
                  if (activeService.categoryFilter) {
                    setSelectedCategory(activeService.categoryFilter);
                  }
                  setActiveService(null);
                  const el = document.getElementById("portfolio");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#595cef] hover:bg-[#474ae0] text-white text-xs font-semibold rounded-full transition-all"
              >
                <span>EXPLORE RELATED MONOGRAPHS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    interest: activeService.title,
                  }));
                  setActiveService(null);
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#f4f4f4] hover:bg-[#e0e0e0] text-[#090909] text-xs font-semibold rounded-full border border-[#e0e0e0] transition-all"
              >
                <span>INQUIRE ABOUT THIS</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
