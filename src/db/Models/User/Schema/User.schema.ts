import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { user_PreSave } from '../Hooks/preSave.hook';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';
import { UserRoles } from '../Types/User.type';

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop()
  fullName: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  password: string;

  @Prop()
  birthDate: Date;

  @Prop()
  role: UserRoles;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', user_PreSave);
