import { StripeFactory } from './../../../common/services/payment/stripe/factory/stripe.factory.service';
import { OrderRepository } from './../../../db/repositories/order.repo';
import { CartRepository } from './../../../db/repositories/cart.repo';
import { OrderFactory } from './factory/OrderFactory..service';
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

@Injectable()
export class OrderService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderFactory: OrderFactory,
    private readonly orderRepository: OrderRepository,
    private readonly stripePaymentService: StripePaymentService,
  ) {}

  async create(userId: Types.ObjectId, createOrderDto: CreateOrderDto) {
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
  }

  async checkout(user: TUserDocument, orderId: OrderIdDto) {
    const order = await this.orderRepository.findOne({
      filter: {
        createdBy: user._id,
        status: OrderStatus.pending,
        paymentMethod: PaymentMethods.card,
      },
      populate: [
        {
          path: 'products',
        },
      ],
    });

    if (!order) return errorResponse('bad-req', 'in-valid orderId');

    const lineItems = StripeFactory.createLineItems(order.products);

    const checkoutSession = await this.stripePaymentService.checkout({
      customer_email: user.email,
      line_items: lineItems,
    });
  }
}
