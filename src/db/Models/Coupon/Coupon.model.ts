import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, couponSchema } from './Coupon.schema';

export const OrderModel = MongooseModule.forFeature([
  {
    name: Coupon.name,
    schema: couponSchema,
  },
]);
