import { Body, Controller, Post } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { signup_dto } from './dto/sing.up.user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('sign-up')
  async signup_User(@Body() dto: signup_dto) {

    return this.authUserService.signupUser(dto);
  }
}
