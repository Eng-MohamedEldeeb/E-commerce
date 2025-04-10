import { InternalServerErrorException } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

export const connectDB = () => {
  try {
    return MongooseModule.forRoot(process.env.DB_URI as string, {
      onConnectionCreate() {
        console.log('DB Connected Successfully');
      },
    });
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
};
