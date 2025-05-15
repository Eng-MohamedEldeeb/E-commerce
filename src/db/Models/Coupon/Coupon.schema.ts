import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICoupon } from './Interface/ICoupon.interface';
import { SchemaTypes, Types } from 'mongoose';
import { User } from '../User/User.schema';

@Schema({ timestamps: true })
export class Coupon implements ICoupon {
  @Prop({ type: String, required: true })
  couponId: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  duration: string;

  @Prop({ type: String, required: true })
  percent_off: number;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;
}

export const couponSchema = SchemaFactory.createForClass(Coupon);
