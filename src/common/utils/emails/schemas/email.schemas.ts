import { SendMailOptions } from 'nodemailer';
import { IConfirmEmailOptions } from '../types/sendEmail.types';

export const confirmEmail = ({
  userEmail,
  otpCode,
}: IConfirmEmailOptions): SendMailOptions => {
  return {
    from: `'SocialApp' <${process.env.USER}>`,
    to: userEmail,
    subject: 'Email Confirmation',
    text: `Hallo to confirm your email use the confirmation code ${otpCode}`,
  };
};

export const verifyEmail = ({
  userEmail,
  otpCode,
}: IConfirmEmailOptions): SendMailOptions => {
  return {
    from: `'SocialApp' <${process.env.USER}>`,
    to: userEmail,
    subject: 'Email Confirmation',
    text: `Hallo to confirm your email use the confirmation code ${otpCode}`,
  };
};
