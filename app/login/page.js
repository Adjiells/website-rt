"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setPesan("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setPesan("Login gagal. Periksa email dan password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Login Admin</h1>
        <p className="text-slate-600 mb-6">
          Masuk untuk mengelola data RT.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {pesan && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded-xl">
              {pesan}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-xl py-3 font-semibold"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}