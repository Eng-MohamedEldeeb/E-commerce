import { Types } from 'mongoose';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IUser } from '../../User/interfaces/user.interface';

export interface ICategory {
  _id?: Types.ObjectId;
  image: IFile;
  name: string;
  slug: string;
  createdBy: Types.ObjectId | IUser;
}
