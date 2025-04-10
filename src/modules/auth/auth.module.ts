import { Module } from '@nestjs/common';
import { UserModel } from 'src/db/Models/User/User.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepoService } from 'src/db/repositories/user.repo';
import { OTPRepoService } from 'src/db/repositories/otp.repo';
import { OTPModel } from 'src/db/Models/Otp/OTP.model';
import { TokenService } from 'src/utils/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModel, OTPModel],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepoService,
    OTPRepoService,
    TokenService,
    JwtService,
  ],
})
export class AuthModule {}
