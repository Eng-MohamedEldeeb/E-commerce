import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IOrder,
  IOrderProducts,
  OrderStatus,
  PaymentMethods,
} from './Interface/IOrder.interface';
import { Types } from 'mongoose';
import { Product } from '../Product/Product.schema';
import { User } from '../User/User.schema';

@Schema({ timestamps: true })
export class Order implements IOrder {
  @Prop(
    raw([
      {
        productId: { type: Types.ObjectId, ref: Product.name, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
      },
    ]),
  )
  products: IOrderProducts[];

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  note?: string;

  @Prop({ type: String, enum: PaymentMethods, default: PaymentMethods.card })
  paymentMethod: PaymentMethods;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name })
  updatedBy?: Types.ObjectId;

  @Prop({ type: String, enum: OrderStatus, default: OrderStatus.pending })
  status: OrderStatus;

  @Prop({ type: String })
  intentId?: string;

  @Prop({ type: Date })
  paidAt?: Date;

  @Prop({ type: Date })
  canceledAt?: Date;

  @Prop({ type: String })
  rejectedReason?: string;

  @Prop({ type: String })
  coupon?: string;

  @Prop({ type: Number })
  subTotal: number;

  @Prop({ type: Number })
  finalPrice: number;

  @Prop({ type: Number })
  refundAmount: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
