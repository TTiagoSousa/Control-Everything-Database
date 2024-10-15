/*
  Warnings:

  - Added the required column `validationItemId` to the `FunctionValidation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FunctionStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "FunctionValidation" ADD COLUMN     "validationItemId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ValidationItem" (
    "id" TEXT NOT NULL,
    "validation" TEXT NOT NULL,
    "status" "FunctionStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ValidationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationItem_id_key" ON "ValidationItem"("id");

-- AddForeignKey
ALTER TABLE "FunctionValidation" ADD CONSTRAINT "FunctionValidation_validationItemId_fkey" FOREIGN KEY ("validationItemId") REFERENCES "ValidationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
