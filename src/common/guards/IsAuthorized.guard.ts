import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { IAuthenticationReq } from '../interfaces/ICustomRequest.interface';
import { roles } from '../decorators/auth/auth.decorator';
import { errorResponse } from '../res/error.response';

@Injectable()
export class IsAuthorized implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const authorizedRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      roles,
      [context.getClass(), context.getHandler()],
    );
    const user = context.switchToHttp().getRequest<IAuthenticationReq>().user;
    if (!authorizedRoles.includes(user.role))
      return errorResponse(
        'un-authorized',
        'You are Not Authorized to proceed',
      );
    return true;
  }
}
