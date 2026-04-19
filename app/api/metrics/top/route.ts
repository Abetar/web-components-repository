import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

    // 🔥 TIPADO EXPLÍCITO (FIX)
    const snippetIds = data.map(
      (item: { snippetId: string }) => item.snippetId
    );

    const snippets = await prisma.snippet.findMany({
      where: {
        id: {
          in: snippetIds,
        },
      },
    });

    return NextResponse.json({
      ok: true,
      data: snippets,
    });
  } catch (error) {
    console.error("TOP METRICS ERROR:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}