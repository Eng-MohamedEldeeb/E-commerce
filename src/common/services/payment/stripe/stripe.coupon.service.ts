import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import { IStripeCouponOptions } from './interface/IStripeOptions.interface';
import { errorResponse } from 'src/common/res/error.response';

@Injectable()
export class StripeCouponService {
  private readonly stripe: Stripe = StripeService.getInstance();

  async retrieveCoupon(id: string): Promise<Stripe.Response<Stripe.Coupon>> {
    return this.stripe.coupons.retrieve(id);
  }

  async createCoupon({
    percent_off,
    duration = 'once',
    name,
  }: IStripeCouponOptions): Promise<Stripe.Response<Stripe.Coupon>> {
    return this.stripe.coupons.create({
      currency: 'egp',
      percent_off,
      duration,
      name,
    });
  }

  async deleteCoupon(
    id: string,
  ): Promise<Stripe.Response<Stripe.DeletedCoupon>> {
    const coupon = await this.retrieveCoupon(id);
    if (!coupon)
      return errorResponse('bad-req', 'in-valid coupon id or expired coupon');
    return await this.stripe.coupons.del(coupon.id);
  }
}
