import { CouponRepository } from './../../../db/repositories/coupon.repo';
import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/createCoupon.dto';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';
import { DeleteCouponDto } from './dto/deleteCoupon.dto';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';
import { errorResponse } from 'src/common/res/error.response';

@Injectable()
export class CouponService {
  constructor(
    private readonly stripeCouponService: StripeCouponService,
    private readonly couponRepository: CouponRepository,
  ) {}
  create(createCouponDto: CreateCouponDto) {
    return asyncHandler(async () => {
      const { name, id, percent_off, duration } =
        await this.stripeCouponService.createCoupon({
          ...createCouponDto,
        });

      const coupon = await this.couponRepository.create({
        name: name as string,
        id,
        percent_off: percent_off as number,
        duration,
      });

      return {
        msg: 'done',
        coupon,
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
        coupon: await this.stripeCouponService.deleteCoupon(coupon.couponId),
      };
    });
  }
}
