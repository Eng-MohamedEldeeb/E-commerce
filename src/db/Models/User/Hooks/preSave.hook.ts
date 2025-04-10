import { NextFunction } from 'express';
import { TUserDocument } from '../Types/User.type';
import { hashValue } from 'src/utils/security/bcrypt/hashValue.security';
import { encryptValue } from 'src/utils/security/crypto/encrypt.security';

export const user_PreSave = function (this: TUserDocument, next: NextFunction) {
  if (this.isModified('password')) {
    const hashedPassword = hashValue(this.password);
    this.password = hashedPassword;
  }
  if (this.isModified('phone')) {
    /* Crypto */
    const encryptedPhone = encryptValue(this.phone);
    this.phone = encryptedPhone;
  }

  return next();
};
