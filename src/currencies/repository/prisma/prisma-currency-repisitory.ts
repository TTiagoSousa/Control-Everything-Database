import { Prisma, PrismaClient, Currency} from "@prisma/client";
import { CurrencyRepository } from "../currency-repository";
import { prisma } from '../../../lib/prisma';


export class PrismaCurrencyRepository implements CurrencyRepository{

  async create(data: Prisma.CurrencyUncheckedCreateInput) {
    const currency = await prisma.currency.create({
      data,
    })

    return currency
  }

  async findByID(id: string) {
    const currencyID = await prisma.currency.findUnique({
      where: {
        id
      },
    });

    return currencyID;
  }

  async findAll(){
    const currencies = await prisma.currency.findMany();

    return currencies;
  }
}
