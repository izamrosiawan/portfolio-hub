export interface Project {
  id: string;
  title: string;
  domain: string;
  category: "Insurance" | "Banking" | "SupplyChain" | "PublicPolicy" | "Healthcare" | "Systems";
  summary: string;
  metrics: { label: string; value: string }[];
  formula?: string;
  techStack: string[];
  githubUrl: string;
  dataset: string;
  hasTests: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "insurance-pricing-glm",
    title: "Motor Insurance Pure Premium Pricing (GLM & Tweedie)",
    domain: "Actuarial Science & Pricing",
    category: "Insurance",
    summary: "Pemodelan premi murni asuransi kendaraan memisahkan Poisson GLM (Claim Frequency) dan Gamma GLM (Claim Severity) dibandingkan Tweedie GLM compound Poisson-gamma.",
    metrics: [
      { label: "Gini Index", value: "0.2882" },
      { label: "Gamma Deviance", value: "1.8420" },
      { label: "Poisson Deviance", value: "0.4102" }
    ],
    formula: "E[Y] = E[N] \\times E[Z] = \\exp(X_1 \\beta_1) \\times \\exp(X_2 \\beta_2)",
    techStack: ["Python", "Statsmodels", "Scikit-Learn", "Pytest", "MLOps"],
    githubUrl: "https://github.com/izamrosiawan/insurance-pricing-glm",
    dataset: "freMTPL2freq & freMTPL2sev (678k rows)",
    hasTests: true
  },
  {
    id: "insurance-underwriting-risk",
    title: "Automated Life Insurance Underwriting & Ordinal Risk Rating",
    domain: "Life Insurance Underwriting",
    category: "Insurance",
    summary: "Sistem otomasi penilaian risiko underwriting 8 tingkat (Response 1-8) menggunakan continuous LightGBM yang dioptimasi ambang batasnya via Nelder-Mead simplex.",
    metrics: [
      { label: "QWK Score", value: "0.6495" },
      { label: "Baseline QWK", value: "-0.0125" },
      { label: "Dataset Rows", value: "59,381" }
    ],
    formula: "\\kappa = 1 - \\frac{\\sum w_{ij} O_{ij}}{\\sum w_{ij} E_{ij}}, \\quad w_{ij} = \\frac{(i-j)^2}{(N-1)^2}",
    techStack: ["Python", "LightGBM", "SHAP XAI", "Scipy Optimize", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-underwriting-risk",
    dataset: "Prudential Life Insurance (128 features)",
    hasTests: true
  },
  {
    id: "insurance-claims-fraud-detection",
    title: "Auto Insurance Claims Fraud Detection & Cost-Sensitive Learning",
    domain: "Fraud Analytics & SIU",
    category: "Insurance",
    summary: "Deteksi penipuan klaim asuransi mobil berbasis LightGBM dengan penanganan ketidakseimbangan kelas untuk memprioritaskan investigasi Special Investigation Unit (SIU).",
    metrics: [
      { label: "PR-AUC", value: "0.5248" },
      { label: "ROC-AUC", value: "0.8215" },
      { label: "Fraud Ratio", value: "24.7%" }
    ],
    formula: "\\text{PR-AUC} = \\int_0^1 P(R) \\, dR",
    techStack: ["Python", "LightGBM", "Random Forest", "SHAP", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-claims-fraud-detection",
    dataset: "Auto Insurance Claims (1,000 cases)",
    hasTests: true
  },
  {
    id: "insurance-cross-sell-propensity",
    title: "Health-to-Vehicle Insurance Cross-Sell Propensity Modeling",
    domain: "Propensity Marketing",
    category: "Insurance",
    summary: "Model skor kecenderungan pembelian asuransi kendaraan untuk nasabah asuransi kesehatan. Top 30% kontak berhasil menangkap 79.16% total konversi penjualan.",
    metrics: [
      { label: "Top Decile Lift", value: "3.23x" },
      { label: "ROC-AUC", value: "0.8579" },
      { label: "Capture Rate", value: "79.16%" }
    ],
    formula: "\\text{Lift} = \\frac{\\text{Conv Rate in Decile } k}{\\text{Overall Conv Rate}}",
    techStack: ["Python", "LightGBM", "Uplift Analytics", "SHAP", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-cross-sell-propensity",
    dataset: "Health Cross-Sell (381k rows)",
    hasTests: true
  },
  {
    id: "insurance-customer-lifetime-value",
    title: "Customer Lifetime Value (CLV) & Policy Renewal Analytics",
    domain: "Customer Economics & Retention",
    category: "Insurance",
    summary: "Prediksi nilai seumur hidup nasabah dan optimasi pembaruan polis asuransi mobil menggunakan Random Forest Regressor dengan target transformasi logaritmik.",
    metrics: [
      { label: "R-Squared", value: "0.6784" },
      { label: "RMSE", value: "$4,071" },
      { label: "MAE", value: "$1,409" }
    ],
    formula: "\\tilde{y} = \\log(1 + \\text{CLV}), \\quad \\widehat{\\text{CLV}} = \\exp(\\hat{y}) - 1",
    techStack: ["Python", "Random Forest", "LightGBM", "SHAP", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-customer-lifetime-value",
    dataset: "IBM Watson Marketing (9,134 rows)",
    hasTests: true
  },
  {
    id: "indonesian-banks-risk-analytics",
    title: "Indonesian Big Four Banks Financial Risk & Quantitative Valuation",
    domain: "Quantitative Finance",
    category: "Banking",
    summary: "Analisis profil risiko, Value at Risk (VaR 95%), Expected Shortfall, uji stasioneritas ADF, dan simulasi portofolio diversifikasi Markowitz pada saham BBCA, BBRI, BMRI, BBNI (2015-2026).",
    metrics: [
      { label: "BBCA VaR 95%", value: "2.28%" },
      { label: "Portfolio MDD", value: "-48.37%" },
      { label: "Trading Days", value: "2,840" }
    ],
    formula: "\\text{VaR}_\\alpha = -F^{-1}(1-\\alpha), \\quad \\text{ES}_\\alpha = -E[R \\mid R \\le -\\text{VaR}_\\alpha]",
    techStack: ["Python", "Statsmodels", "Scipy", "Time Series", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/indonesian-banks-risk-analytics",
    dataset: "Yahoo Finance Historical Prices",
    hasTests: true
  },
  {
    id: "stock-price-simulation-jsmr",
    title: "PT Jasa Marga Tbk (JSMR) Monte Carlo Geometric Brownian Motion",
    domain: "Stochastic Modeling",
    category: "Banking",
    summary: "Simulasi stokastik pergerakan harga saham JSMR menggunakan 1.000 lintasan Geometric Brownian Motion (GBM) untuk mengestimasi distribusi probabilitas harga masa depan.",
    metrics: [
      { label: "Simulations", value: "1,000 Paths" },
      { label: "Horizon", value: "252 Days" },
      { label: "Model", value: "SDE GBM" }
    ],
    formula: "S_{t+\\Delta t} = S_t \\exp\\left(\\left(\\mu - \\frac{\\sigma^2}{2}\\right)\\Delta t + \\sigma \\sqrt{\\Delta t} Z\\right)",
    techStack: ["Python", "NumPy", "Monte Carlo", "Scipy", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/stock-price-simulation-jsmr",
    dataset: "JSMR Historical Daily Price",
    hasTests: true
  },
  {
    id: "olist-brazilian-ecommerce-analytics",
    title: "Olist E-Commerce RFM Analytics & Multi-Table Relational Pipeline",
    domain: "E-Commerce & Logistics",
    category: "SupplyChain",
    summary: "Segmentasi pelanggan RFM, pemodelan kepuasan review score logistik antar negara bagian, dan visualisasi diagram ERD 9 tabel relasional pada 100k transaksi Olist Brasil.",
    metrics: [
      { label: "Orders", value: "100,000+" },
      { label: "Avg Delivery", value: "12.5 Days" },
      { label: "Tables", value: "9 Relational" }
    ],
    formula: "R_i = T_{\\max} - \\max(t_i), \\quad F_i = \\sum \\text{orders}, \\quad M_i = \\sum \\text{value}",
    techStack: ["Python", "Pandas", "Mermaid ERD", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/olist-brazilian-ecommerce-analytics",
    dataset: "Olist Brazilian E-Commerce",
    hasTests: true
  },
  {
    id: "supply-chain-demand-forecasting",
    title: "Supply Chain Demand Forecasting & Inventory Optimization (ROP)",
    domain: "Operations & Supply Chain",
    category: "SupplyChain",
    summary: "Peramalan permintaan produk dengan dekomposisi deret waktu musiman (SARIMA) serta kalkulasi stok pengaman dinamis (Safety Stock) dan Titik Pemesanan Ulang (ROP).",
    metrics: [
      { label: "Forecast MAPE", value: "< 12%" },
      { label: "Service Level", value: "95% (Z=1.645)" },
      { label: "Horizon", value: "Monthly" }
    ],
    formula: "\\text{ROP} = (d \\times L) + Z \\sqrt{L \\sigma_D^2 + D^2 \\sigma_L^2}",
    techStack: ["Python", "Statsmodels", "Time Series", "Pandas", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/supply-chain-demand-forecasting",
    dataset: "Historical Product Demand",
    hasTests: true
  },
  {
    id: "smart-mustahik",
    title: "SMART-MUSTAHIK: Zero-Leakage Decision Support for Zakat Allocation",
    domain: "Islamic Philanthropy AI",
    category: "PublicPolicy",
    summary: "Sistem pendukung keputusan alokasi zakat produktif vs konsumtif berbasis QS. At-Taubah: 60 menggunakan Random Forest Classifier tanpa kebocoran target sosio-ekonomi.",
    metrics: [
      { label: "Accuracy", value: "87.50%" },
      { label: "IER Reduction", value: "-5.71 pp" },
      { label: "Recall", value: "84.62%" }
    ],
    formula: "\\text{IER} = \\frac{\\text{FP}}{\\text{Total Predicted}}, \\quad \\text{EER} = \\frac{\\text{FN}}{\\text{Total Actual}}",
    techStack: ["Python", "Scikit-Learn", "Zero-Leakage", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/smart-mustahik",
    dataset: "BPS Jawa Timur 2020-2024 (190 obs)",
    hasTests: true
  },
  {
    id: "campus-id",
    title: "Indonesian Higher Education Analytics & SNBT Competition Ratios",
    domain: "Higher Education Analytics",
    category: "PublicPolicy",
    summary: "Pemetaan mutu rasio dosen-mahasiswa, tingkat keketatan seleksi SNBT prodi per perguruan tinggi negeri, dan sebaran Uang Kuliah Tunggal (UKT) di Indonesia.",
    metrics: [
      { label: "Universities", value: "8 PTN/PTS" },
      { label: "Provinces", value: "38 Wilayah" },
      { label: "Export", value: "JSON & CSV" }
    ],
    formula: "R_{\\text{dosen}} = \\frac{N_{\\text{mhs}}}{N_{\\text{dosen}}}, \\quad K_{\\text{SNBT}} = \\frac{N_{\\text{peminat}}}{N_{\\text{kuota}}}",
    techStack: ["Python", "Pandas", "JSON Pipeline", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/campus-id",
    dataset: "Campus-ID Academic Dataset",
    hasTests: true
  },
  {
    id: "asean-economic-recovery",
    title: "ASEAN Post-Pandemic Economic Recovery & Tourism Forecasting",
    domain: "Macroeconomics Analytics",
    category: "PublicPolicy",
    summary: "Studi analitik komparatif lintasan pemulihan indikator PDB makro dan arus kedatangan wisatawan mancanegara pada 10 negara anggota ASEAN (2019-2027F).",
    metrics: [
      { label: "Nations", value: "10 ASEAN" },
      { label: "Full Recovery", value: "2025F" },
      { label: "Horizon", value: "2019 - 2027F" }
    ],
    formula: "\\text{Recovery Rate}_t = \\left(\\frac{Y_t}{Y_{2019}}\\right) \\times 100\\%",
    techStack: ["Python", "Pandas", "Time Series", "Matplotlib", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/asean-economic-recovery",
    dataset: "ASEAN Macroeconomic Statistics",
    hasTests: true
  },
  {
    id: "mlp-vs-random-forest-breast-cancer",
    title: "Breast Cancer Diagnosis: Neural Network MLP vs Random Forest",
    domain: "Healthcare Oncology AI",
    category: "Healthcare",
    summary: "Deteksi tumor jinak vs ganas pada Breast Cancer Wisconsin dataset membandingkan Multilayer Perceptron neural network dan Random Forest dengan evaluasi dampak SMOTE.",
    metrics: [
      { label: "MLP Accuracy", value: "97.08%" },
      { label: "MLP Precision", value: "100.00%" },
      { label: "MLP F1-Score", value: "95.65%" }
    ],
    formula: "z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = \\sigma(z^{[l]})",
    techStack: ["Python", "Scikit-Learn", "Neural Networks", "SMOTE", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer",
    dataset: "UCI Breast Cancer Wisconsin",
    hasTests: true
  },
  {
    id: "principal-component-analysis-clustering",
    title: "Lifestyle & Obesity Profiling via PCA Dimensionality Reduction",
    domain: "Unsupervised Healthcare ML",
    category: "Healthcare",
    summary: "Reduksi dimensi 15 variabel antropometrik & gaya hidup menjadi komponen utama (PCA) dilanjutkan dengan segmentasi 4 klaster individu menggunakan K-Means.",
    metrics: [
      { label: "Samples", value: "2,087 Individuals" },
      { label: "Clusters", value: "4 Distinct Profiles" },
      { label: "Algorithm", value: "PCA + K-Means" }
    ],
    formula: "J = \\sum_{j=1}^k \\sum_{i \\in S_j} ||x_i - \\mu_j||^2",
    techStack: ["Python", "Scikit-Learn", "PCA", "K-Means", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/principal-component-analysis-clustering",
    dataset: "UCI Obesity & Lifestyle Data",
    hasTests: true
  },
  {
    id: "multiple-linear-regression-for-fuel-efficiency-analysis",
    title: "Automotive Fuel Efficiency Analysis (Auto MPG Econometrics)",
    domain: "Econometrics & Automotive ML",
    category: "Healthcare",
    summary: "Model regresi berganda OLS untuk membedah pengaruh bobot bodi, displacement, dan tenaga kuda terhadap konsumsi bahan bakar beserta uji multikolinearitas VIF.",
    metrics: [
      { label: "R-Squared", value: "0.8180" },
      { label: "VIF Check", value: "Passed (< 10)" },
      { label: "Key Predictor", value: "Weight (r=-0.83)" }
    ],
    formula: "\\text{MPG} = \\beta_0 + \\beta_1 \\text{Cyl} + \\beta_2 \\text{Disp} + \\beta_3 \\text{HP} + \\beta_4 \\text{Weight} + \\epsilon",
    techStack: ["Python", "Scikit-Learn", "Statsmodels", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/multiple-linear-regression-for-fuel-efficiency-analysis",
    dataset: "Auto MPG Automotive Dataset",
    hasTests: true
  },
  {
    id: "analysis-and-prediction-of-titanic-passenger-survival",
    title: "Titanic Passenger Survival Classification & Demographics",
    domain: "Classical Classification",
    category: "Healthcare",
    summary: "Analisis probabilitas kelangsungan hidup penumpang kapal Titanic berdasarkan kelas kabin, usia, gender, dan tarif tiket menggunakan Random Forest Classifier.",
    metrics: [
      { label: "Algorithm", value: "Random Forest" },
      { label: "Validation", value: "Stratified K-Fold" },
      { label: "Pipeline", value: "End-to-End" }
    ],
    formula: "\\hat{y} = \\text{mode}\\{h_1(x), h_2(x), \\dots, h_B(x)\\}",
    techStack: ["Python", "Scikit-Learn", "Feature Engineering", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/analysis-and-prediction-of-titanic-passenger-survival",
    dataset: "Titanic Survival Dataset",
    hasTests: true
  },
  {
    id: "fastapi-house-price-predictor",
    title: "Production House Price Predictor Web Service (FastAPI & Pydantic v2)",
    domain: "MLOps & Backend Engineering",
    category: "Systems",
    summary: "Layanan web service REST API inferensi harga rumah real-time dengan skema validasi tipe data Pydantic v2, Swagger UI docs, dan test suite TestClient.",
    metrics: [
      { label: "Framework", value: "FastAPI 0.100+" },
      { label: "Latency", value: "< 15ms" },
      { label: "Validation", value: "Pydantic v2" }
    ],
    formula: "\\text{Price} = \\beta^T X_{\\text{scaled}} + \\text{intercept}",
    techStack: ["FastAPI", "Uvicorn", "Pydantic v2", "Scikit-Learn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/fastapi-house-price-predictor",
    dataset: "Residential Property Features",
    hasTests: true
  },
  {
    id: "spotify-tracks-analysis",
    title: "Spotify Tracks Audio Features Profiling & Hit Predictor",
    domain: "Audio Signal Analytics",
    category: "Systems",
    summary: "Eksplorasi sinyal audio musik (danceability, energy, loudness, valence) pada 114k trek dari 125 genre musik untuk segmentasi klaster lagu dan profiling popularitas.",
    metrics: [
      { label: "Tracks", value: "114,000+" },
      { label: "Genres", value: "125 Categories" },
      { label: "Clustering", value: "K-Means Audio" }
    ],
    formula: "z_i = \\frac{x_i - \\mu_i}{\\sigma_i}",
    techStack: ["Python", "Pandas", "Scikit-Learn", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/spotify-tracks-analysis",
    dataset: "Spotify Audio Features (114k rows)",
    hasTests: true
  },
  {
    id: "cic-music-player",
    title: "CIC Music Player: Desktop Audio GUI & Graph Node Structures",
    domain: "Desktop Software Architecture",
    category: "Systems",
    summary: "Aplikasi pemutar musik desktop modern dengan CustomTkinter dan Pygame Audio Mixer yang mengimplementasikan struktur data Doubly Linked List / Hierarchical Graph Nodes.",
    metrics: [
      { label: "GUI Engine", value: "CustomTkinter" },
      { label: "Audio Backend", value: "Pygame Mixer" },
      { label: "Architecture", value: "Node Graph" }
    ],
    formula: "\\text{Node}_{\\text{song}} = (\\text{ID}, \\text{Title}, \\text{Duration}, \\text{Next})",
    techStack: ["Python", "CustomTkinter", "Pygame", "Linked Nodes", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/cic-music-player",
    dataset: "Local Audio Media Library",
    hasTests: true
  },
  {
    id: "ai-research-os",
    title: "AI Research OS: Academic Rigor & ML Pipeline Automation Engine",
    domain: "Research Automation & MLOps",
    category: "Systems",
    summary: "Operating system dan CLI toolkit otomatisasi riset untuk verifikasi sitasi 1-to-1 BibTeX, audit data leakage kode ML, kalkulasi statistical power, dan formatting LaTeX Booktabs.",
    metrics: [
      { label: "Tools", value: "12 CLI Tools" },
      { label: "Integrity", value: "AST Verification" },
      { label: "Audits", value: "BibTeX & Leakage" }
    ],
    formula: "\\text{Power} = 1 - \\beta = \\Phi\\left(\\frac{d \\sqrt{N}}{2} - Z_{1-\\alpha/2}\\right)",
    techStack: ["Python", "AST Parsing", "BibTeX", "LaTeX", "CLI Tooling"],
    githubUrl: "https://github.com/izamrosiawan/ai-research-os",
    dataset: "Academic Research Metadata",
    hasTests: true
  }
];
