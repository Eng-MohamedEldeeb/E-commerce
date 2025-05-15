import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { IAuthenticationReq } from '../interfaces/ICustomRequest.interface';
import { roles } from '../decorators/auth/auth.decorator';
import { errorResponse } from '../res/error.response';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { GraphContextType } from './IsAuthenticated.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthorized implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // const ctx = GqlExecutionContext.create(context);

    const authorizedRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      roles,
      [context.getClass(), context.getHandler()],
    );
    let user: IUser | undefined;

    switch (context.getType<GraphContextType>()) {
      case 'http':
        user = context.switchToHttp().getRequest<IAuthenticationReq>().user;

        break;

      case 'graphql':
        user = GqlExecutionContext.create(context).getContext().req.user;
        break;
    }
    if (!user || !authorizedRoles.includes(user.role))
      return errorResponse(
        'un-authorized',
        'You are Not Authorized to proceed',
      );
    return true;
  }
}
