import { Prisma, PasswordResetToken } from "@prisma/client";

export interface ResetPasswordRepositoryRepository{
  create(data: Prisma.PasswordResetTokenUncheckedCreateInput): Promise<PasswordResetToken>;
}