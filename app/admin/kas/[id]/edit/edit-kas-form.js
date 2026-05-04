"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function EditKasForm({ kas }) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    tanggal: kas.tanggal || "",
    tipe: kas.tipe || "masuk",
    kategori: kas.kategori || "",
    uraian: kas.uraian || "",
    nominal: kas.nominal || "",
  });

  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    const { error } = await supabase
      .from("kas")
      .update({
        tanggal: form.tanggal,
        tipe: form.tipe,
        kategori: form.kategori,
        uraian: form.uraian,
        nominal: Number(form.nominal),
      })
      .eq("id", kas.id);

    setLoading(false);

    if (error) {
      setPesan("Gagal mengubah transaksi kas.");
      console.log(error);
      return;
    }

    setPesan("Transaksi kas berhasil diubah.");
    router.push("/admin/kas");
    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tipe Transaksi</label>
          <select
            name="tipe"
            value={form.tipe}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="masuk">Kas Masuk</option>
            <option value="keluar">Kas Keluar</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Kategori</label>
          <input
            name="kategori"
            value={form.kategori}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            placeholder="Contoh: Iuran, Donasi, Kebersihan"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Uraian</label>
          <textarea
            name="uraian"
            value={form.uraian}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nominal</label>
          <input
            type="number"
            name="nominal"
            value={form.nominal}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            min="1"
            required
          />
        </div>

        {pesan && (
          <div className="bg-slate-100 px-4 py-3 rounded-xl text-sm">
            {pesan}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold"
        >
          {loading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </form>
    </div>
  );
}