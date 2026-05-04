import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EditKasForm from "./edit-kas-form";

export default async function EditKasPage({ params }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: kas, error } = await supabase
    .from("kas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !kas) {
    redirect("/admin/kas");
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Edit Transaksi KAS</h1>
            <p className="text-slate-600">
              Ubah data pemasukan atau pengeluaran kas RT.
            </p>
          </div>

          <Link
            href="/admin/kas"
            className="bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold text-center"
          >
            Kembali
          </Link>
        </div>

        <EditKasForm kas={kas} />
      </div>
    </main>
  );
}