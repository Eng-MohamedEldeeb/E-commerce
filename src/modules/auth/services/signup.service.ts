import { UserRepoService } from 'src/db/repositories/user.repo';
import { SignupDTO } from '../dto/signup.dto';
import { crudResponse } from 'src/common/res/success.response';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export const signup = async (
  signupDTO: SignupDTO,
  userRepoService: UserRepoService,
) => {
  const data = await userRepoService.createUser(signupDTO);

  return crudResponse<TUserDocument>({ field: 'User', type: 'Created', data });
};
