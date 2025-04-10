export interface ISuccessResponseOptions<T> {
  msg?: string;
  data?: T | null;
}

export interface ISuccessResponseReturn<T> extends ISuccessResponseOptions<T> {
  success: boolean;
}

export interface ICRUDResponse<T> {
  type: 'Created' | 'Updated' | 'Deleted' | 'Get';
  field?: string;
  data?: T | null;
}
