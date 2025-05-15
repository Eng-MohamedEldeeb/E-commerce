import { IsOptional, IsString, MinLength } from 'class-validator';
import { IQueryFind, QueryFindDTO } from 'src/common/DTO/query.dto';

export interface ICategoryQuery extends IQueryFind {
  name: string;
}
export class CategoryQueryDTO extends QueryFindDTO implements ICategoryQuery {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;
}
