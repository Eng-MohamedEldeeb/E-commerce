import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuthenticationReq } from 'src/common/interfaces/authentication.interface';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export const User = createParamDecorator(
  (data: keyof TUserDocument, context: ExecutionContext): unknown => {
    const user: TUserDocument = context
      .switchToHttp()
      .getRequest<IAuthenticationReq>().user;

    if (data) {
      return user[data];
    }

    return user;
  },
);
