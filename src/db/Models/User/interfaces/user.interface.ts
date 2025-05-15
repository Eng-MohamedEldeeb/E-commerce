import { UserRoles } from '../Types/User.type';

export interface IUser {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  birthDate: Date;
  role: UserRoles;
}
