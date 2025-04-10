import { Document, HydratedDocument } from 'mongoose';
import { OTP } from '../OTP.schema';

export type TotpDocument = HydratedDocument<OTP> & Document;
