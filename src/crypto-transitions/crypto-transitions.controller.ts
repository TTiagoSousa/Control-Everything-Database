import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CryptoTransitionsService } from './crypto-transitions.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { Request } from 'express';
import { createCryptoTransition_dto } from './dto/create.crypto.transition.dto';

@Controller('crypto-transitions')
export class CryptoTransitionsController {
  constructor(private readonly cryptoTransitionsService: CryptoTransitionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCryptoTransition(@Req() req: Request, @Body() dto: createCryptoTransition_dto) {
    const userId = req.user['id'];
    return this.cryptoTransitionsService.createCryptoTransition(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/total-of-crypto-transitions')
  async getTotalCryptoTransitionsByUserId(@Param('userId') userId: string) {
    return this.cryptoTransitionsService.getTotalCryptoTransitionsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-per-coin')
  async getTotalPerCrypto(@Param('userId') userId: string) {
    return this.cryptoTransitionsService.getTotalPerCrypto(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-crypto-portefolio')
  async getCryptoPortefolio(@Param('userId') userId: string) {
    return this.cryptoTransitionsService.getCryptoPortefolio(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-spent-per-crypto')
  async getTotalSpentPerCrypto(@Param('userId') userId: string) {
    return this.cryptoTransitionsService.getTotalSpentPerCrypto(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-spent-and-current-investment')
  async getTotalSpentAndCurrentInvestment(@Param('userId') userId: string) {
    return this.cryptoTransitionsService.getTotalSpentAndCurrentInvestment(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-converted/:targetConvertion')
  async getTotalCurrentInvestment(    
    @Param('userId') userId: string,
    @Param('targetConvertion') targetConvertion: string,) {
    return this.cryptoTransitionsService.getTotalCurrentInvestment(userId, targetConvertion);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-evolution-of-portefolio')
  async calculateCryptoValueEvolution(
    @Param('userId') userId: string,
    @Query('timePeriod') timePeriod: string,
  ) {

    return this.cryptoTransitionsService.calculateCryptoValueEvolution(userId, timePeriod);
  }
}
