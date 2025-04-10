import { ThrottlerModule } from '@nestjs/throttler';

export const throttler = () => {
  return ThrottlerModule.forRoot({
    throttlers: [
      {
        ttl: 30000,
        limit: 5,
        blockDuration: 1500,
      },
    ],
  });
};
