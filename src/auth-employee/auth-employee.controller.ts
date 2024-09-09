import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';
import { signin_employee_dto } from 'src/employee/dto/signin.employee.dto';

@Controller('auth-employee')
export class AuthEmployeeController {
  constructor(private readonly authEmployeeService: AuthEmployeeService) {}

  @Post('sign-in')
  async signinEmployee(@Body() dto: signin_employee_dto, @Req() req, @Res() res) {

    return this.authEmployeeService.signinEmployee(dto, req, res);
  }
}
