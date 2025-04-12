import { CloudService } from './../../common/utils/upload/service/cloud.upload.service';
import { TCategory } from 'src/db/Models/Category/Types/TCategory.types';
import { CategoryRepository } from './../../db/repositories/category.repo';
import { Injectable } from '@nestjs/common';
import { CategoryQueryDTO } from './dto/getCategory.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly cloudService: CloudService,
  ) {}

  find(query: CategoryQueryDTO) {
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
    return this.categoryRepository.find({
      filter,
      projection: query.select,
      sort: query.sort,
      page: query.page,
    });
  }

  create(data: Partial<TCategory>) {
    return this.categoryRepository.addCategory(data);
  }
}
