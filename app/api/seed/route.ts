import { prisma } from "@/lib/prisma";

export async function GET() {
  await prisma.category.createMany({
    data: [
      { name: "UI", slug: "ui" },
      { name: "SaaS", slug: "saas" },
      { name: "Forms", slug: "forms" },
      { name: "Marketing", slug: "marketing" },
    ],
    skipDuplicates: true,
  });

  return Response.json({ ok: true });
}