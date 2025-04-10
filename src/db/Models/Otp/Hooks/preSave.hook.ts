import { NextFunction } from 'express';
import { TotpDocument } from '../Types/OTP.type';
import { sendEmail } from 'src/common/utils/emails/sendEmail';
import * as emailSchemas from '../../../../common/utils/emails/schemas/email.schemas';
import { generateRS } from 'src/common/utils/randomString/randomString';
import { hashValue } from 'src/common/utils/security/bcrypt/hashValue.security';

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
