import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { hashPassword } from "src/utils/password/hashPassword";
import { isStrongPassword } from 'src/utils/password/is.password.strong';
import { PrismaResetPasswordRepository } from "src/password-reset/repositories/prisma/prisma-password-reset-repisitory";
import { updatePassword_dto } from "src/user/dto/update.password.dto";
import { containsOnlyLetters } from "src/utils/text/contains.only.letters";
import { containsOnlyLettersAndNumbers } from "src/utils/text/contains.only.letters.and.numbers";

export async function updatePassword(
  userId: string,
  dto: updatePassword_dto
) {

  const usersRepository = new PrismaUsersRepository();
  const resetPasswordRepository = new PrismaResetPasswordRepository();

  const { password, confirmPassword, token } = dto

  if (!containsOnlyLettersAndNumbers(token)) {
    throw new BadRequestException('The token can only contain letters only')
  }

  const tokenRecord = await resetPasswordRepository.findByUserId(userId);
  if (!tokenRecord || tokenRecord.token !== token || tokenRecord.expiresAt < new Date()) {
    throw new BadRequestException('Invalid or expired token');
  }

  if (password !== confirmPassword) {
    throw new BadRequestException('Passwords do not match')
  }

  if (!isStrongPassword(password)) {
    throw new BadGatewayException('Password weak')
  }

  const hashedPassword = await hashPassword(password);

  await usersRepository.save({
    id: userId,
    hashedPassword: hashedPassword,
  });

  return { message: 'Password updated successfully' };
}