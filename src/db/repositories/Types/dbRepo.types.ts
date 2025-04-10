import {
  FilterQuery,
  ProjectionType,
  PopulateOptions,
  QueryOptions,
  Types,
  UpdateQuery,
} from 'mongoose';

export type TSingleReturn<TDocument> = Promise<TDocument | null>;

interface IQueryOptions<T> {
  projection?: ProjectionType<T>;
  options?: QueryOptions<T>;
  populate?: PopulateOptions | PopulateOptions[];
}

interface IUpdateOptions<T> {
  data: UpdateQuery<T>;
  options?: QueryOptions<T>;
}
export interface IFindByIdOptions<T> extends IQueryOptions<T> {
  id: Types.ObjectId;
}

export interface IFIndByIdAndUpdate<T> extends IUpdateOptions<T> {
  id: Types.ObjectId;
}

export interface IFindOneOptions<T> extends IQueryOptions<T> {
  filter: FilterQuery<T>;
}
