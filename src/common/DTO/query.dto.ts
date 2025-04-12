import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class QueryFindDTO {
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  sort: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  select: string;
}
