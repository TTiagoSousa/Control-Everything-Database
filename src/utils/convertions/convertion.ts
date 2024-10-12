import { BadRequestException } from "@nestjs/common";
import { PrismaCurrencyRepository } from "src/currencies/repository/prisma/prisma-currency-repisitory"; 
import { roundToFixed } from "src/utils/numbers/round.to.fixed";

interface ConversionOptions {
  baseCurrency: string;
}

const cryptoSymbols: Record<string, string> = {
  Qwsogvtv82FCd: 'BTC',
  razxDUgYGNAdQ: 'ETH',
  WcwrkfNI4FUAe: 'BNB',
};

export async function convertTotalToCurrency(
  total: number,
  targetConversion: string,
  options: ConversionOptions,
) {
  
  const CurrencyRepository = new PrismaCurrencyRepository();

  const { baseCurrency } = options;
  
  if (targetConversion in cryptoSymbols) {
    // const cryptoSymbol = cryptoSymbols[targetConversion];

    // const cryptoPriceUSD = await getSinglePriceCrypto(targetConversion)
    // const baseCurrencyInfo = await CurrencyRepository.findByID(baseCurrency);

    // const targetRate = baseCurrencyInfo.rate;
    // const totalInBaseCurrency = total / targetRate;
    // const totalConverted = totalInBaseCurrency / cryptoPriceUSD;

    // const roundedResult = roundToFixed(totalConverted);

    // return { value: roundedResult, targetSymbol: cryptoSymbol };

  } else{

    const selectedCurrencyInfo = await CurrencyRepository.findByID(targetConversion);
    const baseCurrencyInfo = await CurrencyRepository.findByID(baseCurrency);

    if (!selectedCurrencyInfo) {
      throw new BadRequestException("Invalid target currency ID");
    }
    if (!baseCurrencyInfo) {
      throw new BadRequestException("Invalid base currency ID");
    }

    const targetRateUSD = selectedCurrencyInfo.rate; // Taxa de conversão USD/XXX

    // Converter total para dólares
    const totalInUSD = total / baseCurrencyInfo.rate;

    // Converter de dólares para a moeda escolhida
    const totalConverted = totalInUSD * targetRateUSD;

    const roundedResult = roundToFixed(totalConverted);

    return { value: roundedResult, targetSymbol: selectedCurrencyInfo.symbol };
  }
}