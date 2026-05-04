"use client";

import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-5 py-3 rounded-xl font-semibold"
    >
      Logout
    </button>
  );
}