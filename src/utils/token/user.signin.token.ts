import { UserRole } from "@prisma/client";
import { jwtSecret } from "../constants";
import { JwtService } from '@nestjs/jwt';

interface UserTokenPayload {
  id: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  fullName: string;
  isPaidUser: boolean;
  isBlocked: boolean;
  createdAt: Date;
}

export async function userCreateToken(user: UserTokenPayload) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    emailVerified: user.emailVerified,
    fullName: user.fullName,
    isPaidUser: user.isPaidUser,
    isBlocked: user.isBlocked,
    createdAt: user.createdAt,
  };

  const jwtService = new JwtService();
  const token = await jwtService.signAsync(payload, { secret: jwtSecret, expiresIn: '30m' });
  const refreshToken = await jwtService.signAsync({ id: user.id }, { secret: jwtSecret, expiresIn: '7d' });

  return { token, refreshToken };
}