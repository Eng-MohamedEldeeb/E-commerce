import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { confirmEmailDTO } from './dto/confirmEmail.dto';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { IsValidOTP } from 'src/common/guards/IsValidOTP.guard';
import { LoginDTO } from './dto/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('confirm-email')
  @HttpCode(200)
  confirmEmail(@Body() confirmEmailDTO: confirmEmailDTO) {
    return this.authService.confirmEmail(confirmEmailDTO);
  }

  @UseGuards(IsValidOTP)
  @Post('signup')
  signup(@Body() signupDTO: SignupDTO) {
    return this.authService.signup(signupDTO);
  }

  @Post('login')
  @HttpCode(200)
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
