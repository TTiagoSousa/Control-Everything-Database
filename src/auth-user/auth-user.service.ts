import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { signup_dto } from './dto/sing.up.user.dto';
import { signupUser } from './helpers/sign.up.user';
import { signin_user_dto } from './dto/sign.in.user.dto';
import { signinUser } from './helpers/sign.in.user';

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

  async signinUser(dto: signin_user_dto, req, res) {
    const result = await signinUser(dto, this.jwt, req, res);
    return result;
  }
}
