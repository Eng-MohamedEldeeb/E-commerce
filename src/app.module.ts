import { Module } from '@nestjs/common';
import { envConfig } from 'config/envConfig';
import { connectDB } from './db/dbConnection';
import { throttler } from './common/utils/security/throttler.security';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    envConfig(),
    connectDB(),
    throttler(),
    AuthModule,
    UserModule,
    DashboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
