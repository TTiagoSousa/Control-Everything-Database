import { Prisma, PrismaClient, Currency, CurrencyExchangeRate} from "@prisma/client";
import { CurrenciesExchangeRateRepository } from "../currencies-exchange-rate-repository";
import { prisma } from '../../../lib/prisma';


export class PrismaCurrenciesExchangeRateRepository implements CurrenciesExchangeRateRepository{

  async create(data: Prisma.CurrencyExchangeRateUncheckedCreateInput) {
    const CurrenciesExchangeRate = await prisma.currencyExchangeRate.create({
      data,
    })

    return CurrenciesExchangeRate;
  }

  async findByCurrencyIdAndDate(currencyId: string, date: string): Promise<CurrencyExchangeRate | null> {
    const exchangeRate = await prisma.currencyExchangeRate.findFirst({
      where: {
        currencyId: currencyId,
        date: new Date(date)  // Ensure the date format matches the one stored in your database
      },
    });
    return exchangeRate;
  }
}
