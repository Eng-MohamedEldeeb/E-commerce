import { Types } from 'mongoose';
import { CartService } from './../../../../user/cart/cart.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  OneCartResponse,
  SuccessAddToCartResponse,
} from './types/res/oneCartResponse';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { AddToCartDTO } from 'src/modules/user/cart/dto/addToCart.dto';

@Auth(UserRoles.user)
@Resolver()
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Query(() => [OneCartResponse], { name: 'getCart' })
  async getCart(userId: Types.ObjectId) {
    const cart = await this.cartService.getCart(userId);
    return cart;
  }

  @Mutation(() => SuccessAddToCartResponse, { name: 'addToCart' })
  async addToCart(
    @Args({ nullable: false, name: 'addToCartArgs' })
    addToCartArgs: AddToCartDTO,
    @User('_id') userId: Types.ObjectId,
  ) {
    const cart = await this.cartService.addToCart(userId, addToCartArgs);
    return cart;
  }
}
