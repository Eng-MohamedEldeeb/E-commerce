import { Types } from 'mongoose';
import { IProduct } from '../../Product/Interface/IProduct.interface';
import { IUser } from '../../User/interfaces/user.interface';

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

export interface IOrderProducts {
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
  coupon?: string;
}

export interface IOrder extends IOrderInputs {
  products: IOrderProducts[];

  subTotal: number;
  finalPrice: number;
  refundAmount: number;

  status: OrderStatus;

  intentId?: string;
  paidAt?: Date;
  canceledAt?: Date;
  rejectedReason?: string;

  createdBy: Types.ObjectId | IUser;
  updatedBy?: Types.ObjectId | IUser;
}
