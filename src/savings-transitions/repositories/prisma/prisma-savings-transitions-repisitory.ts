import { Prisma, SavingsTransitions } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { SavingsTransitionsRepository } from "../savings-transitions-repisitory";

export class PrismaSavingsTransitionsRepository implements SavingsTransitionsRepository{

  async create(data: Prisma.SavingsTransitionsUncheckedCreateInput) {
    const SavingTransiton = await prisma.savingsTransitions.create({
      data,
    })

    return SavingTransiton
  }

  async countByUserId(userId: string): Promise<number> {
   
    const count = await prisma.savingsTransitions.count({
      where: {
        createdById: userId,
      },
    });
    return count;
  }

}