/*
  Warnings:

  - You are about to drop the column `platform` on the `SavingsTransitions` table. All the data in the column will be lost.
  - Added the required column `platformID` to the `SavingsTransitions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('Bank', 'Crypto_Exchange', 'Crypto_Wallet');

-- AlterTable
ALTER TABLE "SavingsTransitions" DROP COLUMN "platform",
ADD COLUMN     "platformID" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Platform" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" "PlatformType" NOT NULL,
    "website" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "PlatformStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Platform_website_key" ON "Platform"("website");

-- AddForeignKey
ALTER TABLE "SavingsTransitions" ADD CONSTRAINT "SavingsTransitions_platformID_fkey" FOREIGN KEY ("platformID") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
