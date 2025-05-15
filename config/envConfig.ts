import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';

export const envConfig = () => {
  return ConfigModule.forRoot({
    envFilePath: resolve('./Config/.env.dev'),
    isGlobal: true,
  });
};
