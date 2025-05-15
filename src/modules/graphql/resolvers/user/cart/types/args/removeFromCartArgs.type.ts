import { Field, ID, InputType } from '@nestjs/graphql';
import { Types } from 'mongoose';

@InputType()
export class RemoveFromCartArgs {
  @Field(() => [ID])
  productIds: Types.ObjectId[];
}
