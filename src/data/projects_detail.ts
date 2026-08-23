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
    title: "Motor Insurance Pure Premium Pricing (GLM & Tweedie)",
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
print(f"Tarif Premi Murni: Rp {pure_premium[0]:,.2f}")`,
    techStack: ["Python 3.11", "Statsmodels", "Scikit-Learn", "Tweedie GLM", "Lorenz Curve", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-pricing-glm",
    datasetInfo: { name: "French Motor Third-Party Liability (freMTPL2)", size: "678,013 Polis Frekuensi & 24,944 Klaim Severitas", source: "OpenML / French Actuaries" }
  },
  {
    id: "insurance-underwriting-risk",
    title: "Automated Life Insurance Underwriting & Ordinal Risk Rating",
    domain: "Life Insurance Underwriting",
    category: "Insurance",
    tagline: "8-Level Ordinal Risk Assessment via Continuous LightGBM and Nelder-Mead Cutoff Optimization",
    problem: "Proses underwriting asuransi jiwa manual memerlukan tinjauan medis yang lambat. Model klasifikasi standar sering memperlakukan kelas 1 dan 8 sama seperti kelas yang berdekatan, padahal kesalahan prediksi ekstrem berisiko fatal terhadap solvabilitas.",
    methodology: "Memformulasikan penilaian risiko ordinal sebagai regresi kontinu menggunakan LightGBM Regressor dengan loss function MSE, kemudian mengoptimasi 7 titik ambang batas (thresholds) secara simultan menggunakan algoritma Nelder-Mead simplex yang memaksimalkan Quadratic Weighted Kappa (QWK).",
    findings: [
      "Model continuous LightGBM yang dioptimasi ambang batasnya mencapai skor QWK 0.6495, melampaui baseline random noise (-0.0125).",
      "Fitur BMI, riwayat medis keluarga (Family_Hist), dan Product_Info_4 menjadi kontributor utama keputusan underwriting berdasarkan analisis nilai SHAP.",
      "Optimasi ambang batas Nelder-Mead meningkatkan QWK sebesar +14.2% dibandingkan pemotongan kuantil merata."
    ],
    metrics: [
      { label: "QWK Score", value: "0.6495", desc: "Quadratic Weighted Kappa" },
      { label: "Baseline QWK", value: "-0.0125", desc: "Simulasi Random Label Noise" },
      { label: "Training Size", value: "59,381", desc: "Total Aplikasi Asuransi Jiwa" }
    ],
    formula: {
      title: "Quadratic Weighted Kappa (QWK)",
      latex: "\\kappa = 1 - \\frac{\\sum_{i,j} w_{ij} O_{ij}}{\\sum_{i,j} w_{ij} E_{ij}}, \\quad w_{ij} = \\frac{(i - j)^2}{(N - 1)^2}",
      explanation: "Memberikan penalti kuadratik yang sangat berat untuk kesalahan prediksi yang jauh dari tingkat risiko sebenarnya."
    },
    codeSnippet: `from src.underwriting_engine import UnderwritingEngine
import pandas as pd

engine = UnderwritingEngine()
application = pd.DataFrame([{
    'BMI': 28.4, 'Age': 42, 'Family_Hist_1': 1,
    'Medical_History_1': 2, 'Employment_Info_1': 0.8
}])
risk_grade = engine.predict_risk_class(application)
print(f"Rekomendasi Tingkat Risiko: Kelas {risk_grade[0]}")`,
    techStack: ["Python 3.11", "LightGBM", "SHAP XAI", "Scipy Optimize (Nelder-Mead)", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-underwriting-risk",
    datasetInfo: { name: "Prudential Life Insurance Assessment", size: "59,381 Aplikasi, 128 Fitur Medis & Demografis", source: "Kaggle Prudential" }
  },
  {
    id: "insurance-claims-fraud-detection",
    title: "Auto Insurance Claims Fraud Detection & Cost-Sensitive Learning",
    domain: "Fraud Analytics & SIU",
    category: "Insurance",
    tagline: "Cost-Sensitive LightGBM Classification for Special Investigation Unit (SIU) Prioritization",
    problem: "Penipuan klaim asuransi (claims fraud) menyebabkan kerugian miliaran rupiah setiap tahunnya. Deteksi manual tidak efisien karena rasio fraud yang sangat timpang (hanya 24.7% dari total klaim).",
    methodology: "Membangun model deteksi penipuan menggunakan Cost-Sensitive LightGBM Classifier dengan penyesuaian scale_pos_weight dan evaluasi Precision-Recall AUC (PR-AUC). Validasi dilakukan dengan 5-Fold Stratified Cross-Validation dan analisis atribusi fitur SHAP.",
    findings: [
      "Model mencapai skor ROC-AUC 0.8215 dan PR-AUC 0.5248 pada data klaim yang sangat tidak seimbang.",
      "Fitur Total_Claim_Amount, Incident_Severity, dan Incident_Type_Single_Vehicle_Collision menjadi sinyal fraud terkuat.",
      "Mekanisme cost-sensitive learning memprioritaskan 85% kasus berpotensi fraud ke antrian audit tim SIU."
    ],
    metrics: [
      { label: "ROC-AUC", value: "0.8215", desc: "Kemampuan Diskriminasi Model" },
      { label: "PR-AUC", value: "0.5248", desc: "Precision-Recall Imbalance" },
      { label: "Fraud Ratio", value: "24.7%", desc: "Proporsi Kasus Fraud Riil" }
    ],
    formula: {
      title: "Precision-Recall Area Under Curve (PR-AUC)",
      latex: "\\text{PR-AUC} = \\int_0^1 P(R) \\, dR = \\sum_{k=1}^n P(k) \\cdot [R(k) - R(k-1)]",
      explanation: "Area di bawah kurva Precision-Recall mengukur ketepatan deteksi pada dataset dengan kelas minoritas yang langka."
    },
    codeSnippet: `from src.fraud_detector import ClaimsFraudDetector
import pandas as pd

detector = ClaimsFraudDetector()
claim = pd.DataFrame([{
    'total_claim_amount': 71600, 'incident_severity': 'Major Damage',
    'incident_type': 'Single Vehicle Collision', 'police_report_available': 'NO'
}])
fraud_prob = detector.predict_fraud_probability(claim)
print(f"Probabilitas Fraud: {fraud_prob[0]:.2%}")`,
    techStack: ["Python 3.11", "LightGBM", "Cost-Sensitive Learning", "SHAP", "Scikit-Learn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-claims-fraud-detection",
    datasetInfo: { name: "Auto Insurance Claims Fraud Dataset", size: "1,000 Kasus Klaim Kendaraan", source: "Kaggle Auto Insurance" }
  },
  {
    id: "insurance-cross-sell-propensity",
    title: "Health-to-Vehicle Insurance Cross-Sell Propensity Modeling",
    domain: "Propensity Marketing",
    category: "Insurance",
    tagline: "Decile Lift Optimization Capturing 79.16% Total Policy Conversions from Top 30% Outreach",
    problem: "Kampanye pemasaran asuransi kendaraan massal kepada seluruh nasabah asuransi kesehatan menghasilkan biaya akuisisi pelanggan (CAC) yang tinggi dengan tingkat respon rendah.",
    methodology: "Mengembangkan model skor kecenderungan pembelian (Propensity Scoring) menggunakan LightGBM Classifier. Model dievaluasi menggunakan Cumulative Gains Curve dan Decile Lift Chart untuk mengisolasi segmen nasabah paling prospektif.",
    findings: [
      "Top Decile Lift mencapai 3.23x di atas tingkat konversi acak, dan Top 30% outreach berhasil menangkap 79.16% total konversi polis.",
      "Variabel Vehicle_Damage_Yes, Previously_Insured_0, dan Age menjadi pemicu utama minat nasabah.",
      "Optimasi strategi penargetan ini memangkas biaya telemarketing hingga 70% dengan mempertahankan volume premi baru."
    ],
    metrics: [
      { label: "Top Decile Lift", value: "3.23x", desc: "Efektivitas Penargetan Teratas" },
      { label: "ROC-AUC", value: "0.8579", desc: "Skor Diskriminasi Model" },
      { label: "Capture Rate", value: "79.16%", desc: "Konversi Tertangkap di Top 30%" }
    ],
    formula: {
      title: "Decile Lift Metric",
      latex: "\\text{Lift}_k = \\frac{\\text{Conversion Rate in Decile } k}{\\text{Overall Average Conversion Rate}}",
      explanation: "Rasio kelipatan tingkat konversi kelompok nasabah desil teratas dibandingkan tingkat konversi rata-rata populasi."
    },
    codeSnippet: `from src.propensity_scorer import CrossSellPropensityScorer
import pandas as pd

scorer = CrossSellPropensityScorer()
customer = pd.DataFrame([{
    'Age': 32, 'Vehicle_Age': '> 2 Years', 'Vehicle_Damage': 'Yes',
    'Previously_Insured': 0, 'Annual_Premium': 34500
}])
score = scorer.predict_propensity(customer)
print(f"Skor Kecenderungan Cross-Sell: {score[0]:.4f}")`,
    techStack: ["Python 3.11", "LightGBM", "Decile Lift", "Cumulative Gains", "Pandas", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-cross-sell-propensity",
    datasetInfo: { name: "Health Insurance Cross-Sell Dataset", size: "381,109 Nasabah Asuransi Kesehatan", source: "Kaggle Health Insurance" }
  },
  {
    id: "insurance-customer-lifetime-value",
    title: "Customer Lifetime Value (CLV) & Policy Renewal Analytics",
    domain: "Customer Economics & Retention",
    category: "Insurance",
    tagline: "Log-Transformed Continuous Regression for Long-Term Auto Insurance Policyholder Valuation",
    problem: "Manajemen portofolio asuransi seringkali memperlakukan semua pemegang polis secara sama tanpa estimasi nilai jangka panjang (CLV), mengakibatkan pemborosan anggaran retensi pada segmen bernilai rendah.",
    methodology: "Memodelkan nilai ekonomi nasabah masa depan menggunakan Random Forest Regressor dengan target log-transformed log(1 + CLV) untuk menstabilkan variansi residual dan memitigasi skewness distribusi premi.",
    findings: [
      "Model log-transformed Random Forest mencapai skor R-Squared 0.6784 dengan MAE $1,409 pada data riil nasabah asuransi mobil.",
      "Monthly Premium Auto, Total Claim Amount, dan Number of Policies menjadi tiga pilar utama penentu nilai seumur hidup nasabah.",
      "Strategi retensi berbasis kuantil CLV mengidentifikasi 20% nasabah platinum yang menyumbang lebih dari 55% profitabilitas portofolio."
    ],
    metrics: [
      { label: "R-Squared", value: "0.6784", desc: "Kebaikan Suai Model Regresi" },
      { label: "RMSE", value: "$4,071", desc: "Root Mean Squared Error" },
      { label: "MAE", value: "$1,409", desc: "Mean Absolute Error" }
    ],
    formula: {
      title: "Log-Transformed Target Formulation",
      latex: "\\tilde{y} = \\ln(1 + \\text{CLV}), \\quad \\widehat{\\text{CLV}} = \\exp(\\hat{y}) - 1",
      explanation: "Transformasi logaritmik menstabilkan heteroskedastisitas dan distribusi nilai nasabah yang sangat menceng ke kanan."
    },
    codeSnippet: `from src.clv_estimator import CLVEstimator
import pandas as pd

estimator = CLVEstimator()
policyholder = pd.DataFrame([{
    'Monthly_Premium_Auto': 120, 'Total_Claim_Amount': 340,
    'Number_of_Policies': 2, 'Coverage': 'Extended', 'Income': 62000
}])
estimated_clv = estimator.predict_clv(policyholder)
print(f"Estimasi Customer Lifetime Value: USD {estimated_clv[0]:,.2f}")`,
    techStack: ["Python 3.11", "Random Forest Regressor", "Log Transform", "SHAP", "Scikit-Learn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/insurance-customer-lifetime-value",
    datasetInfo: { name: "IBM Watson Marketing Customer Value Dataset", size: "9,134 Polis Asuransi Kendaraan", source: "IBM Watson Analytics" }
  },
  {
    id: "indonesian-banks-risk-analytics",
    title: "Indonesian Big Four Banks Financial Risk & Quantitative Valuation",
    domain: "Quantitative Finance & Risk",
    category: "Banking",
    tagline: "Parametric & Historical VaR 95%, Expected Shortfall, and ADF Stationarity Auditing on IDX Banking Giants",
    problem: "Investor institusional dan regulator membutuhkan estimasi kuantitatif yang presisi atas risiko ekor (tail risk) dan profil volatilitas empat bank kapitalisasi terbesar di Bursa Efek Indonesia (BBCA, BBRI, BMRI, BBNI).",
    methodology: "Menghitung log returns harian pada 2.840 hari perdagangan (2015-2026). Melakukan audit stasioneritas Augmented Dickey-Fuller (ADF), menghitung Value at Risk (VaR 95% & 99%) parametrik dan historis, Expected Shortfall (CVaR), serta Maximum Drawdown (MDD) portofolio berbobot seimbang.",
    findings: [
      "BBCA menunjukkan profil risiko paling defensif dengan VaR 95% harian sebesar 2.28%, dibandingkan BBRI (3.12%), BMRI (2.89%), dan BBNI (3.45%).",
      "Uji Augmented Dickey-Fuller (ADF) mengonfirmasi seluruh deret return logaritmik stasioner pada derajat signifikansi p < 0.001.",
      "Diversifikasi portofolio 4 bank menghasilkan volatilitas tahunan 18.4% dengan Sharpe Ratio 0.84 selama siklus 11 tahun."
    ],
    metrics: [
      { label: "BBCA VaR 95%", value: "2.28%", desc: "Value at Risk Harian" },
      { label: "Portfolio MDD", value: "-48.37%", desc: "Maximum Drawdown Pandemi" },
      { label: "Trading Days", value: "2,840", desc: "Data Historis 2015 - 2026" }
    ],
    formula: {
      title: "Value at Risk (VaR) & Expected Shortfall (ES)",
      latex: "\\text{VaR}_\\alpha = -F^{-1}(1-\\alpha), \\quad \\text{ES}_\\alpha = -E[R \\mid R \\le -\\text{VaR}_\\alpha] = \\frac{1}{1-\\alpha} \\int_0^{1-\\alpha} \\text{VaR}_u \\, du",
      explanation: "VaR mengukur kerugian maksimum pada tingkat keyakinan alpha, sedangkan Expected Shortfall mengukur rata-rata kerugian saat batas VaR terlampaui."
    },
    codeSnippet: `from src.risk_engine import BankRiskEngine

engine = BankRiskEngine(tickers=['BBCA.JK', 'BBRI.JK', 'BMRI.JK', 'BBNI.JK'])
returns = engine.load_returns(start_year=2015)
var_metrics = engine.calculate_var_cvar(confidence_level=0.95)
print(var_metrics.to_string())`,
    techStack: ["Python 3.11", "Statsmodels", "SciPy", "Pandas", "Matplotlib", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/indonesian-banks-risk-analytics",
    demoUrl: "https://izamrosiawan.github.io/indonesian-banks-risk-analytics/",
    datasetInfo: { name: "IDX Historical Stock Daily Prices (BBCA, BBRI, BMRI, BBNI)", size: "2,840 Baris Data Harian (2015-2026)", source: "Yahoo Finance API" }
  },
  {
    id: "stock-price-simulation-jsmr",
    title: "PT Jasa Marga Tbk (JSMR) Monte Carlo Geometric Brownian Motion",
    domain: "Stochastic Modeling & Asset Pricing",
    category: "Banking",
    tagline: "1,000 Stochastic Paths Geometric Brownian Motion with Terminal Confidence Interval Bounds",
    problem: "Ketidakpastian ekonomi makro dan fluktuasi suku bunga memerlukan estimasi probabilistik pergerakan harga saham infrastruktur jalan tol (PT Jasa Marga Tbk / JSMR) di luar batas regresi deterministik.",
    methodology: "Memodelkan lintasan harga saham harian menggunakan persamaan diferensial stokastik Geometric Brownian Motion (GBM) yang mengestimasi drift harian (mu) dan volatilitas historis (sigma) melalui 1.000 simulasi Monte Carlo untuk horizon 252 hari bursa.",
    findings: [
      "Distribusi terminal harga saham JSMR menghasilkan ekspektasi nilai tengah Rp 5.250 dengan selang kepercayaan 95% berada di rentang Rp 3.840 - Rp 6.820.",
      "Estimasi drift parameter mu = 8.4% per tahun dengan volatilitas terrealisasi sigma = 22.1% per tahun.",
      "Uji konvergensi Monte Carlo mengonfirmasi stabilisasi nilai tengah lintasan setelah 500 iterasi stokastik."
    ],
    metrics: [
      { label: "Simulations", value: "1,000 Paths", desc: "Lintasan Monte Carlo" },
      { label: "Horizon", value: "252 Days", desc: "1 Tahun Hari Bursa" },
      { label: "Confidence", value: "95% Bounds", desc: "Interval Distribusi Terminal" }
    ],
    formula: {
      title: "Stochastic Geometric Brownian Motion (GBM)",
      latex: "S_{t+\\Delta t} = S_t \\exp\\left(\\left(\\mu - \\frac{\\sigma^2}{2}\\right)\\Delta t + \\sigma \\sqrt{\\Delta t} Z\\right), \\quad Z \\sim \\mathcal{N}(0, 1)",
      explanation: "Persamaan diferensial stokastik Ito mengkombinasikan pergeseran deterministik (drift) dengan guncangan acak standar normal."
    },
    codeSnippet: `from src.gbm_simulator import MonteCarloSimulator

sim = MonteCarloSimulator(ticker='JSMR.JK')
paths = sim.run_simulation(n_simulations=1000, days=252)
expected_price = paths[-1].mean()
print(f"Ekspektasi Harga Terminal: Rp {expected_price:,.2f}")`,
    techStack: ["Python 3.11", "NumPy", "Monte Carlo", "SciPy", "Matplotlib", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/stock-price-simulation-jsmr",
    datasetInfo: { name: "JSMR Daily Stock Prices", size: "Data Historis 5 Tahun", source: "IDX / Yahoo Finance" }
  },
  {
    id: "olist-brazilian-ecommerce-analytics",
    title: "Olist E-Commerce RFM Analytics & Multi-Table Relational Pipeline",
    domain: "E-Commerce Analytics & Relational Pipelines",
    category: "SupplyChain",
    tagline: "Customer RFM Segmentation and Logistical Review Score Regression across 100k Multi-Table Orders",
    problem: "Dataset e-commerce skala enterprise yang tersebar di 9 tabel relasional terpisah memerlukan pembersihan skema, normalisasi integritas referensial, segmentasi pelanggan, dan identifikasi akar penyebab keterlambatan logistik pengiriman barang.",
    methodology: "Merancang pipeline ETL data relasional menggunakan diagram ERD 9 tabel Olist Brazilian E-Commerce. Melakukan rekayasa fitur Recency, Frequency, Monetary (RFM), segmentasi pelanggan berbasis kuantil, serta regresi logistik multivariat terhadap faktor penentu review score pelanggan.",
    findings: [
      "Keterlambatan pengiriman (delivery delay > 3 hari) menurunkan probabilitas review score bintang 5 sebesar 62.4%.",
      "Segmen nasabah 'Champions' (RFM 555) menyumbang 18.2% total pendapatan kotor dengan frekuensi belanja ulang 3.4x lebih tinggi.",
      "Rata-rata lead time pengiriman antar negara bagian di Brasil tercatat 12.5 hari, dengan variansi tertinggi pada rute regional utara."
    ],
    metrics: [
      { label: "Total Orders", value: "100,000+", desc: "Transaksi Relasional 2016-2018" },
      { label: "Avg Delivery", value: "12.5 Days", desc: "Lead Time Logistik Pengiriman" },
      { label: "Tables Integrated", value: "9 Tables", desc: "Skema ERD Ternormalisasi" }
    ],
    formula: {
      title: "Formulasi Skor RFM (Recency, Frequency, Monetary)",
      latex: "R_i = T_{\\max} - \\max(t_i), \\quad F_i = \\sum_{k=1}^{n_i} 1, \\quad M_i = \\sum_{k=1}^{n_i} \\text{Price}_{i,k}",
      explanation: "Recency diukur dari selisih hari transaksi terakhir terhadap tanggal audit, Frequency adalah total order, dan Monetary adalah akumulasi nilai belanja."
    },
    codeSnippet: `from src.rfm_pipeline import OlistAnalyticsPipeline

pipeline = OlistAnalyticsPipeline()
df_rfm = pipeline.build_rfm_segments()
print(df_rfm[['customer_unique_id', 'RFM_Score', 'Segment']].head())`,
    techStack: ["Python 3.11", "Pandas", "Mermaid.js ERD", "Seaborn", "Scikit-Learn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/olist-brazilian-ecommerce-analytics",
    demoUrl: "https://izamrosiawan.github.io/olist-brazilian-ecommerce-analytics/",
    datasetInfo: { name: "Olist Brazilian E-Commerce Dataset", size: "100,000 Pesanan, 9 Tabel Relasional", source: "Kaggle Olist" }
  },
  {
    id: "supply-chain-demand-forecasting",
    title: "Supply Chain Demand Forecasting & Inventory Optimization (ROP)",
    domain: "Supply Chain & Operations Research",
    category: "SupplyChain",
    tagline: "SARIMA Time-Series Decomposition & Dynamic Safety Stock Calculation under Stochastic Lead Time",
    problem: "Volatilitas permintaan konsumen yang musiman dan ketidakpastian lead time pengiriman dari pemasok kerap menyebabkan stockout berbiaya tinggi atau overstock yang mengikat modal kerja.",
    methodology: "Melakukan peramalan permintaan bulanan menggunakan dekomposisi deret waktu Seasonal ARIMA (SARIMA) dengan seleksi parameter grid search AIC. Mengkalkulasi Safety Stock dinamis dan Reorder Point (ROP) pada tingkat layanan (Service Level) 95%.",
    findings: [
      "Model SARIMA(1,1,1)(1,1,0)12 mencapai Mean Absolute Percentage Error (MAPE) di bawah 11.8% pada horizon uji 12 bulan.",
      "Kalkulasi ROP dinamis berhasil menurunkan rata-rata modal kerja inventaris sebesar 14.5% tanpa meningkatkan risiko stockout.",
      "Pola musiman kuartal ke-4 (holiday season) terbukti konsisten menyumbang 38% dari total volume penjualan tahunan."
    ],
    metrics: [
      { label: "Forecast MAPE", value: "< 11.8%", desc: "Mean Absolute Percentage Error" },
      { label: "Service Level", value: "95%", desc: "Faktor Z = 1.645" },
      { label: "Capital Saved", value: "14.5%", desc: "Reduksi Biaya Simpan Inventaris" }
    ],
    formula: {
      title: "Reorder Point (ROP) under Stochastic Demand & Lead Time",
      latex: "\\text{ROP} = (\\bar{d} \\times \\bar{L}) + Z_{\\alpha} \\sqrt{\\bar{L} \\sigma_d^2 + \\bar{d}^2 \\sigma_L^2}",
      explanation: "Titik pemesanan ulang ROP mencakup ekspektasi permintaan selama lead time ditambah safety stock untuk mengantisipasi deviasi standar permintaan dan lead time."
    },
    codeSnippet: `from src.inventory_optimizer import InventoryOptimizer
import pandas as pd

opt = InventoryOptimizer(service_level=0.95)
rop = opt.calculate_reorder_point(avg_demand=500, std_demand=65, avg_lead_time=14, std_lead_time=3)
print(f"Reorder Point Optimal: {rop:.0f} unit")`,
    techStack: ["Python 3.11", "Statsmodels SARIMA", "Time Series", "Pandas", "SciPy", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/supply-chain-demand-forecasting",
    datasetInfo: { name: "Historical Product Demand and Supply Logistics Dataset", size: "10,000+ Transaksi Logistik", source: "Operations Research Archive" }
  },
  {
    id: "smart-mustahik",
    title: "SMART-MUSTAHIK: Zero-Leakage Decision Support for Zakat Allocation",
    domain: "Islamic Philanthropy AI & Decision Systems",
    category: "PublicPolicy",
    tagline: "QS. At-Taubah: 60 Compliant Productive vs Consumptive Zakat Allocation with Strict Socio-Economic Leakage Auditing",
    problem: "Distribusi zakat sering menghadapi risiko Inclusion Error Rate (alokasi dana zakat kepada penerima yang tidak tepat) dan Exclusion Error Rate (mustahik layak yang terabaikan), serta risiko kebocoran data sosio-ekonomi dalam pembentukan target pelatihan AI.",
    methodology: "Merancang sistem pendukung keputusan alokasi mustahik sesuai asnaf QS. At-Taubah: 60. Menerapkan protokol audit zero-leakage dengan membuang fitur predictor yang merupakan definisi langsung dari target kemiskinan (seperti rasio pengeluaran per kapita). Model dikembangkan menggunakan Random Forest Classifier yang di-fit khusus pada X_train.",
    findings: [
      "Random Forest Classifier mencapai akurasi uji 87.50% dengan recall 84.62% dalam mengidentifikasi kelayakan program zakat produktif.",
      "Inclusion Error Rate (IER) berhasil ditekan sebesar 5.71 persentase poin dibandingkan metode penentuan konvensional berbasis verifikasi lapangan acak.",
      "Fitur kepemilikan aset produktif, tanggungan keluarga, dan riwayat pelatihan keterampilan menjadi pembeda utama antara alokasi zakat produktif vs konsumtif."
    ],
    metrics: [
      { label: "Accuracy", value: "87.50%", desc: "Akurasi Klasifikasi Uji" },
      { label: "IER Reduction", value: "-5.71 pp", desc: "Penurunan Inclusion Error Rate" },
      { label: "Recall Mustahik", value: "84.62%", desc: "Cakupan Mustahik Layak" }
    ],
    formula: {
      title: "Inclusion & Exclusion Error Rates (IER & EER)",
      latex: "\\text{IER} = \\frac{\\text{False Positive}}{\\text{Total Predicted Positive}}, \\quad \\text{EER} = \\frac{\\text{False Negative}}{\\text{Total Actual Positive}}",
      explanation: "IER mengukur persentase dana zakat yang keliru dialokasikan, sedangkan EER mengukur persentase mustahik sah yang tidak terlayani."
    },
    codeSnippet: `from src.mustahik_engine import MustahikDecisionEngine
import pandas as pd

engine = MustahikDecisionEngine()
applicant = pd.DataFrame([{
    'pendapatan_keluarga': 1200000, 'jumlah_tanggungan': 4,
    'status_tempat_tinggal': 'Sewa', 'keterampilan_usaha': 1,
    'aset_produktif': 500000
}])
recommendation = engine.evaluate_mustahik(applicant)
print(f"Rekomendasi Alokasi: {recommendation['program']}")`,
    techStack: ["Python 3.11", "Scikit-Learn", "Zero-Leakage Protocol", "Seaborn", "Pytest", "Streamlit"],
    githubUrl: "https://github.com/izamrosiawan/smart-mustahik",
    demoUrl: "https://smart-mustahik.streamlit.app",
    datasetInfo: { name: "BPS Sosio-Ekonomi Jawa Timur & Data Mustahik 2020-2024", size: "190 Observasi Regional, 12 Indikator", source: "Badan Pusat Statistik (BPS)" }
  },
  {
    id: "campus-id",
    title: "Indonesian Higher Education Analytics & SNBT Competition Ratios",
    domain: "Higher Education Analytics & Public Data Systems",
    category: "PublicPolicy",
    tagline: "Lecturer-Student Ratio Auditing, SNBT Admission Selectivity Indices, and UKT Distribution Mapping",
    problem: "Calon mahasiswa dan pembuat kebijakan pendidikan tinggi di Indonesia kekurangan portal analitik terpadu yang memvisualisasikan rasio beban mengajar dosen, indeks keketatan seleksi SNBT, dan sebaran kluster Uang Kuliah Tunggal (UKT).",
    methodology: "Membangun data pipeline komprehensif yang mengagregasi data PDDikti dan BPP SNPMB. Menghitung rasio dosen-mahasiswa, indeks keketatan program studi (Applicant-to-Quota Ratio), serta segmentasi klaster biaya pendidikan di seluruh perguruan tinggi negeri.",
    findings: [
      "Sebaran rasio dosen-mahasiswa pada program studi rumpun Saintek menunjukkan rata-rata 1:18, memenuhi standar akreditasi nasional.",
      "Program studi Sains Data dan Teknik Informatika mencatatkan rasio keketatan seleksi SNBT tertinggi dengan tingkat penerimaan di bawah 3.5%.",
      "Struktur data JSON pipeline terdistribusi memungkinkan query pencarian real-time dengan latensi di bawah 20 milidetik."
    ],
    metrics: [
      { label: "Universities", value: "8 PTN/PTS", desc: "Data Perguruan Tinggi Teruji" },
      { label: "Provinces", value: "38 Wilayah", desc: "Cakupan Geografis Nasional" },
      { label: "Query Latency", value: "< 20 ms", desc: "Kecepatan Pipeline Data JSON" }
    ],
    formula: {
      title: "Indeks Keketatan Program Studi (Selectivity Index)",
      latex: "K_{\\text{SNBT}} = \\frac{N_{\\text{kuota}}}{N_{\\text{peminat}}} \\times 100\\%, \\quad R_{\\text{dosen}} = \\frac{N_{\\text{mahasiswa}}}{N_{\\text{dosen}}}",
      explanation: "Keketatan mengukur persentase daya tampung terhadap total peminat, sementara R_dosen mengukur beban rasio pembinaan akademik."
    },
    codeSnippet: `from src.campus_analytics import CampusDataPipeline
import pandas as pd

pipeline = CampusDataPipeline()
selectivity = pipeline.get_top_selective_majors(top_n=5)
print(selectivity[['university_name', 'major_name', 'selectivity_pct']])`,
    techStack: ["Python 3.11", "Pandas", "JSON Pipeline", "Seaborn", "Pytest", "Streamlit"],
    githubUrl: "https://github.com/izamrosiawan/campus-id",
    demoUrl: "https://campus-id.streamlit.app",
    datasetInfo: { name: "Campus-ID Higher Education Aggregated Dataset", size: "Data Program Studi Nasional", source: "PDDikti & SNPMB Kemendikbudristek" }
  },
  {
    id: "asean-economic-recovery",
    title: "ASEAN Post-Pandemic Economic Recovery & Tourism Forecasting",
    domain: "Macroeconomics & Econometric Time Series",
    category: "PublicPolicy",
    tagline: "Comparative Recovery Trajectory Indexing & International Tourism Inflow Forecasting across 10 ASEAN Nations",
    problem: "Pandemi global memberikan guncangan asimetris terhadap struktur PDB dan industri pariwisata negara-negara ASEAN, menuntut model proyeksi komparatif untuk memperkirakan waktu pemulihan penuh (full recovery).",
    methodology: "Menganalisis deret waktu makroekonomi 10 negara anggota ASEAN (2019-2027F). Mengembangkan Indeks Pemulihan Relatif terhadap baseline 2019 dan peramalan eksponensial pergerakan wisatawan internasional.",
    findings: [
      "Mayoritas ekonomi ASEAN diproyeksikan mencapai pemulihan penuh kapasitas pariwisata internasional pada tahun 2025F.",
      "Indonesia dan Vietnam menunjukkan ketahanan PDB domestik tercepat yang didorong oleh konsumsi rumah tangga dan ekspor manufaktur.",
      "Tingkat elastisitas kedatangan turis terhadap pelonggaran visa mencapai 1.45 pada kelompok negara berkembang ASEAN."
    ],
    metrics: [
      { label: "Nations", value: "10 ASEAN", desc: "Negara Anggota Teranalisis" },
      { label: "Full Recovery", value: "2025F", desc: "Proyeksi Pemulihan Penuh" },
      { label: "Time Horizon", value: "2019 - 2027F", desc: "Rentang Data Makroekonomi" }
    ],
    formula: {
      title: "Relative Economic Recovery Rate",
      latex: "\\text{Recovery Rate}_{i,t} = \\left(\\frac{Y_{i,t}}{Y_{i,2019}}\\right) \\times 100\\%, \\quad \\Delta Y = \\ln(Y_t) - \\ln(Y_{t-1})",
      explanation: "Indeks pemulihan mengukur rasio realisasi indikator makroekonomi tahun t terhadap level acuan sebelum krisis (2019)."
    },
    codeSnippet: `from src.macro_recovery import ASEANRecoveryModel
import pandas as pd

model = ASEANRecoveryModel()
df_recovery = model.compute_recovery_index(country='IDN')
print(df_recovery[['Year', 'GDP_Current', 'Recovery_Index']])`,
    techStack: ["Python 3.11", "Pandas", "Time Series Econometrics", "Matplotlib", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/asean-economic-recovery",
    demoUrl: "https://izamrosiawan.github.io/asean-economic-recovery/",
    datasetInfo: { name: "ASEAN Macroeconomic & Tourism Statistics", size: "10 Negara ASEAN (2019-2027 Proyeksi)", source: "World Bank & ASEAN Secretariat" }
  },
  {
    id: "mlp-vs-random-forest-breast-cancer",
    title: "Breast Cancer Diagnosis: Neural Network MLP vs Random Forest",
    domain: "Healthcare AI & Clinical Diagnostics",
    category: "Healthcare",
    tagline: "Comparative Oncology Diagnostic Classification with SMOTE Imbalance Balancing and 100% Precision",
    problem: "Kesalahan diagnosis positif palsu (False Positive) pada deteksi kanker payudara memicu prosedur biopsi invasif yang tidak perlu dan kecemasan psikologis berat bagi pasien.",
    methodology: "Membandingkan arsitektur Jaringan Saraf Tiruan Multilayer Perceptron (MLP) dan Random Forest Classifier pada Breast Cancer Wisconsin dataset. Menggunakan teknik oversampling SMOTE untuk menyeimbangkan kelas ganas vs jinak dan mengevaluasi metrik F1-score serta Presisi klinis.",
    findings: [
      "Model MLP Neural Network mencapai akurasi uji 97.08% dengan Presisi 100.00% pada kelas ganas, memastikan nol alarm diagnosis palsu.",
      "Random Forest menghasilkan akurasi 96.35% dengan interpretabilitas fitur superior via mean decrease in impurity.",
      "Fitur Uniformity of Cell Size dan Bare Nuclei terbukti menjadi biomarker sitologis paling prediktif terhadap keganasan tumor."
    ],
    metrics: [
      { label: "MLP Accuracy", value: "97.08%", desc: "Akurasi Klasifikasi Uji" },
      { label: "MLP Precision", value: "100.00%", desc: "Nol False Positive Diagnosis" },
      { label: "MLP F1-Score", value: "95.65%", desc: "Keseimbangan Diagnostik" }
    ],
    formula: {
      title: "Forward Propagation Multilayer Perceptron",
      latex: "z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}, \\quad a^{[l]} = \\text{ReLU}(z^{[l]}), \\quad \\hat{y} = \\sigma(z^{[L]}) = \\frac{1}{1 + e^{-z^{[L]}}}",
      explanation: "Transformasi linear terbobot dan fungsi aktivasi non-linear lapis demi lapis dalam jaringan saraf tiruan klinis."
    },
    codeSnippet: `from src.cancer_mlp_engine import BreastCancerMLPEngine
import pandas as pd

engine = BreastCancerMLPEngine()
sample_cell = pd.DataFrame([{
    'clump_thickness': 5, 'uniformity_cell_size': 10,
    'uniformity_cell_shape': 10, 'marginal_adhesion': 8,
    'bare_nuclei': 10, 'bland_chromatin': 7
}])
diagnosis = engine.predict_diagnosis(sample_cell)
print(f"Hasil Diagnosis: {diagnosis['class']} (Keyakinan: {diagnosis['prob']:.2%})")`,
    techStack: ["Python 3.11", "Scikit-Learn", "Neural Networks MLP", "SMOTE", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/mlp-vs-random-forest-breast-cancer",
    datasetInfo: { name: "Breast Cancer Wisconsin Diagnostic Dataset", size: "699 Sampel Klinis, 9 Fitur Sitologis", source: "UCI Machine Learning Repository" }
  },
  {
    id: "principal-component-analysis-clustering",
    title: "Lifestyle & Obesity Profiling via PCA Dimensionality Reduction",
    domain: "Unsupervised Healthcare ML & Profiling",
    category: "Healthcare",
    tagline: "15-Dimensional Anthropometric Compression and K-Means Clustering for Metabolic Health Stratification",
    problem: "Tingginya dimensionalitas variabel gaya hidup dan pola makan (15 variabel sosio-medis) menyulitkan segmentasi kelompok risiko obesitas tanpa terjadinya korelasi berlebih antar fitur.",
    methodology: "Menerapkan Principal Component Analysis (PCA) untuk mereduksi 15 fitur gaya hidup menjadi komponen ortogonal utama yang mempertahankan lebih dari 80% variansi data, dilanjutkan dengan segmentasi 4 klaster individu menggunakan algoritma K-Means.",
    findings: [
      "3 komponen utama pertama berhasil merangkum 82.4% total variansi dari 2.087 profil individu.",
      "K-Means menghasilkan 4 klaster gaya hidup yang terdefinisi jelas: Remaja Sedentari Berisiko Tinggi, Dewasa Aktif Terjaga, Obesitas Tipe II, dan Konsumsi Kalori Tinggi.",
      "Frekuensi konsumsi makanan berkalori tinggi (FAVC) dan durasi penggunaan perangkat teknologi (TUE) menunjukkan korelasi kuat pada kuadran klaster obesitas."
    ],
    metrics: [
      { label: "Samples", value: "2,087 Obs", desc: "Data Individu Terverifikasi" },
      { label: "Clusters", value: "4 Klaster", desc: "Segmentasi Profil Gaya Hidup" },
      { label: "Variance Explained", value: "82.4%", desc: "Kompresi 3 Komponen PCA" }
    ],
    formula: {
      title: "PCA Projection & K-Means Objective Function",
      latex: "Z = X W, \\quad J = \\sum_{j=1}^k \\sum_{x_i \\in S_j} ||x_i - \\mu_j||^2",
      explanation: "PCA memproyeksikan data asli ke matriks bobot eigen vektor W, sementara K-Means meminimalkan jumlah kuadrat jarak titik ke pusat klaster."
    },
    codeSnippet: `from src.pca_clustering import LifestyleClusterEngine
import pandas as pd

engine = LifestyleClusterEngine(n_clusters=4)
engine.fit(df_lifestyle)
sample_profile = engine.predict_cluster(sample_data)
print(f"Klaster Profil: {sample_profile[0]}")`,
    techStack: ["Python 3.11", "Scikit-Learn", "PCA", "K-Means", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/principal-component-analysis-clustering",
    datasetInfo: { name: "Estimation of Obesity Levels & Lifestyle Data", size: "2,087 Individu, 15 Variabel Gaya Hidup", source: "UCI Machine Learning Repository" }
  },
  {
    id: "multiple-linear-regression-for-fuel-efficiency-analysis",
    title: "Automotive Fuel Efficiency Analysis (Auto MPG Econometrics)",
    domain: "Econometrics & Automotive Engineering",
    category: "Healthcare",
    tagline: "Multivariate OLS Regression with Variance Inflation Factor (VIF) Multicollinearity Auditing",
    problem: "Pengembangan kendaraan efisiensi energi memerlukan isolasi matematis atas faktor mekanis (bobot bodi, tenaga kuda, displacement) yang paling signifikan terhadap konsumsi bahan bakar tanpa bias multikolinearitas.",
    methodology: "Membangun model regresi linier berganda Ordinary Least Squares (OLS). Melakukan diagnostik asumsi klasik residual (uji normalitas Jarque-Bera, uji heteroskedastisitas Breusch-Pagan) dan audit multikolinearitas menggunakan Variance Inflation Factor (VIF).",
    findings: [
      "Model OLS mencapai skor R-Squared 0.8180, menjelaskan lebih dari 81% variansi efisiensi bahan bakar (MPG).",
      "Bobot kendaraan (Weight) terbukti sebagai faktor penentu paling dominan dengan koefisien negatif kuat (setiap kenaikan 1.000 lbs memangkas 5.2 MPG).",
      "Audit VIF berhasil mengidentifikasi dan menangani redundansi antara jumlah silinder dan displacement mesin."
    ],
    metrics: [
      { label: "R-Squared", value: "0.8180", desc: "Koefisien Determinasi OLS" },
      { label: "VIF Check", value: "Passed", desc: "Bebas Multikolinearitas Berat" },
      { label: "Dominant Factor", value: "Weight", desc: "Korelasi Negatif Kuat" }
    ],
    formula: {
      title: "Multivariate Ordinary Least Squares (OLS) Equation",
      latex: "\\text{MPG}_i = \\beta_0 + \\beta_1 \\text{Cyl}_i + \\beta_2 \\text{Disp}_i + \\beta_3 \\text{HP}_i + \\beta_4 \\text{Weight}_i + \\epsilon_i, \\quad \\text{VIF}_j = \\frac{1}{1 - R_j^2}",
      explanation: "Estimasi koefisien regresi meminimalkan jumlah kuadrat residual, dan VIF mengukur tingkat inflasi variansi akibat kolinearitas."
    },
    codeSnippet: `from src.fuel_efficiency_model import FuelEfficiencyEngine

engine = FuelEfficiencyEngine()
model_summary = engine.fit_ols()
print(model_summary.summary())`,
    techStack: ["Python 3.11", "Statsmodels OLS", "Scikit-Learn", "VIF Diagnostics", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/multiple-linear-regression-for-fuel-efficiency-analysis",
    datasetInfo: { name: "Auto MPG Automotive Dataset", size: "398 Kendaraan, 8 Fitur Mekanis", source: "UCI Machine Learning Repository" }
  },
  {
    id: "analysis-and-prediction-of-titanic-passenger-survival",
    title: "Titanic Passenger Survival Classification & Demographics",
    domain: "Classical Classification & Demographic ML",
    category: "Healthcare",
    tagline: "End-to-End Supervised Classification Pipeline with Missingness Imputation and Feature Crosses",
    problem: "Analisis survivalitas demografis historis pada tragedi maritim memerlukan rekayasa fitur interaksi keluarga, imputasi data hilang pada fitur usia, dan klasifikasi non-parametrik yang tangguh.",
    methodology: "Membangun pipeline klasifikasi Random Forest Classifier dengan imputasi median per kelompok sosial dan rekayasa fitur Family_Size (SibSp + Parch). Model divalidasi dengan Stratified 5-Fold Cross-Validation.",
    findings: [
      "Model mencapai akurasi uji 83.24% dengan AUC-ROC 0.8650 pada data uji terisolasi.",
      "Fitur gender wanita (Sex_female) dan tiket kelas utama (Pclass_1) memiliki probabilitas kelangsungan hidup tertinggi (74.2% vs 18.9%).",
      "Keluarga berukuran 2 hingga 4 anggota memiliki tingkat keselamatan jauh lebih tinggi dibandingkan penumpang solo atau keluarga besar (> 5 anggota)."
    ],
    metrics: [
      { label: "Accuracy", value: "83.24%", desc: "Akurasi Uji Validasi Silang" },
      { label: "ROC-AUC", value: "0.8650", desc: "Skor Diskriminasi Model" },
      { label: "Baseline Model", value: "61.62%", desc: "Baseline Mayoritas Non-Survival" }
    ],
    formula: {
      title: "Ensemble Majority Voting Classification",
      latex: "\\hat{y}_i = \\arg\\max_{c \\in \\{0,1\\}} \\sum_{b=1}^B I(h_b(x_i) = c), \\quad I(\\cdot) = \\text{Indicator Function}",
      explanation: "Random Forest mengagregasi keputusan klasifikasi independen dari B decision trees untuk menghasilkan prediksi konsensus."
    },
    codeSnippet: `from src.titanic_classifier import TitanicSurvivalModel

model = TitanicSurvivalModel()
pred = model.predict_survival(pclass=1, sex='female', age=29, sibsp=0, parch=0, fare=211.3)
print(f"Probabilitas Selamat: {pred['survival_prob']:.2%}")`,
    techStack: ["Python 3.11", "Scikit-Learn", "Random Forest", "Pandas", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/analysis-and-prediction-of-titanic-passenger-survival",
    datasetInfo: { name: "Titanic Passenger Survival Dataset", size: "891 Baris Data Demografis", source: "Kaggle Titanic Archive" }
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
  },
  {
    id: "spotify-tracks-analysis",
    title: "Spotify Tracks Audio Features Profiling & Hit Predictor",
    domain: "Audio Signal Analytics & Feature Profiling",
    category: "Systems",
    tagline: "Acoustic Feature Extraction across 114k Tracks and Multi-Genre K-Means Clustering",
    problem: "Katalog musik digital berskala ratusan ribu lagu membutuhkan segmentasi akustik otomatis berbasis parameter sinyal suara (danceability, energy, loudness, valence) untuk sistem rekomendasi personal.",
    methodology: "Menganalisis 114.000 trek musik dari 125 kategori genre Spotify API. Menerapkan normalisasi Z-score, reduksi dimensi, dan segmentasi klaster K-Means audio untuk membedah karakteristik akustik lagu populer vs non-populer.",
    findings: [
      "Fitur Danceability dan Valence (kecerahan nada) menunjukkan korelasi positif tertinggi terhadap Popularity Score lagu komersial.",
      "K-Means memisahkan 5 klaster akustik: Akustik Meditatif, Energetic Electronic/Pop, Heavy Metal Distorsi, Hip-Hop Ritmik, dan Klasik Instrumental.",
      "Lagu berdurasi 3.0 hingga 3.5 menit memiliki tingkat retensi streaming 24% lebih tinggi dibandingkan lagu berdurasi di atas 4.5 menit."
    ],
    metrics: [
      { label: "Tracks Analyzed", value: "114,000+", desc: "Katalog Musik Komersial" },
      { label: "Music Genres", value: "125 Genres", desc: "Klasifikasi Kategori Lagu" },
      { label: "Acoustic Clusters", value: "5 Klaster", desc: "Segmentasi Profil Sinyal" }
    ],
    formula: {
      title: "Audio Feature Normalization & Euclidean Distance",
      latex: "z_{i,j} = \\frac{x_{i,j} - \\mu_j}{\\sigma_j}, \\quad d(x_a, x_b) = \\sqrt{\\sum_{j=1}^D (z_{a,j} - z_{b,j})^2}",
      explanation: "Standarisasi fitur akustik memastikan variabel dengan skala berbeda (misal Loudness dB vs Valence 0-1) memiliki bobot seimbang dalam jarak Euclidean."
    },
    codeSnippet: `from src.spotify_profiler import SpotifyAudioProfiler

profiler = SpotifyAudioProfiler()
cluster = profiler.predict_track_cluster(danceability=0.78, energy=0.85, loudness=-4.5, valence=0.65)
print(f"Klaster Audio Musik: {cluster}")`,
    techStack: ["Python 3.11", "Pandas", "Scikit-Learn", "K-Means", "Seaborn", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/spotify-tracks-analysis",
    datasetInfo: { name: "Spotify 114k Tracks Audio Dataset", size: "114,000 Lagu, 125 Genre Musik", source: "Spotify Web API / Kaggle" }
  },
  {
    id: "cic-music-player",
    title: "CIC Music Player: Desktop Audio GUI & Graph Node Structures",
    domain: "Desktop Software Engineering & Graph Architecture",
    category: "Systems",
    tagline: "CustomTkinter Desktop Interface with Doubly Linked Audio Graph Node Architecture and Pygame Mixer Backend",
    problem: "Aplikasi pemutar musik desktop ringan seringkali mengalami glitch pemutaran antrian lagu, latensi pergantian track yang tinggi, dan tampilan antarmuka yang usang.",
    methodology: "Membangun aplikasi desktop native menggunakan framework modern CustomTkinter dan Pygame Audio Mixer. Mengimplementasikan struktur data Doubly Linked List dan Graph Nodes untuk navigasi playlist sirkular instan (Next/Prev/Shuffle) tanpa lag memori.",
    findings: [
      "Struktur data Doubly Linked List menghasilkan waktu komputasi pergantian lagu O(1) konstan.",
      "Konsumsi memori RAM tetap stabil di bawah 45 MB saat memutar file audio bitrate tinggi (320 kbps MP3/WAV).",
      "Antarmuka GUI mendukung tema dinamis (Dark/Light mode) dengan visualisator progress bar dan kontrol volume presisi."
    ],
    metrics: [
      { label: "GUI Engine", value: "CustomTkinter", desc: "Modern Python Desktop GUI" },
      { label: "RAM Usage", value: "< 45 MB", desc: "Ringan & Efisien Memori" },
      { label: "Time Complexity", value: "O(1)", desc: "Navigasi Antrian Playlist" }
    ],
    formula: {
      title: "Doubly Linked List Playlist Node Structure",
      latex: "\\text{Node}_i = \\langle \\text{Data}_i, \\text{Prev} = \\text{Node}_{i-1}, \\text{Next} = \\text{Node}_{i+1} \\rangle",
      explanation: "Setiap lagu terenkapsulasi dalam node pointer ganda untuk navigasi maju-mundur berkecepatan instan O(1)."
    },
    codeSnippet: `from src.audio_engine import AudioPlaylistGraph

playlist = AudioPlaylistGraph()
playlist.add_track("track_01.mp3", title="Acoustic Sunrise")
playlist.add_track("track_02.mp3", title="Deep Focus")
playlist.play_next()`,
    techStack: ["Python 3.11", "CustomTkinter", "Pygame Audio Mixer", "Data Structures (Doubly Linked List)", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/cic-music-player",
    datasetInfo: { name: "Local Audio Media Library & Node Graph", size: "Desktop Native Application", source: "CIC Media Repository" }
  },
  {
    id: "ai-research-os",
    title: "AI Research OS: Academic Rigor & ML Pipeline Automation Engine",
    domain: "Research Automation & Academic Integrity Systems",
    category: "Systems",
    tagline: "CLI Automation Suite for 1-to-1 BibTeX Verification, Data Leakage Audits, Statistical Power, and LaTeX Formatting",
    problem: "Penyusunan manuskrip ilmiah dan eksperimen machine learning rentan terhadap data leakage tersembunyi, halusinasi referensi sitasi, kesalahan kalkulasi statistical power, dan ketidaksesuaian format jurnal internasional.",
    methodology: "Membangun sistem operasi otomasi riset (CLI toolkit) berbasis AST (Abstract Syntax Tree) parsing. Menyediakan 12 modul verifikasi mandiri: audit sitasi 1-to-1 terhadap BibTeX, audit kebocoran target sosio-ekonomi dan urutan train-test split, kalkulator statistical power dengan cluster adjustment, serta generator tabel publikasi LaTeX booktabs.",
    findings: [
      "Audit AST otomatis mendeteksi 100% pelanggaran urutan train-test split (fit-transform sebelum split) pada repositori ML.",
      "Modul verifikasi referensi mencocokkan DOI, nama penulis, dan tahun terbit terhadap database publikasi primer tanpa halusinasi.",
      "Menjamin reproduktifitas eksperimen deterministik melalui inisialisasi random seed terstandarisasi."
    ],
    metrics: [
      { label: "CLI Tools", value: "12 Modules", desc: "Alat Bantu Otomasi Riset" },
      { label: "Leakage Audit", value: "100% AST", desc: "Deteksi Kebocoran Data ML" },
      { label: "Integrity", value: "Strict BibTeX", desc: "Verifikasi Sitasi 1-to-1" }
    ],
    formula: {
      title: "Statistical Power with Cluster Adjustment",
      latex: "1 - \\beta = \\Phi\\left(\\frac{\\delta \\sqrt{N}}{\\sqrt{1 + (m - 1)\\text{ICC}}} - Z_{1-\\alpha/2}\\right)",
      explanation: "Kalkulasi kekuatan statistik power memperhitungkan efek desain klaster (m) dan koefisien korelasi intra-klaster (ICC)."
    },
    codeSnippet: `from src.research_auditor import MLDataLeakageAuditor

auditor = MLDataLeakageAuditor()
report = auditor.audit_script("train_model.py")
print(f"Status Zero-Leakage: {report['passed']} (Pelanggaran: {len(report['violations'])})")`,
    techStack: ["Python 3.11", "AST Static Analysis", "BibTeX Parser", "LaTeX Booktabs Engine", "Statistical Power", "Pytest"],
    githubUrl: "https://github.com/izamrosiawan/ai-research-os",
    datasetInfo: { name: "Academic Research Manuscripts & Experimental Codebases", size: "12 Core Automation Engines", source: "Research Repository Framework" }
  }
];
