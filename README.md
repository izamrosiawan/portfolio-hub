# Portfolio Hub: Central Quantitative Analytics & Applied Machine Learning Showcase

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Repositories](https://img.shields.io/badge/Verified%20Repos-20%2B-green.svg)](#)

Website portal interaktif yang mengagregasikan 20+ repositori data science, pemodelan aktuaria, perbankan kuantitatif, rantai pasok, dan machine learning tingkat produksi milik **Izam Rosiawan**.

---

## 1. Domain Industri yang Terintegrasi

1. **Actuarial & Insurance Science**: Pricing GLM, Underwriting Ordinal Classification, Claims Fraud Detection, Cross-Sell Propensity, dan Customer Lifetime Value.
2. **Quantitative Finance & Banking**: Analisis Risiko Empat Bank Terbesar di Indonesia (VaR/ES 95%), Uji Stasioneritas ADF, dan Simulasi Monte Carlo Saham JSMR.
3. **Supply Chain & E-Commerce**: Analisis RFM Olist Marketplace (9 Tabel Relasional ERD) dan Peramalan Permintaan Musiman (Safety Stock & ROP).
4. **Public Policy & Social Impact**: SMART-MUSTAHIK (Penyaluran Zakat Presisi), Campus-ID (Higher Education Analytics), dan ASEAN Economic Recovery.
5. **Healthcare AI & Applied Machine Learning**: Deteksi Kanker Payudara (MLP vs Random Forest), Segmentasi Obesitas (PCA + K-Means), dan Ekonometrika Efisiensi Bahan Bakar.
6. **MLOps & Systems**: FastAPI House Price Web Service, Spotify Audio Analyzer, dan CIC Desktop Music Player.

---

## 2. Struktur Repositori

```text
portfolio-hub/
├── src/
│   ├── app/
│   │   ├── globals.css     # Styling dasar & tema slate bersih
│   │   ├── layout.tsx      # Metadata & HTML container
│   │   └── page.tsx        # Dashboard interaktif, sandbox simulator, & filter
│   └── data/
│       └── projects.ts     # Database metadata komprehensif 20+ proyek
├── public/                 # Aset statis & ikon
├── tailwind.config.js      # Konfigurasi Tailwind CSS
├── tsconfig.json           # Konfigurasi TypeScript
├── package.json            # Dependensi Next.js & React 19
└── README.md               # Dokumentasi portal
```

---

## 3. Cara Menjalankan Secara Lokal

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
*Izam Rosiawan Portfolio Hub.*
