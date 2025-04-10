import { UserRepoService } from 'src/db/repositories/user.repo';
import { EditProfileDTO } from '../dto/EditProfile.dto';
import { Types } from 'mongoose';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { crudResponse } from 'src/common/res/success.response';

export const editProfile = async (
  id: Types.ObjectId,
  data: EditProfileDTO,
  userRepoService: UserRepoService,
) => {
  const updatedUser = await userRepoService.updateById({
    id,
    data,
    options: { projection: Object.keys(data).join(' ') },
  });

  return crudResponse<TUserDocument>({
    type: 'Updated',
    field: 'User',
    data: updatedUser,
  });
};
