import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { TUserDocument, UserRoles } from 'src/db/Models/User/Types/User.type';
import { AddProductDTO, IProductFiles } from './dto/addProduct.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { localMulterConfig } from 'src/common/utils/upload/config/local.upload.config';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { ProductService } from './product.service';

@Controller('dashboard/product')
@Auth(UserRoles.seller)
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 5 },
        { name: 'gallery', maxCount: 5 },
      ],
      localMulterConfig(),
    ),
  )
  create(
    @User() user: TUserDocument,
    @Body() addProductDTO: AddProductDTO,
    @UploadedFiles() files: IProductFiles,
  ) {
    return this.productService.create({
      createdBy: user._id,
      data: addProductDTO,
      files,
    });
  }

  @Delete()
  delete() {}
}
