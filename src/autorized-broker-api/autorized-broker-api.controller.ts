import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AutorizedBrokerApiService } from './autorized-broker-api.service';
import { addNewAutorizedBroker_dto } from './dto/add.new.autorized.broker.api_dto';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { EmployeeRolesGuard } from 'src/employee/guards/roles.guard';
import { EmployeeRole } from '@prisma/client';
import { Roles } from 'src/employee/decorators/roles.decorator';
import { Request } from 'express';

@Controller('autorized-broker-api')
export class AutorizedBrokerApiController {
  constructor(private readonly autorizedBrokerApiService: AutorizedBrokerApiService) {}

  @UseGuards(JwtAuthGuard, EmployeeRolesGuard)
  @Roles(EmployeeRole.ADMIN)
  @Post(':userId/add-new-broker')
  async addNewBroker(
    @Param('userId') userId: string,
    @Body() dto: addNewAutorizedBroker_dto,
  ) {
    return this.autorizedBrokerApiService.addNewBroker(userId, dto);
  }
}
