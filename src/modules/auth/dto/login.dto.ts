import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { ILogin } from '../interface/login.interface';

export class LoginDTO implements ILogin {
  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword({ minUppercase: 0 })
  password: string;
}
