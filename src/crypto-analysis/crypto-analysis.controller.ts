import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CryptoAnalysisService } from './crypto-analysis.service';
import { EmployeeRolesGuard } from 'src/employee/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { EmployeeRole } from '@prisma/client';
import { Roles } from 'src/employee/decorators/roles.decorator';

@Controller('crypto-analysis')
export class CryptoAnalysisController {
  constructor(private readonly cryptoAnalysisService: CryptoAnalysisService) {}

  @Get(':currencyId/single-price')
  async getSinglePrice(@Param('currencyId') currencyId: string) {
    try {
      const price = await this.cryptoAnalysisService.getSinglePriceCrypto(currencyId);
      return { price };
    } catch (error) {
      return { error: 'Failed to fetch currency price' };
    }
  }
}
