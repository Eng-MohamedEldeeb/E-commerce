import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductModel } from 'src/db/Models/Product/Product.model';
import { categoryModel } from 'src/db/Models/Category/Category.model';
import { ProductService } from './product.service';
import { ProductFactory } from './factory/product.factory.service';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { ProductResolver } from 'src/modules/graphql/resolvers/seller/product/product.resolver';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { CategoryRepository } from 'src/db/repositories/category.repo';

@Module({
  controllers: [ProductController],
  imports: [ProductModel, categoryModel],
  providers: [
    ProductService,
    ProductFactory,
    ProductRepository,
    ProductResolver,
    CloudService,
    CategoryRepository,
  ],
})
export class ProductModule {}
