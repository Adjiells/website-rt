import { supabase } from "@/lib/supabase";

export default async function WargaPage() {
  const { data: warga } = await supabase
    .from("warga")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Data Warga</h1>
        <p className="text-slate-600 mb-6">
          Data ini sebaiknya hanya bisa dilihat oleh pengurus setelah sistem login dibuat.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {warga?.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow">
              <p className="text-xl font-bold">{item.nama_kepala_keluarga}</p>
              <p className="text-slate-500">No. KK: {item.no_kk}</p>
              <p className="mt-3">{item.alamat}</p>
              <p className="text-slate-600">Status: {item.status_hunian}</p>
              <p className="text-slate-600">Jumlah anggota: {item.jumlah_anggota}</p>
              <p className="text-slate-600">No. HP: {item.no_hp}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}