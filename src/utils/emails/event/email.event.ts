/* eslint-disable @typescript-eslint/no-misused-promises */
import { EventEmitter } from 'node:events';
import { transporter } from '../config/transporter.config';
import * as emailSchemas from '../schemas/email.schemas';
import { ISendEmailHandlerOptions } from '../types/sendEmail.types';

export const emailEvent = new EventEmitter();

emailEvent.on('send', async function (data: ISendEmailHandlerOptions) {
  try {
    const { emailSchema, otpCode, userEmail } = data;
    await transporter.sendMail(
      emailSchemas[`${emailSchema}`]({ otpCode, userEmail }),
    );
  } catch (error) {
    if (error instanceof Error)
      console.error({ msg: 'nodemailer Error', error });
  }
});
