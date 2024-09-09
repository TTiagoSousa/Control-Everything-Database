import { Module } from '@nestjs/common';
import { AuthEmployeeService } from './auth-employee.service';
import { AuthEmployeeController } from './auth-employee.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/utils/constants';
import { JwtStrategy } from 'src/auth-user/jwt.strategy';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret, // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
  ],
  controllers: [AuthEmployeeController],
  providers: [AuthEmployeeService, EmployeeService, JwtStrategy],
})
export class AuthEmployeeModule {}
