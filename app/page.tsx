"use client";

import { useEffect, useState } from "react";
import CopyButton from "@/components/copy-button";
import Link from "next/link";
import SnippetPreview from "@/components/snippet-preview";

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
      <h1 className="text-2xl font-semibold mb-6">Snippets disponibles</h1>

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
        className="mb-4 px-3 py-2 rounded bg-[#1e293b] border border-[#334155] w-full"
      />

      {/* 🔥 Filtros */}
      <div className="flex gap-2 mb-6 flex-wrap">
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

      {/* 📦 LISTA */}
      {snippets.length === 0 ? (
        <p className="text-gray-400">No hay snippets</p>
      ) : (
        <div className="grid gap-6">
          {snippets.map((snippet) => (
            <div
              key={snippet.id}
              className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden"
            >
              {/* HEADER */}
              <Link href={`/snippets/${snippet.slug}`}>
                <div className="p-5 border-b border-[#334155] cursor-pointer hover:bg-[#263449] transition">
                  <h2 className="text-lg font-medium">{snippet.name}</h2>

                  <p className="text-sm text-gray-400 mt-1">
                    {snippet.description}
                  </p>

                  <div className="flex gap-2 mt-2">
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

              {/* 🔥 RENDER INTELIGENTE */}
              {snippet.previewType === "fullwidth" ? (
                <>
                  {/* FULLWIDTH ocupa todo */}
                  <SnippetPreview code={snippet.code} previewType="fullwidth" />

                  <div className="p-5 bg-black text-green-400 text-sm overflow-x-auto">
                    <pre>{snippet.code}</pre>
                  </div>
                </>
              ) : (
                <div className="grid md:grid-cols-2">
                  {/* PREVIEW */}
                  <div className="p-5 border-r border-[#334155] bg-[#0f172a] flex items-center justify-center">
                    <SnippetPreview
                      code={snippet.code}
                      previewType={snippet.previewType}
                    />
                  </div>

                  {/* CODE */}
                  <div className="p-5 bg-black text-green-400 text-sm overflow-x-auto">
                    <pre>{snippet.code}</pre>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div className="p-4 border-t border-[#334155] flex justify-end">
                <CopyButton code={snippet.code} snippetId={snippet.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
