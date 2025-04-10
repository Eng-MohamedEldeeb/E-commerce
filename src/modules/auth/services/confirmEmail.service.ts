import { OTPRepoService } from 'src/db/repositories/otp.repo';
import { confirmEmailDTO } from '../dto/confirmEmail.dto';
import { TotpDocument } from 'src/db/Models/Otp/Types/OTP.type';
import { crudResponse } from 'src/common/res/success.response';

export const confirmEmail = async (
  confirmEmailDTO: confirmEmailDTO,
  OTPRepoService: OTPRepoService,
) => {
  const otp: TotpDocument = await OTPRepoService.create({
    email: confirmEmailDTO.email,
    otpType: 'confirmEmail',
  });
  return crudResponse<TotpDocument>({
    type: 'Created',
    data: otp,
    field: 'Confirmation Code',
  });
};
