import * as Crypto from 'crypto-js';

export const decryptValue = (encryptedValue: string): string => {
  return Crypto.AES.decrypt(
    encryptedValue,
    process.env.CRYPTO_KEY as string,
  ).toString(Crypto.enc.Utf8);
};
