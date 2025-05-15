import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  IOrderInputs,
  PaymentMethods,
} from 'src/db/Models/Order/Interface/IOrder.interface';

registerEnumType(PaymentMethods, { name: 'PaymentMethods' });

@InputType()
export class CreateOrderDto implements IOrderInputs {
  @IsString()
  @IsNotEmpty()
  // @Matches()
  @Field(() => String, { name: 'phone' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String, { name: 'address' })
  address: string;

  @IsString()
  @MinLength(2)
  @MaxLength(5000)
  @IsOptional()
  @Field(() => String, { nullable: true, name: 'note' })
  note?: string;

  @IsString()
  @IsEnum(PaymentMethods)
  @Field(() => PaymentMethods, { name: 'paymentMethod' })
  paymentMethod: PaymentMethods;

  @IsOptional()
  @Field(() => String, { nullable: true, name: 'coupon' })
  coupon?: string;
}
