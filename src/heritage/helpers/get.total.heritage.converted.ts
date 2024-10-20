import { getTotalConvertedCrypto } from "src/crypto-transitions/helpers/get.total.converted.crypto";
import { getTotalOnSavingsTransitionsConverted } from "src/savings-transitions/helpers/get.total.on.savings.converted";

export async function getTotalHeritageConverted(
  userId: string,
  targetConversion: string
) {
  // Chamar as funções para obter os totais convertidos
  const savingsResult = await getTotalOnSavingsTransitionsConverted(userId, targetConversion);
  const cryptoResult = await getTotalConvertedCrypto(userId, targetConversion);

  // Somar os totais convertidos
  const totalConverted = savingsResult.totalConverted + cryptoResult.totalConverted;

  // Verificar se os símbolos de destino são os mesmos
  if (savingsResult.targetSymbol !== cryptoResult.targetSymbol) {
    throw new Error('Os símbolos de moeda de destino não coincidem.');
  }

  // Usar o símbolo de destino (ambos são iguais)
  const targetSymbol = savingsResult.targetSymbol;

  // Retornar o total combinado e o símbolo
  return { totalConverted, targetSymbol };
}