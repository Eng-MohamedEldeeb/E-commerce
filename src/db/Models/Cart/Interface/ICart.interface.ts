import { Types } from 'mongoose';
import { TUserDocument } from '../../User/Types/User.type';
import { IProduct } from '../../Product/Interface/IProduct.interface';
export interface ICartItems {
  productId: Types.ObjectId | IProduct;
  quantity: number;
}
export interface ICart {
  products: ICartItems[];
  createdBy: Types.ObjectId | TUserDocument;
}
