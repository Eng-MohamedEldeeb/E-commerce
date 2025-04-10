import { HydratedDocument } from 'mongoose';
import { User } from '../Schema/User.schema';

export type TUserDocument = HydratedDocument<User>;

export enum UserRoles {
  user = 'user',
  admin = 'admin',
  seller = 'seller',
}
