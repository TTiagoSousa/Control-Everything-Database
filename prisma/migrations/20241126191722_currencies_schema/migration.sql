-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_code" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "precision" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "symbol_first" BOOLEAN NOT NULL,
    "decimal_mark" TEXT NOT NULL,
    "thousands_separator" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Currency_short_code_key" ON "Currency"("short_code");
