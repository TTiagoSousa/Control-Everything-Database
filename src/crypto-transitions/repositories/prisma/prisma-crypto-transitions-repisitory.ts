import { Prisma, CryptoTransition } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { CryptoTransitionRepository } from "../crypto-transitions-repisitory";

export class PrismaCryptoTransitionsRepository implements CryptoTransitionRepository{

  async create(data: Prisma.CryptoTransitionUncheckedCreateInput) {
    const CryptoTransiton = await prisma.cryptoTransition.create({
      data,
    })

    return CryptoTransiton;
  }

  async countByUserId(userId: string): Promise<number> {
   
    const count = await prisma.cryptoTransition.count({
      where: {
        createdById: userId,
      },
    });
    return count;
  }

  async findMany(userId: string): Promise<CryptoTransition[]> {
    const totalByCryptoType = await prisma.cryptoTransition.findMany({
      where: {
        createdById: userId,
        isActive: true,
      },
    })

    return totalByCryptoType
  }
}