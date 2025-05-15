import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from 'src/modules/seller/product/product.service';
import { OneProductResponse } from './types/res/oneProductResponse.type';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [OneProductResponse], { name: 'getAllProducts' })
  getProducts() {
    return this.productService.getAll();
  }
}
