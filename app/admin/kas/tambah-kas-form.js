"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function TambahKasForm() {
  const router = useRouter();
  const supabase = createClient();

  const [form, setForm] = useState({
    tanggal: new Date().toISOString().split("T")[0],
    tipe: "masuk",
    kategori: "",
    uraian: "",
    nominal: "",
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

    const { error } = await supabase.from("kas").insert([
      {
        tanggal: form.tanggal,
        tipe: form.tipe,
        kategori: form.kategori,
        uraian: form.uraian,
        nominal: Number(form.nominal),
      },
    ]);

    setLoading(false);

    if (error) {
      setPesan("Gagal menambah transaksi. Periksa kembali input Anda.");
      console.log(error);
      return;
    }

    setPesan("Transaksi kas berhasil ditambahkan.");

    setForm({
      tanggal: new Date().toISOString().split("T")[0],
      tipe: "masuk",
      kategori: "",
      uraian: "",
      nominal: "",
    });

    router.refresh();
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-fit">
      <h2 className="text-xl font-bold mb-2">Tambah Transaksi</h2>
      <p className="text-slate-500 text-sm mb-5">
        Input pemasukan atau pengeluaran kas RT.
      </p>

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
            placeholder="Contoh: Iuran bulanan warga"
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
            placeholder="Contoh: 50000"
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
          {loading ? "Menyimpan..." : "Simpan Transaksi"}
        </button>
      </form>
    </div>
  );
}