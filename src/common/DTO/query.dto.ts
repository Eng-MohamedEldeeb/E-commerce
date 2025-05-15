import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export interface IQueryFind {
  page: number;

  sort: string;

  select: string;
}
export class QueryFindDTO implements IQueryFind {
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
