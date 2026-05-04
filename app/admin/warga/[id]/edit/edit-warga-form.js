"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function EditWargaForm({ warga }) {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    no_kk: warga.no_kk || "",
    nama_kepala_keluarga: warga.nama_kepala_keluarga || "",
    alamat: warga.alamat || "",
    status_hunian: warga.status_hunian || "Tetap",
    jumlah_anggota: warga.jumlah_anggota || 1,
    no_hp: warga.no_hp || "",
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
      .from("warga")
      .update({
        no_kk: form.no_kk,
        nama_kepala_keluarga: form.nama_kepala_keluarga,
        alamat: form.alamat,
        status_hunian: form.status_hunian,
        jumlah_anggota: Number(form.jumlah_anggota),
        no_hp: form.no_hp,
      })
      .eq("id", warga.id);

    setLoading(false);

    if (error) {
      setPesan("Gagal mengubah data warga.");
      console.log(error);
      return;
    }

    setPesan("Data warga berhasil diubah.");
    router.push("/admin/warga");
    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nomor KK</label>
          <input
            name="no_kk"
            value={form.no_kk}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Nama Kepala Keluarga
          </label>
          <input
            name="nama_kepala_keluarga"
            value={form.nama_kepala_keluarga}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Alamat</label>
          <textarea
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status Hunian</label>
          <select
            name="status_hunian"
            value={form.status_hunian}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="Tetap">Tetap</option>
            <option value="Kontrak">Kontrak</option>
            <option value="Kos">Kos</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Jumlah Anggota</label>
          <input
            type="number"
            name="jumlah_anggota"
            value={form.jumlah_anggota}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Nomor HP</label>
          <input
            name="no_hp"
            value={form.no_hp}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
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