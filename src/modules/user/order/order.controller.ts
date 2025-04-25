import { Controller, Post, Body, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { Types } from 'mongoose';
import { OrderIdDto } from './dto/checkout.dto';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @User('_id') userId: Types.ObjectId,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(userId, createOrderDto);
  }
  @Post('/:orderId')
  checkout(@User() user: TUserDocument, @Param() orderIdDto: OrderIdDto) {
    return this.orderService.checkout(user, orderIdDto);
  }
}
