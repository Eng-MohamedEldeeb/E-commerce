import { Injectable } from '@nestjs/common';
import { DataBaseService } from './db.repo';
import { TotpDocument } from '../Models/Otp/Types/OTP.type';
import { InjectModel } from '@nestjs/mongoose';
import { OTP } from '../Models/Otp/Schema/OTP.schema';
import { Model } from 'mongoose';

@Injectable()
export class OTPRepoService extends DataBaseService<TotpDocument> {
  constructor(
    @InjectModel(OTP.name) private readonly otpModel: Model<TotpDocument>,
  ) {
    super(otpModel);
  }
}
