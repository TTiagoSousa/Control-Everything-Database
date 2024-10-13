/*
  Warnings:

  - Added the required column `image` to the `AuthorizedBroker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthorizedBroker" ADD COLUMN     "image" TEXT NOT NULL;
