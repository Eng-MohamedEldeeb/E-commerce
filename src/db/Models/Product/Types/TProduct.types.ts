import { Document, HydratedDocument } from 'mongoose';
import { Product } from '../Product.schema';

export type TProduct = HydratedDocument<Product> & Document;
