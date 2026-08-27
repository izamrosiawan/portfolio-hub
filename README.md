# Portfolio Hub: Central Quantitative Analytics & Applied Machine Learning Showcase

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-success?style=for-the-badge&logo=vercel)](https://portfolio-hub-coral-eight.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Repositories](https://img.shields.io/badge/Verified%20Repos-20%2B-green.svg)](#)

Website portal interaktif yang mengagregasikan 20+ repositori data science, pemodelan aktuaria, perbankan kuantitatif, rantai pasok, dan machine learning tingkat produksi milik **Izam Rosiawan**.

**Akses Live**: [https://portfolio-hub-coral-eight.vercel.app/](https://portfolio-hub-coral-eight.vercel.app/)

---

## 1. Ikhtisar & Fitur Utama

- **Live Sandbox Simulator**: Interaksi parameter interaktif untuk estimasi risiko, formula aktuaria, dan kalkulasi metrik langsung di antarmuka web.
- **Formula Matematika & KaTeX**: Rendering presisi formula formal (GLM, VaR/ES, Nelder-Mead simplex, QWK, SARIMA, KaTeX KaTeX).
- **Filter Domain Cerdas**: Navigasi multi-kategori instan (Insurance, Banking, Supply Chain, Public Policy, Healthcare, Systems).
- **Audit & Verifikasi Repositori**: Setiap repositori dilengkapi data riil, validasi pengujian (Pytest/TDD), metrik evaluasi empiris, dan tautan kode sumber terbuka.

---

## 2. Domain Industri yang Terintegrasi

1. **Actuarial & Insurance Science**:
   - Pricing GLM (Frequency-Severity Poisson-Gamma vs Tweedie).
   - Underwriting Ordinal Classification (Nelder-Mead threshold optimization).
   - Claims Fraud Detection & Cost-Sensitive Learning.
   - Health-to-Vehicle Insurance Cross-Sell Propensity Modeling (Lift 3.23x).
   - Customer Lifetime Value (CLV) & Policy Renewal Analytics.

2. **Quantitative Finance & Banking**:
   - Analisis Profil Risiko & Valuasi Saham Big 4 Bank Indonesia (BBCA, BBRI, BMRI, BBNI) dengan VaR/ES 95% dan Uji ADF.
   - Simulasi Stokastik Monte Carlo Geometric Brownian Motion (GBM) Saham JSMR (1.000 lintasan).

3. **Supply Chain & E-Commerce**:
   - Analisis RFM Olist Brazilian E-Commerce & Pipeline Relasional 9 Tabel ERD.
   - Peramalan Permintaan Musiman SARIMA, Safety Stock Dinamis, dan Titik Pemesanan Ulang (ROP).

4. **Public Policy & Social Impact**:
   - SMART-MUSTAHIK: Sistem Pendukung Keputusan Penyaluran Zakat Presisi Bebas Kebocoran Target.
   - Campus-ID: Analisis Rasio Dosen-Mahasiswa, Keketatan SNBT, dan Sebaran UKT Nasional.
   - ASEAN Post-Pandemic Economic Recovery & Tourism Forecasting (2019-2027F).

5. **Healthcare AI & Applied Machine Learning**:
   - Deteksi Kanker Payudara: Neural Network MLP vs Random Forest (Evaluasi SMOTE).
   - Segmentasi Obesitas & Gaya Hidup via Reduksi Dimensi PCA dan K-Means.
   - Ekonometrika Efisiensi Bahan Bakar Otomotif (Auto MPG OLS Regression & VIF).
   - Klasifikasi Probabilitas Kelangsungan Hidup Penumpang Titanic.

6. **MLOps & Systems Engineering**:
   - FastAPI House Price Predictor Web Service (Pydantic v2, latency < 15ms).
   - Spotify Tracks Audio Features Profiling & Hit Predictor (114k trek musik).
   - CIC Music Player: Aplikasi Desktop Audio Mixer & Hierarchical Graph Nodes.
   - AI Research OS: Engine Otomasi Riset, Verifikasi BibTeX 1-to-1, dan Audit Data Leakage.

---

## 3. Struktur Repositori

```text
portfolio-hub/
├── src/
│   ├── app/
│   │   ├── globals.css     # Styling dasar dan tema slate bersih
│   │   ├── layout.tsx      # Metadata dan HTML container
│   │   └── page.tsx        # Dashboard interaktif, sandbox simulator, dan filter
│   └── data/
│       └── projects.ts     # Database metadata komprehensif 20+ proyek
├── public/                 # Aset statis dan ikon
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── tsconfig.json           # Konfigurasi TypeScript
├── package.json            # Dependensi Next.js dan React 19
└── README.md               # Dokumentasi portal
```

---

## 4. Cara Menjalankan Secara Lokal

1. **Pasang Dependensi**:
   ```bash
   npm install
   ```

2. **Jalankan Development Server**:
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:3000`.

3. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

---

## 5. Deployment

Portal ini telah di-deploy secara continuous delivery ke platform Vercel:
- **Live Production URL**: [https://portfolio-hub-coral-eight.vercel.app/](https://portfolio-hub-coral-eight.vercel.app/)

---
*Izam Rosiawan Portfolio Hub.*
