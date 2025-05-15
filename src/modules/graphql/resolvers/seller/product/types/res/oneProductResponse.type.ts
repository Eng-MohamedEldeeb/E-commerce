import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import {
  IFile,
  OneFileResponse,
} from 'src/common/utils/upload/interface/file.interface';
import { ICategory } from 'src/db/Models/Category/Interface/ICategory.interface';
import {
  IProduct,
  ProductSizes,
} from 'src/db/Models/Product/Interface/IProduct.interface';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { OneCategoryResponse } from 'src/modules/graphql/resolvers/dashboard/category/types/res/oneCategoryResponse.type';
import { OneUserResponse } from 'src/modules/graphql/resolvers/user/types/oneUserResponse.type';

@ObjectType()
export class OneProductResponse implements IProduct {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => String)
  name: string;

  @Field(() => String)
  slug: string;

  @Field(() => OneFileResponse)
  image: IFile;

  @Field(() => [OneFileResponse], { nullable: true })
  gallery?: IFile[] | undefined;

  @Field(() => String, { nullable: true })
  folderId: string;

  @Field(() => OneCategoryResponse)
  categoryId: ICategory;

  @Field(() => [String], { nullable: true })
  color?: string[];

  @Field(() => OneUserResponse)
  createdBy: IUser;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => Int)
  discountPercent: number;

  @Field(() => Int)
  finalPrice: number;

  @Field(() => Int)
  originalPrice: number;

  @Field(() => Int)
  stock: number;

  @Field(() => [String], { nullable: true })
  reviews?: string[];

  @Field(() => String, { nullable: true })
  size?: ProductSizes;
}
