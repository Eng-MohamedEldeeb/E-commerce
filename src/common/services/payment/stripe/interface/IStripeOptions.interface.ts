import { Types } from 'mongoose';
import Stripe from 'stripe';

export interface IStripeOptions {
  customer_email: string;

  mode?: Stripe.Checkout.SessionCreateParams.Mode;
  metadata?: {
    orderId: Types.ObjectId;
  } & Stripe.MetadataParam;

  line_items: Stripe.Checkout.SessionCreateParams.LineItem[];
  discounts?: Stripe.Checkout.SessionCreateParams.Discount[];

  cancel_url?: string;
  success_url?: string;
}
