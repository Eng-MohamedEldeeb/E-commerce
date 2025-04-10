import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './Schema/User.schema';

export const UserModel = MongooseModule.forFeature([
  { name: User.name, schema: userSchema },
]);
