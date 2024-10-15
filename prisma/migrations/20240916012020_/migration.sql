/*
  Warnings:

  - You are about to drop the `FunctionValidation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FunctionValidationType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ValidationItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FunctionValidation" DROP CONSTRAINT "FunctionValidation_typeId_fkey";

-- DropForeignKey
ALTER TABLE "FunctionValidation" DROP CONSTRAINT "FunctionValidation_validationItemId_fkey";

-- DropTable
DROP TABLE "FunctionValidation";

-- DropTable
DROP TABLE "FunctionValidationType";

-- DropTable
DROP TABLE "ValidationItem";

-- DropEnum
DROP TYPE "FunctionStatus";
