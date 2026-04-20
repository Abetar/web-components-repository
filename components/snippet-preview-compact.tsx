"use client";

type Props = {
  code: string;
  previewType?: "component" | "section" | "fullwidth";
};

export default function SnippetPreviewCompact({
  code,
  previewType = "component",
}: Props) {
  const html = code.replace(/className=/g, "class=");

  return (
    <div
      className={`
        w-full rounded-lg overflow-hidden border border-[#334155]
        bg-[#0f172a]
      `}
    >
      <div
        className={`
          w-full overflow-hidden relative
          ${
            previewType === "component"
              ? "h-[180px] flex items-center justify-center"
              : previewType === "section"
              ? "h-[220px]"
              : "h-[140px]" // 🔥 NAVBAR / FULLWIDTH
          }
        `}
      >
        <iframe
          srcDoc={`
            <html>
              <head>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  body { margin:0; }
                </style>
              </head>
              <body>
                ${html}
              </body>
            </html>
          `}
          className={`
            w-full border-0
            ${
              previewType === "fullwidth"
                ? "h-[400px]" // 🔥 lo dejamos grande pero se recorta
                : "h-full"
            }
          `}
        />

        {/* 🔥 overlay fade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0f172a] to-transparent" />
      </div>
    </div>
  );
}
