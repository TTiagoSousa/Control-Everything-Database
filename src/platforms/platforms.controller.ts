import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { addNewPlatform_dto } from './dto/add.new.platform';
import { Roles } from 'src/employee/decorators/roles.decorator';
import { EmployeeRole } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth-user/jwt.guard';
import { EmployeeRolesGuard } from 'src/employee/guards/roles.guard';

@Controller('platforms')
export class PlatformsController {
  constructor(private readonly platformsService: PlatformsService) {}

  @UseGuards(JwtAuthGuard, EmployeeRolesGuard)
  @Roles(EmployeeRole.ADMIN)
  @Post('add-new-platform')
  async signup_User(@Body() dto: addNewPlatform_dto) {

    return this.platformsService.addNewPlatform(dto);
  }
}
