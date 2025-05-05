import { MongooseModule } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Brand, brandSchema } from './Brand.schema';

export const brandModel = MongooseModule.forFeatureAsync([
  {
    name: Brand.name,
    useFactory() {
      brandSchema.pre('updateOne', function (next) {
        const updatedFields = this.getUpdate();

        if (updatedFields?.['name']) {
          updatedFields['slug'] = slugify(updatedFields['name'], {
            trim: true,
          });
          this.setUpdate(updatedFields);
        }

        return next();
      });
      return brandSchema;
    },
  },
]);
