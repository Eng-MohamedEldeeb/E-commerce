import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthenticationReq } from 'src/common/interfaces/ICustomRequest.interface';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { asyncHandler } from '../handler/asyncHandler.decorator';

export const User = createParamDecorator(
  (data: keyof TUserDocument, context: ExecutionContext) => {
    return asyncHandler(() => {
      const user: TUserDocument = context
        .switchToHttp()
        .getRequest<IAuthenticationReq>().user;

      if (data) {
        return user[data];
      }

      return user;
    });
  },
);
