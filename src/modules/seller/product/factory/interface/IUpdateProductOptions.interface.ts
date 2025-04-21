import { Types } from 'mongoose';
import { IProductFiles } from './IProductFiles.interface';
import { UpdateProductDTO } from '../../dto/updateProduct.dto';

export interface IUpdateProductOptions {
  productId: Types.ObjectId;
  data: UpdateProductDTO;
  files: IProductFiles;
}
