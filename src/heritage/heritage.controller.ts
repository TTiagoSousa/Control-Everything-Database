import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { HeritageService } from './heritage.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';

@Controller('heritage')
export class HeritageController {
  constructor(private readonly heritageService: HeritageService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-converted/:targetConvertion')
  async getTotalOnSavingsTransitionsConverted(
    @Param('userId') userId: string,
    @Param('targetConvertion') targetConvertion: string,
  ) {
    return this.heritageService.getTotalHeritageConverted(userId, targetConvertion);
  }
}
