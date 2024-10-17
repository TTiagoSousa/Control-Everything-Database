import { Prisma, Employee } from "@prisma/client";
import { AuthorizedBrokerRepository } from "../autorized-broker-api-repository";
import { prisma } from '../../../lib/prisma';

export class PrismaAuthorizedBrokerRepository implements AuthorizedBrokerRepository{

  async create(data: Prisma.AuthorizedBrokerUncheckedCreateInput) {
    const broker = await prisma.authorizedBroker.create({
      data,
    })

    return broker
  }

  async findByName(name: string) {
    return await prisma.authorizedBroker.findUnique({
      where: { name },
    });
  }
}