import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.snippetMetricDaily.groupBy({
      by: ["snippetId"],
      _sum: {
        copyCount: true,
      },
      orderBy: {
        _sum: {
          copyCount: "desc",
        },
      },
      take: 10,
    });

    const snippetIds = data.map((item) => item.snippetId);

    const snippets = await prisma.snippet.findMany({
      where: {
        id: {
          in: snippetIds,
        },
      },
    });

    // unir métricas + snippet
    const result = data.map((metric) => {
      const snippet = snippets.find(
        (s) => s.id === metric.snippetId
      );

      return {
        id: metric.snippetId,
        name: snippet?.name,
        copies: metric._sum.copyCount || 0,
      };
    });

    return Response.json(result);
  } catch (error) {
    console.error("TOP METRICS ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}