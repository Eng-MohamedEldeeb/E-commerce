import { TCart } from 'src/db/Models/Cart/Types/TCart.types';
import { AddToCartDTO } from '../dto/addToCart.dto';
import { ICartFactoryOptions } from './interface/ICartFactoryOptions.interface';
import { ICart } from 'src/db/Models/Cart/Interface/ICart.interface';

export class CartFactory {
  static create(data: ICartFactoryOptions): Partial<TCart> {
    const cartItem: ICart = {
      products: [
        {
          productId: data.cartItem.productId,
          quantity: data.cartItem.quantity,
        },
      ],
      createdBy: data.createdBy,
    };
    return cartItem;
  }
}
