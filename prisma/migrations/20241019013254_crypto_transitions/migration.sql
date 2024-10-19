-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BUY', 'SELL', 'DROP');

-- CreateTable
CREATE TABLE "CryptoTransition" (
    "id" TEXT NOT NULL,
    "platformID" TEXT NOT NULL,
    "orderType" "OrderType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "quantityPurchased" DOUBLE PRECISION NOT NULL,
    "totalSpendUSD" DOUBLE PRECISION NOT NULL,
    "feesCrypto" DOUBLE PRECISION NOT NULL,
    "feesUSD" DOUBLE PRECISION NOT NULL,
    "createdById" TEXT NOT NULL,
    "cryptoId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "CryptoTransition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CryptoTransition" ADD CONSTRAINT "CryptoTransition_platformID_fkey" FOREIGN KEY ("platformID") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CryptoTransition" ADD CONSTRAINT "CryptoTransition_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
