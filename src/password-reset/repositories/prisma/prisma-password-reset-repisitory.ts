import { Prisma, PasswordResetToken } from "@prisma/client";
import { ResetPasswordRepositoryRepository } from "../password-reset-repository";
import { prisma } from '../../../lib/prisma';

export class PrismaResetPasswordRepository implements ResetPasswordRepositoryRepository{

  async create(data: Prisma.PasswordResetTokenUncheckedCreateInput): Promise<PasswordResetToken> {
    const token = await prisma.passwordResetToken.create({
      data,
    });

    return token;
  }

  async deleteExpiredTokens(): Promise<number> {
    const now = new Date();
    const result = await prisma.passwordResetToken.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });
    return result.count;
  }

  async update(id: string, data: Prisma.PasswordResetTokenUncheckedUpdateInput): Promise<PasswordResetToken> {
    return await prisma.passwordResetToken.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async findByUserId(userId: string): Promise<PasswordResetToken | null> {
    return await prisma.passwordResetToken.findFirst({
      where: {
        userId: userId,
      },
    });
  }
}