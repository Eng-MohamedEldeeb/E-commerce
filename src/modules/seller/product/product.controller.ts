import {
  Body,
  Controller,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/common/decorators/user/userParam.decorator';
import { TUserDocument, UserRoles } from 'src/db/Models/User/Types/User.type';
import { AddProductDTO } from './dto/addProduct.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { localMulterConfig } from 'src/common/utils/upload/config/local.upload.config';
import { Auth } from 'src/common/decorators/auth/auth.decorator';
import { ProductService } from './product.service';
import { IProductFiles } from './factory/interface/IProductFiles.interface';
import { ProductIdDTO, UpdateProductDTO } from './dto/updateProduct.dto';

@Auth(UserRoles.seller)
@Controller('dashboard/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 5 },
        { name: 'gallery', maxCount: 5 },
      ],
      localMulterConfig(),
    ),
  )
  @Post()
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

  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 5 },
        { name: 'gallery', maxCount: 5 },
      ],
      localMulterConfig(),
    ),
  )
  @Patch(':productId')
  @HttpCode(200)
  async update(
    @User() user: TUserDocument,
    @Param() params: ProductIdDTO,
    @Body() updateProductDTO: UpdateProductDTO,
    @UploadedFiles() files: IProductFiles,
  ) {
    return {
      success: true,
      msg: 'done',
      result: await this.productService.update(user, {
        productId: params.productId,
        data: updateProductDTO,
        files,
      }),
    };
  }
}
