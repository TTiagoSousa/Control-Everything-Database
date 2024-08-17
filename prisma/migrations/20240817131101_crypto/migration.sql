-- CreateTable
CREATE TABLE "Crypto" (
    "id" TEXT NOT NULL,
    "cryptoAPIid" TEXT NOT NULL,
    "cryptoName" TEXT NOT NULL,
    "cryptoSymbol" TEXT NOT NULL,
    "cryptoImage" TEXT NOT NULL,

    CONSTRAINT "Crypto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Crypto_cryptoAPIid_key" ON "Crypto"("cryptoAPIid");

-- AddForeignKey
ALTER TABLE "CryptoTransitions" ADD CONSTRAINT "CryptoTransitions_cryptoId_fkey" FOREIGN KEY ("cryptoId") REFERENCES "Crypto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
