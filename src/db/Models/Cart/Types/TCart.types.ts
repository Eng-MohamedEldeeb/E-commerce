import { Document, HydratedDocument } from 'mongoose';
import { Cart } from '../Cart.schema';

export type TCart = HydratedDocument<Cart> & Document;
