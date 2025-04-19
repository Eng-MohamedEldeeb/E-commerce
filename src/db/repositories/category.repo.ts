import { InjectModel } from '@nestjs/mongoose';
import { TCategory } from '../Models/Category/Types/TCategory.types';
import { DataBaseRepository } from './db.repo';
import { Category } from '../Models/Category/Category.schema';
import { Model } from 'mongoose';
import { errorResponse } from 'src/common/res/error.response';
import { IUpdateById } from './Interfaces/dbRepo.interface';

export class CategoryRepository extends DataBaseRepository<TCategory> {
  constructor(@InjectModel(Category.name) categoryModel: Model<TCategory>) {
    super(categoryModel);
  }
  async addCategory(data: Partial<TCategory>) {
    const checkCategory = await this.findOne({ filter: { name: data.name } });
    if (checkCategory)
      return errorResponse('conflict', `${data.name} already exist`);
    return this.create(data);
  }

  async updateCategory({ id, data, options }: IUpdateById<TCategory>) {
    const category = await this.findById({ id });

    if (!category)
      return errorResponse(
        'not-found',
        `category with "${String(id)}" id doesn't exist`,
      );

    return await this.updateOne({
      filter: { name },
      data,
      options,
    });
  }
}
