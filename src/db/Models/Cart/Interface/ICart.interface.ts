import { Types } from 'mongoose';
import { TUserDocument } from '../../User/Types/User.type';
import { TCategory } from '../../Category/Types/TCategory.types';
export interface ICartItems {
  productId: Types.ObjectId | TCategory;
  quantity: number;
}
export interface ICart {
  products: ICartItems[];
  createdBy: Types.ObjectId | TUserDocument;
}
