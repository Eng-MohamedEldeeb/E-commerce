import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICoupon } from './Interface/ICoupon.interface';
import { Types } from 'mongoose';

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
}

export const couponSchema = SchemaFactory.createForClass(Coupon);
