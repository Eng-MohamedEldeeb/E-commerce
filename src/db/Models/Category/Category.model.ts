import { MongooseModule } from '@nestjs/mongoose';
import { Category, categorySchema } from './Category.schema';
import slugify from 'slugify';

export const CategoryModel = MongooseModule.forFeatureAsync([
  {
    name: Category.name,
    useFactory() {
      categorySchema.pre('updateOne', function (next) {
        const updatedFields = this.getUpdate();

        if (updatedFields?.['name']) {
          updatedFields['slug'] = slugify(updatedFields['name'], {
            trim: true,
          });
          this.setUpdate(updatedFields);
        }

        return next();
      });
      return categorySchema;
    },
  },
]);
