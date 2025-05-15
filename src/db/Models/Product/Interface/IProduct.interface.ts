import { Types } from 'mongoose';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IUser } from '../../User/interfaces/user.interface';
import { ICategory } from '../../Category/Interface/ICategory.interface';

export enum ProductSizes {
  s = 's',
  m = 'm',
  lg = 'lg',
  xlg = 'xlg',
}

export interface IProductInputs {
  name: string;
  description?: string;
  stock: number;
  originalPrice: number;
  discountPercent: number;
  size?: ProductSizes;
  color?: string[];
  categoryId: Types.ObjectId | ICategory;
}
export interface IProduct extends IProductInputs {
  _id?: Types.ObjectId;
  slug: string;

  folderId: string;
  image: IFile;
  gallery?: IFile[];

  reviews?: string[];

  finalPrice: number;

  createdBy: Types.ObjectId | IUser;
}
