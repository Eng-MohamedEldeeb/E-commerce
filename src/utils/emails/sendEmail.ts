import { emailEvent } from './event/email.event';
import { ISendEmailHandlerOptions } from './types/sendEmail.types';

export const sendEmail = ({
  emailSchema,
  otpCode,
  userEmail,
  userName,
}: ISendEmailHandlerOptions) => {
  emailEvent.emit('send', {
    emailSchema,
    otpCode,
    userEmail,
    userName,
  });
};
