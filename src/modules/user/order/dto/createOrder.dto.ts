import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IOrderInputs,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';

export class CreateOrderDto implements IOrderInputs {
  @IsString()
  @IsNotEmpty()
  // @Matches()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5000)
  @IsOptional()
  note?: string;

  @IsString()
  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;

  @Type(() => Number)
  @IsNumber()
  @Max(100)
  @IsOptional()
  orderDiscount: number;
}
