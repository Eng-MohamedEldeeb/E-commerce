import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IProduct, ProductSizes } from './Interface/IProduct.interface';
import { SchemaTypes, Types } from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../Category/Category.schema';
import { User } from '../User/User.schema';
import { IUser } from '../User/interfaces/user.interface';
import { ICategory } from '../Category/Interface/ICategory.interface';

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  slug: string;

  @Prop({ type: String })
  originalPrice: number;

  @Prop({ type: String })
  discountPercent: number;

  @Prop({ type: String })
  finalPrice: number;

  @Prop({ type: String })
  folderId: string;

  @Prop(raw({ public_id: String, secure_url: String }))
  image: IFile;

  @Prop({ type: Array<{ public_id: String; secure_url: String }> })
  gallery?: IFile[];

  @Prop({ type: String })
  size?: ProductSizes;

  @Prop({ type: Array<String> })
  color?: string[];

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name })
  categoryId: Types.ObjectId | ICategory;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdBy: Types.ObjectId | IUser;

  @Prop({ type: Array<String> })
  reviews: string[];

  @Prop({ type: Number })
  stock: number;
}

export const productSchema = SchemaFactory.createForClass(Product);
