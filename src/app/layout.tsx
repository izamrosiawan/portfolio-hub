import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Izam Rosiawan | Quantitative Analytics & Applied Machine Learning Portfolio",
  description: "Senior Data Scientist & Quantitative Analyst portfolio showcasing production-grade repositories across Actuarial Science, Quantitative Finance, Supply Chain, and Healthcare AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#080c14] text-slate-100 min-h-screen selection:bg-indigo-500 selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
