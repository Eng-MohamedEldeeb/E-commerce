import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class CheckOutArgs {
  @Field(() => ID)
  orderId: Types.ObjectId;
}
