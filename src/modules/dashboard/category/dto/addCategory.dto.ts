import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { IFile } from 'src/common/utils/upload/interface/file.interface';

export class AddCategoryDTO {
  @IsObject({ message: 'Missing Image' })
  image: IFile;

  @IsString()
  @IsNotEmpty()
  name: string;
}
