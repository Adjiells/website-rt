import Link from "next/link";
import LogoutButton from "./logout-button";

export default function AdminNav() {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold">Admin RT</h2>
          <p className="text-sm text-slate-500">
            Dashboard pengelolaan website RT
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin"
            className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/warga"
            className="bg-slate-200 text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold"
          >
            Data Warga
          </Link>

          <Link
            href="/admin/kas"
            className="bg-slate-200 text-slate-900 px-4 py-2 rounded-xl text-sm font-semibold"
          >
            KAS RT
          </Link>

          <LogoutButton />
        </div>
      </div>
    </div>
  );
}