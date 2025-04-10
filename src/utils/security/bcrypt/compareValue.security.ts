import { compareSync } from 'bcrypt';

export const compareValues = ({
  value,
  hashedValue,
}: {
  value: string;
  hashedValue: string;
}): boolean => {
  if (!value) throw new Error('Bcrypt Error: value is needed');
  if (!hashedValue) throw new Error('Bcrypt Error: hashedValue is needed');
  return compareSync(value, hashedValue);
};
