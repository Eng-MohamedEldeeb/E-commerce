import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import {
  IProductInputs,
  ProductSizes,
} from 'src/db/Models/Product/Interface/IProduct.interface';

export class AddProductDTO implements IProductInputs {
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  description?: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsArray()
  @IsOptional()
  color?: string[];

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  originalPrice: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  discountPercent: number;

  @IsEnum(ProductSizes)
  @IsOptional()
  size?: ProductSizes;
}
