import { Document, HydratedDocument } from 'mongoose';
import { Category } from '../Category.schema';

export type TCategory = HydratedDocument<Category> & Document;
