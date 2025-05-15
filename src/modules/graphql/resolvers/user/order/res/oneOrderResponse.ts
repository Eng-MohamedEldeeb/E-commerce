import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IOrder,
  IOrderProducts,
  OrderStatus,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { OneProductResponse } from '../../../seller/product/types/res/oneProductResponse.type';
import { OneUserResponse } from '../../types/oneUserResponse.type';

@ObjectType()
export class OneOrderResponse implements Partial<IOrder> {
  @Field(() => String)
  address: string;

  @Field(() => String)
  phone: string;

  @Field(() => String, { nullable: true })
  note?: string;

  @Field(() => String, { nullable: true })
  coupon?: string;

  @Field(() => String)
  paymentMethod: PaymentMethods;

  @Field(() => Int)
  finalPrice: number;

  @Field(() => String)
  status: OrderStatus;

  @Field(() => OneUserResponse)
  createdBy: IUser;
}

@ObjectType()
export class SuccessCreateOrderResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;

  @Field(() => OneOrderResponse, { nullable: true })
  data?: OneOrderResponse;
}
