import { JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';

export enum BearerTypes {
  bearer = 'bearer',
  system = 'system',
}
export enum TokenTypes {
  access = 'access',
  refresh = 'refresh',
}
export interface IJwtPayload extends JwtPayload {
  id: Types.ObjectId;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ISignature {
  accessSignature: string;
  refreshSignature: string;
}
