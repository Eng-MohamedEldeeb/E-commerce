import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { CategoryRepository } from 'src/db/repositories/category.repo';
import { CategoryModel } from 'src/db/Models/Category/Category.model';

@Module({
  imports: [CategoryModel],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CloudService],
})
export class CategoryModule {}
