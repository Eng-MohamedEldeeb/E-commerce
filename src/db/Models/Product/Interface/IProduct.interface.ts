import { Types } from 'mongoose';
import { IFile } from 'src/common/utils/upload/interface/file.interface';

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
  categoryId: Types.ObjectId;
}
export interface IProduct extends IProductInputs {
  slug: string;

  folderId: string;
  image: IFile;
  gallery?: IFile[];

  reviews?: string[];

  finalePrice: number;

  createdBy: Types.ObjectId;
}
