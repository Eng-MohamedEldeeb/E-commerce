import { IsOptional, IsString, MinLength } from 'class-validator';
import { IQueryFind, QueryFindDTO } from 'src/common/DTO/query.dto';

export interface IBrandQuery extends IQueryFind {
  name: string;
}

export class BrandQueryDTO extends QueryFindDTO implements IBrandQuery {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;
}
