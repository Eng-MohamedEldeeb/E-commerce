import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { IBrandQuery } from 'src/modules/dashboard/brand/dto/getBrand.dto';

@ArgsType()
export class GetBrandsQueryArgs implements IBrandQuery {
  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;

  @Field({ nullable: true })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;

  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  sort: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  select: string;
}
