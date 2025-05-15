import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

@InputType()
export class AddToCartDTO {
  @IsMongoId()
  @IsNotEmpty()
  @Field(() => ID)
  productId: Types.ObjectId;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int)
  quantity: number;
}
