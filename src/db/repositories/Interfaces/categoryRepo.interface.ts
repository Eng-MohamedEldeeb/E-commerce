import { Types } from 'mongoose';
import { IUpdateOptions } from './dbRepo.interface';

export interface IUpdateCategoryById<T> extends IUpdateOptions<T> {
  id: Types.ObjectId;
}
