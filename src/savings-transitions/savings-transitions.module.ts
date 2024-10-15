import { Module } from '@nestjs/common';
import { SavingsTransitionsService } from './savings-transitions.service';
import { SavingsTransitionsController } from './savings-transitions.controller';

@Module({
  controllers: [SavingsTransitionsController],
  providers: [SavingsTransitionsService],
})
export class SavingsTransitionsModule {}
