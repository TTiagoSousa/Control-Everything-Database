-- CreateTable
CREATE TABLE "BrokerFeature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "authorizedBrokerId" TEXT NOT NULL,

    CONSTRAINT "BrokerFeature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BrokerFeature" ADD CONSTRAINT "BrokerFeature_authorizedBrokerId_fkey" FOREIGN KEY ("authorizedBrokerId") REFERENCES "AuthorizedBroker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
