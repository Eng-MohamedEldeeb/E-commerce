import { InjectModel } from '@nestjs/mongoose';
import { TProduct } from '../Models/Product/Types/TProduct.types';
import { DataBaseRepository } from './db.repo';
import { Product } from '../Models/Product/Product.schema';
import { Model } from 'mongoose';
import { errorResponse } from 'src/common/res/error.response';
import { IUpdateById } from './Interfaces/dbRepo.interface';

export class ProductRepository extends DataBaseRepository<TProduct> {
  constructor(@InjectModel(Product.name) productModel: Model<TProduct>) {
    super(productModel);
  }
  async addProduct(data: Partial<TProduct>) {
    const checkProduct = await this.findOne({ filter: { name: data.name } });
    if (checkProduct)
      return errorResponse('conflict', `${data.name} already exist`);
    return this.create(data);
  }

  async updateProduct({ id, data, options }: IUpdateById<TProduct>) {
    const Product = await this.findById({ id });

    if (!Product)
      return errorResponse(
        'not-found',
        `Product with "${String(id)}" id doesn't exist`,
      );

    return await this.updateOne({
      filter: { name },
      data,
      options,
    });
  }
}
