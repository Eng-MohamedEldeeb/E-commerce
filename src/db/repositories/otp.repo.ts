import { Injectable } from '@nestjs/common';
import { DataBaseRepository } from './db.repo';
import { TotpDocument } from '../Models/Otp/Types/OTP.type';
import { InjectModel } from '@nestjs/mongoose';
import { OTP } from '../Models/Otp/OTP.schema';
import { Model } from 'mongoose';

@Injectable()
export class OTPRepository extends DataBaseRepository<TotpDocument> {
  constructor(
    @InjectModel(OTP.name) private readonly otpModel: Model<TotpDocument>,
  ) {
    super(otpModel);
  }
}
