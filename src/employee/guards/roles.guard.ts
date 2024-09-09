import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EmployeeRole } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class EmployeeRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // console.log('Executing EmployeeRolesGuard...');

    const requiredRoles = this.reflector.getAllAndOverride<EmployeeRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log('Required roles:', requiredRoles);

    if (!requiredRoles) {
      // console.log('No roles required. Access granted.');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const employee = request.user; // Assuming the employee object is stored in the user property of the request

    if (!employee || !employee.EmployeeRole) {
      // console.log('Employee role is not defined. Access denied.');
      throw new ForbiddenException('You do not have permission.');
    }

    const employeeRole = employee.EmployeeRole;
    // console.log('Employee role:', employeeRole);

    const hasRequiredRole = requiredRoles.some((role) => role === employeeRole);
    // console.log('Has required role:', hasRequiredRole);

    if (!hasRequiredRole) {
      // console.log('Access denied.');
      throw new ForbiddenException('You do not have permission.');
    }

    // console.log('Access granted.');
    return true;
  }
}