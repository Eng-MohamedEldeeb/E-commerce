import { CloudService } from './../../common/utils/upload/service/cloud.upload.service';
import { TCategory } from 'src/db/Models/Category/Types/TCategory.types';
import { CategoryRepository } from './../../db/repositories/category.repo';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly cloudService: CloudService,
  ) {}

  create(data: Partial<TCategory>) {
    return this.categoryRepository.addCategory(data);
  }
}
