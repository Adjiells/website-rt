import { supabase } from "@/lib/supabase";

function rupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export default async function KasPage() {
  const { data: kas, error } = await supabase.from("kas").select("*");

  if (error) {
    console.log(error);
  }

  const totalMasuk =
    kas
      ?.filter((item) => item.tipe === "masuk")
      .reduce((total, item) => total + Number(item.nominal), 0) || 0;

  const totalKeluar =
    kas
      ?.filter((item) => item.tipe === "keluar")
      .reduce((total, item) => total + Number(item.nominal), 0) || 0;

  const saldo = totalMasuk - totalKeluar;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Ringkasan KAS RT</h1>
          <p className="text-slate-600">
            Halaman ini menampilkan ringkasan kas RT untuk transparansi warga.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Total Masuk</p>
            <p className="text-2xl font-bold">{rupiah(totalMasuk)}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Total Keluar</p>
            <p className="text-2xl font-bold">{rupiah(totalKeluar)}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Saldo Kas</p>
            <p className="text-2xl font-bold">{rupiah(saldo)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <h2 className="text-xl font-bold mb-2">Catatan Transparansi</h2>
          <p className="text-slate-600">
            Detail transaksi hanya dapat dikelola oleh pengurus RT melalui
            halaman admin. Warga dapat melihat total pemasukan, total
            pengeluaran, dan saldo akhir kas.
          </p>
        </div>
      </div>
    </main>
  );
}