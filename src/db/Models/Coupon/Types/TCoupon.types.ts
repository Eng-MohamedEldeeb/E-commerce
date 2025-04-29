import { HydratedDocument } from 'mongoose';
import { Coupon } from '../Coupon.schema';

export enum CouponDuration {
  forever = 'forever',
  once = 'once',
  repeating = 'repeating',
}
export type TCoupon = HydratedDocument<Coupon> & Document;
