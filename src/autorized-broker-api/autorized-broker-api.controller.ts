import { Controller } from '@nestjs/common';
import { AutorizedBrokerApiService } from './autorized-broker-api.service';

@Controller('autorized-broker-api')
export class AutorizedBrokerApiController {
  constructor(private readonly autorizedBrokerApiService: AutorizedBrokerApiService) {}
}
