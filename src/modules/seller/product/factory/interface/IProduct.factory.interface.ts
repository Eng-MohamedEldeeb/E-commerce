import { Types } from 'mongoose';
import { IProductFiles } from './IProductFiles.interface';
import { AddProductDTO } from '../../dto/addProduct.dto';

export interface IAddProductOptions {
  createdBy: Types.ObjectId;
  data: AddProductDTO;
  files: IProductFiles;
}
