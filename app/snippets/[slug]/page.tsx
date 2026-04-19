import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SnippetPreview from "@/components/snippet-preview";
import CopyButton from "@/components/copy-button";

export default async function SnippetDetailPage({
  params,
}: {
  params: Promise<{ slug?: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return <div className="p-10 text-white">Error: slug no proporcionado</div>;
  }

  const snippet = await prisma.snippet.findUnique({
    where: { slug },
    include: {
      categories: true,
    },
  });

  if (!snippet) {
    return <div className="p-10 text-white">Snippet no encontrado</div>;
  }

  const previewType = snippet.previewType?.toLowerCase() || "component";

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      {/* 🔥 HEADER */}
      <div className="p-6 max-w-6xl mx-auto relative">
        <Link href="/" className="text-sm text-gray-400 hover:text-white">
          ← Volver
        </Link>

        {/* 🔥 COPY BUTTON ARRIBA */}
        <div className="absolute right-6 top-6">
          <CopyButton code={snippet.code} snippetId={snippet.id} />
        </div>

        <h1 className="text-2xl font-semibold mt-4 pr-20">{snippet.name}</h1>

        <p className="text-gray-400 mt-2">{snippet.description}</p>

        <div className="flex gap-2 mt-3">
          {snippet.categories.map((cat: { id: string; name: string }) => (
            <span
              key={cat.id}
              className="text-xs bg-blue-600 px-2 py-1 rounded"
            >
              {cat.name}
            </span>
          ))}
        </div>
      </div>

      {/* 🔥 FULLWIDTH */}
      {previewType === "fullwidth" ? (
        <>
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <SnippetPreview code={snippet.code} previewType="fullwidth" />
          </div>

          {/* CODE */}
          <div className="max-w-6xl mx-auto p-6 bg-black text-green-400 text-sm overflow-x-auto">
            <pre>{snippet.code}</pre>
          </div>
        </>
      ) : (
        <div className="max-w-6xl mx-auto px-6 pb-10">
          <div className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden">
            <SnippetPreview
              code={snippet.code}
              previewType={previewType as any}
            />

            <div className="p-6 bg-black text-green-400 text-sm overflow-x-auto">
              <pre>{snippet.code}</pre>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 FLOATING COPY (MEJOR UX) */}
      <div className="fixed bottom-6 right-6 z-50">
        <CopyButton code={snippet.code} snippetId={snippet.id} />
      </div>
    </main>
  );
}
