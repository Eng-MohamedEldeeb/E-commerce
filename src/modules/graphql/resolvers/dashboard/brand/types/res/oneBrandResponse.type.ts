import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IFile,
  OneFileResponse,
} from 'src/common/utils/upload/interface/file.interface';
import { IBrand } from 'src/db/Models/Brand/Interface/IBrand.interface';
import { ICategory } from 'src/db/Models/Category/Interface/ICategory.interface';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { Types } from 'mongoose';
import { OneUserResponse } from '../../../../user/types/oneUserResponse.type';
import { OneCategoryResponse } from '../../../category/types/res/oneCategoryResponse.type';

@ObjectType()
export class OneBrandResponse implements IBrand {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => OneFileResponse)
  image: IFile;

  @Field(() => OneUserResponse, { nullable: true })
  createdBy: IUser;

  @Field(() => OneCategoryResponse, { nullable: true })
  relatedCategory: ICategory;
}
