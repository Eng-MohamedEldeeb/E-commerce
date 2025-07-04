import { Controller, Post, Body, Param, Req, HttpCode } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { Types } from 'mongoose';
import { OrderIdDto } from './dto/checkout.dto';
import { TUserDocument, UserRoles } from 'src/db/Models/User/Types/User.type';
import { Request } from 'express';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
@Controller('user/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth(UserRoles.user)
  @Post()
  create(
    @User('_id') userId: Types.ObjectId,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.create(userId, createOrderDto);
  }

  @Auth(UserRoles.user)
  @Post('checkout/:orderId')
  @HttpCode(200)
  checkout(@User() user: TUserDocument, @Param() orderIdDto: OrderIdDto) {
    return this.orderService.checkout(user, orderIdDto.orderId);
  }

  @Auth(UserRoles.user)
  @Post('refound/:orderId')
  @HttpCode(200)
  refund(@Param() orderIdDto: OrderIdDto) {
    return this.orderService.refund(orderIdDto.orderId);
  }

  @Post('/webhook')
  webhook(@Req() request: Request) {
    return this.orderService.webhook(request);
  }
}
