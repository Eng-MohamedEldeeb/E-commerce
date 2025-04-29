import { IsEnum, IsNumber, IsString, Max, MaxLength } from 'class-validator';
import { ICouponInputs } from 'src/db/Models/Coupon/Interface/ICoupon.interface';
import { CouponDuration } from 'src/db/Models/Coupon/Types/TCoupon.types';

export class CreateCouponDto implements ICouponInputs {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(CouponDuration)
  duration: CouponDuration;

  @IsNumber()
  @Max(1000)
  percent_off: number;
}
