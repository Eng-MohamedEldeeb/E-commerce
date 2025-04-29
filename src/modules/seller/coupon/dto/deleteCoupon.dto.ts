import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteCouponDto {
  @IsString()
  @IsNotEmpty()
  couponId: string;
}
