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
  title: "Izam Rosiawan — Selected Works in Quantitative Science & Applied Machine Learning",
  description: "A disciplined, editorial showcase of production repositories, actuarial formulations, and financial risk models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0c0d0e] text-[#e1e2e4] min-h-screen selection:bg-white selection:text-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
