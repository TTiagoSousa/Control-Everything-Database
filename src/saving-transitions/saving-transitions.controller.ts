import { Controller, Post, UseGuards, Req, Body, Get, Param, Query, Delete, Patch } from '@nestjs/common';
import { SavingTransitionsService } from './saving-transitions.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { Request } from 'express';
import { createSavingTransition_dto } from './dto/create.savings.transition.dto';
import { updateSavingTransition_dto } from './dto/update.savings.transition.dto';

@Controller('saving-transitions')
export class SavingTransitionsController {
  constructor(private readonly savingTransitionsService: SavingTransitionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createSavingTransition(@Req() req: Request, @Body() dto: createSavingTransition_dto) {
    const userId = req.user['id'];
    return this.savingTransitionsService.createSavingTransition(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-number-of-savings-transitions')
  async getTotalNumberOfSavingTransitions(@Param('userId') userId: string) {
    return this.savingTransitionsService.getTotalNumberOfSavingTransitions(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-savings-transactions')
  async getSavingTransitionsByUserId(
    @Param('userId') userId: string,
    @Query('perPage') perPage?: number,
    @Query('page') page?: number,
  ) {
    return this.savingTransitionsService.getAllSavingsTransitionsWithPagination(userId, perPage, page);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:transitionId/disable-savings-transition')
  async disableSavingTransition(
    @Param('userId') userId: string,
    @Param('transitionId') transitionId: string,
  ) {
    return this.savingTransitionsService.disableSavingTransition(userId, transitionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':userId/:transitionId/enable-savings-transition')
  async enableSavingTransition(
    @Param('userId') userId: string,
    @Param('transitionId') transitionId: string,
  ) {
    return this.savingTransitionsService.enableSavingTransition(userId, transitionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-per-currency-and-platform')
  async getTotalPerCurrency(@Param('userId') userId: string) {
    return this.savingTransitionsService.getTotalPerCurrency(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/get-total-on-savings-converted/:targetConvertion')
  async getTotalOnSavingsTransitionsConverted(
    @Param('userId') userId: string,
    @Param('targetConvertion') targetConvertion: string,
  ) {
    return this.savingTransitionsService.getTotalOnSavingsTransitionsConverted(userId, targetConvertion);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/update-savings-transition/:transitionId')
  async updateSavingTransition(
    @Param('userId') userId: string,
    @Param('transitionId') transitionId: string,
    @Body() dto: updateSavingTransition_dto,
  ) {
    return this.savingTransitionsService.updateSavingTransition(dto, userId, transitionId);
  }
}
