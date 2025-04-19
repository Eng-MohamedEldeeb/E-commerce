import { Injectable, ModuleMetadata } from '@nestjs/common';
import { errorResponse } from 'src/common/res/error.response';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { CategoryModel } from 'src/db/Models/Category/Category.model';
import { IProduct } from 'src/db/Models/Product/Interface/IProduct.interface';
import { ProductModel } from 'src/db/Models/Product/Product.model';
import { CategoryRepository } from 'src/db/repositories/category.repo';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { ProductFactory } from './factory/product.factory.service';
import { IAddProductOptions } from './factory/interface/IProduct.factory.interface';

@Injectable()
export class ProductService {
  constructor(
    private readonly cloudService: CloudService,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create({ createdBy, data, files }: IAddProductOptions) {
    const checkCategory = await this.categoryRepository.findById({
      id: data.categoryId,
      projection: { _id: 1 },
    });

    if (!checkCategory)
      return errorResponse(
        'not-found',
        `in-valid categoryId: '${data.categoryId}'`,
      );

    const productDocument: IProduct = await ProductFactory.create({
      createdBy,
      data,
      files,
      cloudService: this.cloudService,
    });

    const product = await this.productRepository.addProduct(productDocument);
    return product;
  }

  delete() {}
}

export const productDependencies: Partial<ModuleMetadata> = {
  imports: [ProductModel, CategoryModel],
  providers: [
    ProductService,
    CloudService,
    ProductRepository,
    CategoryRepository,
  ],
};
