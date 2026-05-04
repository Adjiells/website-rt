import { supabase } from "@/lib/supabase";

function rupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export default async function KasPage() {
  const { data: kas } = await supabase
    .from("kas")
    .select("*")
    .order("tanggal", { ascending: false });

  const totalMasuk = kas
    ?.filter((item) => item.tipe === "masuk")
    .reduce((total, item) => total + Number(item.nominal), 0) || 0;

  const totalKeluar = kas
    ?.filter((item) => item.tipe === "keluar")
    .reduce((total, item) => total + Number(item.nominal), 0) || 0;

  const saldo = totalMasuk - totalKeluar;

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Laporan KAS RT</h1>
        <p className="text-slate-600 mb-6">Daftar transaksi kas masuk dan keluar.</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Total Masuk</p>
            <p className="text-2xl font-bold">{rupiah(totalMasuk)}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Total Keluar</p>
            <p className="text-2xl font-bold">{rupiah(totalKeluar)}</p>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow">
            <p className="text-slate-500">Saldo</p>
            <p className="text-2xl font-bold">{rupiah(saldo)}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-200">
              <tr>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Uraian</th>
                <th className="p-4">Tipe</th>
                <th className="p-4">Nominal</th>
              </tr>
            </thead>
            <tbody>
              {kas?.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-4">{item.tanggal}</td>
                  <td className="p-4">{item.uraian}</td>
                  <td className="p-4">{item.tipe}</td>
                  <td className="p-4">{rupiah(item.nominal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}