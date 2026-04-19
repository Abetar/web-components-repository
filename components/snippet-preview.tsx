"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { FaSun, FaMoon, FaExpand, FaTimes } from "react-icons/fa";

type Props = {
  code: string;
  previewType?: "component" | "section" | "fullwidth";
};

export default function SnippetPreview({
  code,
  previewType = "component",
}: Props) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const fullscreenIframeRef = useRef<HTMLIFrameElement | null>(null);

  const html = code.replace(/className=/g, "class=");
  const isExpandable = previewType === "section" || previewType === "fullwidth";

  const iframeDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              background: ${mode === "light" ? "#ffffff" : "#020617"};
              font-family: sans-serif;
            }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  }, [html, mode]);

  const resizeIframe = useCallback(
    (iframe: HTMLIFrameElement | null) => {
      if (!iframe) return;

      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        const body = doc.body;
        const htmlEl = doc.documentElement;

        const height = Math.max(
          body?.scrollHeight || 0,
          body?.offsetHeight || 0,
          htmlEl?.scrollHeight || 0,
          htmlEl?.offsetHeight || 0,
        );

        iframe.style.height = `${height}px`;
      } catch {}
    },
    [previewType],
  );

  useEffect(() => {
    const id = window.setTimeout(() => {
      resizeIframe(iframeRef.current);
      resizeIframe(fullscreenIframeRef.current);
    }, 200);

    return () => window.clearTimeout(id);
  }, [iframeDoc, resizeIframe]);

  return (
    <>
      <div className="mt-4 border border-[#334155] rounded-xl overflow-hidden">
        <div className="bg-[#1e293b] px-3 py-2 flex items-center justify-between border-b border-[#334155]">
          <span className="text-xs text-gray-400">Preview</span>

          <div className="flex items-center gap-2">
            {isExpandable && (
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 rounded bg-[#0f172a] hover:bg-[#020617]"
              >
                <FaExpand className="text-xs text-gray-300" />
              </button>
            )}

            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className="p-1.5 rounded bg-[#0f172a]"
            >
              {mode === "light" ? (
                <FaMoon className="text-white text-xs" />
              ) : (
                <FaSun className="text-yellow-400 text-xs" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`
          ${previewType === "component" ? "p-6 flex justify-center" : "p-0 w-full"}
          ${mode === "light" ? "bg-[#f8fafc]" : "bg-[#020617]"}
          `}
        >
          <iframe
            ref={iframeRef}
            srcDoc={iframeDoc}
            onLoad={() => resizeIframe(iframeRef.current)}
            className="w-full border-0"
            style={{
              minHeight: previewType === "component" ? "280px" : "auto",
            }}
          />
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="absolute top-0 left-0 w-full flex justify-between items-center p-4 bg-black/60 z-50">
            <span className="text-white text-sm">Preview</span>

            <div className="flex gap-4 items-center">
              <button
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                className="text-white"
              >
                {mode === "light" ? <FaMoon /> : <FaSun />}
              </button>

              <button
                onClick={() => setIsFullscreen(false)}
                className="text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <iframe
            ref={fullscreenIframeRef}
            srcDoc={iframeDoc}
            onLoad={() => resizeIframe(fullscreenIframeRef.current)}
            className="w-full h-full border-0"
          />
        </div>
      )}
    </>
  );
}
