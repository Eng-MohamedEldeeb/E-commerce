import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, couponSchema } from './Coupon.schema';

export const couponModel = MongooseModule.forFeature([
  {
    name: Coupon.name,
    schema: couponSchema,
  },
]);
