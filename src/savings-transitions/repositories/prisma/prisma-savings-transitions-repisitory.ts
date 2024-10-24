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

  async findLast12MonthsByUser(userId: string) {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 12);
    startDate.setDate(1); // Primeiro dia de 12 meses atrás

    const savingsTransitions = await prisma.savingsTransitions.groupBy({
      by: ['currencyTypeID', 'date'],
      _sum: {
        amount: true
      },
      where: {
        createdById: userId,
        date: {
          gte: startDate,
        },
      },
      orderBy: {
        date: 'asc'
      }
    });

    return savingsTransitions;
  }

  async findAll(userId: string): Promise<SavingsTransitions[]>{
    const savingTransitions = await prisma.savingsTransitions.findMany({
      where:{
        createdById: userId,
        isActive: true,
      },
    })

    return savingTransitions
  }
}