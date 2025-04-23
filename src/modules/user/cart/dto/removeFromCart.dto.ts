import { IsArray, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class RemoveFromCartDto {
  @IsArray()
  @IsNotEmpty()
  productIds: Types.ObjectId[];
}
