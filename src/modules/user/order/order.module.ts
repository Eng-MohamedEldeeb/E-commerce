import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from 'src/db/repositories/order.repo';
import { OrderModel } from 'src/db/Models/Order/Order.model';

@Module({
  imports: [OrderModel],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
