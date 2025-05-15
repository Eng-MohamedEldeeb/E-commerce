import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  ICart,
  ICartItems,
} from 'src/db/Models/Cart/Interface/ICart.interface';
import { Types } from 'mongoose';

@ObjectType()
export class OneCartItem implements ICartItems {
  @Field(() => ID)
  productId: Types.ObjectId;

  @Field(() => Int)
  quantity: number;
}

@ObjectType()
export class OneCartResponse implements ICart {
  @Field(() => [OneCartItem])
  products: ICartItems[];

  @Field(() => ID)
  createdBy: Types.ObjectId;
}

@ObjectType()
export class SuccessCartResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  msg: string;

  @Field(() => OneCartResponse, { nullable: true })
  cart: OneCartResponse;
}
