import { PrismaCryptoTransitionsRepository } from "../repositories/prisma/prisma-crypto-transitions-repisitory";

export async function getTotalCryptoTransitionsByUserId(
  userId: string,
) {
  
  const CryptoTransitionRepository = new PrismaCryptoTransitionsRepository()

  const totalCount = await CryptoTransitionRepository.countByUserId(userId)

  return totalCount;
}