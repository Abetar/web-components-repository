-- CreateEnum
CREATE TYPE "SnippetStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "previewCode" TEXT,
    "status" "SnippetStatus" NOT NULL DEFAULT 'DRAFT',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SnippetMetricDaily" (
    "id" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "viewsCount" INTEGER NOT NULL DEFAULT 0,
    "copyCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SnippetMetricDaily_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SnippetToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_SnippetToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CategoryToSnippet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToSnippet_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Snippet_slug_key" ON "Snippet"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "SnippetMetricDaily_date_idx" ON "SnippetMetricDaily"("date");

-- CreateIndex
CREATE UNIQUE INDEX "SnippetMetricDaily_snippetId_date_key" ON "SnippetMetricDaily"("snippetId", "date");

-- CreateIndex
CREATE INDEX "_SnippetToTag_B_index" ON "_SnippetToTag"("B");

-- CreateIndex
CREATE INDEX "_CategoryToSnippet_B_index" ON "_CategoryToSnippet"("B");

-- AddForeignKey
ALTER TABLE "SnippetMetricDaily" ADD CONSTRAINT "SnippetMetricDaily_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "Snippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SnippetToTag" ADD CONSTRAINT "_SnippetToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSnippet" ADD CONSTRAINT "_CategoryToSnippet_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToSnippet" ADD CONSTRAINT "_CategoryToSnippet_B_fkey" FOREIGN KEY ("B") REFERENCES "Snippet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
