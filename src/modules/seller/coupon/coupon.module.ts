import { Module } from '@nestjs/common';
import { CouponController } from './coupon.controller';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';
import { CouponService } from './coupon.service';
import { StripeService } from 'src/common/services/payment/stripe/stripe.service';

@Module({
  imports: [],
  controllers: [CouponController],
  providers: [CouponService, StripeCouponService, StripeService],
})
export class CouponModule {}
