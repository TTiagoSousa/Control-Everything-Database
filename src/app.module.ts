import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthUserModule } from './auth-user/auth-user.module';
import { EmailModule } from './email/email.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { AuthEmployeeModule } from './auth-employee/auth-employee.module';
import { EmployeeModule } from './employee/employee.module';
import { PasswordResetModule } from './password-reset/password-reset.module';

@Module({
  imports: [UserModule, AuthUserModule, EmailModule, CurrenciesModule, AuthEmployeeModule, EmployeeModule, PasswordResetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
