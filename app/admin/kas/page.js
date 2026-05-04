import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import TambahKasForm from "./tambah-kas-form";
import HapusKasButton from "./hapus-kas-button";
import AdminNav from "../admin-nav";

function rupiah(angka) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);
}

export default async function AdminKasPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: kas, error } = await supabase
    .from("kas")
    .select("*")
    .order("tanggal", { ascending: false });

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
    <div className="max-w-6xl mx-auto">
      <AdminNav />

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Kelola KAS RT</h1>
            <p className="text-slate-600">
              Tambah pemasukan, pengeluaran, dan lihat saldo kas RT.
            </p>
          </div>

          <Link
            href="/admin"
            className="bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold text-center"
          >
            Kembali ke Dashboard
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
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

        <div className="grid lg:grid-cols-[420px_1fr] gap-6">
          <TambahKasForm />

          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">Riwayat Transaksi</h2>
              <p className="text-slate-500 text-sm">
                Total transaksi: {kas?.length || 0}
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[850px]">
                <thead className="bg-slate-200">
                  <tr>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Tipe</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Uraian</th>
                    <th className="p-4">Nominal</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {kas?.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-4">{item.tanggal}</td>

                      <td className="p-4">
                        <span
                          className={
                            item.tipe === "masuk"
                              ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                              : "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          }
                        >
                          {item.tipe}
                        </span>
                      </td>

                      <td className="p-4">{item.kategori}</td>
                      <td className="p-4">{item.uraian}</td>

                      <td className="p-4 font-semibold">
                        {rupiah(item.nominal)}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/kas/${item.id}/edit`}
                            className="bg-amber-500 text-white px-3 py-2 rounded-lg text-sm font-semibold"
                          >
                            Edit
                          </Link>

                          <HapusKasButton
                            id={item.id}
                            uraian={item.uraian}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {(!kas || kas.length === 0) && (
                    <tr>
                      <td className="p-4 text-slate-500" colSpan="6">
                        Belum ada transaksi kas.
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