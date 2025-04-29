import { StripeFactory } from './../../../common/services/payment/stripe/factory/stripe.factory.service';
import { OrderRepository } from './../../../db/repositories/order.repo';
import { CartRepository } from './../../../db/repositories/cart.repo';
import { OrderFactory } from './factory/OrderFactory.service';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { errorResponse } from 'src/common/res/error.response';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { OrderIdDto } from './dto/checkout.dto';
import { StripePaymentService } from 'src/common/services/payment/stripe/stripe.payment.service';
import {
  OrderStatus,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';
import { Request } from 'express';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderFactory: OrderFactory,
    private readonly orderRepository: OrderRepository,
    private readonly stripePaymentService: StripePaymentService,
  ) {}

  create(userId: Types.ObjectId, createOrderDto: CreateOrderDto) {
    return asyncHandler(async () => {
      const cart = await this.cartRepository.findOne({
        filter: {
          createdBy: userId,
        },
      });

      if (!cart?.products.length) return errorResponse('bad-req', 'empty Cart');

      const orderData = await this.orderFactory.createOrder({
        user: userId,
        products: cart.products,
        ...createOrderDto,
      });

      return {
        success: true,
        msg: 'Done',
        data: await this.orderRepository.create(orderData),
      };
    });
  }

  checkout(user: TUserDocument, orderId: Types.ObjectId) {
    return asyncHandler(async () => {
      const order = await this.orderRepository.findOne({
        filter: {
          _id: orderId,
          status: OrderStatus.pending,
          paymentMethod: PaymentMethods.card,
        },
        populate: [
          {
            path: 'products.productId',
          },
        ],
      });

      if (!order) return errorResponse('bad-req', 'in-valid orderId');

      const lineItems = StripeFactory.createLineItems(order.products);
      console.log(lineItems);

      const orderIntent = await this.stripePaymentService.createPaymentIntent(
        order.finalPrice,
      );

      await this.orderRepository.updateById({
        id: order._id,
        data: {
          intentId: orderIntent.id,
        },
      });

      return {
        success: true,
        msg: 'Done',
        data: {
          checkoutSession: await this.stripePaymentService.checkoutSession({
            customer_email: user.email,
            line_items: lineItems,
            metadata: {
              orderId: orderId.toString(),
            },
          }),
          orderIntent,
        },
      };
    });
  }

  webhook(request: Request) {
    return asyncHandler(() => {
      return this.stripePaymentService.webhook(request);
    });
  }
}
