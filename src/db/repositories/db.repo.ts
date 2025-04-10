import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  IFIndByIdAndUpdate,
  IFindByIdOptions,
  IFindOneOptions,
  TSingleReturn,
} from './Types/dbRepo.types';

@Injectable()
export abstract class DataBaseService<TDocument> {
  constructor(private readonly model: Model<TDocument>) {}

  create(data: Partial<TDocument>): Promise<TDocument> {
    return this.model.create(data);
  }

  findById({
    id,
    projection,
    options,
    populate,
  }: IFindByIdOptions<TDocument>): TSingleReturn<TDocument> {
    return this.model
      .findById(id, projection, options)
      .populate(populate || []);
  }

  findOne({
    filter,
    projection,
    options,
    populate,
  }: IFindOneOptions<TDocument>): TSingleReturn<TDocument> {
    return this.model
      .findOne(filter, projection, options)
      .populate(populate || []);
  }

  updateById({
    id,
    data,
    options,
  }: IFIndByIdAndUpdate<TDocument>): TSingleReturn<TDocument> {
    return this.model.findByIdAndUpdate(id, data, options);
  }
}
