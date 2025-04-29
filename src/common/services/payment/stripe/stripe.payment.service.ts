import { OrderRepository } from './../../../../db/repositories/order.repo';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  IStripeCouponOptions,
  IStripeOptions,
} from './interface/IStripeOptions.interface';
import { errorResponse } from 'src/common/res/error.response';
import { Request } from 'express';
import {
  OrderStatus,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';
@Injectable()
export class StripePaymentService {
  private readonly stripe: Stripe = new Stripe(
    process.env.STRIPE_API_KEY as string,
  );

  constructor(private readonly orderRepository: OrderRepository) {}

  async webhook(request: Request) {
    let body = request.body;
    let event: Stripe.Event = {} as Stripe.Event;
    const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

    if (endpointSecret) {
      const signature = request.headers['stripe-signature'];
      event = this.stripe.webhooks.constructEvent(
        body,
        signature as string | string[] | Buffer<ArrayBufferLike>,
        endpointSecret,
      );
    }

    if (event.type != 'checkout.session.completed')
      return errorResponse('bad-req', 'Failed to pay');

    const order = await this.orderRepository.findOne({
      filter: {
        _id: event.data.object.metadata?.orderId,
        status: OrderStatus.pending,
        paymentMethod: PaymentMethods.card,
      },
    });

    if (!order) return errorResponse('not-found', 'in-valid order id');

    await this.confirmPaymentIntent(order.intentId as string);

    await this.orderRepository.updateById({
      id: order._id,
      data: {
        status: OrderStatus.placed,
        paidAt: Date.now(),
      },
    });

    // console.log({ event });
    // console.log({ data: event.data });
    // console.log({ object: event.data.object });
    // console.log({ metadata: event.data.object.metadata });
  }

  async checkoutSession({
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

  async createPaymentMethod(
    token: string = 'tok_visa',
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return await this.stripe.paymentMethods.create({
      type: 'card',
      card: {
        token,
      },
    });
  }

  async createPaymentIntent(
    amount: number,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const paymentMethod = await this.createPaymentMethod();
    return await this.stripe.paymentIntents.create({
      amount,
      currency: 'egp',
      payment_method: paymentMethod.id,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
  }

  async retrievePaymentIntent(
    id: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    return await this.stripe.paymentIntents.retrieve(id);
  }

  async confirmPaymentIntent(
    id: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const intent = await this.retrievePaymentIntent(id);
    if (!intent) return errorResponse('bad-req', 'in-valid intent id');

    return await this.stripe.paymentIntents.confirm(id);
  }

  async refund(id: string): Promise<Stripe.Response<Stripe.Refund>> {
    const paymentIntent = await this.retrievePaymentIntent(id);
    if (!paymentIntent)
      return errorResponse('bad-req', 'in-valid payment intent id');
    return await this.stripe.refunds.create({
      payment_intent: paymentIntent.id,
    });
  }

  async createCoupon({
    percent_off,
    duration = 'once',
  }: IStripeCouponOptions): Promise<Stripe.Response<Stripe.Coupon>> {
    return this.stripe.coupons.create({
      currency: 'egp',
      percent_off,
      duration,
    });
  }

  async retrieveCoupon(id: string): Promise<Stripe.Response<Stripe.Coupon>> {
    return this.stripe.coupons.retrieve(id);
  }
}
