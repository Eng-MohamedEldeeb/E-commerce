import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IOrder,
  IOrderItem,
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
        quantity: { type: Number, required: true },
        unitPrice: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
      },
    ]),
  )
  products: IOrderItem[];

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

  @Prop({ type: Date })
  paidAt?: Date;

  @Prop({ type: String })
  rejectedReason?: string;

  @Prop({ type: Number })
  discount?: number;

  @Prop({ type: Number })
  subTotal: number;

  @Prop({ type: Number })
  finalPrice: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
