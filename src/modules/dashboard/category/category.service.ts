import { TCategory } from 'src/db/Models/Category/Types/TCategory.types';
import { CategoryRepository } from '../../../db/repositories/category.repo';
import { Injectable } from '@nestjs/common';
import { CategoryQueryDTO } from './dto/getCategory.dto';
import { FilterQuery, Types } from 'mongoose';
import { IsMongoIdDTO } from 'src/common/DTO/mongoId.dto';
import { UpdateCategoryDTO } from './dto/updateCategory.dto';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  find(query?: CategoryQueryDTO) {
    return asyncHandler(async () => {
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
        projection: query?.select,
        sort: query?.sort,
        page: query?.page,
        populate: [{
          path: 'createdBy'
        }]
      });
    });
  }

  create(user: Types.ObjectId, data: Partial<TCategory>) {
    return asyncHandler(async () => {
      const category = await this.categoryRepository.create({
        ...data,
        createdBy: user,
      });
      return {
        category,
      };
    });
  }

  update({ id }: IsMongoIdDTO, data: UpdateCategoryDTO) {
    return asyncHandler(async () => {
      return await this.categoryRepository.updateById({
        id,
        data,
        options: { lean: true, new: true },
      });
    });
  }
}
