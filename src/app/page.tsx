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
    <div className="min-h-screen bg-white text-black">
      {/* Minimal Editorial Top Nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <a
            href="#beranda"
            className="font-serif text-xl tracking-normal text-black"
          >
            Izam Rosiawan
          </a>

          <nav className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.22em] text-neutral-700 md:flex">
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
            className="bg-[#EBEBEB] px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-black transition hover:bg-neutral-300"
          >
            Unduh CV
          </a>
        </div>
      </header>

      {/* PAGE 1: EDITORIAL HERO (Overlapping Name + Tilted B&W Portrait + PORTOFOLIO) */}
      <section
        id="beranda"
        className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-6 py-14 md:px-12 md:py-20"
      >
        <div className="relative flex w-full flex-col items-center justify-center">
          {/* Top Overlapping Serif Name */}
          <h1 className="relative z-20 -mb-6 select-none text-center font-serif text-[3.4rem] font-normal leading-none tracking-[-0.02em] text-black sm:-mb-10 sm:text-[5.5rem] md:-mb-12 md:text-[7.2rem]">
            Izam Rosiawan
          </h1>

          {/* Center Tilted Monochrome Portrait */}
          <div className="relative z-10 h-[250px] w-[300px] -rotate-[3.5deg] overflow-hidden bg-neutral-100 shadow-sm sm:h-[320px] sm:w-[400px] md:h-[360px] md:w-[450px]">
            <Image
              src="/images/izam_photo_grey_bw.jpg"
              alt="Izam Rosiawan"
              fill
              priority
              className="object-cover object-top grayscale contrast-110"
            />
          </div>

          {/* Bottom Overlapping Sans PORTOFOLIO */}
          <p className="relative z-20 -mt-8 select-none text-center font-sans text-[3rem] font-normal uppercase leading-none tracking-[0.06em] text-black sm:-mt-12 sm:text-[5.2rem] md:-mt-14 md:text-[7.2rem]">
            PORTOFOLIO
          </p>
        </div>

        <p className="mt-8 text-center font-sans text-base font-light tracking-wide text-neutral-800 sm:text-xl">
          Data Science, Data Engineering dan Business Intelligence
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#karya"
            className="bg-[#EBEBEB] px-10 py-3.5 text-xs uppercase tracking-[0.28em] text-black transition hover:bg-neutral-300 sm:text-sm"
          >
            Lihat Karya Saya
          </a>
        </div>
      </section>

      {/* PAGE 2 - SECTION 01: SEDIKIT TENTANG SAYA */}
      <section id="tentang" className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-sm font-normal text-black">01</p>
            <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.5rem]">
              SEDIKIT
              <br />
              TENTANG
              <br />
              SAYA
            </h2>

            <div className="mt-12 md:pl-20">
              <p className="text-sm leading-[1.75] text-neutral-800 sm:text-[15px]">
                Saya mahasiswa S1 Sains Data di Universitas Telkom Surabaya yang saat ini berbasis
                di Surabaya. Saya aktif merancang skrip otomasi pemrosesan data berbasis Python dan
                SQL, mengelola basis data relasional terstruktur, serta menyusun visualisasi
                dashboard analitik interaktif Power BI. Fokus utama saya adalah mengubah data
                mentah operasional menjadi informasi akurat untuk pengambilan keputusan.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 md:col-span-6">
            <div className="relative ml-auto h-[240px] w-full max-w-[380px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/izam-candid-laptop.jpg"
                alt="Izam Rosiawan bersama Laptop"
                fill
                className="object-cover object-center grayscale contrast-110"
              />
            </div>

            <div className="relative ml-auto h-[230px] w-[190px] overflow-hidden bg-neutral-100 md:mr-8">
              <Image
                src="/images/lab_moshee_kinematics.png"
                alt="Laboratorium Riset"
                fill
                className="object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 - SECTION 02: PENGALAMAN KERJA & ORGANISASI */}
      <section id="pengalaman" className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-24">
        <p className="text-sm font-normal text-black">02</p>
        <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.5rem]">
          PENGALAMAN
          <br />
          KERJA
        </h2>

        <div className="mt-14 grid items-start gap-10 md:grid-cols-12">
          {/* Left B&W Editorial Photo */}
          <div className="md:col-span-4">
            <div className="relative h-[220px] w-full overflow-hidden bg-neutral-100">
              <Image
                src="/images/mockup_bank_risk.jpg"
                alt="Pengalaman Data dan Riset"
                fill
                className="object-cover grayscale contrast-110"
              />
            </div>
          </div>

          {/* Middle Column: Lab & Project */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-2xl font-normal text-black">
              Laboratorium &amp; Proyek
            </h3>

            <div className="mt-5 space-y-7 text-xs uppercase leading-[1.7] tracking-[0.04em] text-neutral-900">
              <div>
                <p className="font-medium">MOSHEE LAB - TELKOM UNIVERSITY SURABAYA</p>
                <p className="mt-2">- MOTION LABORATORY ASSISTANT (JULI 2025 - SEKARANG)</p>
                <p className="mt-1 normal-case tracking-normal text-neutral-700">
                  Operasional riset gait analysis, kalibrasi multi-kamera, reflective marker, dan
                  pra-pemrosesan data sensor gerak.
                </p>
              </div>

              <div>
                <p className="font-medium">PENGABDIAN MASYARAKAT - SDN WONOKROMO III</p>
                <p className="mt-2">- WEB DEVELOPER &amp; PROJECT TEAM (FEB 2025 - JUN 2025)</p>
                <p className="mt-1 normal-case tracking-normal text-neutral-700">
                  Pengembangan situs resmi sekolah, konfigurasi domain sch.id &amp; hosting, Black
                  Box Testing, serta pelatihan guru dan staf.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Organisasi */}
          <div className="md:col-span-4">
            <h3 className="font-serif text-2xl font-normal text-black">
              Organisasi &amp; Divisi Data
            </h3>

            <div className="mt-5 space-y-7 text-xs uppercase leading-[1.7] tracking-[0.04em] text-neutral-900">
              <div>
                <p className="font-medium">UKM CODER IT TELKOM SURABAYA</p>
                <p className="mt-2">- MEMBER OF DATA ENGINEER (OKT 2024 - SEKARANG)</p>
                <p className="mt-1 normal-case tracking-normal text-neutral-700">
                  Otomasi skrip ekstraksi, transformasi, dan pembersihan data berbasis Python &amp;
                  SQL, tata kelola basis data relasional, serta kepanitiaan LUMINA.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2 - SECTION 03: PENDIDIKAN & SERTIFIKASI */}
      <section id="pendidikan" className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-12">
          {/* Left Column: 03 PENDIDIKAN + Vertical Photo */}
          <div className="md:col-span-5">
            <p className="text-sm font-normal text-black">03</p>
            <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.3rem]">
              PENDIDIKAN
            </h2>

            <div className="relative mt-12 h-[300px] w-[215px] overflow-hidden bg-neutral-100 md:ml-16">
              <Image
                src="/images/izam-almamater-wide.jpg"
                alt="Pendidikan Universitas Telkom Surabaya"
                fill
                className="object-cover object-bottom grayscale contrast-105"
              />
            </div>
          </div>

          {/* Middle Column: Pendidikan Formal */}
          <div className="md:col-span-3 md:pt-7">
            <h3 className="font-serif text-2xl font-normal text-black">Pendidikan</h3>

            <div className="mt-5 space-y-7 text-xs uppercase leading-[1.7] tracking-[0.04em] text-neutral-900">
              <div>
                <p className="font-medium">UNIVERSITAS TELKOM SURABAYA</p>
                <p>S1 SAINS DATA (DATA SCIENCE)</p>
                <p className="text-neutral-600">(AGUSTUS 2024 - SEKARANG)</p>
              </div>

              <div>
                <p className="font-medium">SMAN 1 KAMAL</p>
                <p>MATEMATIKA DAN ILMU PENGETAHUAN ALAM (MIPA)</p>
                <p className="text-neutral-600">(JULI 2021 - MEI 2024)</p>
              </div>
            </div>
          </div>

          {/* Right Column: Sertifikasi & Pelatihan */}
          <div className="md:col-span-4 md:pt-7">
            <h3 className="font-serif text-2xl font-normal text-black">
              Sertifikasi &amp; Pelatihan
            </h3>

            <div className="mt-5 space-y-5 text-xs uppercase leading-[1.65] tracking-[0.04em] text-neutral-900">
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
      <section id="keahlian" className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-sm font-normal text-black">04</p>
            <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.3rem]">
              KETERAMPILAN
              <br />
              &amp; KEAHLIAN
            </h2>
          </div>

          <div className="md:col-span-6">
            <div className="relative h-[200px] w-full overflow-hidden bg-neutral-100">
              <Image
                src="/images/mockup_asean_recovery.jpg"
                alt="Keahlian Analitika Data"
                fill
                className="object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 md:max-w-3xl">
          <div>
            <h3 className="font-serif text-2xl font-normal text-black">Bahasa &amp; Alat</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-neutral-800">
              <li>- Python</li>
              <li>- SQL</li>
              <li>- HTML &amp; CSS</li>
              <li>- WordPress CMS</li>
              <li>- Git &amp; GitHub</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-normal text-black">Analisis &amp; Data</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-neutral-800">
              <li>- Data Analysis</li>
              <li>- Data Engineering</li>
              <li>- Pandas</li>
              <li>- Microsoft Power BI</li>
              <li>- Microsoft Excel</li>
              <li>- Azure Data Fundamentals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-normal text-black">Keahlian Teknis</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-neutral-800">
              <li>- Pengelolaan Basis Data</li>
              <li>- Otomatisasi Alur Kerja</li>
              <li>- Black Box Testing</li>
              <li>- Domain &amp; Hosting</li>
              <li>- Gait Analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PAGE 3 - SECTION 05: EDITORIAL STATEMENT DIVIDER ("ANALITIKA BERTEMU PRESISI") */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-28">
        <p className="text-sm font-normal text-black">05</p>

        <div className="relative mt-6 grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="relative h-[230px] w-full max-w-[220px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/izam_photo_grey_color.jpg"
                alt="Potret Kerja"
                fill
                className="object-cover object-top grayscale contrast-105"
              />
            </div>
          </div>

          <div className="z-10 text-left md:col-span-6 md:-ml-6">
            <p className="font-sans text-4xl font-normal uppercase leading-[1.08] tracking-[0.04em] text-black sm:text-6xl md:text-[4.2rem]">
              ANALITIKA
            </p>
            <p className="font-serif text-5xl italic font-normal leading-[1.05] text-black sm:text-6xl md:ml-6 md:text-[4.5rem]">
              BERTEMU
            </p>
            <p className="font-sans text-4xl font-normal uppercase leading-[1.08] tracking-[0.04em] text-black sm:text-6xl md:ml-2 md:text-[4.2rem]">
              PRESISI
            </p>
          </div>

          <div className="md:col-span-3 md:mt-24">
            <div className="relative ml-auto h-[230px] w-full max-w-[200px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/jr_dots_lines.jpg"
                alt="Visualisasi Kuantitatif"
                fill
                className="object-cover grayscale contrast-110"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3 - SECTION 06: KARYA SAYA (3-Column Visual Featured Works) */}
      <section id="karya" className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-24">
        <p className="text-sm font-normal text-black">06</p>
        <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.5rem]">
          KARYA SAYA
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {FEATURED_WORKS.map((work) => (
            <article
              key={work.id}
              onClick={() => openById(work.id)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 border border-neutral-200">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="mt-4 font-serif text-2xl font-normal text-black group-hover:underline">
                {work.title}
              </h3>
              <p className="mt-1.5 text-[11px] uppercase leading-[1.6] tracking-[0.05em] text-neutral-700">
                {work.caption}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* PAGE 3 - SECTION 07: PROYEK LAINNYA (Collage + Tilted Feature + Full Archive Toggle) */}
      <section className="mx-auto max-w-5xl px-6 py-20 md:px-12 md:py-24">
        <div className="grid items-end gap-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-sm font-normal text-black">07</p>
            <h2 className="mt-2 font-sans text-4xl font-normal uppercase leading-[1.08] tracking-tight text-black sm:text-5xl md:text-[3.5rem]">
              PROYEK
              <br />
              LAINNYA
            </h2>
          </div>

          <div className="md:col-span-6">
            <p className="max-w-sm text-xs uppercase leading-[1.65] tracking-[0.05em] text-neutral-800">
              KUMPULAN RISET KUANTITATIF, PIPELINE DATA, DAN PEMODELAN PREDIKTIF YANG DIKONSEPKAN,
              DIRANCANG, DAN DIKEMBANGKAN OLEH SAYA
            </p>
          </div>
        </div>

        {/* Collage + Tilted Feature Card */}
        <div className="mt-14 grid items-center gap-8 md:grid-cols-12">
          <div className="grid grid-cols-3 gap-2 md:col-span-8">
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

          <div className="flex justify-center md:col-span-4">
            <div
              onClick={() => openById("spotify-tracks-analysis")}
              className="group relative h-[280px] w-[220px] -rotate-[4deg] cursor-pointer overflow-hidden border border-neutral-200 bg-neutral-100 shadow-sm transition hover:rotate-0"
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
        <div className="mt-14">
          <button
            onClick={() => setShowAllArchive((prev) => !prev)}
            className="bg-[#EBEBEB] px-8 py-3 text-xs uppercase tracking-[0.24em] text-black transition hover:bg-neutral-300"
          >
            {showAllArchive
              ? "Tutup Indeks Proyek"
              : `Lihat Indeks Lengkap (${DETAILED_PROJECTS.length} Proyek)`}
          </button>

          {showAllArchive && (
            <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
              {DETAILED_PROJECTS.map((proj, index) => (
                <div
                  key={proj.id}
                  onClick={() => setActiveProject(proj)}
                  className="group flex cursor-pointer flex-col justify-between gap-2 py-4 transition hover:bg-neutral-50 sm:flex-row sm:items-center"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="w-6 text-xs text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-serif text-xl text-black group-hover:underline">
                        {proj.title}
                      </p>
                      <p className="text-xs text-neutral-600">{proj.tagline}</p>
                    </div>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {proj.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PAGE 4: BEKERJA DENGAN SAYA (Closing Editorial Contact Page) */}
      <footer
        id="kontak"
        className="mx-auto max-w-5xl border-t border-neutral-200 px-6 py-24 md:px-12 md:py-32"
      >
        <div className="grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="font-sans text-5xl font-normal uppercase leading-[1.06] tracking-tight text-black sm:text-6xl md:text-[4.4rem]">
              BEKERJA
              <br />
              DENGAN
              <br />
              SAYA
            </h2>

            <div className="mt-12 space-y-3 font-serif text-2xl text-black sm:text-3xl">
              <p>
                <a
                  href="https://linkedin.com/in/izam-rosiawan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  linkedin.com/in/izam-rosiawan
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
              <p className="text-xl text-neutral-600 sm:text-2xl">Surabaya, Jawa Timur</p>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="mailto:izamrosiawan13@gmail.com"
                className="bg-[#EBEBEB] px-9 py-3.5 text-xs uppercase tracking-[0.28em] text-black transition hover:bg-neutral-300"
              >
                Hubungi Saya
              </a>
              <a
                href="/cv-izam-rosiawan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-300 bg-white px-9 py-3.5 text-xs uppercase tracking-[0.28em] text-black transition hover:bg-neutral-100"
              >
                Unduh CV
              </a>
            </div>
          </div>

          <div className="flex justify-center md:col-span-5 md:justify-end">
            <div className="relative h-[390px] w-[290px] rotate-[4.5deg] overflow-hidden bg-neutral-100 shadow-sm sm:h-[440px] sm:w-[320px]">
              <Image
                src="/images/izam_batik_photo.jpg"
                alt="Izam Rosiawan"
                fill
                className="object-cover object-top grayscale contrast-105"
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
            className="max-h-[86vh] w-full max-w-2xl overflow-y-auto bg-white p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  {activeProject.domain}
                </p>
                <h3 className="mt-1 font-serif text-3xl font-normal text-black">
                  {activeProject.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-1 text-neutral-500 hover:text-black"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-neutral-800">
              {activeProject.problem}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              {activeProject.methodology}
            </p>

            {activeProject.metrics && activeProject.metrics.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-neutral-200 py-5 sm:grid-cols-3">
                {activeProject.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-500">
                      {m.label}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-black">{m.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {activeProject.techStack.map((t) => (
                <span
                  key={t}
                  className="bg-[#F2F2F2] px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-neutral-800"
                >
                  {t}
                </span>
              ))}
            </div>

            {activeProject.githubUrl && (
              <div className="mt-8">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black px-6 py-3 text-xs uppercase tracking-[0.24em] text-white transition hover:bg-neutral-800"
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
