import { EmployeeRole} from "@prisma/client";
import { jwtSecret } from "../constants"
import { JwtService } from '@nestjs/jwt';


export async function employeeCreateToken(args: { id: string; email: string; EmployeeRole?: EmployeeRole }) {
  const payload = args;

  const jwtService = new JwtService();
  const token = await jwtService.signAsync(payload, { secret: jwtSecret, expiresIn: '30m' });
  const refreshToken = await jwtService.signAsync(payload, { secret: jwtSecret, expiresIn: '50m' });
  
  return { token, refreshToken };
}