import { InjectModel } from '@nestjs/mongoose';
import { TBrand } from '../Models/Brand/Types/TBrand.types';
import { DataBaseRepository } from './db.repo';
import { Brand } from '../Models/Brand/Brand.schema';
import { Model } from 'mongoose';
import { errorResponse } from 'src/common/res/error.response';
import { IUpdateById } from './Interfaces/dbRepo.interface';

export class BrandRepository extends DataBaseRepository<TBrand> {
  constructor(@InjectModel(Brand.name) BrandModel: Model<TBrand>) {
    super(BrandModel);
  }
  async addBrand(data: Partial<TBrand>) {
    const checkBrand = await this.findOne({ filter: { name: data.name } });
    if (checkBrand)
      return errorResponse('conflict', `${data.name} already exist`);
    return this.create(data);
  }

  async updateBrand({ id, data, options }: IUpdateById<TBrand>) {
    const Brand = await this.findById({ id });

    if (!Brand)
      return errorResponse(
        'not-found',
        `Brand with "${String(id)}" id doesn't exist`,
      );

    return await this.updateOne({
      filter: { name },
      data,
      options,
    });
  }
}
