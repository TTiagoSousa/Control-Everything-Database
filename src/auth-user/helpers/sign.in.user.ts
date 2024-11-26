import { JwtService } from "@nestjs/jwt";
import { PrismaUsersRepository } from "src/user/repositories/prisma/prisma-user-repisitory";
import { Request, Response } from 'express';
import { userCreateToken } from "src/utils/token/user.signin.token";
import { isValidEmail } from "src/utils/email/is.valide.email";
import { BadRequestException } from "@nestjs/common";
import { isDisposableEmail } from "src/utils/email/is.disposable.email";
import { comparePasswords } from "src/utils/password/compare.passwords";
import { signin_user_dto } from "../dto/sign.in.user.dto";

export async function signinUser(
  dto: signin_user_dto,
  jwt: JwtService,
  req: Request,
  res: Response,
) {
  const { email, password } = dto;
  const usersRepository = new PrismaUsersRepository();

  if (!isValidEmail(email)) {
    throw new BadRequestException('Invalid email address');
  }

  const isDisposable = await isDisposableEmail(email);
  if (isDisposable) {
    throw new BadRequestException('Use of temporary emails is not permitted');
  }

  const foundUser = await usersRepository.findUserByEmail(email);

  if (!foundUser) {
    throw new BadRequestException('Something is wrong');
  }

  const isMatch = await comparePasswords({
    password,
    hash: foundUser.hashedPassword,
  });

  if (!isMatch) {
    throw new BadRequestException('Something is wrong');
  }

  if (!foundUser.emailVerified) {
    throw new BadRequestException('The account is not active');
  }

  if (foundUser.isBlocked) {
    throw new BadRequestException('Your account is locked. Please contact support for assistance');
  }

  const { token, refreshToken } = await userCreateToken({
    id: foundUser.id,
    email: foundUser.email,
    role: foundUser.role,
    emailVerified: foundUser.emailVerified,
    fullName: foundUser.fullName,
    isPaidUser: foundUser.isPaidUser,
    isBlocked: foundUser.isBlocked,
    createdAt: foundUser.createdAt,
  });

  if (!token) {
    throw new Error('Something went wrong');
  }

  res.cookie('token', token);
  res.cookie('refreshToken', refreshToken);

  return res.send({ token, message: 'Login successful' });
}