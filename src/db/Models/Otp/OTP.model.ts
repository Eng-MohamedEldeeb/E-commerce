import { MongooseModule } from '@nestjs/mongoose';
import { OTP, otpSchema } from './OTP.schema';

export const OTPModel = MongooseModule.forFeature([
  { name: OTP.name, schema: otpSchema },
]);
