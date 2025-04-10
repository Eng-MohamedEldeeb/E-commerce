import { UserRepository } from 'src/db/repositories/user.repo';
import { LoginDTO } from '../dto/login.dto';
import { compareValues } from 'src/common/utils/security/bcrypt/compareValue.security';
import { BadRequestException } from '@nestjs/common';
import { TokenService } from 'src/common/utils/token/token.service';
import { ITokens } from 'src/common/utils/token/types/token.types';
import { crudResponse } from 'src/common/res/success.response';

export const login = async (
  loginDTO: LoginDTO,
  UserRepository: UserRepository,
  tokenService: TokenService,
) => {
  const { email, password } = loginDTO;
  const user = await UserRepository.findOne({
    filter: { email },
    projection: {
      password: 1,
    },
  });

  if (
    !user ||
    (user && !compareValues({ value: password, hashedValue: user.password }))
  )
    throw new BadRequestException('in-valid email or password');

  const tokens: ITokens = tokenService.generateTokens({
    payload: { id: user._id },
    role: user.role,
  });

  return crudResponse<ITokens>({ type: 'Get', data: tokens });
};
