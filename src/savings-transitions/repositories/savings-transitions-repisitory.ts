import { Prisma, SavingsTransitions } from "@prisma/client";

export interface SavingsTransitionsRepository {
  create(data: Prisma.SavingsTransitionsUncheckedCreateInput): Promise<SavingsTransitions>;
  countByUserId(userId: string): Promise<number>;
} 