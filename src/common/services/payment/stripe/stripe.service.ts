import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private static stripe: Stripe;

  static getInstance() {
    if (this.stripe instanceof Stripe) return this.stripe;
    return (this.stripe = new Stripe(process.env.STRIPE_API_KEY as string));
  }
}
