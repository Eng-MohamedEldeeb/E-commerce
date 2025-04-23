import { Module } from '@nestjs/common';
import { CategoryRepository } from 'src/db/repositories/category.repo';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel } from 'src/db/Models/Category/Category.model';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';

@Module({
  imports: [CategoryModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CloudService],
})
export class CategoryModule {}
