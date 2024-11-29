import { CurrencyExchangeRate, Prisma } from "@prisma/client";

export interface CurrenciesExchangeRateRepository {
  create(data: Prisma.CurrencyExchangeRateUncheckedCreateInput): Promise<CurrencyExchangeRate>;
}