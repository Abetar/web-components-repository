"use client";

import { useState } from "react";

type Props = {
  code: string;
  snippetId: string;
};

export default function CopyButton({ code, snippetId }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      // enviar métrica
      await fetch("/api/metrics/copy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippetId }),
      });

      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 mr-2 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 rounded-md"
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}