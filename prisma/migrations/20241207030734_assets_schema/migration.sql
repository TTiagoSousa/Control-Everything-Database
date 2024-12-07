/*
  Warnings:

  - You are about to drop the column `website` on the `Platform` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('Stock', 'Etf', 'Bond', 'RealEstate', 'Commodity', 'Cryptocurrency');

-- DropIndex
DROP INDEX "Platform_website_key";

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "website";

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "apiId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "type" "AssetType" NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);
