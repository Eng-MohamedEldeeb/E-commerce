import { IsMongoId, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IBrandInputs } from 'src/db/Models/Brand/Interface/IBrand.interface';

export class AddBrandDTO implements IBrandInputs {
  @IsObject({ message: 'Missing Image' })
  image: IFile;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  @IsNotEmpty()
  relatedCategory: Types.ObjectId;
}
