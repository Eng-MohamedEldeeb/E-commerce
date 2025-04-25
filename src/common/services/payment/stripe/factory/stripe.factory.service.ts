import { IOrderProducts } from 'src/db/Models/Order/Interface/IOrder.interface';
import Stripe from 'stripe';

export class StripeFactory {
  static createLineItems(
    orderProducts: IOrderProducts[],
  ): Stripe.Checkout.SessionCreateParams.LineItem[] {
    return orderProducts.map((product) => {
      return {
        quantity: product.quantity,

        price_data: {
          currency: 'egp',

          product_data: {
            name: product.name,
          },

          unit_amount: product.unitPrice * 100,
        },
      };
    });
  }
}
