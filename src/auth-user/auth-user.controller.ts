import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { signup_dto } from './dto/sing.up.user.dto';
import { signin_user_dto } from './dto/sign.in.user.dto';

@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post('sign-up')
  async signup_User(@Body() dto: signup_dto) {

    return this.authUserService.signupUser(dto);
  }

  @Post('sign-in')
  async signinUser(@Body() dto: signin_user_dto, @Req() req, @Res() res) {

    return this.authUserService.signinUser(dto, req, res);
  }
}
