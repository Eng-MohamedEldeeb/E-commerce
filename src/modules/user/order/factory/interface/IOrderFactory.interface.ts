import { Types } from 'mongoose';
import { ICartItems } from 'src/db/Models/Cart/Interface/ICart.interface';
import { IOrderInputs } from 'src/db/Models/Order/Interface/IOrder.interface';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export interface IOrderFactoryInputs extends IOrderInputs {
  products: ICartItems[];
  user: Types.ObjectId | TUserDocument;
}
