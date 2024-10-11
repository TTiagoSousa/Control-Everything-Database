-- CreateEnum
CREATE TYPE "TransitionType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');

-- CreateTable
CREATE TABLE "SavingsTransitions" (
    "id" TEXT NOT NULL,
    "transitionType" "TransitionType" NOT NULL,
    "platform" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currencyTypeID" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "SavingsTransitions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavingsTransitions" ADD CONSTRAINT "SavingsTransitions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavingsTransitions" ADD CONSTRAINT "SavingsTransitions_currencyTypeID_fkey" FOREIGN KEY ("currencyTypeID") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
