import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheableMemory } from 'cacheable';

export const caching = () => {
  return CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => ({
      stores: [
        new Keyv({
          store: new CacheableMemory({ ttl: 60000, lruSize: 5000 }),
        }),
        createKeyv(process.env.CACHING_KEY),
      ],
    }),
  });
};
