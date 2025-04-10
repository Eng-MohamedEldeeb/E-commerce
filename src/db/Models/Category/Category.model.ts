import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './Category.schema';

export const CategoryModel = MongooseModule.forFeature([
  { name: Category.name, schema: categorySchema },
]);
