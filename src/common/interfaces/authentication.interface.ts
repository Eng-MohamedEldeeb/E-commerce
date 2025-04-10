import { Request } from 'express';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export interface IAuthenticationReq extends Request {
  user: TUserDocument;
}
