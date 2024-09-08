/*
  Warnings:

  - You are about to drop the column `decimal_digits` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `name_plural` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `rounding` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `symbol_native` on the `Currency` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Currency` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_code]` on the table `Currency` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `decimal_mark` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precision` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_code` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subunit` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol_first` to the `Currency` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thousands_separator` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Currency_code_key";

-- AlterTable
ALTER TABLE "Currency" DROP COLUMN "decimal_digits",
DROP COLUMN "name_plural",
DROP COLUMN "rounding",
DROP COLUMN "symbol_native",
DROP COLUMN "type",
ADD COLUMN     "decimal_mark" TEXT NOT NULL,
ADD COLUMN     "precision" INTEGER NOT NULL,
ADD COLUMN     "short_code" TEXT NOT NULL,
ADD COLUMN     "subunit" TEXT NOT NULL,
ADD COLUMN     "symbol_first" BOOLEAN NOT NULL,
ADD COLUMN     "thousands_separator" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Currency_short_code_key" ON "Currency"("short_code");
