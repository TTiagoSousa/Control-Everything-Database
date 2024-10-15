import { generateCode } from "src/utils/token/generate.code";
import { PrismaResetPasswordRepository } from "../repositories/prisma/prisma-password-reset-repisitory";
import { BadRequestException } from "@nestjs/common";
import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { emailToUpdatePassword } from "./email/email.to.update.password";
import { EmailService } from "src/email/email.service";

export async function createPasswordResetToken(
  userId: string,
  emailService: EmailService
) {
  const resetPasswordRepository = new PrismaResetPasswordRepository();
  const usersRepository = new PrismaUsersRepository();

  const user = await usersRepository.findUserById(userId);
  if (!user) {
    throw new BadRequestException("Something is wrong");
  }

  const tokenCode = generateCode();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 20); // Alterado para 20 minutos

  try {
    // Check if a token already exists for the user
    const existingToken = await resetPasswordRepository.findByUserId(userId);

    if (existingToken) {
      const now = new Date();
      
      // Update the existing token with the new values
      const updatedToken = await resetPasswordRepository.update(existingToken.id, {
        token: tokenCode,
        expiresAt,
        createdAt: new Date(),
      });

      await emailToUpdatePassword(user.email, emailService, updatedToken.token);

      return updatedToken;
    } else {
      // Create a new token if one doesn't exist
      const newToken = await resetPasswordRepository.create({
        userId,
        token: tokenCode,
        expiresAt,
        createdAt: new Date(),
      });

      await emailToUpdatePassword(user.email, emailService, newToken.token);

      return newToken;
    }
  } catch (error) {
    throw new BadRequestException(error.message || "An error occurred while creating the reset token.");
  }
}