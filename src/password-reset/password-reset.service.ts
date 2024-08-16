import { Injectable, Logger  } from '@nestjs/common';
import { createPasswordResetToken } from './helpers/create.password.reset.token';
import { Cron } from '@nestjs/schedule';
import { validatePasswordResetToken } from './helpers/validate.password.reset.token';
import { EmailService } from 'src/email/email.service';
@Injectable()
export class PasswordResetService {
  constructor(
    private readonly emailService: EmailService,
  ) {}

  async createPasswordResetToken(userId: string) {
    const result = await createPasswordResetToken(userId, this.emailService);
    return result;
  }

  async validatePasswordResetToken(userId: string, token: string) {
    const result = await validatePasswordResetToken(userId, token);
    return result;
  }
}
