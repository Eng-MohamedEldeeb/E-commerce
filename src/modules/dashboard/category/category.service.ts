import { TCategory } from 'src/db/Models/Category/Types/TCategory.types';
import { CategoryRepository } from '../../../db/repositories/category.repo';
import { Injectable } from '@nestjs/common';
import { CategoryQueryDTO } from './dto/getCategory.dto';
import { FilterQuery } from 'mongoose';
import { IsMongoIdDTO } from 'src/common/DTO/mongoId.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async find(query: CategoryQueryDTO) {
    let filter: FilterQuery<TCategory> = {};

    if (query?.name) {
      filter = {
        $or: [
          {
            name: {
              $regex: query.name,
              $options: 'i',
            },
          },
          {
            slug: {
              $regex: query.name,
              $options: 'i',
            },
          },
        ],
      };
    }
    return await this.categoryRepository.find({
      filter,
      projection: query.select,
      sort: query.sort,
      page: query.page,
    });
  }

  async create(data: Partial<TCategory>) {
    return await this.categoryRepository.addCategory(data);
  }

  async update({ id }: IsMongoIdDTO, data: UpdateCategoryDTO) {
    return await this.categoryRepository.updateById({
      id,
      data,
      options: { lean: true, new: true },
    });
  }
}
