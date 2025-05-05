import { IsOptional, IsString, MinLength } from 'class-validator';
import { QueryFindDTO } from 'src/common/DTO/query.dto';

export class BrandQueryDTO extends QueryFindDTO {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;
}
