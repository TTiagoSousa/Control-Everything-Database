-- CreateEnum
CREATE TYPE "TransitionCryptoTypeRole" AS ENUM ('buy', 'sell', 'drop');

-- CreateTable
CREATE TABLE "CryptoTransitions" (
    "id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "orderType" "TransitionCryptoTypeRole" NOT NULL DEFAULT 'buy',
    "date" TIMESTAMP(3) NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "quantityPurchased" DOUBLE PRECISION NOT NULL,
    "totalSpendUSD" DOUBLE PRECISION NOT NULL,
    "feesCrypto" DOUBLE PRECISION,
    "feesUSD" DOUBLE PRECISION,
    "createdById" TEXT NOT NULL,
    "cryptoId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "CryptoTransitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CryptoTransitions" ADD CONSTRAINT "CryptoTransitions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
