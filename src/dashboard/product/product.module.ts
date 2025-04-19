import { Module } from '@nestjs/common';
import { productDependencies } from './product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  imports: productDependencies.imports,
  providers: productDependencies.providers,
})
export class ProductModule {}
