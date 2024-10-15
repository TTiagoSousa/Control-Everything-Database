import { Injectable } from '@nestjs/common';
import { signin_employee_dto } from '../employee/dto/signin.employee.dto';
import { signinEmployee } from './helpers/sign.in.employee';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthEmployeeService {
  constructor(
    private readonly jwt: JwtService,
  ) {}

  async signinEmployee(dto: signin_employee_dto, req, res) {
    const result = await signinEmployee(dto, this.jwt, req, res);
    return result;
  }

}
