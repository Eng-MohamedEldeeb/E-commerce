import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICategory } from './Interface/ICategory.interface';
import { SchemaTypes, Types } from 'mongoose';
import { TUserDocument } from '../User/Types/User.type';
import { User } from '../User/User.schema';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Category implements ICategory {
  @Prop(
    raw({
      secure_url: { type: String },
      public_id: { type: String },
    }),
  )
  image: IFile;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({
    type: String,
    default: function (this: ICategory) {
      return slugify(this.name, { trim: true });
    },
  })
  slug: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdBy: Types.ObjectId | TUserDocument;
}

export const categorySchema = SchemaFactory.createForClass(Category);
