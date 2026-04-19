import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// 👉 GET (con filtros + categorías)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const snippets = await prisma.snippet.findMany({
      where: {
        ...(category && {
          categories: {
            some: {
              slug: category,
            },
          },
        }),

        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      ok: true,
      data: snippets,
    });
  } catch (error) {
    console.error("GET SNIPPETS ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 👉 POST (crear snippet)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      description,
      code,
      categorySlug,
      previewType,
    } = body;

    // 🔥 validación básica
    if (!name || !description || !code) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔥 mapping frontend → prisma enum
    const mapPreviewType = {
      component: "COMPONENT",
      section: "SECTION",
      fullwidth: "FULLWIDTH",
    } as const;

    const finalPreviewType =
      mapPreviewType[
        previewType as keyof typeof mapPreviewType
      ] || "COMPONENT";

    // 🔥 categoría fallback
    const finalCategory = categorySlug || "ui";

    // 🔥 generar slug único
    let baseSlug = generateSlug(name);
    let slug = baseSlug;

    let counter = 1;
    while (true) {
      const existing = await prisma.snippet.findUnique({
        where: { slug },
      });

      if (!existing) break;

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 🔥 crear snippet
    const snippet = await prisma.snippet.create({
      data: {
        name,
        description,
        code,
        slug,
        status: "DRAFT",
        previewType: finalPreviewType,

        categories: {
          connectOrCreate: [
            {
              where: { slug: finalCategory },
              create: {
                name:
                  finalCategory.charAt(0).toUpperCase() +
                  finalCategory.slice(1),
                slug: finalCategory,
              },
            },
          ],
        },
      },
      include: {
        categories: true,
      },
    });

    return Response.json({
      ok: true,
      data: snippet,
    });
  } catch (error) {
    console.error("CREATE SNIPPET ERROR:", error);

    return Response.json(
      {
        error: "Internal server error",
        details:
          error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}