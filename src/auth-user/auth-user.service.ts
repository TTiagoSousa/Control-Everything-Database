import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { signup_dto } from './dto/sing.up.user.dto';
import { signupUser } from './helpers/sign.up.user';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwt: JwtService,
  ) {}

  async signupUser(dto: signup_dto) {
    const result = await signupUser(dto, this.jwt, this.emailService);
    return result;
  }
}
