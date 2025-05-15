import { Types } from 'mongoose';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IUser } from '../../User/interfaces/user.interface';
import { ICategory } from '../../Category/Interface/ICategory.interface';

export interface IBrandInputs {
  name: string;
  relatedCategory: Types.ObjectId | ICategory;
}

export interface IBrand extends IBrandInputs {
  _id?: Types.ObjectId;
  image: IFile;
  slug: string;
  createdBy: Types.ObjectId | IUser;
}
