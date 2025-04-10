import { HydratedDocument } from 'mongoose';
import { OTP } from '../Schema/OTP.schema';

export type TotpDocument = HydratedDocument<OTP>;
