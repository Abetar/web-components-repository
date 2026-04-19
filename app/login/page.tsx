"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleLogin() {
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        document.cookie = `auth-token=${data.token}; path=/; SameSite=Lax`;
        router.push("/admin");
      } else {
        alert(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error inesperado");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-6 rounded-xl w-80 space-y-4 border border-[#334155]">
        <h1 className="text-lg font-semibold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </main>
  );
}