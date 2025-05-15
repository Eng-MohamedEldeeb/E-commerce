import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthenticationReq } from 'src/common/interfaces/ICustomRequest.interface';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { asyncHandler } from '../handler/asyncHandler.decorator';
import { GraphContextType } from 'src/common/guards/IsAuthenticated.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: keyof TUserDocument, context: ExecutionContext) => {
    return asyncHandler(() => {
      let user: TUserDocument | undefined;

      switch (context.getType<GraphContextType>()) {
        case 'http':
          user = context.switchToHttp().getRequest<IAuthenticationReq>().user;
          break;

        case 'graphql':
          user = GqlExecutionContext.create(context).getContext().req.user;
          break;
      }

      if (user && data) {
        return user[data];
      }

      return user;
    });
  },
);
