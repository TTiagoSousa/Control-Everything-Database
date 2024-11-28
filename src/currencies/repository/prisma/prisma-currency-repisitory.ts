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

  async updateRate(short_code: string, rate: number) {
    const updatedCurrency = await prisma.currency.update({
      where: {
        short_code,
      },
      data: {
        rate,
      },
    });

    return updatedCurrency;
  }

  async findByShortCode_returnID(short_code: string): Promise<string | null> {
    const currency = await prisma.currency.findUnique({
      where: {
        short_code,
      },
      select: {
        id: true,
      },
    });
  
    return currency ? currency.id : null;
  }

  async updateCurrencyHistoricalRates(currencyID: string, historicalRates: { [date: string]: number }): Promise<Currency> {
    const updatedCurrency = await prisma.currency.update({
      where: { id: currencyID },
      data: { historicalRates },
    });

    return updatedCurrency;
  }
}
