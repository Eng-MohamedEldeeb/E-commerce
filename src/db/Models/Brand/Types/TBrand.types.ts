import { Document, HydratedDocument } from 'mongoose';
import { Brand } from '../Brand.schema';

export type TBrand = HydratedDocument<Brand> & Document;
