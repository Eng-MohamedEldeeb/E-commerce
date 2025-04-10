import { SignupDTO } from './dto/signup.dto';
import { Injectable } from '@nestjs/common';
import { OTPRepository } from 'src/db/repositories/otp.repo';
import { UserRepository } from 'src/db/repositories/user.repo';
import { confirmEmailDTO } from './dto/confirmEmail.dto';
import { confirmEmail } from './services/confirmEmail.service';
import { signup } from './services/signup.service';
import { LoginDTO } from './dto/login.dto';
import { login } from './services/login.service';
import { TokenService } from 'src/common/utils/token/token.service';
import { errorResponse } from 'src/common/res/error.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly OTPRepository: OTPRepository,
    private readonly tokenService: TokenService,
  ) {}

  async confirmEmail(confirmEmailDTO: confirmEmailDTO) {
    const checkUser = await this.UserRepository.findByEmail(
      confirmEmailDTO.email,
    );

    if (checkUser) return errorResponse('not-found', 'User Already Exists');

    return await confirmEmail(confirmEmailDTO, this.OTPRepository);
  }

  async signup(signupDTO: SignupDTO) {
    return await signup(signupDTO, this.UserRepository);
  }

  async login(loginDTO: LoginDTO) {
    return await login(loginDTO, this.UserRepository, this.tokenService);
  }
}
