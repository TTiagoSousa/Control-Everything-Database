/*
  Warnings:

  - Added the required column `type` to the `AuthorizedBroker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PlatformType" ADD VALUE 'Broker';

-- AlterTable
ALTER TABLE "AuthorizedBroker" ADD COLUMN     "type" "PlatformType" NOT NULL;
