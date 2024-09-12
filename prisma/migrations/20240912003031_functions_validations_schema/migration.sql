-- CreateEnum
CREATE TYPE "FunctionStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "FunctionValidation" (
    "id" TEXT NOT NULL,
    "functionName" TEXT NOT NULL,

    CONSTRAINT "FunctionValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationItem" (
    "id" TEXT NOT NULL,
    "validation" TEXT NOT NULL,
    "status" "FunctionStatus" NOT NULL DEFAULT 'PENDING',
    "functionValidationId" TEXT NOT NULL,

    CONSTRAINT "ValidationItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FunctionValidation_id_key" ON "FunctionValidation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ValidationItem_id_key" ON "ValidationItem"("id");

-- AddForeignKey
ALTER TABLE "ValidationItem" ADD CONSTRAINT "ValidationItem_functionValidationId_fkey" FOREIGN KEY ("functionValidationId") REFERENCES "FunctionValidation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
