import { InjectModel } from '@nestjs/mongoose';
import { TCoupon } from '../Models/Coupon/Types/TCoupon.types';
import { DataBaseRepository } from './db.repo';
import { Coupon } from '../Models/Coupon/Coupon.schema';
import { Model } from 'mongoose';

export class CouponRepository extends DataBaseRepository<TCoupon> {
  constructor(@InjectModel(Coupon.name) couponModel: Model<TCoupon>) {
    super(couponModel);
  }
}
