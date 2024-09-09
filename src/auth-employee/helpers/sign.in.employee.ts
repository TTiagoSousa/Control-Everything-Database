import { JwtService } from "@nestjs/jwt";
import { Request, Response } from 'express';
import { BadRequestException } from "@nestjs/common";
import { PrismaEmployeeRepository } from "../../employee/repositories/prisma/prisma-employee-repisitory";
import { signin_employee_dto } from '../../employee/dto/signin.employee.dto';
import { isValidEmail } from '../../utils/email/is.valide.email';
import { comparePasswords } from '../../utils/password/compare.passwords';
import { employeeCreateToken } from '../../utils/token/employee.signin.token';

export async function signinEmployee (
  dto: signin_employee_dto,
  jwt: JwtService,
  req: Request,
  res: Response,
) {

  const { email, password, employeeNumber } = dto

  const employeesRepository = new PrismaEmployeeRepository();

  if (!isValidEmail(email)) {
    throw new BadRequestException('Invalid email address')
  }

  const foundEmployeeByEmail = await employeesRepository.findByEmail(email);

  if (!foundEmployeeByEmail) {
    throw new BadRequestException('Something is wrong');
  }

  const foundEmployeeByEmployeeNumber = await employeesRepository.findByEmployeeNumber(employeeNumber);

  if (!foundEmployeeByEmployeeNumber) {
    throw new BadRequestException('Something is wrong');
  }

  const isMatch = await comparePasswords({
    password,
    hash: foundEmployeeByEmail.hashedPassword,
  })

  if (!isMatch) {
    throw new BadRequestException('Something is wrong');
  }

  if (!foundEmployeeByEmail.isActive && foundEmployeeByEmail) {
    throw new BadRequestException('Account not active');
  }

  const { token, refreshToken } = await employeeCreateToken({
    id: foundEmployeeByEmail.id,
    email: foundEmployeeByEmail.email,
    EmployeeRole: foundEmployeeByEmail.jobTitle
  });

  if (!token) {
    throw  new Error('Something went wrong');
  }

  res.cookie('token', token);
  res.cookie('refreshToken', refreshToken);

  return res.send({ token , message: 'Login successful',  });
}