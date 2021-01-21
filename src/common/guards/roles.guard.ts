import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from 'src/users/enum/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      ctx.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = ctx.getContext().req;
    const user = request.user;
    const hasRole = () =>
      requiredRoles.some((role) => user.role?.includes(role));

    return user && user.role && hasRole();
  }
}
