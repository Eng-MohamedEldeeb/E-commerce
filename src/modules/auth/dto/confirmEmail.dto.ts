import { IsEmail } from 'class-validator';
import { IConfirmEmail } from '../interface/confirmEmail.interface';

export class confirmEmailDTO implements IConfirmEmail {
  @IsEmail()
  email: string;
}
