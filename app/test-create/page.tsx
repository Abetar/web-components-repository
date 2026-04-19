"use client";

import { useState } from "react";

export default function TestCreatePage() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleCreate = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Botón UI prueba",
          description: "Botón simple para test",
          code: "<button className='bg-blue-500 text-white'>Click</button>",
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Test crear snippet</h1>

      <button
        onClick={handleCreate}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        {loading ? "Creando..." : "Crear snippet"}
      </button>

      <pre style={{ marginTop: 20 }}>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}