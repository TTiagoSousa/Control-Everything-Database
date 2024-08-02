/*
  Warnings:

  - Added the required column `feesPaid` to the `SavingTransition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TransitionType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "SavingTransition" ADD COLUMN     "feesPaid" DOUBLE PRECISION NOT NULL;
