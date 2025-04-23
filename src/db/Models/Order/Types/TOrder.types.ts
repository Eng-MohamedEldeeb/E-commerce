import { Document, HydratedDocument } from 'mongoose';
import { Order } from '../Order.schema';

export type TOrder = HydratedDocument<Order> & Document;
