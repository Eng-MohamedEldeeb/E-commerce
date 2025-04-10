import { generate, GenerateOptions } from 'randomstring';
export const generateRS = ({
  length = 4,
  charset = 'numeric',
}: GenerateOptions): string => {
  return generate({ length, charset });
};
