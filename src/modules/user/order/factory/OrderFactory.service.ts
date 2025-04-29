import { ProductRepository } from '../../../../db/repositories/product.repo';
import { Injectable } from '@nestjs/common';
import { errorResponse } from 'src/common/res/error.response';
import {
  IOrder,
  IOrderProducts,
} from 'src/db/Models/Order/Interface/IOrder.interface';
import { IOrderFactoryInputs } from './interface/IOrderFactory.interface';

@Injectable()
export class OrderFactory {
  protected readonly orderProducts: IOrderProducts[] = [];
  protected orderFinalPrice: number = 0;

  constructor(private readonly productRepository: ProductRepository) {}

  protected createInvoice(): {
    finalPrice: number;
  } {
    for (const product of this.orderProducts) {
      this.orderFinalPrice += product.finalPrice;
    }

    return { finalPrice: this.orderFinalPrice };
  }

  async createOrder({
    user,
    products,
    coupon,
    address,
    phone,
    note,
    paymentMethod,
  }: IOrderFactoryInputs): Promise<Partial<IOrder>> {
    for (const { productId, quantity } of products) {
      const checkProduct = await this.productRepository.findOne({
        filter: {
          _id: productId,
        },
      });
      if (!checkProduct)
        return errorResponse(
          'not-found',
          'in-valid product id or out of stock',
        );
      if (checkProduct.stock < quantity)
        return errorResponse('bad-req', 'Product is out of stock');

      this.orderProducts.push({
        productId: checkProduct._id,
        name: checkProduct.name,
        quantity,
        unitPrice: checkProduct.finalPrice,
        finalPrice: quantity * checkProduct.finalPrice,
      });
    }

    const { finalPrice } = this.createInvoice();

    return {
      address,
      phone,
      note,
      products: this.orderProducts,
      paymentMethod,
      coupon,
      finalPrice,
      createdBy: user._id,
    };
  }
}
