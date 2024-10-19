import { Module } from '@nestjs/common';
import { CryptoTransitionsService } from './crypto-transitions.service';
import { CryptoTransitionsController } from './crypto-transitions.controller';

@Module({
  controllers: [CryptoTransitionsController],
  providers: [CryptoTransitionsService],
})
export class CryptoTransitionsModule {}
