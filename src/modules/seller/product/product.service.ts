import { Injectable } from '@nestjs/common';
import { errorResponse } from 'src/common/res/error.response';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { IProduct } from 'src/db/Models/Product/Interface/IProduct.interface';
import { CategoryRepository } from 'src/db/repositories/category.repo';
import { ProductRepository } from 'src/db/repositories/product.repo';
import { ProductFactory } from './factory/product.factory.service';
import { IAddProductOptions } from './factory/interface/IProduct.factory.interface';
import { IUpdateProductOptions } from './factory/interface/IUpdateProductOptions.interface';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { asyncHandler } from 'src/common/decorators/handler/asyncHandler.decorator';

@Injectable()
export class ProductService {
  constructor(
    private readonly productFactory: ProductFactory,
    private readonly cloudService: CloudService,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {
    this.productFactory = new ProductFactory(this.cloudService);
  }
  getAll() {
    return asyncHandler(async () => {
      return await this.productRepository.find({
        populate: [{ path: 'categoryId' }, { path: 'createdBy' }],
      });
    });
  }
  create({ createdBy, data, files }: IAddProductOptions) {
    return asyncHandler(async () => {
      const checkCategory = await this.categoryRepository.findById({
        id: data.categoryId,
        projection: { _id: 1 },
      });

      if (!checkCategory)
        return errorResponse(
          'not-found',
          `in-valid categoryId: '${data.categoryId}'`,
        );

      const productDocument: IProduct = await this.productFactory.create({
        createdBy,
        data,
        files,
      });

      return await this.productRepository.addProduct(productDocument);
    });
  }

  update(
    user: TUserDocument,
    { productId, data, files }: IUpdateProductOptions,
  ) {
    return asyncHandler(async () => {
      const product = await this.productRepository.findById({
        id: productId,
        options: { lean: true },
      });

      if (!product)
        return errorResponse(
          'not-found',
          `product with id: ${productId} is not found`,
        );

      if (product.createdBy.toString() != user._id.toString())
        return errorResponse(
          'un-authorized',
          'You are not the owner of the requested product to proceed',
        );

      const newProduct = await this.productFactory.update(product, data, files);

      return await this.productRepository.updateById({
        id: productId,
        data: newProduct,
        options: { new: true, lean: true },
      });
    });
  }
}
