/*
  Warnings:

  - You are about to drop the `ValidationItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `typeId` to the `FunctionValidation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ValidationItem" DROP CONSTRAINT "ValidationItem_functionValidationId_fkey";

-- AlterTable
ALTER TABLE "FunctionValidation" ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ValidationItem";

-- DropEnum
DROP TYPE "FunctionStatus";

-- CreateTable
CREATE TABLE "FunctionValidationType" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "FunctionValidationType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FunctionValidationType_id_key" ON "FunctionValidationType"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FunctionValidationType_type_key" ON "FunctionValidationType"("type");

-- AddForeignKey
ALTER TABLE "FunctionValidation" ADD CONSTRAINT "FunctionValidation_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FunctionValidationType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
