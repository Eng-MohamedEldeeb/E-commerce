import { TUserDocument } from 'src/db/Models/User/Types/User.type';
import { decryptValue } from '../../../common/utils/security/crypto/decrypt.Security';
import { crudResponse } from 'src/common/res/success.response';

export const getProfile = (user: TUserDocument) => {
  return crudResponse<TUserDocument>({
    type: 'Get',
    data: { ...user, phone: decryptValue(user.phone) } as TUserDocument,
  });
};
