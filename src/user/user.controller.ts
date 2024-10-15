import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { updatePassword_dto } from './dto/update.password.dto';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/update-password')
  async signup_User(
    @Body() dto: updatePassword_dto,
    @Param('userId') userId: string,
  ) {

    return this.userService.updatePassword(dto, userId);
  }
}
