import { Module } from '@nestjs/common';
import { envConfig } from 'config/envConfig';
import { connectDB } from './db/dbConnection';
import { throttler } from './common/security/throttler.security';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    envConfig(),
    connectDB(),
    throttler(),
    AuthModule,
    UserModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
