import {
  CanActivate,
  ContextType,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/db/repositories/user.repo';
import { TokenService } from 'src/common/services/token/token.service';
import { IAuthenticationReq } from '../interfaces/ICustomRequest.interface';
import { TokenTypes } from 'src/common/services/token/types/token.types';
import { errorResponse } from '../res/error.response';
import { GqlExecutionContext } from '@nestjs/graphql';
export type GraphContextType = 'graphql' | ContextType;

@Injectable()
export class IsAuthenticated implements CanActivate {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let authorization: string | undefined;

    switch (context.getType<GraphContextType>()) {
      case 'http':
        authorization = context.switchToHttp().getRequest<Request>()
          .headers.authorization;
        break;

      case 'graphql':
        authorization =
          GqlExecutionContext.create(context).getContext().req.headers
            .authorization;
        break;
    }

    if (!authorization) return errorResponse('un-authorized', 'Missing Token');

    const [bearer, token] = authorization.split(' ');

    if (!bearer || !token)
      return errorResponse('bad-req', 'Missing Bearer Token');

    const tokenData = this.tokenService.verifyToken({
      token,
      tokenType: TokenTypes.access,
      bearer: bearer.toLowerCase(),
    });

    const user = await this.UserRepository.findById({
      id: tokenData.id,
      projection: { password: 0 },
      options: { lean: true },
    });

    if (!user) return errorResponse('not-found', "User Doesn't Exist");

    if (context.getType<GraphContextType>() == 'http')
      context.switchToHttp().getRequest<IAuthenticationReq>().user = user;

    if (context.getType<GraphContextType>() == 'graphql')
      GqlExecutionContext.create(context).getContext().req.user = user;

    return true;
  }
}
