import {
  FilterQuery,
  PopulateOptions,
  ProjectionType,
  QueryOptions,
  RootFilterQuery,
  Types,
  UpdateQuery,
} from 'mongoose';

interface IQueryOptions<T> {
  projection?: ProjectionType<T> | string;
  options?: QueryOptions<T>;
  populate?: PopulateOptions | PopulateOptions[];
}
export interface IFindQuery<T> extends IQueryOptions<T> {
  filter?: RootFilterQuery<T>;
  sort?: string;
  page?: number;
}
export interface IUpdateOptions<T> {
  data: UpdateQuery<T>;
  options?: QueryOptions<T>;
}
export interface IFindByIdOptions<T> extends IQueryOptions<T> {
  id: Types.ObjectId;
}

export interface IFIndByIdAndUpdate<T> extends IUpdateOptions<T> {
  id: Types.ObjectId;
}
export interface IFIndOneIdAndUpdate<T> extends IUpdateOptions<T> {
  filter: FilterQuery<T>;
}

export interface IFindOneOptions<T> extends IQueryOptions<T> {
  filter: FilterQuery<T>;
}
