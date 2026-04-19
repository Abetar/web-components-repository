import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { snippetId } = body;

    if (!snippetId) {
      return Response.json(
        { error: "Missing snippetId" },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await prisma.snippetMetricDaily.findFirst({
      where: {
        snippetId,
        date: today,
      },
    });

    if (existing) {
      await prisma.snippetMetricDaily.update({
        where: {
          id: existing.id,
        },
        data: {
          copyCount: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.snippetMetricDaily.create({
        data: {
          snippetId,
          date: today,
          copyCount: 1,
        },
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("COPY METRIC ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}