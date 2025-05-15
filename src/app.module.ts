import { Module } from '@nestjs/common';
import { envConfig } from 'config/envConfig';
import { throttler } from './common/utils/security/throttler.security';
import { connectDB } from './db/dbConnection';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SellerModule } from './modules/seller/seller.module';
import { graphQL } from './modules/graphql/graphql';
import { caching } from './common/cache/caching.service';

@Module({
  imports: [
    envConfig(),
    throttler(),
    connectDB(),
    caching(),
    AuthModule,
    UserModule,
    DashboardModule,
    SellerModule,
    graphQL(),
  ],
})
export class AppModule {}
