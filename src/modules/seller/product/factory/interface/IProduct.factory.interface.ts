import { Types } from 'mongoose';
import { AddProductDTO } from 'src/dashboard/product/dto/addProduct.dto';
import { IProductFiles } from './IProductFiles.interface';

export interface IAddProductOptions {
  createdBy: Types.ObjectId;
  data: AddProductDTO;
  files: IProductFiles;
}
