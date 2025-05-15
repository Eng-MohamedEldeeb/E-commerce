import { Types } from 'mongoose';
import { IProduct } from '../../Product/Interface/IProduct.interface';
import { IUser } from '../../User/interfaces/user.interface';
export interface ICartItems {
  productId: Types.ObjectId | IProduct;
  quantity: number;
}
export interface ICart {
  products: ICartItems[];
  createdBy: Types.ObjectId | IUser;
}
