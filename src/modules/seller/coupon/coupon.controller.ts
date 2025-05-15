import { Controller, Delete, Post, Param, Body } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { DeleteCouponDto } from './dto/deleteCoupon.dto';
import { Types } from 'mongoose';
import { User } from 'src/common/decorators/user/userParam.decorator';

@Auth(UserRoles.seller)
@Controller('seller/coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(
    @User('_id') userId: Types.ObjectId,
    @Body() createCouponDto: CreateCouponDto,
  ) {
    return this.couponService.create(userId, createCouponDto);
  }

  @Delete(':couponId')
  delete(@Param() deleteCouponDto: DeleteCouponDto) {
    return this.couponService.delete(deleteCouponDto);
  }
}
