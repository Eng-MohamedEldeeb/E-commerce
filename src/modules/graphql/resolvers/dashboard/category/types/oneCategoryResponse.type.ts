import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import {
  IFile,
  OneFileResponse,
} from 'src/common/utils/upload/interface/file.interface';
import { ICategory } from 'src/db/Models/Category/Interface/ICategory.interface';
import {
  IUser,
  OneUserResponse,
} from 'src/db/Models/User/interfaces/user.interface';
import { ICategoryQuery } from 'src/modules/dashboard/category/dto/getCategory.dto';

@ObjectType()
export class OneCategoryResponse implements ICategory {
  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => OneFileResponse)
  image: IFile;

  @Field(() => OneUserResponse)
  createdBy: IUser;
}

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
