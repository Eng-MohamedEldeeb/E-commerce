import { StripeFactory } from './../../../common/services/payment/stripe/factory/stripe.factory.service';
import { OrderRepository } from './../../../db/repositories/order.repo';
import { CartRepository } from './../../../db/repositories/cart.repo';
import { OrderFactory } from './factory/OrderFactory.service';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/createOrder.dto';
import { errorResponse } from 'src/common/res/error.response';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { StripePaymentService } from 'src/common/services/payment/stripe/stripe.payment.service';
import {
  OrderStatus,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';
import { Request } from 'express';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { StripeCouponService } from 'src/common/services/payment/stripe/stripe.coupon.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderFactory: OrderFactory,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly stripePaymentService: StripePaymentService,
    private readonly stripeCouponService: StripeCouponService,
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

      const discounts: { coupon: string }[] = [];

      if (order?.coupon) {
        const coupon = await this.stripeCouponService.retrieveCoupon(
          order.coupon,
        );
        if (!coupon)
          return errorResponse('bad-req', 'in-valid or expired coupon');
        discounts.push({ coupon: coupon.id });
      }
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
            discounts,
          }),
          orderIntent,
        },
      };
    });
  }

  refund(user: TUserDocument, orderId: Types.ObjectId) {
    return asyncHandler(async () => {
      const order = await this.orderRepository.findOne({
        filter: {
          _id: orderId,
          $or: [
            {
              status: OrderStatus.pending,
            },
            {
              status: OrderStatus.placed,
            },
          ],
        },
      });

      if (!order)
        return errorResponse(
          'not-found',
          'in-valid orderId or not existed Order',
        );

      if (order.paymentMethod == PaymentMethods.card) {
        await this.stripePaymentService.refund(order.intentId as string);
      }

      for (const product of order.products) {
        await this.productRepository.updateById({
          id: product.productId as Types.ObjectId,
          data: {
            $inc: {
              stock: product.quantity,
            },
          },
        });
      }
      await this.orderRepository.updateById({
        id: order._id,
        data: {
          canceledAt: Date.now(),
          refundAmount: order.finalPrice,
        },
      });
      return { msg: 'done' };
    });
  }
  webhook(request: Request) {
    return asyncHandler(() => {
      return this.stripePaymentService.webhook(request);
    });
  }
}
