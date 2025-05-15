import { Module } from '@nestjs/common';
import { CategoryRepository } from 'src/db/repositories/category.repo';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { categoryModel } from 'src/db/Models/Category/Category.model';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { CategoryResolver } from 'src/modules/graphql/resolvers/dashboard/category/category.resolver';

@Module({
  imports: [categoryModel],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    CloudService,
    CategoryResolver,
  ],
})
export class CategoryModule {}
