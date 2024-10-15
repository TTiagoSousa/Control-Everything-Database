import { Module } from '@nestjs/common';
import { AutorizedBrokerApiService } from './autorized-broker-api.service';
import { AutorizedBrokerApiController } from './autorized-broker-api.controller';

@Module({
  controllers: [AutorizedBrokerApiController],
  providers: [AutorizedBrokerApiService],
})
export class AutorizedBrokerApiModule {}
