import { Controller, Post, Body, HttpCode, HttpStatus, Param, Get, Put, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':userId/request-token')
  async requestPasswordReset(@Param('userId') userId: string) { // Correctly using @Param to access userId
    const token = await this.passwordResetService.createPasswordResetToken(userId);
    // Here, you would normally send the token to the user's email or other contact method
    return { message: 'Password reset token created', token };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/validate/:token')
  async validateToken(
    @Param('userId') userId: string,
    @Param('token') token: string,
  ) {
    return await this.passwordResetService.validatePasswordResetToken(userId, token);
  }
}
