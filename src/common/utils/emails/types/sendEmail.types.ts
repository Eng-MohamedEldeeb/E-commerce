import * as emailSchemas from '../schemas/email.schemas';

export interface IConfirmEmailOptions {
  userEmail: string;
  otpCode?: string;
}

export interface ISendEmailHandlerOptions extends IConfirmEmailOptions {
  emailSchema: keyof typeof emailSchemas;
  userName?: string;
}
