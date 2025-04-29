import { Controller, Delete, Post, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { DeleteCouponDto } from './dto/deleteCoupon.dto';

@Auth(UserRoles.seller)
@Controller('seller/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Delete(':couponId')
  delete(@Param('couponId') deleteCouponDto: DeleteCouponDto) {
    return this.couponService.delete(deleteCouponDto);
  }
}
