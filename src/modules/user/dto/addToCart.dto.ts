import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDTO {
  @IsMongoId()
  @IsNotEmpty()
  productId: Types.ObjectId;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
