import { InjectModel } from '@nestjs/mongoose';
import { TCart } from '../Models/Cart/Types/TCart.types';
import { DataBaseRepository } from './db.repo';
import { Cart } from '../Models/Cart/Cart.schema';
import { Model } from 'mongoose';

export class CartRepository extends DataBaseRepository<TCart> {
  constructor(@InjectModel(Cart.name) cartModel: Model<TCart>) {
    super(cartModel);
  }
}
