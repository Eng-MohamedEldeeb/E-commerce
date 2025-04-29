import Stripe from 'stripe';
export interface IStripeOptions {
  customer_email: string;

  mode?: Stripe.Checkout.SessionCreateParams.Mode;
  metadata?: {
    orderId: string;
  } & Stripe.MetadataParam;

  line_items: Stripe.Checkout.SessionCreateParams.LineItem[];
  discounts?: Stripe.Checkout.SessionCreateParams.Discount[];

  cancel_url?: string;
  success_url?: string;
}

export interface IStripeCouponOptions {
  percent_off: number;
  duration: Stripe.CouponCreateParams.Duration;
  name?: string;
}
