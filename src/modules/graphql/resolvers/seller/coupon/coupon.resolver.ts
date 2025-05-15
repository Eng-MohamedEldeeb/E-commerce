import { CouponService } from './../../../../seller/coupon/coupon.service';
import { Query, Resolver } from '@nestjs/graphql';
import { OneCouponResponse } from './types/res/oneCouponResponse.type';

@Resolver()
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Query(() => [OneCouponResponse], { name: 'getCoupons' })
  async getCoupons() {
    const brands = await this.couponService.getAll();
    return brands;
  }
}
