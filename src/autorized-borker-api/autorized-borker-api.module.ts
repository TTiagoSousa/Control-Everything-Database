import { Module } from '@nestjs/common';
import { AutorizedBorkerApiService } from './autorized-borker-api.service';
import { AutorizedBorkerApiController } from './autorized-borker-api.controller';

@Module({
  controllers: [AutorizedBorkerApiController],
  providers: [AutorizedBorkerApiService],
})
export class AutorizedBorkerApiModule {}
