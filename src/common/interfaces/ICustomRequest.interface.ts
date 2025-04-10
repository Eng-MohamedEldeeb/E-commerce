import { Request } from 'express';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { IFile } from '../utils/upload/interface/file.interface';

export interface IAuthenticationReq extends Request {
  user: TUserDocument;
}
export interface IFileReq extends Request {
  body: { image: IFile };
}
