import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from 'src/db/repositories/cart.repo';
import { CartModel } from 'src/db/Models/Cart/Cart.model';

@Module({
  imports: [CartModel],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
