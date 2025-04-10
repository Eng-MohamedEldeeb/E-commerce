import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { OTPRepoService } from 'src/db/repositories/otp.repo';
import { SignupDTO } from 'src/modules/auth/dto/signup.dto';
import { compareValues } from 'src/utils/security/bcrypt/compareValue.security';
import { errorResponse } from '../res/error.response';

@Injectable()
export class IsValidOTP implements CanActivate {
  constructor(private readonly otpRepo: OTPRepoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { email, otpCode } = request.body as SignupDTO;
    const otpExistence = await this.otpRepo.findOne({
      filter: { email },
    });

    if (
      !otpExistence ||
      (otpExistence &&
        !compareValues({
          value: otpCode,
          hashedValue: otpExistence.otpCode,
        }))
    )
      return errorResponse('not-found', 'In-valid Code');

    return true;
  }
}
