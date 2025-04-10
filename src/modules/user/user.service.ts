import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/db/repositories/user.repo';
import { TokenService } from 'src/common/utils/token/token.service';
import { getProfile } from './services/getProfile.service';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { editProfile } from './services/editProfile.service';
import { Types } from 'mongoose';
import { EditProfileDTO } from './dto/EditProfile.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly UserRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  getProfile(user: TUserDocument) {
    return getProfile(user);
  }

  editProfile(id: Types.ObjectId, editProfileDTO: EditProfileDTO) {
    return editProfile(id, editProfileDTO, this.UserRepository);
  }

  deactivateAccount(/* id: Types.ObjectId */) {}

  deleteAccount(/* id: Types.ObjectId */) {}
}
