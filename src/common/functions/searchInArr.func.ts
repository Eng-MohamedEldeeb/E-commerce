import { Types } from 'mongoose';
import { compareValues } from 'src/utils/security/bcrypt/compareValue.security';

export const searchInArrOfObjId = (
  element: Types.ObjectId,
  arr: any[],
): boolean => {
  return arr.map(String).includes(element.toString());
};

export const searchInArrOfHash = (value: string, arr: string[]): boolean => {
  return arr.some((current) => compareValues({ value, hashedValue: current }));
};
