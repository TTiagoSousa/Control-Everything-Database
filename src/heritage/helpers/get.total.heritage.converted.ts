import { getTotalCurrentInvestment } from "src/crypto-transitions/helpers/get.total.current.investment.crypto";
import { getTotalOnSavingsTransitionsConverted } from "src/saving-transitions/helpers/get.total.on.savings.converted";

export async function getTotalHeritageConverted(
  userId: string,
  targetConversion: string
) {
  try {
    // Obter os valores totalConverted das duas fontes de dados
    const cryptoResult = await getTotalCurrentInvestment(userId, targetConversion);
    const savingsResult = await getTotalOnSavingsTransitionsConverted(userId, targetConversion);

    // Extrair os valores totalConverted de cada resultado
    const cryptoTotalConverted = typeof cryptoResult.totalConverted === 'string' ? parseFloat(cryptoResult.totalConverted) : cryptoResult.totalConverted;
    const savingsTotalConverted = typeof savingsResult.totalConverted === 'string' ? parseFloat(savingsResult.totalConverted) : savingsResult.totalConverted;

    // Calcular a soma dos valores totalConverted
    const totalConvertedSum = cryptoTotalConverted + savingsTotalConverted;

    // Comparar totalSpentInUSD com totalCurrentInvestment para determinar lucro ou perda
    let statusMessage: string;
    if (cryptoResult.totalCurrentInvestment > cryptoResult.totalSpentInUSD) {
      statusMessage = 'Você está no lucro!';
    } else if (cryptoResult.totalCurrentInvestment < cryptoResult.totalSpentInUSD) {
      statusMessage = 'Você está no negativo.';
    } else {
      statusMessage = 'Você está equilibrado.';
    }

    // Retornar os dados estruturados com a soma, símbolo, status e os arrays de resultados
    return {
      totalConverted: totalConvertedSum,
      targetSymbol: cryptoResult.targetSymbol,
      status: statusMessage,
      cryptoData: [cryptoResult], // Array contendo o resultado de crypto
      savingsData: [savingsResult] // Array contendo o resultado de savings
    };
  } catch (error) {
    console.error('Erro ao obter o total convertido:', error);
    throw error;
  }
}