import * as Crypto from 'crypto-js';

export const encryptValue = (value: string): string => {
  return Crypto.AES.encrypt(value, process.env.CRYPTO_KEY as string).toString();
};
