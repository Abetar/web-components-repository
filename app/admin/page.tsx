"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FORM STATE
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState("ui");
  const [previewType, setPreviewType] = useState("component"); // 🔥 CLAVE
  const [message, setMessage] = useState("");

  // 🔥 FETCH SNIPPETS
  const fetchSnippets = async () => {
    const res = await fetch("/api/snippets");
    const data = await res.json();
    setSnippets(data.data);
  };

  // 🔥 FETCH CATEGORIES
  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();

    setCategories(data);

    if (data.length > 0) {
      setCategory(data[0].slug);
    }
  };

  useEffect(() => {
    fetchSnippets();
    fetchCategories();
  }, []);

  // 🔥 CREATE SNIPPET
  const handleCreate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          code,
          categorySlug: category,
          previewType, // 🔥 FIX REAL
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Snippet creado ✔");
        setName("");
        setDescription("");
        setCode("");
        setPreviewType("component");
        await fetchSnippets();
      } else {
        setMessage(data.error || "Error");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error inesperado");
    }

    setLoading(false);
  };

  // 🔥 DELETE SNIPPET
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar?");
    if (!confirmDelete) return;

    setLoading(true);

    await fetch(`/api/snippets/${id}`, {
      method: "DELETE",
    });

    await fetchSnippets();

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      <h1 className="text-2xl mb-6">Admin</h1>

      {/* 🔥 FORM */}
      <div className="bg-[#1e293b] p-5 rounded-xl border border-[#334155] mb-8 space-y-4 max-w-xl">
        <h2 className="text-lg">Crear snippet</h2>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
        />

        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
        />

        {/* 🔥 CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* 🔥 PREVIEW TYPE (CLAVE) */}
        <select
          value={previewType}
          onChange={(e) => setPreviewType(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded"
        >
          <option value="component">Component</option>
          <option value="section">Section</option>
          <option value="fullwidth">Full Width (Hero)</option>
        </select>

        <textarea
          placeholder="Código (HTML/Tailwind)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-3 py-2 bg-[#0f172a] border border-[#334155] rounded h-32"
        />

        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          {loading ? "Guardando..." : "Crear"}
        </button>

        {message && (
          <p className="text-sm text-gray-300">{message}</p>
        )}
      </div>

      {/* 🔥 LISTA */}
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-[#1e293b] p-4 rounded border border-[#334155]"
          >
            <h2 className="text-lg">{snippet.name}</h2>

            <p className="text-sm text-gray-400">
              {snippet.description}
            </p>

            {/* 🔥 PREVIEW TYPE DISPLAY */}
            <span className="text-xs text-blue-400 uppercase">
              {snippet.previewType}
            </span>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleDelete(snippet.id)}
                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}