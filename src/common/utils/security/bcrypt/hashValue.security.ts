import { hashSync } from 'bcrypt';

export const hashValue = (value: string): string => {
  return hashSync(value, parseInt(process.env.SALT_ROUNDS as string));
};
