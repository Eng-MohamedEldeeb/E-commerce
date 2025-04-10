import { NextFunction } from 'express';
import { TotpDocument } from '../Types/OTP.type';
import { sendEmail } from 'src/utils/emails/sendEmail';
import * as emailSchemas from '../../../../utils/emails/schemas/email.schemas';
import { generateRS } from 'src/utils/randomString/randomString';
import { hashValue } from 'src/utils/security/bcrypt/hashValue.security';

export const otp_PreSave = function (this: TotpDocument, next: NextFunction) {
  if (this.isModified('email')) {
    const otpCode = generateRS({});
    const hashedCode = hashValue(otpCode);
    this.otpCode = hashedCode;

    sendEmail({
      emailSchema: this.otpType as keyof typeof emailSchemas,
      otpCode: otpCode,
      userEmail: this.email,
    });
  }
  return next();
};
