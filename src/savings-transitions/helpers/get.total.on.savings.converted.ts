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
      totalConverted += parseFloat(roundToFixed(parseFloat(conversionResult.value))); // Acumular o valor convertido
      targetSymbol = conversionResult.targetSymbol; // Atualizar o símbolo de destino
    }
  }

  // Não é necessário arredondar novamente, pois já foi feito dentro do loop
  return { totalConverted, targetSymbol };
}