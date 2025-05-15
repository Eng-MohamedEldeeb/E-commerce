import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import {
  IFile,
  OneFileResponse,
} from 'src/common/utils/upload/interface/file.interface';
import { ICategory } from 'src/db/Models/Category/Interface/ICategory.interface';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { OneUserResponse } from 'src/modules/graphql/resolvers/user/types/oneUserResponse.type';

@ObjectType()
export class OneCategoryResponse implements ICategory {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => OneFileResponse)
  image: IFile;

  @Field(() => OneUserResponse)
  createdBy: IUser;
}
