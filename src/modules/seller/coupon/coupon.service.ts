import { CouponRepository } from './../../../db/repositories/coupon.repo';
import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';
import { DeleteCouponDto } from './dto/deleteCoupon.dto';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';
import { errorResponse } from 'src/common/res/error.response';
import { Types } from 'mongoose';

@Injectable()
export class CouponService {
  constructor(
    private readonly stripeCouponService: StripeCouponService,
    private readonly couponRepository: CouponRepository,
  ) {}

  getAll() {
    return asyncHandler(async () => {
      const coupons = await this.couponRepository.find({
        populate: [{ path: '' }],
      });

      return {
        msg: 'done',
        coupons,
      };
    });
  }
  create(userId: Types.ObjectId, createCouponDto: CreateCouponDto) {
    return asyncHandler(async () => {
      const stripeCoupon = await this.stripeCouponService.createCoupon({
        ...createCouponDto,
      });

      const coupon = await this.couponRepository.create({
        name: stripeCoupon.name as string,
        couponId: stripeCoupon.id,
        percent_off: stripeCoupon.percent_off as number,
        duration: stripeCoupon.duration,
        createdBy: userId,
      });

      return {
        msg: 'done',
        coupon,
        stripeCoupon,
      };
    });
  }

  delete(deleteCouponDto: DeleteCouponDto) {
    return asyncHandler(async () => {
      const coupon = await this.couponRepository.findOne({
        filter: { couponId: deleteCouponDto.couponId },
      });
      if (!coupon)
        return errorResponse('bad-req', 'in-valid coupon id or expired coupon');
      return {
        msg: 'done',
        coupon: await this.stripeCouponService.deleteCoupon(
          deleteCouponDto.couponId,
        ),
      };
    });
  }
}
