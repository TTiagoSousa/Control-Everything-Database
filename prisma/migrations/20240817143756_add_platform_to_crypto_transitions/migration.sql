/*
  Warnings:

  - You are about to drop the column `platform` on the `CryptoTransitions` table. All the data in the column will be lost.
  - Added the required column `platformID` to the `CryptoTransitions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CryptoTransitions" DROP COLUMN "platform",
ADD COLUMN     "platformID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CryptoTransitions" ADD CONSTRAINT "CryptoTransitions_platformID_fkey" FOREIGN KEY ("platformID") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
