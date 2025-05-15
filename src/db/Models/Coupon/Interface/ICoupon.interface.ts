import { Types } from 'mongoose';
import { IUser } from '../../User/interfaces/user.interface';

export interface ICouponInputs {
  percent_off: number;
  duration: string;
  name: string;
}
export interface ICoupon extends ICouponInputs {
  _id?: Types.ObjectId;
  couponId: string;
  createdBy: Types.ObjectId | IUser;
}
