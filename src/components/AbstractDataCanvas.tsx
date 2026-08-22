"use client";

import React, { useEffect, useRef } from "react";

export default function AbstractDataCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 360);
    let time = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = 360;
    };

    window.addEventListener("resize", handleResize);

    // Draw generative abstract mathematical curves (Markowitz frontiers, Gaussian waves, Vector flows)
    const render = () => {
      time += 0.008;
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle background grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Abstract Curve 1: Markowitz Efficient Frontier Wave (Indigo)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 5) {
        const y =
          height / 2 +
          Math.sin(x * 0.005 + time) * 45 +
          Math.cos(x * 0.01 - time * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 3. Abstract Curve 2: Actuarial Gamma Severity Wave (Emerald)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.2)";
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 5) {
        const y =
          height / 2 +
          Math.cos(x * 0.008 - time * 0.8) * 55 +
          Math.sin(x * 0.003 + time) * 30;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 4. Abstract Vector Nodes (Floating Data Particles)
      const particleCount = 24;
      for (let i = 0; i < particleCount; i++) {
        const px = (width / particleCount) * i + Math.sin(time + i) * 20;
        const py = height / 2 + Math.cos(time * 0.7 + i * 0.5) * 60;
        
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(99, 102, 241, 0.4)" : "rgba(16, 185, 129, 0.4)";
        ctx.fill();

        // Connect nearby points with abstract vector lines
        if (i > 0) {
          const prevPx = (width / particleCount) * (i - 1) + Math.sin(time + i - 1) * 20;
          const prevPy = height / 2 + Math.cos(time * 0.7 + (i - 1) * 0.5) * 60;
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = "rgba(0, 0, 0, 0.05)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] overflow-hidden rounded-3xl bg-gradient-to-b from-[#f5f5f4] via-[#fafaf9] to-[#ffffff] border border-[#e5e5e5] mb-12 shadow-xs">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Abstract Content Overlay */}
      <div className="relative z-10 p-8 sm:p-12 max-w-3xl flex flex-col justify-between h-full">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111213] text-white rounded-full text-[11px] font-mono font-semibold uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            <span>Abstrak Riset Kuantitatif & Aktuaria</span>
          </div>
          
          <h2 className="font-serif text-2xl sm:text-4xl text-[#111213] font-normal leading-tight">
            Perpaduan Formulasi Matematika, Sains Data, & Rekayasa Risiko Kuantitatif.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#525252] pt-4 border-t border-[#e5e5e5]/80">
          <div><strong className="text-[#111213]">20</strong> Monograf Riset</div>
          <div><strong className="text-[#111213]">678k+</strong> Observasi Data</div>
          <div><strong className="text-[#111213]">100%</strong> Tes Otomatis Pytest</div>
          <div><strong className="text-[#111213]">Zero</strong> Data Leakage</div>
        </div>
      </div>
    </div>
  );
}
