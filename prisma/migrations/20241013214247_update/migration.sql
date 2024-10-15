/*
  Warnings:

  - You are about to drop the column `baseUrl` on the `AuthorizedBroker` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `AuthorizedBroker` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Platform` table. All the data in the column will be lost.
  - Added the required column `logo` to the `AuthorizedBroker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `AuthorizedBroker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Platform` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthorizedBroker" DROP COLUMN "baseUrl",
DROP COLUMN "image",
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "image",
DROP COLUMN "status",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "logo" TEXT NOT NULL;

-- DropEnum
DROP TYPE "PlatformStatus";
