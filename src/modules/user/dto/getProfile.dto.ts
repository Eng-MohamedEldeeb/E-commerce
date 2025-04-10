import { IsString } from 'class-validator';

export class GetProfileDto {
  @IsString()
  token: string;
}
