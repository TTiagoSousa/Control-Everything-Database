import { BadGatewayException } from "@nestjs/common";
import { PrismaCurrencyRepository } from "../repository/prisma/prisma-currency-repisitory";
import { getCurrencyRateByDate } from "./get.currencies.rate.by.date";

export async function updateHistoricalRateIfNeeded (
  currencyID: string,
  date: string
){

  const CurrencyRepository = new PrismaCurrencyRepository();

  const currency = await CurrencyRepository.findByID(currencyID);
  if (!currency) {
    throw new BadGatewayException('Invalid currency ID provided.');
  }

  // Retrieves the historicalRates object from the currency, mapping dates to exchange rates. If it doesn't exist, uses an empty object.
  const historicalRates = currency.historicalRates as { [key: string]: number } || {};

  // Checks if there is already a rate for the specified date. If so, logs this information and terminates execution.
  if (historicalRates[date]) {
    console.log(`Rate for ${currency.code} on ${date} already exists.`);
    return;
  }

  // Attempts to fetch the exchange rate for the provided date.
  try {

    const baseCurrency = 'USD'; // Using the currency's code as the base
    const targetCurrency = currency.short_code; // Assuming you want to get the rate against USD

    // Calling getCurrencyRateByDate to obtain the exchange rate between the base and target currency on the specified date.
    const rateData = await getCurrencyRateByDate(baseCurrency, targetCurrency, date);

    // Updates the historical rates with the new rate obtained.
    historicalRates[date] = rateData.rate;
    await CurrencyRepository.updateCurrencyHistoricalRates(currencyID, historicalRates);

    console.log(`Added rate for ${currency.code} to ${rateData.currency} on ${date}: ${rateData.rate}`);
  } catch (error) {
    console.error(`Error fetching rate for ${currency.code} to USD on ${date}:`, error);
    throw new BadGatewayException(`Failed to fetch rate: ${error.message}`);
  }
}