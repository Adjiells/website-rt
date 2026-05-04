import Link from "next/link";

export default function WargaPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-3">Data Warga</h1>
        <p className="text-slate-600 mb-6">
          Data warga bersifat pribadi dan hanya dapat diakses oleh pengurus RT.
        </p>

        <Link
          href="/login"
          className="inline-block bg-slate-900 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Login Pengurus
        </Link>
      </div>
    </main>
  );
}