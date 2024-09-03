import { BadRequestException } from "@nestjs/common";
import { EmailService } from "src/email/email.service";
import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { JwtService } from '@nestjs/jwt';
import { signup_dto } from "../dto/sing.up.user.dto";
import { isValidEmail } from "src/utils/email/is.valide.email";
import { isStrongPassword } from "src/utils/password/is.password.strong";
import { hashPassword } from "src/utils/password/hashPassword";
import { faker } from '@faker-js/faker';
import { sendActivationEmail } from "../email/send.activation.email";

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

  const hashedPassword = await hashPassword(password);

  const randomName = `User${faker.datatype.number({ min: 1000, max: 9999 })}`;

  await sendActivationEmail(email, activationToken, emailService);

  const creationResult = await usersRepository.create({
    fullName: randomName,
    email: email,
    hashedPassword: hashedPassword,
  });

  return creationResult
}