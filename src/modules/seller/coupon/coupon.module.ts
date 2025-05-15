import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { CouponService } from './coupon.service';
import { CouponRepository } from 'src/db/repositories/coupon.repo';
import { couponModel } from 'src/db/Models/Coupon/Coupon.model';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';
import { StripeService } from 'src/common/services/payment/stripe/stripe.service';
import { CouponResolver } from 'src/modules/graphql/resolvers/seller/coupon/coupon.resolver';

@Module({
  imports: [couponModel],
  controllers: [CouponController],
  providers: [
    CouponService,
    CouponRepository,
    CouponResolver,
    StripeCouponService,
    StripeService,
  ],
})
export class CouponModule {}
