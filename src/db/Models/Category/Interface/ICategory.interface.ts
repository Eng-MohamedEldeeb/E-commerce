import { Types } from 'mongoose';
import { TUserDocument } from '../../User/Types/User.type';
import { IFile } from 'src/common/utils/upload/interface/file.interface';

export interface ICategory {
  image: IFile;
  name: string;
  slug: string;
  createdBy: Types.ObjectId | TUserDocument;
}
