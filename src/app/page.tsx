"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DETAILED_PROJECTS, ProjectDetail } from "@/data/projects_detail";
import { ArrowUpRight, X } from "lucide-react";

const FEATURED_WORKS = [
  {
    id: "indonesian-banks-risk-analytics",
    title: "Risiko Empat Bank Besar",
    caption:
      "ANALISIS RISIKO KUANTITATIF, VALUE AT RISK (VAR 95%), DAN DRAWDOWN HISTORIS PERBANKAN INDONESIA",
    image: "/images/ss_web_banks.png",
  },
  {
    id: "olist-brazilian-ecommerce-analytics",
    title: "Analitika Logistik Olist",
    caption:
      "PEMETAAN RANTAI PASOK SPASIAL, TREN MUSIMAN PENJUALAN, DAN EVALUASI PENGIRIMAN E-COMMERCE",
    image: "/images/ss_web_olist.png",
  },
  {
    id: "asean-economic-recovery",
    title: "Ketahanan Ekonomi ASEAN",
    caption:
      "PEMODELAN MAKROEKONOMI DAN PROYEKSI PEMULIHAN EKONOMI KAWASAN ASIA TENGGARA",
    image: "/images/ss_web_asean.png",
  },
];

const COLLAGE_ITEMS = [
  {
    id: "spotify-tracks-analysis",
    image: "/images/ss_web_spotify.png",
    alt: "Spotify Audio Analytics Dashboard",
  },
  {
    id: "indonesian-banks-risk-analytics",
    image: "/images/banks/returns_vs_var.png",
    alt: "Historical Return vs VaR 95%",
  },
  {
    id: "olist-brazilian-ecommerce-analytics",
    image: "/images/olist/brazil_logistics_map.png",
    alt: "Spatial Logistics Map",
  },
  {
    id: "asean-economic-recovery",
    image: "/images/asean/resilience_ranking.png",
    alt: "ASEAN Resilience Ranking",
  },
  {
    id: "spotify-tracks-analysis",
    image: "/images/spotify/correlation_matrix.png",
    alt: "Audio Feature Correlation",
  },
  {
    id: "indonesian-banks-risk-analytics",
    image: "/images/banks/cumulative_returns.png",
    alt: "Cumulative Return Comparison",
  },
];

export default function HomePage() {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [showAllArchive, setShowAllArchive] = useState<boolean>(false);

  const openById = (id: string) => {
    const found = DETAILED_PROJECTS.find((p) => p.id === id);
    if (found) setActiveProject(found);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black">
      {/* Full-Width Minimal Editorial Top Nav */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16 xl:px-20">
          <a
            href="#beranda"
            className="font-serif text-2xl tracking-normal text-black lg:text-3xl"
          >
            Izam Rosiawan
          </a>

          <nav className="hidden items-center gap-8 text-xs uppercase tracking-[0.24em] text-neutral-700 lg:flex">
            <a href="#tentang" className="hover:text-black">Tentang</a>
            <a href="#pengalaman" className="hover:text-black">Pengalaman</a>
            <a href="#pendidikan" className="hover:text-black">Pendidikan</a>
            <a href="#keahlian" className="hover:text-black">Keahlian</a>
            <a href="#karya" className="hover:text-black">Karya</a>
            <a href="#kontak" className="hover:text-black">Kontak</a>
          </nav>

          <a
            href="/cv-izam-rosiawan.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EBEBEB] px-6 py-2.5 text-xs uppercase tracking-[0.26em] text-black transition hover:bg-neutral-300"
          >
            Unduh CV
          </a>
        </div>
      </header>

      {/* PAGE 1: FULL-SCALE EDITORIAL HERO */}
      <section
        id="beranda"
        className="mx-auto flex min-h-[90vh] w-full max-w-[1680px] flex-col items-center justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20"
      >
        <div className="relative flex w-full flex-col items-center justify-center">
          {/* Top Overlapping Serif Name */}
          <h1 className="relative z-20 -mb-6 select-none text-center font-serif text-[3.8rem] font-normal leading-[0.92] tracking-[-0.02em] text-black sm:-mb-10 sm:text-[6.6rem] lg:-mb-14 lg:text-[9rem] xl:text-[10.2rem]">
            Izam Rosiawan
          </h1>

          {/* Center Tilted Candid Monochrome Portrait */}
          <div className="relative z-10 aspect-[16/10] w-[88vw] max-w-[680px] -rotate-[3.5deg] overflow-hidden bg-neutral-100 shadow-sm">
            <Image
              src="/images/izam-hero-candid.jpg"
              alt="Izam Rosiawan"
              fill
              priority
              className="object-cover object-center grayscale"
            />
          </div>

          {/* Bottom Overlapping Sans PORTOFOLIO */}
          <p className="relative z-20 -mt-7 select-none text-center font-sans text-[3.2rem] font-normal uppercase leading-[0.92] tracking-[0.06em] text-black sm:-mt-12 sm:text-[6.2rem] lg:-mt-16 lg:text-[9rem] xl:text-[10.4rem]">
            PORTOFOLIO
          </p>
        </div>

        <p className="mt-10 text-center font-sans text-lg font-light tracking-wide text-neutral-800 sm:text-2xl lg:text-[1.75rem]">
          Data Science, Data Engineering dan Business Intelligence
        </p>

        <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#karya"
            className="bg-[#EBEBEB] px-12 py-4 text-xs uppercase tracking-[0.3em] text-black transition hover:bg-neutral-300 sm:px-16 sm:py-5 sm:text-base"
          >
            Lihat Karya Saya
          </a>
        </div>
      </section>

      {/* PAGE 2 - SECTION 01: SEDIKIT TENTANG SAYA */}
      <section
        id="tentang"
        className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20"
      >
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-lg font-normal text-black lg:text-xl">01</p>
            <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]">
              SEDIKIT
              <br />
              TENTANG
              <br />
              SAYA
            </h2>

            <div className="mt-14 lg:mt-20 lg:pl-32 xl:pl-44">
              <p className="max-w-xl text-base leading-[1.8] text-neutral-800 sm:text-lg xl:text-[19px]">
                Mahasiswa S1 Sains Data di Universitas Telkom Surabaya yang berdomisili di Surabaya.
                Sehari-hari saya berkutat dengan pembersihan data mentah menggunakan Python dan SQL,
                perapian skema basis data, serta penyusunan dashboard Power BI agar data operasional
                lebih mudah dibaca dan dipakai untuk mengambil keputusan.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between gap-14 lg:col-span-6">
            <div className="relative aspect-[16/10] w-full max-w-[600px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/izam-tentang-street.jpg"
                alt="Izam Rosiawan di Surabaya"
                fill
                className="object-cover object-center grayscale contrast-110"
              />
            </div>

            <div className="relative aspect-[3/4] w-[260px] overflow-hidden bg-neutral-100 sm:w-[320px] lg:mr-16 lg:w-[350px]">
              <Image
                src="/images/editorial-overhead-study.jpg"
                alt="Catatan Riset dan Analisis Statistik"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 - SECTION 02: PENGALAMAN KERJA & ORGANISASI */}
      <section
        id="pengalaman"
        className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20"
      >
        <p className="text-lg font-normal text-black lg:text-xl">02</p>
        <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]">
          PENGALAMAN
          <br />
          KERJA
        </h2>

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left B&W Lab Photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
              <Image
                src="/images/izam-pengalaman-lab.jpg"
                alt="Aktivitas Riset dan Pengolahan Data"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>

          {/* Middle Column: Kampus & Lab */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Kampus &amp; Riset
            </h3>

            <div className="mt-7 space-y-8 text-sm uppercase leading-[1.75] tracking-[0.04em] text-neutral-900 lg:text-[15px]">
              <div>
                <p className="font-medium">LPPM TELKOM UNIVERSITY SURABAYA</p>
                <p className="mt-1.5">- STUDENT STAFF DATA MANAGEMENT (OKT 2026 - SEKARANG)</p>
                <p className="mt-1.5 normal-case tracking-normal text-neutral-700">
                  Memvalidasi dan merapikan dataset tridarma (hibah riset, pengabdian, dan
                  publikasi ilmiah) agar sesuai skema platform OneApp.
                </p>
              </div>

              <div>
                <p className="font-medium">MOSHEE LAB - TELKOM UNIVERSITY SURABAYA</p>
                <p className="mt-1.5">- MOTION LABORATORY ASSISTANT (JULI 2026 - SEKARANG)</p>
                <p className="mt-1.5 normal-case tracking-normal text-neutral-700">
                  Kalibrasi multi-kamera, pengoperasian perangkat tracking, serta akuisisi dan
                  prapemrosesan data gerak kinematik.
                </p>
              </div>

              <div>
                <p className="font-medium">PENGABDIAN MASYARAKAT - SDN WONOKROMO III</p>
                <p className="mt-1.5">- WEB DEVELOPER &amp; PROJECT TEAM (FEB 2026 - JUNI 2026)</p>
                <p className="mt-1.5 normal-case tracking-normal text-neutral-700">
                  Membangun situs resmi sekolah dengan WordPress CMS, konfigurasi domain sch.id,
                  Black Box Testing, dan pelatihan operator sekolah.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Organisasi & Magang */}
          <div className="lg:col-span-3">
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Organisasi &amp; Magang
            </h3>

            <div className="mt-7 space-y-8 text-sm uppercase leading-[1.75] tracking-[0.04em] text-neutral-900 lg:text-[15px]">
              <div>
                <p className="font-medium">UKM CODER IT TELKOM SURABAYA</p>
                <p className="mt-1.5">- DATA ENGINEER (OKT 2024 - OKT 2026)</p>
                <p className="mt-1.5 normal-case tracking-normal text-neutral-700">
                  Menulis skrip otomasi Python dan SQL untuk manajemen database internal serta
                  terlibat di kepanitiaan acara LUMINA.
                </p>
              </div>

              <div>
                <p className="font-medium">VINIX7</p>
                <p className="mt-1.5">- HUMAN RESOURCES INTERN (FEB 2026 - JUNI 2026)</p>
                <p className="mt-1.5 normal-case tracking-normal text-neutral-700">
                  Membantu pengelolaan data personalia, administrasi kepegawaian, dan koordinasi alur
                  kerja internal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 - SECTION 03: PENDIDIKAN & SERTIFIKASI */}
      <section
        id="pendidikan"
        className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: 03 PENDIDIKAN + Cropped Almamater Portrait */}
          <div className="lg:col-span-5">
            <p className="text-lg font-normal text-black lg:text-xl">03</p>
            <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.4rem]">
              PENDIDIKAN
            </h2>

            <div className="relative mt-14 aspect-[3/4] w-[280px] overflow-hidden bg-neutral-100 sm:w-[350px] lg:ml-24 lg:w-[390px]">
              <Image
                src="/images/izam-pendidikan-crop.jpg"
                alt="Izam Rosiawan Universitas Telkom Surabaya"
                fill
                className="object-cover object-center grayscale"
              />
            </div>
          </div>

          {/* Middle Column: Pendidikan Formal */}
          <div className="lg:col-span-3 lg:pt-9">
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">Pendidikan</h3>

            <div className="mt-7 space-y-9 text-sm uppercase leading-[1.75] tracking-[0.04em] text-neutral-900 lg:text-[15px]">
              <div>
                <p className="font-medium">UNIVERSITAS TELKOM SURABAYA</p>
                <p className="mt-1">S1 SAINS DATA (DATA SCIENCE)</p>
                <p className="text-neutral-600">(AGUSTUS 2024 - SEKARANG)</p>
              </div>

              <div>
                <p className="font-medium">SMAN 1 KAMAL</p>
                <p className="mt-1">MATEMATIKA DAN ILMU PENGETAHUAN ALAM (MIPA)</p>
                <p className="text-neutral-600">(JULI 2021 - MEI 2024)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sertifikasi & Pelatihan */}
          <div className="lg:col-span-4 lg:pt-9">
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Sertifikasi &amp; Pelatihan
            </h3>

            <div className="mt-7 space-y-6 text-sm uppercase leading-[1.7] tracking-[0.04em] text-neutral-900 lg:text-[15px]">
              <div>
                <p className="font-medium">PANDAS BOOTCAMP: DATA ANALYSIS WITH PYTHON3</p>
                <p className="text-neutral-600">PELATIHAN INTENSIF, 2025</p>
              </div>
              <div>
                <p className="font-medium">MASTER THE BASICS OF AZURE: DATA FUNDAMENTALS</p>
                <p className="text-neutral-600">MICROSOFT AZURE</p>
              </div>
              <div>
                <p className="font-medium">MICROSOFT POWER BI FOR BEGINNERS &amp; EXCEL USERS</p>
                <p className="text-neutral-600">MICROSOFT</p>
              </div>
              <div>
                <p className="font-medium">BIG DATA 101</p>
                <p className="text-neutral-600">COGNITIVE CLASS / IBM</p>
              </div>
              <div>
                <p className="font-medium">BELAJAR MACHINE LEARNING UNTUK PEMULA</p>
                <p className="text-neutral-600">DICODING INDONESIA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 - SECTION 04: KETERAMPILAN & KEAHLIAN */}
      <section
        id="keahlian"
        className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20"
      >
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="text-lg font-normal text-black lg:text-xl">04</p>
            <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.4rem]">
              KETERAMPILAN
              <br />
              &amp; KEAHLIAN
            </h2>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-hands-coding.jpg"
                alt="Pemrograman Data dan Rekayasa Sistem"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 lg:max-w-5xl lg:gap-16">
          <div>
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Bahasa &amp; Alat
            </h3>
            <ul className="mt-5 space-y-2.5 text-base text-neutral-800 lg:text-lg">
              <li>- Python</li>
              <li>- SQL</li>
              <li>- HTML &amp; CSS</li>
              <li>- WordPress CMS</li>
              <li>- Git &amp; GitHub</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Analisis &amp; Data
            </h3>
            <ul className="mt-5 space-y-2.5 text-base text-neutral-800 lg:text-lg">
              <li>- Data Analysis</li>
              <li>- Data Engineering</li>
              <li>- Pandas</li>
              <li>- Microsoft Power BI</li>
              <li>- Microsoft Excel</li>
              <li>- Azure Data Fundamentals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-3xl font-normal text-black lg:text-4xl">
              Keahlian Teknis
            </h3>
            <ul className="mt-5 space-y-2.5 text-base text-neutral-800 lg:text-lg">
              <li>- Pengelolaan Basis Data</li>
              <li>- Otomatisasi Alur Kerja</li>
              <li>- Black Box Testing</li>
              <li>- Motion Capture &amp; Gait Analysis</li>
              <li>- Schema Alignment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PAGE 3 - SECTION 05: EDITORIAL STATEMENT DIVIDER ("ANALITIKA BERTEMU PRESISI") */}
      <section className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-20">
        <p className="text-lg font-normal text-black lg:text-xl">05</p>

        <div className="relative mt-8 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-desk-workspace.jpg"
                alt="Meja Kerja Data Engineering"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>

          <div className="z-10 text-left lg:col-span-6 lg:-ml-8">
            <p className="font-sans text-5xl font-normal uppercase leading-[1.06] tracking-[0.04em] text-black sm:text-7xl lg:text-[5.6rem] xl:text-[6.6rem]">
              ANALITIKA
            </p>
            <p className="font-serif text-6xl italic font-normal leading-[1.04] text-black sm:text-7xl lg:ml-10 lg:text-[6rem] xl:text-[7rem]">
              BERTEMU
            </p>
            <p className="font-sans text-5xl font-normal uppercase leading-[1.06] tracking-[0.04em] text-black sm:text-7xl lg:ml-3 lg:text-[5.6rem] xl:text-[6.6rem]">
              PRESISI
            </p>
          </div>

          <div className="lg:col-span-3 lg:mt-32">
            <div className="relative ml-auto aspect-[3/4] w-full max-w-[320px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/editorial-hand-chart-sketch.jpg"
                alt="Sketsa Kurva Distribusi dan Pemodelan"
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3 - SECTION 06: KARYA SAYA (3-Column Full-Width Visual Featured Works) */}
      <section
        id="karya"
        className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20"
      >
        <p className="text-lg font-normal text-black lg:text-xl">06</p>
        <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]">
          KARYA SAYA
        </h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3 lg:gap-12">
          {FEATURED_WORKS.map((work) => (
            <article
              key={work.id}
              onClick={() => openById(work.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-5 font-serif text-3xl font-normal text-black group-hover:underline lg:text-4xl">
                {work.title}
              </h3>
              <p className="mt-2.5 text-xs uppercase leading-[1.7] tracking-[0.05em] text-neutral-700 lg:text-sm">
                {work.caption}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PAGE 3 - SECTION 07: PROYEK LAINNYA (Large Collage + Tilted Feature + Full Archive) */}
      <section className="mx-auto w-full max-w-[1680px] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 xl:px-20">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="text-lg font-normal text-black lg:text-xl">07</p>
            <h2 className="mt-3 font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-[5rem] xl:text-[5.6rem]">
              PROYEK
              <br />
              LAINNYA
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="max-w-lg text-sm uppercase leading-[1.75] tracking-[0.05em] text-neutral-800 lg:text-base">
              KUMPULAN RISET DATA, PIPELINE ETL, DAN PEMODELAN YANG SAYA KERJAKAN
            </p>
          </div>
        </div>

        {/* Collage + Tilted Feature Card */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-8">
            {COLLAGE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openById(item.id)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center lg:col-span-4">
            <div
              onClick={() => openById("spotify-tracks-analysis")}
              className="group relative aspect-[3/4] w-[280px] -rotate-[4deg] cursor-pointer overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm transition hover:rotate-0 sm:w-[330px] lg:w-[360px]"
            >
              <Image
                src="/images/spotify/spotify_clusters.png"
                alt="Spotify Audio Clustering"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Minimal Editorial Toggle for Complete 20-Project Index */}
        <div className="mt-16">
          <button
            onClick={() => setShowAllArchive((prev) => !prev)}
            className="bg-[#EBEBEB] px-10 py-4 text-xs uppercase tracking-[0.26em] text-black transition hover:bg-neutral-300 sm:text-sm"
          >
            {showAllArchive
              ? "Tutup Indeks Proyek"
              : `Lihat Indeks Lengkap (${DETAILED_PROJECTS.length} Proyek)`}
          </button>

          {showAllArchive && (
            <div className="mt-12 divide-y divide-neutral-200 border-y border-neutral-200">
              {DETAILED_PROJECTS.map((proj, index) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="group flex cursor-pointer flex-col justify-between gap-3 py-5 transition hover:bg-neutral-50 sm:flex-row sm:items-center"
                >
                  <div className="flex items-baseline gap-6">
                    <span className="w-8 text-sm text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-serif text-2xl text-black group-hover:underline lg:text-3xl">
                        {proj.title}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600 lg:text-base">{proj.tagline}</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {proj.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PAGE 4: BEKERJA DENGAN SAYA (Full-Scale Closing Editorial Spread) */}
      <footer
        id="kontak"
        className="mx-auto w-full max-w-[1680px] border-t border-neutral-200 px-6 py-28 sm:px-10 lg:px-16 lg:py-36 xl:px-20"
      >
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="font-sans text-5xl font-normal uppercase leading-[1.05] tracking-tight text-black sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
              BEKERJA
              <br />
              DENGAN
              <br />
              SAYA
            </h2>

            <div className="mt-14 space-y-4 font-serif text-2xl text-black sm:text-4xl lg:text-[2.6rem]">
              <p>
                <a
                  href="https://www.linkedin.com/in/izam-rosiawan-86089627a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/izam-rosiawan-86089627a
                </a>
              </p>
              <p>
                <a href="mailto:izamrosiawan13@gmail.com" className="hover:underline">
                  izamrosiawan13@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="https://github.com/izamrosiawan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  github.com/izamrosiawan
                </a>
              </p>
              <p className="text-xl text-neutral-600 sm:text-3xl lg:text-[2.1rem]">
                Surabaya, Jawa Timur
              </p>
            </div>

            <div className="mt-14 flex flex-wrap gap-5">
              <a
                href="mailto:izamrosiawan13@gmail.com"
                className="bg-[#EBEBEB] px-12 py-4 text-xs uppercase tracking-[0.28em] text-black transition hover:bg-neutral-300 sm:px-14 sm:py-5 sm:text-sm"
              >
                Hubungi Saya
              </a>
              <a
                href="/cv-izam-rosiawan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-300 bg-white px-12 py-4 text-xs uppercase tracking-[0.28em] text-black transition hover:bg-neutral-100 sm:px-14 sm:py-5 sm:text-sm"
              >
                Unduh CV
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative aspect-[3/4] w-[300px] rotate-[4.5deg] overflow-hidden bg-neutral-100 shadow-sm sm:w-[380px] lg:w-[440px]">
              <Image
                src="/images/izam-batik-last.jpg"
                alt="Izam Rosiawan"
                fill
                className="object-cover object-top grayscale"
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Minimal Monochrome Case Study Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="max-h-[88vh] w-full max-w-3xl overflow-y-auto bg-white p-8 md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                  {activeProject.domain}
                </p>
                <h3 className="mt-2 font-serif text-3xl font-normal text-black md:text-4xl">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1.5 text-neutral-500 hover:text-black"
                aria-label="Tutup"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="mt-6 text-base leading-relaxed text-neutral-800">
              {activeProject.problem}
            </p>
            <p className="mt-4 text-base leading-relaxed text-neutral-700">
              {activeProject.methodology}
            </p>

            {activeProject.metrics && activeProject.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-6 border-y border-neutral-200 py-6 sm:grid-cols-3">
                {activeProject.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                      {m.label}
                    </p>
                    <p className="mt-1 font-serif text-3xl text-black">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-2.5">
              {activeProject.techStack.map((t) => (
                <span
                  key={t}
                  className="bg-[#F2F2F2] px-3.5 py-1.5 text-xs uppercase tracking-[0.14em] text-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>

            {activeProject.githubUrl && (
              <div className="mt-9">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black px-8 py-4 text-xs uppercase tracking-[0.26em] text-white transition hover:bg-neutral-800"
                >
                  Buka Repositori GitHub
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
