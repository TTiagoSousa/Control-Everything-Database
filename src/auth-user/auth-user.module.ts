import { Module } from '@nestjs/common';
import { AuthUserService } from './auth-user.service';
import { AuthUserController } from './auth-user.controller';
import { EmailService } from 'src/email/email.service';
import { JwtStrategy } from './jwt.strategy';
import { jwtSecret } from 'src/utils/constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret, // Replace with your actual secret key
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, EmailService, JwtStrategy],
})
export class AuthUserModule {}
