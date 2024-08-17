import { Prisma, CryptoTransitions } from "@prisma/client";

export interface CryptoTransitionRepository {
  create(data: Prisma.CryptoTransitionsUncheckedCreateInput): Promise<CryptoTransitions>;
  countByUserId(userId: string): Promise<number>;
  findMany(userId: string): Promise<CryptoTransitions[]>
  findFirstTransitionByUserId(userId: string): Promise<CryptoTransitions | null>
} 