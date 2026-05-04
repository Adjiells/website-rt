import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-slate-900 text-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm mb-3">RT 001 / RW 005</p>
          <h1 className="text-4xl font-bold mb-4">
            Portal RT Digital
          </h1>
          <p className="text-slate-300 max-w-2xl">
            Website untuk laporan kas, data warga, struktur pengurus,
            pengumuman, dan akses admin.
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            <Link href="/kas" className="bg-white text-slate-900 px-5 py-3 rounded-xl font-semibold">
              Lihat KAS
            </Link>
            <Link href="/warga" className="border border-white px-5 py-3 rounded-xl font-semibold">
              Data Warga
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-2">KAS RT</h2>
          <p className="text-slate-600">Catat kas masuk, keluar, dan saldo akhir.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-2">Data Warga</h2>
          <p className="text-slate-600">Kelola data KK, alamat, status hunian, dan kontak.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="font-bold text-xl mb-2">Pengurus RT</h2>
          <p className="text-slate-600">Tampilkan ketua RT dan struktur pengurus.</p>
        </div>
      </section>
    </main>
  );
}