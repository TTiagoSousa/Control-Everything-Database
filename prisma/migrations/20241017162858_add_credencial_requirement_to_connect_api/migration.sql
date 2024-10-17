/*
  Warnings:

  - A unique constraint covering the columns `[hashSecretKey]` on the table `UserApiKey` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `credentialRequirement` to the `AuthorizedBroker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CredentialRequirement" AS ENUM ('KEY_ONLY', 'KEY_AND_SECRET');

-- AlterTable
ALTER TABLE "AuthorizedBroker" ADD COLUMN     "credentialRequirement" "CredentialRequirement" NOT NULL;

-- AlterTable
ALTER TABLE "UserApiKey" ADD COLUMN     "hashSecretKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UserApiKey_hashSecretKey_key" ON "UserApiKey"("hashSecretKey");
