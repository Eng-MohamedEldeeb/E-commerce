import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from 'src/db/repositories/order.repo';
import { OrderModel } from 'src/db/Models/Order/Order.model';
import { OrderFactory } from './factory/OrderFactory.service';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { ProductModel } from 'src/db/Models/Product/Product.model';
import { CartRepository } from 'src/db/repositories/cart.repo';
import { CartService } from '../cart/cart.service';
import { CartModel } from 'src/db/Models/Cart/Cart.model';
import { StripePaymentService } from 'src/common/services/payment/stripe/stripe.payment.service';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';
import { StripeService } from 'src/common/services/payment/stripe/stripe.service';
import { OrderResolver } from 'src/modules/graphql/resolvers/user/order/order.resolver';

@Module({
  imports: [OrderModel, ProductModel, CartModel],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderFactory,
    OrderResolver,
    ProductRepository,
    CartRepository,
    CartService,
    StripePaymentService,
    StripeCouponService,
    StripeService,
  ],
})
export class OrderModule {}
