import { PartialType } from '@nestjs/mapped-types';
import { AddProductDTO } from './addProduct.dto';
import { Types } from 'mongoose';
import { IsMongoId } from 'class-validator';

export class UpdateProductDTO extends PartialType(AddProductDTO) {}

export class ProductIdDTO {
  @IsMongoId()
  productId: Types.ObjectId;
}
