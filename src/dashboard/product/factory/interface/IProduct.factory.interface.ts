import { Types } from 'mongoose';
import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import {
  AddProductDTO,
  IProductFiles,
} from 'src/dashboard/product/dto/addProduct.dto';

export interface IAddProductOptions {
  createdBy: Types.ObjectId;
  data: AddProductDTO;
  files: IProductFiles;
}

export interface IProductFactoryOptions extends IAddProductOptions {
  cloudService: CloudService;
}
