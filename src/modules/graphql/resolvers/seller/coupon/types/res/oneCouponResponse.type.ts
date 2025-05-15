import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { ICoupon } from 'src/db/Models/Coupon/Interface/ICoupon.interface';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';

@ObjectType()
export class OneCouponResponse implements ICoupon {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => ID)
  couponId: string;

  @Field(() => String)
  duration: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  percent_off: number;

  @Field(() => ID)
  createdBy: Types.ObjectId | IUser;
}
