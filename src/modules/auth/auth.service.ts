import { SignupDTO } from './dto/signup.dto';
import { Injectable } from '@nestjs/common';
import { OTPRepoService } from 'src/db/repositories/otp.repo';
import { UserRepoService } from 'src/db/repositories/user.repo';
import { confirmEmailDTO } from './dto/confirmEmail.dto';
import { confirmEmail } from './services/confirmEmail.service';
import { signup } from './services/signup.service';
import { LoginDTO } from './dto/login.dto';
import { login } from './services/login.service';
import { TokenService } from 'src/utils/token/token.service';
import { errorResponse } from 'src/common/res/error.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserRepoService: UserRepoService,
    private readonly OTPRepoService: OTPRepoService,
    private readonly tokenService: TokenService,
  ) {}

  async confirmEmail(confirmEmailDTO: confirmEmailDTO) {
    const checkUser = await this.UserRepoService.findByEmail(
      confirmEmailDTO.email,
    );

    if (checkUser) return errorResponse('not-found', 'User Already Exists');

    return await confirmEmail(confirmEmailDTO, this.OTPRepoService);
  }

  async signup(signupDTO: SignupDTO) {
    return await signup(signupDTO, this.UserRepoService);
  }

  async login(loginDTO: LoginDTO) {
    return await login(loginDTO, this.UserRepoService, this.tokenService);
  }
}
