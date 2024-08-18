import { convertTotalToCurrency } from "src/utils/convertions/convertion";
import { roundToFixed } from "src/utils/numbers/round.to.fixed";
import { getTotalCurrencyPerPlatform } from "./get.total.currency.per.platform";


export async function getTotalOnSavingsTransitionsConverted(
  userID: string,
  targetConversion: string
) {
  // Obter os totais por moeda
  const totalPerCurrency = await getTotalCurrencyPerPlatform(userID);

  // Converter e somar os totais
  let totalConverted = 0;
  let targetSymbol = ''; // Inicializar o símbolo de destino

  for (const platform of totalPerCurrency) {
    for (const item of platform.currencies) {
      const { total, currencyTypeID } = item;
      const conversionResult = await convertTotalToCurrency(total, targetConversion, { baseCurrency: currencyTypeID });
      totalConverted += parseFloat(conversionResult.value); // Somar o valor convertido
      targetSymbol = conversionResult.targetSymbol; // Atualizar o símbolo de destino
    }
  }

  const roundedResult = roundToFixed(totalConverted);
  return { totalConverted: roundedResult, targetSymbol };
}