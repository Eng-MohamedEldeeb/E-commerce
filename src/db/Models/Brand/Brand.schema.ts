import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBrand } from './Interface/IBrand.interface';
import { SchemaTypes, Types } from 'mongoose';
import { TUserDocument } from '../User/Types/User.type';
import { User } from '../User/User.schema';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import slugify from 'slugify';
import { TBrand } from './Types/TBrand.types';

@Schema({ timestamps: true })
export class Brand implements IBrand {
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
    default: function (this: IBrand) {
      return slugify(this.name, { trim: true });
    },
  })
  slug: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  createdBy: Types.ObjectId | TUserDocument;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  relatedCategory: Types.ObjectId | TBrand;
}

export const brandSchema = SchemaFactory.createForClass(Brand);
