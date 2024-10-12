import { PrismaCurrencyRepository } from "src/currencies/repository/prisma/prisma-currency-repisitory";
import { PrismaSavingsTransitionsRepository } from "../repositories/prisma/prisma-savings-transitions-repisitory";
import { PrismaPlatformRepository } from "src/platforms/repositories/prisma/prisma-platform-repisitory";

export async function printInvestments(userId: string) {
  const savingsTransitionsRepository = new PrismaSavingsTransitionsRepository();
  const currencyRepository = new PrismaCurrencyRepository();
  const platformRepository = new PrismaPlatformRepository();

  // Passo 1: Gerar os últimos 12 meses na ordem do mais antigo para o mais recente
  const today = new Date();
  const last12Months = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1); // Começa 12 meses atrás
    last12Months.push({
      month: date.getMonth() + 1,  // Mês (Janeiro = 1, etc.)
      year: date.getFullYear(),
      currencies: [],  // Aqui armazenaremos os dados por moeda
    });
  }

  // Criar um conjunto para armazenar as moedas únicas
  const uniqueCurrencies = new Set();

  // Passo 2: Buscar transições dos últimos 12 meses para o usuário
  const transitions = await savingsTransitionsRepository.findLast12MonthsByUser(userId);

  // Passo 3: Processar as transições e associá-las aos meses corretos
  for (const transition of transitions) {
    const currency = await currencyRepository.findByID(transition.currencyTypeID);

    if (!currency) {
      throw new Error(`Moeda não encontrada para o ID ${transition.currencyTypeID}`);
    }

    const transitionMonth = transition.date.getMonth() + 1;
    const transitionYear = transition.date.getFullYear();

    // Adicionar a moeda ao conjunto de moedas únicas
    uniqueCurrencies.add({
      short_code: currency.short_code,
      symbol: currency.symbol,
    });

    // Encontrar o mês correspondente na lista de 12 meses
    const monthEntry = last12Months.find(
      (entry) => entry.month === transitionMonth && entry.year === transitionYear
    );

    if (monthEntry) {
      // Verificar se já existe uma entrada para a moeda neste mês
      let currencyEntry = monthEntry.currencies.find(
        (c) => c.currency === currency.short_code
      );

      if (currencyEntry) {
        // Se já existir, somar o totalAmount
        currencyEntry.totalAmount += transition._sum.amount;
      } else {
        // Caso contrário, adicionar nova entrada
        monthEntry.currencies.push({
          currency: currency.short_code,
          symbol: currency.symbol,
          totalAmount: transition._sum.amount,
        });
      }
    }
  }

  // Converter o conjunto de moedas únicas em um array para retorno
  const currencyList = Array.from(uniqueCurrencies);

  // Retornar os últimos 12 meses com suas transações e a lista de moedas
  return {
    last12Months,
    currencyList
  };
}