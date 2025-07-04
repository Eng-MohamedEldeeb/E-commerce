import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const localMulterConfig = (): MulterOptions => ({
  storage: diskStorage({}),
});
