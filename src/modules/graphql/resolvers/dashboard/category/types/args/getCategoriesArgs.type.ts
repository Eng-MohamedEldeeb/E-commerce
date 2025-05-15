import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { ICategoryQuery } from 'src/modules/dashboard/category/dto/getCategory.dto';

@ArgsType()
export class GetCategoriesQueryArgs implements ICategoryQuery {
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
