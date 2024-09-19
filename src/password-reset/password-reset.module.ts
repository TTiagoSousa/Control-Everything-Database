import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, EmailService],
})
export class PasswordResetModule {}
