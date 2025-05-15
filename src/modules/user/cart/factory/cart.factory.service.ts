import { TCart } from 'src/db/Models/Cart/Types/TCart.types';
import { ICartFactoryOptions } from './interface/ICartFactoryOptions.interface';

export class CartFactory {
  static create(data: ICartFactoryOptions): Partial<TCart> {
    const cartItem: Partial<TCart> = {
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
