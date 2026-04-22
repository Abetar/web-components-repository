import Link from "next/link";
import CopyButton from "@/components/copy-button";
import SnippetPreviewCompact from "@/components/snippet-preview-compact";
import { FiTrendingUp } from "react-icons/fi";

async function getData() {
  const res = await fetch("https://web-components-repository.vercel.app/api/metrics/top", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MetricsPage() {
  const res = await getData();
  const data = res.data || [];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">

      {/* NAVBAR */}
      <div className="max-w-6xl mx-auto mb-10 flex justify-between items-center">
        <Link
          href="/explore"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to Explore
        </Link>

        <span className="text-sm text-gray-400">
          Popular snippets
        </span>
      </div>

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg">
            <FiTrendingUp className="text-blue-400 text-xl" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold">
              Most Copied Snippets
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Based on real usage and copy activity
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        <p className="text-gray-400 text-center">
          No data yet
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {data.map((item: any, index: number) => (
            <div
              key={item.id}
              className="bg-[#1e293b] border border-[#334155] rounded-xl overflow-hidden flex flex-col"
            >

              {/* HEADER */}
              <Link href={`/snippets/${item.slug}`}>
                <div className="p-4 border-b border-[#334155] cursor-pointer hover:bg-[#263449] transition">

                  <div className="flex justify-between items-center">
                    <h2 className="text-md font-medium">
                      #{index + 1} {item.name}
                    </h2>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        copies
                      </span>

                      <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-md font-medium">
                        {item.copies?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                </div>
              </Link>

              {/* PREVIEW */}
              <div className="p-4 bg-[#0f172a] flex justify-center">
                <SnippetPreviewCompact
                  code={item.code}
                  previewType={item.previewType}
                />
              </div>

              {/* CODE */}
              <div className="px-4 pb-4">
                <pre className="text-xs text-green-400 bg-black p-3 rounded overflow-hidden max-h-32">
                  {item.code.slice(0, 300)}...
                </pre>
              </div>

              {/* ACTIONS */}
              <div className="p-4 border-t border-[#334155] flex justify-end mt-auto">
                <CopyButton code={item.code} snippetId={item.id} />
              </div>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}