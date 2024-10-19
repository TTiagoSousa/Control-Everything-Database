import { Prisma, CryptoTransition } from "@prisma/client";

export interface CryptoTransitionRepository {
  create(data: Prisma.CryptoTransitionUncheckedCreateInput): Promise<CryptoTransition>;
} 