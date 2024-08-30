import { Prisma, CryptoTransitions } from "@prisma/client";
import { prisma } from '../../../lib/prisma';
import { CryptoTransitionRepository } from "../crypto-transitions-repisitory";

export class PrismaCryptoTransitionsRepository implements CryptoTransitionRepository{

  async create(data: Prisma.CryptoTransitionsUncheckedCreateInput) {
    const CryptoTransiton = await prisma.cryptoTransitions.create({
      data,
    })

    return CryptoTransiton;
  }

  async countByUserId(userId: string): Promise<number> {
   
    const count = await prisma.cryptoTransitions.count({
      where: {
        createdById: userId,
      },
    });
    return count;
  }
  
  async findMany(userId: string): Promise<CryptoTransitions[]> {
    const totalByCryptoType = await prisma.cryptoTransitions.findMany({
      where: {
        createdById: userId,
        isActive: true,
      },
    })

    return totalByCryptoType
  }

  async findFirstTransitionByUserId(userId: string): Promise<CryptoTransitions | null> {
    const firstTransition = await prisma.cryptoTransitions.findFirst({
      where: {
        createdById: userId,
        isActive: true,
      },
      orderBy: {
        date: 'asc', // Ordena pela data em ordem crescente para pegar a primeira transição
      },
    });

    return firstTransition;
  }
  
  async getPurchaseDate(userId: string, cryptoId: string): Promise<Date | null> {
    const transition = await prisma.cryptoTransitions.findFirst({
      where: {
        createdById: userId,
        cryptoId: cryptoId,
        isActive: true,
      },
      orderBy: {
        date: 'asc', // Ordena pela data em ordem crescente para pegar a data de compra mais antiga
      },
    });

    return transition ? transition.date : null;
  }
}