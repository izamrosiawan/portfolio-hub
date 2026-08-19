import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Izam Rosiawan | Quantitative Analytics & Applied Machine Learning Portfolio",
  description: "Senior Data Scientist & Quantitative Analyst portfolio showcasing 20+ production-grade repositories across Actuarial Science, Quantitative Finance, Supply Chain, and Healthcare AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070a12] text-slate-100 min-h-screen selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
