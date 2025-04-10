import { IUpdateOptions } from './dbRepo.interface';

export interface IUpdateCategoryByName<T> extends IUpdateOptions<T> {
  name: string;
}
