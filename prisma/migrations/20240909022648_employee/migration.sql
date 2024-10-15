-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('ADMIN', 'PROGRAMMER', 'CUSTOMER_SUPPORT', 'NOT_ASSIGNED');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "employeeNumber" INTEGER NOT NULL,
    "jobTitle" "EmployeeRole" NOT NULL DEFAULT 'NOT_ASSIGNED',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeNumber_key" ON "Employee"("employeeNumber");
