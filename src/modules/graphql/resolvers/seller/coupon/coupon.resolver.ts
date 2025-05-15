import { CouponService } from './../../../../seller/coupon/coupon.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OneCouponResponse } from './types/res/oneCouponResponse.type';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';

@Resolver()
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Query(() => [OneCouponResponse], { name: 'getCoupons' })
  async getCoupons() {
    const brands = await this.couponService.getAll();
    return brands;
  }

  @Mutation(() => OneCouponResponse, { name: 'createCoupon' })
  @Auth(UserRoles.seller)
  createCoupon() {}
}
