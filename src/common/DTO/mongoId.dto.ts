import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class IsMongoIdDTO {
  @IsNotEmpty()
  @IsMongoId()
  id: Types.ObjectId;
}
