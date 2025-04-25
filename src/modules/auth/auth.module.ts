import { Global, Module } from '@nestjs/common';
import { UserModel } from 'src/db/Models/User/User.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/db/repositories/user.repo';
import { OTPRepository } from 'src/db/repositories/otp.repo';
import { OTPModel } from 'src/db/Models/Otp/OTP.model';
import { TokenService } from 'src/common/services/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [UserModel, OTPModel],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    OTPRepository,
    TokenService,
    JwtService,
  ],
  exports: [
    AuthService,
    UserRepository,
    OTPRepository,
    TokenService,
    JwtService,
  ],
})
export class AuthModule {}
