import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Izam Rosiawan - Portofolio Sains Data & Data Engineering",
  description:
    "Portofolio Izam Rosiawan, Mahasiswa S1 Sains Data Universitas Telkom Surabaya dengan fokus pada Data Analytics, Data Engineering, dan Business Intelligence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-black min-h-screen antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
