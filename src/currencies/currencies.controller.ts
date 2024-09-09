import { Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { Roles } from 'src/employee/decorators/roles.decorator';
import { EmployeeRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { EmployeeRolesGuard } from 'src/employee/guards/roles.guard';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('upload-currencies-to-database')
  async createCurrency() {
    const uploadupdatedCurrencies = await this.currenciesService.uploadCurrenciesToDatabase();
    return { uploadupdatedCurrencies };
  }

  @UseGuards(JwtAuthGuard, EmployeeRolesGuard)
  @Roles(EmployeeRole.ADMIN)
  @Patch('update-currencies-rate')
  async updateCurrenciesRate() {
    const updatedCurrencies = await this.currenciesService.updateCurrenciesRate();
    return { updatedCurrencies };
  }
}
