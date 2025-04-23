import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { Types } from 'mongoose';
import { AddToCartDTO } from './dto/addToCart.dto';
import { RemoveFromCartDto } from './dto/removeFromCart.dto';

@Controller('user/cart')
@Auth(UserRoles.user)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(
    @User('_id') user: Types.ObjectId,
    @Body() addToCartDTO: AddToCartDTO,
  ) {
    return this.cartService.addToCart(user, addToCartDTO);
  }

  @Patch()
  removeFromCart(
    @User('_id') user: Types.ObjectId,
    @Body() removeFromCartDto: RemoveFromCartDto,
  ) {
    return this.cartService.removeFromCart(user, removeFromCartDto);
  }

  @Delete()
  clearCart(@User('_id') user: Types.ObjectId) {
    return this.cartService.clearCart(user);
  }
}
