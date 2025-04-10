import { Document, HydratedDocument } from 'mongoose';
import { User } from '../User.schema';

export type TUserDocument = HydratedDocument<User> & Document;

export enum UserRoles {
  user = 'user',
  admin = 'admin',
  seller = 'seller',
}
