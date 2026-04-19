import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// 🔍 GET snippet por ID
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const snippet = await prisma.snippet.findUnique({
      where: { id },
      include: {
        categories: true,
        tags: true,
      },
    });

    if (!snippet) {
      return Response.json(
        { error: "Snippet no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(snippet);
  } catch (error) {
    console.error("GET SNIPPET ERROR:", error);

    return Response.json(
      { error: "Error obteniendo snippet" },
      { status: 500 }
    );
  }
}

// ✏️ UPDATE snippet
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { name, description, code } = body;

    if (!name || !description || !code) {
      return Response.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    const snippet = await prisma.snippet.update({
      where: { id },
      data: {
        name,
        description,
        code,
      },
    });

    return Response.json(snippet);
  } catch (error) {
    console.error("UPDATE SNIPPET ERROR:", error);

    return Response.json(
      { error: "Error actualizando snippet" },
      { status: 500 }
    );
  }
}

// 🗑 DELETE snippet
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // 1) borrar métricas relacionadas
    await prisma.snippetMetricDaily.deleteMany({
      where: {
        snippetId: id,
      },
    });

    // 2) borrar snippet
    await prisma.snippet.delete({
      where: {
        id,
      },
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("DELETE SNIPPET ERROR:", error);

    return Response.json(
      {
        error: "Error eliminando snippet",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}