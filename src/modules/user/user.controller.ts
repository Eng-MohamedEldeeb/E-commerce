import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { UserRoles } from 'src/db/Models/User/Types/User.type';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { Types } from 'mongoose';
import { AddToCartDTO } from './dto/addToCart.dto';

@Controller('user')
@Auth(UserRoles.user)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  addToCart(
    @User('_id') user: Types.ObjectId,
    @Body() addToCartDTO: AddToCartDTO,
  ) {
    return this.userService.addToCart(user, addToCartDTO);
  }

  @Patch()
  removeFromCart(
    @User('_id') user: Types.ObjectId,
    @Body() productId: Types.ObjectId[],
  ) {
    return this.userService.removeFromCart(user, productId);
  }

  @Delete()
  clearCart(@User('_id') user: Types.ObjectId) {
    return this.userService.clearCart(user);
  }
}
