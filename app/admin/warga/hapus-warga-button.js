"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function HapusWargaButton({ id, nama }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);

  async function handleHapus() {
    const yakin = confirm(
      `Yakin ingin menghapus data warga atas nama ${nama}?`
    );

    if (!yakin) return;

    setLoading(true);

    const { error } = await supabase
      .from("warga")
      .delete()
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert("Gagal menghapus data warga.");
      console.log(error);
      return;
    }

    alert("Data warga berhasil dihapus.");
    router.refresh();
  }

  return (
    <button
      onClick={handleHapus}
      disabled={loading}
      className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold"
    >
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}