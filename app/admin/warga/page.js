import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import TambahWargaForm from "./tambah-warga-form";
import HapusWargaButton from "./hapus-warga-button";

export default async function AdminWargaPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: warga, error } = await supabase
    .from("warga")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kelola Data Warga</h1>
            <p className="text-slate-600">
              Tambah dan lihat data kepala keluarga di lingkungan RT.
            </p>
          </div>

          <Link
            href="/admin"
            className="bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold text-center"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">
          <TambahWargaForm />

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">Daftar Warga</h2>
              <p className="text-slate-500 text-sm">
                Total data: {warga?.length || 0} kepala keluarga
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[750px]">
                <thead className="bg-slate-200">
                  <tr>
                    <tr>
  <th className="p-4">No. KK</th>
  <th className="p-4">Nama Kepala Keluarga</th>
  <th className="p-4">Alamat</th>
  <th className="p-4">Status</th>
  <th className="p-4">Anggota</th>
  <th className="p-4">No. HP</th>
  <th className="p-4">Aksi</th>
</tr>
                  </tr>
                </thead>
                <tbody>
                  {warga?.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">{item.no_kk}</td>
                      <td className="p-4 font-semibold">
                        {item.nama_kepala_keluarga}
                      </td>
                      <td className="p-4">{item.alamat}</td>
                      <td className="p-4">{item.status_hunian}</td>
                      <td className="p-4">{item.jumlah_anggota}</td>
                      <td className="p-4">{item.no_hp}</td>
                      <td className="p-4">
  <div className="flex gap-2">
    <Link
      href={`/admin/warga/${item.id}/edit`}
      className="bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-semibold"
    >
      Edit
    </Link>

    <HapusWargaButton
      id={item.id}
      nama={item.nama_kepala_keluarga}
    />
  </div>
</td>
                    </tr>
                  ))}

                  {(!warga || warga.length === 0) && (
                    <tr>
                      <td className="p-4 text-slate-500" colSpan="7">
  Belum ada data warga.
</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}