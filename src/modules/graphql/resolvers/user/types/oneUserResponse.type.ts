import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { IUser } from 'src/db/Models/User/interfaces/user.interface';

@ObjectType()
export class OneUserResponse implements Partial<IUser> {
  @Field(() => ID)
  _id?: Types.ObjectId;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => Date)
  birthDate: Date;

  @Field(() => String)
  phone: string;
}
