import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { UserApisService } from './user-apis.service';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { EmployeeRolesGuard } from 'src/employee/guards/roles.guard';
import { AddNewApiKey_dto } from './dto/add.new.api.key_dto';

@Controller('user-apis')
export class UserApisController {
  constructor(private readonly userApisService: UserApisService) {}

  @UseGuards(JwtAuthGuard, EmployeeRolesGuard)
  @Post(':userId/add-new-api-connection')
  async addNewBroker(
    @Param('userId') userId: string,
    @Body() dto: AddNewApiKey_dto,
  ) {
    return this.userApisService.AddNewApiKey(dto, userId);
  }
}
