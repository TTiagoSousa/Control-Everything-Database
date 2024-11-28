import { PrismaCurrencyRepository } from "../repository/prisma/prisma-currency-repisitory";
import { NotFoundException } from "@nestjs/common";

export async function getCurrencyRatesByID(currencyID: string): Promise<{ [key: string]: number }> {
  const CurrencyRepository = new PrismaCurrencyRepository();

  const currency = await CurrencyRepository.findByID(currencyID);
  if (!currency) {
    throw new NotFoundException(`Currency with ID ${currencyID} not found.`);
  }

  // Directly asserting the type of historicalRates
  return currency.historicalRates as { [key: string]: number } || {};
}