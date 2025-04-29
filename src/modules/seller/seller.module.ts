import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [ProductModule, CouponModule],
})
export class SellerModule {}
