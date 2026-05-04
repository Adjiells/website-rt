import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import AdminNav from "./admin-nav";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <AdminNav />

        <div className="bg-white rounded-2xl shadow p-8 mb-6">
          <h1 className="text-3xl font-bold mb-2">Dashboard Admin RT</h1>
          <p className="text-slate-600">
            Anda login sebagai: <strong>{user.email}</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <Link
            href="/admin/warga"
            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50"
          >
            <h2 className="text-xl font-bold mb-2">Data Warga</h2>
            <p className="text-slate-600">
              Tambah, lihat, edit, dan hapus data warga.
            </p>
          </Link>

          <Link
            href="/admin/kas"
            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50"
          >
            <h2 className="text-xl font-bold mb-2">KAS RT</h2>
            <p className="text-slate-600">
              Input pemasukan, pengeluaran, dan kelola laporan kas.
            </p>
          </Link>

          <Link
            href="/admin/pengumuman"
            className="bg-white rounded-2xl shadow p-6 hover:bg-slate-50"
          >
            <h2 className="text-xl font-bold mb-2">Pengumuman</h2>
            <p className="text-slate-600">
              Buat informasi dan pengumuman untuk warga.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}