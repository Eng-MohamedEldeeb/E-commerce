import { UserRepository } from 'src/db/repositories/user.repo';
import { SignupDTO } from '../dto/signup.dto';
import { crudResponse } from 'src/common/res/success.response';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export const signup = async (
  signupDTO: SignupDTO,
  UserRepository: UserRepository,
) => {
  const data = await UserRepository.createUser(signupDTO);

  return crudResponse<TUserDocument>({ field: 'User', type: 'Created', data });
};
