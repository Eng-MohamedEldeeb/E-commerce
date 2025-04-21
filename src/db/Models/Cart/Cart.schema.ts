import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ICart, ICartItems } from './Interface/ICart.interface';
import { Types } from 'mongoose';
import { TUserDocument } from '../User/Types/User.type';
import { User } from '../User/User.schema';
import { TCategory } from '../Category/Types/TCategory.types';

@Schema({ timestamps: true })
export class Cart implements ICart {
  @Prop(
    raw([
      {
        productId: { type: Types.ObjectId, ref: Cart.name, required: true },
        quantity: { type: Number, required: true },
      },
    ]),
  )
  products: ICartItems[];

  @Prop({ type: Types.ObjectId, ref: User.name, required: true, unique: true })
  createdBy: Types.ObjectId | TUserDocument;
}

export const categorySchema = SchemaFactory.createForClass(Cart);
