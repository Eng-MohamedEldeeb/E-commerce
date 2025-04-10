import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from 'src/db/Models/User/User.model';
import { UserRepoService } from 'src/db/repositories/user.repo';
import { TokenService } from 'src/utils/token/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserModel],
  controllers: [UserController],
  providers: [UserService, UserRepoService, TokenService, JwtService],
})
export class UserModule {}
