"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/copy-button";
import Link from "next/link";
import SnippetPreviewCompact from "@/components/snippet-preview-compact";

export default function HomePage() {
  const [snippets, setSnippets] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSnippets();
    fetchCategories();
  }, []);

  const fetchSnippets = async (category?: string, searchTerm?: string) => {
    let url = "/api/snippets";

    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (searchTerm) params.append("search", searchTerm);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setSnippets(data.data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  };

  const handleFilter = (slug: string | null) => {
    setSelectedCategory(slug);
    fetchSnippets(slug || undefined, search);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      {/* NAVBAR */}
     <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
  
  {/* LEFT */}
  <Link
    href="/"
    className="text-sm text-gray-400 hover:text-white transition"
  >
    ← Home
  </Link>

  {/* RIGHT */}
  <div className="flex items-center gap-3 text-sm">
    
    <Link
      href="/explore"
      className="px-4 py-1.5 rounded-md bg-white text-black font-medium hover:opacity-90 transition"
    >
      Explore
    </Link>

    <Link
      href="/metrics"
      className="px-4 py-1.5 rounded-md border border-[#334155] text-gray-400 hover:text-white hover:bg-[#1e293b] transition"
    >
      Popular
    </Link>

    {/* 🔥 MADE BY BUTTON */}
    <a
      href="https://agsolutions.dev"
      target="_blank"
      className="px-4 py-1.5 rounded-md border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition"
    >
      Made by AG Solutions
    </a>

  </div>
</div>

      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <img src="/logo.png" alt="logo" className="w-32 h-32 object-contain" />
      </div>

      {/* COUNTER */}
      <p className="text-center text-sm text-gray-400 mb-6">
        {snippets.length} snippets disponibles
      </p>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Buscar snippets..."
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          fetchSnippets(selectedCategory || undefined, value);
        }}
        className="mb-4 px-3 py-2 rounded bg-[#1e293b] border border-[#334155] w-full max-w-4xl mx-auto block"
      />

      {/* 🔥 Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap justify-center">
        <button
          onClick={() => handleFilter(null)}
          className={`px-3 py-1 rounded ${
            !selectedCategory ? "bg-blue-600" : "bg-[#1e293b]"
          }`}
        >
          Todos
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleFilter(cat.slug)}
            className={`px-3 py-1 rounded ${
              selectedCategory === cat.slug ? "bg-blue-600" : "bg-[#1e293b]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 📦 GRID DE CARDS */}
      {snippets.length === 0 ? (
        <p className="text-gray-400 text-center">No hay snippets</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden flex flex-col"
            >
              <Link href={`/snippets/${snippet.slug}`}>
                <div className="p-4 border-b border-[#334155] cursor-pointer hover:bg-[#263449] transition">
                  <h2 className="text-md font-medium">{snippet.name}</h2>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {snippet.description}
                  </p>

                  <div className="flex gap-2 mt-2 flex-wrap">
                    {snippet.categories.map((cat: any) => (
                      <span
                        key={cat.id}
                        className="text-xs bg-blue-600 px-2 py-1 rounded"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              <div className="p-4 bg-[#0f172a] flex justify-center">
                <SnippetPreviewCompact
                  code={snippet.code}
                  previewType={snippet.previewType}
                />
              </div>

              <div className="px-4 pb-4">
                <pre className="text-xs text-green-400 bg-black p-3 rounded overflow-hidden max-h-32">
                  {snippet.code.slice(0, 300)}...
                </pre>
              </div>

              <div className="p-4 border-t border-[#334155] flex justify-end mt-auto">
                <CopyButton code={snippet.code} snippetId={snippet.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DONATION */}
      <a
        href="https://ko-fi.com/abrahamgomez96"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-bolder transition"
      >
        ☕ Ayudame a seguir creando contenido de calidad
      </a>
    </main>
  );
}
