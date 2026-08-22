import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
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
  title: "Izam Rosiawan | Data Science & Business Intelligence Portfolio",
  description: "Disciplined showcase of production repositories, actuarial formulations, data analytics, and applied machine learning.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#fafaf9] text-[#1a1a1a] min-h-screen selection:bg-[#1a1a1a] selection:text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
