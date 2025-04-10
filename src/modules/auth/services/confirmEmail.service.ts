import { OTPRepository } from 'src/db/repositories/otp.repo';
import { confirmEmailDTO } from '../dto/confirmEmail.dto';
import { TotpDocument } from 'src/db/Models/Otp/Types/OTP.type';
import { crudResponse } from 'src/common/res/success.response';

export const confirmEmail = async (
  confirmEmailDTO: confirmEmailDTO,
  OTPRepository: OTPRepository,
) => {
  const otp: TotpDocument = await OTPRepository.create({
    email: confirmEmailDTO.email,
    otpType: 'confirmEmail',
  });
  return crudResponse<TotpDocument>({
    type: 'Created',
    data: otp,
    field: 'Confirmation Code',
  });
};
