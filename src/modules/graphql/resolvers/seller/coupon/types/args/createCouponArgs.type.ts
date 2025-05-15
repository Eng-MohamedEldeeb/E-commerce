import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ICouponInputs } from 'src/db/Models/Coupon/Interface/ICoupon.interface';

@ArgsType()
export class CreateCouponMutationDTO implements ICouponInputs {
  @Field(() => String)
  name: string;

  @Field(() => String)
  duration: string;

  @Field(() => Int)
  percent_off: number;
}
