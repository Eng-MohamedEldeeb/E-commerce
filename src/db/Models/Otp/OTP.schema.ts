import { IOtp } from './Interface/IOtp.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { otp_PreSave } from './Hooks/preSave.hook';

@Schema({ timestamps: true })
export class OTP implements IOtp {
  @Prop({ required: true })
  email: string;

  @Prop()
  otpCode: string;

  @Prop({ type: String })
  otpType: string;
}

export const otpSchema = SchemaFactory.createForClass(OTP);

otpSchema.index({ email: 1 }, { expires: '10m' });

otpSchema.pre('save', otp_PreSave);
