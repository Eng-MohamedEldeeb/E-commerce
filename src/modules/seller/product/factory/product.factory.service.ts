import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { IProduct } from 'src/db/Models/Product/Interface/IProduct.interface';
import { generateRS } from 'src/common/utils/randomString/randomString';

import { CloudService } from 'src/common/utils/upload/service/cloud.upload.service';
import { IFile } from 'src/common/utils/upload/interface/file.interface';
import { IAddProductOptions } from './interface/IProduct.factory.interface';
import { IProductFiles } from './interface/IProductFiles.interface';

import { UpdateProductDTO } from '../dto/updateProduct.dto';
@Injectable()
export class ProductFactory {
  constructor(private readonly cloudService: CloudService) {}

  protected calcPrice({
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

  protected async uploadProductFile({
    folderId,
    file,
    public_id,
  }: {
    file: Express.Multer.File;
    folderId?: string;
    public_id?: string;
  }): Promise<IFile> {
    const folder = `${process.env.APP_NAME}/product/${folderId}`;
    return await this.cloudService.uploadFile({
      path: file.path,
      ...(!public_id && { folder }),
      ...(public_id && { public_id }),
    });
  }

  async create({ createdBy, data, files }: IAddProductOptions) {
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

    const finalPrice = this.calcPrice({
      originalPrice,
      discountPercent: discountPercent || 0,
    });

    const folderId = generateRS({ length: 14, charset: 'alphanumeric' });

    const image: IFile = await this.uploadProductFile({
      folderId,
      file: files.image[0],
    });

    let gallery: IFile[] = [];

    if (files.gallery.length) {
      for (const file of files.gallery) {
        const { secure_url, public_id } = await this.uploadProductFile({
          folderId,
          file,
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
      finalPrice,
    };
  }

  async update(
    oldData: IProduct,
    newData: UpdateProductDTO,
    files?: IProductFiles,
  ): Promise<IProduct> {
    let finalPrice: number = oldData.finalPrice;

    if (newData.discountPercent || newData.originalPrice)
      finalPrice = this.calcPrice({
        originalPrice: newData.originalPrice ?? oldData.originalPrice,
        discountPercent: newData.discountPercent ?? oldData.discountPercent,
      });

    let image: IFile | undefined;

    if (files?.image) {
      const { secure_url, public_id } = await this.uploadProductFile({
        file: files.image[0],
        folderId: oldData.folderId,
      });
      image = { secure_url, public_id };
    }

    let gallery: IFile[] = [];

    if (files?.gallery?.length) {
      if (oldData.gallery?.length) {
        for (const file of oldData.gallery) {
          this.cloudService.destroyFile(file.public_id);
        }
      }

      for (const img of files.gallery) {
        const { secure_url, public_id } = await this.uploadProductFile({
          file: img,
          folderId: oldData.folderId,
        });
        gallery.push({ secure_url, public_id });
      }
    }

    return {
      ...oldData,
      ...newData,
      finalPrice: finalPrice ?? oldData.finalPrice,
      image: image ?? oldData.image,
      gallery: gallery.length ? gallery : oldData.gallery,
    };
  }
}
