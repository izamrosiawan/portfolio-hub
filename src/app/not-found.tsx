import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col items-center justify-center p-4 text-center font-sans">
      <div className="p-4 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 text-indigo-400 font-mono text-sm">
        404 | Page Not Found
      </div>
      <h1 className="text-3xl font-bold mb-2">Halaman Tidak Ditemukan</h1>
      <p className="text-sm text-slate-400 max-w-md mb-6">
        Halaman atau repositori yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all shadow-md"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
