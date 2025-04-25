import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from 'src/db/repositories/order.repo';
import { OrderModel } from 'src/db/Models/Order/Order.model';
import { OrderFactory } from './factory/OrderFactory..service';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { ProductModel } from 'src/db/Models/Product/Product.model';
import { CartRepository } from 'src/db/repositories/cart.repo';
import { CartService } from '../cart/cart.service';
import { CartModel } from 'src/db/Models/Cart/Cart.model';
import { StripePaymentService } from 'src/common/services/payment/stripe/stripe.payment.service';

@Module({
  imports: [OrderModel, ProductModel, CartModel],
  controllers: [OrderController],
  providers: [
    OrderRepository,
    ProductRepository,
    CartRepository,
    OrderService,
    CartService,
    StripePaymentService,
    OrderFactory,
  ],
})
export class OrderModule {}
