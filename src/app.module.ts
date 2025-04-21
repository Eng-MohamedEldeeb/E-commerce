import { Module } from '@nestjs/common';
import { envConfig } from 'config/envConfig';
import { connectDB } from './db/dbConnection';
import { throttler } from './common/utils/security/throttler.security';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SellerModule } from './modules/seller/seller.module';

@Module({
  imports: [
    envConfig(),
    connectDB(),
    throttler(),
    AuthModule,
    UserModule,
    DashboardModule,
    SellerModule,
  ],
})
export class AppModule {}
