import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class OrderIdDto {
  @IsMongoId()
  @IsNotEmpty()
  orderId: Types.ObjectId;
}
