import { BadRequestException } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { JwtService } from '@nestjs/jwt';
import { signup_dto } from "../dto/sing.up.user.dto";
import { isValidEmail } from "src/utils/email/is.valide.email";
import { hashPassword } from "src/utils/password/hashPassword";
import { isDisposableEmail } from "src/utils/email/is.disposable.email";
import { isPasswordSimilarToEmail } from "src/utils/password/is.password.similar.to.email";
import { isStrongPassword } from "src/utils/password/is.password.strong";
import { sendActivationEmail } from "./email/send.activation.email";

export async function signupUser(
  dto: signup_dto,
  jwt: JwtService,
  emailService: EmailService,
) {

  const { email, password, confirmPassword } = dto;

  const usersRepository = new PrismaUsersRepository();

  const activationToken = jwt.sign({ email }, { expiresIn: '1d' });

  if (!isValidEmail(email)) {
    throw new BadRequestException('Invalid email address')
  }

  const isDisposable = await isDisposableEmail(email);
  if (isDisposable) {
    throw new BadRequestException('Disposable emails are not allowed');
  }

  const foundUser = await usersRepository.findUserByEmail(email);
  if (foundUser) {
    throw new BadRequestException('Email already exists')
  }

  if (password !== confirmPassword) {
    throw new BadRequestException('Passwords do not match')
  }

  if (!isStrongPassword(password)) {
    throw new BadRequestException('Password is too weak')
  }

  if (isPasswordSimilarToEmail(email, password)) {
    throw new BadRequestException('Password cannot be similar to the email address');
  }

  const hashedPassword = await hashPassword(password);

  const randomFullName = `User${Math.floor(10000 + Math.random() * 90000)}`;

  await sendActivationEmail(email, activationToken, emailService);

  const creationResult = await usersRepository.create({
    fullName: randomFullName,
    email: email,
    hashedPassword: hashedPassword,
  });

  return creationResult
}