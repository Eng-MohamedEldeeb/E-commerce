export type TSingleReturn<T> = Promise<T | null>;
export type TMultipleReturn<T> = Promise<
  | T[]
  | []
  | {
      count: number;
      pageSize: number;
      pages: number;
      documents: T[] | [];
    }
>;
