import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { IProduct } from 'src/db/Models/Product/Interface/IProduct.interface';
import { generateRS } from 'src/common/utils/randomString/randomString';

import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IProductFactoryOptions } from './interface/IProduct.factory.interface';

@Injectable()
export class ProductFactory {
  constructor() {}
  static async create({
    createdBy,
    data,
    files,
    cloudService,
  }: IProductFactoryOptions): Promise<IProduct> {
    const {
      name,
      description,
      categoryId,
      stock,
      color,
      size,
      originalPrice,
      discountPercent,
    } = data;

    const slug = slugify(name, { trim: true, lower: true });

    const finalePrice = this.calcPrice({ originalPrice, discountPercent });

    const folderId = generateRS({ length: 14, charset: 'alphanumeric' });

    const image: IFile = await this.uploadProductFile({
      folderId,
      file: files.image[0],
      cloudService,
    });

    let gallery: IFile[] = [];

    if (files.gallery.length) {
      for (const file of files.gallery) {
        const { secure_url, public_id } = await this.uploadProductFile({
          folderId,
          file,
          cloudService,
        });
        gallery.push({ secure_url, public_id });
      }
    }

    return {
      name,
      slug,
      description,
      categoryId,
      createdBy,
      stock,
      color,
      size,
      folderId,
      image,
      gallery,
      originalPrice,
      discountPercent,
      finalePrice,
    };
  }

  protected static calcPrice({
    originalPrice,
    discountPercent,
  }: {
    discountPercent: number;
    originalPrice: number;
  }): number {
    return discountPercent
      ? originalPrice - (discountPercent / 100) * originalPrice
      : originalPrice;
  }

  protected static async uploadProductFile({
    folderId,
    file,
    cloudService,
  }: {
    folderId: string;
    file: Express.Multer.File;
    cloudService: CloudService;
  }): Promise<IFile> {
    const folder = `${process.env.APP_NAME}/product/${folderId}`;
    const { secure_url, public_id } = await cloudService.uploadFile({
      path: file.path,
      folder,
    });
    return { secure_url, public_id };
  }
}
