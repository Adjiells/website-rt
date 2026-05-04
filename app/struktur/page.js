import { supabase } from "@/lib/supabase";

export default async function StrukturPage() {
  const { data: struktur } = await supabase
    .from("struktur_rt")
    .select("*")
    .order("urutan", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Ketua RT dan Struktur Pengurus</h1>
        <p className="text-slate-600 mb-6">
          Susunan pengurus RT dan pembagian tugas.
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {struktur?.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow">
              <p className="text-sm uppercase text-slate-500 font-semibold">
                {item.jabatan}
              </p>
              <h2 className="text-2xl font-bold mt-2">{item.nama}</h2>
              <p className="text-slate-600 mt-3">{item.tugas}</p>
              <p className="text-slate-500 mt-3">Kontak: {item.no_hp}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}