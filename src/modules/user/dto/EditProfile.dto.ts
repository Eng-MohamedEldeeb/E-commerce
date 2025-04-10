import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { TUserDocument } from 'src/db/Models/User/Types/User.type';

export class EditProfileDTO implements Partial<TUserDocument> {
  fullName?: string | undefined;
  username?: string | undefined;
  bio?: string | undefined;
}

export class EditProfileIdDTO {
  @IsMongoId()
  id: Types.ObjectId;
}
