import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { IStripeOptions } from './interface/IStripeOptions.interface';

@Injectable()
export class StripePaymentService {
  private readonly stripe: Stripe = new Stripe(
    process.env.STRIPE_API_KEY as string,
  );

  constructor() {}

  async checkout({
    customer_email,
    mode = 'payment',
    line_items,
    discounts,
    metadata,
    success_url = process.env.STRIPE_SUCCESS_URL as string,
    cancel_url = process.env.STRIPE_CANCEL_URL as string,
  }: IStripeOptions): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    return await this.stripe.checkout.sessions.create({
      customer_email,
      mode,
      line_items,
      discounts,
      success_url,
      cancel_url,
      metadata,
    });
  }
}
