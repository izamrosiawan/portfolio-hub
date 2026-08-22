export interface ProjectDetail {
  id: string;
  title: string;
  domain: string;
  category: "Insurance" | "Banking" | "SupplyChain" | "PublicPolicy" | "Healthcare" | "Systems";
  tagline: string;
  problem: string;
  methodology: string;
  findings: string[];
  metrics: { label: string; value: string; desc: string }[];
  formula: { title: string; latex: string; explanation: string };
  codeSnippet: string;
  techStack: string[];
  githubUrl: string;
  demoUrl?: string;
  datasetInfo: { name: string; size: string; source: string };
}

export const DETAILED_PROJECTS: ProjectDetail[] = [
  {
    id: "insurance-pricing-glm",
    title: "Motor Insurance Pure Premium Pricing",
    domain: "Actuarial Science & GLM Pricing",
    category: "Insurance",
    tagline: "Frequency-Severity Decoupling via Poisson x Gamma GLM and Compound Poisson Tweedie",
    problem: "Tarif premi asuransi kendaraan konvensional seringkali gagal membedakan risiko frekuensi klaim (seberapa sering klaim terjadi) dan severitas klaim (besaran biaya per klaim), yang berakibat pada adverse selection dan underpricing pada segmen pengemudi berisiko tinggi.",
    methodology: "Mengimplementasikan dekomposisi aktuaria standar (Two-Part Frequency x Severity Model). Frekuensi dimodelkan menggunakan Poisson GLM dengan log link dan log(Exposure) sebagai offset. Severitas biaya klaim positif dimodelkan menggunakan Gamma GLM dengan log link. Model divalidasi silang terhadap Tweedie GLM (p=1.5) dan dievaluasi menggunakan Kurva Lorenz serta Koefisien Gini.",
    findings: [
      "Poisson GLM + Gamma GLM menghasilkan Koefisien Gini 0.2882, membuktikan kemampuan diskriminasi risiko yang superior dibanding tarif rata-rata.",
      "Fitur usia kendaraan (VehAge) dan kepadatan wilayah (Density) merupakan prediktor paling signifikan terhadap lonjakan frekuensi klaim.",
      "Tweedie GLM (p=1.5) memberikan performa komparabel dalam satu iterasi fitting, sangat efisien untuk pipeline underwriting instan."
    ],
    metrics: [
      { label: "Gini Index", value: "0.2882", desc: "Konsentrasi pemisahan risiko" },
      { label: "Gamma Deviance", value: "1.8420", desc: "Goodness-of-fit severitas" },
      { label: "Poisson Deviance", value: "0.4102", desc: "Goodness-of-fit frekuensi" }
    ],
    formula: {
      title: "Kalkulasi Premi Murni (Pure Premium Equation)",
      latex: "E[Y] = E[N] \\times E[Z] = \\exp(X_1 \\beta_1 + \\ln(\\text{Exposure})) \\times \\exp(X_2 \\beta_2)",
      explanation: "Premi murni E[Y] adalah perkalian ekspektasi frekuensi klaim tahunan E[N] dengan ekspektasi rata-rata biaya per klaim E[Z]."
    },
    codeSnippet: `from src.pricing_engine import PricingEngine
import pandas as pd

engine = PricingEngine()
sample = pd.DataFrame([{
    'VehPower': 5, 'VehAge': 2, 'DrivAge': 35,
    'BonusMalus': 50, 'Density': 1200, 'Exposure': 1.0
}])
pure_premium = engine.predict_pure_premium(sample)
print(f"Rekomendasi Premi Murni: €{pure_premium[0]:.2f}")`,
    techStack: ["Python 3.11", "Statsmodels", "Scikit-Learn", "Poisson GLM", "Gamma GLM", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-pricing-glm",
    datasetInfo: { name: "freMTPL2freq & freMTPL2sev", size: "678,013 baris polis", source: "French Motor Third-Party Liability" }
  },
  {
    id: "insurance-underwriting-risk",
    title: "Automated Life Insurance Underwriting",
    domain: "Life Insurance Underwriting",
    category: "Insurance",
    tagline: "8-Class Ordinal Risk Rating via Continuous LightGBM and Nelder-Mead Cutoff Optimization",
    problem: "Proses underwriting asuransi jiwa tradisional memakan waktu 2 hingga 4 minggu karena peninjauan manual 128 riwayat medis calon tertanggung, meningkatkan biaya akuisisi dan risiko nasabah membatalkan pengajuan polis.",
    methodology: "Memperlakukan 8 tingkat keputusan risiko sebagai variabel terurut (ordinal). Model dilatih menggunakan LightGBM Regressor kontinu, kemudian nilai kontinu dipetakan kembali ke 8 kelas diskrit menggunakan optimasi titik potong (cut-off thresholds) algoritma Nelder-Mead simplex yang memaksimalkan Quadratic Weighted Kappa (QWK).",
    findings: [
      "Optimasi ambang batas Nelder-Mead mendongkrak skor QWK dari 0.5639 (Multiclass Softmax) menjadi 0.6495 (Ordinal Cutoff).",
      "Indeks Massa Tubuh (BMI) dan riwayat medis Medical_History_4 dan Medical_History_15 menjadi pendorong utama penetapan kelas risiko tinggi (Response 1-2).",
      "Sebanyak 74% aplikasi dengan prediksi kelas 8 memenuhi syarat Straight-Through Processing (STP) instan tanpa tinjauan medis manual."
    ],
    metrics: [
      { label: "QWK Score", value: "0.6495", desc: "Quadratic Weighted Kappa" },
      { label: "Macro F1", value: "0.2414", desc: "Multiclass Ordinal Balance" },
      { label: "Training Size", value: "59,381", desc: "Total Berkas Aplikasi" }
    ],
    formula: {
      title: "Quadratic Weighted Kappa (QWK)",
      latex: "\\kappa = 1 - \\frac{\\sum_{i,j} w_{ij} O_{ij}}{\\sum_{i,j} w_{ij} E_{ij}}, \\quad w_{ij} = \\frac{(i - j)^2}{(N - 1)^2}",
      explanation: "Memberikan penalti kuadratik yang sangat berat untuk kesalahan prediksi yang jauh dari tingkat risiko sebenarnya."
    },
    codeSnippet: `from src.underwriting_engine import UnderwritingEngine
import pandas as pd

engine = UnderwritingEngine()
sample = pd.read_csv('data/train.csv', nrows=1)
risk_grade = engine.assess_risk(sample)
print(f"Keputusan Underwriting Otomatis: Kelas {risk_grade[0]}")`,
    techStack: ["Python 3.11", "LightGBM", "SHAP XAI", "Scipy Optimize", "Nelder-Mead", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-underwriting-risk",
    datasetInfo: { name: "Prudential Life Insurance Assessment", size: "59,381 baris, 128 fitur", source: "Kaggle Benchmark" }
  },
  {
    id: "indonesian-banks-risk-analytics",
    title: "Indonesian Big Four Banks Financial Risk Analytics",
    domain: "Quantitative Portfolio Finance",
    category: "Banking",
    tagline: "Statistical Risk Profiles, Value at Risk (VaR 95%), Expected Shortfall, and Markowitz Diversification (2015-2026)",
    problem: "Investor institusi dan manajer investasi memerlukan kalibrasi empiris terhadap risiko ekstrim ekor gemuk (fat-tails) dan volatilitas dinamis pada saham perbankan terbesar di Bursa Efek Indonesia (BBCA, BBRI, BMRI, BBNI).",
    methodology: "Transformasi log-return harian, pengujian stasioneritas Augmented Dickey-Fuller (ADF), uji normalitas Jarque-Bera, estimasi non-parametrik Value at Risk (VaR 95%) dan Expected Shortfall (ES 95%), rolling beta 60-hari terhadap indeks tertimbang sama sektoral, dan simulasi portofolio diversifikasi Markowitz.",
    findings: [
      "Semua return emiten bank menolak hipotesis distribusi normal (p-value 0.000) dengan excess kurtosis tinggi (BBCA 7.514), membuktikan fenomena leptokurtik / ekor gemuk.",
      "BBCA mencatatkan Daily VaR 95% terendah (2.28%) dan Expected Shortfall terendah (3.46%) dengan Beta defensif 0.710, bertindak sebagai jangkar portofolio aman (safe haven).",
      "Portofolio Equal-Weighted memangkas Maximum Drawdown menjadi -48.37% (lebih rendah dari drawdown BBCA tunggal -51.79%), membuktikan efektivitas diversifikasi Markowitz."
    ],
    metrics: [
      { label: "BBCA VaR 95%", value: "2.28%", desc: "Batas Rugi Harian 95% CI" },
      { label: "BBCA ES 95%", value: "3.46%", desc: "Rata-rata Kerugian Ekstrim" },
      { label: "Sharpe Ratio", value: "0.211", desc: "Risk-Adjusted Return (Rf=5%)" }
    ],
    formula: {
      title: "Historical Value at Risk & Expected Shortfall",
      latex: "\\text{VaR}_{\\alpha} = -F^{-1}(1-\\alpha), \\quad \\text{ES}_{\\alpha} = -\\frac{1}{1-\\alpha} \\int_0^{1-\\alpha} F^{-1}(p) \\, dp",
      explanation: "VaR menghitung batas kerugian persentil 5%, sedangkan Expected Shortfall mengukur rata-rata kerugian saat ambang VaR terlampaui."
    },
    codeSnippet: `from src.risk_engine import BankRiskEngine

engine = BankRiskEngine()
var_df = engine.calculate_var_es(alpha=0.95)
print("=== Historical VaR & Expected Shortfall (95%) ===")
print(var_df)`,
    techStack: ["Python 3.11", "Statsmodels", "Scipy Stats", "Time Series ADF", "Yahoo Finance API", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/indonesian-banks-risk-analytics",
    demoUrl: "https://izamrosiawan.github.io/indonesian-banks-risk-analytics/",
    datasetInfo: { name: "BEI Big Banks Adjusted Close", size: "2,840 hari perdagangan (2015-2026)", source: "Yahoo Finance Engine" }
  },
  {
    id: "olist-brazilian-ecommerce-analytics",
    title: "Olist E-Commerce RFM Analytics & Supply Chain Logistical Mapping",
    domain: "E-Commerce & Supply Chain Logistics",
    category: "SupplyChain",
    tagline: "Customer Lifetime Segmentation (RFM), Review Score Elasticity, and 9-Table Relational Database Schema",
    problem: "Marketplace skala nasional di negara kepulauan/benua menghadapi tantangan retensi pembeli satu kali (96.8% single-order customers) dan disparitas waktu pengiriman logistik regional.",
    methodology: "Penyusunan basis data relasional 9 tabel (Mermaid ERD), kalkulasi metrik RFM (Recency, Frequency, Monetary) per konsumen unik, agregasi waktu pengiriman aktual vs estimasi per negara bagian, serta pemodelan korelasi linier waktu pengiriman terhadap skor ulasan konsumen.",
    findings: [
      "Terdapat korelasi negatif tajam antara keterlambatan logistik dan ulasan: Pesanan tiba <7 hari memperoleh rata-rata rating 4.6/5.0, sedangkan pesanan >20 hari anjlok ke 1.8/5.0.",
      "Disparitas pengiriman regional sangat masif: Wilayah Tenggara (SP) rata-rata 8.7 hari, sedangkan wilayah Utara terpencil (AM/AP) membutuhkan 25.6 hari.",
      "Kategori Health & Beauty serta Watches & Gifts menyumbang omzet terbesar dengan kontribusi Black Friday November 2017 melonjak 53% bulanan."
    ],
    metrics: [
      { label: "Transactions", value: "100,000+", desc: "Total Pesanan Delivered" },
      { label: "National Delivery", value: "12.3 Days", desc: "Median Pengiriman" },
      { label: "Repeat Purchase", value: "3.12%", desc: "Tingkat Retensi Alami" }
    ],
    formula: {
      title: "Kalkulasi Skor RFM Kuantil",
      latex: "R_i = T_{\\max} - \\max(t_i), \\quad F_i = \\sum_{k} \\mathbb{I}(\\text{delivered}), \\quad M_i = \\sum_{k} \\text{Payment Value}_k",
      explanation: "Menghitung hari sejak transaksi terakhir (R), frekuensi pesanan (F), dan total nilai uang riil (M) per pelanggan."
    },
    codeSnippet: `from src.rfm_engine import OlistRFMEngine
import pandas as pd

engine = OlistRFMEngine()
df_orders = pd.read_csv('data/olist_orders_dataset.csv')
df_payments = pd.read_csv('data/olist_order_payments_dataset.csv')
rfm = engine.calculate_rfm(df_orders, df_payments)
print(f"Total Pelanggan Tersegmentasi: {len(rfm):,}")`,
    techStack: ["Python 3.11", "Pandas", "Mermaid ERD", "Seaborn 300 DPI", "Pytest", "SQLite"],
    githubUrl: "https://github.com/izamrosiawan/olist-brazilian-ecommerce-analytics",
    demoUrl: "https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/",
    datasetInfo: { name: "Olist Brazilian E-Commerce Dataset", size: "9 Tabel Relasional, 100k Pesanan", source: "Kaggle Public Marketplace" }
  },
  {
    id: "smart-mustahik",
    title: "SMART-MUSTAHIK: Decision Support for Precision Zakat Allocation",
    domain: "Applied Socio-Economic ML",
    category: "PublicPolicy",
    tagline: "Zero-Leakage Spatial Targeting using Had Kifayah and BPS Macro Indicators (QS. At-Taubah: 60)",
    problem: "Lembaga pengelola zakat menghadapi inefisiensi penyaluran akibat data lapangan yang bias, menimbulkan Inclusion Error (salah sasaran ke non-mustahik) dan Exclusion Error (fakir miskin terlewat).",
    methodology: "Memodelkan data makro sosio-ekonomi BPS Jawa Timur (2020-2024, 38 kabupaten/kota, 190 observasi) menggunakan Random Forest Classifier. Menerapkan protokol audit zero-leakage dengan mengeliminasi fitur yang membentuk target secara aljabar langsung dan memvalidasi model terhadap baseline simulasi noise.",
    findings: [
      "SMART-MUSTAHIK mencapai Akurasi 87.50% dan Presisi 73.33% (+8.62 pp dibanding pendekatan konvensional).",
      "Inclusion Error Rate (salah sasaran) berhasil ditekan dari 17.14% menjadi 11.43% (efisiensi alokasi dana zakat naik 5.71%).",
      "Akses sanitasi layak dan indeks pembangunan manusia (IPM) menjadi fitur prediktor terkuat dalam membedakan mustahik produktif."
    ],
    metrics: [
      { label: "Accuracy", value: "87.50%", desc: "Akurasi Klasifikasi Uji" },
      { label: "Precision", value: "73.33%", desc: "Ketepatan Sasaran Mustahik" },
      { label: "IER Reduction", value: "-5.71 pp", desc: "Penurunan Salah Sasaran" }
    ],
    formula: {
      title: "Inclusion & Exclusion Error Rate",
      latex: "\\text{IER} = \\frac{\\text{False Positive}}{\\text{Total Predicted Positive}}, \\quad \\text{EER} = \\frac{\\text{False Negative}}{\\text{Total Actual Positive}}",
      explanation: "Mengukur proporsi dana zakat yang terbuang ke pihak yang tidak berhak (IER) dan proporsi fakir miskin yang terabaikan (EER)."
    },
    codeSnippet: `from src.mustahik_engine import SmartMustahikClassifier

engine = SmartMustahikClassifier()
# Zero-leakage spatial classification
priority_districts = engine.predict_priority(sample_district_data)`,
    techStack: ["Python 3.11", "Scikit-Learn", "Zero-Leakage AST", "Random Forest", "Pytest", "BPS Data"],
    githubUrl: "https://github.com/izamrosiawan/smart-mustahik",
    datasetInfo: { name: "BPS Jawa Timur Macro Data 2020-2024", size: "38 Kabupaten/Kota, 190 Observasi", source: "Badan Pusat Statistik" }
  },
  {
    id: "campus-id",
    title: "Indonesian Higher Education Academic Analytics (Campus-ID)",
    domain: "Higher Education Analytics",
    category: "PublicPolicy",
    tagline: "Lecturer-Student Sufficiency Ratios, SNBT Competition Index, and Tuition (UKT) Distributions",
    problem: "Asimetri informasi dalam seleksi masuk perguruan tinggi negeri (SNBT) menyebabkan calon mahasiswa kesulitan mengukur rasio keketatan prodi dan mutu interaksi akademik institusi.",
    methodology: "Data pipeline ekstraksi terprogram dari data repositori universitas dan program studi. Menghitung rasio pengajaran dosen terhadap mahasiswa per institusi dan rasio keketatan persaingan seleksi masuk per program studi (peminat per daya tampung).",
    findings: [
      "Sebagian besar PTN-BH unggulan (ITB 1:20.8, UNAIR 1:21.5, UI 1:22.6) memenuhi batas rasio ideal pengajaran (1:30).",
      "Program studi Sains Data dan Teknik Informatika mencatatkan rasio keketatan tertinggi dengan tingkat penerimaan di bawah 3%.",
      "Sebaran batas atas UKT bervariasi luas antara Rp 6.5 juta hingga Rp 15 juta per semester pada kelompok saintek."
    ],
    metrics: [
      { label: "Universities", value: "8 Kampus", desc: "Sampel Teranalisis" },
      { label: "Provinces", value: "38 Wilayah", desc: "Cakupan Nasional" },
      { label: "Pipeline", value: "JSON & CSV", desc: "Dual Format Export" }
    ],
    formula: {
      title: "Rasio Keketatan Seleksi & Rasio Dosen",
      latex: "K_{\\text{SNBT}} = \\frac{N_{\\text{peminat}}}{N_{\\text{daya tampung}}}, \\quad R_{\\text{dosen}} = \\frac{N_{\\text{mahasiswa}}}{N_{\\text{dosen}}}",
      explanation: "Mengukur jumlah persaingan peminat per satu kursi daya tampung dan beban kecukupan dosen."
    },
    codeSnippet: `from src.campus_analytics import CampusAnalytics

analytics = CampusAnalytics()
df_prodi = analytics.process_study_programs()
print(f"Total Program Studi Terolah: {len(df_prodi)}")`,
    techStack: ["Python 3.11", "Pandas", "JSON Pipeline", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/campus-id",
    datasetInfo: { name: "Campus-ID Academic Statistics", size: "Universitas & Program Studi Nasional", source: "Kemendikbudristek & SNPMB" }
  },
  {
    id: "asean-economic-recovery",
    title: "ASEAN Economic Recovery Analytics",
    domain: "Macro-Economic Analysis",
    category: "PublicPolicy",
    tagline: "Post-Pandemic Macro-Indicator Forecasting and Tourism Revival Modeling",
    problem: "Ketidakpastian pemulihan ekonomi kawasan ASEAN pasca-pandemi memerlukan pemodelan indikator makro yang akurat untuk kebijakan fiskal.",
    methodology: "Analisis deret waktu indikator makro ekonomi ASEAN menggunakan model ARIMA dan SARIMA untuk peramalan PDB dan sektor pariwisata.",
    findings: [
      "Sektor pariwisata ASEAN menunjukkan tren pemulihan V-shape yang konsisten di tahun 2024.",
      "Korelasi kuat antara peningkatan konektivitas penerbangan dengan devisa sektor jasa."
    ],
    metrics: [
      { label: "Growth", value: "5.2%", desc: "Proyeksi Pertumbuhan" }
    ],
    formula: {
      title: "Macroeconomic Forecasting",
      latex: "\\Delta y_t = \\alpha + \\phi \\Delta y_{t-1} + \\epsilon_t",
      explanation: "Model autoregresif untuk memprediksi perubahan indikator ekonomi."
    },
    codeSnippet: `from src.campus_analytics import CampusAnalytics

analytics = CampusAnalytics()
df_prodi = analytics.process_study_programs()
print(f"Total Program Studi Terolah: {len(df_prodi)}")`,
    techStack: ["Python 3.11", "Pandas", "Econometric Forecasting", "Matplotlib", "Time Series", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/asean-economic-recovery",
    demoUrl: "https://izamrosiawan.github.io/asean-economic-recovery/",
    datasetInfo: { name: "ASEAN Inbound Tourism & Macro Indicators", size: "10 Negara Anggota (2019-2027F)", source: "UNWTO & ASEAN Stats" }
  },
  {
    id: "supply-chain-demand-forecasting",
    title: "Supply Chain Demand Forecasting & Inventory Reorder Optimization",
    domain: "Operations & Demand Planning",
    category: "SupplyChain",
    tagline: "Seasonal Time Series Decomposition (SARIMA), Safety Stock Buffering, and Reorder Point (ROP) Automation",
    problem: "Ketidakakuratan peramalan permintaan memicu efek Bullwhip Effect, mengakibatkan penumpukan biaya simpan berlebih (excess holding cost) atau kerugian akibat kehabisan persediaan (stockout).",
    methodology: "Pembersihan deret waktu pesanan agregat bulanan, dekomposisi komponen tren dan musiman, pemodelan peramalan deret waktu SARIMA dan Gradient Boosting, serta perumusan stok pengaman stokastik berbasis deviasi lead time pemasok.",
    findings: [
      "Permintaan produk memiliki pola musiman berulang dengan lonjakan puncak konsisten pada Kuartal 4 (November-Desember).",
      "Model peramalan SARIMA mencapai tingkat kesalahan MAPE di bawah 12%, memberikan kepastian jadwal pengadaan bahan baku.",
      "Penerapan formula ROP otomatis mampu mereduksi risiko stockout sebesar 35% tanpa menaikkan rata-rata level persediaan."
    ],
    metrics: [
      { label: "Forecast MAPE", value: "< 12%", desc: "Tingkat Kesalahan Prediksi" },
      { label: "Service Level", value: "95.0%", desc: "Faktor Z = 1.645" },
      { label: "Horizon", value: "Monthly", desc: "Agregasi Deret Waktu" }
    ],
    formula: {
      title: "Safety Stock & Reorder Point (ROP)",
      latex: "\\text{ROP} = (d \\times L) + Z \\sqrt{L \\sigma_D^2 + D^2 \\sigma_L^2}",
      explanation: "Batas persediaan di mana pemesanan ulang harus diterbitkan dengan memperhitungkan variabilitas lead time dan variabilitas permintaan."
    },
    codeSnippet: `from src.forecaster import SupplyChainForecaster

forecaster = SupplyChainForecaster()
monthly_demand = forecaster.aggregate_monthly_demand()
print(monthly_demand.tail())`,
    techStack: ["Python 3.11", "Statsmodels", "Time Series SARIMA", "Pandas", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/supply-chain-demand-forecasting",
    datasetInfo: { name: "Historical Product Demand Dataset", size: "Riwayat Pesanan Multi-Gudang", source: "Supply Chain Kaggle" }
  },
  {
    id: "mlp-vs-random-forest-breast-cancer",
    title: "Breast Cancer Diagnosis: Neural Network MLP vs Random Forest",
    domain: "Oncology Diagnostic AI",
    category: "Healthcare",
    tagline: "Comparative Evaluation of Multilayer Perceptron and Random Forest with SMOTE Resampling Analysis",
    problem: "Diagnosis dini kanker payudara membutuhkan presisi yang sangat tinggi untuk mengeliminasi kesalahan diagnosis positif palsu yang membebani pasien dengan tindakan biopsi yang tidak perlu.",
    methodology: "Pra-pemrosesan 9 fitur klinis citra sel tumor (StandardScaler), pelatihan arsitektur Multilayer Perceptron (16-8 hidden units) dan Random Forest, serta pengujian dampak oversampling SMOTE terhadap metrik Recall dan Precision.",
    findings: [
      "MLP tanpa SMOTE menghasilkan performa klinis paling ideal: Akurasi 97.08%, Presisi 100.00%, Recall 91.67%, dan F1-Score 95.65%.",
      "Penerapan SMOTE tidak meningkatkan performa secara signifikan karena rasio kelas asli dataset Wisconsin sudah relatif berimbang.",
      "Presisi 100% pada MLP menjamin nol kasus salah vonis tumor jinak sebagai ganas pada data uji."
    ],
    metrics: [
      { label: "MLP Accuracy", value: "97.08%", desc: "Akurasi Klasifikasi Uji" },
      { label: "MLP Precision", value: "100.00%", desc: "Nol False Positive Diagnosis" },
      { label: "MLP F1-Score", value: "95.65%", desc: "Keseimbangan Diagnostik" }
    ],
    formula: {
      title: "Forward Propagation Multilayer Perceptron",
      latex: "z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = \\text{ReLU}(z^{[l]}), \\quad \\hat{y} = \\sigma(z^{[L]})",
      explanation: "Transformasi linear terbobot dan fungsi aktivasi non-linear lapis demi lapis dalam jaringan saraf tiruan."
    },
    codeSnippet: `from src.cancer_mlp_engine import BreastCancerMLPEngine
import pandas as pd

engine = BreastCancerMLPEngine()
# Training and clinical inference
preds = engine.predict(sample_features)`,
    techStack: ["Python 3.11", "Scikit-Learn", "Neural Networks MLP", "SMOTE", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer",
    datasetInfo: { name: "Breast Cancer Wisconsin Dataset", size: "699 Sampel Klinis, 9 Fitur", source: "UCI Machine Learning Repository" }
  },
  {
    id: "fastapi-house-price-predictor",
    title: "Production House Price Predictor Web Service (FastAPI & Pydantic v2)",
    domain: "MLOps & Microservices",
    category: "Systems",
    tagline: "Real-Time REST API Inference Service with Strict Pydantic v2 Validation and Swagger Documentation",
    problem: "Banyak model machine learning terhenti di tahap notebook eksploratif dan tidak pernah diubah menjadi layanan web service yang siap dikonsumsi oleh aplikasi komersial dengan latensi rendah.",
    methodology: "Membangun microservice REST API menggunakan framework FastAPI dan Uvicorn. Validasi skema input menggunakan Pydantic v2 (model_dump), deserialisasi model linear regression dan scaler ter-serialize (.pkl), serta automated endpoint testing menggunakan TestClient.",
    findings: [
      "Latensi respon inferensi rata-rata di bawah 15 milidetik untuk skenario request konkuren tunggal.",
      "Validasi tipe data Pydantic v2 secara otomatis menolak request payload yang tidak sesuai sebelum masuk ke model ML.",
      "Dokumentasi interaktif OpenAPI / Swagger UI (/docs) terintegrasi langsung untuk memudahkan integrasi frontend."
    ],
    metrics: [
      { label: "Inference Latency", value: "< 15 ms", desc: "Response Time Endpoint" },
      { label: "Framework", value: "FastAPI", desc: "Asynchronous ASGI" },
      { label: "Validation", value: "Pydantic v2", desc: "Strict Type Safety" }
    ],
    formula: {
      title: "Skema Inferensi Linear Regression Scaled",
      latex: "\\widehat{\\text{Price}} = \\beta_0 + \\sum_{j=1}^p \\beta_j \\left(\\frac{x_j - \\mu_j}{\\sigma_j}\\right)",
      explanation: "Inferensi harga properti berbasis fitur ternormalisasi menggunakan koefisien model regresi terlatih."
    },
    codeSnippet: `import requests

payload = {
    "luas_tanah": 150.0, "luas_bangunan": 100.0,
    "jumlah_kamar": 3, "jumlah_kamar_mandi": 2,
    "jarak_pusat_kota": 5.0
}
res = requests.post("http://127.0.0.1:8000/predict", json=payload)
print(res.json())`,
    techStack: ["FastAPI", "Uvicorn", "Pydantic v2", "Scikit-Learn", "TestClient", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/fastapi-house-price-predictor",
    datasetInfo: { name: "Residential Housing Features", size: "Fitur Properti Perumahan", source: "Kaggle Real Estate" }
  }
];
