/*
  Warnings:

  - You are about to drop the `Crypto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CryptoTransitions" DROP CONSTRAINT "CryptoTransitions_cryptoId_fkey";

-- DropTable
DROP TABLE "Crypto";
