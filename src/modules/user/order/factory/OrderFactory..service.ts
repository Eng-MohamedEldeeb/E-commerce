import { ProductRepository } from './../../../../db/repositories/product.repo';
import { Injectable } from '@nestjs/common';
import { errorResponse } from 'src/common/res/error.response';
import {
  IOrder,
  IOrderProducts,
} from 'src/db/Models/Order/Interface/IOrder.interface';
import { IOrderFactoryInputs } from './interface/IOrderFactory.interface';

@Injectable()
export class OrderFactory {
  constructor(
    private readonly productRepository: ProductRepository,
    protected readonly orderProducts: IOrderProducts[],
    protected orderSubTotal: number = 0,
    protected orderFinalPrice: number = 0,
  ) {}

  protected createInvoice(orderDiscount: number): {
    subTotal: number;
    finalPrice: number;
  } {
    for (const product of this.orderProducts) {
      this.orderSubTotal += product.finalPrice;
    }
    this.orderFinalPrice +=
      this.orderSubTotal - (orderDiscount || 0 / 100) * this.orderSubTotal;

    return { subTotal: this.orderSubTotal, finalPrice: this.orderFinalPrice };
  }

  async createOrder({
    user,
    products,
    orderDiscount,
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
        unitPrice: checkProduct.originalPrice,
        discount: checkProduct.discountPercent || 0,
        finalPrice:
          quantity * checkProduct.originalPrice -
          (checkProduct.discountPercent / 100) *
            (quantity * checkProduct.originalPrice),
      });
    }

    const { subTotal, finalPrice } = this.createInvoice(orderDiscount);

    return {
      address,
      phone,
      note,
      products: this.orderProducts,
      paymentMethod,
      discount: orderDiscount,
      subTotal,
      finalPrice,
      createdBy: user._id,
    };
  }
}
