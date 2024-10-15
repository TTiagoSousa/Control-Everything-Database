import { Prisma, AuthorizedBroker } from "@prisma/client";

export interface AuthorizedBrokerRepository{
  create(data: Prisma.AuthorizedBrokerUncheckedCreateInput): Promise<AuthorizedBroker>;
}