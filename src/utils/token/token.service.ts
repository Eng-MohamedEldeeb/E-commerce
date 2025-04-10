import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import {
  IJwtPayload,
  ITokens,
  ISignature,
  BearerTypes,
  TokenTypes,
} from './types/token.types';
import { UserRoles } from 'src/db/Models/User/Types/User.type';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  getSignatures(role: UserRoles): ISignature {
    switch (role) {
      case UserRoles.user:
        return {
          accessSignature: process.env.ACCESS_USER_SECRET as string,
          refreshSignature: process.env.REFRESH_USER_SECRET as string,
        };

      case UserRoles.admin:
        return {
          accessSignature: process.env.ACCESS_ADMIN_SECRET as string,
          refreshSignature: process.env.REFRESH_ADMIN_SECRET as string,
        };
      default:
        return {
          accessSignature: process.env.ACCESS_USER_SECRET as string,
          refreshSignature: process.env.REFRESH_USER_SECRET as string,
        };
    }
  }

  generateTokens({
    payload,
    role,
  }: {
    payload: IJwtPayload;
    role: UserRoles;
    options?: JwtSignOptions;
  }): ITokens {
    const { accessSignature, refreshSignature } = this.getSignatures(role);
    const accessToken = this.jwtService.sign(payload, {
      secret: accessSignature,
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshSignature,
      expiresIn: '1w',
    });
    return { accessToken, refreshToken };
  }

  verifyToken({
    token,
    tokenType = TokenTypes.access,
    bearer,
  }: {
    token: string;
    tokenType: TokenTypes;
    bearer: string;
  }): IJwtPayload {
    try {
      const { accessSignature, refreshSignature } = this.getSignatures(
        (bearer as keyof typeof BearerTypes) == BearerTypes.bearer
          ? UserRoles.user
          : UserRoles.admin,
      );
      return this.jwtService.verify(token, {
        secret:
          tokenType === TokenTypes.access ? accessSignature : refreshSignature,
      });
    } catch (error) {
      if (error instanceof Error) throw new BadRequestException(error.message);
      throw new BadRequestException(error);
    }
  }
}
