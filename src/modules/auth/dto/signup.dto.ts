import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
} from 'class-validator';
import { ISignup } from '../interface/signup.interface';
import { phoneRegEx } from '../../../common/validation/regex.patterns';
import { IsMatchedWith } from 'src/common/decorators/validation/isMatchedWith.decorator';

export class SignupDTO implements ISignup {
  @IsString()
  fullName: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @Matches(phoneRegEx)
  phone: string;

  @IsStrongPassword({ minUppercase: 0 })
  password: string;

  @IsMatchedWith('password')
  confirmPassword: string;

  // @IsString()
  // birthDate: Date;

  @MaxLength(4)
  otpCode: string;
}
