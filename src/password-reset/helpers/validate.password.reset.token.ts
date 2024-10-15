import { PrismaResetPasswordRepository } from "../repositories/prisma/prisma-password-reset-repisitory";
import { BadRequestException, UnauthorizedException } from "@nestjs/common";

export async function validatePasswordResetToken(
  userId: string,
  token: string
) {
  const resetPasswordRepository = new PrismaResetPasswordRepository();

  try {
    // Retrieve the token from the repository
    const existingToken = await resetPasswordRepository.findByUserId(userId);

    if (!existingToken) {
      throw new BadRequestException("Token not found.");
    }

    // Check if the token matches and has not expired
    const isTokenValid = existingToken.token === token && existingToken.expiresAt > new Date();

    if (!isTokenValid) {
      throw new BadRequestException("Invalid or expired token.");
    }

    return true;
  } catch (error) {
    throw new BadRequestException(error.message || "Error validating token.");
  }
}