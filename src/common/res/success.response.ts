import {
  ICRUDResponse,
  ISuccessResponseOptions,
  ISuccessResponseReturn,
} from './types/successResponse.types';

export const successResponses = <T>({
  data,
  msg,
}: ISuccessResponseOptions<T>): ISuccessResponseReturn<T> => {
  return { success: true, msg, data };
};

export const crudResponse = <T>({ field, data, type }: ICRUDResponse<T>) => {
  return successResponses<T>(
    type === 'Get' ? { data } : { data, msg: `${field} ${type} Successfully` },
  );
};
