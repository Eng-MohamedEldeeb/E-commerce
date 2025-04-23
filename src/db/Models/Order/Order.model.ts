import { MongooseModule } from '@nestjs/mongoose';
import { Order, orderSchema } from './Order.schema';

export const OrderModel = MongooseModule.forFeature([
  {
    name: Order.name,
    schema: orderSchema,
  },
]);
