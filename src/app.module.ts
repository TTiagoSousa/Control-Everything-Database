import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './auth-user/auth-user.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthEmployeeModule } from './auth-employee/auth-employee.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [AuthUserModule, UserModule, EmailModule, AuthEmployeeModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
