import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { TUserDocument, UserRoles } from 'src/db/Models/User/Types/User.type';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { EditProfileDTO, EditProfileIdDTO } from './dto/EditProfile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth(UserRoles.user)
  getProfile(@User() user: TUserDocument) {
    return this.userService.getProfile(user);
  }

  @Patch('editProfile/:userId')
  @Auth(UserRoles.user)
  editProfile(
    @Param('userId') EditProfileIdDTO: EditProfileIdDTO,
    @Body() editProfileDTO: EditProfileDTO,
  ) {
    return this.userService.editProfile(EditProfileIdDTO.id, editProfileDTO);
  }
}
