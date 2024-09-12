import { Module } from '@nestjs/common';
import { FunctionsValidationsService } from './functions-validations.service';
import { FunctionsValidationsController } from './functions-validations.controller';

@Module({
  controllers: [FunctionsValidationsController],
  providers: [FunctionsValidationsService],
})
export class FunctionsValidationsModule {}
