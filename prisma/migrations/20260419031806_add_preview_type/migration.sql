-- CreateEnum
CREATE TYPE "PreviewType" AS ENUM ('COMPONENT', 'SECTION', 'FULLWIDTH');

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "previewType" "PreviewType" NOT NULL DEFAULT 'COMPONENT';
