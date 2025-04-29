import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { TErrorResponseType } from './types/errorResponse';

export const errorResponse = (
  type: TErrorResponseType,
  msg: string | Object | { msg: string; stack: string },
) => {
  switch (type) {
    case 'bad-req':
      throw new BadRequestException(msg);
    case 'conflict':
      throw new ConflictException(msg);
    case 'not-found':
      throw new NotAcceptableException(msg);
    case 'un-authorized':
      throw new UnauthorizedException(msg);
    default:
    case 'internal-error':
      throw new InternalServerErrorException(msg);
  }
};
