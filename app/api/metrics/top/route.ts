import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const metrics = await prisma.snippetMetricDaily.groupBy({
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

    const snippetIds = metrics.map(
      (item: { snippetId: string }) => item.snippetId,
    );

    const snippets = await prisma.snippet.findMany({
      where: {
        id: {
          in: snippetIds,
        },
      },
    });

    // 🔥 MAP TIPADO CORRECTAMENTE
    const result = metrics.map((metric) => {
      const snippet = snippets.find((s) => s.id === metric.snippetId);

      return {
        ...snippet,
        copies: metric._sum.copyCount ?? 0,
      };
    });

    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error("TOP METRICS ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
