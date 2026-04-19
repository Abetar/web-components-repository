async function getData() {
  const res = await fetch("http://localhost:3000/api/metrics/top", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MetricsPage() {
  const data = await getData();

  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-10">
      <h1 className="text-2xl mb-6">
        Snippets más copiados
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-400">
          No hay datos aún
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((item: any, index: number) => (
            <div
              key={item.id}
              className="bg-[#1e293b] p-4 rounded-lg border border-[#334155]"
            >
              <div className="flex justify-between">
                <span>
                  {index + 1}. {item.name}
                </span>
                <span className="text-blue-400">
                  {item.copies} copias
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}