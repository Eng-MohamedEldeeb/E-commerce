import { Types } from 'mongoose';
import { IProduct } from '../../Product/Interface/IProduct.interface';

export enum PaymentMethods {
  cash = 'cash',
  card = 'card',
}

export enum OrderStatus {
  pending = 'pending',
  placed = 'placed',
  shipped = 'shipped',
  onWay = 'on_way',
  delivered = 'delivered',
  canceled = 'canceled',
}

export interface IOrderItem {
  productId: Types.ObjectId | IProduct;
  name: string;
  quantity: number;
  unitPrice: number;
  finalPrice: number;
}

export interface IOrderInputs {
  address: string;
  phone: string;
  note?: string;
  paymentMethod: PaymentMethods;
}

export interface IOrder extends IOrderInputs {
  products: IOrderItem[];

  status: OrderStatus;

  discount?: number;
  subTotal: number;
  finalPrice: number;

  paidAt?: Date;
  rejectedReason?: string;

  createdBy: Types.ObjectId;
  updatedBy?: Types.ObjectId;
}
