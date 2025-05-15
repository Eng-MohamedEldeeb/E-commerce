import { Types } from 'mongoose';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from 'src/modules/user/order/order.service';
import {
  OneOrderResponse,
  SuccessCreateOrderResponse,
} from './res/oneOrderResponse';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { CreateOrderDto } from 'src/modules/user/order/dto/createOrder.dto';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';

@Resolver()
@Auth(UserRoles.user)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [OneOrderResponse], { name: 'getOrders' })
  async getOrders(userId: Types.ObjectId) {
    const cart = await this.orderService.getOrders(userId);
    return cart;
  }

  @Mutation(() => SuccessCreateOrderResponse, {
    name: 'createOrder',
  })
  async createOrder(
    @Args({ nullable: false, name: 'createOrderArgs' })
    createOrderDto: CreateOrderDto,
    @User('_id') userId: Types.ObjectId,
  ) {
    const order = await this.orderService.create(userId, createOrderDto);
    console.log({ order });
    return order;
  }
}
