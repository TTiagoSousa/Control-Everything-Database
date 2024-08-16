import { BadRequestException } from "@nestjs/common";
import { Gender } from "@prisma/client";
import { PrismaCountriesRepository } from "src/countries/repositories/prisma/prisma-countries-repository";
import { EmailService } from "src/email/email.service";
import { signup_dto } from "src/user/dto/sing.up.user.dto";
import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { isValidEmail } from "src/utils/email/is.valide.email";
import { hashPassword } from "src/utils/password/hashPassword";
import { isStrongPassword } from "src/utils/password/is.password.strong";
import { containsOnlyLetters } from "src/utils/text/contains.only.letters";
import { containsOnlyLettersNumbersAndHyphens } from "src/utils/text/contains.only.letters.numbers.and.hyphens";
import { JwtService } from '@nestjs/jwt';
import { sendActivationEmail } from "./email/send.activation.email";

export async function signupUser(
  dto: signup_dto,
  jwt: JwtService,
  emailService: EmailService,
) {

  const usersRepository = new PrismaUsersRepository();
  const countryRepository = new PrismaCountriesRepository();

  const { email, password, fullName, confirmPassword, dateOfBirth, country, gender } = dto;

  const activationToken = jwt.sign({ email }, { expiresIn: '1d' });

  if (!isValidEmail(email)) {
    throw new BadRequestException('Invalid email')
  }

  const foundUser = await usersRepository.findUserByEmail(email);
  if (foundUser) {
    throw new BadRequestException('Email already exists')
  }

  if (!containsOnlyLetters(fullName)) {
    throw new BadRequestException('The name can only contain letters only')
  }

  if (!containsOnlyLettersNumbersAndHyphens(country)) {
    throw new BadRequestException('Invalid country')
  }

  const countryId = await countryRepository.findCountryByID(country);
  if (!countryId) {
    throw new BadRequestException('Invalid country');
  }

  const capitalizedFullName = fullName
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

  if (password !== confirmPassword) {
    throw new BadRequestException('Passwords do not match')
  }

  if (!isStrongPassword(password)) {
    throw new BadRequestException('Password weak')
  }

  const dateOfBirthObj = new Date(dateOfBirth);
  if (isNaN(dateOfBirthObj.getTime())) {
    throw new BadRequestException('Invalid date of birth');
  }

  const hashedPassword = await hashPassword(password);

  await sendActivationEmail(email, activationToken, fullName, emailService);

  const creationResult = await usersRepository.create({
    email: email,
    fullName: capitalizedFullName,
    dateOfBirth: dateOfBirthObj,
    countryId: country,
    hashedPassword: hashedPassword,
    gender: gender as Gender,
  });

  return creationResult
}