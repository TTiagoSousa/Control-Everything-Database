import { PrismaCurrencyRepository } from "src/currencies/repository/prisma/prisma-currency-repisitory"; 
import { PrismaSavingsTransitionsRepository } from "../repositories/prisma/prisma-savings-transitions-repisitory"; 
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";

interface CurrencyInfo {
  short_code: string;
  symbol: string;
}

interface Transition {
  currencyTypeID: string;
  amount: number;
  platformID: string;
}

export async function getTotalCurrencyPerPlatform(userID: string) {

  const SavingsTransitionRepository = new PrismaSavingsTransitionsRepository();
  const CurrencyRepository = new PrismaCurrencyRepository();
  const PlatformRepository = new PrismaPlatformRepository();

  const transitions: Transition[] = await SavingsTransitionRepository.findAll(userID);

  // Object to store totals by platform and currency
  const totalsMap: Record<string, { platformName: string; currencies: Record<string, { total: number; currencyInfo: CurrencyInfo }> }> = {};

  for (const transition of transitions) {
    const { currencyTypeID, amount, platformID } = transition;

    if (!totalsMap[platformID]) {
      const platformInfo = await PlatformRepository.findPlatformByID(platformID);
      totalsMap[platformID] = {
        platformName: platformInfo.name,
        currencies: {}
      };
    }

    const platformEntry = totalsMap[platformID];

    if (!platformEntry.currencies[currencyTypeID]) {
      const currencyInfo = await CurrencyRepository.findByID(currencyTypeID);
      platformEntry.currencies[currencyTypeID] = {
        total: amount,
        currencyInfo
      };
    } else {
      platformEntry.currencies[currencyTypeID].total += amount;
    }
  }

  // Convert the object to the desired array format
  const result = Object.entries(totalsMap).map(([platformID, { platformName, currencies }]) => ({
    platformID,
    platformName,
    currencies: Object.entries(currencies).map(([currencyTypeID, { total, currencyInfo }]) => ({
      currencyTypeID,
      total,
      symbol: currencyInfo.symbol,
      code: currencyInfo.short_code,
    }))
  }));

  return result;
}