import { Types } from 'mongoose';
import { AddToCartDTO } from '../../dto/addToCart.dto';

export interface ICartFactoryOptions {
  cartItem: AddToCartDTO;
  createdBy: Types.ObjectId;
}
