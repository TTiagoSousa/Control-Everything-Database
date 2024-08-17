import { Module } from '@nestjs/common';
import { HeritageService } from './heritage.service';
import { HeritageController } from './heritage.controller';

@Module({
  controllers: [HeritageController],
  providers: [HeritageService],
})
export class HeritageModule {}
