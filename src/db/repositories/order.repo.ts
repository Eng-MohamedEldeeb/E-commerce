import { InjectModel } from '@nestjs/mongoose';
import { TOrder } from '../Models/Order/Types/TOrder.types';
import { DataBaseRepository } from './db.repo';
import { Order } from '../Models/Order/Order.schema';
import { Model } from 'mongoose';

export class OrderRepository extends DataBaseRepository<TOrder> {
  constructor(@InjectModel(Order.name) OrderModel: Model<TOrder>) {
    super(OrderModel);
  }
}
