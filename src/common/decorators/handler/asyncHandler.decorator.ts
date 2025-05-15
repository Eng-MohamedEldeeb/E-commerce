import { errorResponse } from 'src/common/res/error.response';

export const asyncHandler = async (fn: Function) => {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof Error)
      return errorResponse('internal-error', {
        msg: error,
        stack: error.stack,
      });
    return errorResponse('internal-error', error);
  }
};
